import "./style.css";
import ReactDOM from "react-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";

function Modal({id, style, className, children, setShow}) {
  const el = document.getElementById("modal");
  const closeModal = () => {
    setShow(false);
    // const child = document.getElementById("modal-child");
    // el.removeChild(child);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY};
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return ReactDOM.createPortal(
    <div id={"modal-child"} className={className} style={style}>
      <>{children}</>
      <div className={"modal-close-btn clickable"} onClick={closeModal}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
    </div>,
    el
  );
}

export default Modal;
