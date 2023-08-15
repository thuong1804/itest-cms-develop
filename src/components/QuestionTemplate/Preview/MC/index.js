import React from "react";
import { Col, Row, Typography } from "antd";
import classNames from "classnames";

import InputRadioField from "@/components/QuestionTemplate/Common/InputRadioField";
import { generateCndImageUrl } from "@/utils";
import { convertStrToHtml } from "@/components/QuestionTemplate/Utils";
import { questionTypes } from "@/constants";

import styles from "./index.module.scss";

const MCPreview = ({data}) => {
    const {answerGroups, image, audio, questionType, parentQuestionText} = data;
    const isTwoColumn = (image || audio || parentQuestionText);
    const isAnswerImage = [questionTypes.MC8, questionTypes.MC7, questionTypes.MC11].includes(questionType);

    const answers = answerGroups.filter(item => item.isQuestion && !item.isDeleted);
    const examples = answerGroups.filter(item => !item.isQuestion && !item.isDeleted);
    const hasNoQuestion = [questionTypes.MC3, questionTypes.MC4].includes(questionType) || !answers?.length;
    const hasNoExample = [questionTypes.MC3, questionTypes.MC4].includes(questionType) || !examples?.length;

    const renderList = (data = []) => {
        return (
            data.map((example, index) => (
                <div className={styles.listItem} key={example.id}>
                    <Col span={24}>
                        <p dangerouslySetInnerHTML={{__html: convertStrToHtml(example.questionText || '').replaceAll("##", "__________")}}/>
                    </Col>
                    <Row>
                        {example.image ?
                            <Col span={6}>
                                <img
                                    src={typeof example.image === 'object' ? URL.createObjectURL(example.image) : generateCndImageUrl(example.image)}
                                    alt=""
                                    width="100" height="auto"/>
                            </Col> : null}
                        <Col span={example.image ? 16 : 24}>
                            {example.answers.filter(item => !item.isDeleted).map((answer, aIdx) => (
                                <Col span={24} key={aIdx}>
                                    <Row align="middle" gutter={16}>
                                        <Col>
                                            <InputRadioField checked={answer.isCorrect}
                                                             style={{margin: 0, minWidth: 50, pointerEvents: "none"}}/>
                                        </Col>
                                        <Col>
                                            {isAnswerImage ?
                                                <img
                                                    src={typeof answer.text === 'object' ? URL.createObjectURL(answer.text) : generateCndImageUrl(answer.text)}
                                                    alt=""
                                                    width="100" height="auto"/>
                                                :
                                                <p dangerouslySetInnerHTML={{__html: convertStrToHtml(answer.text)}}
                                                   className={classNames(styles.questionText, {
                                                       [styles.correct]: answer.isCorrect
                                                   })}/>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Col>
                    </Row>
                </div>
            ))
        )
    }

    return (
        <Row gutter={50} style={{marginTop: 20}}>
            {image ?
                <Col span={8} style={{marginTop: 30}}>
                    <img src={typeof image === 'object' ? URL.createObjectURL(image) : generateCndImageUrl(image)}
                         alt="" width="100%" height="auto"/>
                </Col> : null}
            {audio ?
                <Col span={8} style={{marginTop: 30}}>
                    <audio
                        controls>
                        <source
                            src={typeof audio === 'object' ? URL.createObjectURL(audio) : generateCndImageUrl(audio)}
                            type="audio/mpeg"
                        />
                    </audio>
                </Col> : null}
            {parentQuestionText ?
                <Col span={8} style={{marginTop: 30, textAlign: "justify"}}>
                    <p dangerouslySetInnerHTML={{__html: convertStrToHtml(parentQuestionText)}}/>
                </Col> : null}
            <Col span={isTwoColumn ? 16 : 24}>
                {!hasNoExample ? <Col span={24}>
                    <Typography.Text className={styles.example}>Ví dụ:</Typography.Text>
                </Col> : null}
                {renderList(examples)}

                {!hasNoQuestion ? <Col span={24}>
                    <Typography.Text className={styles.question}>Câu hỏi:</Typography.Text>
                </Col> : null}
                {renderList(answers)}
            </Col>
        </Row>
    )
}

export default MCPreview;