import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontWeight?: number | string;
}

const ParagraphSmall = styled(Typography)<Props>`
  font-style: normal;
  font-size: 12px;
  line-height: 24px;
  color: ${(props) => `var(${props.$colorName || "text.primary"})`};
`;

export default ParagraphSmall;
