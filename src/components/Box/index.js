import styled from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  position,
} from "styled-system";
import { getBackgroundColor } from "../../utils/numberFormat";

const Box = styled.div`
  display: flex;
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
`;

export default Box;
