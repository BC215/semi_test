// 게시글 필터(시/도, 군/구, 검색) UI 컴포넌트
// 시/도, 시/군/구를 객체로 관리하여 옵션을 동적으로 렌더링 (DB 연동 시에도 쉽게 확장 가능)
import React, { useState } from "react";
import styles from "./PostFilter.module.css"; // 필요시 생성



// 시/도+시 단위 → 구 데이터 (예시, 실제 서비스에서는 DB/API에서 받아올 수 있음)
const cityData = {
  "서울특별시": [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ],
  "인천광역시": [
    "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"
  ],
  "부산광역시": [
    "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
  ],
  "대구광역시": [
    "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
  ],
  "광주광역시": [
    "광산구", "남구", "동구", "북구", "서구"
  ],
  "대전광역시": [
    "대덕구", "동구", "서구", "유성구", "중구"
  ],
  "울산광역시": [
    "남구", "동구", "북구", "울주군", "중구"
  ],
  "세종특별자치시": [
    "세종시"
  ],
  "경기도 수원시": [
    "장안구", "권선구", "팔달구", "영통구"
  ],
  "경기도 성남시": [
    "수정구", "중원구", "분당구"
  ],
  "경기도 부천시": [
    "심곡동", "중동", "상동", "송내동", "소사본동"
  ],
  "경기도 남양주시": [
    "다산동", "별내동", "화도읍", "진접읍"
  ],
  "경기도 화성시": [
    "병점동", "동탄1동", "동탄2동", "향남읍"
  ],
  "경기도 평택시": [
    "비전동", "서정동", "송탄동", "안중읍"
  ],
  "경기도 의정부시": [
    "의정부동", "호원동", "신곡동"
  ],
  "경기도 시흥시": [
    "정왕동", "신천동", "군자동"
  ],
  "경기도 파주시": [
    "금촌동", "문산읍", "운정동"
  ],
  "경기도 김포시": [
    "사우동", "장기동", "구래동"
  ],
  "경기도 광주시": [
    "경안동", "송정동", "오포읍"
  ],
  "경기도 광명시": [
    "광명동", "하안동", "철산동"
  ],
  "경기도 군포시": [
    "산본동", "금정동", "당정동"
  ],
  "경기도 오산시": [
    "오산동", "궐동", "세마동"
  ],
  "경기도 이천시": [
    "창전동", "증포동", "부발읍"
  ],
  "경기도 안성시": [
    "봉산동", "공도읍", "대덕면"
  ],
  "경기도 의왕시": [
    "내손동", "청계동", "오전동"
  ],
  "경기도 하남시": [
    "신장동", "덕풍동", "감일동"
  ],
  "경기도 여주시": [
    "여흥동", "능서면", "가남읍"
  ],
  "경기도 양평군": [
    "양평읍", "강상면", "강하면"
  ],
  "경기도 동두천시": [
    "생연동", "지행동", "송내동"
  ],
  "경기도 과천시": [
    "별양동", "중앙동", "과천동"
  ],
  "경기도 구리시": [
    "수택동", "인창동", "교문동"
  ],
  "경기도 포천시": [
    "신읍동", "소흘읍", "선단동"
  ],
  "경기도 연천군": [
    "전곡읍", "연천읍", "청산면"
  ],
  "경기도 가평군": [
    "가평읍", "청평면", "설악면"
  ],
  "경기도 구리시": [
    "구리시"
  ],
  "경기도 포천시": [
    "포천시"
  ],
  "경기도 연천군": [
    "연천군"
  ],
  "경기도 가평군": [
    "가평군"
  ]
  // ... 필요시 추가
};

const cityList = Object.keys(cityData);

const PostFilter = () => {
  const [search, setSearch] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGu, setSelectedGu] = useState("");

  // 선택된 시/도+시에 따라 구 목록 동적 변경
  const guList = selectedCity ? cityData[selectedCity] : [];

  // 초기화 버튼 동작 예시
  const handleReset = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedGu("");
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.select_group}>
        <select
          className={styles.select}
          value={selectedCity}
          onChange={e => {
            setSelectedCity(e.target.value);
            setSelectedGu(""); // 시 바뀌면 구 초기화
          }}
        >
          <option value="">시/도 선택</option>
          {cityList.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedGu}
          onChange={e => setSelectedGu(e.target.value)}
          disabled={!selectedCity}
        >
          <option value="">구 선택</option>
          {guList.map(gu => (
            <option key={gu} value={gu}>{gu}</option>
          ))}
        </select>
      </div>
      <div className={styles.search_group}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.input}
        />
        <button className={styles.search_btn}>검색</button>
        <button className={styles.reset_btn} onClick={handleReset}>초기화</button>
      </div>
    </div>
  );
};

export default PostFilter;
