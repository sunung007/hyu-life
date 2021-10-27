import "./style.css";

import {useState} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";

import Modal from "../../../component/Modal";
import SettingModal from "../../../component/Modal/SettingModal";
import NavigationModal from "../../../component/Modal/NavigationModal";

import {EXTERNAL_LINK} from "../../../common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCog,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [showSetting, setShowSetting] = useState(false);
  const [showNav, setShowNav] = useState(false);

  return (
    <header>
      <div>
        <Link to={"/"}>
          <h2>HYU LIFE</h2>
        </Link>

        {path !== "/login" && (
          <>
            <ul className={"header-menus beauty-title only-web"}>
              <li>
                <Link to={"/lms"}>LMS</Link>
              </li>
              {/* 
              <li>
                <Link to={"/"}>PORTAL</Link>
              </li>
              <li>
                <Link to={"/"}>DEPT</Link>
              </li> */}

              {EXTERNAL_LINK.map((e) => (
                <li>
                  <a href={e.link} target={"_blank"} rel={"noreferrer"}>
                    {e.name}&nbsp;
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                </li>
              ))}

              <li>
                <span
                  className={"clickable"}
                  onClick={() => setShowSetting(true)}
                >
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </li>
            </ul>

            <div
              className={"header-menus beauty-title only-mobile clickable"}
              onClick={() => setShowNav(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>

            {/* 설정 팝업창 */}
            {showSetting && (
              <Modal setShow={setShowSetting}>
                <SettingModal setShow={setShowSetting} />
              </Modal>
            )}

            {showNav && (
              <Modal className={"navigation"} setShow={setShowNav}>
                <NavigationModal
                  setShow={setShowNav}
                  setShowSetting={setShowSetting}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
