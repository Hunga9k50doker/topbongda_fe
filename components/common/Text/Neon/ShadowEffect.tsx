import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface ShadowEffectProps {
  title: string;
  className?: string;
}
const ShadowEffect = ({ title, className }: ShadowEffectProps) => {
  return (
    <Neon>
      <Text data-text={title} className={className || ""}>
        {title}
      </Text>
      <Gradient></Gradient>
      <Spotlight></Spotlight>
    </Neon>
  );
};

export default ShadowEffect;

const animateLight = () =>
  keyframes({
    to: {
      transform: "translate(50%, 50%)",
    },
  });

const Neon = styled(Box)(({ theme }: any) => ({
  position: "relative",
  overflow: "hidden",
  filter: "brightness(200%)",
}));

const Text = styled(Typography)(({ theme }: any) => ({
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  textTransform: "uppercase",
  position: "relative",
  userSelect: "none",
  "&::before": {
    content: "attr(data-text)",
    position: "absolute",
    color: "white",
    filter: "blur(0.01em)",
    mixBlendMode: "difference",
  },
}));

const Gradient = styled(Typography)(({ theme }: any) => ({
  position: "absolute",
  background: "linear-gradient(45deg, red, gold, lightgreen, gold, red)",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  mixBlendMode: "multiply",
}));

const Spotlight = styled(Typography)(({ theme }: any) => ({
  position: "absolute",
  top: "-100%",
  left: "-100%",
  right: 0,
  bottom: 0,
  background:
    "radial-gradient(circle,white,transparent 25%) center / 25% 25%,radial-gradient(circle,white,black 25%) center / 12.5% 12.5%",
  animation: `shadowEffect 5s linear infinite`,
  mixBlendMode: "color-dodge",
}));
