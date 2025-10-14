package com.ai.uninavi.service;

import com.ai.uninavi.domain.CourseRow;
import com.ai.uninavi.repository.CourseRowRepository;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
public class SearchService {

    private final CourseRowRepository repo;

    public SearchService(CourseRowRepository repo) {
        this.repo = repo;
    }

    private static String norm(String s) {
        return s == null ? "" : s.toLowerCase().replaceAll("\\s+", "");
    }

    public List<SearchItem> search(String q) {
        final String n = norm(q);
        log.info("[SearchService] raw='{}' norm='{}'", q, n);
        if (n.isEmpty()) {
            log.info("[SearchService] norm empty -> []");
            return List.of();
        }

        Pageable limit = PageRequest.of(0, 10);
        List<SearchItem> out = new ArrayList<>();

        // 1) 강의실 이름으로 검색
        List<CourseRow> roomHits = repo.searchRooms(n, limit);
        log.info("[SearchService] rooms hit={} ex={}",
                roomHits.size(),
                roomHits.stream().limit(3).map(CourseRow::getClassroom).toList());

        for (CourseRow cr : roomHits) {
            out.add(new SearchItem(
                    "room",
                    cr.getBuilding(),
                    cr.getFloor() == null ? null : cr.getFloor().intValue(),
                    cr.getClassroom(),
                    "/" + mapBuildingPath(cr.getBuilding()),
                    cr.getCourseName() // 참고 필드
            ));
        }

        // 2) 과목명으로 검색
        List<CourseRow> courseHits = repo.searchCourses(n, limit);
        log.info("[SearchService] courses hit={} ex={}",
                courseHits.size(),
                courseHits.stream().limit(3).map(CourseRow::getCourseName).toList());

        for (CourseRow cr : courseHits) {
            out.add(new SearchItem(
                    "course",
                    cr.getBuilding(),
                    cr.getFloor() == null ? null : cr.getFloor().intValue(),
                    cr.getClassroom(),
                    "/" + mapBuildingPath(cr.getBuilding()),
                    cr.getCourseName()
            ));
        }

        log.info("[SearchService] total out={}", out.size());
        return out;
    }

    private String mapBuildingPath(String building) {
        return switch (building) {
            case "갈멜관" -> "galmel";
            case "모리아관" -> "Moria";
            case "복음관" -> "Bogeum";
            case "밀알관" -> "Milal";
            case "일립관 a" -> "IllipA";
            case "일립관 b" -> "IllipB";
            default -> "Moria"; // 기본값(필요시 조정)
        };
    }

    // ====================== 여기서부터 추가 ======================

    /** yyyy-MM-dd → 요일(월=1..일=7) */
    private Integer dayOfWeekFromDate(String date) {
        LocalDate d = (date == null || date.isBlank()) ? LocalDate.now() : LocalDate.parse(date);
        return d.getDayOfWeek().getValue(); // 1~7
    }

    /**
     * 과목명으로 검색 (오늘/지정 날짜의 요일로 필터) + (building|floor|room|course) 중복 제거
     * 프론트에서 호출하는 엔드포인트: GET /api/search/rooms?q=...&date=...
     */
    public List<SearchItem> searchByCourse(String q, String date) {
        final String n = norm(q);
        log.info("[SearchService] searchByCourse raw='{}' norm='{}' date='{}'", q, n, date);
        if (n.isEmpty()) {
            log.info("[SearchService] searchByCourse norm empty -> []");
            return List.of();
        }

        Integer dow = dayOfWeekFromDate(date);
        Pageable limit = PageRequest.of(0, 50);

        // 날짜/요일 필터 지원 레포 메서드가 있으면 우선 사용, 없으면 폴백
        List<CourseRow> hits;
        try {
            hits = repo.searchCoursesByNormAndDow(n, dow, limit);
        } catch (Throwable t) {
            log.warn("[SearchService] searchCoursesByNormAndDow 미구현 → searchCourses로 폴백. cause={}", t.toString());
            hits = repo.searchCourses(n, limit);
        }

        log.info("[SearchService] searchByCourse hits={} ex={}",
                hits.size(),
                hits.stream().limit(3).map(CourseRow::getCourseName).toList());

        // (building|floor|room|course) 키로 중복 제거
        Set<String> seen = new HashSet<>();
        List<SearchItem> out = new ArrayList<>();
        for (CourseRow cr : hits) {
            String key = (cr.getBuilding() + "|" + cr.getFloor() + "|" + cr.getClassroom() + "|" + cr.getCourseName())
                    .replaceAll("\\s+", "").toLowerCase();
            if (!seen.add(key)) continue;

            out.add(new SearchItem(
                    "course",
                    cr.getBuilding(),
                    cr.getFloor() == null ? null : cr.getFloor().intValue(),
                    cr.getClassroom(),
                    "/" + mapBuildingPath(cr.getBuilding()),
                    cr.getCourseName()
            ));
        }
        log.info("[SearchService] searchByCourse out={}", out.size());
        return out;
    }

    // ====================== 추가 끝 ======================

    @Value
    public static class SearchItem {
        String type;          // "room" | "course"
        String building;      // "갈멜관"
        Integer floor;        // 1, 2, ...
        String room;          // "브니엘홀", "갈멜관 201호" ...
        String buildingPath;  // "/galmel" 등 (프론트 라우팅용)
        String label;         // 보여줄 제목 (예: 과목명)
    }
}