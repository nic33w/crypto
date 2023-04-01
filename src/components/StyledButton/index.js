import styled from "styled-components";

const setColors = (props) => {
  const bgColor = props.isPrimary ? "green" : "white";
  const fontColor = props.isPrimary ? "white" : "green";
  return `background-color: ${bgColor};
  color: ${fontColor};
    `;
};

const StyledButton = styled.button`
  border-radius: 5px;
  border-style: none;
  padding: 10px;
  ${setColors}
`;

export default StyledButton;
