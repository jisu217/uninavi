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
const CANVAS = { width: 600, height: 320 };


/** 방 배치 (참고 이미지와 동일한 위치/크기) */


export default function FloorPlanBogeum1({ roomsData = [] }) {
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
                <div className="building-room" style={{ top: "30px", left: "10px", width: "140px", height: "70px" }}>일립기념관</div>
                <div className="building-room" style={{ top: "170px", left: "70px", width: "80px", height: "60px" }}>성서 역사관</div>
                <div className="building-room" style={{ top: "30px", left: "350px", width: "240px", height: "100px" }}>이사장실</div>
                <div className="building-room" style={{ top: "230px", left: "230px", width: "170px", height: "100px" }}>제 2회의실</div>
                <div className="building-room" style={{ top: "230px", left: "410px", width: "180px", height: "100px" }}>법인 사무국</div>

                {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
                <div className="building-deco building-deco-stairs"
                    style={{ top: 220, left: 70, width: 40, height: 80 }}>계단</div>



                <div className="building-deco building-deco-elevator"
                    style={{ top: 250, left: 170, width: 65, height: 30, transform: "rotate(90deg)", fontSize: "13px" }}>
                    엘리베이터
                </div>

                {/* 화장실 */}
                <div className="building-deco"
                    style={{ top: 150, left: 10, width: 50, height: 60, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

                    <img
                        src="/bathroom.png"
                        alt="화장실"
                        style={{ width: "40px", height: "40px" }}
                    />
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "10px",     // 세로 시작 위치
                        left: "165px",   // 가로 시작 위치
                        width: "170px",    // 세로선 두께
                        height: "100px", // 세로선 길이
                        backgroundColor: "#f0f2f5",
                        // boxShadow: "2px 2px 5px rgba(186, 187, 205, 0.5)"
                    }}
                ></div>







            </div>
        </div>
    );
}