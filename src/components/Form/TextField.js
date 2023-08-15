import React, { useCallback } from 'react';

import { Input } from 'antd';

import FormItem from './FormItem';

const TextField = ({
                       maxLength = 255,
                       maxLengthMsg,
                       type,
                       disabled,
                       onBlur,
                       defaultValue,
                       prefix,
                       notAllowWhiteSpace,
                       onlyNumber,
                       autoFocus,
                       innerRef,
                       ...formItemProps
                   }) => {

    const getMaxLengthMsg = () => {
        return maxLengthMsg || `${formItemProps.label} chỉ chứa tối đa ${maxLength} ký tự`;
    }

    const getTextFieldRules = () => {
        const rules = [];
        if (maxLength) {
            rules.push({max: maxLength, message: getMaxLengthMsg()});
        }
        if (notAllowWhiteSpace) {
            rules.push({whitespace: true, message: 'Không được phép nhập giá trị chỉ có khoảng trắng!'});
        }
        return rules;
    }

    const InputText = useCallback(({getPlaceHolder, ...inputProps}) => {
        const handleChange = (e) => {
            let value = e.target.value
            if (onlyNumber) {
                value = e.target.value.replace(/\D/g, '')
            }
            inputProps.onChange?.(value);
        }

        return (
            <Input
                placeholder={getPlaceHolder()}
                defaultValue={defaultValue}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
                prefix={prefix}
                ref={innerRef}
                {...inputProps}
                autoFocus={autoFocus}
                onChange={handleChange}
            />
        )
    }, [defaultValue, type, onBlur, prefix, disabled])

    return (
        <FormItem
            {...formItemProps}
            fieldRules={getTextFieldRules()}
        >
            <InputText/>
        </FormItem>
    )
}

export default TextField;
