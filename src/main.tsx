import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ToastContainer />
    <App />
  </ThemeProvider>
);
