package com.ai.uninavi.controller;

import com.ai.uninavi.dto.RoomsDayResponse;
import com.ai.uninavi.service.RoomQueryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/rooms")
public class RoomsApiController {

    private final RoomQueryService roomQueryService;

    public RoomsApiController(RoomQueryService roomQueryService) {
        this.roomQueryService = roomQueryService;
    }

    // (기존) 정확 매칭 버전 - 그대로 두기
    @GetMapping("/day")
    public RoomsDayResponse roomsDay(
            @RequestParam String building,
            @RequestParam int floor,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String room
    ) {
        return roomQueryService.getRoomsDay(building, floor, date, room);
    }

    // (신규) 공백/대소문자 무시 유연 매칭 버전
    @GetMapping("/day-flex")
    public RoomsDayResponse roomsDayFlex(
            @RequestParam String building,
            @RequestParam int floor,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String room
    ) {
        return roomQueryService.getRoomsDayFlexible(building, floor, date, room);
    }
}