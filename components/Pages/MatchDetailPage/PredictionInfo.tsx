import { Box } from "@mui/material";
import React from "react";
import { getPredictionListAPI } from "@/apis/prediction_apis";
import useSWR from "swr";
import { PREDICTION_API_PREDICTIONS_LIST } from "@/configs/endpoints/prediction_endpoints";
import WrapTitle from "@/components/common/WrapTitle";
import { MatchDetailModel } from "@/models/match_model";
import NoData from "@/components/common/NoData";
import { RootState, store } from "@/store";
import RowCollapsePrediction from "@/components/common/RowCollapsePrediction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { CardItemLoader } from "@/loaders";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface PredictionInfoProps {
  matchDetail: MatchDetailModel;
}

const PredictionInfo = ({ matchDetail }: PredictionInfoProps) => {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const [userPrediction, setUserPrediction] = React.useState<any[]>([]);
  const [usersPrediction, setUsersPrediction] = React.useState<any[]>([]);
  const params = React.useMemo(() => {
    return {
      match_code: matchDetail.code,
      page: 1,
      status: "P",
    };
  }, [matchDetail.code]);

  const getPredictionList = React.useCallback(
    (prs: any) =>
      getPredictionListAPI(prs)
        .then((r) => r.data)
        .catch((e) => {}),
    []
  );

  const {
    data: predictionInfo,
    error,
    isLoading,
  } = useSWR(PREDICTION_API_PREDICTIONS_LIST, () => getPredictionList(params), {
    revalidateOnFocus: false,
  });

  React.useEffect(() => {
    let userPre: any = [],
      usersPre: any = [];
    if (predictionInfo?.items?.length > 0) {
      predictionInfo?.items?.filter((item: any) => {
        if (item.user.code === userStore.code) {
          userPre.push(item);
        } else {
          usersPre.push(item);
        }
      });
    }
    setUserPrediction(userPre);
    setUsersPrediction(usersPre);
  }, [predictionInfo, userStore.code]);
  return (
    <Box>
      <WrapTitle title="Dự đoán của tôi" />
      {userPrediction.length === 0 && (
        <>
          {isLoading ? (
            <CardItemLoader count={2} />
          ) : (
            <NoData title="Chưa có thông tin dự đoán" />
          )}
        </>
      )}
      {userPrediction.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Thông tin</TableCell>
                <TableCell align="center">Dự đoán</TableCell>
                <TableCell align="right">
                  <InfoOutlinedIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPrediction.map((item: any, key: number) => (
                <RowCollapsePrediction
                  key={key}
                  data={item}
                  matchDetail={matchDetail}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <WrapTitle title="Dự đoán ngươi chơi" />
      {usersPrediction.length === 0 && (
        <>
          {isLoading ? (
            <CardItemLoader />
          ) : (
            <NoData title="Chưa có thông tin dự đoán" />
          )}
        </>
      )}
      {usersPrediction.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Thông tin</TableCell>
                <TableCell align="center">Dự đoán</TableCell>
                <TableCell align="right">Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersPrediction.map((item: any, key: number) => (
                <RowCollapsePrediction
                  key={key}
                  data={item}
                  matchDetail={matchDetail}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default React.memo(PredictionInfo);
