package com.ai.uninavi.chatbot.phone;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class PhoneSearchService {

    @Value("${ext.phone.pages:https://www.bible.ac.kr/ko/intro/work}")
    private String pagesProp;

    @Value("${ext.phone.cache-minutes:180}")
    private int cacheMinutes;

    private List<PhoneContact> cache = null;
    private Instant expireAt = Instant.EPOCH;

    public synchronized void refresh() {
        cache = null;
        expireAt = Instant.EPOCH;
        System.out.println("[phone] cache invalidated");
    }

    public synchronized List<PhoneContact> search(String keyword, String mode) {
        if (cache == null || Instant.now().isAfter(expireAt)) {
            cache = scrapeAllPages();
            expireAt = Instant.now().plus(Duration.ofMinutes(cacheMinutes));
            System.out.println("[phone] cache loaded rows = " + cache.size());
        }

        String q = norm(keyword);
        if (q.equals("교목실")) q = "교목";
        if (q.equals("입학처")) q = "입학";
        if (q.equals("기획실") || q.equals("기획부")) q = "기획";

        List<PhoneContact> out = new ArrayList<>();
        for (PhoneContact c : cache) {
            if (contains(norm(c.dept()), q) ||
                    contains(norm(c.position()), q) ||
                    contains(norm(c.person()), q) ||
                    contains(norm(c.section()), q) ||
                    contains(norm(c.tel()), q)) {
                out.add(c);
            }
        }

        if (!"all".equalsIgnoreCase(mode) && out.size() > 1) {
            return List.of(out.get(0));
        }
        return out;
    }

    private List<PhoneContact> scrapeAllPages() {
        List<String> urls = splitPages(pagesProp);
        System.out.println("[phone] scraping urls = " + urls);

        List<PhoneContact> gathered = new ArrayList<>();

        for (String url : urls) {
            try {
                Document doc = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.1 Safari/537.36")
                        .referrer("https://www.bible.ac.kr/")
                        .timeout(15000)
                        .get();

                Element content = doc.selectFirst("#content");
                List<PhoneContact> added = new ArrayList<>();
                if (content != null) {
                    Document sub = Document.createShell(doc.baseUri());
                    sub.body().appendChild(content.clone());
                    added.addAll(parseTables(sub, url));
                }
                if (added.isEmpty()) {
                    added.addAll(parseTables(doc, url));
                }

                System.out.printf("[phone] parsed rows from '%s' = %d%n", url, added.size());
                gathered.addAll(added);

            } catch (Exception e) {
                System.out.printf("[phone] ERROR '%s': %s%n", url, e.toString());
            }
        }

        Map<String, PhoneContact> dedup = new LinkedHashMap<>();
        for (PhoneContact d : gathered) {
            if (isBlank(d.tel())) continue;
            String key = norm(d.dept()) + "|" + norm(d.position()) + "|" + norm(d.person());
            PhoneContact prev = dedup.get(key);
            if (prev == null || d.tel().length() > prev.tel().length()) {
                dedup.put(key, d);
            }
        }
        return new ArrayList<>(dedup.values());
    }

    private List<PhoneContact> parseTables(Document doc, String url) {
        List<PhoneContact> out = new ArrayList<>();

        for (Element table : doc.select("table")) {
            // 섹션명 추정
            String section = "";
            Element cap = table.selectFirst("caption");
            if (cap != null) {
                section = clean(cap.text());
            } else {
                section = guessPreviousTitle(table);
            }

            // 헤더행
            Element headerRow = null;
            for (Element tr : table.select("tr")) {
                if (!tr.select("th").isEmpty()) { headerRow = tr; break; }
            }
            if (headerRow == null) continue;

            // 헤더 인덱스 매핑
            Integer cDept = null, cPos = null, cName = null, cTel = null;
            int idx = 0;
            for (Element th : headerRow.select("th")) {
                String h = clean(th.text()).toLowerCase(Locale.ROOT);
                if (containsAny(h, List.of("부서", "보직", "부서명"))) cDept = idx;
                else if (containsAny(h, List.of("직책", "직급", "직위"))) cPos = idx;
                else if (containsAny(h, List.of("성명", "이름"))) cName = idx;
                else if (containsAny(h, List.of("연락처", "전화", "tel", "전화번호"))) cTel = idx;
                idx++;
            }
            // 안전장치: 부서 열을 못 찾으면 첫 열을 부서로
            if (cDept == null) cDept = 0;

            // 🔧 여기 핵심 수정: 테이블 전체 TR을 순회하면서 헤더 이후만 처리
            boolean seenHeader = false;
            String carryDept = "", carryPos = "", carryName = "";

            for (Element tr : table.select("tr")) {
                if (!seenHeader) {
                    if (tr == headerRow) seenHeader = true; // 다음부터 데이터 행
                    continue;
                }
                Elements tds = tr.select("td");
                if (tds.isEmpty()) continue;

                String dept = pick(tds, cDept);
                String pos  = pick(tds, cPos);
                String name = pick(tds, cName);
                String tel  = pick(tds, cTel);

                if (isBlank(tel)) tel = firstPhone(tr.text());
                if (isBlank(dept)) dept = carryDept;
                if (isBlank(pos))  pos  = carryPos;
                if (isBlank(name)) name = carryName;

                if (!isBlank(dept)) carryDept = dept;
                if (!isBlank(pos))  carryPos  = pos;
                if (!isBlank(name)) carryName = name;

                if (!isBlank(tel) && !isBlank(dept)) {
                    if (dept.endsWith("목") && !dept.endsWith("목실")) dept = dept + "실";
                    out.add(new PhoneContact(
                            clean(dept),
                            clean(pos),
                            clean(name),
                            clean(tel),
                            section,
                            url
                    ));
                }
            }
        }
        return out;
    }

    private String guessPreviousTitle(Element table) {
        Element cur = table.previousElementSibling();
        int hop = 0;
        while (cur != null && hop < 5) {
            Element h = cur.selectFirst("h3, h4, .dot_tit, .dot_tit2");
            if (h != null) return clean(h.text());
            cur = cur.previousElementSibling();
            hop++;
        }
        return "";
    }

    // ===== util =====
    private static final Pattern PHONE_RE = Pattern.compile("(\\d{2,3})[-.\\s]?(\\d{3,4})[-.\\s]?(\\d{4})");

    private static String firstPhone(String text) {
        if (text == null) return null;
        Matcher m = PHONE_RE.matcher(text);
        return m.find() ? (m.group(1) + "-" + m.group(2) + "-" + m.group(3)) : null;
    }

    private static String pick(Elements tds, Integer i) {
        if (i == null) return null;
        if (i >= 0 && i < tds.size()) return clean(tds.get(i).text());
        return null;
    }

    private static boolean contains(String base, String q) {
        return base != null && !q.isBlank() && base.contains(q);
    }

    private static boolean containsAny(String text, List<String> keys) {
        for (String k : keys) if (text.contains(k)) return true;
        return false;
    }

    private static boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
    private static String clean(String s) { return s == null ? "" : s.replaceAll("\\s+", " ").trim(); }
    private static String norm(String s) { return s == null ? "" : s.toLowerCase(Locale.ROOT).replaceAll("\\s+", ""); }

    private static List<String> splitPages(String prop) {
        if (prop == null || prop.isBlank()) return List.of();
        String[] arr = prop.split("[,\\n]");
        List<String> urls = new ArrayList<>();
        for (String a : arr) {
            String u = a.trim();
            if (!u.isEmpty()) urls.add(u);
        }
        return urls;
    }
}