import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontweight?: number | string;
}

const ParagraphExtraSmall = styled(Typography)<Props>`
  font-style: normal;
  font-size: 10px;
  line-height: 100%;
  color: ${(props) => `var(${props.$colorName || "text.primary"})`};
`;

export default ParagraphExtraSmall;
