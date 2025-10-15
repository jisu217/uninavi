// 일립A 4층
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
const CANVAS = { width: 760, height: 310 };


// 이름 안 바꿔도 돌아가긴 하는데 바꾸는걸 추천
export default function FloorPlanIllipA4({ roomsData = [], selectedRoom, setSelectedRoom }) {

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
                    <div className="building-room" style={{ top: "30px", left: "470px", width: "80px", height: "100px" }}>간호<br />세미나실 </div>
                    <div className="building-room" style={{ top: "30px", left: "570px", width: "80px", height: "100px" }}>간호전공<br />사무실 </div>
                    <div className="building-room" style={{ top: "30px", left: "670px", width: "80px", height: "100px" }}>장인순<br />415호 </div>

                    <div className="building-room" style={{ top: "220px", left: "470px", width: "80px", height: "100px" }}>최은희<br />414호 </div>
                    <div className="building-room" style={{ top: "220px", left: "370px", width: "80px", height: "100px" }}>김소희<br />412호 </div>
                    <div className="building-room" style={{ top: "220px", left: "270px", width: "80px", height: "100px" }}>고미숙<br />410호 </div>
                    <div className="building-room" style={{ top: "220px", left: "170px", width: "80px", height: "100px" }}>김정숙<br />408호 </div>
                    <div className="building-room" style={{ top: "220px", left: "70px", width: "80px", height: "100px" }}>안현미<br /> 406호 </div>
                    {/* 계단이나 엘베 여기서 좌표만 바꿔서 사용하기 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 0, left: 180, width: 60, height: 70 }}>계단</div>



                    <div className="building-deco building-deco-elevator"
                        style={{ top: 0, left: 100, width: 70, height: 25 }}>
                        엘리베이터
                    </div>
                    <div className="building-deco building-deco-door"
                        style={{ top: 250, left: 580, width: 180, height: 45, transform: "none", borderRadius: "15px 0 0 15px " }}>
                        일립관 연결 다리
                    </div>

                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 10, left: 370, width: 80, height: 100, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

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
