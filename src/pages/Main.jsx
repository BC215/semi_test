// Main.jsx
// - 메인 페이지 컴포넌트입니다.
// - 지도, 인기 게시글, 측면 랭킹과 함께 많이 본 상품 슬라이드가 포함되어 있습니다.
// - 초보 개발자를 위해 각 섹션에 설명을 추가했습니다.
import React, { useMemo, useState } from "react";
import styles from "./Main.module.css";
import MapView from "../components/map/MapView";
import PostList from "../components/board/PostList";
import { storeDummyData } from "../components/mock/dummyData";

const Main = () => {
  // useState:
  // - selectedPopularId: 인기게시글 클릭 시 확장/상세보기용
  // - slideIndex: 많이 본 상품 슬라이드 현재 위치
  const [selectedPopularId, setSelectedPopularId] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // useMemo:
  // - storeDummyData 로부터 조회순 정렬 후 상위 15개를 가져옵니다.
  // - useMemo는 의존변수가 바뀔 때만 재계산되는 캐싱 역할을 함
  const goods = useMemo(() => {
    const sortedByViews = [...storeDummyData].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    return sortedByViews.slice(0, 15);
  }, []);


  // 슬라이드 관련 변수
  const slideWindow = 7; // 한 번에 보여줄 카드 개수
  const maxIndex = Math.max(0, goods.length - slideWindow); // 슬라이드 최대 인덱스

  const onPrev = () => setSlideIndex((prev) => Math.max(0, prev - 1));
  const onNext = () => setSlideIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <div className={styles.main_wrap}>
      <div className={styles.top_row}>
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
        <section className={styles.map_container}>
          <div className={styles.map_header}>
          <div className={styles.location_search_box}>
            <input type="text" placeholder="위치를 검색하세요" />
            <button>검색</button>
          </div>
          <span className={styles.map_title}>탄소배출 위치 지도</span>
        </div>

        <div className={styles.map_wrapper}>
          <MapView mode="list" />
          <div className={styles.map_placeholder}>전체 위치 지도가 표시됩니다</div>
        </div>
      </section>

      <section className={styles.popular_container}>
        <div className={styles.popular_header}>
          <h2>인기게시글</h2>
        </div>
        <div className={styles.popular_box}>
          <PostList
            limit={7}
            expandedPostId={selectedPopularId}
            onExpandedIdChange={setSelectedPopularId}
          />
        </div>
      </section>

      <section className={styles.side_container}>
        <div className={styles.challenge_box}>
          <h3>챌린지 홍보존</h3>
          <p>지구를 지키는 3일 플로깅 참여하고 보상 받기</p>
          <button>참여하기</button>
        </div>

        <div className={styles.realtime_box}>
          <h3>실시간 댓글</h3>
          <p>지속 가능한 탄소 줄이기 활동에 대한 댓글이 순환 표시됩니다.</p>
        </div>

        <div className={styles.rank_box}>
          <h3>절약 탄소배출량 랭킹</h3>
          <ul>
            <li>회원1 - 12,231kg</li>
            <li>회원2 - 11,900kg</li>
            <li>회원3 - 10,850kg</li>
            <li>회원4 - 9,750kg</li>
            <li>회원5 - 8,420kg</li>
          </ul>
        </div>
      </section>
      </div>

      <section className={styles.used_goods_section}>
        <h2>많이 본 상품</h2>
        <div className={styles.goods_controls}>
          <button
            className={styles.slide_button}
            onClick={onPrev}
            disabled={slideIndex === 0}
          >
            &lt;
          </button>
          <div className={styles.goods_slider}>
            {goods
              .slice(slideIndex, slideIndex + slideWindow)
              .map((item) => (
                <article key={item.id} className={styles.goods_card}>
                  <div className={styles.goods_image}>이미지</div>
                  <h3>{item.title}</h3>
                  <p className={styles.goods_price}>{item.price}</p>
                  <div className={styles.goods_meta}>
                    <span>👀 {item.viewCount || 0}</span>
                    <span>💬 {item.comments || 0}</span>
                  </div>
                </article>
              ))}
          </div>
          <button
            className={styles.slide_button}
            onClick={onNext}
            disabled={slideIndex === maxIndex}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Main;
