import React from "react";
import { Link } from "react-router-dom";

// 헤더 컴포넌트
// - 상단 고정 도메인 로고와 네비게이션 링크 제공
const Header = () => {
  return (
    <header
      style={{
        height: "var(--header-h)",
        background: "white",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
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
    </header>
  );
};

export default Header;
