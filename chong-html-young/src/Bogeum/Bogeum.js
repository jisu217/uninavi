// src/bogeum/index.js (또는 Bogeum.js 대체)
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanBogeum1 from "./FloorPlanBogeum1";
import FloorPlanBogeum2 from "./FloorPlanBogeum2";
import FloorPlanBogeum3 from "./FloorPlanBogeum3";
import FloorPlanBogeum4 from "./FloorPlanBogeum4";
import FloorPlanBogeum5 from "./FloorPlanBogeum5";
import FloorPlanBogeum6 from "./FloorPlanBogeum6";
import "../common/building.css"; // ✅ 공통 CSS

console.log("1층:", FloorPlanBogeum1);
console.log("2층:", FloorPlanBogeum2);
console.log("3층:", FloorPlanBogeum3);
console.log("4층:", FloorPlanBogeum4);
console.log("5층:", FloorPlanBogeum5);
console.log("6층:", FloorPlanBogeum6);

export default function Bogeum() {
    return (
        <BuildingTemplate
            building="복음관"
            floors={[
                { label: "1층", value: 1 },
                { label: "2층", value: 2 },
                { label: "3층", value: 3 },
                { label: "4층", value: 4 },
                { label: "5층", value: 5 },
                { label: "6층", value: 6 },
            ]}
            floorPlans={{
                "1": FloorPlanBogeum1,
                "2": FloorPlanBogeum2,
                "3": FloorPlanBogeum3,
                "4": FloorPlanBogeum4,
                "5": FloorPlanBogeum5,
                "6": FloorPlanBogeum6,
            }}
        />
    );
}
