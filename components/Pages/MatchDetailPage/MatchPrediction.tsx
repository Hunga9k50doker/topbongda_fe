import { Box, Grid } from "@mui/material";
import React from "react";
import { getOddsAPI } from "@/apis/prediction_apis";
import { PREDICTION_API_ODDS } from "@/configs/endpoints/prediction_endpoints";
import WrapTitle from "@/components/common/WrapTitle";
import ButtonCustom from "@/components/common/ButtonCustom";
import { PredictionModel } from "@/models/prediction_model";
import { MatchDetailModel } from "@/models/match_model";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalPrediction from "@/components/Modal/ModalPrediction";
import { Badge } from "antd";
import { useTheme } from "@mui/material/styles";
import NoData from "@/components/common/NoData";
import { RootState } from "@/store";
import { toast } from "react-toastify";
import ModalIntroduction from "@/components/Modal/ModalIntroduction";
import { useEffectOnce, useLocalStorage } from "react-use";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import { CardPredictionLoader } from "@/loaders";
import useSWRImmutable from "swr/immutable";
interface MatchPredictionProps {
  matchDetail: MatchDetailModel;
}

const MatchPrediction = ({ matchDetail }: MatchPredictionProps) => {
  const theme: any = useTheme();
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const { updateModal } = React.useContext(ModalContext);
  const [value] = useLocalStorage("introduction", false);

  const { data: prediction, isLoading } = useSWRImmutable(
    PREDICTION_API_ODDS,
    () =>
      getOddsAPI({
        match_code: matchDetail.code,
      })
        .then((r) => r.data)
        .catch((e) => {})
        .finally(() => {})
  );

  const handleOpenModal = React.useCallback(
    (item: any) => {
      if (!userStore.isAuth) {
        return updateModal(`modal-auth`, <ModalAuth />);
      }
      if (!Boolean(prediction.usableExperience)) {
        toast.warning("Bạn không đủ kinh nghiệm để dự đoán");
      } else
        updateModal(
          `modal-prediction`,
          <ModalPrediction data={item} matchDetail={matchDetail} />
        );
    },
    [prediction]
  );

  useEffectOnce(() => {
    if (!value) updateModal(`modal-introduction`, <ModalIntroduction />);
  });

  return (
    <Box>
      {!Boolean(prediction?.data?.length) && (
        <>
          {isLoading ? (
            <CardPredictionLoader />
          ) : (
            <NoData title="Chưa có thông tin dự đoán" />
          )}
        </>
      )}
      {prediction &&
        prediction.data.map((item: PredictionModel, key: number) => (
          <Box key={key}>
            <WrapTitle title={renderTitle(item.betType)} />
            <Grid container spacing={2} justifyContent={"center"}>
              {item.bets.map((bet, key) => (
                <Grid
                  item
                  key={key}
                  xs={"auto"}
                  justifyContent={"center"}
                  display={"flex"}
                  onClick={() =>
                    handleOpenModal({
                      ...bet,
                      betType: item.betType,
                      usableExperience: prediction.usableExperience,
                    })
                  }
                >
                  <Badge.Ribbon
                    color={theme.palette.primary.main}
                    text={`x${bet.odd}`}
                    style={{
                      fontSize: "8px",
                      fontWeight: 700,
                      width: "fit-content",
                      lineHeight: "inherit",
                      top: "-8px",
                    }}
                  >
                    <ButtonCustom key={bet.odd}>{bet.value}</ButtonCustom>
                  </Badge.Ribbon>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
    </Box>
  );
};

export default React.memo(MatchPrediction);

const renderTitle = (betType: string) => {
  switch (betType) {
    case "ES":
      return "Dự đoán tỉ số";
    case "MW":
      return "Dự đoán kết quả";
    default:
      return betType;
  }
};
