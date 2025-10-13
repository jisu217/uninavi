// 일립A 지하 1층
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

// 평면도 크기 변환
const CANVAS = { width: 480, height: 260 };
const ROOMS = [
    // 하단 중앙 작은 두 칸
    {
        id: "설교실습실", label: (<>설교실습실</>),
        style: { top: "42px", left: "25px", width: "160px", height: "240px" }
    },


];

// 이름 안 바꿔도 돌아가긴 하는데 바꾸는걸 추천
export default function FloorPlanIllipAB1({ roomsData = [], selectedRoom, setSelectedRoom }) {

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

    // 여기서부터 수정 하면 됨
    return (
        <>
            <div className="building-floorplan-scroll">
                <div
                    className="building-floorplan-canvas"
                    style={{ width: CANVAS.width, height: CANVAS.height }}
                >
                    {/* 클릭 안 해도 되는 도형 */}
                    <div className="building-room" style={{ top: "30px", left: "370px", width: "100px", height: "120px" }}>
                        다목적 실습실(CDS실)
                    </div>


                    {/* 계단/엘리베이터 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 0, left: 290, width: 70, height: 70 }}>계단</div>

                    <div className="building-deco building-deco-elevator"
                        style={{ top: 0, left: 190, width: 70, height: 30 }}>
                        엘리베이터
                    </div>

                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 150, left: 370, width: 100, height: 100, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
                        <img
                            src="/bathroom.png"
                            alt="화장실"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </div>
                </div>
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
        </>
    );
}
