import "./style.css";

import {useEffect} from "react";
import {useHistory} from "react-router-dom";

import {ELEMENT_NUM, EXTERNAL_LINK} from "../../../common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";

function NavigationModal({setShow, setShowSetting}) {
  const lid = localStorage.getItem("lid");

  const history = useHistory();
  const settingClick = () => setShowSetting(true);
  const closeNav = () => setShow(false);
  const logInOut = () => {
    if (lid) {
      localStorage.clear();
      setShowSetting(false);
      setShow(false);
      window.location.replace("/");
      localStorage.setItem("element_num", ELEMENT_NUM);
    } else {
      setShowSetting(false);
      setShow(false);
      history.push("/login");
    }
  };

  const outsideClickEvent = (e) => {
    const path = e?.path || (e?.composedPath && e?.composedPath());
    if (!path.map((i) => i.id).includes("navigation")) {
      closeNav();
    }
  };

  useEffect(() => {
    const parentEl = document.getElementById("modal-child");
    parentEl.addEventListener("click", outsideClickEvent);
    parentEl.addEventListener("touchend", outsideClickEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      parentEl.removeEventListener("touchend", outsideClickEvent);
      parentEl.removeEventListener("click", outsideClickEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={"navigation"} className={"disable-drag"}>
      {/* 헤더 */}
      <div className={"navigation-header"}>
        <h2>HYU LIFE HELPER</h2>

        {/* 로그인 정보 */}
        <h4>
          {lid !== null ? (
            <>
              접속 아이디 <span>{lid}</span>
            </>
          ) : (
            <>로그인 되어있지 않습니다.</>
          )}
        </h4>
      </div>

      {/* 메뉴들 */}
      <ul className={"navigation-menus beauty-title-bold"}>
        <li
          onClick={() => {
            history.push("/lms");
            closeNav();
          }}
        >
          LMS
        </li>
        {/* 
        <li>
          <Link to={""}>PORTAL</Link>
        </li>
        <li>
          <Link to={""}>DEPARTMENT</Link>
        </li> */}

        {EXTERNAL_LINK.map((e) => (
          <a href={e.link} target={"_blank"} rel={"noreferrer"}>
            <li>
              <span>{e.name}</span>
              &nbsp;
              <span className={"gray-text"}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </span>
            </li>
          </a>
        ))}

        <li className={"dark-blue-text"} onClick={closeNav}>
          닫기
        </li>

        <li className={"navigation-submenu"}>
          <span className={"dark-blue-text clickable"} onClick={settingClick}>
            설정
          </span>
          <span>&nbsp;&middot;&nbsp;</span>
          <span className={"red-text clickable"} onClick={logInOut}>
            {lid ? "로그아웃" : "로그인"}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NavigationModal;
