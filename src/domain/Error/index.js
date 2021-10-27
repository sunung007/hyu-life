import "./style.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

function Error({errMsg = ""}) {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  const [msg, setMsg] = useState("");
  const goBack = () => {
    history.go(-2);
  };

  useEffect(() => {
    let query = location.search;
    if (query === "") {
      setMsg(errMsg);
    } else {
      query = query.split("?")[1].split("=");
      if (query[0] === "msg") {
        setMsg(decodeURI(query[1]));
      }
    }
  }, [errMsg, location.search]);

  return (
    <div className={`error ${path === "/error" && "container"}`}>
      <h1 className={"error-blue"}>에러가 발생하였습니다.</h1>
      <br />
      <h2 className={"error-red"}>{msg}</h2>
      {path !== "/" && (
        <div className={"back-to-prev"} onClick={goBack}>
          <span>
            <FontAwesomeIcon icon={faHandPointLeft} />
          </span>
          <span> 이전 페이지로 돌아가기</span>
        </div>
      )}
    </div>
  );
}

export default Error;
