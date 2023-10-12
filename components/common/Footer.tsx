import React, { memo, useMemo } from "react";
import { LogoIcon, Logo2Icon } from "@/assets/images/icons";
import { footer } from "@/assets/database/footer";
import { Grid, Stack, Typography, Divider } from "@mui/material";
import ParagraphSmall from "@/components/common/Text/ParagraphSmall";
import dynamic from "next/dynamic";
import Link from "next/link";

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Stack p={2}>
      <Divider />
      <Grid container my={1} spacing={1}>
        {footer.map((item, key) => (
          <Grid item key={key} xs={6} md={3}>
            <Stack spacing={2}>
              <ParagraphSmall className="font-bold" textTransform={"uppercase"}>
                {item.title}
              </ParagraphSmall>
              {item.items.map((element: any, index) => (
                <Link
                  target={item.target}
                  href={element.link}
                  key={index}
                  style={{ marginTop: 8 }}
                >
                  <Stack
                    direction={"row"}
                    gap={1}
                    alignItems={"center"}
                    sx={{ mt: 0 }}
                  >
                    <Typography className="text-gray-400">
                      {item.hasIcon && element.icon}
                    </Typography>
                    <ParagraphSmall>{element.title}</ParagraphSmall>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Stack sx={{ mt: 1 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"}>
            <Logo2Icon height={20} />
            <LogoIcon height={20} width={100} />
          </Stack>
        </Stack>
        <Typography className="text-sm mb-1">
          &copy; 2009-{year} Topbongda.
        </Typography>
        <Typography className="italic text-xs">
          Cảm ơn vì đã đồng hành! ♥
        </Typography>
      </Stack>
    </Stack>
  );
}
export default memo(dynamic(() => Promise.resolve(Footer), { ssr: false }));
