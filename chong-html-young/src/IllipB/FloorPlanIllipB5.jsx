import React, { useMemo } from "react";

const statusToBox = (s) => {
  switch (s) {
    case "IN_CLASS": return "box-danger";
    case "SOON": return "box-warn";
    case "IDLE": return "box-ok";
    default: return "box-muted";
  }
};
const normalize = (s = "") => s.replace(/\s+/g, "");

/** 2번째 참고 이미지에 맞춘 캔버스 크기 */
const CANVAS = { width: 780, height: 310 };
const ROOMS = [
  {
    id: "일립관505호",
    label: (
      <>
        일립관<br />505호
      </>
    ),
    style: { top: 220, left: 430, width: 100, height: 100 },
  },
  {
    id: "일립관507호",
    label: (
      <>
        일립관<br />507호
      </>
    ),
    style: { top: 220, left: 540, width: 100, height: 100 },
  },
  {
    id: "일립관509호",
    label: (
      <>
        일립관<br />509호
      </>
    ),
    style: { top: 220, left: 650, width: 100, height: 100 },
  },
];


export default function FloorPlanIllipB1({ roomsData = [], selectedRoom, setSelectedRoom }) {
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
        {/* 교직원 */}

        <div className="building-room" style={{ top: 220, left: 430, width: 100, height: 100 }}>일립관<br />505호 </div>
        <div className="building-room" style={{ top: 220, left: 540, width: 100, height: 100 }}>일립관<br />507호 </div>
        <div className="building-room" style={{ top: 220, left: 650, width: 100, height: 100 }}>일립관<br />509호 </div>

        <div className="building-room" style={{ top: 35, left: 210, width: 100, height: 100 }}>홍소윤<br />521호 </div>
        <div className="building-room" style={{ top: 35, left: 320, width: 100, height: 100 }}>이소정<br />523호 </div>
        <div className="building-room" style={{ top: 35, left: 430, width: 100, height: 100 }}>장현진<br />525호 </div>
        <div className="building-room" style={{ top: 35, left: 540, width: 100, height: 100 }}>휴게실<br />520b </div>
        <div className="building-room" style={{ top: 35, left: 650, width: 100, height: 100 }}>일레베이 </div>

        {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
        <div className="building-deco building-deco-door"
          style={{ top: 145, left: 735, width: 70, height: 23, transform: "none", borderRadius: "15px 15px 0 0", transform: "rotate(-90deg)" }}>
          비상문
        </div>
        <div className="building-deco"
          style={{ top: 290, left: 280, width: 70, height: 10, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
          <img
            src="/bathroom.png"
            alt="화장실"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="building-deco building-deco-door"
          style={{ top: 230, left: 0, width: 150, height: 45, transform: "none", borderRadius: "5px 15px 15px 0" }}>
          일립관 연결 다리
        </div>
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>

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

