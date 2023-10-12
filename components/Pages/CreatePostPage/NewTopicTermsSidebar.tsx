import React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ListItemText from "@mui/material/ListItemText";
import CardContent from "@mui/material/CardContent";
import WrapTitle from "@/components/common/WrapTitle";
function NewTopicTermsSidebar() {
  return (
    <>
      <WrapTitle title="Quy định viết bài" />
      <Card className="mb-4">
        <List dense>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CheckCircleRoundedIcon className="text-primary" />
            </ListItemIcon>
            <ListItemText primary="Bài viết không sử dụng các hình ảnh nhạy cảm, xuyên tạc,..." />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CheckCircleRoundedIcon className="text-primary" />
            </ListItemIcon>
            <ListItemText primary="Tôn trọng, lịch sự khi viết bài." />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CheckCircleRoundedIcon className="text-primary" />
            </ListItemIcon>
            <ListItemText primary="Không spam, không vi phạm nội quy." />
          </ListItem>
        </List>
      </Card>
      <WrapTitle title="Hướng dẫn công cụ viết bài" />
      <Card>
        <CardContent>
          Nội dung bài viết sử dụng trình soạn thảo{" "}
          <a
            href="https://quilljs.com/docs/themes/"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Quill Editor
          </a>
          , tiêu đề là không bắt buộc. Một số nội dung có thể bị loại bỏ hoặc ẩn
          đi do quy định của website.
        </CardContent>
      </Card>
    </>
  );
}

export default NewTopicTermsSidebar;
