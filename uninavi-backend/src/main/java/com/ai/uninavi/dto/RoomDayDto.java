package com.ai.uninavi.dto;

import java.util.List;

public record RoomDayDto(
        String room,
        List<SessionDto> sessions
) {}