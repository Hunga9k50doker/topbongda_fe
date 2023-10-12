import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontweight?: number | string;
}

const ParagraphBold = styled(Typography)<Props>`
  font-style: normal;
  font-weight: ${(props) => props.$fontweight || 700};
  font-size: 14px;
  line-height: 24px;
  color: ${(props) => `(${props.$colorName || "text.primary"})`};
`;

export default ParagraphBold;
