import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <div class="body">
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
