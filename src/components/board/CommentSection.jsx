import React, { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";

const CommentSection = ({ initialComments = [] }) => {
  // 부모로부터 받은 댓글 배열을 초기값으로 설정
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  // 게시글이 바뀔 때마다 해당 게시글의 댓글로 상태를 업데이트
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const addData = {
      id: Date.now(),
      user: "내 닉네임",
      text: newComment,
      date: "방금 전",
    };
    setComments([...comments, addData]);
    setNewComment("");
  };

  return (
    <div className={styles.comment_wrap}>
      <h5 className={styles.comment_count}>
        댓글 {comments ? comments.length : 0}
      </h5>

      <div className={styles.comment_list}>
        {comments &&
          comments.map((c) => (
            <div key={c.id} className={styles.comment_item}>
              <div className={styles.user_row}>
                <div className={styles.profile_mini}>👤</div>
                <span className={styles.user_name}>{c.user}</span>
                <span className={styles.time}>{c.date}</span>
              </div>
              <div className={styles.bubble}>{c.text}</div>
              <div className={styles.comment_actions}>
                <button className={styles.action_btn}>수정</button>
                <button className={styles.action_btn}>삭제</button>
              </div>
            </div>
          ))}
      </div>

      <div className={styles.input_container}>
        <div className={styles.user_row_mine}>👤 내 닉네임</div>
        <div className={styles.input_box}>
          <textarea
            placeholder="따뜻한 응원의 댓글을 남겨주세요..."
            className={styles.textarea}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className={styles.submit_btn} onClick={handleAddComment}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
