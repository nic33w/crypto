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
import { getBackgroundColor } from "../../utils/numberFormat.tsx";

const Box = styled.div`
  display: flex;
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  box-sizing: border-box;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
`;

export default Box;
