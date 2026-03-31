// Store.jsx
// - 중고장터 화면 컴포넌트입니다.
// - storeDummyData로부터 75개 상품을 가져와 페이징 처리를 합니다.
import React, { useMemo, useState } from "react";
import styles from "./Store.module.css";
import { storeDummyData } from "../mock/dummyData";

const Store = () => {
  // 1) 기본 상태값 선언
  // currentPage: 현재 페이지 (페이지네이션 위치)
  // itemsPerPage: 한 페이지에 보여줄 아이템 개수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // 2) 검색 상태: 작성자(author) 또는 물품명(title) 기준 선택
  const [searchType, setSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  // searchQuery에서 검색 수행 여부를 저장하는 상태
  const [activeSearch, setActiveSearch] = useState("");

  // 3) 기본 상품 리스트 로딩과 섞기
  const goods = useMemo(() => {
    const shuffled = [...storeDummyData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 75); // 75개(5페이지 분량)
  }, []);

  // 4) 검색 필터링
  const searchedGoods = useMemo(() => {
    const q = activeSearch.trim().toLowerCase();
    if (!q) return goods;

    // 물품 제목 or 작성자에 검색어 포함 여부 검사
    return goods.filter((item) =>
      String(item[searchType]).toLowerCase().includes(q)
    );
  }, [goods, searchType, activeSearch]);

  // 5) 페이징 계산
  const pageCount = Math.max(1, Math.ceil(searchedGoods.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleGoods = searchedGoods.slice(startIndex, startIndex + itemsPerPage);

  // 6) 페이지 이동 함수
  const goToPage = (page) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  // 7) 검색 버튼 클릭 시에만 activeSearch에 검색어 저장
  //    + 페이지 1로 이동
  const updateSearch = () => {
    setActiveSearch(searchQuery);
    setCurrentPage(1);
  };

  return (
    <div className={styles.store_layout}>
      {/* 좌측 메뉴 + 고객센터 (Main 페이지와 동일 위치) */}
      <aside className={styles.menu_panel}>
        <div className={styles.menu_title}>메뉴</div>
        <ul className={styles.menu_list}>
          <li><a href="#">맵 커뮤니티</a></li>
          <li><a href="#">챌린지 캠페인</a></li>
          <li><a href="/store">중고거래</a></li>
          <li><a href="#">미션</a></li>
          <li><a href="#">나무 키우기</a></li>
          <li><a href="#">공지사항</a></li>
        </ul>
        <div className={styles.customer_box}>
          <h3>고객센터</h3>
          <p>고객센터 운영시간</p>
          <p>10:00 ~ 18:00</p>
          <a href="#" className={styles.customer_link}>문의하기 ▶</a>
        </div>
      </aside>

      {/* 오른쪽 스토어 콘텐츠 기본 영역 */}
      <section className={styles.store_wrap}>
        <div className={styles.header_box}>
        <h1>중고장터</h1>
        <div className={styles.search_box}>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="author">작성자</option>
            <option value="title">물품명</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={updateSearch}>검색</button>
        </div>
        <button className={styles.sell_button}>판매하기</button>
      </div>

      <div className={styles.grid_box}>
        {visibleGoods.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.image}>이미지</div>
            <h3>{item.title}</h3>
            <p className={styles.price}>{item.price}</p>
            <p className={styles.meta}>{item.author} · {item.date} · 댓글 {item.comments}</p>
          </article>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? styles.activePage : ""}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === pageCount}>
          &gt;
        </button>
      </div>
    </section>
  </div>
  );
};

export default Store;
