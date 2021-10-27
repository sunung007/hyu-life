import "./style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithubSquare} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div>
        <div className={"footer-left"}>
          <p>© Gofo 2021.</p>
          <p>
            본 사이트는 학업에 도움을 제공하기위해 비영리적인 목적으로
            제작되었으며, 복제 및 수정에 대한 책임은 행위자 개인에게 있습니다.
          </p>
        </div>
        <div className={"footer-right"}>
          <span>오류 및 문의</span>
          {/* 이메일 */}
          <a
            className={"footer-ask"}
            href={"mailto:sunung007@hanyang.ac.kr"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <p>Email</p>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          {/* 구분점 */}
          <div className={"footer-ask"}>&#183;</div>
          {/* 깃허브 */}
          <a
            className={"footer-ask"}
            href={"https://github.com/sunung007/HYUHelper"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <p>Github</p>
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
