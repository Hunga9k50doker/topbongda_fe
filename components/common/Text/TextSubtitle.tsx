import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $fontweight?: number | string;
  $fontSize?: string;
}

const TextSubtitle = styled(Typography)<Props>`
  font-style: normal;
  font-weight: ${(props) => props.$fontweight || 400};
  font-size: ${(props) => props.$fontSize || "12px"};
  color: "#9ca3af";
  line-height: 24px;
`;

export default TextSubtitle;
