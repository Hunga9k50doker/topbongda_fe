import React from "react";
import { Tag } from "antd";
interface ChipLevelProps {
  title?: string;
  data: any;
}
const ChipLevel = ({ data }: ChipLevelProps) => {
  const { levelName, levelColor, levelIndex } = data;

  const boxShadow = React.useMemo(() => {
    if (levelIndex > 5 && levelIndex <= 10) {
      return "1px 1px 4px currentColor";
    }
    if (levelIndex > 10 && levelIndex <= 15) {
      return "1px 1px 8px inset";
    }
    if (levelIndex > 15 && levelIndex <= 20) {
      return "1px 1px 8px inset, 1px 1px 4px currentColor";
    }
    return "unset";
  }, [levelIndex]);
  return (
    <Tag
      style={{
        boxShadow: boxShadow,
        fontSize: 10,
        fontWeight: 700,
        width: "fit-content",
        height: "fit-content",
        lineHeight: "inherit",
        color: levelColor,
        borderColor: levelColor,
        marginRight: 0,
      }}
    >
      {levelName}
    </Tag>
  );
};

export default ChipLevel;
