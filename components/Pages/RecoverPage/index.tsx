"use client";
import React from "react";
import { FACEBOOK_PAGE_SUPPORT } from "@/constants";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import ModalRecoverBySecurityQuestion from "@/components/Modal/ModalRecoverBySecurityQuestion";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalRecoverByEmail from "@/components/Modal/ModalRecoverByEmail";

function RecoverAccount() {
  const { updateModal } = React.useContext(ModalContext);

  const onRecoverBySecurityQuestion = () => {
    updateModal(
      `modal-recover-by-security-question`,
      <ModalRecoverBySecurityQuestion />
    );
  };

  const onRecoverByEmail = () => {
    updateModal(`modal-recover-by-email`, <ModalRecoverByEmail />);
  };

  return (
    <div className="container mx-auto">
      <Card className="max-w-[640px] mx-auto">
        <CardContent>
          <h1 className="heading-font text-2xl">
            Hướng dẫn phục hồi tài khoản
          </h1>

          <p>
            Chúng tôi cung cấp các giải pháp sau để bạn nhanh chóng truy cập
            được tài khoản của mình:
          </p>

          <ol className="list-decimal pl-6 mt-4">
            <li className="my-4">
              Nếu bạn quên tên tài khoản hoặc mật khẩu, chúng tôi sẽ gửi thông
              tin về email bạn đã xác thực.
              <br />
              <Button
                size="small"
                variant="outlined"
                onClick={onRecoverByEmail}
              >
                Sử dụng email
              </Button>
            </li>
            <li className="my-4">
              Nếu bạn chưa xác thực email.Bạn có thể sử dụng câu hỏi bảo mật.
              <br />
              <Button
                size="small"
                variant="outlined"
                onClick={onRecoverBySecurityQuestion}
              >
                Sử dụng câu hỏi bảo mật
              </Button>
            </li>

            <li>
              Nếu bạn quên luôn cả email lẫn câu hỏi bảo mật, bạn phải liên hệ
              trực tiếp với QTV thông qua Facebook:{" "}
              <a
                href={FACEBOOK_PAGE_SUPPORT}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {FACEBOOK_PAGE_SUPPORT}
              </a>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecoverAccount;
