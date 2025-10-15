// src/galmel/FloorPlanGalmel2.jsx
import React, { useMemo } from "react";

const statusToBox = (s) => {
  switch (s) {
    case "IN_CLASS": return "box-danger";
    case "SOON": return "box-warn";
    case "IDLE": return "box-ok";
    case "OVER": return "box-muted";
    default: return "box-muted";
  }
};
const normalize = (s = "") => (s ? String(s).replace(/\s+/g, "") : "");

const CANVAS = { width: 600, height: 250 };

const ROOMS = [
  { id: "AI융합실습실4", label: "AI융합실습실4", style: { top: 160, left: 190, width: 80, height: 100 } },
  { id: "AI융합실습실3", label: "AI융합실습실3", style: { top: 160, left: 290, width: 80, height: 100 } },
  { id: "AI융합실습실2", label: "AI융합실습실2", style: { top: 160, left: 390, width: 80, height: 100 } },
];

export default function FloorPlanGalmel2({ roomsData = [], selectedRoom, setSelectedRoom }) {
  const roomState = useMemo(() => {
    const map = {};
    roomsData.forEach((r) => {
      const key = normalize(r.room);
      const sessions = r.sessions ?? [];
      let cls = "box-ok";
      if (sessions.length > 0) {
        const st = sessions.map(s => s.status);
        if (st.includes("IN_CLASS")) cls = statusToBox("IN_CLASS");
        else if (st.includes("SOON")) cls = statusToBox("SOON");
        else if (st.includes("IDLE")) cls = statusToBox("IDLE");
        else if (st.includes("OVER")) cls = statusToBox("OVER");
      }
      map[key] = cls;
    });
    return map;
  }, [roomsData]);

  const handleClick = (r) => {
    setSelectedRoom(
      selectedRoom?.id === r.id ? null : { id: r.id, type: "ROOM" }
    );
  };

  return (
    <div className="building-floorplan-scroll">
      <div className="building-floorplan-canvas" style={{ width: CANVAS.width, height: CANVAS.height }}>
        {/* 장치 */}
        <div className="building-deco building-deco-stairs" style={{ top: 10, left: 10, width: 60, height: 120 }}>계단</div>
        <div className="building-deco building-deco-elevator" style={{ top: 0, left: 100, width: 70, height: 25 }}>엘리베이터</div>
        <div className="building-deco" style={{ top: 160, left: 10, width: 70, height: 80, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
          <img src="/bathroom.png" alt="화장실" style={{ width: "40px", height: "40px" }} />
        </div>
        <div className="building-deco building-deco-door" style={{ top: 227, left: 510, width: 70, height: 23, borderRadius: "15px 15px 0 0",transform: "rotate(-0deg)" }}>입구</div>
        <div className="building-deco building-deco-stairs" style={{ top: 80, left: 495, width: 100, height: 140 }}>계단</div>

        {/* 방들 */}
        {ROOMS.map(r => {
          const key = normalize(r.id);
          const stateClass = roomState[key] || "box-muted";
          const highlight = selectedRoom?.id === r.id ? "is-highlight" : "";
          return (
            <div
              key={r.id}
              className={`building-room clickable ${stateClass} ${highlight}`.trim()}
              style={r.style}
              onClick={() => handleClick(r)}
              onKeyDown={(e) => e.key === "Enter" && handleClick(r)}
              role="button"
              tabIndex={0}
            >
              {r.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}