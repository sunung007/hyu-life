import "./style.css";

import {useEffect, useState} from "react";
import {ELEMENT_NUM} from "../../common";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

function Table({
  id,
  className = "",
  style,
  children,
  curShowLength,
  curRange,
  setCurRange,
  showArrows = true,
}) {
  const [leftShow, setLeftShow] = useState(true);
  const [rightShow, setRightShow] = useState(true);
  const [touch, setTouch] = useState();
  const [moveDist, setMoveDist] = useState(0);

  const changeToLeftList = () => {
    let tmpLeft = curRange[0] - ELEMENT_NUM;
    if (tmpLeft < 0) tmpLeft = 0;

    let tmpRight = tmpLeft + ELEMENT_NUM;
    if (tmpRight > curShowLength) tmpRight = curShowLength;

    setCurRange([tmpLeft, tmpRight]);
  };
  const changeToRightList = () => {
    let tmpLeft = curRange[1];
    let tmpRight = tmpLeft + ELEMENT_NUM;

    if (tmpRight > curShowLength) tmpRight = curShowLength;
    if (tmpLeft >= curShowLength) [tmpLeft, tmpRight] = curRange;

    setCurRange([tmpLeft, tmpRight]);
  };

  const touchStart = (e) => {
    const {clientX, clientY} = e.changedTouches[0];
    setTouch([clientX, clientY]);
  };
  const touchEnd = (e) => {
    const {clientX, clientY} = e.changedTouches[0];
    const diffY = touch[1] - clientY;
    const diffX = touch[0] - clientX;

    setMoveDist(0);
    if (diffY < 100 && diffY > -100) {
      if (diffX > 100) {
        changeToRightList(curShowLength, curRange, setCurRange);
      } else if (diffX < -100) {
        changeToLeftList(curShowLength, curRange, setCurRange);
      }
    }
  };
  const touchMove = (e) => {
    const {clientX} = e.changedTouches[0];
    const diff = clientX - touch[0];

    if (diff < -20 || diff > 20) {
      let MAX_DIFF = [-200, 200];
      if (curRange[0] === 0) {
        MAX_DIFF[1] = 50;
      } else if (curRange[1] === curShowLength) {
        MAX_DIFF[0] = -50;
      }

      if (diff > MAX_DIFF[0] && diff < MAX_DIFF[1]) {
        setMoveDist(diff);
      }
    }
  };

  useEffect(() => {
    if (showArrows) {
      if (curShowLength === 0) {
        setLeftShow(false);
        setRightShow(false);
      } else {
        if (curRange[0] === 0) setLeftShow(false);
        else setLeftShow(true);

        if (curRange[1] === curShowLength) setRightShow(false);
        else setRightShow(true);
      }
    }
  }, [curRange, curShowLength, showArrows]);

  return (
    <div style={style} className={"table-wrapper"}>
      {/* 표 */}
      <div
        id={id}
        className={`table ${className}`}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onTouchMove={touchMove}
        style={{marginLeft: `${moveDist}px`}}
      >
        {children}
      </div>

      {/* 내용 전환 화살표 */}
      {showArrows && (
        <div className={"background-arrows only-web"}>
          <span
            className={`background-arrows-arrow ${!leftShow && "no-visible"}`}
            onClick={changeToLeftList}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span
            className={`background-arrows-arrow ${!rightShow && "no-visible"}`}
            onClick={changeToRightList}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      )}
    </div>
  );
}

export default Table;
