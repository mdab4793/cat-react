import Register from "./Register";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser, user }) => {
  const [auth, setAuth] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/login")
      .then((result) => {
        setAuth(result.data);
      })
      .catch(() => {
        console.log("fail");
      });
  }, []);

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setUser(response);
        console.log(response.config.data);
        // 로그인 성공 처리
        // 로그인성공후  메인으로 이동
        alert("로그인성공");
        navigate("/catlist");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("로그인에 실패했습니다.");
      });
  };

  return (
    <>
      <div>
        <div>
          <h2>로그인해주세요!</h2>
          <div>
            <h4>이름</h4>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="이름"
            />
          </div>
          <div>
            <h4>비밀번호</h4>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          {errorMessage && <div>{errorMessage}</div>}
          <div>
            <button onClick={handleLogin}>로그인</button>
          </div>
          <button>
            <Link to="/register">회원가입</Link>
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
