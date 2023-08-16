import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Form, Input, Button, Select, DatePicker, Row, Col, InputNumber } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import { camelCaseToTitleCase, removeAccents } from '@/utils';
import { DATE_FORMAT_DISPLAY, fieldTypes } from '@/constants';

import styles from './SearchForm.module.scss';

const SearchForm = ({
    form,
    searchFields,
    className,
    hiddenAction,
    onResetForm,
    onSubmit
}) => {

    const getPlaceHolder = (item) => {
        return item.searchPlaceholder || `Search by ${camelCaseToTitleCase(item.key)}`
    }

    const getLabelFieldItem = (item) => {
        if (item.isShowFilterLabel)
            return item.title;
        return '';
    }

    const onChangeAutocomplete = (value, item, fieldItem) => {
        const { onChange, reflectFields, isSubmitOnChangeValue } = fieldItem;
        if (isSubmitOnChangeValue) {
            onSubmit(form.getFieldsValue());
        }
        if (onChange) {
            onChange(value, item);
        }
        if (reflectFields) {
            const fileds = reflectFields.split(',');
            fileds.forEach(reflectFieldName => form.setFieldValue(reflectFieldName, undefined))
        }
    }

    const onSelectValue = (value, fieldItem) => {
        const { isSubmitOnChangeValue, onSelectValue } = fieldItem;
        if (isSubmitOnChangeValue) {
            onSubmit(form.getFieldsValue());
        }
        else if (onSelectValue) {
            onSelectValue(value, form);
        }
    }

    const getSelectOptions = (fieldItem) => {
        let { options, initialValue, optionValueKey, optionLabelKey } = fieldItem;
        optionValueKey = optionValueKey || 'value';
        optionLabelKey = optionLabelKey || 'label';
        if (options && options.length > 0)
            return options;
        else if (initialValue)
            return [{ [optionValueKey]: initialValue, [optionLabelKey]: '' }];
        else
            return [];
    }

    const onChangeDateField = (date, fieldItem) => {
        if (fieldItem.onChange) {
            fieldItem.onChange(date);
        }

        if (fieldItem.fieldNameChild) {
            form.setFieldValue(fieldItem.fieldNameChild, null);
        }
    }

    const onFilterOption = (input, option) => {
        return removeAccents((option?.label ?? '')).toLowerCase().includes(removeAccents(input).toLowerCase());
    }

    //remove dropdown selected value when invalid
    useEffect(() => {
        searchFields.forEach(item => {
            const values = form.getFieldsValue();
            const hasNoOption = item.options?.length && item.options.findIndex(op => op.value?.toString() === values[item.key]) < 0;

            if (item.fieldType === fieldTypes.SELECT) {
                if (hasNoOption)
                    form.setFieldValue(item.key, null)
            }
        });
    }, [form, searchFields])

    const renderFormType = (fieldItem) => {
        if (fieldItem === undefined || fieldItem === null) {
            return null
        }
        if (fieldItem.fieldType === fieldTypes.DATE) {
            const dateFormat = fieldItem.format || DATE_FORMAT_DISPLAY;
            return (
                <DatePicker
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultValue={fieldItem.initialValue}
                    format={dateFormat}
                    onChange={(date) => onChangeDateField(date, fieldItem)}
                    disabledDate={fieldItem.disabledDate}
                    style={{ width: '100%' }}
                />
            )
        }
        else if (fieldItem.fieldType === fieldTypes.SELECT) {
            let { optionValueKey, optionLabelKey, loading, allowClear } = fieldItem;
            optionValueKey = optionValueKey || 'value';
            optionLabelKey = optionLabelKey || 'label';

            return (
                <Select
                    showArrow
                    allowClear={allowClear !== false}
                    loading={loading}
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultValue={fieldItem.initialValue}
                    onSelect={(value) => onSelectValue(value, fieldItem)}
                    onChange={(e) => fieldItem.onChange?.(e, form)}
                    style={{ width: '100%' }}
                    mode={fieldItem.mode}
                >
                    {
                        getSelectOptions(fieldItem).map(option =>
                            <Select.Option key={option[optionValueKey]}>
                                {option[optionLabelKey]}
                            </Select.Option>
                        )
                    }
                </Select>
            )
        } else if (fieldItem.fieldType === fieldTypes.AUTOCOMPLETE) {
            let { options, onSearch, optionValueKey, optionLabelKey, optionLabelProp, renderItem, loading, allowClear } = fieldItem;
            optionValueKey = optionValueKey || 'value';
            optionLabelKey = optionLabelKey || 'label';
            optionLabelProp = optionLabelProp || 'children';
            return (
                <Select
                    showSearch
                    showArrow={loading || false}
                    allowClear={allowClear !== false}
                    loading={loading}
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultActiveFirstOption={false}
                    onChange={(value, item) => onChangeAutocomplete(value, item, fieldItem)}
                    onSearch={onSearch}
                    filterOption={onSearch ? false : onFilterOption}
                    optionLabelProp={optionLabelProp}
                    style={{ width: '100%' }}
                    popupClassName={fieldItem.className}
                >
                    {
                        options.map(option =>
                            renderItem
                                ?
                                renderItem(option[optionValueKey], option[optionValueKey], option)
                                :
                                <Select.Option key={option[optionValueKey]}
                                    label={option[optionLabelKey]}>
                                    {option[optionLabelKey]}
                                </Select.Option>
                        )
                    }
                </Select>
            )
        } else if (fieldItem.fieldType === fieldTypes.NUMBER) {
            return (
                <InputNumber
                    defaultValue={fieldItem.initialValue}
                    placeholder={getPlaceHolder(fieldItem)}
                    className={styles.inputNumber} />
            )
        } else {
            return (<Input defaultValue={fieldItem.initialValue} placeholder={getPlaceHolder(fieldItem)} />)
        }
    }

    return (
        <Form
            form={form}
            layout="inline"
            onFinish={onSubmit}
            className={classNames(styles.searchForm, { [className]: !!className })}
        >
            {
                <Row gutter={[16, 16]} className={styles.wrapper}>
                    {
                        searchFields.map((fieldItem, index) =>
                            <Col
                                key={fieldItem.key}
                                span={fieldItem.gridCol || 8}
                                className={classNames(styles.item, { [styles.last]: index === searchFields.length - 1 })}
                            >
                                <Form.Item
                                    label={getLabelFieldItem(fieldItem)}
                                    name={fieldItem.key}
                                    className={fieldItem.className}
                                >
                                    {
                                        renderFormType(fieldItem)
                                    }
                                </Form.Item>
                            </Col>
                        )
                    }
                    {
                        hiddenAction
                            ?
                            null
                            :
                            <Col className={styles.actions}>
                                <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                                    Search
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={onResetForm} icon={<CloseOutlined />}>
                                    Clear
                                </Button>
                            </Col>
                    }
                </Row>
            }

        </Form>
    );
}

export default SearchForm;