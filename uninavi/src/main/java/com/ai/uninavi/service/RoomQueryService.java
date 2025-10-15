// src/main/java/com/ai/uninavi/service/RoomQueryService.java
package com.ai.uninavi.service;

import com.ai.uninavi.domain.CourseRow;
import com.ai.uninavi.dto.RoomDayDto;
import com.ai.uninavi.dto.RoomsDayResponse;
import com.ai.uninavi.dto.SessionDto;
import com.ai.uninavi.repository.CourseRowRepository;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomQueryService {

    private final CourseRowRepository repo;
    private static final ZoneId ZONE = ZoneId.of("Asia/Seoul");

    public RoomQueryService(CourseRowRepository repo) {
        this.repo = repo;
    }

    /** 기존: 정확 매칭(건물/호수 문자열이 DB와 정확히 같아야 함) — 변경하지 않음 */
    public RoomsDayResponse getRoomsDay(String building, int floor, @Nullable LocalDate date, @Nullable String room) {
        LocalDate target = (date != null) ? date : LocalDate.now(ZONE);
        String dayKo = dayKo(target.getDayOfWeek());

        List<CourseRow> rows = (room == null || room.isBlank())
                ? repo.findByBuildingAndFloorAndLectureDayOrderByClassroomAscLectureStartAsc(
                building, (byte) floor, dayKo)
                : repo.findByBuildingAndFloorAndLectureDayAndClassroomOrderByLectureStartAsc(
                building, (byte) floor, dayKo, room);

        Map<String, List<CourseRow>> grouped = rows.stream()
                .collect(Collectors.groupingBy(
                        r -> Optional.ofNullable(r.getClassroom()).orElse("미지정"),
                        LinkedHashMap::new, Collectors.toList()
                ));

        List<String> allRooms = (room == null || room.isBlank())
                ? repo.findDistinctClassroomsByBuildingAndFloor(building, (byte) floor)
                : List.of(Optional.ofNullable(room).orElse("미지정"));

        ZonedDateTime now = ZonedDateTime.now(ZONE);

        List<RoomDayDto> roomDtos = allRooms.stream()
                .map(roomName -> {
                    List<CourseRow> list = grouped.getOrDefault(roomName, Collections.emptyList());
                    List<SessionDto> sessions = list.stream()
                            .sorted(Comparator.comparing(CourseRow::getLectureStart,
                                    Comparator.nullsLast(Comparator.naturalOrder())))
                            .map(r -> toSessionDto(r, target, now))
                            .toList();
                    return new RoomDayDto(roomName, sessions);
                })
                .toList();

        return new RoomsDayResponse(building, floor, target, roomDtos);
    }

    // ====================== 여기부터 신규: 유연 매칭 버전 ======================

    /**
     * 공백/대소문자 무시 버전.
     * - building: "일립관 a", "일립관A", "  일립관  a " → 모두 매칭
     * - room:     "일립관501호", "일립관 501호" 등 공백 차이 무시
     */
    public RoomsDayResponse getRoomsDayFlexible(String building, int floor,
                                                @Nullable LocalDate date, @Nullable String room) {
        LocalDate target = (date != null) ? date : LocalDate.now(ZONE);
        String dayKo = dayKo(target.getDayOfWeek());

        List<CourseRow> rows = (room == null || room.isBlank())
                ? repo.findDayByBuildingFloorDowIgnoreCase(building, (byte) floor, dayKo)
                : repo.findDayRoomByBuildingFloorDowIgnoreCase(building, (byte) floor, room, dayKo);

        Map<String, List<CourseRow>> grouped = rows.stream()
                .collect(Collectors.groupingBy(
                        r -> Optional.ofNullable(r.getClassroom()).orElse("미지정"),
                        LinkedHashMap::new, Collectors.toList()
                ));

        // 전체 강의실 목록도 공백/대소문자 무시 쿼리로 가져옴
        List<String> allRooms = (room == null || room.isBlank())
                ? repo.findDistinctClassroomsByBuildingAndFloor(building, (byte) floor)
                : List.of(Optional.ofNullable(room).orElse("미지정"));

        ZonedDateTime now = ZonedDateTime.now(ZONE);

        List<RoomDayDto> roomDtos = allRooms.stream()
                .map(roomName -> {
                    // group key와 비교 시 공백/대소문자 제거하여 매칭 보강
                    String key = grouped.keySet().stream()
                            .filter(k -> norm(k).equals(norm(roomName)))
                            .findFirst().orElse(roomName);

                    List<CourseRow> list = grouped.getOrDefault(key, Collections.emptyList());
                    List<SessionDto> sessions = list.stream()
                            .sorted(Comparator.comparing(CourseRow::getLectureStart,
                                    Comparator.nullsLast(Comparator.naturalOrder())))
                            .map(r -> toSessionDto(r, target, now))
                            .toList();
                    return new RoomDayDto(roomName, sessions);
                })
                .toList();

        return new RoomsDayResponse(building, floor, target, roomDtos);
    }

    // ====================== 공통 유틸/기존 메서드 ======================

    private SessionDto toSessionDto(CourseRow r, LocalDate date, ZonedDateTime now) {
        String start = hhmm(r.getLectureStart());
        String end   = hhmm(r.getLectureEnd());
        String status = computeStatus(date, r.getLectureStart(), r.getLectureEnd(), now);
        return new SessionDto(
                r.getCourseName(),
                r.getProfessor(),
                start, end, status
        );
    }

    private static String hhmm(LocalTime t) {
        return (t == null) ? "" : t.toString().substring(0, 5);
    }

    private static String computeStatus(LocalDate date, LocalTime st, LocalTime en, ZonedDateTime now) {
        if (st == null || en == null) return "IDLE";
        ZonedDateTime zStart = LocalDateTime.of(date, st).atZone(ZONE);
        ZonedDateTime zEnd   = LocalDateTime.of(date, en).atZone(ZONE);
        if (!now.isBefore(zStart) && now.isBefore(zEnd)) return "IN_CLASS";   // 진행중(빨강)
        long mins = Duration.between(now, zStart).toMinutes();
        if (mins > 0 && mins <= 10) return "SOON";                            // 10분내 시작(노랑)
        if (now.isAfter(zEnd)) return "OVER";                                 // 종료(회색)
        return "IDLE";                                                        // 빈 강의실(초록)
    }

    private static String dayKo(DayOfWeek dow) {
        return switch (dow) {
            case MONDAY -> "월"; case TUESDAY -> "화"; case WEDNESDAY -> "수";
            case THURSDAY -> "목"; case FRIDAY -> "금"; case SATURDAY -> "토";
            case SUNDAY -> "일";
        };
    }

    private static String norm(String s) {
        return s == null ? "" : s.replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
    }
}