package com.ai.uninavi.chatbot;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 강의명·강의실명 기반으로 위치 정보를 조회하는 JDBC 서비스
 */
@Service
public class DbCourseServiceJdbc {

    private final JdbcTemplate jdbc;

    public DbCourseServiceJdbc(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    /** 🔹 입력 문자열 정규화: 소문자 + 한글·숫자만 남김 */
    private static String norm(String s) {
        if (s == null) return "";
        return s.toLowerCase(Locale.ROOT).replaceAll("[^0-9a-z가-힣]", "");
    }

    /** 🔹 1차: 정확 일치 */
    private static final String SQL_FIND = """
        SELECT course_name, building, floor, classroom
        FROM course_db.courses
        WHERE REGEXP_REPLACE(LOWER(course_name), '[^0-9a-z가-힣]', '') = ?
           OR REGEXP_REPLACE(LOWER(classroom),   '[^0-9a-z가-힣]', '') = ?
        LIMIT 1
        """;

    /** 🔹 2차(보완): 모호 매칭 LIKE (예: 'AI융합실습실' 같이 번호 없는 질의) */
    private static final String SQL_FIND_FUZZY = """
        SELECT course_name, building, floor, classroom
        FROM course_db.courses
        WHERE REGEXP_REPLACE(LOWER(course_name), '[^0-9a-z가-힣]', '') LIKE CONCAT('%', ?, '%')
           OR REGEXP_REPLACE(LOWER(classroom),   '[^0-9a-z가-힣]', '') LIKE CONCAT('%', ?, '%')
        LIMIT 1
        """;

    /** 🔹 컨트롤러에서 사용하는 메서드 (정확→모호 순으로 시도) */
    public Optional<Map<String, Object>> findByCourseNameFlexible(String name) {
        String key = norm(name);

        var list = jdbc.queryForList(SQL_FIND, key, key);
        if (!list.isEmpty()) return Optional.of(list.get(0));

        var like = jdbc.queryForList(SQL_FIND_FUZZY, key, key);
        return like.isEmpty() ? Optional.empty() : Optional.of(like.get(0));
    }

    /** 🔹 층수 텍스트 표현 */
    private static String floorText(Integer floor) {
        if (floor == null) return "";
        if (floor < 0) return "지하 " + Math.abs(floor) + "층";
        return floor + "층";
    }

    /** 🔹 응답 문장 생성 */
    public String locationSentence(String placeName, Map<String, Object> row) {
        String building = (String) row.get("building");
        Integer floor = row.get("floor") == null ? null : ((Number) row.get("floor")).intValue();
        String where = building + (floor == null ? "" : " " + floorText(floor));
        return placeName + "은(는) " + where + "에 있습니다.";
    }

    /** 🔹 건물명만 들어온 경우 기본 설명 */
    private static final Map<String, String> BUILDING_INFO = Map.ofEntries(
            Map.entry("갈멜관", String.join("\n",
                    "지하 1층 ~ 3층: 강의실과 행정실이 있습니다."
            )),

            Map.entry("모리아관", String.join("\n",
                    "1층 ~ 3층: 총학생회실, 국제교류원, 강의실이 있습니다."
            )),

            Map.entry("일립관A", String.join("\n",
                    "1층 ~ 3층: 기숙사가 있습니다.",
                    "4층 ~ 5층: 간호 실습실, 교수 연구실, 강의실이 있습니다."
            )),

            Map.entry("일립관B", String.join("\n",
                    "2층 ~ 3층: 기숙사와 강의실이 있습니다.",
                    "4층 ~ 5층: 교수 연구실과 강의실이 있습니다.",
                    "6층: 로뎀나무와 행정사무실이 있습니다.",
                    "7층: 교수 연구실이 있습니다."
            )),

            Map.entry("복음관", String.join("\n",
                    "1층 ~ 2층: 행정사무실, 남자 휴게실, 보건실이 있습니다.",
                    "3층 ~ 4층: 행정사무실과 강의실이 있습니다.",
                    "5층: 교수 연구실이 있습니다."
            )),

            Map.entry("밀알관", String.join("\n",
                    "지하 2층: 지하주차장이 있습니다.",
                    "지하 1층: 식당, 로고스홀, 복사실이 있습니다.",
                    "1층: 카페, 북카페, 여자 휴게실이 있습니다.",
                    "2층: 역사관, 행정사무실이 있습니다.",
                    "3층 ~ 4층: 도서관이 있습니다."
            ))
    );
    public Optional<String> buildingRangeMessage(String text) {
        String normText = norm(text);
        return BUILDING_INFO.entrySet().stream()
                .filter(e -> normText.contains(norm(e.getKey())))
                .findFirst()
                .map(e -> e.getKey() + "은(는) " + e.getValue());
    }
}