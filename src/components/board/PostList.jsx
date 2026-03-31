import React, { useState, useEffect } from "react";
import styles from "./PostList.module.css";
import axios from "axios";
import dummyData from "../mock/dummyData.jsx";
import PostDetail from "./PostDetail";

const PostList = ({
  posts: initialPosts = null,
  commentEnabled = true,
  expandedPostId = null,
  onExpandedIdChange,
  limit = null,
}) => {
  // 서버에서 불러온 게시글 상태
  const [posts, setPosts] = useState(initialPosts || []);
  // 현재 어떤 게시글이 펼쳐져 있는지 관리 (ID 저장)
  const [expandedId, setExpandedId] = useState(expandedPostId || null);
  // 좋아요 토글 상태 (게시글별)
  const [likeStates, setLikeStates] = useState({});

  useEffect(() => {
    if (expandedPostId !== undefined && expandedPostId !== expandedId) {
      setExpandedId(expandedPostId);
    }
  }, [expandedPostId]);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      return;
    }

    axios
      .get("/api/posts")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPosts(res.data);
        } else {
          // 백엔드가 없거나 빈 데이터일 때 기본 더미 사용
          setPosts(dummyData);
        }
      })
      .catch((err) => {
        console.error("PostList fetch failed:", err);
        setPosts(dummyData);
      });
  }, [initialPosts]);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    setLikeStates((prev) => {
      const newStates = { ...prev };
      posts.forEach((post) => {
        if (!(post.id in newStates)) {
          newStates[post.id] = false;
        }
      });

      // 유효하지 않은 id 제거
      Object.keys(newStates).forEach((id) => {
        if (!posts.find((post) => String(post.id) === String(id))) {
          delete newStates[id];
        }
      });

      return newStates;
    });
  }, [posts]);

  // 3) 게시글 열기/닫기 토글 함수
  //    - 동일 게시글을 다시 클릭하면 닫힌다 (expandedId=null)
  //    - 다른 게시글 클릭 시 해당 게시글을 expand 상태로 변경
  const handleToggle = (id) => {
    const newExpandedId = expandedId === id ? null : id;
    setExpandedId(newExpandedId);
    if (onExpandedIdChange) {
      onExpandedIdChange(newExpandedId);
    }
  };

  useEffect(() => {
    if (expandedId === null) return;
    const target = document.getElementById(`post-item-${expandedId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedId]);

  // 4) 삭제 콜백: PostDetail -> 여기에서 호출되고 자신의 리스트에서 삭제
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // 5) 수정 콜백: PostDetail -> 여기에서 호출되고 리스트 갱신
  const handleUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const visiblePosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className={styles.list}>
      {(visiblePosts.length ? visiblePosts : dummyData.slice(0, limit || dummyData.length)).map((post) => (
        <div
          id={`post-item-${post.id}`}
          key={post.id}
          className={`${styles.item_group} ${
            expandedId === post.id ? styles.expanded : ""
          }`}
        >
          <div
            className={`${styles.item_summary} ${expandedId === post.id ? styles.active : ""}`}
            onClick={() => handleToggle(post.id)}
          >
            <div className={styles.summary_top}>
              <span className={styles.author}>● {post.author}</span>
              <div className={styles.summary_stats}>
                <div className={styles.like_wrapper}>
                  <button
                    className={
                      likeStates[post.id]
                        ? `${styles.like_btn} ${styles.liked}`
                        : styles.like_btn
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setLikeStates((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }));
                    }}
                  >
                    <span className="material-icons">
                      {likeStates[post.id] ? "favorite" : "favorite_border"}
                    </span>
                  </button>
                  <span className={styles.like_count}>
                    {(post.likes || 0) + (likeStates[post.id] ? 1 : 0)}
                  </span>
                </div>
                <div className={styles.comment_icon}>
                  <span className="material-icons">comment</span>
                  <span>{post.comments ? post.comments.length : 0}</span>
                </div>
              </div>
            </div>
            <h4 className={styles.post_title}>{post.title}</h4>
          </div>

          {expandedId === post.id && (
            <div className={styles.detail_area}>
              {/*
                6) PostDetail 렌더링 로직
                   * expandedId와 현재 post.id 일치할 때만 렌더링
                   * 여기서 PostDetail 컴포넌트에 전달하는 콜백:
                     - onUpdate: 수정 완료 시 부모 리스트 갱신
                     - onDelete: 삭제 완료 시 부모 리스트 갱신
                   * commentEnabled: 마이페이지에서 false로 전달하면 댓글 섹션 숨김
              */}
              <PostDetail
                post={post}
                liked={!!likeStates[post.id]}
                onLikeToggle={() =>
                  setLikeStates((prev) => ({
                    ...prev,
                    [post.id]: !prev[post.id],
                  }))
                }
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                commentEnabled={commentEnabled}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
