import React from 'react';

import { InputNumber } from 'antd';

import FormItem from './FormItem';
import { formatNumber } from '@/utils';
import { fieldTypes } from '@/constants';

const NumericField = ({
    disabled,
    min,
    max,
    defaultValue,
    width,
    onChange,
    ...formItemProps
}) => {
    const NumericInput = ({ getPlaceHolder, ...inputProps }) => (
        <InputNumber
            max={max}
            min={min}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            formatter={value => formatNumber(value)}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={getPlaceHolder()}
            style={{width: width || '60%'}}
            {...inputProps}
        />
    )
    return (
        <FormItem
            fieldType={fieldTypes.NUMBER}
            {...formItemProps}
        >
            <NumericInput />
        </FormItem>
    )
}

export default NumericField;
