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

const CANVAS = { width: 670, height: 310 };
const SCROLL = { height: 700 };

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
        {/* 로뎀나무 강의실 - 클릭 가능 */}
        <div
          className={`building-room clickable ${selectedRoom?.id === "로뎀나무" ? "is-highlight" : ""}`}
          style={{ top: "60px", left: "110px", width: "535px", height: "245px" }}
          onClick={() =>
            setSelectedRoom(
              selectedRoom?.id === "로뎀나무"
                ? null
                : {
                  id: "로뎀나무",
                  type: "ADMIN",
                  content: (
                    <>
                      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "15px" }}>
                        <thead>
                          <tr style={{ borderBottom: "2px solid #ddd" }}>
                            <th style={{ padding: "8px", textAlign: "left", fontWeight: 600 }}>구분</th>
                            <th style={{ padding: "8px", textAlign: "left", fontWeight: 600 }}>이용 시간</th>
                            <th style={{ padding: "8px", textAlign: "left", fontWeight: 600 }}>이용 사항</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "8px" }}>학기중</td>
                            <td style={{ padding: "8px" }}>08:30~21:00</td>
                            <td style={{ padding: "8px" }}>
                              개인 학습과 쉼 공간 제공<br />
                              그룹학습실 및 노트북 대여
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: "8px" }}>방학중</td>
                            <td style={{ padding: "8px" }}>08:30~17:30</td>
                            <td style={{ padding: "8px" }}>
                              심리, 학습, 진로 및 취창업 상담 가능
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )
                }
            )
          }
        >
          로뎀나무
        </div>

        {/* 장치들 */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>계단</div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>

        {/* 화장실 */}
        <div className="building-deco"
          style={{ top: 290, left: 240, width: 70, height: 25, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
          <img
            src="/bathroom.png"
            alt="화장실"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );


}