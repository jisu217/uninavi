package com.ai.uninavi.dto;

import java.time.LocalDate;
import java.util.List;

public record RoomsDayResponse(
        String building,
        int floor,
        LocalDate date,
        List<RoomDayDto> rooms
) {}