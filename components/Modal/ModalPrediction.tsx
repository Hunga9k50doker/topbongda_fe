import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Form, InputNumber } from "antd";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { DialogContentText, Typography } from "@mui/material";
import { MatchDetailModel } from "@/models/match_model";
import { numberWithCommas } from "@/utils";
import {
  createGoalsPreditionAPI,
  createResultPredictionAPI,
} from "@/apis/prediction_apis";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { cancelPrediction, updatePrediction } from "@/reducers/matchSlice";
import { RootState, store } from "@/store";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useSelector } from "react-redux";

interface ModalPredictionProps {
  handleEvent?: () => void;
  data: any;
  matchDetail: MatchDetailModel;
  isCancel?: boolean;
}

export default React.memo(function ModalPrediction({
  data,
  matchDetail,
  isCancel = false,
  handleEvent,
}: ModalPredictionProps) {
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const { prediction } = useSelector((state: RootState) => state.matchStore);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(1);
  const [form] = Form.useForm();

  const API = React.useMemo(() => {
    //create prediction
    if (!isCancel) {
      const goals = data.value.split(":");
      let result = data.value.split("")[0];
      result = result === "D" ? result : `${result}W`;
      if (data.betType === "MW")
        return {
          params: {
            match_code: matchDetail.code,
            prediction: result,
            exp: value,
          },
          api: createResultPredictionAPI,
        };
      return {
        params: {
          match_code: matchDetail.code,
          home_goals: goals[0],
          away_goals: goals[1],
          exp: value,
        },
        api: createGoalsPreditionAPI,
      };
    }
    //cancel prediction
    else {
      if (data?.prediction)
        return {
          params: {
            match_code: matchDetail.code,
            prediction: data.prediction,
            exp: value,
            remove: "yes",
          },
          api: createResultPredictionAPI,
        };
      return {
        params: {
          match_code: matchDetail.code,
          home_goals: data.homeGoals,
          away_goals: data.awayGoals,
          exp: value,
          remove: "yes",
        },
        api: createGoalsPreditionAPI,
      };
    }
  }, [data]);

  const handleFinish = React.useCallback(() => {
    setLoading(true);
    API.api({ ...API.params, exp: value })
      .then((r) => {
        const d = r.data;
        if (d.ok) {
          if (!isCancel) {
            store.dispatch(
              updatePrediction({
                ...prediction,
                usableExperience: prediction.usableExperience - value,
              })
            );
            toast.success("Dự đoán thành công");
          } else {
            store.dispatch(
              updatePrediction({
                ...prediction,
                usableExperience: prediction.usableExperience + value,
              })
            );
            handleEvent && handleEvent();
            toast.success("Hủy dự đoán thành công");
          }
        } else {
          toast.error(d.msg);
          setLoading(false);
        }
      })
      .finally(() => {
        if (isCancel) store.dispatch(cancelPrediction(data.code));
        setTimeout(() => {
          setLoading(false);
          handleCloseModal();
        }, 500);
      });
  }, [value]);

  const handleIncrese = () => {
    setValue(value + 1);
  };

  const handleDecrese = () => {
    if (value > 1) setValue(value - 1);
  };

  const onChange = (val: any) => {
    if (!val) return setValue(1);
    return setValue(val);
  };

  return (
    <Dialog fullWidth open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>
        {!isCancel
          ? data.betType === "MW"
            ? `Dự đoán kết quả ${renderTitle(data.value)}`
            : `Dự đoán tỷ số ${data.value}`
          : "Hủy dự đoán"}
      </DialogTitle>
      <Form
        size="large"
        onFinish={handleFinish}
        form={form}
        onValuesChange={onChange}
      >
        {!isCancel ? (
          <DialogContent sx={{ py: 0 }}>
            <DialogContentText>
              Đòn bẩy sử dụng X
              <Typography component={"span"} fontWeight={700}>
                {data.odd}
              </Typography>
            </DialogContentText>
            <DialogContentText>
              Số kinh nghiệm đặt cược tối đa: {prediction.usableExperience}
              <Typography className="mt-4 text-xs text-gray-400">
                (*) Số kinh nghiệm tối đa có thể đặt được sẽ được cập nhật lại
                sau mỗi 2 phút.
              </Typography>
            </DialogContentText>
            <Form.Item style={{ marginBottom: "8px" }}>
              <InputNumber
                type="number"
                value={value}
                onChange={onChange}
                style={{ margin: "8px 0" }}
                max={data.usableExperience}
                min={1}
                addonBefore={
                  <RemoveOutlinedIcon color="success" onClick={handleDecrese} />
                }
                addonAfter={
                  <AddOutlinedIcon color="success" onClick={handleIncrese} />
                }
              />
            </Form.Item>
            <DialogContentText>
              Số kinh nghiệm nhận được:
              <Typography
                color="primary"
                marginLeft={1}
                fontWeight={700}
                component={"span"}
              >
                {numberWithCommas(+(value * Number(data.odd)).toFixed(1))} exp
              </Typography>
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent sx={{ py: 0 }}>
            <DialogContentText className="text-center">
              <WarningAmberOutlinedIcon color="warning" />
              Thao tác này sẽ không thể không phục!{" "}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {loading ? (
            <LoadingButton variant="outlined" loading>
              Dự đoán
            </LoadingButton>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="text"
                className="text-gray-400"
                onClick={handleCloseModal}
                color="inherit"
                size="small"
              >
                Hủy bỏ
              </Button>
              <Button
                variant="outlined"
                color={isCancel ? "error" : "primary"}
                type="submit"
                size="small"
              >
                Xác nhận
              </Button>
            </div>
          )}
        </DialogActions>
      </Form>
    </Dialog>
  );
});

const renderTitle = (title: string) => {
  switch (title) {
    case "Home":
      return "Đội nhà thắng";
    case "Away":
      return "Đội khách thắng";
    case "Draw":
      return "Hòa";
  }
};
