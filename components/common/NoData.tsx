import React from "react";
import { Empty } from "antd";

interface NoDataProps {
  title?: string;
}
const NoData = ({ title = "Chưa có thông tin" }: NoDataProps) => {
  return (
    <Empty
      imageStyle={{
        height: 60,
      }}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span className="text-gray-400 italic">{title}</span>}
    />
  );
};

export default NoData;
