package com.ai.uninavi.chatbot.phone;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/phone")
public class PhoneApiController {

    private final PhoneSearchService phone;

    public PhoneApiController(PhoneSearchService phone) {
        this.phone = phone;
    }

    /**
     * 검색 예)
     * GET /api/phone/search?q=교목실          -> 1건(기본)
     * GET /api/phone/search?q=일립교육&mode=all -> 하위 과/학부 전부
     */
    @GetMapping("/search")
    public List<PhoneContact> search(
            @RequestParam(name = "q", required = false, defaultValue = "") String q,
            @RequestParam(name = "mode", required = false, defaultValue = "one") String mode
    ) {
        return phone.search(q, mode);
    }

    /** 캐시 갱신 */
    @PostMapping("/refresh")
    public String refresh() {
        phone.refresh();
        return "OK";
    }
}