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
const CANVAS = { width: 360, height: 320 };


/** 방 배치 (참고 이미지와 동일한 위치/크기) */


export default function FloorPlanMilalB2({ roomsData = [], selectedRoom, setSelectedRoom }) {
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
                <div
                    className={`building-room clickable ${selectedRoom?.id === "체력단련실" ? "is-highlight" : ""}`}
                    style={{ top: "70px", left: "150px", width: "100px", height: "140px" }}
                    onClick={() =>
                        setSelectedRoom(
                            selectedRoom?.id === "체력단련실"
                                ? null
                                : { id: "체력단련실", type: "ADMIN", content: <></> }
                        )
                    }
                >
                    체력단련실
                </div>

                <div
                    className={`building-room clickable ${selectedRoom?.id === "탁구장" ? "is-highlight" : ""}`}
                    style={{ top: "70px", left: "60px", width: "80px", height: "60px" }}
                    onClick={() =>
                        setSelectedRoom(
                            selectedRoom?.id === "탁구장"
                                ? null
                                : { id: "탁구장", type: "ADMIN", content: <></> }
                        )
                    }
                >
                    탁구장
                </div>

                <div className="building-room" style={{ top: "140px", left: "60px", width: "80px", height: "70px", zIndex: 0 }}></div>

                {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
                <div className="building-deco building-deco-stairs"
                    style={{ top: 125, left: 65, width: 30, height: 50 }}>계단</div>

                <div className="building-deco building-deco-stairs"
                    style={{ top: 190, left: 305, width: 50, height: 30 }}>계단</div>





                <div className="building-deco building-deco-elevator"
                    style={{ top: 125, left: 105, width: 30, height: 30, transform: "rotate(90deg)", fontSize: "10px" }}>
                    엘리<br />베이터
                </div>


                {/* 왼쪽부터 순서대로 입구 */}

                <div className="building-deco building-deco-door"
                    style={{ top: 170, left: 100, width: 40, height: 20, transform: "none", borderRadius: "15px 15px 0 0" }}>
                    입구
                </div>

                <div className="building-deco building-deco-door"
                    style={{ top: 0, left: 0, width: 300, height: 45, transform: "none", borderRadius: "5px 15px 15px 0" }}>
                    주차장 입구
                </div>




                <div className="building-label" style={{ top: "240px", left: "145px" }}>
                    주차장
                </div>








            </div>
        </div>
    );
}