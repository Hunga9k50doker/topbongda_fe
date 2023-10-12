"use client";
import React from "react";
import ContentLoader from "react-content-loader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardHeader, Grid, Skeleton, Stack } from "@mui/material";

export const HomeCardLoader = (props: any) => (
  <Stack>
    {Array.from(new Array(6)).map((item, index) => (
      <Card key={index}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={28}
              height={28}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    ))}
  </Stack>
);

export const UserCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 200 80"
    backgroundColor="#cccccc66"
    foregroundColor="#aaaaaa66"
    {...props}
  >
    <circle cx="15" cy="15" r="15" />
    <rect x="40" y="0" rx="3" ry="3" width="80" height="10" />
    <rect x="40" y="20" rx="3" ry="3" width="100" height="6" />

    <rect x="0" y="50" rx="3" ry="3" width="150" height="10" />
    <rect x="0" y="70" rx="3" ry="3" width="70" height="6" />
  </ContentLoader>
);

export const CommentsListLoader = (props: any) => (
  <Stack gap={1} mt={1} width={"100%"}>
    <Stack direction={"row"} gap={1}>
      <Skeleton variant="circular" width={28} height={28} />
      <Skeleton variant="rounded" height={40} width={"100%"} />
    </Stack>
    <Stack direction={"row"} gap={1}>
      <Skeleton variant="circular" width={28} height={28} />
      <Skeleton variant="rounded" height={40} width={"100%"} />
    </Stack>
    <Stack direction={"row"} gap={1}>
      <Skeleton variant="circular" width={28} height={28} />
      <Skeleton variant="rounded" height={40} width={"100%"} />
    </Stack>
  </Stack>
);

export const CardItemLoader = ({ count = 12 }: { count?: number }) => (
  <Stack gap={1} sx={{ mt: 2 }}>
    {Array.from(new Array(count)).map((item, index) => (
      <Skeleton key={index} variant="rounded" height={60} />
    ))}
  </Stack>
);

export const CardPredictionLoader = ({ count = 12 }: { count?: number }) => (
  <Grid container spacing={2}>
    {Array.from(new Array(count)).map((item, index) => (
      <Grid item key={index} xs={3}>
        <Skeleton variant="rounded" height={54} />
      </Grid>
    ))}
  </Grid>
);

export const NewLoader = ({ count = 12 }: { count?: number }) => (
  <Stack gap={1}>
    {Array.from(new Array(count)).map((item, index) => (
      <Stack alignItems={"flex-start"} gap={1} direction={"row"} key={index}>
        <Skeleton variant="rectangular" width={128} height={80} />
        <Stack flex={1}>
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Box>
        </Stack>
      </Stack>
    ))}
  </Stack>
);
