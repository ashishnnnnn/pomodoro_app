import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserTodoProvider } from "./Context/useUserTodo";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <UserTodoProvider>
      <Router>
        <App />
      </Router>
    </UserTodoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
