import React from "react";
import { useSelector } from "react-redux";
import WrapTitle from "@/components/common/WrapTitle";
import { Box, Skeleton, Typography } from "@mui/material";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import { toast } from "react-toastify";
import useSWR from "swr";
import { getHistoryAccumulationAPI } from "@/apis/user_apis";
import { USER_API_GET_RECENT_ACTIVITY } from "@/configs/endpoints/user_endpoints";
import NoData from "@/components/common/NoData";
import Pagination from "@mui/material/Pagination";
import { HistoryAccumulationModel } from "@/models/user_model";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dynamic from "next/dynamic";
import { formatDate } from "@/utils";
const LineChart = dynamic(
  () => import("@/components/Pages/AccountPage/LineChart"),
  {
    loading: () => (
      <Skeleton
        className="m-auto"
        variant="rectangular"
        height={200}
        width={"auto"}
      />
    ),
  }
);
interface MyAccumulationProps {}

// const ITEMS_PER_PAGE = 10;

function MyAccumulation({}: MyAccumulationProps) {
  const { loading } = useSelector((state: RootState) => state.loadingStore);
  const [historyAccumulation, setHistoryAccumulation] =
    React.useState<HistoryAccumulationModel>({
      total: 0,
      numPages: 0,
      current: 1,
      hasNext: false,
      hasPrevious: false,
      data: [],
    });

  useSWR(
    `${USER_API_GET_RECENT_ACTIVITY}?page=${historyAccumulation.current}`,
    () => {
      return getRecentActivity({
        page: historyAccumulation.current,
      });
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getRecentActivity = React.useCallback(
    (prams?: any) => {
      store.dispatch(updateLoading(true));
      getHistoryAccumulationAPI({
        ...prams,
      })
        .then((r) => {
          setHistoryAccumulation(r.data);
          return r.data;
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        })
        .finally(() => {
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        });
    },
    [historyAccumulation]
  );

  const handleChangePage = (e: any, page: number) => {
    setHistoryAccumulation((prevState) => ({
      ...prevState,
      current: page,
    }));
  };

  return (
    <Box>
      <WrapTitle title="Lịch sử tích lũy" />
      {historyAccumulation.data.length === 0 && !loading && (
        <NoData title="Chưa có dữ liệu" />
      )}
      {<LineChart data={historyAccumulation.data} />}
      {historyAccumulation.numPages > 1 && (
        <Pagination
          count={historyAccumulation.numPages}
          page={historyAccumulation.current}
          color="primary"
          onChange={handleChangePage}
          className="my-4 flex justify-center"
        />
      )}
      <WrapTitle title="Thông tin chi tiết" />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {historyAccumulation.data.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.desc}
              secondary={formatDate(item.createdAt)}
            />
            <Typography color={item.exp > 0 ? "primary" : "error"}>
              {item.exp} exp
            </Typography>
          </ListItem>
        ))}
      </List>
      {historyAccumulation.numPages > 1 && (
        <Pagination
          count={historyAccumulation.numPages}
          page={historyAccumulation.current}
          color="primary"
          onChange={handleChangePage}
          className="mt-4 flex justify-center"
        />
      )}
    </Box>
  );
}

export default React.memo(MyAccumulation);
