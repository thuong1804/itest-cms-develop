import React, { useCallback } from 'react';

import { Input } from 'antd';

import FormItem from './FormItem';

const {TextArea} = Input;

const TextField = ({
                       maxLength = 255,
                       maxLengthMsg,
                       type,
                       disabled,
                       onBlur,
                       defaultValue,
                       prefix,
                       notAllowWhiteSpace,
                       showCount,
                       rows = 2,
                       disableKeys = [],
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

    const InputAreaText = useCallback(({getPlaceHolder, ...inputProps}) => {
        const handleChange = (e) => {
            let value = e.target.value
            inputProps.onChange?.(value);
        }

        const onKeyDown = (e) => {
            if ([...disableKeys].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        return (
            <TextArea
                placeholder={getPlaceHolder()}
                defaultValue={defaultValue}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
                prefix={prefix}
                {...(showCount ? {showCount, maxLength} : {})}
                rows={rows}
                {...inputProps}
                onChange={handleChange}
                onKeyDown={onKeyDown}
            />
        )
    }, [type, prefix, showCount, maxLength, rows, disabled, defaultValue])

    return (
        <FormItem
            {...formItemProps}
            fieldRules={getTextFieldRules()}
        >
            <InputAreaText/>
        </FormItem>
    )
}

export default TextField;
