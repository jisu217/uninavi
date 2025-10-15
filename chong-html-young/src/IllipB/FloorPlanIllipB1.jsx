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
const CANVAS = { width: 208, height: 210 };


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


        {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>

        <div className="building-deco building-deco-door"
          style={{ top: 187, left: 110, width: 70, height: 23, transform: "none", borderRadius: "15px 15px 0 0", }}>
          입구
        </div>

        <div className="building-label" style={{ top: "100px", left: "260px", }}>
          어린이집
        </div>
      </div>
    </div>
  );


}