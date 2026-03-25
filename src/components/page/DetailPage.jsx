import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapView from "../components/map/MapView";
import PostDetail from "../components/board/PostDetail";
import CommentSection from "../components/board/CommentSection";
import dummyData from "../components/mock/dummyData.jsx";
import styles from "./DetailPage.module.css";

const DetailPage = () => {
  const { id } = useParams(); // URL의 id값 가져오기
  const navigate = useNavigate();

  // 데이터 찾기
  const post = dummyData.find((item) => item.id === parseInt(id));

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      {/* 좌측: 실천 장소 지도 */}
      <section className={styles.mapSection}>
        <MapView mode="single" location={post.location} />
      </section>

      {/* 우측: 상세 콘텐츠 (스크롤 가능) */}
      <section className={styles.contentSection}>
        <div className={styles.scroll_area}>
          <PostDetail post={post} />
          <div className={styles.divider} />
          <CommentSection postId={post.id} />
        </div>

        <button className={styles.back_btn} onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </section>
    </div>
  );
};

export default DetailPage;
