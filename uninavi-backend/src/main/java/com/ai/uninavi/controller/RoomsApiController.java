package com.ai.uninavi.controller;

import com.ai.uninavi.dto.RoomsDayResponse;
import com.ai.uninavi.service.RoomQueryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/rooms")
public class RoomsApiController {

    private final RoomQueryService service;

    public RoomsApiController(RoomQueryService service) {
        this.service = service;
    }

    /**
     * 예)
     *  GET /api/rooms/day?building=갈멜관&floor=1
     *  GET /api/rooms/day?building=갈멜관&floor=1&room=AI융합실습실2
     *  GET /api/rooms/day?building=갈멜관&floor=1&date=2025-09-18
     */
    @GetMapping("/day")
    public RoomsDayResponse roomsDay(
            @RequestParam String building,
            @RequestParam int floor,
            @RequestParam(required = false) String room,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date

    ) {
        return service.getRoomsDay(building, floor, date, room);
    }
}