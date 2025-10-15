package com.ai.uninavi.dto;

public record SessionDto(
        String course,
        String prof,
        String start,   // "HH:mm"
        String end,     // "HH:mm"
        String status   // IN_CLASS, SOON, IDLE, OVER
) {}