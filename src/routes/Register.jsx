import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault(); // 폼 기본 동작 방지

    // 백엔드 서버에 회원가입 요청 보내기
    axios
      .post("http://localhost:8080/auth/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // 회원가입 성공 처리
        alert("회원가입성공");
        // 회원가입성공후  메인으로 이동
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("회원가입에 실패했습니다.");
      });
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h1>회원가입</h1>
        <div class="social-container"></div>
        <div class="login_id">
          <h4>이름</h4>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름"
          />
        </div>{" "}
        <div class="login_pw">
          <h4>비밀번호</h4>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>{" "}
        {errorMessage && <div>{errorMessage}</div>}
        <div class="submit">
          <input type="submit" value="회원가입" />
        </div>
      </form>
    </>
  );
};

export default Register;
