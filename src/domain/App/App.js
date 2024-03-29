import "./App.css";

import {useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {BrowserView} from "react-device-detect";

import Header from "./Header";
import Footer from "./Footer";

import Home from "../Home";
import Login from "../Login/index";

import LMS from "../LMS/index";
import PortalDetail from "../Detail/PortalDetail";
import DeptDetail from "../Detail/DeptDetail";

import Loading from "../Loading";
import Error from "../Error";

function App() {
  // 마우스 포인터 따라다니는 머리
  useEffect(() => {
    const mouse = document.getElementById("mouse-cursor");
    document.addEventListener("mousemove", (e) => {
      mouse.style.left = `${e.clientX + 20}px`;
      mouse.style.top = `${e.clientY + 20}px`;
    });
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />

      <Route exact path={"/"} component={Home} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/lms"} component={LMS} />
      <Route exact path={"/portal/detail"} component={PortalDetail} />
      <Route exact path={"/dept/detail"} component={DeptDetail} />

      <Route exact path={"/loading"} component={Loading} />
      <Route path={"/error"} component={Error} />

      <Footer />

      <BrowserView>
        <div id={"mouse-cursor"} />
      </BrowserView>
    </BrowserRouter>
  );
}

export default App;
