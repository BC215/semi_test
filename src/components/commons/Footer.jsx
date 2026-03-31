// 푸터 컴포넌트
// - 페이지 맨 아래 고정, 저작권/회사 정보 표시
const Footer = () => {
  return (
    <footer
      style={{
        height: "var(--footer-h)",
        background: "#f8f9fa",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-sub)",
        fontSize: "14px",
      }}
    >
      © 2026 LOCAL MAP. All rights reserved.
    </footer>
  );
};

export default Footer;
