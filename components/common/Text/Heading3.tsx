import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  $colorName?: string;
  $fontweight?: number | string;
  $fontSize?: string;
}

const Heading3 = styled(Typography)<Props>`
  font-style: normal;
  font-weight: ${(props) => props.$fontweight || 600};
  font-size: ${(props) => props.$fontSize || "20px"};
  line-height: 24px;
  color: ${(props) => `var(${props.$colorName || "text.primary"})`};
`;

export default Heading3;
