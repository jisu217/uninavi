// Moria/index.js
import BuildingTemplate from "../common/BuildingTemplate";
import FloorPlanMoria1 from "./FloorPlanMoria1";
import FloorPlanMoria2 from "./FloorPlanMoria2";
import FloorPlanMoria3 from "./FloorPlanMoria3";
import "../common/building.css"; // ✅ 공통 CSS

export default function Moria() {
    return (
        <BuildingTemplate
            building="모리아관"
            floors={[{ label: "1층", value: 1 }, { label: "2층", value: 2 }, { label: "3층", value: 3 }]}
            floorPlans={{ 1: FloorPlanMoria1, 2: FloorPlanMoria2, 3: FloorPlanMoria3 }}
        />
    );
}