// src/main/java/com/ai/uninavi/service/SearchService.java
package com.ai.uninavi.service;

import com.ai.uninavi.domain.CourseRow;
import com.ai.uninavi.repository.CourseRowRepository;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
            case "일립관A" -> "Illip-a";
            case "일립관B" -> "Illip-b";
            default -> "Moria"; // 기본값(필요시 조정)
        };
    }

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