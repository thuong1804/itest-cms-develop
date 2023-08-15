import React from "react";
import { Col, Row } from "antd";

import TextAreaField from "@/components/Form/TextAreaField";
import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import QuestionAnswerListField from "@/components/QuestionTemplate/Common/QuestionAnswerListField";
import useNotification from "@/hooks/useNotification";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";

import styles from "./index.module.scss";
import { validationNumberQuestionOrExample } from "@/utils/validator";

const MC2 = ({onPreview}) => {
    const {showErrorMessage} = useNotification();
    return (
        <QuestionWrapper
            title="MULTIPLE CHOICE - TYPE 2"
            type="inner"
            onPreview={onPreview}
        >
            <Row gutter={16}>
                <Col span={12} style={{maxHeight: 500}}>
                    <UploadFileLocalField
                        fieldName="image"
                        maxCount={1}
                        className={styles.uploadImageWrapper}
                        uploadText="Hình ảnh"
                        acceptType="image/*"
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
                        requiredQuestion={true}/>
                </Col>
            </Row>
        </QuestionWrapper>
    )
}

export default MC2;
