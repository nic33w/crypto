import styled from "styled-components";
import { Link } from "react-router-dom";
import { getBackgroundColor } from "../../utils/numberFormat";

const StyledLink = styled(Link)`
  text-decoration: none;
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  &:hover {
    color: ${(props) => props.theme.hoverFontColor};
  }
`;

export default StyledLink;
