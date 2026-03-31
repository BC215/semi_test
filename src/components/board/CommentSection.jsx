import React, { useState, useEffect } from "react";
import styles from "./CommentSection.module.css";

const CommentSection = ({ initialComments = [] }) => {
  // 부모로부터 받은 댓글 배열을 초기값으로 설정
  const normalizeInitialComments = (initialComments) => {
    if (!Array.isArray(initialComments)) return [];
    return initialComments.map((c) => ({
      id: c.id ?? Date.now() + Math.random(),
      user: c.user ?? "익명",
      text: c.text ?? c,
      date: c.date ?? "방금 전",
      isPrivate: c.isPrivate || false,
      replies: Array.isArray(c.replies) ? c.replies : [],
    }));
  };

  const [comments, setComments] = useState(normalizeInitialComments(initialComments));
  const [newComment, setNewComment] = useState("");
  const [newCommentPrivate, setNewCommentPrivate] = useState(false);
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyPrivate, setReplyPrivate] = useState(false);

  useEffect(() => {
    setComments(normalizeInitialComments(initialComments));
  }, [initialComments]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const addData = {
      id: Date.now(),
      user: "내 닉네임",
      text: newComment.trim(),
      date: "방금 전",
      isPrivate: newCommentPrivate,
      replies: [],
    };
    setComments([...comments, addData]);
    setNewComment("");
    setNewCommentPrivate(false);
  };

  return (
    <div className={styles.comment_wrap}>
      {/* 댓글 헤더: 현재 댓글 개수 표시 */}
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
                {c.isPrivate && <span className={styles.private_label}>비공개</span>}
                <span className={styles.time}>{c.date}</span>
              </div>
              <div className={styles.bubble}>{c.text}</div>
              <div className={styles.comment_actions}>
                <button className={styles.action_btn}>수정</button>
                <button className={styles.action_btn}>삭제</button>
                <button className={styles.action_btn} onClick={() => {
                  setReplyTargetId(replyTargetId === c.id ? null : c.id);
                  setReplyText("");
                  setReplyPrivate(false);
                }}>
                  답글
                </button>
              </div>

              {replyTargetId === c.id && (
                <div className={styles.reply_box}>
                  <textarea
                    placeholder="답글을 입력하세요"
                    className={styles.textarea}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className={styles.private_row}>
                    <label>
                      <input
                        type="checkbox"
                        checked={replyPrivate}
                        onChange={(e) => setReplyPrivate(e.target.checked)}
                      />
                      비공개
                    </label>
                    <button className={styles.submit_btn} onClick={() => {
                      if (!replyText.trim()) return;
                      const next = comments.map((item) => {
                        if (item.id !== c.id) return item;
                        return {
                          ...item,
                          replies: [
                            ...(item.replies || []),
                            {
                              id: Date.now(),
                              user: "내 닉네임",
                              text: replyText.trim(),
                              date: "방금 전",
                              isPrivate: replyPrivate,
                            },
                          ],
                        };
                      });
                      setComments(next);
                      setReplyText("");
                      setReplyTargetId(null);
                      setReplyPrivate(false);
                    }}>
                      등록
                    </button>
                  </div>
                </div>
              )}

              {c.replies && c.replies.length > 0 && (
                <div className={styles.reply_list}>
                  {c.replies.map((r) => (
                    <div key={r.id} className={styles.reply_item}>
                      <div className={styles.user_row}>
                        <span className={styles.user_name}>{r.user}</span>
                        {r.isPrivate && <span className={styles.private_label}>비공개</span>}
                        <span className={styles.time}>{r.date}</span>
                      </div>
                      <div className={styles.bubble}>{r.text}</div>
                    </div>
                  ))}
                </div>
              )}
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
          <div className={styles.private_row}>
            <label>
              <input
                type="checkbox"
                checked={newCommentPrivate}
                onChange={(e) => setNewCommentPrivate(e.target.checked)}
              />
              비공개
            </label>
            <button className={styles.submit_btn} onClick={handleAddComment}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
