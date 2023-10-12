"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Divider, Box, Button } from "@mui/material";
import {
  getNotificationsListAPI,
  markReadNotificationsAPI,
} from "@/apis/user_apis";
import { useRouter } from "next/navigation";
import { RootState, store } from "@/store";
import { updateUser } from "@/reducers/userSlice";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import NotificationItem from "@/components/Pages/NotificationPage/NotificationItem";

interface PageDataProps {
  current: number;
  hasNext: boolean;
}

interface NotificationsProps {
  notifications: any;
}

function Notifications({ notifications }: NotificationsProps) {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const router = useRouter();
  const [items, setItems] = React.useState<any[]>(notifications.items);
  const [pageData, setPageData] = React.useState<PageDataProps>(notifications);
  const [loadingMarkRead, setLoadingMarkRead] = React.useState(false);

  const handleLoadMore = React.useCallback(() => {
    getNotificationsListAPI({ page: pageData.current + 1 })
      .then((r) => {
        setItems([...items, ...r.data.items]);
        setPageData(r.data);
      })
      .catch(() => null);
  }, [pageData, items]);

  const markReadAll = React.useCallback(() => {
    setLoadingMarkRead(true);
    markReadNotificationsAPI()
      .then((r) => {
        if (r.data.num > 0) {
          store.dispatch(
            updateUser({ ...userStore, numUnreadNotifications: 0 })
          );
          router.push(`/thong-bao/?t=${Date.now()}`);
        } else {
          setLoadingMarkRead(false);
        }
      })
      .finally(() => {
        setTimeout(() => setLoadingMarkRead(false), 5000);
      });
  }, []);

  return (
    <Box className="container mx-auto px-2 pt-4 pb-12">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold text-primary uppercase text-xs">
          Thông báo chưa đọc ({userStore.numUnreadNotifications})
        </h1>
        <div>
          {userStore.numUnreadNotifications === 0 ? (
            <Button
              size="small"
              sx={{ fontSize: "12px" }}
              disabled
              variant="outlined"
            >
              Đã đọc hết
            </Button>
          ) : (
            <Button
              disabled={loadingMarkRead}
              size="small"
              sx={{ fontSize: "12px" }}
              variant="outlined"
              onClick={markReadAll}
            >
              Đánh đấu tất cả đã đọc
            </Button>
          )}
        </div>
      </div>
      <Divider sx={{ mb: 1 }} />
      {items.map((item: any) => (
        <NotificationItem key={item.id} item={item} />
      ))}
      {pageData.hasNext && (
        <LoadMoreButton loadMore={handleLoadMore} title="Tải thêm thông báo" />
      )}
    </Box>
  );
}

export default Notifications;
