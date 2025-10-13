// 일립A 5층
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
const CANVAS = { width: 950, height: 310 };
const ROOMS = [
    {
        id: "일립관 501호",
        label: (
            <>
                501호
            </>
        ),
        style: { top: 40, left: 25, width: 90, height: 290 },
    },
    {
        id: "일립관 503호",
        label: (
            <>
                503호
            </>
        ),
        style: { top: 40, left: 125, width: 90, height: 150 },
    },
    {
        id: "일립관 505호",
        label: (
            <>
                505호
            </>
        ),
        style: { top: 40, left: 225, width: 90, height: 150 },
    },
    {
        id: "기본간호실습실Ⅰ",
        label: (
            <>
                기본 간호<br />실습실Ⅰ
            </>
        ),
        style: { top: "40px", left: "555px", width: "80px", height: "100px" },
    },
    {
        id: "기본간호실습실2",
        label: (
            <>
                기본 간호<br />실습실2
            </>
        ),
        style: { top: "40px", left: "650px", width: "300px", height: "100px" },
    },
];



// 이름 안 바꿔도 돌아가긴 하는데 바꾸는걸 추천
export default function FloorPlanIllipA5({ roomsData = [], selectedRoom, setSelectedRoom }) {

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


                    <div className="building-room" style={{ top: "220px", left: "540px", width: "80px", height: "100px" }}>이슬기<br />510호 </div>
                    <div className="building-room" style={{ top: "220px", left: "630px", width: "80px", height: "100px" }}>515호 </div>
                    <div className="building-room" style={{ top: "220px", left: "720px", width: "80px", height: "100px" }}>김주아<br />514호 </div>




                    <div className="building-deco building-deco-door"
                        style={{ top: 250, left: 820, width: 130, height: 45, transform: "none", borderRadius: "15px 0 0 15px " }}>
                        일립관 연결 다리
                    </div>



                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 10, left: 460, width: 70, height: 70, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
                        <img
                            src="/bathroom.png"
                            alt="화장실"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </div>

                    <div className="building-deco building-deco-stairs"
                        style={{ top: 190, left: 0, width: 30, height: 50, zIndex: 2 }}>외부 <br />계단</div>
                    {/* 뺼까말까고민됨 */}


                    <div className="building-deco building-deco-stairs"
                        style={{ top: 0, left: 390, width: 60, height: 70 }}>계단</div>



                    <div className="building-deco building-deco-elevator"
                        style={{ top: 0, left: 310, width: 70, height: 25 }}>
                        엘리베이터
                    </div>

                    <div className="building-label" style={{ top: "190px", left: "400px" }}>
                        로비
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
