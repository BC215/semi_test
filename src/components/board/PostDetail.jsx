import React from "react";
import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.detail_container}>
      <div className={styles.header}>
        <span className={styles.author}>👤 {post.author}</span>
        <span className={styles.date}>{post.date}</span>
      </div>

      <h2 className={styles.title}>{post.title}</h2>

      <div className={styles.image_placeholder}>[ 탄소 저감 인증 사진 ]</div>

      <p className={styles.content}>{post.content}</p>

      <div className={styles.eco_badge}>
        🌿 이 포스트로 약 0.5kg의 탄소가 절감되었습니다!
      </div>

      <div className={styles.stats}>
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </div>
  );
};

export default PostDetail;
