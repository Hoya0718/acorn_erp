import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Vendor.css";

const NewDatePicker = (props) => {
  const CustomInput = forwardRef((props, ref) => (
    <button className="datepicker-input" onClick={props.onClick} ref={ref}>
      {props.value}
    </button>
  ));

  return (
    <div>
      <DatePicker
        selected={props.selectedDate}
        onChange={props.setSelectedDate}
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />}
        showPopperArrow={false}
      />
    </div>
  );
};

export default NewDatePicker;