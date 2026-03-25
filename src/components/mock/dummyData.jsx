const dummyData = Array.from({ length: 30 }, (_, i) => {
  const activities = [
    "자전거 출근 인증",
    "제로웨이스트 샵 방문",
    "플로깅 활동",
    "용기내 챌린지",
    "안 쓰는 플러그 뽑기",
  ];
  const activity = activities[i % activities.length];

  // 🚀 랜덤 위치 리스트 (위도, 경도 포함)
  const locations = [
    { name: "서울시 강남구", lat: 37.4979, lng: 127.0276 },
    { name: "서울시 마포구", lat: 37.5563, lng: 126.9227 },
    { name: "서울시 송파구", lat: 37.5145, lng: 127.1062 },
    { name: "서울시 영등포구", lat: 37.5264, lng: 126.8962 },
    { name: "서울시 성동구", lat: 37.5635, lng: 127.0365 },
    { name: "서울시 용산구", lat: 37.5326, lng: 126.9908 },
    { name: "서울시 서초구", lat: 37.4837, lng: 127.0324 },
    { name: "서울시 동작구", lat: 37.5124, lng: 126.9395 },
    { name: "서울시 은평구", lat: 37.6027, lng: 126.9291 },
    { name: "서울시 강동구", lat: 37.5301, lng: 127.1238 },
  ];

  // 랜덤하게 하나 선택
  const randomLoc = locations[Math.floor(Math.random() * locations.length)];

  // 날짜 포맷: 2026.03.01 형식
  const day = String((i % 25) + 1).padStart(2, "0");
  const date = `2026.03.${day}`;

  // 랜덤 댓글 생성
  const commentTemplates = [
    "정말 멋진 활동이네요! 저도 동참하겠습니다. 🌱",
    "2026년 탄소 중립 가즈아~! 응원합니다!",
    "위치가 어디인가요? 저도 가보고 싶네요.",
    "작은 실천이 모여 큰 변화를 만드네요. 보기 좋습니다.",
  ];

  const postComments = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    (v, j) => ({
      id: Date.now() + i + j,
      user: `에코친구${Math.floor(Math.random() * 100)}`,
      text: commentTemplates[
        Math.floor(Math.random() * commentTemplates.length)
      ],
      date: "방금 전",
    }),
  );

  return {
    id: i + 1,
    author: `에코워리어${i + 1}`,
    title: `${activity}로 탄소 발자국 줄이기!`,
    content: `오늘은 ${activity}를 실천했습니다. 2026년 3월의 따뜻한 날씨 속에 탄소 절감을 실천하니 기분이 좋네요. 여러분도 함께해요!`,
    date: date,
    likes: Math.floor(Math.random() * 80) + 10,
    comments: postComments,
    locationName: randomLoc.name, // 🚀 랜덤 주소 이름
    // 좌표값에 미세한 오차를 주어 핀이 겹치지 않게 함
    location: {
      lat: randomLoc.lat + (Math.random() - 0.5) * 0.01,
      lng: randomLoc.lng + (Math.random() - 0.5) * 0.01,
    },
  };
});

export default dummyData;
