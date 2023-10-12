"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Form } from "antd";
import dynamic from "next/dynamic";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCategoriesOptionsAPI, postForumAPI } from "@/apis/forum_apis";
import { Button, Typography } from "@mui/material";
import { useLocalStorage } from "react-use";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import NewTopicTermsSidebar from "@/components/Pages/CreatePostPage/NewTopicTermsSidebar";
import { RootState, store } from "@/store";
import WrapTitle from "@/components/common/WrapTitle";
import { TopicDetailModel } from "@/models/topic_model";
import Skeleton from "@mui/material/Skeleton";
import {
  FORUM_API_CATEGORIES_SELECT,
  FORUM_API_CREATE_NEW_TOPIC,
  FORUM_API_EDIT_TOPIC,
} from "@/configs/endpoints/forum_endpoints";
import useSWR from "swr";
import { updateLoading } from "@/reducers/loadingSlice";
import CompetitionSelect from "@/components/common/CompetitionSelect";
import TeamSelect from "@/components/Pages/CreatePostPage/TeamSelect";

const Editor = dynamic(
  () => import("@/components/Pages/CreatePostPage/Editor"),
  {
    ssr: false,
    loading: () => (
      <div className="my-2">
        <Skeleton variant="rectangular" width={"100%"} height={300} />
      </div>
    ),
  }
);

interface CreateNewTopicProps {
  isEdit?: boolean;
  topicDetail?: TopicDetailModel;
}

function CreateNewTopic({ isEdit = false, topicDetail }: CreateNewTopicProps) {
  const [form] = Form.useForm();
  const [showRelatedInfo, setShowRelatedInfo] = React.useState(isEdit);
  const [categories, setCategories] = React.useState<any>([]);
  const [showNotice, setShowNotice] = React.useState(false);
  const [stoVal, setStoVal, removeStoVal] = useLocalStorage<any>(
    "tbd-new-topic-save",
    ""
  );
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const router = useRouter();
  const cat: any = useSearchParams().get("cat");

  const selectedTeams = React.useMemo(
    () =>
      topicDetail &&
      topicDetail.teams.map((item: any) => ({
        code: item.code,
        icon: item.icon,
        name: item.name,
      })),
    [topicDetail]
  );

  React.useEffect(() => {
    if (isEdit && topicDetail) {
      return form.setFieldsValue({
        content: topicDetail.contentSafe,
        category: topicDetail.category?.id,
        title: topicDetail.title,
        competitions: topicDetail.competitions,
        teams: selectedTeams,
      });
    }
    return form.setFieldsValue({
      content: stoVal?.content || "",
      category: stoVal?.category || cat || "",
      title: stoVal?.title || "",
      competitions: stoVal?.competitions || [],
      teams: stoVal?.teams || [],
    });
  }, [isEdit, topicDetail]);

  const handleFinish = (values: any) => {
    store.dispatch(updateLoading(true));
    const p = {
      ...values,
      ...(isEdit && { codeSlug: topicDetail?.code }),
    };
    postForumAPI(isEdit ? FORUM_API_EDIT_TOPIC : FORUM_API_CREATE_NEW_TOPIC, p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          removeStoVal();
          window.location.href = d.redirectUrl;
          isEdit
            ? toast.success("Cập nhật thành công!")
            : toast.success("Đăng bài thành công!");
        } else {
          toast.warning(d.msg);
        }
      })
      .catch((e) => {
        toast.error("Đã có lỗi xảy ra!");
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      })
      .finally(() => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  };

  useSWR(
    FORUM_API_CATEGORIES_SELECT,
    () => {
      getCategoriesOptionsAPI().then((r) => {
        setCategories(r.data);
        if (cat) {
          if (r.data.find((i: any) => i.id === parseInt(cat))) {
            form.setFieldValue("category", cat);
          }
        }
        return r.data;
      });
    },
    { revalidateOnFocus: false }
  );

  const handleValuesChange = debounce((changed, values) => {
    setStoVal(values);
  }, 500);

  const handleRemoveStorage = () => {
    removeStoVal();
    form.resetFields();
    setShowNotice(false);
  };

  React.useEffect(() => {
    setShowNotice(!!stoVal?.content);
  }, []);

  const handleCancel = () => {
    removeStoVal();
    router.back();
  };

  return (
    <div className="pb-12">
      <h1>
        <WrapTitle
          title="Đăng bài viết mới lên diễn đàn"
          className="text-primary font-bold heading-font"
        />
      </h1>

      <Card>
        <CardContent sx={{ px: 1 }}>
          {showNotice && !isEdit && (
            <Typography className="mb-4 text-xs">
              <span className="text-yellow-500">
                Tìm thấy dữ liệu của bạn đã lưu trong trình duyệt này trước đó.
              </span>
              <button onClick={handleRemoveStorage} className="link ml-2">
                Xóa?
              </button>
            </Typography>
          )}

          <Form
            name="form-add-new-topic"
            form={form}
            onFinish={handleFinish}
            onValuesChange={handleValuesChange}
            initialValues={initialValues}
          >
            <Form.Item name="title">
              <TextField
                autoFocus
                inputProps={{ maxLength: 500 }}
                label="Tiêu đề bài viết (không bắt buộc)"
                fullWidth
              />
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Trường này là bắt buộc." }]}
            >
              <Editor />
            </Form.Item>
            {categories.length > 0 && (
              <FormControl fullWidth tw="mb-4">
                <InputLabel>Chuyên mục</InputLabel>
                <Form.Item
                  name="category"
                  rules={[
                    { required: true, message: "Trường này là bắt buộc." },
                  ]}
                >
                  <Select label="Chuyên mục" fullWidth>
                    {categories.map((cat: any) => (
                      <MenuItem value={cat.id} key={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Item>
              </FormControl>
            )}
            <div className="mb-2 text-gray-400">
              <FormControlLabel
                control={<Checkbox />}
                label="Chọn đội bóng, giải đấu liên quan đến nội dung, giúp bài viết lan tỏa tốt hơn"
                checked={Boolean(
                  showRelatedInfo ||
                    stoVal?.competitions?.length ||
                    stoVal?.teams?.length
                )}
                onChange={(event, checked) => setShowRelatedInfo(checked)}
              />
            </div>
            {Boolean(
              showRelatedInfo ||
                stoVal?.competitions?.length ||
                stoVal?.teams?.length
            ) && (
              <>
                <Form.Item name="competitions">
                  <CompetitionSelect />
                </Form.Item>
                <Form.Item name="teams">
                  <TeamSelect />
                </Form.Item>
                <Typography className="mt-4 text-xs text-gray-400">
                  (*) Bạn có thể nhập từ khóa để tìm kiếm đội bóng, giải đấu.
                  Mặc định là những đội bóng, giải đấu được đề cử.
                </Typography>
              </>
            )}
            <div className="mt-4 flex space-x-2 items-center justify-between">
              <Button
                onClick={handleCancel}
                variant="text"
                className="text-initial"
              >
                Hủy bỏ
              </Button>
              <Button type="submit" variant="outlined" className="btn-primary">
                {isEdit ? "Cập nhật" : "Tạo Bài Viết Ngay"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      <Card className="mb-4">
        {!userStore.isAuth && (
          <CardContent>
            <p className="italic text-center">
              Bạn phải đăng nhập để tạo bài viết.
            </p>
          </CardContent>
        )}
      </Card>
      <NewTopicTermsSidebar />
    </div>
  );
}

export default CreateNewTopic;

const initialValues = {
  content: "",
  category: "",
  title: "",
  competitions: "",
  teams: "",
};
