import React from 'react';
import { Checkbox } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';

const CheckboxField = ({ children, disabled, onChange, ...formItemProps }) => {

    const CheckboxInput = ({ ...inputProps }) => (
        <Checkbox
            disabled={disabled}
            onChange={onChange}
            {...inputProps}
        >
            {children}
        </Checkbox>
    )
    return (
        <FormItem
            fieldType={fieldTypes.CHECKBOX}
            valuePropName="checked"
            {...formItemProps}
        >
            <CheckboxInput />
        </FormItem>
    )
}

export default CheckboxField;
