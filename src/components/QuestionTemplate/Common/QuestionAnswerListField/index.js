import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "antd";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import AnswerListField from "@/components/QuestionTemplate/Common/AnswerListField";
import QuestionField from "@/components/QuestionTemplate/Common/QuestionField";
import { useNotification } from "@/hooks";
import FormItem from "@/components/Form/FormItem";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";

import { PlusOutlined } from "@ant-design/icons";

import styles from "@/components/QuestionTemplate/Template/MC10/index.module.scss";

const QuestionAnswerInput = ({
                                 requiredQuestion,
                                 fieldName,
                                 answerType = "text",
                                 rightToolbarType,
                                 hasQuestion,
                                 isMultipleCorrectAnswer,
                                 hasImage,
                             }) => {
    const {id} = useParams();
    const isCreating = !id;
    const {showErrorMessage} = useNotification();
    const {setFieldValue, getFieldValue} = Form.useFormInstance();

    const [questionNumber, setQuestionNumber] = useState(() => {
        return Array.from(Array(1).keys());
    });

    const onAddQuestion = () => {
        const answers = getFieldValue(fieldName);
        const newIndex = answers.length;

        setQuestionNumber([...questionNumber, newIndex]);
        setFieldValue([fieldName, newIndex, "isQuestion"], true);
    }

    const onDeleteQuestion = (index) => {
        if (questionNumber.length > 1) {
            setFieldValue([fieldName, index, "isDeleted"], true);
            setQuestionNumber(questionNumber.filter(item => item !== index));
        } else {
            showErrorMessage("Phải có ít nhất 1 câu hỏi");
        }
    }

    useEffect(() => {
        if (!isCreating) {
            const answerGroups = getFieldValue(fieldName);
            setQuestionNumber(Array.from(Array(answerGroups.length).keys()))
        }
    }, [isCreating])

    return (
        <Row gutter={16}>
            {questionNumber.map(index => (
                <React.Fragment key={index}>
                    {hasImage ?
                        <Col span={8} style={{marginTop: 30}}>
                            <UploadFileLocalField
                                fieldName={[fieldName, index, "image"]}
                                className={classNames(styles.uploadImageWrapper, styles.questionImage)}
                                acceptType="image/*"
                                required
                                uploadText="Hình ảnh"
                            />
                        </Col> : null
                    }
                    <Col span={hasImage ? 16 : 24}>
                        {hasQuestion ?
                            <QuestionField
                                fieldName={[fieldName, index, "questionText"]}
                                label="Câu hỏi"
                                notAllowWhiteSpace
                                onDeleteQuestion={() => onDeleteQuestion(index)}
                                maxLength={10000}
                                required={requiredQuestion}
                            />
                            : null
                        }
                        <AnswerListField
                            fieldName={[fieldName, index, "answers"]}
                            answerType={answerType}
                            rightToolbarType={rightToolbarType}
                            onDelete={hasQuestion ? false : () => onDeleteQuestion(index)}
                            isMultiple={isMultipleCorrectAnswer}
                        />
                    </Col>
                </React.Fragment>
            ))}
            {questionNumber.length < 26 ?
                <Button onClick={onAddQuestion} icon={<PlusOutlined/>}>Thêm câu hỏi</Button> : null}
        </Row>
    )
}

const QuestionAnswerListField = ({
                                     requiredQuestion = false,
                                     answerType,
                                     hasQuestion = true,
                                     rightToolbarType = "highLightText",
                                     hasImage = false,
                                     isMultipleCorrectAnswer,
                                     ...formItemProps
                                 }) => {
    return (
        <FormItem {...formItemProps} initialValue={[]}>
            <QuestionAnswerInput requiredQuestion={requiredQuestion} fieldName={formItemProps.fieldName}
                                 answerType={answerType} hasQuestion={hasQuestion} hasImage={hasImage}
                                 isMultipleCorrectAnswer={isMultipleCorrectAnswer} rightToolbarType={rightToolbarType}/>
        </FormItem>
    )
}

export default QuestionAnswerListField;