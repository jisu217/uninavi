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
const CANVAS = { width: 950, height: 210 };
const ROOMS = [
  // 하단 중앙 작은 두 칸
  {
    id: "복음관301호", label: (<>복음관<br />301호
    </>),
    style: { top: 120, left: 100, width: 120, height: 100 }
  },
  {
    id: "복음관303호", label: (<>복음관<br />303호
    </>),
    style: { top: 120, left: 230, width: 120, height: 100 }
  },

];


export default function FloorPlanBogeum3({ roomsData = [], selectedRoom, setSelectedRoom }) {

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
        <div className="building-room" style={{ top: "120px", left: "360px", width: "70px", height: "100px" }}>평가감사실 </div>
        <div className="building-room" style={{ top: "120px", left: "440px", width: "70px", height: "100px" }}>산학협력단<br />지역사회<br />임팩트센터</div>
        <div className="building-room" style={{ top: "120px", left: "520px", width: "70px", height: "100px" }}>대학원<br />교학처</div>
        <div className="building-room" style={{ top: "120px", left: "600px", width: "70px", height: "100px" }}>대학원장실<br />기획실 </div>
        <div className="building-room" style={{ top: "120px", left: "680px", width: "70px", height: "100px" }}>사회복지<br />실습실</div>



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