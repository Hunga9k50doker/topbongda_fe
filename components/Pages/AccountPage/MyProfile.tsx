import React from "react";
import FavoriteTeam from "@/components/Pages/AccountPage/FavoriteTeam";
import PublicInfoEdit from "@/components/Pages/AccountPage/PublicInfoEdit";
import PrivateInfoEdit from "@/components/Pages/AccountPage/PrivateInfoEdit";
import AvatarEdit from "@/components/Pages/AccountPage/AvatarEdit";
import { Box } from "@mui/material";
import CoverEdit from "@/components/Pages/AccountPage/CoverEdit";

function MyProfile() {
  return (
    <Box>
      <FavoriteTeam />

      <PublicInfoEdit />

      <PrivateInfoEdit />

      <AvatarEdit />

      <CoverEdit />
    </Box>
  );
}

export default React.memo(MyProfile);
