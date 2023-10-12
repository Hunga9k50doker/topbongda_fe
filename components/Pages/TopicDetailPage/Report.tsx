"use client";
import * as React from "react";
import { Form, Space } from "antd";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { postForumAPI } from "@/apis/forum_apis";
import { FORUM_API_REPORT } from "@/configs/endpoints/forum_endpoints";
import { useRouter } from "next/navigation";
import { TopicDetailModel } from "@/models/topic_model";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
interface ReportPageContentProps {
  data: TopicDetailModel;
}

const optionsReport = [
  { value: "GD", label: "Gợi dục" },
  { value: "BL", label: "Bạo lực" },
  { value: "QR", label: "Quấy rối" },
  { value: "TTSST", label: "Thông tin sai sự thật" },
  { value: "S", label: "Spam" },
  { value: "BHTP", label: "Bán hàng trái phép" },
  { value: "NTGTG", label: "Ngôn từ gây thù ghét" },
  { value: "KB", label: "Khủng bố" },
];
const ReportPageContent = ({ data }: ReportPageContentProps) => {
  const id = React.useId();
  const router = useRouter();
  const [isOtherContent, setIsOtherContent] = React.useState(false);
  const [contentReport, setcontentReport] = React.useState<string[]>([]);
  const [form] = Form.useForm();
  const breadcrumbs = [
    {
      label: data.title || `Bài viết #${data.code}`,
      href: data.url,
    },
    {
      label: "Báo cáo vi phạm",
    },
  ];
  const params = React.useMemo(() => {
    return {
      topic_code: data.code,
      content: contentReport,
    };
  }, []);

  const handleFinish = (e: React.SyntheticEvent) => {
    e.preventDefault();
    postForumAPI(FORUM_API_REPORT, {
      ...params,
      content: JSON.stringify(contentReport),
      content_other: form.getFieldValue("content_other") || "",
    })
      .then(() => {
        onClose();
        toast.success("Gửi báo cáo thành công!");
      })
      .catch(() => {
        onClose();
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      })
      .finally(() => {
        router.push(`/bai-viet/${data.code}`);
      });
  };

  const handleChange = (e: any) => {
    if (e.target.value === "VDK") {
      setIsOtherContent(e.target.checked);
    } else {
      if (!contentReport.includes(e.target.value)) {
        contentReport.push(e.target.value);
      } else {
        contentReport.splice(contentReport.indexOf(e.target.value), 1);
      }
    }
  };

  const onClose = () => {
    router.back();
  };

  return (
    <Box>
      <BreadCrumbCustom data={breadcrumbs} />
      <DialogTitle id={id} className="text-lg">
        Form báo cáo vi phạm của bài viết {data.getTitle}
      </DialogTitle>
      <DialogContent>
        <Form
          name={`${id}-form-report-user`}
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Trường này là bắt buộc." }]}
          >
            <FormGroup>
              {optionsReport.map((item) => (
                <FormControlLabel
                  onChange={handleChange}
                  key={item.value}
                  control={<Checkbox />}
                  label={item.label}
                  value={item.value}
                  className="text-gray-400"
                />
              ))}
              <FormControlLabel
                onChange={handleChange}
                control={<Checkbox />}
                label={"Thông tin thêm"}
                value={"VDK"}
                className="text-gray-400"
              />
            </FormGroup>
          </Form.Item>
          {isOtherContent && (
            <>
              <Form.Item name="content_other">
                <TextField
                  className=""
                  label="Mô tả chi tiết..."
                  multiline
                  minRows={3}
                  fullWidth
                />
              </Form.Item>
            </>
          )}
          <Space className="w-full justify-between">
            <Button
              size="small"
              className="border-none text-gray-400"
              onClick={onClose}
            >
              Bỏ Qua & Trở Lại
            </Button>
            <Button size="small" type="submit" className="btn-primary">
              Gửi Báo Cáo
            </Button>
          </Space>
        </Form>
      </DialogContent>
    </Box>
  );
};

export default React.memo(ReportPageContent);
