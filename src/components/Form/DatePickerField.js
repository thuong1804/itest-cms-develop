import { DatePicker } from "antd";
import FormItem from "./FormItem";
import { fieldTypes } from "@/constants";

const {RangePicker} = DatePicker;

const MODE = {
    SINGLE: 'single',
    RANGER: 'ranger',
}

const DatePickerField = ({mode, disabled, onChange, ...formItemProps}) => {
    const DatePickerInput = ({ ...dateProps }) => {
        return (
            <DatePicker disabled={disabled} onChange={onChange} { ...dateProps }/>
        )
    }

    const RangerPickerInput = ({ ...dateProps }) => {
        return (
            <RangePicker disabled={disabled} onChange={onChange} { ...dateProps }/>
        )
    }

    return (
        <FormItem 
            fieldType={fieldTypes.DATE}
            {...formItemProps}
        >
            {
                mode === MODE.RANGER ?
                    <RangerPickerInput/>
                    :
                    <DatePickerInput/>
            }
        </FormItem>
    )
}

export default DatePickerField;