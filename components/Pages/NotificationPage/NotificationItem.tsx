import React from "react";
import { DEFAULT_AVATAR } from "@/constants";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import { markReadNotificationsAPI } from "@/apis/user_apis";
import HTMLReactParser from "html-react-parser";
import classnames from "classnames";
import { getFromNowShort, getMediaURL } from "@/utils";
import { useRouter } from "next/navigation";
import { RootState, store } from "@/store";
import { updateUser } from "@/reducers/userSlice";
import TimeAgoShort from "@/components/TimeAgoShort";

export default function NotificationItem({ item, ...props }: { item: any }) {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const noContent = "<em>[không có nội dung]</em>";
  const [item2, setItem2] = React.useState(item);
  const router = useRouter();
  const handleClick = () => {
    if (item2.unread) {
      markReadNotificationsAPI({ id: item2.id }).then((r) => {
        store.dispatch(
          updateUser({
            ...userStore,
            numUnreadNotifications: userStore.numUnreadNotifications - 1,
          })
        );
        setItem2({
          ...item2,
          unread: false,
        });
        if (item2.targetUrl) {
          router.push(item2.targetUrl);
        }
      });
    }
    router.push(item2.targetUrl);
  };
  return (
    <div className="notification-item mb-2">
      <div
        onClick={handleClick}
        className={classnames(
          "cursor-pointer flex items-center mb-2 rounded-lg",
          {
            "active:bg-gray-400/40 hover:bg-gray-400/10 cursor-pointer":
              !!item2.targetUrl,
          }
        )}
      >
        <Avatar
          imgProps={{ loading: "lazy" }}
          src={getMediaURL(item2.agentAvatarUrl) || DEFAULT_AVATAR}
          title={item2.agentUsername}
        />
        <div className="ml-2 ">
          <div
            className={classnames({
              "font-bold":
                item2.unread &&
                !Boolean(userStore.numUnreadNotifications === 0),
              "text-gray-400":
                !item2.unread ||
                Boolean(userStore.numUnreadNotifications === 0),
            })}
          >
            {HTMLReactParser(item2.content || noContent)}
          </div>
          <div className="text-xs text-gray-400">
            <TimeAgoShort datetimeStr={item2.createdAt} />
          </div>
        </div>
        <span className="grow" />
        {!!item2.targetUrl && (
          <IconButton aria-label="button">
            <ArrowForwardIcon />
          </IconButton>
        )}
      </div>
      <Divider />
    </div>
  );
}
