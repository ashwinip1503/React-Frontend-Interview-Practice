import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../../TodoList- redux/src/redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {console.log("MAIN FILE RUNNING")}
    <App />
  </Provider>
);