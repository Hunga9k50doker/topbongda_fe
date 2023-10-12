"use client";
import React from "react";
import { HandCardIcon } from "@/assets/images/icons";
import { useEffectOnce } from "react-use";
import { clearAllCookies } from "@/utils";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

export default function Custom403() {
  useEffectOnce(() => {
    toast.warning("Đăng nhập hết hạn, vui lòng đăng nhập lại");
    clearAllCookies();
  });

  const [countDown, setCountDown] = React.useState<any>(5);
  const intervalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (countDown === 0) {
      window.location.href = "/dang-nhap";
    }
    if (!countDown) return;

    intervalRef.current = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [countDown]);

  return (
    <div className="px-4 mx-auto py-12 min-h-screen">
      <div className="flex flex-col items-center">
        <HandCardIcon />
        <div className="mt-6 font-bold text-2xl text-center heading-font">
          403!!!
        </div>
        <p className="my-4 text-center">Lỗi xác thực</p>
        <p className="my-4 text-center">
          Bạn sẽ được đưa về trang đăng nhập trong {countDown} giây
        </p>
        <Button href="/"> Về trang chủ</Button>
      </div>
    </div>
  );
}
