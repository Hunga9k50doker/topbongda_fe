"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";
import { useMount } from "react-use";
import { useRouter } from "next/navigation";
interface BreadCrumbCustomProps {
  data: {
    label: string | React.ReactElement;
    href?: string;
  }[];
}

export default function BreadCrumbCustom({ data }: BreadCrumbCustomProps) {
  const [isMount, setIsMount] = React.useState(false);
  const router = useRouter();
  useMount(() => {
    setIsMount(true);
  });
  if (!isMount)
    return (
      <Box
        sx={{
          width: "100%",
          height: 40,
          background: "trasparent",
        }}
      />
    );

  const onRedirect = () => {
    router.push("/");
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        className="text-sm truncate"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          my: 1,
          px: 1,
          ".MuiBreadcrumbs-li": {
            maxWidth: "100%",
          },
        }}
      >
        <Typography
          onClick={onRedirect}
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          color="inherit"
          title="Trang chủ"
        >
          <HomeIcon fontSize="inherit" />
          {/* Trang chủ */}
        </Typography>
        {data.slice(0, -1).map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
                color="inherit"
                href={item.href}
              >
                <Typography
                  component={"div"}
                  color="inherit"
                  className="max-w-[90vw] truncate text-sm"
                >
                  {item.label}
                </Typography>
              </Link>
            )
        )}
        <Typography
          component={"div"}
          color="text.primary"
          className="max-w-[90vw] truncate text-sm"
        >
          {data.at(-1)?.label}
        </Typography>
      </Breadcrumbs>
      <Divider />
    </>
  );
}
