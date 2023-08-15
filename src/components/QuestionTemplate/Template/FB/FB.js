import React, { useEffect } from "react";
import { Col, Form, Row } from "antd";

import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import TextAreaField from "@/components/Form/TextAreaField";
import QuestionField from "@/components/QuestionTemplate/Common/QuestionField";
import { TextField } from "@/components";
import UploadFileLocalField from "@/components/Form/UploadFileLocalField";

import { CustomerServiceOutlined } from "@ant-design/icons";

import styles from "@/components/QuestionTemplate/Template/MC67811/index.module.scss";

const FB = ({title, onPreview, hasKeyWord, hasAudio, hasSwitchQuestionTable, isMultiTab}) => {
    const isMultipleRow = hasKeyWord || hasAudio;

    return (
        <QuestionWrapper title={title} onPreview={onPreview}>
            <Row gutter={16} justify="center">
                {hasKeyWord ?
                    <Col span={12} style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                        <TextField
                            fieldName="answers"
                            label="Từ khóa"
                            required
                            style={{width: '50%'}}
                        />
                    </Col> : null
                }
                {hasAudio ?
                    <Col span={12}>
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
                            rows={5}
                            maxLength={10000}
                            showCount
                        />
                    </Col> : null
                }
                <Col span={isMultipleRow ? 12 : 24}>
                    <TextAreaField
                        label="Yêu cầu đề bài"
                        name="questionDescription"
                        required
                        rows={2}
                        showCount
                        maxLength={2000}
                        disableKeys={["#", "*"]}
                    />
                    <QuestionField
                        fieldName={["answerGroups", 0, "questionText"]}
                        label="Câu hỏi"
                        notAllowWhiteSpace
                        maxLength={10000}
                        required
                        hasAnswerPopup={true}
                        isSwitchQuestion={false}
                        isMultiTab={isMultiTab}
                        hasSwitchQuestionTable={hasSwitchQuestionTable}
                        validators={
                            [({getFieldValue}) => {
                                return {
                                    validator: (_, value) => {
                                        const answerGroups = getFieldValue(["answerGroups"]).filter(item => !item.isDeleted);
                                        console.log(getFieldValue(["answerGroups"]), answerGroups.every(item => item.answers.slice(0, -1).every(ans => ans.text)))
                                        if(!answerGroups.every(item => item.answers.slice(0, -1).every(ans => ans.text))){
                                            return Promise.reject("Vui lòng nhập câu hỏi và đáp án!");
                                        }

                                        return Promise.resolve();
                                    }
                                }
                            }
                            ]
                        }
                    />
                </Col>
            </Row>
        </QuestionWrapper>
    )
}
export default FB;