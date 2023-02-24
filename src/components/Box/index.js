import styled from "styled-components";
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  border,
} from "styled-system";

const dark = ["#191b1f", "#1f2128", "#2c2f36"];

const getBackgroundColor = (props) =>
  `background-color: ${dark[props.bgColor]};`;

const getColor = (props) => `color: green`;

const Box = styled.div`
  display: flex;

  ${getBackgroundColor}
  color: white;

  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
`;

/*
I'm keeping this as a reference for now

const Box = styled.div(
  {
    display: "flex",
    borderStyle: "solid",
    borderColor: "#eeeeea",
  },
  space,
  color,
  typography,
  layout,
  flexbox,
  border
);

const Box = styled.div`
  display: flex;
  border-style: solid;
  border-color: #eeeeea;

  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${border}
`;

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...typography.propTypes,
  ...layout.propTypes,
  ...flexbox.propTypes,
  ...border.propTypes,
};
*/
export default Box;
