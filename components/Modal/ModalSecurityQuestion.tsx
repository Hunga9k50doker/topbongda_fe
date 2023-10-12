import * as React from "react";
import { Drawer } from "antd";
import { Button, Form, Input, Radio, Space, Skeleton, List } from "antd";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import {
  answerSecurityQuestionsAPI,
  getSecurityQuestionsAPI,
} from "@/apis/user_apis";
import { toast } from "react-toastify";
import useSWR from "swr";
import { USER_API_GET_SECURITY_QUESTIONS } from "@/configs/endpoints/user_endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ModalSecurityQuestionProps {}

export default React.memo(
  function ModalSecurityQuestion({}: ModalSecurityQuestionProps) {
    const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
    const { data: userStore } = useSelector(
      (state: RootState) => state.userStore
    );
    const [questions, setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const { isLoading: loadingData } = useSWR(
      USER_API_GET_SECURITY_QUESTIONS,
      () => {
        getSecurityQuestionsAPI()
          .then((r) => {
            setQuestions(r.data.data);

            return r.data.data;
          })
          .catch((error) => {});
      },
      {
        revalidateOnFocus: false,
      }
    );

    const onFinish = (values: any) => {
      setIsLoading(true);
      answerSecurityQuestionsAPI(values)
        .then((r) => {
          if (r.data.ok) {
            toast.success(r.data.msg);
            handleCloseModal();
          } else {
            toast.warning(r.data.msg);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.msg);
          setIsLoading(false);
        });
    };
    return (
      <Drawer
        title="Câu hỏi bảo mật"
        onClose={handleCloseModal}
        open={isOpenModal}
        bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
        placement="bottom"
        zIndex={10000}
        // size="large"
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Chọn câu hỏi bảo mật"
            name="question_code"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Skeleton
                  loading={loadingData}
                  active
                  paragraph={{ rows: 3 }}
                  style={{ width: 300 }}
                />
                {Boolean(questions.length) &&
                  questions.map((item: any, index: number) => (
                    <Radio value={item.code} key={index}>
                      {item.questionText}
                    </Radio>
                  ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Câu trả lời"
            name="answer_text"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
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
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Drawer>
    );
  }
);

const data = [
  {
    title: "1. Câu hỏi bảo mật là gì?",
    description:
      "Được xem như một phương thức lấy lại mật khẩu trong trường hợp bạn quên mật khẩu.",
  },
  {
    title: "2. Tạo câu hỏi bảo mật như thế nào?",
    description:
      "Bạn phải chọn một câu hỏi bất kì và trả lời nó. Câu trả lời của bạn sẽ được mã hóa trong trường hợp sau này bạn muốn lấy lại mật khẩu. Để ý các ký tự đặc biệt, khoảng trắng,...khi bạn trả lời.",
  },
  {
    title: "3. Cập nhật câu hỏi?",
    description:
      "Bạn có thể thay đổi câu trả sau khi cập nhật. Tuy nhiên, bạn sẽ không thể thay đổi câu hỏi.",
  },
];
