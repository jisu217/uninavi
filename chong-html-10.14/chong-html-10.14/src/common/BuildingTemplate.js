// src/common/BuildingTemplate.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../search/SearchBar";

/** yyyy-mm-dd (로컬타임) */
function todayYYYYMMDD() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** 표기 흔들림 흡수 유틸 */
const normRoomId = (s = "") => s.replace(/\s+/g, "").replace(/[()［\]{}]/g, "");

/** 공통 API 호출 */
async function fetchRoomsDay({ building, floor, date }) {
  const params = new URLSearchParams({ building, floor: String(floor) });
  if (date) params.set("date", date);
  const url = `/api/rooms/day?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

// 건물명 → 라우트 매핑 (정규화된 키 사용)
const mapBuildingPath = (raw = "") => {
  const key = raw
    .replace(/\s+/g, "")
    .replace(/동$/i, "")
    .toLowerCase();

  const routes = {
    "갈멜관": "/galmel",
    "모리아관": "/Moria",
    "복음관": "/Bogeum",
    "밀알관": "/Milal",
    "일립관a": "/IllipA",
    "일립관b": "/IllipB",
  };
  return routes[key];
};

export default function BuildingTemplate({
  building, // 예: "일립관 b" (동 제거, b 소문자)
  floors,
  floorPlans,
  ui = defaultUI,
  statusMap = defaultStatusMap,
  defaultFloor = floors?.[0]?.value ?? 1,
  date = todayYYYYMMDD(),
}) {
  const [floor, setFloor] = useState(defaultFloor);
  const [data, setData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const location = useLocation();
  const isHome = location.pathname === "/"; // 홈에서만 검색창 노출

  // URL 쿼리 반영: ?floor=..&room=..
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const f = p.get("floor");
    const r = p.get("room");
    if (f && !Number.isNaN(Number(f))) setFloor(Number(f));
    if (r) setSelectedRoom({ id: normRoomId(r), type: "ROOM" });
  }, [location.search]);

  // 층 바뀌면 선택 초기화 (URL로 room이 들어온 경우엔 위 이펙트가 다시 선택을 세팅)
  useEffect(() => {
    setSelectedRoom(null);
  }, [floor]);

  // 데이터 로딩
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const json = await fetchRoomsDay({ building, floor, date });
        setData(json);
      } catch (e) {
        console.error(e);
        setData(null);
      }
    })();
    return () => ctrl.abort();
  }, [building, floor, date]);

  const rooms = data?.rooms ?? [];

  return (
    <div className={ui.page}>
      {/* 헤더 */}
      <header className={ui.header}>
        <div className={ui.logo}>
          유니
          <br />
          나비
        </div>

        {/* 홈(/)에서만 검색창 보이기 */}
        {isHome && (
          <div className={ui.search}>
            <SearchBar
              currentBuilding={building}
              onSelectSameBuilding={({ floor: toFloor, roomId }) => {
                setFloor(toFloor);
                setSelectedRoom({ id: roomId, type: "ROOM" });
                // 주소창도 동기화하고 싶으면 아래 주석 해제:
                // const url = new URL(window.location.href);
                // url.searchParams.set("floor", String(toFloor));
                // url.searchParams.set("room", roomId);
                // window.history.replaceState({}, "", url);
              }}
              onNavigateOther={({ building: bName, floor: toFloor, roomId }) => {
                const to = mapBuildingPath(bName);
                if (to) {
                  // 다른 건물 라우팅: 쿼리로 floor/room 전달
                  window.location.href = `${to}?floor=${toFloor}&room=${encodeURIComponent(
                    roomId
                  )}`;
                }
              }}
              placeholder={ui.placeholders?.search ?? "과목명 검색"}
            />
          </div>
        )}
      </header>

      {/* 건물명 */}
      <div className={ui.buildingName}>{building}</div>

      {/* 층 버튼 */}
      <nav
        className={`${ui.floorTabs} ${
          floors.length > 4 ? "scrollable" : "centered"
        }`}
      >
        {floors.map((f) => (
          <button
            key={f.value}
            className={`${ui.floorBtn} ${floor === f.value ? ui.floorBtnActive : ""}`.trim()}
            onClick={() => {
              setSelectedRoom(null);
              setFloor(f.value);
            }}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {/* 층별 평면도 */}
      <main className={ui.mapContainer} key={floor}>
        {Object.entries(floorPlans).map(([fv, Comp]) =>
          Number(fv) === floor ? (
            <Comp
              key={fv}
              roomsData={rooms}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          ) : null
        )}
      </main>

      {/* 카드 영역 */}
      {selectedRoom?.type === "ROOM" && (
        <section className={ui.classList}>
          <div className="building-class-card">
            <h2 className="classroom-title">{selectedRoom.id}</h2>
            <hr className="divider" />
            {(() => {
              const room = rooms.find(
                (r) => normRoomId(r.room) === normRoomId(selectedRoom.id)
              );
              if (!room || room.sessions.length === 0) {
                return <p className="building-muted">오늘 수업이 없습니다.</p>;
              }
              return room.sessions.map((s, i) => {
                const st = statusMap[s.status] ?? {};
                return (
                  <div key={i} className="session-card">
                    <div className="session-info">
                      <span className="session-time">
                        {s.start}~{s.end}
                      </span>
                      <span className="session-title">{s.course}</span>
                      <span className="session-prof">/ {s.prof}</span>
                    </div>
                    {st.text && (
                      <div className={`status-badge ${st.type}`}>{st.text}</div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </section>
      )}

      {selectedRoom?.type === "ADMIN" && (
        <section className={ui.classList}>
          <div className="building-class-card">
            <h2 className="classroom-title">{selectedRoom.id}</h2>
            <hr className="divider" />
            {selectedRoom.content}
          </div>
        </section>
      )}
    </div>
  );
}

/* ===== 기본 UI ===== */
const defaultUI = {
  page: "building-page",
  header: "building-header",
  logo: "building-logo",
  search: "building-search",
  buildingName: "building-name",
  floorTabs: "building-floor-tabs",
  floorBtn: "building-floor-btn",
  floorBtnActive: "active",
  mapContainer: "floor-map",
  classList: "building-class-list",
  muted: "building-muted",
  placeholders: {
    search: "강의실/과목/건물 검색",
  },
};

/* 상태 문구/배지 스타일 매핑 */
const defaultStatusMap = {
  IN_CLASS: { type: "danger", text: "현재 수업이 진행중입니다!" },
  SOON: { type: "warn", text: "수업이 곧 시작됩니다!" },
  IDLE: { type: "ok", text: "빈 강의실" },
  OVER: { type: "over", text: "오늘 수업 종료" },
};