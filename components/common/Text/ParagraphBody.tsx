import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontweight?: number | string;
  $fontSize?: string;
}

const ParagraphBody = styled(Typography)<Props>`
  font-style: normal;
  font-weight: ${(props) => props.$fontweight || 400};
  font-size: ${(props) => props.$fontSize || "14px"};
  line-height: 24px;
  color: ${(props) => `var(${props.$colorName || "text.primary"})`};
`;

export default ParagraphBody;
