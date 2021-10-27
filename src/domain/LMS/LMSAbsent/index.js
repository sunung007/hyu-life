import "./style.css";
import "../style.css";
import {useEffect, useState} from "react";

import RoundBtn from "../../../component/RoundBtn";
import Table from "../../../component/Table";

import {parseAbsentLms, sortClass, sortDueDate} from "../../../hooks/parseLms";
import {ELEMENT_NUM, CLASS_TYPE, D_DAY} from "../../../common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faSpinner} from "@fortawesome/free-solid-svg-icons";

function LMSAbsent({lms, state, isMobile, onRefresh}) {
  const [absent, setAbsent] = useState([]);
  const [curShow, setCurShow] = useState([]);
  const [curRange, setCurRange] = useState([0, 0]);
  const [curSort, setCurSort] = useState(0);
  const [curFilter, setCurFilter] = useState({
    all: true,
    movie: true,
    file: true,
    assignment: true,
    video_conference: true,
  });

  const changeSort = (filter) => {
    let tmp = [...absent];
    tmp.sort(filter === 0 ? sortDueDate : sortClass);
    setCurShow(tmp);
    setCurSort(filter);
    setCurRange([0, tmp.length > ELEMENT_NUM ? ELEMENT_NUM : tmp.length]);
  };
  const changeFilter = (e) => {
    const target = e.target.id.substring(9);
    let tmpFilter = {...curFilter};
    tmpFilter[target] = !tmpFilter[target];

    if (target === "all") {
      setCurFilter({
        all: tmpFilter.all,
        movie: tmpFilter.all,
        file: tmpFilter.all,
        assignment: tmpFilter.all,
        video_conference: tmpFilter.all,
      });

      if (tmpFilter.all) {
        let tmpShow = [...absent];
        tmpShow.sort(curSort === 0 ? sortDueDate : sortClass);
        setCurShow(tmpShow);
      } else setCurShow([]);
    } else {
      let tmpShow = [];
      if (
        !tmpFilter.movie &&
        !tmpFilter.assignment &&
        !tmpFilter.file &&
        !tmpFilter.video_conference
      )
        tmpFilter.all = false;
      for (let filter in tmpFilter)
        if (tmpFilter[filter])
          tmpShow = tmpShow.concat(
            absent.filter((a) => a.type === CLASS_TYPE[filter])
          );
      if (tmpShow.length > 0)
        tmpShow = tmpShow.sort(curSort === 0 ? sortDueDate : sortClass);
      setCurShow(tmpShow);
      setCurFilter(tmpFilter);
    }
  };

  useEffect(() => {
    const tmpAbsent = parseAbsentLms(lms);
    tmpAbsent.sort(sortDueDate);

    setAbsent(tmpAbsent);
    setCurShow(tmpAbsent);
    setCurRange([
      0,
      tmpAbsent.length > ELEMENT_NUM ? ELEMENT_NUM : tmpAbsent.length,
    ]);
  }, [lms]);

  return (
    <div className={"lms-absent"}>
      {/* 타이틀 */}
      <div className={"body-title"}>
        <h2>LMS</h2>

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

      {/* 버튼들 */}
      <div className={"buttons-wrapper"}>
        {/* 필터 버튼들 */}
        <div className={"buttons"}>
          <RoundBtn
            id={"home-lms-all"}
            className={curFilter.all ? "btn-checked" : ""}
            onClick={changeFilter}
          >
            전체
          </RoundBtn>
          <RoundBtn
            id={"home-lms-movie"}
            className={curFilter.movie ? "btn-checked" : ""}
            onClick={changeFilter}
          >
            수업
          </RoundBtn>
          <RoundBtn
            id={"home-lms-file"}
            className={curFilter.file ? "btn-checked" : ""}
            onClick={changeFilter}
          >
            파일
          </RoundBtn>
          <RoundBtn
            id={"home-lms-assignment"}
            className={curFilter.assignment ? "btn-checked" : ""}
            onClick={changeFilter}
          >
            과제
          </RoundBtn>
          <RoundBtn
            id={"home-lms-video_conference"}
            className={curFilter.video_conference ? "btn-checked" : ""}
            onClick={changeFilter}
          >
            줌
          </RoundBtn>
        </div>

        {/* 정렬 버튼들 */}
        <div className={"buttons"}>
          <RoundBtn
            className={curSort === 0 ? "btn-checked" : ""}
            onClick={() => changeSort(0)}
          >
            마감순
          </RoundBtn>
          <RoundBtn
            className={curSort === 1 ? "btn-checked" : ""}
            onClick={() => changeSort(1)}
          >
            수업순
          </RoundBtn>
        </div>
      </div>

      {/* 수업 리스트 */}
      <Table
        className={"lms-table"}
        curRange={curRange}
        setCurRange={setCurRange}
        curShowLength={curShow.length}
      >
        <div className={"only-web"}>
          <div className={"lms-table-1"}>구분</div>
          <div className={"lms-table-2"}>수업명</div>
          <div className={"lms-table-3"}>주차</div>
          <div className={"lms-table-4"}>제목</div>
          <div className={"lms-table-5"}>마감</div>
        </div>

        {curShow.length > 0 &&
          curShow.slice(curRange[0], curRange[1]).map((e, i) =>
            !isMobile ? (
              <div
                key={i}
                className={
                  e.due.length === 1 && e.due[0] !== "-"
                    ? e.due[0] <= "D-3" || D_DAY.includes(e.due[0])
                      ? "due-red"
                      : "due-blue"
                    : ""
                }
                onClick={() => window.open(e.link)}
              >
                <div className={"lms-table-1"}>{e.type}</div>
                <div className={"lms-table-2"}>{e.cname}</div>
                <div className={"lms-table-3"}>{e.sname}</div>
                <div className={"lms-table-4 lms-table-title"}>{e.title}</div>
                {e.due.length === 2 ? (
                  <div className={"lms-table-5"}>
                    <span>{e.due[0]}</span>{" "}
                    <span className={"due-gray"}>{e.due[1]}</span>
                  </div>
                ) : (
                  <div className={"lms-table-5"}>{e.due[0]}</div>
                )}
              </div>
            ) : (
              <div key={i}>
                <div
                  className={
                    "lms-table-1 lms-table-title " +
                    (e.due.length === 1 && e.due[0] !== "-"
                      ? e.due[0] <= "D-3" || D_DAY.includes(e.due[0])
                        ? "due-red"
                        : "due-blue"
                      : "")
                  }
                >
                  {e.type} &#183; {e.title}
                </div>

                <div className={"lms-table-line2"}>
                  <div className={"lms-table-2"}>
                    {e.cname} {e.sname}
                  </div>
                  <div className={"lms-table-3"}>
                    {e.due.length === 2
                      ? `${e.due[0]} ${e.due[1]}`
                      : `${e.due[0]}`}
                  </div>
                </div>
              </div>
            )
          )}
      </Table>
    </div>
  );
}

export default LMSAbsent;
