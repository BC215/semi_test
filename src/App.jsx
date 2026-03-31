import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./font.css";
import Footer from "./components/commons/Footer";
import Header from "./components/commons/Header";
import Main from "./pages/Main";
import Store from "./components/board/Store";
import MyPage from "./pages/member/MyPage";
import Login from "./pages/member/Login";
import Join from "./pages/member/Join";
import StoreDetail from "./components/board/StoreDetail";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
