import React from "react";
import { Link, useParams } from "react-router-dom";
import { storeDummyData } from "../mock/dummyData";
import CommentSection from "./CommentSection";
import styles from "./Store.module.css";

const StoreDetail = () => {
  const { id } = useParams();
  const itemId = Number(id);
  const item = storeDummyData.find((product) => product.id === itemId);

  if (!item) {
    return (
      <div className={`${styles.store_layout} common_wrap`}>
        <section className={styles.store_wrap}>
          <h1>중고장터</h1>
          <p>해당 상품을 찾을 수 없습니다.</p>
          <Link to="/store" className={styles.back_link}>목록으로 돌아가기</Link>
        </section>
      </div>
    );
  }

  const sameProducts = storeDummyData.filter(
    (product) => product.title === item.title && product.id !== item.id
  );

  const displaySame = sameProducts.length > 0 ? sameProducts : storeDummyData.slice(0, 6);

  const initialComments = [
    {
      id: 1,
      user: "판매자",
      text: "제품 상태 매우 좋습니다. 택배 또는 직거래 가능합니다.",
      date: "1분 전",
      isPrivate: false,
      replies: [
        {
          id: 11,
          user: "구매희망자",
          text: "구매하고 싶습니다. 언제 거래 가능할까요?",
          date: "방금 전",
          isPrivate: true,
        },
      ],
    },
    {
      id: 2,
      user: "구매희망자",
      text: "유통기한은 언제까지인가요?",
      date: "5분 전",
      isPrivate: false,
      replies: [],
    },
  ];

  return (
    <div className={`${styles.store_layout} common_wrap`}>
      <section className={styles.store_wrap}>
        <div className={styles.detail_header}>
          <h1>{item.title}</h1>
          <Link to="/store" className={styles.back_link}>← 목록으로 돌아가기</Link>
        </div>

        <div className={styles.detail_top}>
          <div className={styles.detail_main_image}>
            <div className={styles.image}>이미지</div>
            <div className={styles.image_counter}>1 / 7</div>
          </div>
          <div className={styles.detail_summary}>
            <div className={styles.price_big}>{item.price}</div>
            <div className={styles.info_row}>작성자: {item.author}</div>
            <div className={styles.info_row}>등록일: {item.date}</div>
            <div className={styles.info_row}>조회수: {item.viewCount}</div>
            <div className={styles.info_row}>댓글: {item.comments}</div>
            <div className={styles.trade_info}>
              <p>배송비: 5,000원</p>
              <p>거래방법: 직거래 / 택배</p>
            </div>
            <div className={styles.product_state}>
              <p>상품 상태: 중고, 구성품 없음</p>
            </div>
            <div className={styles.detail_actions}>
              
              <button className={styles.buy_button}>구매하기</button> /*현재 미구현*/ 
            </div>
          </div>
        </div>

        <div className={styles.detail_content}>
          <h3>상품 정보</h3>
          <p>{item.content || "상품 상세 설명이 없습니다. 기본 텍스트로 대체되었습니다."}</p>
          <ul>
            <li>모델명: (임시) {item.title}</li>
            <li>컬러: 블랙</li>
            <li>설명: 중고 물품 판매 상세 페이지 샘플</li>
          </ul>
        </div>

        <div className={styles.shop_info}>
          <h3>가게 정보</h3>
          <p>상점명: {item.author} 상점</p>
          <p>신뢰지수: 624</p>
          <p>거래후기: 1</p>
        </div>

        <div className={styles.same_items_section}>
          <h3>같은 상품 더보기</h3>
          <div className={styles.same_items_wrapper}>
            {displaySame.map((same) => (
              <Link key={same.id} to={`/store/${same.id}`} className={styles.same_item}>
                <div className={styles.image}>이미지</div>
                <div className={styles.same_item_title}>{same.title}</div>
                <div className={styles.same_item_price}>{same.price}</div>
              </Link>
            ))}
          </div>
        </div>

        <CommentSection initialComments={initialComments} />

        <div className={styles.detail_navigation}>
          <button className={styles.sell_button} onClick={() => window.history.back()}>
            뒤로가기
          </button>
          <Link to="/store" className={styles.sell_button}>중고장터로</Link>
        </div>
      </section>
    </div>
  );
};

export default StoreDetail;
