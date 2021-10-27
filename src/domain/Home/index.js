import "./style.css";

import LMSAbsent from "../LMS/LMSAbsent";
import Portal from "./Portal";
import Dept from "./Dept";

import Error from "../Error";
import Loading from "../Loading";

import Hr from "../../component/Hr";

import {DATA_LIMIT_TIME, ELEMENT_NUM} from "../../common";
import {loadDept, loadLMS, loadPortal} from "../../hooks/loadData";

import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointLeft} from "@fortawesome/free-solid-svg-icons";
import {parseDate} from "../../hooks/parseDate";

function Home() {
  const history = useHistory();
  const isMobile = window.innerWidth < 600;

  const [cookies, setCookies] = useState();
  const [lms, setLms] = useState({
    state: 0,
    ...JSON.parse(localStorage.getItem("lms_data")),
  });
  const [portal, setPortal] = useState({
    state: 0,
    ...JSON.parse(localStorage.getItem("portal_data")),
  });
  const [dept, setDept] = useState({
    state: 0,
    ...JSON.parse(localStorage.getItem("dept_data")),
  });

  const fetchLMS = (now) => {
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

        setLms({state: 1, data: tmpLms, time: now});
        setCookies(r.logs);
        if (typeof tmpLms === "object") {
          localStorage.setItem(
            "lms_data",
            JSON.stringify({data: tmpLms, time: now})
          );
        }
      })
      .catch((e) => {
        console.error(e);
        setLms({state: 2, error: e.data?.error || "다시 시도해 주세요."});
      });
  };
  const fetchPortal = (now, today) => {
    loadPortal()
      .then((r) => {
        if (r === undefined) return;
        const num = ELEMENT_NUM * 10;
        const bound = r.length > num ? num : r.length;
        const tmpPortal = r.portal.slice(0, bound).map((p) => {
          const [dept, author] = p.author.split("/");
          const date = parseDate(new Date(p.date));

          return {
            title: p.title,
            date: date,
            link: p.link,
            author: author,
            dept: dept.split(" ").slice(2).join(" "),
            is_today: today === date,
          };
        });

        setPortal({state: 1, data: tmpPortal, time: now});
        if (typeof tmpPortal === "object") {
          localStorage.setItem(
            "portal_data",
            JSON.stringify({data: tmpPortal, time: now})
          );
        }
      })
      .catch((e) => {
        console.error(e);
        setPortal({state: 2, error: e.data?.error || "다시 시도해 주세요."});
      });
  };
  const fetchDept = (now, today) => {
    loadDept()
      .then((r) => {
        if (r === undefined) return;
        const tmpDept = [...r.graduate, ...r.normal, ...r.student].map((e) => ({
          ...e,
          is_today: e.date === today,
        }));

        setDept({state: 1, data: tmpDept, time: now});
        if (typeof tmpDept === "object") {
          localStorage.setItem(
            "dept_data",
            JSON.stringify({data: tmpDept, time: now})
          );
        }
      })
      .catch((e) => {
        console.error(e);
        setDept({state: 2, error: e.data?.error || "다시 시도해 주세요."});
      });
  };

  const backToLogin = () => {
    history.push("/login");
  };
  const reloadData = (num) => {
    const now = Date.now();
    const today = parseDate(new Date());

    if (num === 0) {
      setLms({...lms, state: 0});
      fetchLMS(now);
    } else if (num === 1) {
      setPortal({...portal, state: 0});
      fetchPortal(now, today);
    } else if (num === 2) {
      setDept({...dept, state: 0});
      fetchDept(now, today);
    }
  };

  useEffect(() => {
    const now = Date.now();
    const today = parseDate(new Date());

    if (now - parseInt(lms?.time || 0) < DATA_LIMIT_TIME)
      setLms({...lms, state: 1});
    else fetchLMS(now);

    if (now - parseInt(portal?.time || 0) < DATA_LIMIT_TIME)
      setPortal({...portal, state: 1});
    else fetchPortal(now, today);

    if (now - parseInt(dept?.time || 0) < DATA_LIMIT_TIME)
      setDept({...dept, state: 1});
    else fetchDept(now, today);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (cookies !== undefined && cookies.hasOwnProperty("token")) {
      localStorage.setItem("lms_cookies", JSON.stringify(cookies));
    }
  }, [cookies]);

  return (
    <div className={"container home"}>
      {lms.state !== 2 && lms.hasOwnProperty("data") ? (
        <LMSAbsent
          lms={lms.data}
          state={lms.state}
          isMobile={isMobile}
          onRefresh={() => reloadData(0)}
        />
      ) : (
        <div>
          <h2 className={"body-title"}>LMS</h2>
          {lms.state === 2 ? (
            <div>
              <Error errMsg={lms?.error} />
              <div className={"back-to-prev"} onClick={backToLogin}>
                <span>
                  <FontAwesomeIcon icon={faHandPointLeft} />
                </span>
                <span> 로그인 페이지로 돌아가기</span>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}

      <Hr />

      {portal.state !== 2 && portal.hasOwnProperty("data") ? (
        <Portal
          portal={portal.data}
          state={portal.state}
          isMobile={isMobile}
          onRefresh={() => reloadData(1)}
        />
      ) : (
        <div>
          <h2 className={"body-title"}>PORTAL</h2>
          {portal.state === 2 ? <Error errMsg={portal?.error} /> : <Loading />}
        </div>
      )}

      <Hr />

      {dept.state !== 2 && dept.hasOwnProperty("data") ? (
        <Dept
          dept={dept.data}
          state={dept.state}
          isMobile={isMobile}
          onRefresh={() => reloadData(2)}
        />
      ) : (
        <div>
          <h2 className={"body-title"}>DEPARTMENT</h2>
          {dept.state === 2 ? <Error errMsg={dept?.error} /> : <Loading />}
        </div>
      )}
    </div>
  );
}

export default Home;
