function formatNum(number) {
  if (number === null) {
    return "NA";
  } else if (number < 1000) {
    return number.toFixed(2);
  } else if (number < 1000000) {
    return (number * 0.001).toFixed(1) + "K";
  } else if (number < 1000000000) {
    return (number * 0.000001).toFixed(1) + "M";
  } else if (number < 1000000000000) {
    return (number * 0.000000001).toFixed(1) + "B";
  } else {
    return (number * 0.000000000001).toFixed(1) + "T";
  }
}

export { formatNum };
