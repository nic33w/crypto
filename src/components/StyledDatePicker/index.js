import DatePicker from "react-datepicker";
import styled from "styled-components";
import { getBackgroundColor } from "../../utils/numberFormat.tsx";

const StyledDatePicker = styled(DatePicker)`
  ${getBackgroundColor}
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-style: none;
  padding: 10px;
  width: 100%;
  margin: 5px;
`;

export default StyledDatePicker;
