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

    /** 건물+층(+room 옵션), 날짜 미지정 시 금일(Asia/Seoul) */
    public RoomsDayResponse getRoomsDay(String building, int floor, @Nullable LocalDate date, @Nullable String room) {
        LocalDate target = (date != null) ? date : LocalDate.now(ZONE);
        String dayKo = dayKo(target.getDayOfWeek());

        // 1) 오늘(요일) 수업 로우 (기존 로직 그대로)
        List<CourseRow> rows = (room == null || room.isBlank())
                ? repo.findByBuildingAndFloorAndLectureDayOrderByClassroomAscLectureStartAsc(
                building, (byte) floor, dayKo)
                : repo.findByBuildingAndFloorAndLectureDayAndClassroomOrderByLectureStartAsc(
                building, (byte) floor, dayKo, room);

        // 2) 강의실별 그룹핑 (오늘 수업이 있는 방들)
        Map<String, List<CourseRow>> grouped = rows.stream()
                .collect(Collectors.groupingBy(
                        r -> Optional.ofNullable(r.getClassroom()).orElse("미지정"),
                        LinkedHashMap::new, Collectors.toList()
                ));

        // 3) 해당 층의 모든 강의실 목록 (금일 수업 없어도 포함)
        List<String> allRooms = (room == null || room.isBlank())
                ? repo.findDistinctClassroomsByBuildingAndFloor(building, (byte) floor)
                : List.of(Optional.ofNullable(room).orElse("미지정"));

        ZonedDateTime now = ZonedDateTime.now(ZONE);

        // 4) 합집합으로 RoomDayDto 생성: 오늘 수업 없으면 sessions=[]
        List<RoomDayDto> roomDtos = allRooms.stream()
                .map(roomName -> {
                    List<CourseRow> list = grouped.getOrDefault(roomName, Collections.emptyList());
                    List<SessionDto> sessions = list.stream()
                            .sorted(Comparator.comparing(CourseRow::getLectureStart, Comparator.nullsLast(Comparator.naturalOrder())))
                            .map(r -> toSessionDto(r, target, now))
                            .toList();
                    return new RoomDayDto(roomName, sessions);
                })
                .toList();

        return new RoomsDayResponse(building, floor, target, roomDtos);
    }

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
}