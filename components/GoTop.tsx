import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollToTop from "react-scroll-to-top";

function GoTop() {
  return (
    <ScrollToTop
      smooth
      component={<KeyboardArrowUpIcon width={24} height={24} color="primary" />}
      style={{
        borderRadius: 2,
        right: 10,
        bottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      className="
          !rounded-lg !bg-base-100 !shadow w-10 h-10 inline-flex justify-center items-center
          border-0 fixed right-0 bottom-0 mr-2 mb-2
          active:bg-gray-200 active:bg-opacity-20 active:text-blue-500"
    />
  );
}

export default GoTop;
