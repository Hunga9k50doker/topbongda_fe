"use client";
import React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { BRAND_NAME } from "@/constants";
import { useEffectOnce } from "react-use";

interface OutLinkDetailProps {
  code: string;
  outlink: any;
}

function OutLinkDetail({ code, outlink, ...props }: OutLinkDetailProps) {
  const [countDown, setCountDown] = React.useState<any>(null);
  const intervalRef = React.useRef<any>(null);
  const timeoutRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (countDown === 0) {
      setCountDown(null);
    }
    if (!countDown) return;
    intervalRef.current = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [countDown]);

  useEffectOnce(() => {
    if (outlink.isWarning) {
      return;
    }
    if (outlink.canTrust) {
      handleGoNow();
      return;
    }
    if (outlink.countdownSeconds > -1) {
      timeoutRef.current = setTimeout(() => {
        handleGoNow();
      }, outlink.countdownSeconds * 1000);
      setCountDown(outlink.countdownSeconds);
    }
  });

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      clearInterval(timeoutRef.current);
      setCountDown(null);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleGoNow = () => {
    window.location.href = outlink.originUrl;
  };

  const isCountDown = countDown && countDown > 0;

  return (
    <div>
      <Card className="w-full max-w-[640px]">
        <CardContent>
          {outlink.isWarning && (
            <div className="alert alert-warning mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  Tên miền <b>{outlink.domain}</b> có thể chứa liên kết nguy
                  hiểm, hãy cẩn trọng với thông tin của bạn!
                </span>
              </div>
            </div>
          )}

          {outlink.message?.length > 0 && (
            <div className="alert alert-info mb-4">
              <div>{outlink.message}</div>
            </div>
          )}

          {isCountDown && (
            <div className="mt-2">
              <CircularProgress
                aria-busy={isCountDown}
                aria-describedby="loading-progress"
                color="primary"
                size={24}
              />
            </div>
          )}
          <h1 className="text-xl">Đang chuyển trang đến liên kết...</h1>
          <div className="text-xs">
            <b>Liên kết đích:</b>{" "}
            <code className="text-error">{outlink.originUrl}</code>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <label className="btn btn-primary" onClick={handleGoNow}>
              Chuyển ngay lập tức
            </label>
            {isCountDown && (
              <>
                <label className="btn btn-ghost" onClick={handleStop}>
                  Dừng chuyển
                </label>
                <label className="px-4 text-primary">{countDown} giây</label>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-[640px] mt-4">
        <ul className="space-y-2 text-sm">
          <li>
            <button onClick={handleBack} className="link">
              Trở lại trang trước
            </button>
          </li>
          <li>
            <a href="/" className="link">
              Trang chủ {BRAND_NAME}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OutLinkDetail;
