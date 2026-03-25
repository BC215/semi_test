import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Main.module.css";
import dummyData from "../../components/mock/dummyData";
import PostList from "../../components/board/PostList";

const MyPage = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/my-posts")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMyPosts(res.data);
        } else {
          setMyPosts(dummyData);
        }
      })
      .catch((err) => {
        console.error("MyPage fetching error", err);
        setMyPosts(dummyData);
      });
  }, []);

  return (
    <div className={styles.main_wrap}>
      <h2>내가 작성한 글</h2>
      {myPosts.length === 0 ? (
        <p>등록된 글이 없습니다.</p>
      ) : (
        <PostList posts={myPosts} commentEnabled={false} />
      )}
    </div>
  );
};

export default MyPage;
