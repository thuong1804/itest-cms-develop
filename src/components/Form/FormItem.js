import { Form } from 'antd';
import { cloneElement } from 'react';

import { fieldTypes } from '@/constants';

import styles from './FormItem.module.scss';
import classNames from "classnames";

const FormItem = ({
    label,
    fieldType,
    fieldName,
    fieldRules,
    hidden,
    placeholder,
    required,
    requiredMsg,
    validators,
    children,
    className,
    ...formItemProps
}) => {

    const getPlaceHolder = () => {
        if (placeholder) {
            return placeholder;
        }
        if (!label) {
            return '';
        }
        let action = '';
        switch (fieldType) {
            case fieldTypes.SELECT:
            case fieldTypes.AUTOCOMPLETE:
            case fieldTypes.DATE:
                action = 'Vui lòng chọn';
                break;
            case fieldTypes.UPLOAD:
            case fieldTypes.RADIO:
                action = 'Vui lòng chọn';
                break
            default:
                action = 'Vui lòng nhập';
                break;
        }

        return `${action} ${label?.toLowerCase() || ''}`;
    }

    const getRequiredMsg = () => {
        if (requiredMsg) {
            return requiredMsg;
        }
        if (!label) {
            return '';
        }

        return `${label} không được bỏ trống`;
    }

    const getRules = () => {
        const rules = [];
        if (required) {
            rules.push({
                required,
                message: getRequiredMsg()
            })
        }

        if (fieldRules?.length > 0) {
            fieldRules.forEach(validator => {
                rules.push(validator);
            });
        }

        if (validators?.length > 0) {
            validators.forEach(validator => {
                rules.push(validator);
            });
        }

        return rules;
    }

    return (
        <Form.Item
            label={label}
            name={fieldName}
            rules={[
                ...getRules()
            ]}
            hidden={hidden}
            className={classNames(styles.formItem, className)}
            {...formItemProps}
        >
            {cloneElement(children, {
                ...(fieldType !== fieldTypes.BOOLEAN && { getPlaceHolder })
            })}
        </Form.Item>
    )
}

export default FormItem;
