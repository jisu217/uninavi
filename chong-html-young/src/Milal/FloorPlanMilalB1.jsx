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
const CANVAS = { width: 600, height: 370 };


const ROOMS = [
    // 하단 중앙 작은 두 칸
    {
        id: "천마홀", label: (<>천마홀
        </>),
        style: { top: "30px", left: "190px", width: "130px", height: "75px" }
    },


];


export default function FloorPlanGalmel1({ roomsData = [], selectedRoom, setSelectedRoom }) {

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
                        className={`building-room clickable ${selectedRoom?.id === "식당" ? "is-highlight" : ""}`}
                        style={{ top: "30px", left: "10px", width: "80px", height: "350px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "식당"
                                    ? null
                                    : {
                                        id: "식당", type: "ADMIN",
                                        content: <>
                                            <p>운영시간: 평일 11:00~16:00</p>
                                            <p>채플 시간에는 배식하지 않습니다</p>

                                        </>
                                    }
                            )
                        }
                    >
                        식당
                    </div>

                    <div
                        className={`building-room clickable ${selectedRoom?.id === "시설관리팀" ? "is-highlight" : ""}`}
                        style={{ top: "30px", left: "350px", width: "70px", height: "30px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "시설관리팀"
                                    ? null
                                    : {
                                        id: "시설관리팀", type: "ADMIN", content: <>
                                            <p>운영시간: 평일 11:00~16:00</p>
                                            <p>채플 시간에는 배식하지 않습니다</p>
                                        </>
                                    }
                            )
                        }
                    >
                        시설<br />관리팀
                    </div>

                    <div
                        className={`building-room clickable ${selectedRoom?.id === "복사실" ? "is-highlight" : ""}`}
                        style={{ top: "320px", left: "190px", width: "60px", height: "60px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "복사실"
                                    ? null
                                    : {
                                        id: "복사실", type: "ADMIN", content: <> <p>운영시간: 평일 11:00~16:00</p>
                                            <p>채플 시간에는 배식하지 않습니다</p>
                                        </>
                                    }
                            )
                        }
                    >
                        복사실
                    </div>

                    <div
                        className={`building-room clickable ${selectedRoom?.id === "편의점" ? "is-highlight" : ""}`}
                        style={{ top: "300px", left: "100px", width: "80px", height: "80px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "편의점"
                                    ? null
                                    : {
                                        id: "편의점", type: "ADMIN", content: <> <p>운영시간: 24시간</p>

                                        </>
                                    }
                            )
                        }
                    >
                        편의점
                    </div>

                    <div
                        className={`building-room clickable ${selectedRoom?.id === "로고스홀" ? "is-highlight" : ""}`}
                        style={{ top: "180px", left: "330px", width: "260px", height: "140px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "로고스홀"
                                    ? null
                                    : {
                                        id: "로고스홀", type: "ADMIN", content: <>
                                            <p>채플 시간: 12:00~12:30</p>
                                            <p><a
                                                href="https://www.bible.ac.kr/ko/illip/notice/view/57345?p=1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                채플 공지사항 바로가기
                                            </a>
                                            </p>
                                        </>
                                    }
                            )
                        }
                    >
                        로고스홀
                    </div>


                    <div className="building-room" style={{ top: "30px", left: "100px", width: "80px", height: "50px" }}>교직원 식당</div>

                    <div className="building-room" style={{ top: "70px", left: "380px", width: "40px", height: "30px" }}>사랑방</div>
                    <div className="building-room" style={{ top: "100px", left: "550px", width: "40px", height: "30px" }}>방송실</div>
                    <div className="building-room" style={{ top: "30px", left: "450px", width: "40px", height: "30px" }}>기도실</div>
                    <div className="building-room" style={{ top: "30px", left: "500px", width: "50px", height: "60px", fontSize: "13px" }}>교회음악<br />실습실</div>



                    {/* 장치들 (좌측 세로 계단 / 좌상단 엘리베이터 / 좌하단 화장실 / 하단 중앙 입구) */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 70, left: 100, width: 30, height: 50 }}>계단</div>

                    <div className="building-deco building-deco-stairs"
                        style={{ top: 120, left: 540, width: 50, height: 30 }}>계단</div>

                    <div className="building-deco building-deco-stairs"
                        style={{ top: 315, left: 520, width: 50, height: 30 }}>계단</div>

                    <div className="building-deco building-deco-stairs"
                        style={{ top: 200, left: 190, width: 30, height: 50, zIndex: 10, fontSize: "10px", borderRadius: "30 0 0 0px" }}>계단</div>



                    <div className="building-deco building-deco-elevator"
                        style={{ top: 90, left: 155, width: 30, height: 30, transform: "rotate(90deg)", fontSize: "10px" }}>
                        엘리<br />베이터
                    </div>

                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 120, left: 330, width: 40, height: 30, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>

                        <img
                            src="/bathroom.png"
                            alt="화장실"
                            style={{ width: "30px", height: "30px" }}
                        />
                    </div>


                    {/* 왼쪽부터 순서대로 입구 */}

                    <div className="building-deco building-deco-door"
                        style={{ top: 180, left: 230, width: 40, height: 18, transform: "none", borderRadius: "15px 15px 0 0", transform: "rotate(45deg)", zIndex: 10 }}>
                        입구
                    </div>

                    <div className="building-deco building-deco-door"
                        style={{ top: 320, left: 570, width: 40, height: 18, transform: "none", borderRadius: "15px 15px 0 0", transform: "rotate(-90deg)" }}>
                        입구
                    </div>


                    <div
                        style={{
                            position: "absolute",
                            top: "90px",     // 세로 시작 위치
                            left: "190px",   // 가로 시작 위치
                            width: "100px",    // 세로선 두께
                            height: "50px", // 세로선 길이
                            backgroundColor: "#f0f2f5",

                            // boxShadow: "2px 2px 5px rgba(186, 187, 205, 0.5)"
                        }}
                    ></div>

                    {/* 원 */}
                    <div
                        style={{
                            position: "absolute",
                            top: "180px",     // 세로 시작 위치
                            left: "180px",   // 가로 시작 위치
                            width: "80px",    // 세로선 두께
                            height: "80px", // 세로선 길이
                            backgroundColor: "#f0f2f5",
                            borderRadius: "50%"

                        }}
                    ></div>





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
            </div>


        </>
    );
}