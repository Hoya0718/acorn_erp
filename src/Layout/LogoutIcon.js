import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from '../api/axios';

const LogoutIcon = () => {
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleLogout = async () => {
    try {
      // 서버의 로그아웃 엔드포인트로 요청
      await axios.post("/logout", {}, { withCredentials: true });

      // 로컬 스토리지와 세션 스토리지에서 인증 정보를 삭제
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("userInfo");

      // 홈 페이지로 리다이렉트
      navigate("/", { replace: true });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirmPopup(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <FontAwesomeIcon
        icon={faSignOutAlt}
        onClick={handleLogoutClick}
        style={{ cursor: "pointer", fontSize: "24px" }}
      />
      {showConfirmPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <p>로그아웃 하시겠습니까?</p>
            <button onClick={handleConfirmLogout} style={styles.button}>
              확인
            </button>
            <button onClick={handleCancelLogout} style={styles.button}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  popup: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#4D7F9D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LogoutIcon;