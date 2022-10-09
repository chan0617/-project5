import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { UploadOutlined } from "@ant-design/icons";
import MainPage from "./components/MainPage";
import ProductPage from "./components/ProductPage";
import UploadPage from "./components/UploadPage";
import { Button } from "antd";

const App = () => {
  let navigate = useNavigate();

  return (
    <>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" alt="logo" />
          </Link>
          <Button
            size="large"
            icon={<UploadOutlined />}
            onClick={() => {
              navigate("/upload");
            }}
          >
            작품업로드
          </Button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <div id="footer">
        <Link to={"/about"}>회사소개</Link>
        <Link to={"/policy"}>이용약관</Link>
        <Link to={"/sales"}>통신판매업:123-1234</Link>
        <Link to={"/license"}>
          ©️2022 KIM CHAN MI_Wanna ALL RIGHTS RESERVED.
        </Link>
      </div>
    </>
  );
};
export default App;
