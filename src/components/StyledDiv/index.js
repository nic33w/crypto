import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  color: ${(props) => (props.color ? props.color : "inherit")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "inherit"};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "15px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "inherit")};
  text-align: justify;
  border: ${(props) => (props.border ? props.border : "solid")};
  border-color: #eeeeee;
  border-style: solid;

  border-width: 2px;
  text-decoration: none;
`;

// border-style: ${(props) => (props.borderStyle ? props.borderStyle : "none")};
