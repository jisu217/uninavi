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

const CANVAS = { width: 600, height: 320 };

// 카페 메뉴
const cafeMenus = {
    Coffee: ["아메리카노 2.5",
        "카페라떼 3.5",
        "바닐라라떼 3.9",
        "카라멜마끼아토3.9",
        "카페라떼 3.5",
        "바닐라라떼 3.9",
        "아메리카노 2.5",
        "카페모카 3.9",
        "크리미카페라떼 4.0",
        "달고나카페라떼 4.0",
        "메이플크림라떼 4.8",
        "레몬커피 3.9",
        "카푸치노 3.9 only hot"],

    "Non coffee": ["초코라떼 4.0",
        "코코넛쉐이크 4.3 onle ice",
        "망고 쉐이크 4.5 only ice",
        "그린티라떼 4.5",
        "밀크티 4.5",
        "딸기쥬스 4.5 only ice",
        "그린티/초코 프라페 4.5 only ice",
        "자바칩/쿠앤크프라페 5.0 only ice",
        "딸기라떼 5.0 only ice",
        "자몽에딸기바나나쥬스 5.0 only ice이드",
        "딸기 그린티 라떼 5.5 only ice"

    ],
    "ade/tea": ["얼그레이/ 캐모마일/페퍼민트 3.5",
        "아이스티 3.5",
        "자몽 아이스티 4.0",
        "유자 티/ 에이드 4.0",
        "허니 자몽티/ 에이드 4.0",
        "패션 프롯티/ 에이드 4.3",
        "레몬 티/ 에이드 4.3",
        "청포도 에이드 4.3 only ice",
        "로즈히비스커스 티/ 에이드 5.0"
    ],

    Dessert: [
        "스윗브레드 2.5",
        "휘낭시에 2.5",
        "초코솔티휘낭시에 3.2",
        "소금빵 2.5",
        "베리살빵 4.0",
        "고구마빵 2.7",
        "크랜베리 결스콘 2.7",
        "에그타르트 3.0",
        "초코칩 모닝빵 3.0",
        "플레인 스콘 3.0",
        "마블파운드 3.3",
        "아몬드쿠키 3.5",
        "르벵쿠키 3.5",
        "루토스쿠키 2.5",
    ]
};


export default function FloorPlanMilal1({ roomsData = [], selectedRoom, setSelectedRoom }) {

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
            {/* 평면도 영역 */}
            <div className="building-floorplan-scroll">
                <div
                    className="building-floorplan-canvas"
                    style={{ width: CANVAS.width, height: CANVAS.height }}
                >
                    {/* 교직원 / 방 / 시설 */}
                    <div
                        className={`building-room clickable ${selectedRoom?.id === "북카페" ? "is-highlight" : ""}`}
                        style={{ top: "30px", left: "70px", width: "80px", height: "60px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "북카페"
                                    ? null
                                    : {
                                        id: "북카페",
                                        type: "ADMIN",
                                        content: (
                                            <>

                                                <p>운영시간: 평일 08:30~20:00</p>
                                                <p>강의에서 필요한 교재를 구매할 수 있습니다</p>
                                            </>
                                        )
                                    }
                            )
                        }
                    >
                        북카페
                    </div>


                    <div
                        className={`building-room clickable ${selectedRoom?.id === "카페" ? "is-highlight" : ""}`}
                        style={{ top: "170px", left: "70px", width: "80px", height: "60px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "카페"
                                    ? null
                                    : {
                                        id: "카페",
                                        type: "ADMIN",
                                        content: (
                                            <>
                                                <p>운영시간: 09:00~17:00</p>
                                                <p style={{ fontWeight: 600 }}>카페 메뉴</p>


                                                {Object.entries(cafeMenus).map(([category, items]) => (
                                                    <details className="menu-section" key={category}>
                                                        <summary>{category}</summary>
                                                        <ul>
                                                            {items.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </details>
                                                ))}
                                            </>
                                        )
                                    }
                            )
                        }
                    >
                        카페
                    </div>


                    <div
                        className={`building-room clickable ${selectedRoom?.id === "여자휴게실" ? "is-highlight" : ""}`}
                        style={{ top: "30px", left: "420px", width: "170px", height: "100px" }}
                        onClick={() =>
                            setSelectedRoom(
                                selectedRoom?.id === "여자휴게실"
                                    ? null
                                    : {
                                        id: "여자 휴게실",
                                        type: "ADMIN",
                                        content: (
                                            <>

                                                <p>운영시간: 평일 08:30~20:00</p>
                                                <p>여자휴게실 이용 시 학생증이 필요합니다.</p>
                                            </>
                                        )
                                    }
                            )
                        }
                    >
                        여자 휴게실
                    </div>

                    <div className="building-room" style={{ top: "230px", left: "420px", width: "80px", height: "100px" }}>교회 사무실</div>
                    <div className="building-room" style={{ top: "230px", left: "510px", width: "80px", height: "100px" }}>목양실</div>

                    {/* 계단 */}
                    <div className="building-deco building-deco-stairs"
                        style={{ top: 220, left: 70, width: 40, height: 80 }}>계단</div>

                    {/* 엘리베이터 */}
                    <div className="building-deco building-deco-elevator"
                        style={{ top: 250, left: 170, width: 65, height: 30, transform: "rotate(90deg)", fontSize: "13px" }}>
                        엘리베이터
                    </div>

                    {/* 화장실 */}
                    <div className="building-deco"
                        style={{ top: 150, left: 10, width: 50, height: 60, background: "#e9eef4", color: "#2e4b60", fontSize: 26 }}>
                        <img src="/bathroom.png" alt="화장실" style={{ width: "40px", height: "40px" }} />
                    </div>

                    {/* 입구 */}
                    <div className="building-deco building-deco-door"
                        style={{ top: 298, left: 130, width: 50, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>입구</div>
                    <div className="building-deco building-deco-door"
                        style={{ top: 298, left: 250, width: 100, height: 23, transform: "none", borderRadius: "15px 15px 0 0" }}>입구</div>

                    {/* 배경 구간 */}
                    <div style={{
                        position: "absolute",
                        top: "220px",
                        left: "0px",
                        width: "60px",
                        height: "100px",
                        backgroundColor: "#f0f2f5"
                    }}></div>

                    <div className="building-label" style={{ top: "145px", left: "270px" }}>
                        고승태홀
                    </div>

                    <div style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        width: "60px",
                        height: "70px",
                        backgroundColor: "#f0f2f5"
                    }}></div>



                </div>
            </div>

            {/* 정보 카드 */}

        </>

    );
}
