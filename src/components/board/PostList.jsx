import React, { useState, useEffect } from "react";
import styles from "./PostList.module.css";
import axios from "axios";
import dummyData from "../mock/dummyData.jsx";
import PostDetail from "./PostDetail";

const PostList = ({ posts: initialPosts = null, commentEnabled = true }) => {
  // 서버에서 불러온 게시글 상태
  const [posts, setPosts] = useState(initialPosts || []);
  // 현재 어떤 게시글이 펼쳐져 있는지 관리 (ID 저장)
  const [expandedId, setExpandedId] = useState(null);

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

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  return (
    <div className={styles.list}>
      {(posts.length ? posts : dummyData).map((post) => (
        <div key={post.id} className={styles.item_group}>
          <div
            className={`${styles.item_summary} ${expandedId === post.id ? styles.active : ""}`}
            onClick={() => handleToggle(post.id)}
          >
            <div className={styles.summary_top}>
              <span className={styles.author}>● {post.author}</span>
              <div className={styles.summary_stats}>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments ? post.comments.length : 0}</span>
              </div>
            </div>
            <h4 className={styles.post_title}>{post.title}</h4>
          </div>

          {expandedId === post.id && (
            <div className={styles.detail_area}>
              <PostDetail
                post={post}
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
