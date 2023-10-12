import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontweight?: number | string;
}

const ParagraphTitle = styled(Typography)<Props>`
  font-style: normal;
  font-weight: ${(props) => props.$fontweight || 600};
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => `var(${props.$colorName || "text.primary"})`};
`;

export default ParagraphTitle;
