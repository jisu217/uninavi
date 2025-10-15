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
const CANVAS = { width: 358, height: 210 };
const SCROLL = { height: 700 };

/** 방 배치 (참고 이미지와 동일한 위치/크기) */


export default function FloorPlanBogeum6({ roomsData = [] }) {
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
            {/* 평면도 */}
            <div className="building-floorplan-scroll">
                <div
                    className="building-floorplan-canvas"
                    style={{ width: CANVAS.width, height: CANVAS.height }}
                >
                    {/* 교직원 */}
                    <div
                        className="building-room"
                        style={{
                            top: "50px",
                            left: "10px",
                            width: "335px",
                            height: "170px",
                            background: "#EDFFE2",
                        }}
                    >
                        샤론의 정원
                    </div>

                    <div
                        className="building-deco building-deco-elevator"
                        style={{ top: 0, left: 140, width: 70, height: 25 }}
                    >
                        엘리베이터
                    </div>
                </div>
            </div>


            {/* 공지사항 박스 */}
            <div className="building-class-card" style={{ marginTop: 20, marginLeft: 15 }}>
                <h2 className="classroom-title">안내</h2>
                <hr className="divider" />
                <p>시설 보안 관리를 위해 야간 이용을 제한합니다</p>
                <p>통제 시간: 오후 11시 이후</p>
            </div>
        </div>
    );

}