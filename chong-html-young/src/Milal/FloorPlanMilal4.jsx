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
const CANVAS = { width: 570, height: 320 };


/** 방 배치 (참고 이미지와 동일한 위치/크기) */



export default function FloorPlanMilal4({ roomsData = [], selectedRoom, setSelectedRoom }) {
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
                    <div className="building-room" style={{ top: "200px", left: "60px", width: "160px", height: "80px" }}>학습실</div>
                    <div className="building-room" style={{ top: "285px", left: "170px", width: "50px", height: "50px" }}>논문1실</div>
                    <div className="building-room" style={{ top: "285px", left: "115px", width: "50px", height: "50px" }}>논문2실</div>
                    <div className="building-room" style={{ top: "285px", left: "60px", width: "50px", height: "50px" }}>논문3실</div>


                    <div className="building-room" style={{ top: "270px", left: "500px", width: "60px", height: "60px" }}>휴게실</div>

                    {/* 계단 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 230, left: 230, width: 40, height: 80 }}>계단</div>


                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 180, left: 5, width: 50, height: 30, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

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



                </div>
            </div>

            <div
                className="building-class-card"
                style={{ width: 370, marginTop: 20, marginLeft: 15 }}
            >
                <h2 className="classroom-title">안내</h2>
                <hr className="divider" />

                <p>
                    도서관 운영시간: 08:30~23:00
                    <br />
                    도서관 이용 시 학생증이 필요합니다!
                    <br />
                    *채플 시간에는 운영되지 않습니다*
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