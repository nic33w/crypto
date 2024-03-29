function formatNum(number: number): string {
  if (number === null) {
    return "NA";
  } else if (Math.abs(number) < 1000) {
    return number.toFixed(2);
  } else if (Math.abs(number) < 1000000) {
    return (number * 0.001).toFixed(1) + "K";
  } else if (Math.abs(number) < 1000000000) {
    return (number * 0.000001).toFixed(1) + "M";
  } else if (Math.abs(number) < 1000000000000) {
    return (number * 0.000000001).toFixed(1) + "B";
  } else {
    return (number * 0.000000000001).toFixed(1) + "T";
  }
}

function formatNumExact(number: number): string {
  if (number > 1) {
    return number.toLocaleString();
  } else {
    return number + "";
  }
}

const getBackgroundColor = (props: {
  bgColor: number;
  theme: { backgroundColor: string[] };
}) => {
  if (props.bgColor !== undefined) {
    return `background-color: ${props.theme.backgroundColor[props.bgColor]};`;
  }
};

function getCurrencySymbol(currency: string) {
  switch (currency) {
    case "usd":
      return "$";
    case "gbp":
      return "£";
    case "eur":
      return "€";
    case "btc":
      return "₿";
    case "eth":
      return "Ξ";
    default:
      return "";
  }
}

export { formatNum, formatNumExact, getBackgroundColor, getCurrencySymbol };
