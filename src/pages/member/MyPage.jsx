import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Main.module.css";
import dummyData from "../../components/mock/dummyData";
import PostList from "../../components/board/PostList";

const MyPage = () => {
  // 1) myPosts 상태: 현재 사용자(로그인이 없어도) 보여줄 게시글 목록
  const [myPosts, setMyPosts] = useState([]);

  // 2) 컴포넌트 최초 렌더링 시, 서버에서 내 게시글을 요청
  //    서버 응답이 없거나 비어있을 때는 더미 데이터를 그대로 보여주도록 구현
  useEffect(() => {
    axios
      .get("/api/my-posts")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          // 서버에 내 글 존재하면 그 글 목록을 상태에 세팅
          setMyPosts(res.data);
        } else {
          // 서버가 빈 배열을 반환하면 더미 데이터를 전체로 세팅
          setMyPosts(dummyData);
        }
      })
      .catch((err) => {
        // 에러가 나면 콘솔에 로그 출력하고 더미 데이터를 로드
        console.error("MyPage fetching error", err);
        setMyPosts(dummyData);
      });
  }, []);

  return (
    <div className={styles.main_wrap}>
      <h2>내가 작성한 글</h2>

      {/*
        3) 마이페이지는 댓글 섹션 없이 게시글 목록만 보여줌
           - PostList에 posts를 넘겨주고, commentEnabled=false으로 조절
           - 수정/삭제 기능(기본)과 토글 확장은 PostDetail+PostList 내부로 위임
      */}
      {myPosts.length === 0 ? (
        <p>등록된 글이 없습니다.</p>
      ) : (
        // 4) PostList에 posts 데이터 전달
        //    - MyPage는 직접 클릭 처리를 하지 않음
        //    - PostList 내부에서 게시글 제목 클릭 시 handleToggle이 호출되고
        //      expandedId가 변경되면 PostDetail이 렌더된다.
        //    - 이 구조 때문에 MyPage는 단순히 데이터(provide)만 담당하게 됨
        <PostList posts={myPosts} commentEnabled={false} />
      )}
    </div>
  );
};

export default MyPage;
