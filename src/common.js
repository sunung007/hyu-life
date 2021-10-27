if (localStorage.getItem("element_num") === null) {
  localStorage.setItem("element_num", 5);
}
export const ELEMENT_NUM = parseInt(localStorage.getItem("element_num"));

export const DATA_LIMIT_TIME = 1000 * 60 * 10;
export const DAY = 1000 * 60 * 60 * 24;

export const D_DAY = ["오늘", "내일", "모레"];

export const CLASS_TYPE = {
  movie: "수업",
  file: "파일",
  assignment: "과제",
  video_conference: "줌",
};
export const DEPT_NOTICE_TYPE = {
  notice: "공지",
  normal: "학부",
  graduate: "졸프",
  student: "학생",
};

export const EXTERNAL_LINK = [
  {
    name: "LMS",
    link: "https://learning.hanyang.ac.kr",
  },
  {
    name: "포탈",
    link: "https://portal.hanyang.ac.kr",
  },
  {
    name: "하이웹",
    link: "https://hywep.hanyang.ac.kr/studentMain/dashBoard.do",
  },
  {
    name: "컴퓨터소프트웨어학부",
    link: "https://cs.hanyang.ac.kr",
  },
];

export const BACK_URL = `http://121.134.138.163:5000/api`;
// export const BACK_URL = `${window.location.hostname}:5000/api`;
// export const BACK_URL = "http://localhost:5000/api";
