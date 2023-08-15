import React, { useEffect } from "react";

import FormItem from "@/components/Form/FormItem";
import InputQuestion from "@/components/QuestionTemplate/Common/QuestionField/InputQuestion";

const QuestionField = ({
                           type = 'question',
                           maxLength,
                           maxLengthMsg,
                           notAllowWhiteSpace,
                           isSwitchQuestion = true,
                           formItemClassName,
                           onDeleteQuestion,
                           isAddInput,
                           isMultiTab = true,
                           hasAnswerPopup = false,
                           hasSwitchQuestionTable = true,
                           ...formItemProps
                       }) => {
    const getMaxLengthMsg = () => {
        return maxLengthMsg || `${formItemProps.label} chỉ chứa tối đa ${maxLength} ký tự`;
    }
    const getTextFieldRules = () => {
        const rules = [];
        if (maxLength) {
            rules.push({max: maxLength, message: getMaxLengthMsg()});
        }
        if (notAllowWhiteSpace) {
            rules.push({whitespace: true, message: 'Không được phép nhập giá trị chỉ có khoảng trắng!'});
        }
        return rules;
    }

    return (
        <FormItem
            {...formItemProps}
            className={formItemClassName}
            fieldRules={getTextFieldRules()}>
            <InputQuestion
                isSwitchQuestion={isSwitchQuestion}
                onDeleteQuestion={onDeleteQuestion}
                isAddInput={isAddInput}
                isMultiTab={isMultiTab}
                hasAnswerPopup={hasAnswerPopup}
                hasSwitchQuestionTable={hasSwitchQuestionTable}
                {...formItemProps}/>
        </FormItem>
    );
}

export default QuestionField;