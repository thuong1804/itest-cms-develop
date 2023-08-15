import React, { useCallback, useEffect, useRef } from "react";
import { Button, Form, Row, Typography } from "antd";

import { BaseTable, BooleanField, TextField } from "@/components";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";
import FormItem from "@/components/Form/FormItem";

import { CloseOutlined, DeleteOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "@/components/QuestionTemplate/Common/AnswerListField/index.module.scss";

const PopupAnswersInput = ({answerType, onClose, hasSwitchQuestion, ...formItemProps}) => {
    const {fieldName} = formItemProps;
    const parentFieldName = fieldName.slice(0, -1);
    const {getFieldValue, setFieldValue} = Form.useFormInstance();
    const {isQuestion = false} = getFieldValue(parentFieldName) || {};
    const ref = useRef(null);

    let data = getFieldValue(fieldName) || [];
    // console.log(fieldName,data)

    const onAddAnswer = () => {
        const newData = [...data.slice(0, -1), {id: data.length - 1, text: '', isCorrect: true}, {}];
        setFieldValue(fieldName, newData);
    }

    const onDeleteAnswer = (id) => {
        setFieldValue([...fieldName, id, 'isDeleted'], true);
    }

    const SwitchQuestion = useCallback(() => (
        <BooleanField
            fieldName={[...parentFieldName, "isQuestion"]}
            defaultChecked={true}
            checkedChildren="Câu hỏi"
            unCheckedChildren="Ví dụ"
            style={{margin: 0}}
        />
    ), []);

    useEffect(() => {
        if (!data?.length) {
            setFieldValue(fieldName, [{id: 0, text: '', isCorrect: true}, {}]);
        } else if (!data.find(item => !Object.keys(item).length)) {
            setFieldValue(fieldName, [...data, {}]);
        }
        setFieldValue([...parentFieldName, 'isQuestion'], true);
    }, [data])

    //autofocus last answer when open.
    useEffect(() => {
        ref.current?.focus();
    });

    const prepareColumns = () => {
        const columns = [

            {
                title: 'Danh sách đáp án',
                dataIndex: 'text',
                render: (text, row, index) => {
                    const number = index + 1;
                    return (
                        Object.keys(row).length ?
                            answerType === "text" ?
                                <TextField
                                    fieldName={[...fieldName, row.id, "text"]}
                                    required
                                    style={{margin: 0}}
                                    innerRef={ref}
                                />
                                :
                                <Row className={styles.image} align="middle">
                                    <UploadFileLocalField
                                        style={{margin: 0}}
                                        acceptType="image/*"
                                        fieldName={[...fieldName, row.id, 'text']}
                                        required
                                        uploadText={<PictureOutlined style={{fontSize: 24}}/>}
                                    />
                                    <Typography.Text>Hình ảnh đáp án {number}</Typography.Text>
                                </Row>
                            :
                            <Button icon={<PlusOutlined/>} onClick={onAddAnswer}>Thêm đáp án</Button>
                    )
                }
            },
            {
                title: <CloseOutlined style={{fontSize: 16}} onClick={onClose}/>,
                dataIndex: 'answer',
                width: 40,
                align: 'center',
                render: (answer, row) => {
                    return (
                        Object.keys(row).length ?
                            <Button
                                type="link"
                                onClick={e => {
                                    e.stopPropagation();
                                    onDeleteAnswer(row.id)
                                }}>
                                <DeleteOutlined/>
                            </Button>
                            : null
                    )
                }
            },
        ]

        if (hasSwitchQuestion) {
            columns.unshift({
                title: 'Đáp án đúng',
                dataIndex: 'id',
                width: 130,
                render: (id, row, index) => {
                    const length = data.filter(item => !item.isDeleted).length;
                    if (index === 0 && Object.keys(row).length) {
                        return {
                            children: <SwitchQuestion/>,
                            props: {
                                rowSpan: length - 1
                            }
                        }
                    }
                    return {
                        props: {
                            rowSpan: index === length - 1 ? 1 : 0
                        }
                    };
                },
            },)
        }

        return columns;
    }

    return (
        <BaseTable
            style={{minWidth: 322}}
            columns={prepareColumns()}
            dataSource={isQuestion ? data?.filter(item => !item.isDeleted) : data?.filter(item => !item.isDeleted).slice(0, 1)}
        />
    )
}

const PopupAnswersField = ({answerType = "text", onClose, hasSwitchQuestion = true, ...formItemProps}) => {
    return (
        <FormItem {...formItemProps}>
            <PopupAnswersInput answerType={answerType} onClose={onClose}
                               hasSwitchQuestion={hasSwitchQuestion} {...formItemProps}/>
        </FormItem>
    )
}

export default PopupAnswersField;