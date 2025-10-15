package com.ai.uninavi.dto;

public record SearchItem(
        String type,      // "room" | "course"
        String label,     // 보여줄 텍스트 (강의실명 or 과목명)
        String building,  // 건물명
        Integer floor,    // 층 (B1은 -1)
        String room       // 강의실명
) {}