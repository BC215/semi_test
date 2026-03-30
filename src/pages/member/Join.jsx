import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";

const Join = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("/api/join", { name, email, password });
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("join error", err);
      setError(err.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.auth_page}>
      <div className={styles.auth_card}>
        <h2 className={styles.auth_title}>회원가입</h2>

        <form onSubmit={handleSubmit} className={styles.auth_form}>
          <label className={styles.auth_label}>
            이름
            <input
              className={styles.auth_input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
          </label>

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

          <label className={styles.auth_label}>
            비밀번호 확인
            <input
              className={styles.auth_input}
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호 확인"
            />
          </label>

          {error && <p className={styles.auth_error}>{error}</p>}

          <button type="submit" className={styles.auth_button}>
            회원가입
          </button>
        </form>

        <p className={styles.auth_footer}>
          이미 계정이 있으신가요?
          <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Join;
