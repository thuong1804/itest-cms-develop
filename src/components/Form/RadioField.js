import React from 'react';
import { Form, Radio } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';

const RadioField = ({children, disabled, onChange, checked, ...formItemProps}) => {
    const RadioInput = ({...inputProps}) => {
        const {status} = Form.Item.useStatus();

        const onChangeValue = (e) => {
            inputProps.onChange(e);
            onChange?.(e);
        }

        return (
            <Radio
                disabled={disabled}
                {...inputProps}
                onChange={onChangeValue}
                checked={checked}
            >
                {children}
            </Radio>
        )
    }

    return (
        <FormItem
            fieldType={fieldTypes.RADIO}
            valuePropName="checked"
            {...formItemProps}
        >
            <RadioInput/>
        </FormItem>
    )
}

export default RadioField;
