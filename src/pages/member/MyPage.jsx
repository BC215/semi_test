import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Main.module.css";
import dummyData from "../../components/mock/dummyData";

const MyPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    axios
      .get("/api/my-posts")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMyPosts(res.data);
        } else {
          setMyPosts(dummyData.filter((p) => p.author === "내 닉네임"));
        }
      })
      .catch((err) => {
        console.error("MyPage fetching error", err);
        setMyPosts(dummyData.filter((p) => p.author === "내 닉네임"));
      });
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => setMyPosts((prev) => prev.filter((p) => p.id !== id)))
      .catch(() => setMyPosts((prev) => prev.filter((p) => p.id !== id)));
  };

  const startEditing = (post) => {
    setEditingId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const saveEditing = (id) => {
    const updated = {
      ...myPosts.find((p) => p.id === id),
      title: editedTitle,
      content: editedContent,
    };

    axios
      .patch(`/api/posts/${id}`, updated)
      .then(() => {
        setMyPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        setEditingId(null);
      })
      .catch(() => {
        setMyPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        setEditingId(null);
      });
  };

  return (
    <div className={styles.main_wrap}>
      <h2>내가 작성한 글</h2>
      {myPosts.length === 0 ? (
        <p>등록된 글이 없습니다.</p>
      ) : (
        <div className={styles.list}>
          {myPosts.map((post) => (
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
                  {editingId === post.id ? (
                    <div>
                      <input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={{ width: "100%", marginBottom: 8 }}
                      />
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        style={{ width: "100%", minHeight: 120 }}
                      />
                      <button onClick={() => saveEditing(post.id)}>저장</button>
                      <button onClick={() => setEditingId(null)}>취소</button>
                    </div>
                  ) : (
                    <div>
                      <p>{post.content}</p>
                      <button onClick={() => startEditing(post)}>수정</button>
                      <button onClick={() => handleDelete(post.id)}>
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
