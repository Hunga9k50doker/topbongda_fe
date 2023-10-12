"use client";
import React from "react";
import { HandCardIcon } from "@/assets/images/icons";
import { Button, Stack } from "@mui/material";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalReportSystem from "@/components/Modal/ModalReportSystem";

export default function Custom404({ error }: { error: Error }) {
  const { updateModal } = React.useContext(ModalContext);
  const onReport = () => {
    updateModal("modal-report-page", <ModalReportSystem />);
  };

  return (
    <div className="px-4 mx-auto py-12 min-h-screen">
      <div className="flex flex-col items-center">
        <HandCardIcon />
        <div className="mt-6 font-bold text-2xl text-center heading-font">
          404!!!
        </div>
        <p className="mt-4 text-center">
          Lỗi này xảy ra do một trong những lý do sau:
        </p>
        <ul>
          <li>
            <strong>- Trang không tồn tại</strong>
          </li>
          <li>
            <strong>- Trang đã bị xóa</strong>
          </li>
          <li>
            <strong>- Lỗi dữ liệu </strong>
          </li>
        </ul>
        - Vui lòng kiểm tra lại đường dẫn hoặc trở về trang chủ.
        <br />- Nếu bạn gặp lỗi này nhiều lần, vui lòng báo cáo với chúng tôi.
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
  );
}
