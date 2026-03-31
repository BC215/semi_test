// 설명: src/components/map/MapView.jsx 컴포넌트/모듈 파일입니다. 필요한 로직 주석을 추가하세요.
import React from "react";

// 맵 뷰 컴포넌트
// - mode가 'all'인 경우 전체 지도를, 그렇지 않으면 상세 위치 지도를 표시
// - 현재는 플레이스홀더 텍스트를 렌더링함
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
