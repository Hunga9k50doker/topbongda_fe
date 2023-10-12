import * as React from "react";
import { IconButton, Popover, InputLabel, Stack } from "@mui/material";
import dynamic from "next/dynamic";

interface PopoverCustomProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  title?: string;
  size?: "small" | "medium" | "large";
  anchorOrigin?: {
    vertical: any;
    horizontal: any;
  };
  transformOrigin?: {
    vertical: any;
    horizontal: any;
  };
}
function PopoverCustom({
  size = "medium",
  children,
  icon,
  title,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
}: PopoverCustomProps) {
  const idreact = React.useId();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? idreact : undefined;

  const handleShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <IconButton
          onClick={handleShow}
          sx={{ p: 0 }}
          size={size}
          aria-label="menu"
          aria-describedby={id}
          id={`${idreact}-input-with-icon-adornment`}
        >
          {icon}
        </IconButton>
        <InputLabel
          className="cursor-pointer py-2 text-inherit"
          htmlFor={`${idreact}-input-with-icon-adornment`}
        >
          {title}
        </InputLabel>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
      >
        <div onClick={handleClose}>{children}</div>
      </Popover>
    </>
  );
}

export default React.memo(PopoverCustom);
