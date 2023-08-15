import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Form, Row } from "antd";
import classNames from "classnames";

import styles from "@/components/QuestionTemplate/Common/QuestionField/index.module.scss";
import ContentEditAbleField from "@/components/QuestionTemplate/Common/ContentEditAbleField";
import { BooleanField } from "@/components";
import Toolbar from "@/components/QuestionTemplate/Common/Toolbar";
import PopupAnswersField from "@/components/QuestionTemplate/Common/PopupAnswers";

import { DeleteOutlined } from "@ant-design/icons";

const InputQuestion = ({
                           isSwitchQuestion,
                           onDeleteQuestion,
                           isAddInput,
                           isMultiTab,
                           hasAnswerPopup,
                           hasSwitchQuestionTable,
                           ...formItemProps
                       }) => {
    const {fieldName} = formItemProps;
    const {getFieldValue, setFieldValue} = Form.useFormInstance();
    const {status} = Form.Item.useStatus();
    const ref = useRef();
    const [inputIdx, setInputIdx] = useState('');
    const [style, setStyle] = useState({});

    const onAddInput = useCallback((e) => {
        e.preventDefault();
        ref.current?.pressTab();
    }, [])

    const onClickInput = (e, id) => {
        if (hasAnswerPopup) {
            setInputIdx(id.toString());
        }
    }

    const onClose = () => {
        setInputIdx('');
    }

    const onDeleteTabs = (e, listInput) => {
        onClose();
        for (let i = 0; i < listInput.length; i++) {
            if (listInput[i].isDeleted) {
                setFieldValue(["answerGroups", i, "isDeleted"], true);
            }
        }
    }

    useEffect(() => {
        if (hasAnswerPopup) {
            if (!inputIdx) return;

            let offsetTop = 0;
            const parentDiv = document.getElementById("question-field-wrap");
            const parentRect = ref.current?.getBoundingClientRect();
            const inputNodeIndex = ref.current.listInput[inputIdx].id;
            const inputElement = document.getElementById(inputNodeIndex);
            const inputRect = inputElement?.getBoundingClientRect();
            if (parentDiv.scrollTop !== 0) {
                offsetTop = inputElement.offsetTop - (parentDiv.scrollTop - 100);
            } else {
                offsetTop = inputElement.offsetTop + 100;
            }
            // let offsetTop = inputRect.top - parentRect.top + inputRect.height + 10
            let offsetLeft = inputRect.left - parentRect.left + inputRect.width / 2 - 5;
            let tableLeft = 5;
            if (offsetLeft > 315) {
                tableLeft = offsetLeft - 290;
                offsetLeft = 290;
            } else {
                offsetLeft -= 5;
            }
            // document.style.setProperty('--offset-left', `${offsetLeft}px`)
            setStyle({top: offsetTop, left: tableLeft, ["--offset-left"]: `${offsetLeft}px`})
        }
    }, [inputIdx])

    const ToolBarQuestion = useCallback(() => {
        return (
            <Row justify="space-between" align="middle">
                {isSwitchQuestion &&
                    <BooleanField
                        fieldName={[...fieldName.slice(0, -1), "isQuestion"]}
                        checkedChildren="Câu hỏi"
                        unCheckedChildren="Ví dụ"
                        style={{margin: 0}}
                    />
                }
                <Toolbar onAddInput={onAddInput} isAddInput={isAddInput}/>
                {onDeleteQuestion && <DeleteOutlined onClick={onDeleteQuestion}/>}
            </Row>
        )
    }, [onDeleteQuestion, onAddInput])

    console.log(ref.current?.listInput)

    return (
        <>
            <Card title={<ToolBarQuestion/>}
                  className={classNames(styles.questionField, {
                      [styles.error]: status === "error"
                  })}
                  id="question-field-wrap"
                  bodyStyle={{height: 'calc(100% - 47px)'}}>
                <ContentEditAbleField
                    ref={ref}
                    fieldName={fieldName}
                    isMultiTab={isMultiTab}
                    disableTabInput={true}
                    className={styles.editAbleField}
                    style={{margin: 0, height: '100%', minHeight: 30, whiteSpace: 'pre-wrap'}}
                    placeholder={formItemProps.getPlaceHolder()}
                    onClickInput={onClickInput}
                    onDeleteTabs={onDeleteTabs}
                />
            </Card>
            {hasAnswerPopup ?
                Array.from(new Array(ref.current?.listInput.length).keys()).map(index => (
                    <div key={index} className={classNames(styles.tableAnswer, {
                        [styles.visible]: inputIdx === index.toString()
                    })} style={style}>
                        <PopupAnswersField fieldName={["answerGroups", index, "answers"]} onClose={onClose}
                                           hasSwitchQuestion={hasSwitchQuestionTable}/>
                    </div>
                )) : null
            }
        </>
    )
}

export default React.memo(InputQuestion);