import React, { useCallback } from 'react';
import { Form, Radio } from 'antd';
import classNames from "classnames";

import { fieldTypes } from '@/constants';
import FormItem from "@/components/Form/FormItem";

import styles from "./index.module.scss";

const RadioQuestionField = ({children, disabled, onChange, checked, onClick, ...formItemProps}) => {
    const RadioInput = useCallback(({...inputProps}) => {
        const {status} = Form.Item.useStatus();

        const onChangeValue = (e) => {
            inputProps.onChange?.(e);
            onChange?.(e);
        }

        return (
            <div className={classNames(styles.inputRadioField, {
                [styles.error]: status === 'error',
            })}>
                <Radio
                    disabled={disabled}
                    {...inputProps}
                    onChange={onChangeValue}
                    checked={checked}
                    onClick={onClick}
                >
                    {children}
                </Radio>
            </div>
        )
    }, [checked, children, disabled, onChange])

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

export default RadioQuestionField;
