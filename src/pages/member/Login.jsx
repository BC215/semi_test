// 설명: src/pages/member/Login.jsx 컴포넌트/모듈 파일입니다. 필요한 로직 주석을 추가하세요.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";

// 로그인 페이지 컴포넌트
// - 이메일/비밀번호 입력 후 인증 API 호출
// - 성공 시 /mypage로 이동
// - error 상태를 이용해 사용자 메시지 출력
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      // 서버가 토큰과 사용자 닉네임을 반환한다고 가정
      const { token, user } = response.data || {};
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", user?.name || "");
        navigate("/mypage");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("login error", err);
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.auth_page}>
      {/* 로그인 화면 중앙 정렬 바깥 컨테이너 */}
      <div className={styles.auth_card}>
        {/* 로그인 카드 박스: 제목 + 입력폼 */}
        <h2 className={styles.auth_title}>로그인</h2>
        <form onSubmit={handleSubmit} className={styles.auth_form}>
          <label className={styles.auth_label}>
            이메일
            <input
              className={styles.auth_input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
            />
          </label>

          <label className={styles.auth_label}>
            비밀번호
            <input
              className={styles.auth_input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </label>

          {error && <p className={styles.auth_error}>{error}</p>}

          <button type="submit" className={styles.auth_button}>
            로그인
          </button>
        </form>

        {/* 하단 안내: 회원가입 링크 */}
        <p className={styles.auth_footer}>
          아직 회원이 아니신가요?
          <Link to="/join">회원가입</Link>
        </p>
      </div>
    </div>
  );

};

export default Login;
