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
const CANVAS = { width: 850, height: 310 };

const ROOMS = [
  {   //이름을 어찌해야 할지 모르겠습니다...
    id: "수업행동분석실",
    label: (
      <>
        수업 행동 분석실
      </>
    ),
    style: { top: 200, left: 220, width: 120, height: 120 }
  },
  {
    id: "모의실습실",
    label: (
      <>
        모의 실습실
      </>
    ),
    style: { top: 200, left: 350, width: 120, height: 120 }
  },
  {
    id: "영유아교과교육실습실",
    label: (
      <>
        영유아교과교육<br />실습실<br />
      </>
    ),
    style: { top: 200, left: 610, width: 230, height: 120 }
  },

  {
    id: "영유아신체활동실습실",
    label: (
      <>
        영유아신체활동<br />실습실<br />
      </>
    ),
    style: { top: 30, left: 610, width: 230, height: 90 }
  },
  {
    id: "관찰실",
    label: (
      <>
        관찰실
      </>
    ),
    style: { top: 130, left: 740, width: 100, height: 60 }
  }
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


        {/* 멀티미디어제작실 (영보실습실) - 클릭 가능 */}
        <div
          className={`building-room clickable ${selectedRoom?.id === "멀티미디어제작실 317호" ? "is-highlight" : ""}`}
          style={{ top: "200px", left: "480px", width: "120px", height: "120px" }}
          onClick={() =>
            setSelectedRoom(
              selectedRoom?.id === "멀티미디어제작실 317호"
                ? null
                : {
                  id: "멀티미디어제작실 317호",
                  type: "ADMIN",
                  content: (
                    <>
                      <div className="building-table-scroll-x">
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th>이용 시간</th>
                              <th>이용 방법</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>학기중</td>
                              <td>
                                <a
                                  href="https://www.instagram.com/__so.dam_?igsh=MTdtbWk3am50bmRuZg=="
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  소담 학회 인스타 <br />하이라이트에서시간 확인하기
                                </a>
                              </td>
                              <td>
                                영유아보육학과 학회 비용<br /> 납부시 사용 가능

                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </>
                  )
                }
            )
          }
        >
          멀티 미디어 제작실<br />
        </div>


        {/* 장치들 */}
        <div className="building-deco building-deco-stairs"
          style={{ top: 10, left: 10, width: 80, height: 100 }}>
          계단
        </div>

        <div className="building-deco building-deco-elevator"
          style={{ top: 0, left: 110, width: 70, height: 25 }}>
          엘리베이터
        </div>

        <div
          className="building-deco building-deco-door"
          style={{
            top: 140,
            left: 158,
            width: 60,
            height: 23,
            borderRadius: "15px 15px 0 0",
            transform: "rotate(-90deg)",       // 박스를 회전
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ display: "inline-block", transform: "rotate(90deg)" }}>
            문
          </span>
        </div>


        {/* 화장실 */}
        <div className="building-deco"
          style={{ top: 10, left: 220, width: 70, height: 70, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
          <img
            src="/bathroom.png"
            alt="화장실"
            style={{ width: "40px", height: "40px" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "0px",     // 세로 시작 위치
            left: "200px",   // 가로 시작 위치
            width: "4px",    // 세로선 두께
            height: "310px", // 세로선 길이
            backgroundColor: "#e1e4ea",
            // boxShadow: "2px 2px 5px rgba(186, 187, 205, 0.5)"
          }}
        ></div>

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