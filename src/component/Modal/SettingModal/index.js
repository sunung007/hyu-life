import "./style.css";
import {useState} from "react";
import {ELEMENT_NUM} from "../../../common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

function SettingModal({setShow}) {
  const lid = localStorage.getItem("lid");

  const history = useHistory();
  const [element_num, setElementNum] = useState(ELEMENT_NUM);

  const elementIncrease = () =>
    setElementNum(element_num < 10 ? element_num + 1 : 10);
  const elementDecrease = () =>
    setElementNum(element_num > 1 ? element_num - 1 : 1);

  const save = () => {
    localStorage.setItem("element_num", element_num);
    setShow(false);
    window.location.replace("/");
  };
  const logInOut = () => {
    if (lid) {
      localStorage.clear();
      setShow(false);
      window.location.replace("/");
      localStorage.setItem("element_num", ELEMENT_NUM);
    } else {
      setShow(false);
      history.push("/login");
    }
  };

  return (
    <div className={"modal-wrapper setting-modal disable-drag"}>
      <h2 className={"body-title"}>SETTING</h2>

      <ul className={"setting-wrapper"}>
        {/* 로그인 정보 */}
        <li>
          <div className={"setting-item-label"}>포털 아이디</div>
          <div>{lid || "로그인 되어있지 않습니다."}</div>
        </li>

        {/* 한번에 뜨는 내용 수 */}
        <li>
          <div className={"setting-item-label"}>
            <div>한 번에 뜨는</div>
            <div>내용의 수</div>
          </div>

          <div>
            <span className={"setting-arrow"} onClick={elementDecrease}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
            <span className={"setting-arrow-element"}>{element_num}</span>
            <span className={"setting-arrow"} onClick={elementIncrease}>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </div>
        </li>

        {/* 저장/로그아웃 버튼 */}
        <li className={"setting-buttons-wrapper"}>
          <span className={"dark-blue-text clickable"} onClick={save}>
            저장
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

export default SettingModal;
