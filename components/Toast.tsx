import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const Toast = ({
  theme = "light",
}: {
  theme: "light" | "dark" | "colored";
}) => (
  <ToastContainer
    theme={theme}
    autoClose={1000}
    style={{
      zIndex: 999999,
    }}
  />
);

export default Toast;
