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

const setColors = (props: { isPrimary: boolean }) => {
  const bgColor = props.isPrimary ? "green" : "white";
  const fontColor = props.isPrimary ? "white" : "green";
  return `background-color: ${bgColor};
  color: ${fontColor};
  &:hover {
    background-color: deepskyblue;
    color: white
  }
    `;
};

const StyledButton = styled.button`
  border-radius: 5px;
  border-style: none;
  padding: 10px;
  ${setColors}
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
  ${position}
  ${grid}
`;

export default StyledButton;
