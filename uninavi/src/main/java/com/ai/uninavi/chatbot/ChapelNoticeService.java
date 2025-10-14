package com.ai.uninavi.chatbot;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 채플 공지 페이지를 읽어서 "필요 일수"와 요약을 만들어 준다.
 * - 페이지 구조가 바뀌어도 최대한 견고하게: 전체 텍스트에서 정규식으로 숫자만 추출
 * - 간단한 메모리 캐시(기본 30분)로 요청 부하/속도 최적화
 */
@Service
public class ChapelNoticeService {

    private final String noticeUrl;
    private static final Duration TTL = Duration.ofHours(6);

    private volatile Cache cache = null;

    public ChapelNoticeService(@Value("${ext.chapel.notice-url}") String noticeUrl) {
        this.noticeUrl = noticeUrl;
    }

    /** 요약 문장을 돌려준다. 실패 시 Optional.empty() */
    public Optional<String> getSummarySentence() {
        try {
            String text = fetchText();
            Parsed parsed = parse(text);
            if (parsed == null) return Optional.empty();

            StringBuilder sb = new StringBuilder();
            if (parsed.totalDays != null) {
                sb.append("올해 채플 필요 출석일수는 ").append(parsed.totalDays).append("일입니다.");
            } else {
                sb.append("채플 기준을 확인했어요.");
            }

            if (!parsed.thresholds.isEmpty()) {
                sb.append(" (주당 수업일수 기준: ");
                boolean first = true;
                for (Map.Entry<Integer, Integer> e : parsed.thresholds.entrySet()) {
                    if (!first) sb.append(", ");
                    sb.append(e.getKey()).append("일 수업자 ").append(e.getValue()).append("일 이상");
                    first = false;
                }
                sb.append(")");
            }
            sb.append(" 자세한 내용은 공지에서 확인하세요.");

            return Optional.of(sb.toString());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    /** 원문 링크 */
    public String getSourceUrl() {
        return noticeUrl;
    }

    // ---------- 내부 구현 ----------

    private String fetchText() throws IOException {
        Cache c = cache;
        if (c != null && Instant.now().isBefore(c.expireAt)) {
            return c.text;
        }
        Document doc = Jsoup.connect(noticeUrl)
                .userAgent("UninaviBot/1.0 (+contact@example.com)")
                .timeout(10_000)
                .get();

        // 본문이 어디든 전체 문서 텍스트로 안전하게 추출
        String text = doc.text();

        cache = new Cache(text, Instant.now().plus(TTL));
        return text;
    }

    /** 문서 텍스트에서 숫자 추출 */
    private Parsed parse(String text) {
        if (text == null || text.isBlank()) return null;

        // "전체 채플 일수 : 70일" 같은 패턴
        Integer total = null;
        Matcher mt = Pattern.compile("(전체\\s*채플\\s*일수\\s*[:：]?\\s*)(\\d{1,3})\\s*일")
                .matcher(text);
        if (mt.find()) {
            total = Integer.parseInt(mt.group(2));
        }

        // "-5일 수업자: 53일 이상" 등 (1~5일 모두 캡처)
        Map<Integer, Integer> thresholds = new LinkedHashMap<>();
        Matcher m = Pattern.compile("([1-5])\\s*일\\s*수업자\\s*[:：]?\\s*(\\d{1,3})\\s*일")
                .matcher(text);
        while (m.find()) {
            Integer day = Integer.parseInt(m.group(1));
            Integer need = Integer.parseInt(m.group(2));
            thresholds.put(day, need);
        }

        // 데이터 하나도 없으면 실패 처리
        if (total == null && thresholds.isEmpty()) return null;
        return new Parsed(total, thresholds);
    }

    private record Cache(String text, Instant expireAt) {}
    private record Parsed(Integer totalDays, Map<Integer, Integer> thresholds) {}
}