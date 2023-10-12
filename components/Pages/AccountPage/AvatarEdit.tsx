import React, { useCallback } from "react";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Form, Upload } from "antd";
import { getBase64, getMediaURL } from "@/utils";
import { DEFAULT_AVATAR } from "@/constants";
import { uploadAvatarAPI } from "@/apis/user_apis";
import { toast } from "react-toastify";
import { Card, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import ClearIcon from "@mui/icons-material/Clear";
import ImgCrop from "antd-img-crop";
import ModalDelete from "@/components/Modal/ModalDelete";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { useTheme } from "@mui/material/styles";
import ModalPreview from "@/components/Modal/ModalPreview";

const { Dragger } = Upload;
const MAX_FILE_SIZE = 5;

function AvatarEdit() {
  const theme: any = useTheme();
  const [form] = Form.useForm();
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const { updateModal } = React.useContext(ModalContext);
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleUpload = React.useCallback(() => {
    const formData = new window.FormData();
    formData.append("file", fileList[0]);
    store.dispatch(updateLoading(true));

    uploadAvatarAPI(formData)
      .then((r) => {
        if (r.data.ok) {
          setFileList([]);
          toast.success("Tải lên thành công!");
          window.location.href = `?t=${Date.now()}`;
        } else {
          toast.warning(r.data.msg);
        }
      })
      .catch(() => {
        toast.error("Tải lên không thành công!");
        store.dispatch(updateLoading(false));
      })
      .finally(() => {
        setTimeout(() => {
          store.dispatch(updateLoading(false));
        }, 5000);
      });
  }, [fileList]);

  const handleRemove = useCallback(() => {
    store.dispatch(updateLoading(true));
    const formData = new window.FormData();
    formData.append("remove", "yes");
    uploadAvatarAPI(formData)
      .then((r) => {
        if (r.data.ok) {
          setFileList([]);
          toast.success("Xóa avatar thành công!");
          window.location.href = `?t=${Date.now()}`;
        } else {
          toast.error(r.data.msg);
        }
      })
      .catch(() => {
        toast.error("Tải lên không thành công!");
        store.dispatch(updateLoading(false));
      })
      .finally(() => {
        setTimeout(() => {
          store.dispatch(updateLoading(false));
        }, 5000);
      });
  }, []);

  const uploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setImageUrl("");
    },

    beforeUpload: (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      if (!isJpgOrPng) {
        toast.error("Chỉ chấp nhận định dạng JPG/PNG.");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 <= MAX_FILE_SIZE;
      if (!isLt2M) {
        toast.error(`File ảnh tải lên quá lớn (tối đa ${MAX_FILE_SIZE}MB)`);
        return false;
      }
      getBase64(file, (imageUrl) => {
        setImageUrl(imageUrl);
      });
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handlePreview = (url: string) => {
    updateModal(url, <ModalPreview imageUrl={url} />);
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-primary font-bold heading-font" id="id_avatar">
          Ảnh đại diện
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Ảnh tải lên có dung lượng không quá 5MB.
        </p>

        <Form
          className="mb-4 flex-1"
          name="form-upload-avatar"
          form={form}
          onFinish={handleUpload}
          autoComplete="off"
          initialValues={{
            file: "",
          }}
        >
          <Stack>
            <Form.Item name="file">
              <ImgCrop
                modalClassName="modal-crop"
                modalProps={{
                  style: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    paddingBottom: 0,
                  },
                  bodyStyle: {
                    color: theme.palette.text.primary,
                  },
                  okButtonProps: {
                    className: "btn-primary",
                  },
                  cancelButtonProps: {
                    className: "btn-ghost",
                  },
                }}
                minZoom={0.5}
                maxZoom={2}
                rotationSlider
                quality={1}
                aspect={1 / 1}
                modalTitle="Cắt ảnh"
                modalWidth={"100%"}
                modalCancel="Hủy bỏ"
                modalOk="Tiếp tục"
                /* @ts-ignore */
                cropperProps={{
                  cropSize: {
                    width: 240,
                    height: 240,
                  },
                }}
              >
                <Dragger {...uploadProps}>
                  <button type="button" className="btnSelectFile text-gray-400">
                    <UploadIcon sx={{ width: 32, height: 32 }} />
                    <em>Nhấp chọn ảnh (PNG/JPG) hoặc kéo thả vào khung này.</em>
                  </button>
                </Dragger>
              </ImgCrop>
            </Form.Item>

            <div className="flex space-x-4 mt-6 justify-center">
              <div className="w-[120px] flex flex-col rounded outline outline-1 outline-gray-200 outline-offset-2">
                <Image
                  onClick={() =>
                    handlePreview(
                      getMediaURL(imageUrl || userStore.avatarSet.og) ||
                        DEFAULT_AVATAR
                    )
                  }
                  src={getMediaURL(userStore.avatarSet.og) || DEFAULT_AVATAR}
                  alt=""
                  width={120}
                  height={120}
                  className="rounded-t"
                />
                <div className="bg-black text-white text-center text-xs py-1 rounded-b">
                  Avatar hiện hành
                </div>
              </div>
              {imageUrl && (
                <>
                  <div className="flex items-center  text-gray-400 justify-center">
                    <ArrowRightAltIcon sx={{ width: 48, height: 48 }} />
                  </div>
                  <div className="w-[120px] flex flex-col rounded outline outline-1 outline-gray-200 outline-offset-2 justify-center">
                    <Image
                      src={imageUrl || DEFAULT_AVATAR}
                      alt=""
                      width={120}
                      height={120}
                    />
                    <div className="bg-black text-white text-center text-xs py-1 rounded-b">
                      Avatar mới
                    </div>
                  </div>
                </>
              )}
            </div>
            <Stack
              sx={{ mt: 2 }}
              gap={1}
              direction={"row"}
              justifyContent={"space-between"}
            >
              {userStore.avatarSet.og && (
                <Button
                  onClick={() =>
                    updateModal(
                      imageUrl,
                      <ModalDelete handleEvent={handleRemove} />
                    )
                  }
                  startIcon={<ClearIcon />}
                  size="small"
                  variant="contained"
                  className="bg-red-500 hover:bg-red-700 text-sm"
                >
                  Xóa ảnh đại diện
                </Button>
              )}
              <Button
                startIcon={<CheckIcon />}
                size="small"
                type="submit"
                variant="contained"
                className="bg-primary hover:bg-success text-sm"
                disabled={fileList.length === 0}
              >
                Tiến Hành Tải Lên
              </Button>
            </Stack>
          </Stack>
        </Form>
      </CardContent>
    </Card>
  );
}

export default React.memo(AvatarEdit);
