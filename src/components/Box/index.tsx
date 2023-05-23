import styled from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
  position,
  grid,
} from "styled-system";
import { getBackgroundColor } from "../../utils/numberFormat";

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
  ${grid}
  &:hover {
    color: ${(props) =>
      props.isHoverable
        ? props.theme.hoverFontColor
        : props.color
        ? props.color
        : props.theme.fontColor};
  }
`;

export default Box;
