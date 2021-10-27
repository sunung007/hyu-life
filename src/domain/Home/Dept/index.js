import "./style.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import Table from "../../../component/Table";
import RoundBtn from "../../../component/RoundBtn";
import {DEPT_NOTICE_TYPE, ELEMENT_NUM} from "../../../common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faRedoAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const sortDate = (a, b) => {
  if (a.date === b.date) {
    if (a.type === b.type) return a.id < b.id ? 1 : -1;
    else {
      if (a.type === "학부 공지") return -1;
      else if (b.type === "학부 공지") return 1;
      else if (a.type === "졸프 공지") return -1;
      else if (b.type === "졸프 공지") return 1;
      else if (a.type === "일반") return -1;
      else if (b.type === "일반") return -1;
      else if (a.type === "졸프") return 1;
      else if (b.type === "졸프") return 1;
      else return -1;
    }
  }
  return a.date < b.date ? 1 : -1;
};

function Dept({dept, state, isMobile, onRefresh}) {
  const history = useHistory();

  const [curShow, setCurShow] = useState([]);
  const [curRange, setCurRange] = useState([0, 0]);
  const [curFilter, setCurFilter] = useState({
    all: true,
    // notice: true,
    normal: true,
    graduate: true,
    student: true,
  });
  const clickPost = (post) => {
    history.push({
      pathname: `/dept/detail`,
      state: {post: post},
    });
  };
  const changeFilter = (e) => {
    const target = e.target.id.substring(10);
    let tmpFilter = {...curFilter};
    tmpFilter[target] = !tmpFilter[target];

    if (target === "all") {
      setCurFilter({
        all: tmpFilter.all,
        // notice: tmpFilter.all,
        normal: tmpFilter.all,
        graduate: tmpFilter.all,
        student: tmpFilter.all,
      });

      if (tmpFilter.all) {
        let tmpShow = [...dept];
        tmpShow.sort(sortDate);
        setCurShow(tmpShow);
      } else setCurShow([]);
    } else {
      let tmpShow = [];
      if (!tmpFilter.normal && !tmpFilter.graduate && !tmpFilter.student)
        tmpFilter.all = false;
      for (let filter in tmpFilter)
        if (tmpFilter[filter])
          tmpShow = tmpShow.concat(
            dept.filter((a) => a.type === DEPT_NOTICE_TYPE[filter])
          );
      if (tmpShow.length > 0) tmpShow = tmpShow.sort(sortDate);
      setCurShow(tmpShow);
      setCurFilter(tmpFilter);
    }
  };

  useEffect(() => {
    let tmpDept = [...dept];
    tmpDept.sort(sortDate);
    setCurShow(tmpDept);
    setCurRange([
      0,
      tmpDept.length > ELEMENT_NUM ? ELEMENT_NUM : tmpDept.length,
    ]);
  }, [dept]);

  return (
    <div className={"dept"}>
      {/* 타이틀 */}
      <div className={"body-title"}>
        <h2>
          {" "}
          DEPARTMENT :{" "}
          <span className={"dept-title"}>컴퓨터소프트웨어학부</span>
        </h2>

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

      <div className={"buttons"}>
        <RoundBtn
          id={"home-dept-all"}
          className={curFilter.all ? "btn-checked" : ""}
          onClick={changeFilter}
        >
          전체
        </RoundBtn>
        {/*<RoundBtn id={"home-dept-notice"}>공지</RoundBtn>*/}
        <RoundBtn
          id={"home-dept-normal"}
          className={curFilter.normal ? "btn-checked" : ""}
          onClick={changeFilter}
        >
          학사일반
        </RoundBtn>
        <RoundBtn
          id={"home-dept-graduate"}
          className={curFilter.graduate ? "btn-checked" : ""}
          onClick={changeFilter}
        >
          졸업작품
        </RoundBtn>
        <RoundBtn
          id={"home-dept-student"}
          className={curFilter.student ? "btn-checked" : ""}
          onClick={changeFilter}
        >
          학생
        </RoundBtn>
      </div>

      <Table
        curRange={curRange}
        setCurRange={setCurRange}
        curShowLength={curShow.length}
      >
        <div className={"only-web"}>
          <div className={"dept-table-1"}>구분</div>
          <div className={"dept-table-2"}>제목</div>
          <div className={"dept-table-3"}>날짜</div>
        </div>

        {curShow.length > 0 &&
          curShow.slice(curRange[0], curRange[1]).map((post, i) =>
            !isMobile ? (
              <div key={i} onClick={() => clickPost(post)}>
                <div className={"dept-table-1"}>
                  {post.is_today && (
                    <span className={"notice-today-icon"}>
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </span>
                  )}
                  {post.type}
                </div>
                <div className={"dept-each-title dept-table-2"}>
                  {post.title}
                </div>
                <div className={"dept-table-3"}>{post.date}</div>
              </div>
            ) : (
              <div key={i} onClick={() => clickPost(post)}>
                <div className={"dept-each-title dept-table-1"}>
                  {post.is_today && (
                    <span className={"notice-today-icon"}>
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </span>
                  )}
                  <span>{post.title}</span>
                </div>

                <div className={"dept-table-line2"}>
                  <div className={"dept-table-2"}>{post.type}</div>
                  <div className={"dept-table-3"}>{post.date}</div>
                </div>
              </div>
            )
          )}
      </Table>
    </div>
  );
}

export default Dept;
