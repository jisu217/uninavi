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


export default function FloorPlanBogeum5({ roomsData = [], selectedRoom, setSelectedRoom }) {

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

          <div
            className={`building-room clickable ${selectedRoom?.id === "502호양단아" ? "is-highlight" : ""}`}
            style={{ top: "30px", left: "100px", width: "50px", height: "50px", fontSize: "13px" }}
            onClick={() =>
              setSelectedRoom(
                selectedRoom?.id === "502호양단아"
                  ? null
                  : {
                    id: "502호 양단아",
                    type: "ADMIN",
                    content: (
                      <>

                        <p>
                          이메일: dana1112@bible.ac.kr
                          <br />
                          연락처: 02)950-5487
                        </p>
                      </>
                    )
                  }
              )
            }
          >
            502호<br />양단아
          </div>


          <div className="building-room" style={{ top: "30px", left: "160px", width: "50px", height: "50px", fontSize: "13px" }}>504호<br />김희수</div>
          <div className="building-room" style={{ top: "30px", left: "220px", width: "50px", height: "50px", fontSize: "13px" }}>506호<br />최사랑</div>
          <div className="building-room" style={{ top: "30px", left: "280px", width: "50px", height: "50px", fontSize: "13px" }}>508호<br />한진호</div>
          <div className="building-room" style={{ top: "30px", left: "340px", width: "50px", height: "50px", fontSize: "13px" }}>510호<br />이민규</div>
          <div className="building-room" style={{ top: "30px", left: "560px", width: "50px", height: "50px", fontSize: "13px" }}>512호<br />박상민</div>
          <div className="building-room" style={{ top: "30px", left: "620px", width: "50px", height: "50px", fontSize: "13px" }}>516호<br />강규성</div>
          <div className="building-room" style={{ top: "30px", left: "680px", width: "50px", height: "50px", fontSize: "13px" }}>518호<br />안창선</div>
          <div className="building-room" style={{ top: "30px", left: "740px", width: "50px", height: "50px", fontSize: "13px" }}>520호<br />권용준</div>
          <div className="building-room" style={{ top: "30px", left: "800px", width: "50px", height: "50px", fontSize: "13px" }}>남자<br />강사실</div>

          <div className="building-room" style={{ top: "170px", left: "100px", width: "50px", height: "50px", fontSize: "13px" }}>501호<br />박태수 </div>
          <div className="building-room" style={{ top: "170px", left: "160px", width: "50px", height: "50px", fontSize: "13px" }}>503호<br />김정원</div>
          <div className="building-room" style={{ top: "170px", left: "220px", width: "50px", height: "50px", fontSize: "13px" }}>505호<br />김현광</div>
          <div className="building-room" style={{ top: "170px", left: "280px", width: "50px", height: "50px", fontSize: "10px" }}>김호식박사<br />기념연구실</div>
          <div className="building-room" style={{ top: "170px", left: "340px", width: "50px", height: "50px", fontSize: "13px" }}>509호<br />이길형</div>
          <div className="building-room" style={{ top: "170px", left: "400px", width: "50px", height: "50px", fontSize: "13px" }}>511호<br />임지영</div>
          <div className="building-room" style={{ top: "170px", left: "460px", width: "80px", height: "50px", fontSize: "13px" }}>학과 사무실<br />AI 성서 융합</div>
          <div className="building-room" style={{ top: "170px", left: "560px", width: "50px", height: "50px", fontSize: "13px" }}>515호<br />김원빈</div>
          <div className="building-room" style={{ top: "170px", left: "620px", width: "50px", height: "50px", fontSize: "13px" }}>517호<br />최선희</div>
          <div className="building-room" style={{ top: "170px", left: "680px", width: "50px", height: "50px", fontSize: "13px" }}>519호<br />현우석</div>
          <div className="building-room" style={{ top: "170px", left: "740px", width: "50px", height: "50px", fontSize: "13px" }}>521호<br />송희경</div>







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
            style={{ top: 140, left: 800, width: 50, height: 60, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

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