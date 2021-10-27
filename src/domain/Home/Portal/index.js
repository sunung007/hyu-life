import "./style.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import {ELEMENT_NUM} from "../../../common";
import Table from "../../../component/Table";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faRedoAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

function Portal({portal, state, isMobile, onRefresh}) {
  const history = useHistory();
  const [curShow, setCurShow] = useState([]);
  const [curRange, setCurRange] = useState([0, 0]);

  const clickPost = (post) => {
    history.push({
      pathname: `/portal/detail`,
      state: {post: post},
    });
  };

  useEffect(() => {
    setCurShow(portal);
    setCurRange([0, portal.length > ELEMENT_NUM ? ELEMENT_NUM : portal.length]);
  }, [portal]);

  return (
    <div className={"portal"}>
      {/* 타이틀 */}
      <div className={"body-title"}>
        <h2>PORTAL</h2>

        {/* 새로고침 버튼 */}
        {state === 0 ? (
          <span className={"on-loading"}>
            <FontAwesomeIcon icon={faSpinner} />
          </span>
        ) : (
          <span className={"refresh-btn"} onClick={onRefresh}>
            <FontAwesomeIcon icon={faRedoAlt} />
          </span>
        )}
      </div>

      {/* 테이블 */}
      <Table
        curRange={curRange}
        setCurRange={setCurRange}
        curShowLength={curShow.length}
      >
        <div className={"only-web"}>
          <div className={"portal-table-1"}>제목</div>
          <div className={"portal-table-2"}>부서</div>
          <div className={"portal-table-3"}>게시자</div>
          <div className={"portal-table-4"}>게시일</div>
        </div>

        {curShow.length > 1 &&
          curShow.slice(curRange[0], curRange[1]).map((e, i) => (
            <div key={i} onClick={() => clickPost(e)}>
              <div className={"portal-title portal-table-1"}>
                {e.is_today && (
                  <span className={"notice-today-icon"}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </span>
                )}
                <span>{e.title}</span>
              </div>

              {isMobile ? (
                <div className={"portal-table-line2"}>
                  <div className={"portal-table-2"}>
                    {e.dept} {e.author}
                  </div>
                  <div className={"portal-table-4"}>{e.date}</div>
                </div>
              ) : (
                <>
                  <div className={"portal-table-2"}>{e.dept}</div>
                  <div className={"portal-table-3"}>{e.author}</div>
                  <div className={"portal-table-4"}>{e.date}</div>
                </>
              )}
            </div>
          ))}
      </Table>
    </div>
  );
}

export default Portal;
