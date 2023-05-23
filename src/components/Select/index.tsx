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

const Select = styled.select`
  border-radius: 5px;
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  border-style: none;
  padding: 5px;
  width: 100%;
  margin: 5px;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
  &:hover {
    color: ${(props) => props.theme.hoverFontColor};
  }
`;

export default Select;
