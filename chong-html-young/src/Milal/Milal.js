// src/bogeum/index.js (또는 Bogeum.js 대체)
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanMilalB1 from "./FloorPlanMilalB1";
import FloorPlanMilalB2 from "./FloorPlanMilalB2";
import FloorPlanMilal1 from "./FloorPlanMilal1";
import FloorPlanMilal2 from "./FloorPlanMilal2";
import FloorPlanMilal3 from "./FloorPlanMilal3";
import FloorPlanMilal4 from "./FloorPlanMilal4";
import "../common/building.css"; // ✅ 공통 CSS

console.log("B1층:", FloorPlanMilalB1);
console.log("B2층:", FloorPlanMilalB2);
console.log("1층:", FloorPlanMilal1);
console.log("2층:", FloorPlanMilal2);
console.log("3층:", FloorPlanMilal3);
console.log("4층:", FloorPlanMilal4);


export default function Milal() {
    return (
        <BuildingTemplate
            building="밀알관"
            floors={[
                { label: "B1층", value: -1 },
                { label: "B2층", value: -2 },
                { label: "1층", value: 1 },
                { label: "2층", value: 2 },
                { label: "3층", value: 3 },
                { label: "4층", value: 4 },

            ]}
            floorPlans={{
                "-1": FloorPlanMilalB1,
                "-2": FloorPlanMilalB2,
                "1": FloorPlanMilal1,
                "2": FloorPlanMilal2,
                "3": FloorPlanMilal3,
                "4": FloorPlanMilal4,

            }}
        />
    );
}
