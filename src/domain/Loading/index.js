import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function Loading({ment = "로딩 중입니다", className}) {
  return (
    <div className={`loading ${className}`}>
      <div className={"body-title"}>
        <h1>{ment}</h1>
        <span className={"on-loading"}>
          <FontAwesomeIcon icon={faSpinner} />
        </span>
      </div>
      <br />
      <h3>잠시만 기다려주세요</h3>
    </div>
  );
}

export default Loading;
