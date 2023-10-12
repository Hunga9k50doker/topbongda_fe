import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import { ModalContext } from "@/context/ModalContext/ModalContext";

interface ModalCookiePolicyProps {
  onAccept: () => void;
  onReject: () => void;
}

export default React.memo(function ModalCookiePolicy({
  onAccept,
  onReject,
}: ModalCookiePolicyProps) {
  const { isOpenModal, handleCloseModal } = React.useContext(ModalContext);

  return (
    <Drawer onClose={handleCloseModal} open={isOpenModal} anchor="bottom">
      <Box sx={{ py: 4, px: 2 }}>
        <Typography mb={1} variant="body1">
          Chúng tôi sử dụng cookie của bạn để tăng trải nghiệm người dùng. Bằng
          việc nhấn vào nút &quot;Chấp nhận&quot; bạn cho phép chúng tôi sử dụng
          cookie vào mục đích tối ưu hóa trả nghiệm của bạn. Thông tin chi
          tiết&nbsp;
          <Link href="/quy-dinh-rieng-tu" className="text-primary">
            tại đây
          </Link>
        </Typography>
        <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
          <Button onClick={onReject} variant="text" className="text-gray-400">
            Để sau
          </Button>
          <Button onClick={onAccept} variant="outlined">
            Chấp nhận
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
});
