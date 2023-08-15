import React from "react"

import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import TextAreaField from "@/components/Form/TextAreaField";
import { useNotification } from "@/hooks";
import QuestionAnswerListField from "@/components/QuestionTemplate/Common/QuestionAnswerListField";
import { validationNumberQuestionOrExample } from "@/utils/validator";

const MC1 = ({onPreview}) => {
    const {showErrorMessage} = useNotification();

    return (
        <QuestionWrapper
            title="MULTIPLE CHOICE - TYPE 1"
            type="inner"
            onPreview={onPreview}
        >
            <TextAreaField
                label="Yêu cầu đề bài"
                name="questionDescription"
                required
                rows={2}
                showCount
                maxLength={2000}
                disableKeys={["#", "*"]}
            />
            <QuestionAnswerListField
                validators={validationNumberQuestionOrExample(showErrorMessage)}
                fieldName="answerGroups"
            />
        </QuestionWrapper>
    )
}

export default MC1;