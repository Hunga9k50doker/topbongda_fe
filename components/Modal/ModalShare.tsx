import React from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { buildFullUrl, handleAfterCopy } from "@/utils";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Button, ListItem, ListItemText, Stack } from "@mui/material";
import {
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiFillRedditCircle,
} from "react-icons/ai";
import { BiLogoTelegram } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import { useRouter } from "next/navigation";
import { FORUM_API_CREATE_NEW_TOPIC } from "@/configs/endpoints/forum_endpoints";
import { postForumAPI } from "@/apis/forum_apis";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyToClipboard from "react-copy-to-clipboard";

const ModalShare = ({
  data,
  type = "topic",
}: {
  type?: "topic" | "story";
  data: any; //topic, story
}) => {
  const id = React.useId();
  const router = useRouter();
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const userStore = useSelector((state: RootState) => state.userStore.data);
  if (!data) return null;

  const onShare = () => {
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    store.dispatch(updateLoading(true));
    const p = {
      content: `${data.contentPreview}<br/><p>
      <em>Nguồn bài viết</em>: <a onclick="return false;" style="color: rgb(0, 138, 0);" href=${data.url}>Được viết bởi ${data.user.name}</a>
      </p>`,
      category: data.category?.id,
      title: data.title,
      competitions: data.competitions,
      teams: data.teams,
    };
    postForumAPI(FORUM_API_CREATE_NEW_TOPIC, p)
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          router.push(d.redirectUrl);
          router.refresh();
          toast.success("Chia sẻ bài viết thành công!");
        } else {
          toast.error(d.msg);
        }
      })
      .catch((e) =>
        setTimeout(() => store.dispatch(updateLoading(false)), 1000)
      )
      .finally(() => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  };

  return (
    <Dialog
      fullWidth
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby={id}
    >
      <DialogTitle fontSize={"medium"}>Chia sẻ bài viết</DialogTitle>
      <DialogContent>
        {type === "topic" && (
          <ListItem sx={{ justifyContent: "center" }}>
            <Button
              startIcon={<RepeatOutlinedIcon />}
              onClick={onShare}
              variant="outlined"
              size="small"
            >
              Chia sẻ trong cộng đồng
            </Button>
          </ListItem>
        )}
        {type === "story" && (
          <CopyToClipboard
            text={data.fullUrl || buildFullUrl(data.url)}
            onCopy={() => handleAfterCopy()}
          >
            <ListItem sx={{ justifyContent: "center" }}>
              <Button
                startIcon={<ContentCopyIcon />}
                variant="outlined"
                size="small"
              >
                Sao chép liên kết
              </Button>
            </ListItem>
          </CopyToClipboard>
        )}
        <ListItemText
          className="text-center"
          secondary="Chia sẻ thông qua mạng xã hội"
        />
        <Stack direction="row" sx={{ gap: 1, justifyContent: "center" }}>
          <TwitterShareButton
            url={data.fullUrl || buildFullUrl(data.url)}
            title={data.fullUrl}
          >
            <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: "auto" }}>
              <AiOutlineTwitter />
            </Avatar>
          </TwitterShareButton>
          <FacebookShareButton url={data.fullUrl || buildFullUrl(data.url)}>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: "auto" }}>
              <FaFacebookF />
            </Avatar>
          </FacebookShareButton>
          <TelegramShareButton url={data.fullUrl || buildFullUrl(data.url)}>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: "auto" }}>
              <BiLogoTelegram />
            </Avatar>
          </TelegramShareButton>
          <RedditShareButton url={data.fullUrl || buildFullUrl(data.url)}>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: "auto" }}>
              <AiFillRedditCircle />
            </Avatar>
          </RedditShareButton>
          <WhatsappShareButton url={data.fullUrl || buildFullUrl(data.url)}>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: "auto" }}>
              <AiOutlineWhatsApp />
            </Avatar>
          </WhatsappShareButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ModalShare);
