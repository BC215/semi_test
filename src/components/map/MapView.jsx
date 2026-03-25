import React from "react";
const MapView = ({ mode }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ddd",
    }}
  >
    {mode === "all" ? "전체 지도" : "상세 위치 지도"}
  </div>
);
export default MapView;
