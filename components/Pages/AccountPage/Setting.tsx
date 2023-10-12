import React from "react";
import { logoutAPI, verifyEmailAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { clearAllCookies, deleteCookies } from "@/utils";
import { resetUser } from "@/reducers/userSlice";
import { RootState, store } from "@/store";
import ModalChangePassword from "@/components/Modal/ModalChangePassword";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalSecurityQuestion from "@/components/Modal/ModalSecurityQuestion";
import { useSelector } from "react-redux";
import ModalVerifyEmail from "@/components/Modal/ModalVerifyEmail";
import { updateLoading } from "@/reducers/loadingSlice";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SyncLockOutlinedIcon from "@mui/icons-material/SyncLockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { removeFirebaseNotification } from "@/firebase";
import ModalNotification from "@/components/Modal/ModalNotification";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

interface SettingsProps {}

function Settings({}: SettingsProps) {
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const { updateModal } = React.useContext(ModalContext);
  const [showConfirmLogout, setShowConfirmLogout] = React.useState(false);
  const [countDown, setCountDown] = React.useState(NaN);
  const [loadingLogout, setLoadingLogout] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    setLoadingLogout(true);
    logoutAPI()
      .then((r) => {
        if (r.data) {
          store.dispatch(resetUser());
          toast.success("Đăng xuất thành công!");
          removeFirebaseNotification();
          clearAllCookies();
          localStorage.removeItem("url-search");
          window.location.href = `/`;
        } else {
          toast.error("Có lỗi xảy ra, hãy tải lại trang và thử lại!");
          setLoadingLogout(false);
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra, hãy tải lại trang và thử lại!");
        setLoadingLogout(false);
      })
      .finally(() => {
        setTimeout(() => setLoadingLogout(false), 5000);
      });
  }, []);

  const handleShowLogout = () => {
    setShowConfirmLogout(true);
    setTimeout(() => {
      setShowConfirmLogout(false);
    }, 10000);
    setCountDown(10);
  };

  const onChangePassword = () => {
    updateModal(`modal-change-password`, <ModalChangePassword />);
  };

  const onSecurityQuestion = () => {
    updateModal(`modal-change-security-question`, <ModalSecurityQuestion />);
  };

  const onNotifycation = () => {
    updateModal(`modal-change-setting-notification`, <ModalNotification />);
  };

  const onVerifyEmail = () => {
    store.dispatch(updateLoading(true));
    verifyEmailAPI()
      .then((r) => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        toast.success(r.data.msg);
        updateModal(`modal-verify-email`, <ModalVerifyEmail />);
      })
      .catch((err) => {
        toast.error(err.msg);
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  };

  React.useEffect(() => {
    if (countDown === 0) {
      setCountDown(NaN);
    }

    if (!countDown) return;

    const intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDown]);

  return (
    <Stack justifyContent={"center"} sx={{ mx: 2 }} gap={2}>
      {!userStore.isVerifiedEmail && (
        <Button
          startIcon={<VerifiedUserOutlinedIcon />}
          variant="outlined"
          color="success"
          onClick={onVerifyEmail}
        >
          Xác thực email
        </Button>
      )}
      <Button
        startIcon={<NotificationsActiveOutlinedIcon />}
        variant="outlined"
        color="success"
        onClick={onNotifycation}
      >
        Cập nhật thông báo
      </Button>
      <Button
        startIcon={<HelpOutlineOutlinedIcon />}
        variant="outlined"
        color="success"
        onClick={onSecurityQuestion}
      >
        Câu hỏi bảo mật
      </Button>
      <Button
        startIcon={<SyncLockOutlinedIcon />}
        variant="outlined"
        color="success"
        onClick={onChangePassword}
      >
        Thay đổi mật khẩu
      </Button>
      {showConfirmLogout ? (
        <>
          {loadingLogout ? (
            <LoadingButton variant="outlined" loading>
              Xác nhận thoát tài khoản? ({countDown})
            </LoadingButton>
          ) : (
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Xác nhận thoát tài khoản? ({countDown})
            </Button>
          )}
        </>
      ) : (
        <Button
          startIcon={<LoginOutlinedIcon />}
          variant="outlined"
          color="error"
          onClick={handleShowLogout}
        >
          Thoát tài khoản
        </Button>
      )}
    </Stack>
  );
}

export default React.memo(Settings);
