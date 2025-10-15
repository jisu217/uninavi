/** yyyy-mm-dd (local) */
export function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * 과목/강의로 검색
 * 백엔드 기대 응답:
 * [
 *   { type:"session", course:"전도훈련", building:"일립관 b", floor:4, room:"일립관 405호",
 *     start:"13:40", end:"15:20", status:"IN_CLASS"|"SOON"|"IDLE"|"OVER" }
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