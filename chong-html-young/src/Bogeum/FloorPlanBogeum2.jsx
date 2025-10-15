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


/** 방 배치 (참고 이미지와 동일한 위치/크기) */


export default function FloorPlanBogeum2({ roomsData = [], selectedRoom, setSelectedRoom }) {


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
    <>
      <div className="building-floorplan-scroll">
        <div
          className="building-floorplan-canvas"
          style={{ width: CANVAS.width, height: CANVAS.height }}
        >
          {/* 교직원 */}
          <div className="building-room" style={{ top: "120px", left: "100px", width: "70px", height: "100px" }}>제1회의실 </div>
          <div className="building-room" style={{ top: "120px", left: "180px", width: "70px", height: "100px" }}>일립실</div>

          <div className="building-room" style={{ top: "120px", left: "360px", width: "160px", height: "100px" }}>성과관리팀<br />기획실 </div>
          <div className="building-room" style={{ top: "120px", left: "530px", width: "90px", height: "100px" }}>부총장실 </div>
          <div className="building-room" style={{ top: "120px", left: "630px", width: "120px", height: "100px" }}>교목실<br />일립교육과</div>

          <div
            className={`building-room clickable ${selectedRoom?.id === "총장실" ? "is-highlight" : ""}`}
            style={{ top: "120px", left: "260px", width: "90px", height: "100px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "총장실"
                  ? null
                  : {
                    id: "총장실",
                    type: "ADMIN",
                    content: (
                      <>

                        <p>총장과의 대화 안내</p>
                        <p>
                          일시<br />
                          - 매월 마지막 주 금요일 오후 2~5시
                        </p>
                        <p>
                          장소<br />
                          - 총장실
                        </p>
                        <p>
                          신청방법<br />
                          - 비서실 전화(Tel : 02-950-5436) <br />
                          - 이메일(biblekang@bible.ac.kr)로 예약
                        </p>
                      </>
                    )
                  }
              )
            }
          >
            총장실
          </div>

          <div
            className={`building-room clickable ${selectedRoom?.id === "교목실일립교육과" ? "is-highlight" : ""}`}
            style={{ top: "120px", left: "630px", width: "120px", height: "100px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "교목실일립교육과"
                  ? null
                  : {
                    id: "교목실/ 일립교육과",
                    type: "ADMIN",
                    content: (
                      <>

                        <p>
                          운영시간: 평일 08:30~17:00<br />
                          교목실 전화번호: 02-950-5439<br />
                          일립교육과 전화번호: 02-950-5446
                        </p>
                        <a
                          href="https://www.bible.ac.kr/ko/illip/intro"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          교목실 바로가기
                        </a>
                      </>
                    )
                  }
              )
            }
          >
            교목실<br />일립교육과
          </div>


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
        </div>
      </div>

    </>
  );
}