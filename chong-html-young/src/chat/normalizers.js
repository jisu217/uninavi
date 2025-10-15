// 표기 흔들림 흡수
export const norm = (s = "") =>
  s.toString().trim().replace(/\s+/g, "").replace(/[()［\]{}]/g, "").toLowerCase();

export const BUILDING_LABEL = {
  moria: "모리아관",
  galmel: "갈멜관",
  bogeum: "복음관",
  milal: "밀알관",
  illipA: "일립관A",
  illipB: "일립관B",
};

// 라우트 정보는 지금 안 씀(지도 이동 X)이지만 레퍼런스로 보관
export const BUILDING_ROUTE = {
  moria:  "/Moria",
  galmel: "/galmel",
  bogeum: "/Bogeum",
  milal:  "/Milal",
  illipA: "/IllipA",
  illipB: "/IllipB",
};

// 별칭 → 키 (A/B는 무조건 대문자로 고정)
const ALIASES = [
  ["moria",  "모리아", "모리아관"],
  ["galmel", "갈멜", "갈멜관", "galmel"],
  ["bogeum", "복음", "복음관", "bogeum"],
  ["milal",  "밀알", "밀알관", "milal"],
  ["illipA", "일립a", "일립관a", "일립 a", "일립A", "일립관A", "illip a", "illipA"],
  ["illipB", "일립b", "일립관b", "일립 b", "일립B", "일립관B", "illip b", "illipB"],
];

export function findBuildingKey(text = "") {
  const t = norm(text);
  for (const [key, ...names] of ALIASES) {
    if (names.some((n) => t.includes(norm(n)))) return key;
  }
  return null;
}

export function extractFloor(text = "") {
  const t = text.toLowerCase();
  // B1/지하1/-1/1층/2층...
  const b = t.match(/\b[bB]\s*-?\s*(\d+)\b/) || t.match(/지하\s*(\d+)/);
  if (b) return -parseInt(b[1], 10);
  const p = t.match(/(-?\d+)\s*층/);
  if (p) return parseInt(p[1], 10);
  return null;
}

export function extractRoomId(text = "") {
  const m = text.match(/(\d{2,4})\s*(호|호실)?/);
  return m ? m[1] : null;
}

export function parseFindRoom(text = "") {
  const buildingKey = findBuildingKey(text);
  const floor = extractFloor(text);
  const roomId = extractRoomId(text);
  return { buildingKey, floor, roomId };
}