import React from "react";
import styles from "./Main.module.css";
import MapView from "../components/map/MapView";
import PostFilter from "../components/board/PostFilter";
import PostList from "../components/board/PostList";

const Main = () => {
  return (
    <div className={styles.main_wrap}>
      {/* 1. 좌측 영역: 전체 위치를 보여주는 고정 지도 */}
      <section className={styles.map_container}>
        <div className={styles.map_wrapper}>
          <MapView mode="list" />
          {/* 지도가 아직 연결 안 됐다면 아래 문구가 보입니다 */}
          <div className={styles.map_placeholder}>전체 위치 지도</div>
        </div>
      </section>

      {/* 2. 우측 영역: 게시판 박스 (필터 고정 + 리스트 스크롤) */}
      {/* 게시판(옵션+리스트) 상단 초록색 그라데이션 선은 Main.module.css의 .board_container::before에서 생성됨 */}
      <section className={styles.board_container}>
        {/* 상단 필터: 이 영역은 스크롤되지 않고 고정됩니다 */}
        <div className={styles.filter_area}>
          <PostFilter />
        </div>

        {/*  핵심:  (이 안에서만 스크롤 발생) */}
        <div className={styles.list_area}>
          {/* 
             PostList 내부에서 게시글을 클릭하면 
             SNS처럼 아래로 상세 내용과 지도가 펼쳐집니다. 
          */}
          <PostList />
        </div>
      </section>
    </div>
  );
};

export default Main;
