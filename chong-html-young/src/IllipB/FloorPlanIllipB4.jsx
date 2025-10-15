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

/** 2번째 참고 이미지에 맞춘 캔버스 크기 */
const CANVAS = { width: 510, height: 370 };


/** 방 배치 (참고 이미지와 동일한 위치/크기) */
const ROOMS = [
  // 하단 중앙 작은 두 칸
  {
    id: "종합실습실", label:
      (<>종합실습실<br /></>),
    style: { top: 170, left: 400, width: 100, height: 100 }
  },

  {
    id: "일립관 405호", label:
      (<>일립관 405호<br /></>),
    style: { top: 30, left: 210, width: 290, height: 130 }
  },

  {
    id: "디뷰리핑Ⅱ", label:
      (<>디뷰리핑Ⅱ<br /></>),
    style: { top: 280, left: 400, width: 100, height: 100 }
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




        {/* 화장실 */}
        <div className="building-deco"
          style={{ top: 350, left: 280, width: 70, height: 10, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
          <img
            src="/bathroom.png"
            alt="화장실"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>

        <div className="building-deco building-deco-door"
          style={{ top: 310, left: 0, width: 200, height: 45, transform: "none", borderRadius: "0 15px 15px 0" }}>
          일립관 연결 다리
        </div>

        <div
          style={{
            position: "absolute",
            top: "0px",     // 세로 시작 위치
            left: "200px",   // 가로 시작 위치
            width: "4px",    // 세로선 두께
            height: "150px", // 세로선 길이
            backgroundColor: "#e1e4ea",
            // boxShadow: "2px 2px 5px rgba(186, 187, 205, 0.5)"
          }}
        ></div>


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