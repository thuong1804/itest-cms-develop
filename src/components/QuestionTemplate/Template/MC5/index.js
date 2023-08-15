import React from "react";
import { Col, Row } from "antd";

import TextAreaField from "@/components/Form/TextAreaField";
import QuestionField from "@/components/QuestionTemplate/Common/QuestionField";
import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import QuestionAnswerListField from "@/components/QuestionTemplate/Common/QuestionAnswerListField";
import useNotification from "@/hooks/useNotification";

import styles from "./index.module.scss";
import { validationNumberQuestionOrExample } from "@/utils/validator";

const MC5 = ({onPreview}) => {
    const {showErrorMessage} = useNotification();

    return (
        <QuestionWrapper
            title="MULTIPLE CHOICE - TYPE 5"
            type="inner"
            onPreview={onPreview}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <QuestionField
                        fieldName="parentQuestionText"
                        label="Nội dung bài đọc"
                        isDelete={false}
                        isSwitchQuestion={false}
                        isAddInput={false}
                        required
                        style={{height: 'calc(100%)'}}
                        maxLength={10000}
                        formItemClassName={styles.descriptionField}
                    />
                </Col>
                <Col span={12}>
                    <TextAreaField
                        label="Yêu cầu đề bài"
                        name="parentQuestionDescription"
                        required
                        rows={2}
                        maxLength={2000}
                        showCount
                        disableKeys={["#", "*"]}
                    />
                    <QuestionAnswerListField
                        validators={validationNumberQuestionOrExample(showErrorMessage)}
                        fieldName="answerGroups"
                        requiredQuestion={true}
                    />
                </Col>
            </Row>
        </QuestionWrapper>
    )
}

export default MC5;
