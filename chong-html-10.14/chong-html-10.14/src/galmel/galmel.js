// src/galmel/index.js (또는 galmel.js 대체)
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanGalmelB1 from "./FloorPlanGalmelB1";
import FloorPlanGalmel1 from "./FloorPlanGalmel1";
import FloorPlanGalmel2 from "./FloorPlanGalmel2";
import FloorPlanGalmel3 from "./FloorPlanGalmel3";
import "../common/building.css"; // ✅ 공통 CSS

export default function Galmel() {
  return (
    <BuildingTemplate
      building="갈멜관"
      floors={[
        { label: "B1층", value: -1 },
        { label: "1층", value: 1 },
        { label: "2층", value: 2 },
        { label: "3층", value: 3 },
      ]}
      floorPlans={{
        "-1": FloorPlanGalmelB1, // 필요 시 전용 컴포넌트 교체
        "1": FloorPlanGalmel1,
        "2": FloorPlanGalmel2,
        "3": FloorPlanGalmel3,
      }}
    />
  );
}