import React, { useState } from "react";
import styles from "./PostFilter.module.css"; // 필요시 생성

const PostFilter = () => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.filter_container}>
      <div className={styles.select_group}>
        <select className={styles.select}>
          <option>시/도 선택</option>
          <option>서울특별시</option>
          <option>경기도</option>
        </select>
        <select className={styles.select}>
          <option>군/구 선택</option>
        </select>
      </div>
      <div className={styles.search_group}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <button className={styles.search_btn}>검색</button>
        <button className={styles.reset_btn}>초기화</button>
      </div>
    </div>
  );
};

export default PostFilter;
