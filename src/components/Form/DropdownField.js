import React, { useCallback, useState } from "react";
import { Select } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';
import { removeAccents } from "@/utils";

const DropdownField = ({
                           loading,
                           disabled,
                           mode,
                           options,
                           optionValue,
                           optionLabel,
                           optionOther,
                           onChange,
                           onSelect,
                           defaultValue,
                           allowClear,
                           showSearch,
                           onFilterSearch,
                           renderLabel,
                           ...formItemProps
                       }) => {
    const optionValueKey = optionValue || 'value';
    const optionLabelKey = optionLabel || 'label';
    const optionOtherKey = optionOther || 'other';

    const DropdownInput = useCallback(({getPlaceHolder, ...inputProps}) => {
        const onSearch = (input, option) => {
            if (!onFilterSearch) {
                return removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input).toLowerCase())
            }
        }

        const onChangeValue = (e) => {
            inputProps.onChange(e);

            onChange?.(e);
        }
        return (
            <Select
                allowClear={allowClear ?? !loading}
                showArrow
                loading={loading}
                placeholder={getPlaceHolder()}
                mode={mode}
                disabled={disabled}
                onSelect={onSelect}
                defaultValue={defaultValue}
                getPopupContainer={(trigger) => trigger.parentElement}
                {...(showSearch ? {
                    showSearch,
                    filterOption: onSearch
                } : {})}
                {...inputProps}
                onChange={onChangeValue}
            >
                {options?.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {Array.isArray(item.options) ?
                                <Select.OptGroup label={item.label}>
                                    {item.options.map(op =>
                                        <Select.Option
                                            key={op[optionValueKey]}
                                            value={op[optionValueKey]}
                                            label={op.label}
                                            other={op[optionOtherKey]}
                                            disabled={op.disabled}
                                        >
                                            {renderLabel ? renderLabel(op) : op[optionLabelKey]}
                                        </Select.Option>
                                    )}
                                </Select.OptGroup>
                                :
                                <Select.Option
                                    key={item[optionValueKey]}
                                    value={item[optionValueKey]}
                                    label={item.label}
                                    other={item[optionOtherKey]}
                                    disabled={item.disabled}
                                >
                                    {renderLabel ? renderLabel(item) : item[optionLabelKey]}
                                </Select.Option>
                            }
                        </React.Fragment>
                    )
                })}
            </Select>
        )
    }, [options, loading, onSelect, defaultValue, disabled])

    return (
        <FormItem
            fieldType={fieldTypes.SELECT}
            {...formItemProps}
        >
            <DropdownInput/>
        </FormItem>
    )
}

export default DropdownField;
