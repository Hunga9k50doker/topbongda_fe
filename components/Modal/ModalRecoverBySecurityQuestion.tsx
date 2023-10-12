import * as React from "react";
import { Drawer } from "antd";
import { Button, Form, Input, Radio } from "antd";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import {
  getSecurityQuestionsAPI,
  recoverBySecurityQuestionsAPI,
} from "@/apis/user_apis";
import { toast } from "react-toastify";
import { ListItemText } from "@mui/material";

interface QuestionProps {
  code: string;
  createdAt: string;
  questionText: string;
}

interface ModalRecoverBySecurityQuestionProps {}

export default React.memo(
  function ModalRecoverBySecurityQuestion({}: ModalRecoverBySecurityQuestionProps) {
    const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
    const [form] = Form.useForm();
    const [questions, setQuestions] = React.useState<QuestionProps>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRecover, setIsRecover] = React.useState(false);
    const [linkRecover, setLinkRecover] = React.useState();

    const onFinish = (values: any) => {
      setIsLoading(true);
      if (isRecover) {
        recoverBySecurityQuestionsAPI(values)
          .then((r) => {
            if (r.data.ok) {
              setLinkRecover(r.data.recoverLink);
            } else {
              toast.warning(r.data.msg);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error(error.msg);
            setIsLoading(false);
          })
          .finally(() => {});
      } else {
        getSecurityQuestionsAPI(values)
          .then((r) => {
            setQuestions(r.data.data);
            setIsRecover(true);
            setIsLoading(false);
            return r.data.data;
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }
    };

    return (
      <Drawer
        title="Khôi phục tài khoản"
        onClose={handleCloseModal}
        open={isOpenModal}
        bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
        placement="bottom"
        zIndex={10000}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input readOnly={Boolean(questions)} />
          </Form.Item>
          {questions && (
            <>
              <Form.Item
                label="Câu hỏi bảo mật"
                name="question_code"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
                initialValue={questions.code}
              >
                <Radio defaultChecked={true} value={questions.code}>
                  {questions.questionText}
                </Radio>
              </Form.Item>
              <Form.Item
                label="Câu trả lời"
                name="answer_text"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "green" }}
            >
              Gửi
            </Button>
          </Form.Item>
        </Form>
        {linkRecover && (
          <ListItemText
            primary="Truy cập đường dẫn để thay đỏi mật khẩu!"
            secondary={
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
                href={linkRecover}
              >
                {linkRecover}
              </a>
            }
          />
        )}
      </Drawer>
    );
  }
);
