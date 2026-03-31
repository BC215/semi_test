import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./PostDetail.module.css";
import CommentSection from "./CommentSection";

// 게시글 상세보기 컴포넌트
// - 제목, 작성자, 날짜, 내용, 스크랩/신고, 좋아요, 댓글, 수정/삭제 버튼 처리
// - isEditing 모드에서 타이틀/컨텐츠 편집 표시
// - commentEnabled false로 설정하면 댓글 섹션을 감춤
const PostDetail = ({ post, liked = false, onLikeToggle, onUpdate, onDelete, commentEnabled = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isScrapped, setIsScrapped] = useState(false);
  const [isReported, setIsReported] = useState(false);

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
          <div className={styles.title_top}>
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.action_icons}>
              <button
                type="button"
                className={`${styles.icon_btn} ${isScrapped ? styles.activeIcon : ""}`}
                title="스크랩"
                onClick={() => {
                  setIsScrapped((prev) => {
                    const next = !prev;
                    if (next) {
                      alert("스크랩 되었습니다");
                    } else {
                      alert("스크랩이 취소되었습니다");
                    }
                    return next;
                  });
                }}
              >
                <span className="material-icons">bookmark_border</span>
              </button>
              <button
                type="button"
                className={`${styles.icon_btn} ${isReported ? styles.activeIcon : ""}`}
                title="신고"
                onClick={async () => {
                  const result = await Swal.fire({
                    title: "신고하시겠습니까?",
                    text: "신고하시면 해당 게시물이 운영정책에 따라 검토됩니다.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                    reverseButtons: false,
                  });

                  if (result.isConfirmed) {
                    setIsReported(true);
                    await Swal.fire({
                      icon: "success",
                      title: "신고가 접수되었습니다.",
                      showConfirmButton: true,
                      confirmButtonText: "확인",
                    });
                  }
                }}
              >
                <span className="material-icons">report</span>
              </button>
            </div>
          </div>
          <div className={styles.image_placeholder}>
            [ 탄소 저감 인증 사진 ]
          </div>
          <p className={styles.content}>{post.content}</p>

          <div className={styles.eco_badge}>
            🌿 이 포스트로 약 0.5kg의 탄소가 절감되었습니다!
          </div>

          <div className={styles.stats}>
            <div className={styles.like_wrapper}>
              <button
                className={
                  liked
                    ? `${styles.like_btn} ${styles.liked}`
                    : styles.like_btn
                }
                onClick={() => onLikeToggle?.()}
              >
                <span className="material-icons">
                  {liked ? "favorite" : "favorite_border"}
                </span>
              </button>
              <span className={styles.like_count}>
                {(post.likes || 0) + (liked ? 1 : 0)}
              </span>
            </div>
            <div className={styles.comment_icon}>
              <span className="material-icons">comment</span>
              <span>{Array.isArray(post.comments) ? post.comments.length : post.comments || 0}</span>
            </div>
          </div>

          <div className={styles.action_btns_vertical}>
            <div className={styles.sub_action_btns}>
              <button type="button" className={styles.action_btn} onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button type="button" className={styles.action_btn} onClick={() => onDelete?.(post.id)}>
                삭제
              </button>
            </div>
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
