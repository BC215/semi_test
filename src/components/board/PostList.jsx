import React, { useState } from "react";
import styles from "./PostList.module.css";
import dummyData from "../mock/dummyData.jsx";
import CommentSection from "./CommentSection";

const PostList = () => {
  // 현재 어떤 게시글이 펼쳐져 있는지 관리 (ID 저장)
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    // 이미 열린 글을 누르면 닫고, 아니면 해당 ID의 글을 엽니다.
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={styles.list}>
      {dummyData.map((post) => (
        <div key={post.id} className={styles.item_group}>
          {/* --- 1. 요약 리스트 헤더 (항상 보임) --- */}
          <div
            className={`${styles.item_summary} ${expandedId === post.id ? styles.active : ""}`}
            onClick={() => handleToggle(post.id)}
          >
            <div className={styles.summary_top}>
              <span className={styles.author}>● {post.author}</span>
              <div className={styles.summary_stats}>
                <span>❤️ {post.likes}</span>
                {/* 댓글 배열의 길이를 숫자로 표시 */}
                <span>💬 {post.comments ? post.comments.length : 0}</span>
              </div>
            </div>
            <h4 className={styles.post_title}>{post.title}</h4>
          </div>

          {/* --- 2. 상세 내용 영역 (클릭 시 SNS 방식으로 아래로 확장) --- */}
          {expandedId === post.id && (
            <div className={styles.detail_area}>
              {/* 메인 본문 박스 (초록 테두리) */}
              <div className={styles.main_post_box}>
                <div className={styles.detail_header}>
                  <div className={styles.title_row}>
                    <h3>{post.title}</h3>
                    <span className={styles.info_icon}>ⓘ</span>
                  </div>

                  {/* 유저 정보 영역: 이미지 + (닉네임/시간) + 위치 */}
                  <div className={styles.user_profile_section}>
                    <div className={styles.profile_img} />
                    <div className={styles.user_info_wrapper}>
                      <div className={styles.nickname_row}>
                        <span className={styles.nickname}>{post.author}</span>
                        <span className={styles.meta_time}>🕒 {post.date}</span>
                      </div>
                      {/* 🚀 데이터에서 가져온 랜덤 위치(서울시 OO구) 출력 */}
                      <span className={styles.meta_location}>
                        📍 {post.locationName || "서울시 종로구"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 본문 흰색 내용 박스 */}
                <div className={styles.content_white_box}>
                  <p className={styles.post_content_text}>{post.content}</p>

                  {/* 이미지 인증 영역 (설계도 가이드 위치) */}
                  <div className={styles.image_placeholder}>
                    탄소 저감 인증 사진
                  </div>
                </div>

                {/* 본문 하단: 좋아요/댓글수 및 관리 버튼 */}
                <div className={styles.detail_footer}>
                  <div className={styles.stats}>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments ? post.comments.length : 0}</span>
                  </div>
                  <div className={styles.action_btns}>
                    <button type="button">수정</button>
                    <button type="button">삭제</button>
                  </div>
                </div>
              </div>

              {/* 🚀 댓글 영역: 해당 게시글의 댓글 배열을 전달합니다 */}
              <CommentSection initialComments={post.comments} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
