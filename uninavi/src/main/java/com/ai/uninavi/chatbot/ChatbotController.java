package com.ai.uninavi.chatbot;

import com.ai.uninavi.chatbot.phone.PhoneContact;
import com.ai.uninavi.chatbot.phone.PhoneSearchService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final LLMInterpreter llm;                 // 선택
    private final DbCourseServiceJdbc courses;        // 위치 질의용
    private final PhoneSearchService phoneSearch;     // 연락처 질의용
    private final ChapelNoticeService chapelNotice;   // 채플 공지 질의용

    public ChatbotController(LLMInterpreter llm,
                             DbCourseServiceJdbc courses,
                             PhoneSearchService phoneSearch,
                             ChapelNoticeService chapelNotice) {
        this.llm = llm;
        this.courses = courses;
        this.phoneSearch = phoneSearch;
        this.chapelNotice = chapelNotice;
    }

    // ---- DTO ----
    public record ChatReq(String text) {}
    public record ChatRes(String message) {}

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ChatRes chat(@RequestBody ChatReq req) {
        String raw = Optional.ofNullable(req.text()).orElse("").trim();
        if (raw.isEmpty()) {
            return new ChatRes("무엇을 도와드릴까요? 예) AI융합실습실 어디야? / 교목실 연락처 알려줘 / 채플 일수 알려줘");
        }

        // 0) 채플 의도
        if (isChapelIntent(raw)) {
            var sent = chapelNotice.getSummarySentence()
                    .map(s -> s + "\n(출처: " + chapelNotice.getSourceUrl() + ")")
                    .orElse("채플 공지에서 기준을 읽지 못했어요. 잠시 후 다시 시도해 주세요.");
            return new ChatRes(sent);
        }

        // 1) 연락처/전화 의도
        if (isPhoneIntent(raw)) {
            String q = extractDeptOrRole(raw);
            if (q.isBlank()) {
                return new ChatRes("어느 부서/보직 연락처를 찾으세요? 예) 교목실 / 입학관리팀 / 기획팀");
            }
            if (llm != null && llm.enabled()) {
                q = llm.extractPlaceName(q, false).orElse(q);
            }

            List<PhoneContact> list = phoneSearch.search(q, "one"); // 한 건만
            if (list.isEmpty()) {
                return new ChatRes("해당 부서/보직을 찾지 못했어요. 조금만 다르게 적어볼까요? 예) 교목실, 입학관리팀, 기획팀");
            }

            PhoneContact c = list.get(0);
            String title = (c.position() != null && !c.position().isBlank())
                    ? c.dept() + " " + c.position()
                    : c.dept();
            String src = (c.sourceUrl() != null && !c.sourceUrl().isBlank())
                    ? "\n(출처: " + c.sourceUrl() + ")"
                    : "";
            return new ChatRes(title + " 연락처는 " + c.tel() + " 입니다." + src);
        }

        // 2) 위치 의도
        if (isWhereIntent(raw)) {
            String place = (llm != null && llm.enabled())
                    ? llm.extractPlaceName(raw, true).orElseGet(() -> fallbackExtractPlace(raw))
                    : fallbackExtractPlace(raw);

            if (place == null || place.isBlank()) {
                return new ChatRes("장소명을 이해하지 못했어요. 예) 복음관 301 어디야?");
            }

            // 2-1) 강의명/강의실명으로 우선 조회 (정확 → 없으면 모호 매칭까지 내부에서 처리)
            Optional<java.util.Map<String, Object>> hit = courses.findByCourseNameFlexible(place);
            if (hit.isPresent()) {
                return new ChatRes(courses.locationSentence(place, hit.get()));
            }

            // 2-2) 건물명만 들어온 경우 설명 메시지 제공 (예: 모리아관, 갈멜관)
            Optional<String> bMsg = courses.buildingRangeMessage(place);
            if (bMsg.isPresent()) {
                return new ChatRes(bMsg.get());
            }

            return new ChatRes("우리 데이터에 없는 장소예요. 과목명/강의실/건물명으로 다시 입력해 주세요. 예) 복음관 301 / AI융합실습실 / 갈멜관");
        }

        // ✨ (추가) '어디/위치' 키워드가 없어도 건물명만 보내면 안내
        Optional<String> bMsg = courses.buildingRangeMessage(raw);
        if (bMsg.isPresent()) {
            return new ChatRes(bMsg.get());
        }

        // 3) 가이던스
        return new ChatRes("무엇을 도와드릴까요? 예) 천마홀 어디야? / 채플 일수 알려줘 / 교목실 연락처 알려줘");
    }

    // ===== Intent helpers =====
    private boolean isChapelIntent(String t) {
        String low = t.toLowerCase(Locale.ROOT);
        return low.contains("채플") ||
                (low.contains("예배") && (low.contains("일수") || low.contains("출석") || low.contains("기준"))) ||
                (low.contains("일수") && (low.contains("필요") || low.contains("몇") || low.contains("기준")));
    }

    /** '연락처' 의도 간단 감지 */
    private boolean isPhoneIntent(String t) {
        String low = t.toLowerCase(Locale.ROOT);
        return low.contains("연락처") || low.contains("전화") || low.contains("번호") || low.contains("문의");
    }

    /** '어디/위치' 의도 간단 감지 */
    private boolean isWhereIntent(String t) {
        String low = t.toLowerCase(Locale.ROOT);
        return low.contains("어디") || low.contains("where") || low.contains("위치");
    }

    // ===== Extractors =====
    /** "교목실 연락처 알려줘" -> "교목실" */
    private String extractDeptOrRole(String t) {
        return t.replaceAll("[?!.]", " ")
                .replaceAll("(연락처|전화번호|전화|번호|문의|알려줘|좀|주세요|번호좀|연락좀|문의처)", " ")
                .replaceAll("\\s+", " ").trim();
    }

    /** 위치 fallback 추출: 군더더기 제거 */
    private String fallbackExtractPlace(String t) {
        t = t.replaceAll("[?!.]", " ")
                .replace("어디야", " ").replace("어디", " ")
                .replace("위치", " ").replace("좀", " ")
                .replace("요", " ").trim();
        return t.isBlank() ? null : t;
    }
}