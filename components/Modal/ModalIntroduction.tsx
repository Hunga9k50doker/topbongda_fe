import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { ItemCommentModel } from "@/models/comment_model";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { Stack, Typography } from "@mui/material";
import { useLocalStorage } from "react-use";

interface ModalIntroductionProps {
  handleEvent?: () => void;
  data?: ItemCommentModel;
}

const steps = [
  {
    icon: <LocalLibraryIcon fontSize={"small"} />,
    label: "Điều kiện dự đoán",
    description: `Bạn cần có đủ số kinh nghiệm để dự đoán. Số kinh nghiệm của bạn thay đổi sẽ dẫn tới
    cấp độ của bạn cũng thay đổi theo. Cấp độ của bạn càng cao thì số kinh nghiệm càng nhiều.`,
  },
  {
    icon: <PsychologyAltIcon fontSize={"small"} />,

    label: "Cách thức dự đoán",
    description: `Mỗi trận đấu sẽ có tỉ lệ dự đoán khác nhau và đòn bẩy khác nhau. Bạn có thể vừa dự đoán tỉ số, vừa dự đoán kết quả.
       Để có thể dự đoán lại bạn cần hủy dự đoán trước đó. Dự đoán chỉ hợp lệ khi trận đấu chưa bắt đầu. Kinh nghiệm dự đoán tối đa sẽ được cập nhật lại sau một khoảng thời gian nhất định`,
  },
  {
    icon: <MilitaryTechIcon fontSize={"small"} />,

    label: "Phần thưởng",
    description: `Phần thưởng bạn nhận được là số kinh nghiệm bạn đặt cược * đòn bẩy.
    (Ví dụ: bạn đặt cược 100exp với đòn bẩy là 75. Nếu bạn dự đoán đúng, bạn sẽ nhận được 100*75 = 7500exp.)`,
  },
];

export default React.memo(function ModalIntroduction({
  data,
}: ModalIntroductionProps) {
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue, remove] = useLocalStorage("introduction", "false", {
    raw: true,
  });
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setValue("true");
    handleCloseModal();
  };

  return (
    <Dialog fullWidth open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle textAlign={"center"}>Hướng dẫn dự đoán</DialogTitle>
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Stack
            fontSize={14}
            fontWeight={700}
            direction={"row"}
            alignItems={"center"}
            gap={0.5}
            className="text-gray-400"
          >
            {steps[activeStep].icon}
            {steps[activeStep].label}
          </Stack>
        </Paper>
        <Box
          sx={{
            height: 255,
            maxWidth: 400,
            width: "100%",
            p: 2,
            overflowY: "auto",
          }}
        >
          <Typography>{steps[activeStep].description}</Typography>
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep === steps.length - 1 ? (
              <Button size="small" onClick={handleFinish}>
                Đã hiểu
              </Button>
            ) : (
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Tiếp theo
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Trở lại
            </Button>
          }
        />
      </Box>
    </Dialog>
  );
});
