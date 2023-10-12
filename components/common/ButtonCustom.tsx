import React from "react";
import { Button } from "@mui/material";

const ButtonCustom = ({
  children,
  disabled = false,
  component = "button",
  href,
  ...props
}: {
  children: React.ReactNode;
  disabled?: boolean;
  component?: React.ElementType;
  href?: string;
}) => {
  return (
    <Button
      LinkComponent={component}
      href={href}
      disabled={disabled}
      className="text-sm rounded-lg"
      size="small"
      variant="outlined"
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
