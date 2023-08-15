import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Row, Table, Typography } from "antd";
import classNames from "classnames";

import { BooleanField } from "@/components";
import FormItem from "@/components/Form/FormItem";
import Toolbar from "@/components/QuestionTemplate/Common/Toolbar";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";
import ContentEditAbleField from "@/components/QuestionTemplate/Common/ContentEditAbleField";
import { useNotification } from "@/hooks";
import RadioQuestionField from "@/components/QuestionTemplate/Common/InputRadioField";

import { DeleteOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

const InputListQuestion = ({defaultNumber, answerType, rightToolbarType, onDelete, isMultiple, ...formItemProps}) => {
    const {fieldName} = formItemProps;
    const {setFieldValue, getFieldValue} = Form.useFormInstance();
    const {showErrorMessage} = useNotification();
    const [dataSource, setDataSource] = useState(() => {
        const temp = Array.from(Array(defaultNumber)).map((_, index) => ({id: index, text: ''}));
        return [...temp, {}];
    });

    useEffect(() => {
        const answers = getFieldValue(fieldName);
        if (answers?.length) {
            setDataSource([...answers, {}]);
            const correctAnswers = answers.reduce((curr, item, index) => {
                if (item.isCorrect) {
                    curr = {...curr, [`radio${index}`]: true}
                }
                return curr;
            }, {});
            setAnswer(correctAnswers)
        } else {
            setFieldValue(fieldName, dataSource.slice(0, -1));
        }
    }, [])

    const [answer, setAnswer] = useState({});

    const onAddAnswerInput = () => {
        const newData = [...dataSource];
        const answers = getFieldValue(fieldName);
        newData.splice(dataSource.length - 1, 0, {id: answers.length, text: ''});

        setDataSource([...newData]);
    }

    const onDeleteAnswer = (id) => {
        if (dataSource.length > 2) {
            setDataSource(dataSource.filter(item => item.id !== id));

            //reset radio correct answer to validate when correct answer be deleted.
            const isDeleteCorrectAnswer = answer[`radio${id}`];
            if (isDeleteCorrectAnswer) {
                setFieldValue([...fieldName.slice(0, -1), 'isCorrect'], undefined);
            }

            //mark this row as deleted
            setFieldValue([...fieldName, id, "isDeleted"], true);
        } else {
            showErrorMessage("Phải có ít nhất một câu trả lời!");
        }
    }

    const SwitchQuestion = useCallback(() => (
        <BooleanField
            fieldName={[...fieldName.slice(0, -1), "isQuestion"]}
            defaultChecked={true}
            checkedChildren="Câu hỏi"
            unCheckedChildren="Ví dụ"
            style={{margin: 0}}
        />
    ), []);

    const renderRightToolbar = () => {
        if (rightToolbarType === 'highLightText') {
            return <Toolbar isAddInput={false}/>
        }

        if (rightToolbarType === 'switch') {
            return <SwitchQuestion/>
        }
    }

    const onCheckAnswer = (e, id) => {
        if (isMultiple) {
            setAnswer({...answer, [`radio${id}`]: e.target.checked});
        } else {
            setAnswer({[`radio${id}`]: e.target.checked});
        }
    }

    const onClickAnswer = (e, id) => {
        if (isMultiple && e.target.checked) {
            setAnswer({...answer, [`radio${id}`]: false});
        }
    }

    const prepareColumns = () => {
        const columns = [
            {
                title: 'Đáp án đúng',
                dataIndex: 'id',
                width: 130,
                render: (id, row) => {
                    return (
                        Object.keys(row).length ?
                            <Row justify="center" align="middle">
                                <RadioQuestionField
                                    fieldName={[...fieldName.slice(0, -1), 'isCorrect']}
                                    checked={answer[`radio${id}`]}
                                    onChange={(e) => onCheckAnswer(e, id)}
                                    onClick={(e) => onClickAnswer(e, id)}
                                    required
                                    style={{margin: 0}}
                                />
                            </Row>
                            :
                            null
                    )
                }
            },
            {
                title: 'Danh sách đáp án',
                dataIndex: 'text',
                render: (text, row, index) => {
                    const number = index + 1;
                    return (
                        Object.keys(row).length ?
                            answerType === "text" ?
                                <ContentEditAbleField
                                    fieldName={[...fieldName, row.id, 'text']}
                                    style={{
                                        margin: 0,
                                        overflowX: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    required
                                    notAllowWhiteSpace
                                    disableTab={true}
                                    disableKeys={["*", "#", "Enter"]}
                                    placeholder={`Đáp án ${number}`}/>
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
                            <Button onClick={onAddAnswerInput} icon={<PlusOutlined/>}>Thêm đáp án</Button>
                    )
                }
            },
            {
                title: renderRightToolbar(),
                dataIndex: 'answer',
                width: 120,
                render: (answer, row) => {
                    return (
                        Object.keys(row).length ?
                            <Button
                                type="link"
                                onClick={e => {
                                    e.stopPropagation();
                                    onDeleteAnswer(row.id, row.isCorrect)
                                }}>
                                <DeleteOutlined/>
                            </Button>
                            : null
                    )
                }
            },
        ]

        if (onDelete) {
            columns.push({
                title: <DeleteOutlined onClick={onDelete}/>,
                width: 50,
            })
        }

        return columns;
    }

    useEffect(() => {
        if (Object.keys(answer).length) {
            const answers = getFieldValue(fieldName);
            const newAnswers = answers.map((item, index) => {
                return {...item, isCorrect: !!answer[`radio${index}`]}
            });

            setFieldValue(fieldName, newAnswers);
        }
    }, [answer])

    const {status} = Form.Item.useStatus();

    return (
        <Table
            rowKey={(record) => record.id}
            columns={prepareColumns()}
            dataSource={dataSource}
            pagination={false}
            tableLayout="fixed"
            className={classNames({
                [styles.error]: status === "error"
            })}
        />
    );
}

const AnswerListField = ({
                             defaultNumber = 4,
                             answerType = 'text',
                             rightToolbarType,
                             hasSwitch,
                             onDelete,
                             isMultiple = false,
                             ...formItemProps
                         }) => {
    return (
        <FormItem {...formItemProps}>
            <InputListQuestion {...formItemProps} defaultNumber={defaultNumber} answerType={answerType}
                               rightToolbarType={rightToolbarType} onDelete={onDelete} isMultiple={isMultiple}/>
        </FormItem>
    )
}

export default React.memo(AnswerListField);