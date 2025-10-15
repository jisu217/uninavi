import React, { useMemo } from "react";

const statusToBox = (s) => {
  switch (s) {
    case "IN_CLASS": return "box-danger";
    case "SOON": return "box-warn";
    case "IDLE": return "box-ok";
    default: return "box-muted";
  }
};
const normalize = (s = "") => (s ? String(s).replace(/\s+/g, "") : "");
const CANVAS = { width: 950, height: 210 };
const ROOMS = [
  // 하단 중앙 작은 두 칸
  {
    id: "복음관401호", label: (<>복음관<br />401호
    </>),
    style: { top: 120, left: 100, width: 150, height: 100 }
  },
  {
    id: "복음관403호", label: (<>복음관<br />403호
    </>),
    style: { top: 120, left: 260, width: 150, height: 100 }
  },
  {
    id: "복음관405호", label: (<>복음관<br />405호
    </>),
    style: { top: 120, left: 420, width: 160, height: 100 }
  },
  {
    id: "복음관407호", label: (<>복음관<br />407호
    </>),
    style: { top: 120, left: 590, width: 160, height: 100 }
  },

];


export default function FloorPlanBogeum4({ roomsData = [], selectedRoom, setSelectedRoom }) {

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

  return (
    <div className="building-floorplan-scroll">
      <div
        className="building-floorplan-canvas"
        style={{ width: CANVAS.width, height: CANVAS.height }}
      >




        {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 100, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-stairs"
          style={{ top: 100, left: 860, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 440, width: 70, height: 25 }}>
          엘리베이터
        </div>

        {/* 화장실 */}
        <div className="building-deco"
          style={{ top: 100, left: 760, width: 70, height: 100, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

          <img
            src="/bathroom.png"
            alt="화장실"
            style={{ width: "40px", height: "40px" }}
          />
        </div>

        {/* 방들 */}
        {ROOMS.map((r) => (
          <div
            key={r.id}
            className={`building-room clickable ${roomState[normalize(r.id)] || "box-muted"} ${selectedRoom?.id === r.id ? "is-highlight" : ""}`}
            style={r.style}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === r.id
                  ? null
                  : { id: r.id, type: "ROOM" }
              )
            }
          >
            {r.label}
          </div>
        ))}




      </div>
    </div>
  );
}