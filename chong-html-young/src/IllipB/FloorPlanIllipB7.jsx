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
const CANVAS = { width: 670, height: 310 };


export default function FloorPlanIllipB1({ roomsData = [] }) {
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
        <div className="building-room" style={{ top: 25, left: 200, width: 155, height: 100 }}>전공사무실 </div>
        <div className="building-room" style={{ top: 25, left: 362, width: 70, height: 100 }}>강정원<br />703호 </div>
        <div className="building-room" style={{ top: 25, left: 438, width: 70, height: 100 }}>조현진<br />704호 </div>
        <div className="building-room" style={{ top: 25, left: 515, width: 70, height: 100 }}>김승욱<br />71호 </div>
        <div className="building-room" style={{ top: 25, left: 592, width: 70, height: 100 }}>오승우<br />71호 </div>

        <div className="building-room" style={{ top: 131, left: 562, width: 100, height: 60 }}>김승아 712 </div>
        <div className="building-room" style={{ top: 197, left: 562, width: 100, height: 60 }}>배진형 711 </div>
        <div className="building-room" style={{ top: 263, left: 562, width: 100, height: 60 }}>김승욱 713 </div>

        <div className="building-room" style={{ top: 223, left: 180, width: 70, height: 100 }}>상정원<br />706호 </div>
        <div className="building-room" style={{ top: 223, left: 257, width: 70, height: 100 }}>김웅기<br />705호 </div>
        <div className="building-room" style={{ top: 223, left: 334, width: 70, height: 100 }}>김성호<br />706호 </div>
        <div className="building-room" style={{ top: 223, left: 410, width: 70, height: 100 }}>김정원<br />714호 </div>
        <div className="building-room" style={{ top: 223, left: 485, width: 70, height: 100 }}>안정선<br />718 </div>

        {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>



      </div>
    </div>
  );


}