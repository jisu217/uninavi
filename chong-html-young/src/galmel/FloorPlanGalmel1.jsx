// src/Galmel/FloorPlanGalmel1.jsx
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

const CANVAS = { width: 680, height: 250 };

const ROOMS = [
  {
    id: "AI융합실습실1",
    label: (<>AI융합<br />실습실1</>),
    style: { top: 160, left: 190, width: 80, height: 100 }
  },
  {
    id: "브니엘홀",
    label: "브니엘홀",
    style: { top: 30, left: 390, width: 100, height: 230 }
  },
];

export default function FloorPlanGalmel1({ roomsData = [], selectedRoom, setSelectedRoom }) {

  // 각 강의실의 상태 색상 계산
  const roomState = useMemo(() => {
    const map = {};
    roomsData.forEach((r) => {
      const key = normalize(r.room);
      const sessions = r.sessions ?? [];
      let cls = "box-ok";
      if (sessions.length > 0) {
        const st = sessions.map((s) => s.status);
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
    <>
      <div className="building-floorplan-scroll">
        <div
          className="building-floorplan-canvas"
          style={{ width: CANVAS.width, height: CANVAS.height }}
        >

          {/* 고정 데코들 */}
          <div
            className={`building-room clickable ${selectedRoom?.id === "전산지원팀" ? "is-highlight" : ""}`}
            style={{ top: 160, left: 290, width: 80, height: 100 }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "전산지원팀"
                  ? null
                  : {
                    id: "전산지원팀",
                    type: "ADMIN",
                    content: (
                      <>
                        <p>운영시간: 평일 09:00~17:00</p>
                        <p>전화번호: 02-950-9999</p>
                        <p>학내 전산 지원을 담당합니다.</p>
                      </>
                    )
                  }
              )
            }
          >
            전산지원팀
          </div>

          <div className="building-room" style={{ top: 190, left: 510, width: 70, height: 70 }}>AI융합<br />서버실</div>

          <div className="building-deco building-deco-stairs"
            style={{ top: 10, left: 10, width: 60, height: 120 }}>계단</div>

          <div className="building-deco building-deco-elevator"
            style={{ top: 0, left: 100, width: 70, height: 25 }}>엘리베이터</div>

          <div className="building-deco"
            style={{ top: 160, left: 10, width: 60, height: 60, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
            <img src="/bathroom.png" alt="화장실" style={{ width: "40px", height: "40px" }} />
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 0, left: 590, width: 91.5, height: 23, transform: "none", borderRadius: "0 0 0 15px" }}>
            입구
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 40, left: 635, width: 70, height: 23, transform: "none", borderRadius: "15px 0 0 0", transform: "rotate(-90deg)" }}>
            입구
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 227, left: 75, width: 70, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>
            입구
          </div>


          <div className="building-deco building-deco-stairs"
            style={{ top: 120, left: 600, width: 60, height: 120 }}>계단</div>

          {/* 클릭 가능한 강의실 */}
          {/* 강의실 (ROOM) */}
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


    </>
  );
}
