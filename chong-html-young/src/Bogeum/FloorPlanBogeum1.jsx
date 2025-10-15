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
const CANVAS = { width: 950, height: 265 };



export default function FloorPlanBogeum1({ roomsData = [], selectedRoom, setSelectedRoom }) {


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
          <div className="building-room" style={{ top: "25px", left: "60px", width: "60px", height: "60px", fontSize: "12px" }}>AI융합학부<br />실습지원실</div>
          <div className="building-room" style={{ top: "175px", left: "10px", width: "70px", height: "50px" }}>학사<br />부총장실</div>
          <div className="building-room" style={{ top: "175px", left: "90px", width: "250px", height: "100px" }}></div>
          <div className="building-room" style={{ top: "30px", left: "145px", width: "195px", height: "145px", borderBottom: "none", borderRadius: "5px 5px 0 0" }}></div>

          <div
            className={`building-room clickable ${selectedRoom?.id === "교학처" ? "is-highlight" : ""}`}
            style={{ top: "190px", left: "100px", width: "70px", height: "70px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "교학처"
                  ? null
                  : {
                    id: "교학처",
                    type: "ADMIN",
                    content: (
                      <>
                        {/* 여기에 교학처 안내 내용 채워넣기 */}
                      </>
                    )
                  }
              )
            }
          >
            교학처
          </div>
          <div className="building-room" style={{ top: "190px", left: "180px", width: "70px", height: "70px" }}>학업 지속<br />지원팀</div>


          <div
            className={`building-room clickable ${selectedRoom?.id === "입학관리팀" ? "is-highlight" : ""}`}
            style={{ top: "190px", left: "260px", width: "70px", height: "70px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "입학관리팀"
                  ? null
                  : {
                    id: "입학관리팀",
                    type: "ADMIN",
                    content: (
                      <>
                        <p>운영시간: 평일 08:30~17:00</p>
                        <p>전화번호: 02-950-5403</p>

                        <a
                          href="https://ipsi.bible.ac.kr/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          입학 사이트 바로가기
                        </a>
                        <br />
                        <a
                          href="https://pf.kakao.com/_fxfUVxd"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          입학관리팀 카카오톡 채널
                        </a>
                        <br />
                        <a
                          href="https://www.instagram.com/kbu_admin/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          입학관리팀 인스타그램
                        </a>
                      </>
                    )
                  }
              )
            }
          >
            입학관리팀
          </div>

          <div
            className={`building-room clickable ${selectedRoom?.id === "보건실" ? "is-highlight" : ""}`}
            style={{ top: "130px", left: "520px", width: "60px", height: "140px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "보건실"
                  ? null
                  : {
                    id: "보건실",
                    type: "ADMIN",
                    content: (
                      <>
                        <p>운영시간: 평일 09:30~17:00</p>
                        <p>필요시 비상약을 제공합니다.</p>
                      </>
                    )
                  }
              )
            }
          >
            보건실
          </div>

          <div className="building-room" style={{ top: "130px", left: "590px", width: "70px", height: "140px" }}>대회협력팀</div>
          <div className="building-room" style={{ top: "130px", left: "670px", width: "70px", height: "140px" }}>동문<br />회장실</div>
          <div className="building-room" style={{ top: "130px", left: "750px", width: "70px", height: "70px" }}>남자<br />휴게실</div>

          {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
          <div className="building-deco building-deco-stairs"
            style={{ top: 70, left: 5, width: 115, height: 60 }}>계단</div>

          <div className="building-deco building-deco-stairs"
            style={{ top: 160, left: 860, width: 80, height: 90 }}>계단</div>

          <div className="building-deco building-deco-elevator"
            style={{ top: 0, left: 460, width: 70, height: 25 }}>
            엘리베이터
          </div>

          {/* 화장실 */}
          <div className="building-deco"
            style={{ top: 190, left: 750, width: 70, height: 60, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

            <img
              src="/bathroom.png"
              alt="화장실"
              style={{ width: "40px", height: "40px" }}
            />
          </div>


          {/* 왼쪽부터 순서대로 입구 */}
          <div className="building-deco building-deco-door"
            style={{ top: 40, left: 905, width: 70, height: 23, transform: "none", borderRadius: "15px 15px 0 0", transform: "rotate(-90deg)" }}>
            입구
          </div>


          <div className="building-deco building-deco-door"
            style={{ top: 26, left: -14, width: 50, height: 23, transform: "none", borderRadius: "15px 15px 0 0", transform: "rotate(90deg)" }}>
            입구
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 0, left: 350, width: 85, height: 23, transform: "none", borderRadius: "0 0 15px 15px" }}>
            입구
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 242, left: 10, width: 70, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>
            입구
          </div>

          <div className="building-deco building-deco-door"
            style={{ top: 242, left: 380, width: 100, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>
            입구
          </div>

          {/* r건물 선 */}
          <div
            style={{
              position: "absolute",
              top: "0px",     // 세로 시작 위치
              left: "130px",   // 가로 시작 위치
              width: "4px",    // 세로선 두께
              height: "140px", // 세로선 길이
              backgroundColor: "#e1e4ea",
              // boxShadow: "2px 2px 5px rgba(186, 187, 205, 0.5)"
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              top: "140px",     // 가로선 위치 (세로선 끝나는 위치 맞춤)
              left: "0px",    // 시작점 (세로선과 이어지게)
              width: "134px",   // 가로선 길이
              height: "5px",    // 두께
              backgroundColor: "#e1e4ea",

            }}
          ></div>





        </div>
      </div>




    </>

  );
}