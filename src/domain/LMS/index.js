import "./style.css";
import {useState} from "react";
import {useEffect} from "react";
import {DATA_LIMIT_TIME, D_DAY} from "../../common";
import {parseLmsToArr} from "../../hooks/parseLms";
import Table from "../../component/Table/index";
import {loadLMS} from "../../hooks/loadData";
import {useHistory} from "react-router-dom";
import Loading from "../Loading/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Hr from "../../component/Hr/index";

function LMS() {
  const history = useHistory();
  const [lms, setLms] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchLMS = (now) => {
    setIsLoading(true);

    loadLMS()
      .then((r) => {
        if (r === undefined || r.hasOwnProperty("error")) throw r;

        const tmpLms = r.info.map((c) => ({
          id: c.id,
          name: c.name,
          sections: c.sections.map((section) => ({
            id: section.section_id,
            name: section.title,
            subsections: section.subsections.map((subsection) => ({
              id: subsection.subsection_id,
              name: subsection.title,
              units: subsection.units,
            })),
          })),
        }));

        if (typeof tmpLms === "object") {
          localStorage.setItem(
            "lms_data",
            JSON.stringify({data: tmpLms, time: now})
          );
        }

        const cookies = r?.logs;
        if (cookies !== undefined && cookies.hasOwnProperty("token")) {
          localStorage.setItem("lms_cookies", JSON.stringify(cookies));
        }

        setIsLoading(false);
        setLms({data: parseLmsToArr(tmpLms), time: now});
      })
      .catch((e) => {
        console.error(e);
        history.push(`/error?msg=${e.data?.error || "다시 시도해 주세요."}`);
      });
  };

  useEffect(() => {
    const localLog = JSON.parse(localStorage.getItem("lms_data")) || {};
    const now = Date.now();

    if (
      (localLog?.time || 0) - now > DATA_LIMIT_TIME ||
      !localLog.hasOwnProperty("data")
    ) {
      // 다시 로드
      fetchLMS(now);
    } else {
      const localLms = localLog?.data || [];
      const tmpLms = parseLmsToArr(localLms);

      console.log(tmpLms);
      setLms({time: now, data: tmpLms});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"lms container"}>
      {/* 타이틀 */}
      <div className={"body-title"}>
        <h2>HYU LMS</h2>

        {/* 새로고침 버튼 */}
        {isLoading ? (
          <span className={"on-loading"}>
            <FontAwesomeIcon icon={faSpinner} />
          </span>
        ) : (
          <span className={"refresh-btn"} onClick={fetchLMS}>
            <FontAwesomeIcon icon={faRedoAlt} />
          </span>
        )}
      </div>

      {/* 수업 리스트 */}
      {isLoading ? (
        <Loading />
      ) : (
        lms.hasOwnProperty("data") &&
        lms?.data.map((c, ci) => (
          <div key={ci}>
            <h2 className={"dark-blue-text"}>{c.name}</h2>

            <Table className={"lms-table"} showArrows={false}>
              <div className={"only-web no-pointer lms-group1"}>
                <div className={"lms-group1-item"}>주차</div>

                <div className={"lms-group2"}>
                  <div className={"lms-group3"}>
                    <div className={"lms-group3-item"}>차시</div>

                    <div className={"lms-group4"}>
                      <div className={"lms-each-row"}>
                        <div className={"lms-table-1"}>구분</div>
                        <div className={"lms-table-2"}>제목</div>
                        <div className={"lms-table-3"}>마감</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {c.class.map((section, si) => (
                <div className={"lms-group1"} key={si}>
                  {/* 주차 이름 */}
                  <div className={"lms-group1-item"}>{section.section}</div>

                  <div className={"lms-group2"}>
                    {section.class.map((subsection, ssi) => (
                      <div className={"lms-group3"}>
                        {/* 주차의 차시 이름 */}
                        <div className={"lms-group3-item only-web"}>
                          {subsection.subsection}차시
                        </div>

                        {/* 주차별 수업 목록 */}
                        <div className={"lms-group4"}>
                          {subsection.class.map((entry, ei) => (
                            <div
                              key={ei}
                              className={`lms-each-row
                          ${
                            entry.due.length === 1 &&
                            entry.due[0] !== "-" &&
                            entry.due[0] !== "완료" &&
                            (entry.due[0] <= "D-3" ||
                            D_DAY.includes(entry.due[0])
                              ? "due-red"
                              : "due-blue")
                          }`}
                              onClick={() => window.open(entry.link)}
                            >
                              <div className={"lms-table-1"}>{entry.type}</div>
                              <div className={"lms-table-2 lms-table-title"}>
                                {entry.title}
                              </div>
                              <div className={"lms-table-3"}>
                                {entry.due.length === 2 ? (
                                  <>
                                    <span>{entry.due[0]}</span>{" "}
                                    <span className={"due-gray"}>
                                      {entry.due[1]}
                                    </span>
                                  </>
                                ) : (
                                  <>{entry.due[0]}</>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Table>

            <Hr />
          </div>
        ))
      )}
    </div>
  );
}

export default LMS;
