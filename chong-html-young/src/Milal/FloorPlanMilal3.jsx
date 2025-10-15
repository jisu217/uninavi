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
const CANVAS = { width: 750, height: 320 };


/** 방 배치 (참고 이미지와 동일한 위치/크기) */


export default function FloorPlanMilal3({ roomsData = [], selectedRoom, setSelectedRoom }) {
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
        <div>
            <div className="building-floorplan-scroll">

                <div
                    className="building-floorplan-canvas"
                    style={{ width: CANVAS.width, height: CANVAS.height }}
                >
                    {/* 다른 방 */}
                    <div className="building-room clickable" style={{ top: "230px", left: "60px", width: "60px", height: "60px" }}
                        onClick={() => window.open("https://lib.bible.ac.kr/Clicker/UserPublicObjects/?clickertype=1", "_blank")}
                    >에스라실</div>
                    <div className="building-room clickable" style={{ top: "230px", left: "130px", width: "60px", height: "60px", fontSize: "13px" }}
                        onClick={() => window.open("https://lib.bible.ac.kr/Clicker/UserPublicObjects/?clickertype=1", "_blank")}>느헤미아실</div>

                    <div className="building-room" style={{ top: "230px", left: "400px", width: "130px", height: "100px" }}>도서관 사무실</div>
                    <div className="building-room" style={{ top: "230px", left: "540px", width: "130px", height: "100px" }}>멀티미디어실</div>
                    <div className="building-room" style={{ top: "230px", left: "680px", width: "60px", height: "60px" }}>휴게실</div>

                    {/* 계단 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 210, left: 200, width: 40, height: 60 }}>4층<br />계단</div>
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 250, left: 250, width: 40, height: 60, zIndex: 1 }}>계단</div>

                    {/* 엘베 */}
                    <div className="building-deco building-deco-elevator"
                        style={{ top: 250, left: 340, width: 65, height: 30, transform: "rotate(90deg)", fontSize: "13px", zIndex: 1 }}>
                        엘리베이터
                    </div>

                    {/* 입구 */}
                    <div className="building-deco building-deco-door"
                        style={{ top: 190, left: 270, width: 100, height: 23, transform: "none", borderRadius: "15px 15px 0 0", zIndex: 1 }}>입구</div>

                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 180, left: 10, width: 50, height: 30, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

                        <img
                            src="/bathroom.png"
                            alt="화장실"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </div>


                    {/* 텍스트 */}
                    <div className="building-label" style={{ top: "110px", left: "295px" }}>
                        도서관
                    </div>


                    {/* 강의실 외부 벽 */}
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",     // 세로 시작 위치
                            left: "10px",   // 가로 시작 위치
                            width: "175px",    // 세로선 두께
                            height: "100px", // 세로선 길이
                            backgroundColor: "#f0f2f5",

                        }}
                    ></div>

                    <div
                        style={{
                            position: "absolute",
                            top: "210px",     // 세로 시작 위치
                            left: "243px",   // 가로 시작 위치
                            width: "150px",    // 세로선 두께
                            height: "105px", // 세로선 길이
                            backgroundColor: "#f0f2f5",

                        }}
                    ></div>
                </div>
            </div>
            <div
                className="building-class-card"
                style={{ width: 370, marginTop: 20, marginLeft: 15 }}
            >
                <h2 className="classroom-title">안내</h2>
                <hr className="divider" />

                <p>
                    도서관 운영시간<br />
                    평일 08:30~23:00,<br />
                    토요일 09:00~17:00<br />
                    *채플 시간에는 운영되지 않습니다*<br />
                </p>

                <a
                    href="https://lib.bible.ac.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    도서관 사이트 바로가기
                </a>
                <br />
                <a
                    href="https://play.google.com/store/apps/details?id=kr.co.libtech.sponge&hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    클리커 다운 바로가기
                </a>
            </div>

        </div>







    );
}