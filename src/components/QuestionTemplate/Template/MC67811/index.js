import React from "react";
import { Col, Row } from "antd";

import TextAreaField from "@/components/Form/TextAreaField";
import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";
import QuestionAnswerListField from "@/components/QuestionTemplate/Common/QuestionAnswerListField";
import { useNotification } from "@/hooks";

import { CustomerServiceOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";
import { validationNumberQuestionOrExample } from "@/utils/validator";

const MC678 = ({
                   answerType,
                   title,
                   hasAudio = true,
                   onPreview,
                   hasQuestion,
                   rightToolbarType,
                   questionDesFieldName = 'parentQuestionDescription',
                   isMultipleCorrectAnswer,
                   requiredQuestion,
               }) => {
    const {showErrorMessage} = useNotification();
    return (
        <QuestionWrapper
            title={title}
            type="inner"
            onPreview={onPreview}
        >
            <Row gutter={16}>
                {hasAudio ? <Col span={10}>
                    <UploadFileLocalField
                        fieldName="audio"
                        className={styles.uploadImageWrapper}
                        acceptType=".mp3"
                        type="audio"
                        required
                        uploadText={<CustomerServiceOutlined style={{fontSize: 32}}/>}
                    />
                    <TextAreaField
                        label="Nội dung bài nghe"
                        name="audioScript"
                        rows={10}
                        maxLength={10000}
                        showCount
                    />
                </Col> : null}
                <Col span={hasAudio ? 14 : 24}>
                    <TextAreaField
                        label="Yêu cầu đề bài"
                        name={questionDesFieldName}
                        required
                        rows={2}
                        showCount
                        maxLength={2000}
                        disableKeys={["#", "*"]}
                    />
                    <QuestionAnswerListField
                        validators={validationNumberQuestionOrExample(showErrorMessage)}
                        fieldName="answerGroups"
                        requiredQuestion={requiredQuestion}
                        answerType={answerType}
                        hasQuestion={hasQuestion}
                        rightToolbarType={rightToolbarType}
                        isMultipleCorrectAnswer={isMultipleCorrectAnswer}
                    />
                </Col>
            </Row>
        </QuestionWrapper>
    )
}

export default MC678;
