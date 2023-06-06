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

const addSearchIcon = (props: { type: string }) => {
  if (props.type === "text") {
    return `background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='grey' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 20px center;`;
  } else {
    return ``;
  }
};

const StyledInput = styled.input`
  border-radius: 5px;

  ${addSearchIcon}
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
  &:hover {
    color: ${(props) => props.theme.hoverFontColor};
  }
`;
export default StyledInput;

// background: ${(props) => props.type === "text" ? `url("img_tree.gif")` : `blue`}
