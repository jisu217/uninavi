import { INTENT_TRIGGERS, STATUS_TEXT } from "./intentConfig";
import { parseFindRoom, BUILDING_LABEL } from "./normalizers";

/* ===== 공통 유틸 ===== */
async function searchAPI(q) {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    if (!res.ok) return [];
    return await res.json(); // [{type,label,buildingPath,building,floor,room}, ...]
  } catch {
    return [];
  }
}

async function fetchRoomsDay({ building, floor }) {
  try {
    const params = new URLSearchParams({ building, floor: String(floor) });
    const res = await fetch(`/api/rooms/day?${params.toString()}`);
    if (!res.ok) return null;
    return await res.json(); // { rooms: [...] }
  } catch {
    return null;
  }
}

/* ===== 의도 판별 ===== */
function detectIntent(text = "") {
  const t = text.trim();
  if (!t) return "room_where";
  const hit = (id) => INTENT_TRIGGERS[id].some((re) => re.test(t));
  if (hit("room_status")) return "room_status";
  if (hit("floor_idle"))  return "floor_idle";
  if (hit("room_where"))  return "room_where";
  return "room_where";
}

/* ===== 응답기 ===== */

// 1) 위치
async function handleRoomWhere(userText) {
  const { buildingKey, floor, roomId } = parseFindRoom(userText);
  if (!buildingKey) {
    return { message: "어느 건물인지 알려주세요. 예) 모리아관 301", done: true };
  }
  const building = BUILDING_LABEL[buildingKey];

  // floor가 없고 room은 있으면 /api/search로 보완 시도
  let f = floor;
  if (f == null && roomId) {
    const hits = await searchAPI(`${building} ${roomId}`);
    const top = hits.find((h) => h.type === "room" && h.room === roomId && h.building === building);
    if (top && top.floor != null) f = top.floor;
  }

  if (roomId && f != null) {
    return { message: `${building} ${f}층 ${roomId}호입니다.`, done: true };
  }

  // 건물만 있거나 부분 누락 시
  if (!roomId && f != null) {
    return { message: `${building} ${f}층의 강의실 번호도 알려주세요. 예) ${building} ${f}층 301`, done: true };
  }
  if (roomId && f == null) {
    return { message: `${building}의 층도 함께 알려주세요. 예) ${building} 3층 ${roomId}`, done: true };
  }
  return { message: `${building}의 층과 강의실을 함께 알려주세요. 예) ${building} 301`, done: true };
}

// 2) 특정 강의실 상태
async function handleRoomStatus(userText) {
  const { buildingKey, floor, roomId } = parseFindRoom(userText);
  if (!buildingKey) return { message: "어느 건물인지 알려주세요. 예) 모리아관 301", done: true };
  if (!roomId)      return { message: "강의실 번호도 알려주세요. 예) 301호", done: true };

  const building = BUILDING_LABEL[buildingKey];

  // floor 보완 시도
  let f = floor;
  if (f == null) {
    const hits = await searchAPI(`${building} ${roomId}`);
    const top = hits.find((h) => h.type === "room" && h.room === roomId && h.building === building);
    if (top && top.floor != null) f = top.floor;
  }
  if (f == null) return { message: `${building}의 몇 층인지도 알려주세요. 예) ${building} 3층 ${roomId}`, done: true };

  // 상태 조회
  const data = await fetchRoomsDay({ building, floor: f });
  const target = data?.rooms?.find((r) => String(r.roomId) === String(roomId));

  let statusMsg = "정보를 찾을 수 없습니다.";
  if (target?.status && STATUS_TEXT[target.status]) {
    statusMsg = STATUS_TEXT[target.status];
  }

  return { message: `${building} ${f}층 ${roomId}호는 ${statusMsg}`, done: true };
}

// 3) 특정 층의 빈 강의실
async function handleFloorIdle(userText) {
  const { buildingKey, floor } = parseFindRoom(userText);
  if (!buildingKey) return { message: "어느 건물인지 알려주세요. 예) 복음관 2층 빈 강의실 있어?", done: true };
  if (floor == null) return { message: "몇 층인지도 알려주세요. 예) 복음관 2층 빈 강의실", done: true };

  const building = BUILDING_LABEL[buildingKey];
  const data = await fetchRoomsDay({ building, floor });
  const idle = (data?.rooms || []).filter((r) => r.status === "IDLE").map((r) => r.roomId);

  if (idle.length === 0) {
    return { message: `${building} ${floor}층에는 지금 빈 강의실이 없습니다.`, done: true };
  }
  const list = idle.slice(0, 10).join(", ");
  const more = idle.length > 10 ? ` 외 ${idle.length - 10}개` : "";
  return { message: `${building} ${floor}층 빈 강의실: ${list}${more}`, done: true };
}

/* ===== 엔진 진입점 ===== */
export async function answer(userText) {
  const intent = detectIntent(userText);

  if (intent === "room_status") return handleRoomStatus(userText);
  if (intent === "floor_idle")  return handleFloorIdle(userText);
  // 기본
  return handleRoomWhere(userText);
}