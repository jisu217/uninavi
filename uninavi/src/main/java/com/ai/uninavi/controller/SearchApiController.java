// src/main/java/com/ai/uninavi/controller/SearchApiController.java
package com.ai.uninavi.controller;

import com.ai.uninavi.service.SearchService;
import com.ai.uninavi.service.SearchService.SearchItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchApiController {

    private final SearchService service;

    public SearchApiController(SearchService service) {
        this.service = service;
    }

    // 최종 경로: /api/search/rooms?q=...&date=...
    @GetMapping("/rooms")
    public List<SearchItem> searchRooms(
            @RequestParam("q") String q,
            @RequestParam(value = "date", required = false) String date
    ) {
        return service.searchByCourse(q, date);
    }
}