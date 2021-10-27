import axios from "axios";
import {BACK_URL} from "../common";

export const loadLMS = () => {
  const localCookies = localStorage.getItem("lms_cookies");
  const [lid, lpw] = [
    localStorage.getItem("lid") || undefined,
    localStorage.getItem("lpw") || undefined,
  ];

  if (lid === undefined || lpw === undefined) {
    return Promise.reject({
      data: {error: "입력된 아이디/패스워드가 없습니다."},
    });
  }

  if (localCookies !== undefined) {
    const cookies = JSON.parse(localCookies) || {};

    if (cookies.hasOwnProperty("token") && cookies.hasOwnProperty("cookie")) {
      console.log("쿠키를 이용하여 로그인을 시도합니다.");
      return axios({
        method: "post",
        url: BACK_URL + "/lms",
        data: {
          cookie: cookies.cookie,
          token: cookies.token,
          uid: lid,
          upw: lpw,
        },
      }).then((r) => {
        if (r.data.hasOwnProperty("error")) throw r;
        console.log("LMS data fetch 성공");
        return r.data;
      });
    }
  }

  console.log("새로 로그인을 시도합니다.");
  return axios({
    method: "post",
    url: BACK_URL + "/lms/login",
    data: {
      uid: lid,
      upw: lpw,
    },
  }).then((r) => {
    if (r.data.hasOwnProperty("error")) throw r;
    console.log("LMS data fetch 성공");
    return r.data;
  });
};

export const loadPortal = () => {
  return axios.get(BACK_URL + "/portal").then((r) => {
    if (r.data.hasOwnProperty("error")) throw r;
    console.log("Portal data fetch 성공");
    return r.data;
  });
};

export const loadPortalDetail = (url) => {
  return axios
    .get(BACK_URL + "/portal/detail?url=" + encodeURI(url))
    .then((r) => {
      if (r.data.hasOwnProperty("error")) throw r;
      console.log("Portal detail 로드 성공!");
      return r.data;
    });
};

export const loadDept = () => {
  return axios.get(BACK_URL + "/dept").then((r) => {
    if (r.data.hasOwnProperty("error")) throw r;
    console.log("Department(CSE) data fetch 성공");
    return r.data;
  });
};

export const loadDeptDetail = (url) => {
  return axios
    .get(BACK_URL + "/dept/detail?url=" + encodeURI(url))
    .then((r) => {
      if (r.data.hasOwnProperty("error")) throw r;
      console.log("Department detail 로드 성공!");
      return r.data;
    });
};
