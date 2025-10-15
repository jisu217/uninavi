// src/bogeum/index.js (또는 Bogeum.js 대체)
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanIllipAB1 from "./FloorPlanIllipAB1";
import FloorPlanIllipA1 from "./FloorPlanIllipA1";
import FloorPlanIllipA2 from "./FloorPlanIllipA2";
import FloorPlanIllipA3 from "./FloorPlanIllipA3";
import FloorPlanIllipA4 from "./FloorPlanIllipA4";
import FloorPlanIllipA5 from "./FloorPlanIllipA5";
import "../common/building.css"; // ✅ 공통 CSS

console.log("B1층:", FloorPlanIllipAB1);
console.log("1층:", FloorPlanIllipA1);
console.log("2층:", FloorPlanIllipA2);
console.log("3층:", FloorPlanIllipA3);
console.log("4층:", FloorPlanIllipA4);
console.log("5층:", FloorPlanIllipA5);

export default function IllipA() {
    return (
        <BuildingTemplate
            building="일립관 a"
            floors={[
                { label: "B1층", value: -1 },
                { label: "1층", value: 1 },
                { label: "2층", value: 2 },
                { label: "3층", value: 3 },
                { label: "4층", value: 4 },
                { label: "5층", value: 5 },
            ]}
            floorPlans={{
                "-1": FloorPlanIllipAB1,
                "1": FloorPlanIllipA1,
                "2": FloorPlanIllipA2,
                "3": FloorPlanIllipA3,
                "4": FloorPlanIllipA4,
                "5": FloorPlanIllipA5,
            }}
        />
    );
}
