// src/bogeum/index.js (또는 Bogeum.js 대체)
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanIllipB1 from "./FloorPlanIllipB1";
import FloorPlanIllipB2 from "./FloorPlanIllipB2";
import FloorPlanIllipB3 from "./FloorPlanIllipB3";
import FloorPlanIllipB4 from "./FloorPlanIllipB4";
import FloorPlanIllipB5 from "./FloorPlanIllipB5";
import FloorPlanIllipB6 from "./FloorPlanIllipB6";
import FloorPlanIllipB7 from "./FloorPlanIllipB7";
import "../common/building.css"; // ✅ 공통 CSS

console.log("1층:", FloorPlanIllipB1);
console.log("2층:", FloorPlanIllipB2);
console.log("3층:", FloorPlanIllipB3);
console.log("4층:", FloorPlanIllipB4);
console.log("5층:", FloorPlanIllipB5);
console.log("6층:", FloorPlanIllipB6);
console.log("7층:", FloorPlanIllipB7);

export default function IllipB() {
  return (
    <BuildingTemplate
      building="일립관B"
      floors={[
        { label: "1층", value: 1 },
        { label: "2층", value: 2 },
        { label: "3층", value: 3 },
        { label: "4층", value: 4 },
        { label: "5층", value: 5 },
        { label: "6층", value: 6 },
        { label: "7층", value: 7 },
      ]}
      floorPlans={{

        "1": FloorPlanIllipB1,
        "2": FloorPlanIllipB2,
        "3": FloorPlanIllipB3,
        "4": FloorPlanIllipB4,
        "5": FloorPlanIllipB5,
        "6": FloorPlanIllipB6,
        "7": FloorPlanIllipB7,
      }}
    />
  );
}
