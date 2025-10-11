// src/main/java/com/ai/uninavi/controller/SearchApiController.java
package com.ai.uninavi.controller;

import com.ai.uninavi.service.SearchService;
import com.ai.uninavi.service.SearchService.SearchItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchApiController {

    private final SearchService service;

    public SearchApiController(SearchService service) {
        this.service = service;
    }

    // 최종 경로: /api/search?q=...
    @GetMapping("/search")
    public List<SearchItem> search(@RequestParam("q") String q) {
        return service.search(q);
    }
}