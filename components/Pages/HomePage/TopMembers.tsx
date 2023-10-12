import React, { memo, useEffect } from "react";
import CardTopMember from "@/components/Cards/CardTopMember";
import { UserModel } from "@/models/user_model";
import { getTopUserByEXPAPI } from "@/apis/user_apis";
import { useDebounce } from "react-use";
import NoData from "@/components/common/NoData";
import { Box } from "@mui/material";
interface TopMembersProps {
  topMembers?: UserModel[];
}

function TopMembers({ topMembers }: TopMembersProps) {
  const [items, setItems] = React.useState(topMembers || []);

  useDebounce(() => {
    if (!Boolean(topMembers?.length))
      getTopUserByEXPAPI({
        num: 50,
        time: "week",
      })
        .then((r) => {
          setItems(r.data);

          return r.data;
        })
        .catch(() => []);
  }, 500);

  useEffect(() => {
    if (topMembers && topMembers?.length > 0) setItems(topMembers);
  }, [topMembers]);

  return (
    <Box>
      {items.length === 0 && <NoData />}
      {items.length > 0 &&
        items.map((item: any, key) => (
          <CardTopMember key={key} data={item} index={key} />
        ))}
    </Box>
  );
}

export default memo(TopMembers);
