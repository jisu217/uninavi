// src/Moria/FloorPlanMoria3.jsx
import React, { useMemo } from "react";

const statusToBox = (status) => {
  switch (status) {
    case "IN_CLASS": return "box-danger";
    case "SOON": return "box-warn";
    case "IDLE": return "box-ok";
    case "OVER": return "box-muted";
    default: return "box-muted";
  }
};

const normalize = (s = "") => (s ? String(s).replace(/\s+/g, "") : "");
const CANVAS = { width: 900, height: 265 };

const ROOMS = [
  { id: "모리아관301호", label: <>모리아관<br />301호</>, style: { top: "40px", left: "20px", width: "170px" } },
  { id: "모리아관305호", label: <>모리아관<br />305호</>, style: { top: "40px", left: "210px", width: "170px" } },
  { id: "모리아관308호", label: <>모리아관<br />308호</>, style: { top: "40px", left: "550px", width: "120px" } },
  { id: "모리아관310호", label: <>모리아관<br />310호</>, style: { top: "40px", left: "680px", width: "120px" } },
];

export default function FloorPlanMoria3({ roomsData = [], selectedRoom, setSelectedRoom }) {
  const roomState = useMemo(() => {
    const map = {};
    roomsData.forEach((r) => {
      const key = normalize(r.room);
      const sessions = r.sessions ?? [];
      let cls = "box-ok";
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

  const handleClick = (id) => {
    setSelectedRoom(
      selectedRoom?.id === id ? null : { id, type: "ROOM" }
    );
  };

  return (
    <div className="building-floorplan-scroll">
      <div className="building-floorplan-canvas" style={{ width: CANVAS.width, height: CANVAS.height }}>
        {/* 동적 강의실 */}
        {ROOMS.map((r) => {
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

        {/* 교수연구실 등 고정 영역 */}
        <div className="building-room" style={{ top: "160px", left: "810px", width: "80px", fontSize: "12px", height: "110px" }}>
          유아흡연위해<br />예방운영사무국
        </div>

        {/* 장치 */}
        <div className="building-deco building-deco-elevator" style={{ top: "236px", left: "60px" }}>엘리베이터</div>
        <div className="building-deco building-deco-stairs" style={{ top: "0px", left: "430px", width: "100px" }}>계단</div>
        <div className="building-deco building-deco-stairs" style={{ top: "0px", left: "820px", width: "60px", height: "110px" }}>계단</div>
      </div>
    </div>
  );
}