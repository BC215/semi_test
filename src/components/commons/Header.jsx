// 설명: src/components/commons/Header.jsx 컴포넌트/모듈 파일입니다. 필요한 로직 주석을 추가하세요.
import React from "react";
import { Link } from "react-router-dom";

// 헤더 컴포넌트
// - 상단 고정 도메인 로고와 네비게이션 링크 제공
const Header = () => {
  return (
    <header
      style={{
        height: "var(--header-h)",
        background: "var(--bg-color)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
      }}
    >
      {/* 헤더 내부 컨테이너를 메인 바디와 동일 폭으로 고정하여 정렬을 맞춤 */}
      <div
        style={{
          width: "1440px",
          maxWidth: "1440px",
          minWidth: "1440px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: "none",
            color: "black",
          }}
        >
          탄소커넥트
        </Link>
        <nav>
          <Link
            to="/mypage"
            style={{ marginLeft: "20px", textDecoration: "none", color: "#666" }}
          >
            마이페이지
          </Link>
        <Link
          to="/login"
          style={{ marginLeft: "20px", textDecoration: "none", color: "#666" }}
        >
          로그인
        </Link>
        <Link
          to="/join"
          style={{ marginLeft: "20px", textDecoration: "none", color: "#666" }}
        >
          회원가입
        </Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;
