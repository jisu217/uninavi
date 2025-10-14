package com.ai.jdbc;

import java.sql.*;
import java.time.*;
import java.util.*;

public class TimetableLogic {

    // 🔧 DB 접속 정보
    private static final String URL  =
            "jdbc:mysql://127.0.0.1:3306/course_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true&useSSL=false";
    private static final String USER = "root";
    private static final String PASS = "007253kjh!"; // 네 값 그대로

    // 상태(색상 매핑에 사용)
    public enum Status { IN_CLASS, SOON, OVER, IDLE }

    public record CourseRow(
            long id, String code, String name, String prof,
            String day, LocalTime start, LocalTime end, String room
    ) {}

    // ======== 공통 매퍼 (TIME 컬럼 사용) ========
    private static CourseRow map(ResultSet rs) throws SQLException {
        Time s = rs.getTime("lecture_start");   // TIME → java.sql.Time
        Time e = rs.getTime("lecture_end");
        return new CourseRow(
                rs.getLong("id"),
                rs.getString("course_code"),
                rs.getString("course_name"),
                rs.getString("professor"),
                rs.getString("lecture_day"),
                s != null ? s.toLocalTime() : null,   // LocalTime으로 변환
                e != null ? e.toLocalTime() : null,
                rs.getString("classroom")
        );
    }

    // ======== 조회 메서드 ========

    /** 해당 요일의 전체 수업 (시작시간 순) */
    public static List<CourseRow> findByDay(String dayKr) throws SQLException {
        String sql = """
            SELECT id, course_code, course_name, professor, lecture_day, lecture_start, lecture_end, classroom
            FROM courses
            WHERE lecture_day = ?
            ORDER BY lecture_start ASC, lecture_end ASC, id ASC
        """;
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, dayKr);
            try (ResultSet rs = ps.executeQuery()) {
                List<CourseRow> list = new ArrayList<>();
                while (rs.next()) list.add(map(rs));
                return list;
            }
        }
    }

    /** 지금 진행 중인 수업 (DB는 저장만, 비교는 간단히 SQL 이용) */
    public static List<CourseRow> findNow(String dayKr, LocalTime now) throws SQLException {
        String sql = """
            SELECT id, course_code, course_name, professor, lecture_day, lecture_start, lecture_end, classroom
            FROM courses
            WHERE lecture_day = ?
              AND ? BETWEEN lecture_start AND lecture_end
            ORDER BY lecture_start ASC
        """;
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, dayKr);
            ps.setTime(2, Time.valueOf(now));          // HH:mm:ss
            try (ResultSet rs = ps.executeQuery()) {
                List<CourseRow> list = new ArrayList<>();
                while (rs.next()) list.add(map(rs));
                return list;
            }
        }
    }

    /** 임박 수업: withinMinutes 분 이내 시작 */
    public static List<CourseRow> findSoon(String dayKr, LocalTime now, int withinMinutes) throws SQLException {
        String sql = """
            SELECT id, course_code, course_name, professor, lecture_day, lecture_start, lecture_end, classroom
            FROM courses
            WHERE lecture_day = ?
              AND lecture_start > ?
              AND TIMESTAMPDIFF(MINUTE, ?, lecture_start) <= ?
            ORDER BY lecture_start ASC
        """;
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, dayKr);
            ps.setTime(2, Time.valueOf(now));
            ps.setTime(3, Time.valueOf(now));
            ps.setInt(4, withinMinutes);
            try (ResultSet rs = ps.executeQuery()) {
                List<CourseRow> list = new ArrayList<>();
                while (rs.next()) list.add(map(rs));
                return list;
            }
        }
    }

    /** 다음 시작 수업 n개 (지나간 것 제외) */
    public static List<CourseRow> nextStarts(String dayKr, LocalTime now, int limit) throws SQLException {
        String sql = """
            SELECT id, course_code, course_name, professor, lecture_day, lecture_start, lecture_end, classroom
            FROM courses
            WHERE lecture_day = ?
              AND lecture_end >= ?
            ORDER BY lecture_start ASC
            LIMIT ?
        """;
        try (Connection con = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, dayKr);
            ps.setTime(2, Time.valueOf(now));
            ps.setInt(3, limit);
            try (ResultSet rs = ps.executeQuery()) {
                List<CourseRow> list = new ArrayList<>();
                while (rs.next()) list.add(map(rs));
                return list;
            }
        }
    }

    // ======== 상태/색상 계산 ========

    public static Status statusOf(LocalTime now, LocalTime start, LocalTime end, int soonWindowMin) {
        if (start == null || end == null) return Status.IDLE;
        if (!now.isBefore(start) && !now.isAfter(end)) return Status.IN_CLASS;
        if (now.isBefore(start) && Duration.between(now, start).toMinutes() <= soonWindowMin) return Status.SOON;
        if (now.isAfter(end)) return Status.OVER;
        return Status.IDLE;
    }

    public static String colorOf(Status st) {
        return switch (st) {
            case IN_CLASS -> "#ff4d4f"; //빨강
            case SOON     -> "#faad14"; //노랑
            case OVER     -> "#8c8c8c"; //진회색
            case IDLE     -> "#d9d9d9"; //연회색
        };
    }

    // ======== 실행 테스트 ========

    public static void main(String[] args) {
        try {
            ZoneId KST = ZoneId.of("Asia/Seoul");
            LocalDateTime nowDt = LocalDateTime.now(KST);
            String[] days = {"월","화","수","목","금","토","일"};
            String dayKr = days[nowDt.getDayOfWeek().getValue() - 1]; // 1~7 -> 0~6
            LocalTime now = nowDt.toLocalTime();
            int soonMin = 10;

            System.out.printf("NOW=%s, DAY=%s%n%n", now, dayKr);

            System.out.println("=== 진행 중(IN_CLASS) ===");
            for (CourseRow c : findNow(dayKr, now)) {
                Status st = statusOf(now, c.start(), c.end(), soonMin);
                String color = colorOf(st);
                System.out.printf("%s | %s | %s | %s | %s~%s | %s| color=%s%n",
                        c.code(), c.day(), c.prof(), c.name(), c.start(), c.end(), c.room(), color);
            }

            System.out.println("\n=== 임박(SOON, ≤10분) ===");
            for (CourseRow c : findSoon(dayKr, now, soonMin)) {
                Status st = statusOf(now, c.start(), c.end(), soonMin);
                String color = colorOf(st);
                System.out.printf("%s | %s | %s | %s | %s~%s | %s| color=%s%n",
                        c.code(), c.day(), c.prof(), c.name(), c.start(), c.end(), c.room(), color);
            }

            System.out.println("\n=== 오늘 전체 + 상태/색상 ===");
            for (CourseRow c : findByDay(dayKr)) {
                Status st = statusOf(now, c.start(), c.end(), soonMin);
                String color = colorOf(st);
                System.out.printf("[%s] %s | %s | %s | %s | %s~%s | %s | color=%s%n",
                        st, c.code(), c.day(), c.prof(), c.name(), c.start(), c.end(), c.room(), color);
            }

            System.out.println("\n=== 다음 시작 3개 ===");
            for (CourseRow c : nextStarts(dayKr, now, 3)) {
                System.out.printf("%s | %s | %s | %s | %s~%s | %s%n",
                        c.code(), c.day(), c.prof(), c.name(), c.start(), c.end(), c.room());
            }

        } catch (Throwable t) {   // 에러 원인 바로 보기
            t.printStackTrace();
            System.exit(1);
        }
    }


}