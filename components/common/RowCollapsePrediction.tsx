import React from "react";
import CustomLink from "@/components/common/CustomLink";
import { formatDate, getMediaURL, numberFormatter } from "@/utils";
import Tooltip from "@mui/material/Tooltip";
import { WolfIcon } from "@/assets/images/icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import { DEFAULT_TEAM_ICON } from "@/constants";
import ChipLevel from "@/components/Chips/ChipLevel";
import { Button, Stack, Typography } from "@mui/material";
import AvatarCustom from "@/components/common/AvatarCustom";
import { MatchDetailModel } from "@/models/match_model";
import { Tag } from "antd";
import { RootState } from "@/store";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalPrediction from "@/components/Modal/ModalPrediction";
import { useSelector } from "react-redux";
import { MATCH_STATUS } from "@/configs/constants";
import { SyncOutlined } from "@ant-design/icons";
import { PREDICTION_API_PREDICTIONS_COUNT } from "@/configs/endpoints/prediction_endpoints";
import { useSWRConfig } from "swr";
interface RowCollapsePredictionProps {
  data: any;
  matchDetail: MatchDetailModel;
  viewMySelf?: boolean;
  callBack?: Function;
}

const RowCollapsePrediction = ({
  data,
  matchDetail,
  viewMySelf = false,
  callBack,
}: RowCollapsePredictionProps) => {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const { mutate } = useSWRConfig();
  const [open, setOpen] = React.useState(false);
  const { user } = data;
  const { updateModal } = React.useContext(ModalContext);

  const renderContent = React.useCallback(
    (data: any, short: boolean) => {
      if (short) {
        if (data?.prediction) {
          switch (data.prediction) {
            case "HW":
              return (
                <Tag color={"green"} className="w-full font-bold truncate">
                  {matchDetail.homeTeam.name}
                </Tag>
              );
            case "AW":
              return (
                <Tag color={"green"} className="w-full font-bold truncate">
                  {matchDetail.awayTeam.name}
                </Tag>
              );
            case "D":
              return (
                <Tag color="gold" className="font-bold">
                  Hòa
                </Tag>
              );
            default:
              return <Tag color="purple">Không có dữ liệu</Tag>;
          }
        } else {
          return (
            <Tag color="green" className="font-bold">
              {data.homeGoals} - {data.awayGoals}
            </Tag>
          );
        }
      } else {
        if (data?.prediction) {
          switch (data.prediction) {
            case "HW":
              return `${matchDetail.homeTeam.name} thắng`;
            case "AW":
              return `${matchDetail.awayTeam.name} thắng`;
            case "D":
              return `Hai đội hòa nhau`;
            default:
              return <Tag color="purple">Không có dữ liệu</Tag>;
          }
        } else {
          return `${matchDetail.homeTeam.name} 
            (${data.homeGoals} - ${data.awayGoals})
        ${matchDetail.awayTeam.name}`;
        }
      }
    },
    [matchDetail]
  );

  const handleOpenModal = (item: any) => {
    updateModal(
      `modal-cancel-prediction`,
      <ModalPrediction
        handleEvent={() => mutate(PREDICTION_API_PREDICTIONS_COUNT)}
        matchDetail={matchDetail}
        data={data}
        isCancel={true}
      />
    );
  };

  return (
    <React.Fragment>
      <TableRow>
        {!viewMySelf && (
          <TableCell
            style={{ padding: "8px 0 8px 16px" }}
            component="th"
            scope="row"
          >
            <CustomLink href={user.url} className="flex items-center gap-2">
              <AvatarCustom
                style={{
                  width: 28,
                  height: 28,
                }}
                data={user}
              />
              <Stack>
                <Box className="heading-font flex items-center gap-1 text-md font-bold truncate">
                  <Typography className="max-w-[100%] truncate">
                    {user.name}
                  </Typography>
                  {user.isStaff && (
                    <Tooltip title="Quản trị viên">
                      <span className="text-blue-500 inline-flex">
                        <WolfIcon width={14} height={14} />
                      </span>
                    </Tooltip>
                  )}
                </Box>
                <ChipLevel data={user} />
              </Stack>
            </CustomLink>
          </TableCell>
        )}
        <TableCell align="center">
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={0.5}
            component={CustomLink}
            href={matchDetail.url}
          >
            <Typography className="max-w-[100px] h-fit leading-none">
              {renderContent(data, true)}
            </Typography>
            {data?.prediction ? (
              <Tooltip title="Dự đoán kết quả">
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    width: 20,
                    height: 20,
                    background: "green",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  R
                </Typography>
              </Tooltip>
            ) : (
              <Tooltip title="Dự đoán tỉ số">
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    width: 20,
                    height: 20,
                    background: "red",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  G
                </Typography>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
        {viewMySelf && (
          <TableCell align="center">
            <CustomLink href={matchDetail.url}>
              {data.predictionStatus === "C" && (
                <>
                  <Typography
                    component={"span"}
                    mr={1}
                    fontWeight={700}
                    color="green"
                  >
                    {`${data.match.homeGoals} - ${data.match.awayGoals}`}
                  </Typography>
                </>
              )}
              {data.predictionStatus === "I" && (
                <>
                  <Typography
                    component={"span"}
                    mr={1}
                    fontWeight={700}
                    color="red"
                  >
                    {`${data.match.homeGoals} - ${data.match.awayGoals}`}
                  </Typography>
                </>
              )}
              {data.predictionStatus === "P" && (
                <Tag
                  color="processing"
                  className="font-bold flex items-center w-fit text-2xs m-auto"
                  icon={<SyncOutlined spin />}
                >
                  Chưa có kết quả
                </Tag>
              )}
            </CustomLink>
          </TableCell>
        )}
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table
              size="small"
              aria-label="purchases"
              sx={{
                "& tr:last-child td": {
                  borderBottom: "unset",
                },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-400 p-0">Dự đoán:</TableCell>
                  <TableCell align="right">
                    {renderContent(data, false)}
                  </TableCell>
                </TableRow>
                {viewMySelf && (
                  <>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Kinh nghiệm(x đòn bẩy)
                      </TableCell>
                      <TableCell align="right">
                        {data.exp}
                        <Typography
                          fontSize={"small"}
                          component={"span"}
                          color="primary"
                        >
                          (x{data.odd})
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {data.predictionStatus !== "P" && (
                      <TableRow>
                        <TableCell className="text-gray-400 p-0">
                          Kinh nghiệm nhận về:
                        </TableCell>
                        <TableCell align="right">
                          {numberFormatter(data.receivedExp)}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}

                <TableRow>
                  <TableCell className="text-gray-400 p-0">
                    Thời gian dự đoán:
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(data.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-400 p-0">Kết quả</TableCell>
                  <TableCell align="right">
                    {data.predictionStatus === "C" && (
                      <Stack alignItems={"flex-end"}>
                        {/* <Typography
                          component={"span"}
                          mr={1}
                          fontWeight={700}
                          color="green"
                        >
                          {`${data.match.homeGoals} - ${data.match.awayGoals}`}
                        </Typography> */}
                        <Tag
                          color="success"
                          className="font-bold flex items-center w-fit text-2xs m-0"
                        >
                          Chính xác
                        </Tag>
                      </Stack>
                    )}
                    {data.predictionStatus === "I" && (
                      <Stack alignItems={"flex-end"}>
                        {/* <Typography
                          component={"span"}
                          mr={1}
                          fontWeight={700}
                          color="red"
                        >
                          {`${data.match.homeGoals} - ${data.match.awayGoals}`}
                        </Typography> */}
                        <Tag
                          color="error"
                          className="font-bold flex items-center w-fit text-2xs m-0"
                        >
                          Chưa chính xác
                        </Tag>
                      </Stack>
                    )}
                    {data.predictionStatus === "P" && (
                      <Stack alignItems={"flex-end"}>
                        <Tag
                          color="processing"
                          className="font-bold flex items-center w-fit text-2xs mr-0"
                          icon={<SyncOutlined spin />}
                        >
                          Chưa có kết quả
                        </Tag>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
                {userStore.code === user.code &&
                  matchDetail.matchStatus === MATCH_STATUS.NS.key && (
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Hủy bỏ dự đoán:
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleOpenModal}
                        >
                          Hủy bỏ
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default React.memo(RowCollapsePrediction);
