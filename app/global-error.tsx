"use client";
import React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Button, Stack } from "@mui/material";
import { HandCardIcon } from "@/assets/images/icons";
import ModalReportSystem from "@/components/Modal/ModalReportSystem";

export default function GlobalError() {
  const { updateModal } = React.useContext(ModalContext);
  const onReport = () => {
    updateModal("modal-report-page", <ModalReportSystem />);
  };

  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="container min-h-screen px-4 mx-auto py-12">
          <div className="flex flex-col items-center">
            <div>
              <HandCardIcon />
            </div>
            <div className="mt-6 font-bold text-2xl text-center heading-font">
              500!!!
            </div>
            <p className="mt-4 text-center">
              Vui lòng thử lại sau hoặc báo cáo với quản trị viên!
            </p>
            <Stack direction={"row"} gap={2}>
              <Button className="mt-4" variant="outlined" href="/">
                Thử lại
              </Button>
              <Button onClick={onReport} className="mt-4" variant="outlined">
                Báo cáo với chúng tôi
              </Button>
            </Stack>
          </div>
        </div>
      </body>
    </html>
  );
}
