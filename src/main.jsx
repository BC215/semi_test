// 설명: src/main.jsx 컴포넌트/모듈 파일입니다. 필요한 로직 주석을 추가하세요.
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
