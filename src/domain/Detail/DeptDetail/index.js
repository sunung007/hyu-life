import "../style.css";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";

import Loading from "../../Loading";
import {loadDeptDetail} from "../../../hooks/loadData";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

function DeptDetail() {
  const history = useHistory();
  const location = useLocation();
  const [post, setPost] = useState();
  const [detail, setDetail] = useState();

  const goBack = () => {
    history.go(-1);
  };
  const goOutLink = () => {
    if (post.hasOwnProperty("link")) window.open(post.link);
    else {
      window.alert("외부 링크가 없습니다.");
    }
  };

  useEffect(() => {
    const tmpPost = location.state?.post;
    if (tmpPost === undefined) {
      history.push("/error?msg=" + encodeURI("잘못된 학부 게시글입니다."));
    } else {
      setPost(tmpPost);
      loadDeptDetail(tmpPost.link)
        .then((r) => setDetail(r))
        .catch((e) => {
          console.error(e);
          history.push(
            "/error?msg=" +
              encodeURI("학부 게시글 상세내용 읽기에 실패하였습니다.")
          );
        });
    }
  }, [history, location.state?.post]);

  return (
    <div className={"container detail"}>
      <div className={"detail-title"}>
        <div className={"back-to-prev"} onClick={goBack}>
          <span>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          <span> 이전 페이지</span>
        </div>

        <h2 className={"body-title"}>
          <span>DEPARTMENT : {post?.title}</span>
          <span className={"detail-external-link"} onClick={goOutLink}>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </span>
        </h2>
        <h4>
          <span>게시일 : {post?.date}</span>
        </h4>
      </div>

      <br />

      {detail ? (
        <div
          className={"detail-post"}
          dangerouslySetInnerHTML={{__html: detail}}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default DeptDetail;
