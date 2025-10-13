// src/Moria/FloorPlanMoria2.jsx
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
  { id: "모리아관201호", label: <>모리아관<br />201호</>, style: { top: "40px", left: "20px", width: "180px" } },
  { id: "모리아관212호", label: <>모리아관<br />212호</>, style: { top: "40px", left: "710px", width: "100px", height: "230px" } },
];

export default function FloorPlanMoria2({ roomsData = [], selectedRoom, setSelectedRoom }) {
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
        {/* 동적 방들 */}
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

        {/* 고정 표기 */}
        <div className="building-room" style={{ top: "40px", left: "220px", width: "85px" }}>사무관리팀</div>

        {/* 화장실 */}
        <div className="building-deco" style={{ top: 20, left: 320, width: 80, height: 80, background: "#e9eef4", color: "#2e4b60", fontSize: 14 }}>
          <img src="/bathroom.png" alt="화장실" style={{ width: "30px", height: "30px", marginBottom: "4px" }} />
          여자<br />화장실
        </div>

        <div className="building-deco" style={{ top: 20, left: 520, width: 80, height: 80, background: "#e9eef4", color: "#2e4b60", fontSize: 14 }}>
          <img src="/bathroom.png" alt="화장실" style={{ width: "30px", height: "30px", marginBottom: "4px" }} />
          남자<br />화장실
        </div>

        <div className="building-room" style={{ top: "40px", left: "610px", width: "90px", height: "70px" }}>평생교육원<br />행정실</div>

        {/* 장치 */}
        <div className="building-deco building-deco-elevator" style={{ top: "236px", left: "60px" }}>엘리베이터</div>
        <div className="building-deco building-deco-stairs" style={{ top: "0px", left: "410px", width: "100px" }}>계단</div>
        <div className="building-deco building-deco-door" style={{ top: "150px", left: "-10px" }}>입구</div>
        <div className="building-deco building-deco-door2" style={{ top: "236px", left: "432px", width: "100px", borderRadius: "15px 15px 0 0" }}>입구</div>
        <div className="building-deco building-deco-stairs" style={{ top: "20px", left: "820px", width: "70px", height: "100px" }}>계단</div>
      </div>
    </div>
  );
}