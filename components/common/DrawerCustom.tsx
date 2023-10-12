import React from "react";
import { Box } from "@mui/material";

interface DrawerCustomProps {
  isOpen: boolean;
  children?: React.ReactNode;
  toggleDrawer: () => void;
}

const DrawerCustom = ({
  isOpen,
  toggleDrawer,
  children,
}: DrawerCustomProps) => {
  return (
    <Box>
      <Box
        onClick={toggleDrawer}
        sx={{
          zIndex: 999,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0,0,0,0.5)",
          transform: isOpen ? "scaleY(1)" : "scaleY(0)",
          transition: "all 0.3s ease",
          transformOrigin: "top center",
        }}
      ></Box>
      <Box
        sx={{
          zIndex: 999,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          overflow: isOpen ? "visible" : "hidden",
          maxHeight: isOpen ? "100%" : 0,
          transition: "max-height 0.3s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DrawerCustom;
