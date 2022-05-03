import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import deDE from "antd/lib/locale/de_DE";

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={deDE}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  rootElement
);
