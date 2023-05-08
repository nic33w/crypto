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

const StyledInput = styled.input`
  border-radius: 5px;
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  border-style: none;
  padding: 10px;
  width: 100%;
  margin: 5px;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
`;
export default StyledInput;
