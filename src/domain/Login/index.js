import "./style.css";

import {useState} from "react";
import {useHistory} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const history = useHistory();

  const [lid, setLid] = useState(localStorage.getItem("lid") || "");
  const [lpw, setLpw] = useState(localStorage.getItem("lpw") || "");
  const [alertMsg, setAlertMsg] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (lid === "") {
      e.target[0].focus();
      setAlertMsg("아이디를 입력하세요.");
    } else if (lpw === "") {
      e.target[1].focus();
      setAlertMsg("비밀번호를 입력하세요.");
    } else {
      // id/pw 저장
      localStorage.setItem("lid", lid);
      localStorage.setItem("lpw", lpw);
      history.push("/");
    }

    return false;
  };

  return (
    <div className={"login container"}>
      {/* 로그인 테두리 */}
      <div className={"login-form"}>
        <h2 className={"body-title"}>PORTAL LOGIN</h2>

        {/* 로그인 폼 */}
        <form className={"login-form-round"} onSubmit={login}>
          <input
            id={"login-id"}
            type={"text"}
            value={lid}
            placeholder={"포탈(LMS) 아이디를 입력하세요."}
            onChange={(e) => setLid(e.target.value)}
          />
          <input
            id={"login-pw"}
            type={"password"}
            value={lpw}
            placeholder={"포탈(LMS) 비밀번호를 입력하세요."}
            onChange={(e) => setLpw(e.target.value)}
          />
          <button id={"login-btn"} type={"submit"}>
            로그인
          </button>
        </form>

        {/* 경고 메시지 */}
        {alertMsg !== "" && (
          <div className={"login-alert-msg"}>
            <span>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
            <span> {alertMsg}</span>
          </div>
        )}
      </div>

      <div className={"login-background"} />
    </div>
  );
}

export default Login;
