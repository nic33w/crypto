// @ts-ignore
import Box from "../Box";
import React from "react";

function getColors(number: number) {
  switch (number % 5) {
    case 0:
      return ["#ff0000", "#ffaaaa"];
    case 1:
      return ["#ff8800", "#ffccaa"];
    case 2:
      return ["#00ff00", "#aaffaa"];
    case 3:
      return ["#00ffff", "#aaffff"];
    case 4:
      return ["#ff00ff", "#ffaaff"];
    default:
      return ["#888888", "#00aaff"];
  }
}

export default function PercentageBar(props: any) {
  const colors = getColors(props.colorNumber);
  const percent1 = props.percent ? props.percent + "%" : "0%";
  const percent2 = props.percent ? 100 - props.percent + "%" : "100%";
  return (
    <Box width="100%" flexGrow="1">
      <Box
        width={percent1}
        borderTopLeftRadius="5px"
        borderBottomLeftRadius="5px"
        borderColor={colors[0]}
        borderStyle="solid"
        borderWidth="thick"
      ></Box>
      <Box
        width={percent2}
        borderTopRightRadius="5px"
        borderBottomRightRadius="5px"
        borderColor={colors[1]}
        borderStyle="solid"
        borderWidth="thick"
      ></Box>
    </Box>
  );
}
