import React from "react";

import QuestionWrapper from "@/components/QuestionTemplate/Common/QuestionWrapper";
import TextAreaField from "@/components/Form/TextAreaField";
import AnswerListField from "src/components/QuestionTemplate/Common/AnswerListField";

const MC3 = ({title, onPreview}) => {
    return (
        <QuestionWrapper
            title={title || "MULTIPLE CHOICE - TYPE 3"}
            type="inner"
            onPreview={onPreview}
        >
            <TextAreaField
                label="Yêu cầu đề bài"
                name="questionDescription"
                required
                rows={2}
                maxLength={2000}
                showCount
                disableKeys={["#", "*"]}
            />
            <AnswerListField
                fieldName={["answerGroups", 0, "answers"]}
                rightToolbarType="highLightText"
            />
        </QuestionWrapper>
    )
}

export default MC3;