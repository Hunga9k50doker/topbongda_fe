"use client";
import React from "react";
import { setCookies } from "@/utils";
import { toast } from "react-toastify";
import { postUsersAPI } from "@/apis/user_apis";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FormAuth from "@/components/Pages/AccountPage/FormAuth";
import { useDispatch } from "react-redux";
import { useEffectOnce, useLocalStorage } from "react-use";
import { UserModel } from "@/models/user_model";
import userSlice from "@/reducers/userSlice";
import { updateLoading } from "@/reducers/loadingSlice";
import {
  USER_API_REGISTER,
  USER_API_LOGIN,
} from "@/configs/endpoints/user_endpoints";
import { TabPanel } from "@mui/lab";
interface AuthFormProps {
  userData?: UserModel;
  isRedirect?: boolean;
  callBack?: Function;
}

function AuthForm({ userData, isRedirect = false, callBack }: AuthFormProps) {
  const [value, setValue] = React.useState("0");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [stoVal, , removeStoval] = useLocalStorage<any>("url-search", "/");
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const captchaLogin: any = React.useRef();
  const captchaRegister: any = React.useRef();

  useEffectOnce(() => {
    if (userData) dispatch(userSlice.actions.updateUser(userData));
  });
  const handleLogin = React.useCallback((values: any) => {
    dispatch(updateLoading(true));
    const d = {
      ...values,
    };
    postUsersAPI(USER_API_LOGIN, d)
      .then((r) => {
        if (r.data.ok) {
          setCookies("jwt", r.data.access);
          setCookies("refresh", r.data.refresh);
          toast.success(
            `Đăng nhập thành công, chào mừng bạn đến với topbongda!`
          );
          if (isRedirect) {
            window.location.href = stoVal;
          } else {
            window.location.reload();
          }
        } else {
          toast.warning(r.data.msg);
          captchaLogin?.current?.reset();
        }
      })
      .catch(() => {
        dispatch(updateLoading(false));
        toast.error("Đăng nhập thất bại");
      })
      .finally(() => {
        callBack && callBack();
        dispatch(updateLoading(false));
        removeStoval();
      });
  }, []);

  const handleRegister = React.useCallback((values: any) => {
    if (values.password1 !== values.password2) {
      toast.error("2 lần nhập mật khẩu không giống nhau!");
      return;
    }
    dispatch(updateLoading(true));
    postUsersAPI(USER_API_REGISTER, values)
      .then((r) => {
        if (r.data.ok) {
          setCookies("jwt", r.data.access);
          setCookies("refresh", r.data.refresh);
          toast.success(`Đăng ký thành công, chào mừng bạn đến với topbongda!`);
          if (isRedirect) {
            window.location.href = stoVal;
          } else {
            window.location.reload();
          }
        } else {
          toast.warning(r.data.msg);
          captchaRegister?.current?.reset();
        }
      })
      .catch(() => {
        toast.error("Đăng ký thất bại");
      })
      .finally(() => {
        callBack && callBack();
        dispatch(updateLoading(false));
        removeStoval();
      });
  }, []);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          centered
          aria-label="lab API tabs example"
          sx={{ justifyContent: "center" }}
        >
          <Tab label="Đăng nhập" value="0" />
          <Tab label="Đăng ký" value="1" />
        </TabList>
      </Box>
      <TabPanel value="0">
        <FormAuth
          isLoginForm={true}
          showForm={showLoginForm}
          setShowForm={setShowLoginForm}
          handleAuth={handleLogin}
          title="Đăng nhập"
        />
      </TabPanel>
      <TabPanel value="1">
        <FormAuth
          isLoginForm={false}
          showForm={showRegisterForm}
          setShowForm={setShowRegisterForm}
          handleAuth={handleRegister}
          title="Đăng ký"
        />
      </TabPanel>
    </TabContext>
  );
}

export default AuthForm;
