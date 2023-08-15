import React, { cloneElement, useEffect, useState } from "react";
import { Col, Form, Row, Tooltip, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { AsyncDropdownField, BooleanField, DropdownField } from "@/components";
import { cleanObject, mappingDropdownData, mappingDropdownSeries } from "@/utils";
import { gradeActions, seriesActions } from "@/redux/actions";
import {
    cerfDDL,
    formatDDL,
    levelDDL,
    publisherDDL,
    questionSourceDDL,
    skillDDL,
    typeDDL
} from "@/constants/masterData";
import {
    convertDBStrToFormData,
    getAnswersMC11, getCorrectAnswers, getImagesMC910, getQuestionText,
    prepareFormData,
    sortQuestion
} from "@/components/QuestionTemplate/Utils";
import { bookTypes, questionTypeDes, questionTypes } from "@/constants";
import MC2 from "@/components/QuestionTemplate/Template/MC2";
import MC3 from "@/components/QuestionTemplate/Template/MC3";
import MC10 from "@/components/QuestionTemplate/Template/MC10";
import MC5 from "@/components/QuestionTemplate/Template/MC5";
import MC1 from "@/components/QuestionTemplate/Template/MC1";
import MC67811 from "src/components/QuestionTemplate/Template/MC67811";
import PreviewModal from "@/components/QuestionTemplate/Preview/PreviewModal";

import styles from "./index.module.scss";
import FB from "@/components/QuestionTemplate/Template/FB/FB";

const AdminForm = ({
                       form,
                       formId,
                       detailData,
                       isCreating,
                       onSubmit
                   }) => {
    const dispatch = useDispatch();
    const [questionComponent, setQuestionComponent] = useState(<></>);
    const [selectedGrade, setSelectedGrade] = useState(-1);
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const series = useSelector(state => state.series.seriesAll);

    const answerGroups = Form.useWatch("answerGroups", form);
    console.log(answerGroups);
    console.log(form.getFieldsValue())

    const handleSubmit = (values) => {
        if (!values.questionType.startsWith("MC")) {
            values.answerGroups = values.answerGroups.map(item => ({...item, answers: item.answers.slice(0, -1)}));
        }
        console.log('submit')
        let newValues = prepareFormData(values);

        switch (values.questionType) {
            case questionTypes.MC2:
                newValues.imageFile = newValues.image;
                break;
            case questionTypes.MC3:
            case questionTypes.MC4:
                delete newValues.questionText;
                break;
            case questionTypes.MC6:
                newValues.audioFile = newValues.audio;
                break;
            case questionTypes.MC10:
            case questionTypes.MC9:
                newValues.audioFile = newValues.audio;
                newValues.imageFiles = getImagesMC910(sortQuestion(values.answerGroups))
                break;
            case questionTypes.MC7:
            case questionTypes.MC8:
                newValues = prepareFormData(values, "image");
                newValues.audioFile = newValues.audio;
                break;
            case questionTypes.MC11:
                newValues = prepareFormData(values, "image");
                newValues.audioFile = newValues.audio;
                newValues.answers = getAnswersMC11(sortQuestion(values.answerGroups));
                delete newValues.questionText;
                break;
            case questionTypes.FB1:
            case questionTypes.FB2:
                if (values.questionType === questionTypes.FB1) {
                    newValues.answers = values.answers;
                } else {
                    delete newValues.answers;
                }
                newValues.correctAnswers = getCorrectAnswers(sortQuestion(values.answerGroups), '', "%/%");
                newValues.questionText = getQuestionText(sortQuestion(values.answerGroups), '')
                break;
            default:
                break;
        }

        // delete newValues['answerGroups'];
        console.log(newValues);

        // onSubmit(cleanObject(newValues));
    }

    const resetFormData = () => {
        if (!isCreating) return;

        const {setFieldValue, resetFields} = form;
        resetFields(["answerGroups", "questionDescription", "parentQuestionDescription", "audio", "image", "audioScript"])
        setFieldValue(["answerGroups", 0, "isQuestion"], true);
    }

    const onChangeQuestionType = (type) => {
        resetFormData();
        switch (type) {
            case questionTypes.MC1:
                setQuestionComponent(<MC1/>);
                break;
            case questionTypes.MC2:
                setQuestionComponent(<MC2/>);
                break;
            case questionTypes.MC3:
                setQuestionComponent(<MC3/>);
                break;
            case questionTypes.MC4:
                setQuestionComponent(<MC3 title="Multiple Choice - Type 4"/>);
                break;
            case questionTypes.MC5:
                setQuestionComponent(<MC5/>);
                break;
            case questionTypes.MC6:
                setQuestionComponent(<MC67811 title="Multiple Choice - Type 6" requiredQuestion={true}/>);
                break;
            case questionTypes.MC7:
                setQuestionComponent(<MC67811 title="Multiple Choice - Type 7" answerType="image"
                                              rightToolbarType="!"/>);
                break;
            case questionTypes.MC8:
                setQuestionComponent(<MC67811 title="Multiple Choice - Type 8" answerType="image" hasAudio={false}
                                              rightToolbarType="!"/>);
                break;
            case questionTypes.MC9:
                setQuestionComponent(<MC10 title="Multiple Choice - Type 9" hasAudio={false}/>);
                break;
            case questionTypes.MC10:
                setQuestionComponent(<MC10 title="Multiple Choice - Type 10"/>);
                break;
            case questionTypes.MC11:
                setQuestionComponent(<MC67811 title="Multiple Choice - Type 11" answerType="image" hasQuestion={false}
                                              rightToolbarType="switch" questionDesFieldName="questionDescription"
                                              isMultipleCorrectAnswer={true}/>);
                break;
            case questionTypes.FB1:
                setQuestionComponent(<FB title="Fill In The Blanks - Type 1" hasKeyWord={true}
                                         hasSwitchQuestionTable={false} isMultiTab={false}/>);
                break;
            case questionTypes.FB2:
                setQuestionComponent(<FB title="Fill In The Blanks - Type 2"/>);
                break;
            case questionTypes.FB3:
                setQuestionComponent(<FB title="Fill In The Blanks - Type 3" hasAudio={true}/>);
                break;
        }
    }

    const onChangeGrade = (e) => {
        if (e !== 0 && !e) {
            setSelectedGrade(-1);
            return;
        }
        setSelectedGrade(e);

        form.setFieldValue("seriesId", undefined)
    }

    const renderLabel = (item) => {
        return (
            <React.Fragment>
                <div style={{display: "flex"}}>
                    <img src={item.imageUrl} alt=""/>
                </div>
                <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>{item.label}</div>
            </React.Fragment>
        )
    }

    const renderLabelQuestionType = (item) => {
        return (
            <Tooltip title={
                <>
                    <img src={item.image} alt=""/>
                    <Typography.Title level={4}>{item.label}</Typography.Title>
                    <Typography.Text>{questionTypeDes[item.value]}</Typography.Text>
                </>
            }
                     placement="rightTop"
                     overlayClassName={styles.tooltipOverlay}
                     color="white">
                {item.label}
            </Tooltip>
        )
    }

    useEffect(() => {
        dispatch(seriesActions.getAllList({groups: [...Object.values(bookTypes)]}));
    }, [])

    useEffect(() => {
        convertDBStrToFormData(detailData, form);
        // onChangeQuestionType("FB1");
        onChangeQuestionType(detailData.questionType);
    }, [detailData])

    return (
        <React.Fragment>
            <Form
                id={formId}
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
                initialValues={{
                    ...detailData,
                    skill: 'PR',
                    level: 'NA',
                    publisher: 'NA',
                    format: 'NA',
                    type: 'NA',
                    cerf: 'NA',
                    gradeId: 'G1',
                    seriesId: 1,
                    testType: 'EN',
                    privacy: 0,
                }}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <DropdownField
                            fieldName="questionType"
                            options={questionSourceDDL}
                            label="Loại câu hỏi"
                            showSearch
                            onChange={onChangeQuestionType}
                            renderLabel={renderLabelQuestionType}
                            required
                            disabled={!isCreating}
                            className={styles.questionType}
                        />
                    </Col>
                    <Col span={6}>
                        <AsyncDropdownField
                            fieldName="gradeId"
                            mappingData={mappingDropdownData}
                            getListAction={gradeActions.getList}
                            label="Khối lớp"
                            showSearch
                            onChange={onChangeGrade}
                            required
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="seriesId"
                            options={mappingDropdownSeries(selectedGrade, series)}
                            label="Chương trình"
                            showSearch
                            required
                            renderLabel={renderLabel}
                            className={styles.labelSeries}
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="skill"
                            options={skillDDL}
                            label="Kỹ năng"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="level"
                            options={levelDDL}
                            label="Độ khó"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="publisher"
                            options={publisherDDL}
                            label="Nhà xuất bản"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="format"
                            options={formatDDL}
                            label="Tiêu chuẩn"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="type"
                            options={typeDDL}
                            label="Kỳ thi"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <DropdownField
                            fieldName="cerf"
                            options={cerfDDL}
                            label="CERF"
                            required
                            showSearch
                        />
                    </Col>
                    <Col span={6}>
                        <BooleanField
                            fieldName="privacy"
                            label="Trạng thái"
                            unCheckedChildren="Công khai"
                            checkedChildren="Riêng tư"
                        />
                    </Col>
                </Row>
                {cloneElement(questionComponent, {
                    onPreview: () => {
                        form.validateFields()
                            .then(() => setIsShowPreview(true))
                            .catch(e => console.log(e))
                        setPreviewData(form.getFieldsValue())
                    }
                })}
            </Form>
            <PreviewModal isOpen={isShowPreview}
                          onClose={() => setIsShowPreview(false)}
                          questionType={form.getFieldValue('questionType')}
                          previewData={previewData}/>
        </React.Fragment>
    );
};

export default AdminForm;