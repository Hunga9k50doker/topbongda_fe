import * as React from "react";
import { Form, Space } from "antd";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { postForumAPI } from "@/apis/forum_apis";
import { FORUM_API_REPORT_ERROR_SYSTEM } from "@/configs/endpoints/forum_endpoints";
import { useSearchParams } from "next/navigation";
import { clearAllCookies } from "@/utils";

const ModalReportSystem = () => {
  const search = useSearchParams();
  const id = React.useId();
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);
  const [form] = Form.useForm();
  const params = React.useMemo(
    () => ({
      url_web: search.get("path") || window.location.href,
      content: "",
    }),
    []
  );

  const handleFinish = () => {
    postForumAPI(FORUM_API_REPORT_ERROR_SYSTEM, {
      ...params,
      content: form.getFieldValue("content_other") || "",
    })
      .then(() => {
        handleCloseModal();
        toast.success("Gửi báo cáo thành công!");
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        clearAllCookies();
        localStorage.clear();
        window.location.replace("/");
      })
      .finally(() => {
        clearAllCookies();
        localStorage.clear();
        window.location.replace("/");
      });
  };

  return (
    <Dialog
      fullWidth
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby={id}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={id} className="text-sm">
        Hãy cho chúng tôi biết vấn đề bạn đang gặp phải! Chúng tôi sẽ xử lý nó
        trong thời gian sớm nhất.
      </DialogTitle>
      <DialogContent>
        <Form
          name={`${id}-form-report-system`}
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item name="content_other">
            <TextField
              className=""
              label="Mô tả chi tiết..."
              multiline
              minRows={3}
              fullWidth
            />
          </Form.Item>
          <Space className="w-full justify-between">
            <Button
              size="small"
              className="border-none text-gray-400"
              onClick={handleCloseModal}
            >
              Bỏ Qua & Trở Lại
            </Button>
            <Button size="small" type="submit" className="btn-primary">
              Gửi Báo Cáo
            </Button>
          </Space>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ModalReportSystem);
