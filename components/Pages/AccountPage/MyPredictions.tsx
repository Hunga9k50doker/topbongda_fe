import React from "react";
import { useSelector } from "react-redux";
import { Box, Skeleton } from "@mui/material";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import useSWR from "swr";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RowCollapsePrediction from "@/components/common/RowCollapsePrediction";
import Paper from "@mui/material/Paper";
import WrapTitle from "@/components/common/WrapTitle";
import NoData from "@/components/common/NoData";
import { getPredictionListAPI } from "@/apis/prediction_apis";
import { PREDICTION_API_PREDICTIONS_LIST } from "@/configs/endpoints/prediction_endpoints";
import { updatePredictionInfo } from "@/reducers/matchSlice";
import dynamic from "next/dynamic";
import { Select } from "antd";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";

const MyPredictionsChart = dynamic(
  () => import("@/components/Pages/AccountPage/MyPredictionsChart"),
  {
    loading: () => (
      <Skeleton
        className="m-auto"
        variant="circular"
        height={200}
        width={200}
      />
    ),
  }
);

function MyPredictions({}) {
  const { predictionInfo } = useSelector(
    (state: RootState) => state.matchStore
  );
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const [params, setParams] = React.useState({
    user_code: userStore.code,
    detail: "yes",
    status: "",
    type: "",
  });

  const router = useRouter();

  useSWR(
    PREDICTION_API_PREDICTIONS_LIST,
    () => {
      if (!Boolean(predictionInfo.items.length)) {
        getPredictionList(params);
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getPredictionList = React.useCallback((prs: any) => {
    store.dispatch(updateLoading(true));
    getPredictionListAPI(prs)
      .then((r) => {
        if (r.data) {
          store.dispatch(updatePredictionInfo(r.data));
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
          return r.data.data;
        }
      })
      .catch((e) => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  }, []);

  const handleFilter = (value: string, type: string) => {
    getPredictionList({
      ...params,
      [type]: value,
    });
    setParams({
      ...params,
      [type]: value,
    });
  };

  const handleChangePage = (e: any, page1: number) => {
    getPredictionList({
      ...params,
      page: page1,
    });
  };

  return (
    <Box>
      <WrapTitle title="Thống kê">
        <Select
          defaultValue={""}
          onChange={(value: string) => handleFilter(value, "type")}
          options={[
            { value: "", label: "Tất cả(mặc định)" },
            { value: "G", label: "Dự đoán tỉ số" },
            { value: "R", label: "Dựa đoán kết quả" },
          ]}
        />
      </WrapTitle>
      <MyPredictionsChart type={params.type} />

      <WrapTitle title="Lịch sử dự đoán">
        <Select
          defaultValue={""}
          onChange={(value: string) => handleFilter(value, "status")}
          options={[
            { value: "", label: "Tất cả(mặc định)" },
            { value: "C", label: "Dự đoán chính xác" },
            { value: "I", label: "Dựa đoán chưa chính xác" },
            { value: "P", label: "Chưa có kết quả" },
          ]}
        />
      </WrapTitle>
      {predictionInfo.items.length === 0 && (
        <NoData title="Chưa có thông tin dự đoán" />
      )}
      {predictionInfo.items.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Dự đoán</TableCell>
                <TableCell align="center">Kết quả</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  Chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictionInfo.items.map((item: any, key: number) => (
                <RowCollapsePrediction
                  key={key}
                  data={item}
                  matchDetail={item.match}
                  viewMySelf={true}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {predictionInfo.numPages > 1 && (
        <Pagination
          count={predictionInfo.numPages}
          page={predictionInfo.current}
          color="primary"
          onChange={handleChangePage}
          className="mt-4 flex justify-center"
        />
      )}
    </Box>
  );
}

export default React.memo(MyPredictions);
