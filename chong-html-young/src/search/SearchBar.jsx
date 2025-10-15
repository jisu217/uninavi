// src/search/SearchBar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./search.css";
import { searchByCourse, todayYYYYMMDD } from "./searchApi";

const normBuilding = (s = "") =>
  s.replace(/\s+/g, "").replace(/[()［\]{}]/g, "").replace(/동$/i, "").toLowerCase();

const normRoomId = (s = "") => s.replace(/\s+/g, "").replace(/[()［\]{}]/g, "");

const STATUS_TO_DOT = {
  IN_CLASS: "dot-danger",
  SOON: "dot-warn",
  IDLE: "dot-ok",
  OVER: "dot-muted",
};

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
  currentBuilding,
  onSelectSameBuilding, // ({ floor }) => void
  onNavigateOther,      // ({ building, floor }) => void
  placeholder = "강의실/과목/건물 검색",
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

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
      } catch {
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

  const handlePick = (it) => {
    const b = normBuilding(it.building);
    const cb = normBuilding(currentBuilding || "");

    if (b === cb) {
      // 같은 건물: 층만 이동
      if (onSelectSameBuilding) {
        onSelectSameBuilding({ floor: it.floor });
      } else {
        const url = new URL(window.location.href);
        url.searchParams.set("floor", String(it.floor));
        url.searchParams.delete("room");
        window.location.href = url.toString();
      }
      setOpen(false);
      return;
    }

    // 다른 건물: 항상 floor만 전달
    if (onNavigateOther) {
      onNavigateOther({ building: it.building, floor: it.floor });
    } else {
      const to = routeForBuilding(it.building);
      if (to) {
        window.location.href = `${to}?floor=${it.floor}`;
      }
    }
    setOpen(false);
  };

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
      <button className="searchbar-btn" aria-label="검색" onClick={() => setOpen(true)}>
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
                <div className={`status-dot ${STATUS_TO_DOT[it.status] || "dot-muted"}`} />
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