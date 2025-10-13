// src/search/searchApi.js

/** yyyy-mm-dd (local) */
export function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * 과목명(수업명)으로 검색. 오늘 날짜를 함께 보내 백엔드가 요일/날짜 필터링 후 반환.
 * 기대 응답 형식(예시):
 * [
 *   {
 *     type: "session",
 *     course: "전도훈련",
 *     building: "일립관 b",   // '동' 제거, 소문자 규칙
 *     floor: 4,
 *     room: "일립관 405호",
 *     start: "13:40",
 *     end: "15:20",
 *     status: "IN_CLASS" | "SOON" | "IDLE" | "OVER"
 *   },
 *   ...
 * ]
 */
export async function searchByCourse({ q, date = todayYYYYMMDD(), signal } = {}) {
  const text = (q || "").trim();
  if (!text) return [];

  const url = `/api/search/rooms?q=${encodeURIComponent(text)}&date=${encodeURIComponent(date)}`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}