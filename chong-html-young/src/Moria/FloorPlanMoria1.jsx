// src/Moria/FloorPlanMoria1.jsx
import React, { useMemo } from "react";

/** 상태 → CSS 클래스 */
const statusToBox = (status) => {
  switch (status) {
    case "IN_CLASS": return "box-danger"; // 빨강(수업중)
    case "SOON":     return "box-warn";   // 노랑(곧 시작)
    case "IDLE":     return "box-ok";     // 초록(빈 강의실)
    case "OVER":     return "box-muted";  // 회색(오늘 종료)
    default:         return "box-muted";  // 기본
  }
};

/** 공백 제거(백엔드 "모리아관 108호" vs 프론트 "모리아관108호" 정규화) */
const normalize = (s = "") => (s ? String(s).replace(/\s+/g, "") : "");

const CANVAS = { width: 900, height: 265 };

/** 화면에 표시할 “동적으로 색칠/클릭할 대상 강의실” 목록(좌표 포함) */
const ROOMS_1F = [
  { id: "모리아관108호", label: <>모리아관<br/>108호</>, style: { top: "40px", left: "420px", width: "80px" } },
  { id: "모리아관109호", label: <>모리아관<br/>109호</>, style: { top: "40px", left: "520px", width: "80px" } },
  { id: "모리아관110호", label: <>모리아관<br/>110호</>, style: { top: "40px", left: "620px", width: "80px" } },
  // 필요하면 더 추가
];

export default function FloorPlanMoria1({ roomsData = [], selectedRoom, setSelectedRoom }) {
  /** roomsData → { "모리아관108호": "box-ok", ... } */
  const roomState = useMemo(() => {
    const map = {};
    roomsData.forEach((r) => {
      const key = normalize(r.room);
      const sessions = r.sessions ?? [];
      let cls = "box-ok"; // 기본: 수업 없으면 빈 강의실(초록)
      if (sessions.length > 0) {
        const statuses = sessions.map((s) => s.status);
        if (statuses.includes("IN_CLASS")) cls = statusToBox("IN_CLASS");
        else if (statuses.includes("SOON")) cls = statusToBox("SOON");
        else if (statuses.includes("IDLE")) cls = statusToBox("IDLE");
        else if (statuses.includes("OVER")) cls = statusToBox("OVER");
      }
      map[key] = cls;
    });
    return map;
  }, [roomsData]);

  const handleClick = (roomId) => {
    setSelectedRoom(
      selectedRoom?.id === roomId ? null : { id: roomId, type: "ROOM" }
    );
  };

  return (
    <div className="building-floorplan-scroll">
      <div
        className="building-floorplan-canvas"
        style={{ width: CANVAS.width, height: CANVAS.height }}
      >
        {/* ===== 강의실(고정 표기: 색칠 X) ===== */}
        <div className="building-room" style={{ top: "40px", left: "10px" }}>대학원<br/>원우회실</div>
        <div className="building-room" style={{ top: "40px", left: "80px" }}>동아리<br/>연합회실</div>
        <div className="building-room" style={{ top: "40px", left: "150px" }}>공용<br/>회의실</div>
        <div className="building-room-chonghak" style={{ top: "40px", left: "220px" }}>총학생회실</div>
        <div className="building-room" style={{ top: "40px", left: "720px", width: "80px" }}>한국어<br/>교육센터</div>

        {/* ===== 장치 ===== */}
        <div className="building-deco building-deco-elevator" style={{ top: "235px", left: "60px" }}>엘리베이터</div>
        <div className="building-deco building-deco-stairs" style={{ top: "60px", left: "330px", width: "70px" }}>계단</div>
        <div className="building-deco building-deco-door" style={{ top: "150px", left: "-10px" }}>입구</div>
        <div className="building-deco building-deco-door2" style={{ top: "0px", left: "330px", width: "70px", borderRadius: "0 0 15px 15px" }}>입구2</div>

        {/* ===== 한국어 교육원 존(동적 색칠 + 클릭/호버/하이라이트) ===== */}
        {ROOMS_1F.map((r) => {
          const key = normalize(r.id);
          const stateClass = roomState[key] || "box-muted";
          const highlight = selectedRoom?.id === r.id ? "is-highlight" : "";
          return (
            <div
              key={r.id}
              className={`building-room clickable ${stateClass} ${highlight}`.trim()}
              style={r.style}
              onClick={() => handleClick(r.id)}
              onKeyDown={(e) => e.key === "Enter" && handleClick(r.id)}
              role="button"
              tabIndex={0}
            >
              {r.label}
            </div>
          );
        })}

        <div className="building-deco building-deco-stairs" style={{ top: "0px", left: "815px", width: "70px" }}>계단</div>
      </div>
    </div>
  );
}