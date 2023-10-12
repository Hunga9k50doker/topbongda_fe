import React from "react";
import { Form } from "antd";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Button, Typography, Box, Divider } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_PUBLIC_KEY } from "@/constants";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";

interface TabPanelProps {
  children?: React.ReactNode;
  captcha?: string;
  title: string;
  isLoginForm: boolean;
  showForm: boolean;
  handleAuth: (values: any) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAuth = ({
  isLoginForm = true,
  title,
  captcha,
  setShowForm,
  handleAuth,
}: TabPanelProps) => {
  const { googleSignIn, facebookSignIn } = UserAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSignInGoogle = () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInFacebok = () => {
    try {
      facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <Typography className="mb-4 text-xs">
        Tên tài khoản có phân biệt HOA-thường, cẩn thận khi bật bộ gõ tiếng
        Việt.
      </Typography>
      <Form
        name={`form-${title}`}
        onFinish={handleAuth}
        initialValues={{
          username: "",
          ...(isLoginForm
            ? { password: "" }
            : {
                email: "",
                password1: "",
                password2: "",
              }),
          captcha: "",
        }}
      >
        {!isLoginForm && (
          <Form.Item
            className="mb-4"
            name="email"
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc.",
              },
            ]}
          >
            <TextField
              label="Email đang sử dụng"
              fullWidth
              type="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Form.Item>
        )}
        <Form.Item
          className="mb-4"
          name="username"
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc.",
            },
          ]}
        >
          <TextField
            label={`Tên tài khoản ${isLoginForm ? "hoặc email" : ""}`}
            fullWidth
          />
        </Form.Item>

        <Form.Item
          className="mb-4"
          name={isLoginForm ? "password" : "password_1"}
          rules={[
            {
              required: true,
              message: "Trường này là bắt buộc.",
            },
          ]}
        >
          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              ),
            }}
          />
        </Form.Item>

        {!isLoginForm && (
          <Form.Item
            className="mb-4"
            name={"password_2"}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc.",
              },
            ]}
          >
            <TextField
              label="Xác nhận mật khẩu"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Form.Item>
        )}
        <div className="mb-4">
          <Form.Item
            name="captcha"
            style={{ transform: "scale(0.8) translateX(-20px)" }}
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc.",
              },
            ]}
          >
            {/* @ts-ignore */}
            <ReCAPTCHA sitekey={RECAPTCHA_PUBLIC_KEY} hl="vi" ref={captcha} />
          </Form.Item>
        </div>
        <Box className="flex items-center justify-between gap-4 mb-4">
          <Button
            LinkComponent={Link}
            size="small"
            href="/tai-khoan/phuc-hoi-tai-khoan/"
            variant="text"
          >
            Quên mật khẩu?
          </Button>
          <Button
            size="small"
            variant="contained"
            className="bg-primary"
            type="submit"
            onClick={() => setShowForm(false)}
          >
            {title}
          </Button>
        </Box>
      </Form>
      <Divider />
      <Box className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleSignInGoogle}
        >
          <GoogleIcon />
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleSignInFacebok}
        >
          <FacebookIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(FormAuth);
