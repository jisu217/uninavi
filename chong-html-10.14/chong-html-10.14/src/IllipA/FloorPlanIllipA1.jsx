// 일립A 1층
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
const CANVAS = { width: 540, height: 220 };


// 이름 안 바꿔도 돌아가긴 하는데 바꾸는걸 추천
export default function FloorPlanIllipA1({ roomsData = [], selectedRoom, setSelectedRoom }) {

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
                    <div className="building-room" style={{ top: "30px", left: "10px", width: "100px", height: "200px" }}>여자기숙사 </div>
                    <div className="building-room" style={{ top: "160px", left: "120px", width: "70px", height: "70px" }}>기숙사<br /> 관리실 </div>
                    <div className="building-room" style={{ top: "30px", left: "430px", width: "100px", height: "200px" }}>여자기숙사 </div>


                    {/* 클릭 해야하는 도형은 아거 써서 이름 바꾸기 */}


                    <div
                        className={`building-room clickable ${selectedRoom?.id === "수업지원센터" ? "is-highlight" : "수업지원센터"}`}
                        style={{ top: "160px", left: "350px", width: "70px", height: "70px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "수업지원센터"
                                    ? null
                                    : {
                                        id: "수업지원센터",
                                        type: "ADMIN",
                                        content: (
                                            <>

                                                <p>
                                                    운영시간
                                                    <br />
                                                    -월~목 08:30~22:00 <br />
                                                    -금 08:30~20:00<br />
                                                    전화번호: 02-950-5531<br />
                                                </p>
                                            </>
                                        )
                                    }
                            )
                        }
                    >
                        수업<br />지원센터
                    </div>
                    <div className="building-deco building-deco-door"
                        style={{ top: 197, left: 220, width: 100, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>
                        입구
                    </div>

                    {/* 계단이나 엘베 여기서 좌표만 바꿔서 사용하기 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 0, left: 280, width: 60, height: 70 }}>계단</div>



                    <div className="building-deco building-deco-elevator"
                        style={{ top: 0, left: 200, width: 70, height: 25 }}>
                        엘리베이터
                    </div>
                </div>
            </div>

        </>
    );
}