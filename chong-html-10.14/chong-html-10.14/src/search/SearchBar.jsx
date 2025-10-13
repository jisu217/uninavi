import React, { useEffect, useMemo, useRef, useState } from "react";
import "./search.css";
import { searchByCourse, todayYYYYMMDD } from "./searchApi";

// ✅ 표기 흔들림 흡수: 공백/괄호 제거 + '동' 접미 제거 + 소문자
const normBuilding = (s = "") =>
  s.replace(/\s+/g, "")
    .replace(/[()［\]{}]/g, "")
    .replace(/동$/i, "")
    .toLowerCase();

// ✅ 강의실 이름 → 공백, 괄호 제거
const normRoomId = (s = "") => s.replace(/\s+/g, "").replace(/[()［\]{}]/g, "");

// ✅ 강의 상태별 점 색상 매핑
const STATUS_TO_DOT = {
  IN_CLASS: "dot-danger",
  SOON: "dot-warn",
  IDLE: "dot-ok",
  OVER: "dot-muted",
};

// ✅ 건물명 → 라우트 경로 매핑
const routeForBuilding = (raw = "") => {
  const key = raw.replace(/\s+/g, "").replace(/동$/i, "").toLowerCase();
  return {
    "갈멜관": "/galmel",
    "모리아관": "/Moria",
    "복음관": "/Bogeum",
    "밀알관": "/Milal",
    "일립관a": "/IllipA",
    "일립관b": "/IllipB",
  }[key];
};

export default function SearchBar({
  /** 현재 화면의 건물명 (예: "일립관 b") — 같은 건물 결과를 우선 선택 */
  currentBuilding,
  /** 같은 건물 결과 클릭 시 내부 이동 처리 */
  onSelectSameBuilding, // ({ floor, roomId }) => void
  /** 다른 건물 결과 클릭 시 라우팅 처리 */
  onNavigateOther, // ({ building, floor, roomId }) => void
  placeholder = "강의실/과목/건물 검색",
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);
  const wrapRef = useRef(null);

  /* ----------------------------- 외부 클릭 감지 ----------------------------- */
  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  /* ----------------------------- 디바운스 검색 ----------------------------- */
  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const h = setTimeout(async () => {
      const text = q.trim();
      if (!text) {
        setList([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const results = await searchByCourse({
          q: text,
          date: todayYYYYMMDD(),
          signal: ctrl.signal,
        });
        setList(results);
      } catch (err) {
        console.error("search error:", err);
        setList([]);
      } finally {
        setLoading(false);
        setOpen(true);
      }
    }, 250);

    return () => {
      clearTimeout(h);
      ctrl.abort?.();
    };
  }, [q]);

  /* ---------------------- 현재 건물 우선 정렬 (same > others) ---------------------- */
  const items = useMemo(() => {
    const nb = normBuilding(currentBuilding || "");
    const same = [];
    const others = [];
    for (const r of list) {
      if (normBuilding(r.building) === nb) same.push(r);
      else others.push(r);
    }
    return [...same, ...others];
  }, [list, currentBuilding]);

  /* ----------------------------- 결과 클릭 처리 ----------------------------- */
  const handlePick = (it) => {
    const b = normBuilding(it.building);
    const cb = normBuilding(currentBuilding || "");
    const roomId = normRoomId(it.room);

    /* ===== 같은 건물일 경우 ===== */
    if (b === cb) {
      if (onSelectSameBuilding) {
        onSelectSameBuilding({ floor: it.floor, roomId });
      } else {
        // ✅ 폴백: 직접 쿼리스트링으로 갱신
        const url = new URL(window.location.href);
        url.searchParams.set("floor", String(it.floor));
        url.searchParams.set("room", roomId);
        window.location.href = url.toString();
      }
      setOpen(false);
      return;
    }

    /* ===== 다른 건물일 경우 ===== */
    if (onNavigateOther) {
      onNavigateOther({ building: it.building, floor: it.floor, roomId });
    } else {
      // ✅ 폴백: 자동 라우트 이동
      const to = routeForBuilding(it.building);
      if (to) {
        const full = `${to}?floor=${it.floor}&room=${encodeURIComponent(roomId)}`;
        console.log("Auto navigate to:", full);
        window.location.href = full;
      } else {
        console.warn("No route mapping for:", it.building);
      }
    }

    setOpen(false);
  };

  /* ----------------------------- 렌더링 ----------------------------- */
  return (
    <div className="searchbar-wrap" ref={wrapRef}>
      <input
        className="searchbar-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => q.trim() && setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        placeholder={placeholder}
      />
      <button
        className="searchbar-btn"
        aria-label="검색"
        onClick={() => setOpen(true)}
      >
        <img src="/search.png" alt="검색" width="18" height="18" />
      </button>

      {open && (
        <div className="searchbar-panel">
          {loading && <div className="searchbar-empty">검색중…</div>}
          {!loading && items.length === 0 && (
            <div className="searchbar-empty">검색 결과가 없습니다.</div>
          )}

          {!loading &&
            items.map((it, idx) => (
              <div
                key={`${it.building}-${it.floor}-${it.room}-${idx}`}
                className="searchbar-item"
                onClick={() => handlePick(it)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handlePick(it)}
              >
                <div
                  className={`status-dot ${
                    STATUS_TO_DOT[it.status] || "dot-muted"
                  }`}
                />
                <div className="item-main">
                  <div className="item-title">{it.course}</div>
                  <div className="item-meta">
                    {it.building} · {it.floor}층 · {it.room}
                  </div>
                </div>
                {it.start && it.end && (
                  <div className="item-time">
                    {it.start}~{it.end}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}