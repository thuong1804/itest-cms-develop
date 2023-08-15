import React from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';

const BooleanField = ({
                          disabled,
                          onChange,
                          checkedChildren,
                          unCheckedChildren,
                          defaultChecked = false,
                          ...formItemProps
                      }) => {

    const BooleanInput = ({...inputProps}) => (
        <Switch
            disabled={disabled}
            onChange={onChange}
            defaultChecked={defaultChecked}
            checkedChildren={checkedChildren || <CheckOutlined/>}
            unCheckedChildren={unCheckedChildren || <CloseOutlined/>}
            {...inputProps}
        />
    )
    return (
        <FormItem
            fieldType={fieldTypes.BOOLEAN}
            valuePropName="checked"
            {...formItemProps}
        >
            <BooleanInput/>
        </FormItem>
    )
}

export default BooleanField;
