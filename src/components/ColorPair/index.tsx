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
      return ["#ff00ff", "#ffaaff"];
  }
}

export default function ColorPair(props: any) {
  const colors = getColors(props.colorNumber);
  return (
    <Box width="100%" flexDirection="column">
      <Box justifyContent="space-between">
        <Box alignItems="center">
          <Box
            borderRadius="5px"
            borderColor={colors[0]}
            borderStyle="solid"
            height="5px"
            mr="5px"
          ></Box>
          <Box color={colors[0]}>{props.pair[0]}</Box>
        </Box>
        <Box alignItems="center">
          <Box
            borderRadius="5px"
            borderColor={colors[1]}
            borderStyle="solid"
            height="5px"
            mr="5px"
          ></Box>
          <Box color={colors[1]}>{props.pair[1]}</Box>
        </Box>
      </Box>
      <Box width="100%">
        <Box
          width="50%"
          borderTopLeftRadius="5px"
          borderBottomLeftRadius="5px"
          borderColor={colors[0]}
          borderStyle="solid"
        ></Box>
        <Box
          width="50%"
          borderTopRightRadius="5px"
          borderBottomRightRadius="5px"
          borderColor={colors[1]}
          borderStyle="solid"
        ></Box>
      </Box>
    </Box>
  );
}
