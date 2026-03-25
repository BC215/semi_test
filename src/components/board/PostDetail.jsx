import React, { useEffect, useState } from "react";
import styles from "./PostDetail.module.css";
import CommentSection from "./CommentSection";

const PostDetail = ({ post, onUpdate, onDelete, commentEnabled = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  useEffect(() => {
    setEditedTitle(post.title);
    setEditedContent(post.content);
  }, [post]);

  const handleSave = () => {
    const updatedPost = { ...post, title: editedTitle, content: editedContent };
    onUpdate?.(updatedPost);
    setIsEditing(false);
  };

  return (
    <div className={styles.detail_container}>
      <div className={styles.header}>
        <span className={styles.author}>👤 {post.author}</span>
        <span className={styles.date}>{post.date}</span>
      </div>

      {isEditing ? (
        <div className={styles.edit_form}>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.edit_title}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className={styles.edit_content}
          />
          <div className={styles.edit_actions}>
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.image_placeholder}>
            [ 탄소 저감 인증 사진 ]
          </div>
          <p className={styles.content}>{post.content}</p>

          <div className={styles.eco_badge}>
            🌿 이 포스트로 약 0.5kg의 탄소가 절감되었습니다!
          </div>

          <div className={styles.stats}>
            <span>❤️ {post.likes}</span>
            <span>
              💬{" "}
              {Array.isArray(post.comments)
                ? post.comments.length
                : post.comments || 0}
            </span>
          </div>

          <div className={styles.action_btns}>
            <button type="button" onClick={() => setIsEditing(true)}>
              수정
            </button>
            <button type="button" onClick={() => onDelete?.(post.id)}>
              삭제
            </button>
          </div>
        </>
      )}

      {commentEnabled && (
        <CommentSection initialComments={post.comments || []} />
      )}
    </div>
  );
};

export default PostDetail;
