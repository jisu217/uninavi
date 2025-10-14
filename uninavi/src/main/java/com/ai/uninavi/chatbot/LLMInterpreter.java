// src/main/java/com/ai/uninavi/chatbot/LLMInterpreter.java
package com.ai.uninavi.chatbot;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Optional;

@Component
public class LLMInterpreter {
    private final WebClient http;
    private final ObjectMapper om;
    private final String apiKey;
    private final String model;

    public LLMInterpreter(
            @Value("${openai.api-key:}") String apiKey,
            @Value("${openai.model:gpt-4o-mini}") String model,
            ObjectMapper om
    ) {
        this.apiKey = apiKey;
        this.model = model;
        this.om = om;
        this.http = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public boolean enabled() {
        return apiKey != null && !apiKey.isBlank();
    }

    /** ✅ 컨트롤러가 호출하는 메서드 (장소명만 Optional로 반환) */
    public Optional<String> extractPlaceName(String text, boolean hasWhereKeyword) {
        if (!enabled()) return Optional.empty();

        String system = """
            당신은 한국어 입력에서 '장소 위치 문의'의 장소명을 추출하는 도우미입니다.
            반드시 JSON만 반환하세요. 예: {"place_name":"로고스홀"}
            영문/대소문자/띄어쓰기/별칭을 한국어 고유명사로 정규화하려 노력하세요.
            예: "Logos Hall" → "로고스홀"
            """;
        String user = (hasWhereKeyword ? "[HINT:place_where] " : "") + text;

        try {
            JsonNode req = om.createObjectNode()
                    .put("model", model)
                    .put("temperature", 0.0)
                    .set("messages", om.readTree("""
                        [
                          {"role":"system","content":%s},
                          {"role":"user","content":%s}
                        ]
                    """.formatted(om.writeValueAsString(system), om.writeValueAsString(user))));

            JsonNode resp = http.post()
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(req.toString())
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            String content = resp.at("/choices/0/message/content").asText("");
            int i = content.indexOf('{'), j = content.lastIndexOf('}');
            if (i >= 0 && j > i) content = content.substring(i, j + 1);

            String place = om.readTree(content).path("place_name").asText(null);
            return Optional.ofNullable(place);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    /* (선택) 예전 버전 호환용: Intent 객체를 반환하는 메서드가 필요하면 여기에 추가 가능
    public static class Intent {
        public String type;
        public String place_name;
    }
    public Optional<Intent> interpretPlace(String text) { ... }
    */
}