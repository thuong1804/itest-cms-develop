import { questionTypes } from "@/constants";
import { flatten } from "@/utils";

export const convertHtmlToStr = (dataD) => {
    let str = "";
    for (let i = 0, len = dataD.length; i < len; i++) {
        const child = dataD[i];
        if (child.nodeName === "#text") {
            str += child.textContent
        } else if (child.nodeName === "SPAN") {
            str += child.firstChild.textContent
        } else if (child.nodeName === "BR") {
            // str += ""
        } else if (child.nodeName === "INPUT") {
            str += `#${child.value}#`
        } else {
            const tag = child.nodeName.toLowerCase();
            const content = convertHtmlToStr(Array.from(child.childNodes));
            if (content !== "") {
                str += `%${tag}%${content}%${tag}%`
            }
        }
    }
    return str
}

export const convertStrToHtml = (dataD, listInput = [], inputMinWidth = 70) => {
    const matches = dataD?.matchAll(/(#[^#]*#|%u%|%b%|%i%)/g)
    let result = dataD;
    let index = 0;
    const styleIndex = {};
    for (const match of matches) {
        if (match[0].startsWith("#")) {
            if (listInput.current?.length > 0) {
                const itemInput = listInput.current[index];
                result = result.replace(
                    match[0],
                    `<input id="${itemInput?.id}" autocomplete="off" value="${match[0].replaceAll('#', '')}" style="width:${
                        !itemInput?.width ? inputMinWidth : itemInput?.width
                    }px"/>`,
                )
                index++;
            }
        } else {
            const sIndex = styleIndex[match[0]] ?? 0;
            const tag = match[0].replaceAll("%", "");
            result = result.replace(
                match[0],
                sIndex % 2 === 0 ? `<${tag}>` : `</${tag}>`
            )
            styleIndex[match[0]] = sIndex + 1;
        }
    }
    return result;
}

export const isElement = (el, target) => {
    if (el === target) return true;
    if (el.parentElement) return isElement(el.parentElement, target);
    return false;
}

export const calculateQuestion = (question, questionType) => {
    const questionList = question.questionText?.split("#");
    const answerList = question.answers?.split("#");
    const correctAnswerList = question.correctAnswers?.split(/\#|\[\]/g);

    switch (questionType) {
        case questionTypes.MC3:
        case questionTypes.MC4:
        case questionTypes.SA1:
        case questionTypes.MR1:
        case questionTypes.MR2:
        case questionTypes.MR3:
            return 1;
        case questionTypes.MC5:
        case questionTypes.MC6:
        case questionTypes.DD1:
        case questionTypes.MC1:
        case questionTypes.MC2:
        case questionTypes.MC7:
        case questionTypes.MC8:
        case questionTypes.MC9:
        case questionTypes.MC10:
            return questionList.filter(m => !m?.startsWith("*")).length;
        case questionTypes.FB1:
            return questionList.length;
        case questionTypes.FB2:
        case questionTypes.FB3:
        case questionTypes.FB6:
        case questionTypes.SL1:
        case questionTypes.FB4:
        case questionTypes.FB7:
        case questionTypes.FB8:
            return correctAnswerList.filter(m => !m?.startsWith("*")).length;
        case questionTypes.LS1:
        case questionTypes.LS2:
            return answerList.length;
        case questionTypes.TF1:
        case questionTypes.TF2:
        case questionTypes.TF3:
        case questionTypes.TF4:
        case questionTypes.TF5:
            return answerList.filter(item => !item.startsWith("*")).length;
        case questionTypes.MG1:
        case questionTypes.MG2:
        case questionTypes.MG3:
            return answerList[0].split("*").length;
        case questionTypes.FB5:
        case questionTypes.SL2:
        case questionTypes.MIX1:
        case questionTypes.MIX2:
            return correctAnswerList.length;
        case questionTypes.MG4:
        case questionTypes.MG5:
        case questionTypes.MG6:
            const totalCorrect = correctAnswerList.length;
            const listCheckExample = answerList[2]?.split("*") || [];
            const totalExample = listCheckExample.filter(m => m === "ex").length;
            return totalCorrect - totalExample;
        case questionTypes.DL1:
        case questionTypes.DL2:
        case questionTypes.DL3:
        case questionTypes.FC1:
        case questionTypes.FC2:
            return correctAnswerList.filter(item => !item.startsWith("ex|")).length;
        case questionTypes.SO1:
            const correctAnswerListSO = correctAnswerList.filter(item => !item.startsWith("ex|"));
            const totalArr = [];
            for (const element of correctAnswerListSO) {
                const item = element;
                if (item.split("*")[2] === "True") {
                    totalArr.push(item);
                }
            }
            return totalArr.length;
        case questionTypes.DD2:
            return question.correctAnswers?.split("#").filter(item => !item.startsWith("*"))
        case questionTypes.DS1:
        case questionTypes.MC11:
            return answerList.filter(m => !m.startsWith("ex|")).length;
        default:
            return 1;
    }
}

export const sortQuestion = (data) => {
    return data.filter(item => !item.isDeleted)
        .sort((x, y) => +x.isQuestion - +y.isQuestion);
}

export const getQuestionText = (data = [], exampleChar = "*") => {
    return data
        .map(item => !item.isQuestion ? `${exampleChar}${(item.questionText || '').replaceAll("##", "%s%")}` : (item.questionText || '').replaceAll("##", "%s%"))
        .join("#");
}

export const getAnswers = (data = [], type) => {
    return data.map(item => item.answers.filter(item => !item.isDeleted)
        .map(item => type === "image" ? item.text.name : item.text).join("*"))
        .join("#");
}

export const getAnswersMC11 = (data = []) => {
    return data.map(item => ({...item, answers: item.answers.filter(item => !item.isDeleted)}))
        .map(item => `${!item.isQuestion ? 'ex|' : ''}${item.answers.map(ans => ans.text.name).join("*")}`)
        .join("#");
}

export const getCorrectAnswers = (data = [], type, specialChar = "*") => {
    if (type === 'image') {
        return data.map(item => item.answers.filter(item => !item.isDeleted)
            .map((cItem, index) => ({index, isCorrect: cItem.isCorrect}))
            .filter(dItem => dItem.isCorrect).map(item => item.index).join("*"))
            .join("#");
    } else {
        return data.map(item => item.answers.filter(item => !item.isDeleted && item.isCorrect).map(item => item.text).join(specialChar))
            .join("#");
    }
}

export const getImages = (data = []) => {
    const answers = data.map(item => item.answers.filter(item => !item.isDeleted));
    return flatten(answers).map(item => item.text);
}

export const getImagesMC910 = (data = []) => {
    return flatten(data).map(item => item.image);
}

export const prepareFormData = (values, type = 'text') => {
    const {answerGroups = []} = values;
    const answerGroupsSorted = sortQuestion(answerGroups);
    const questionText = getQuestionText(answerGroupsSorted);
    const answers = getAnswers(answerGroupsSorted, type);
    const correctAnswers = getCorrectAnswers(answerGroupsSorted, type);
    const imageFiles = getImages(answerGroupsSorted);

    return {
        ...values,
        questionText,
        answers,
        correctAnswers,
        testType: 'EN',
        totalQuestion: calculateQuestion({questionText, answers, correctAnswers}, values.questionType),
        imageFiles: type === 'image' ? imageFiles : [],
        privacy: +values.privacy,
    }
}

export const convertDBStrToFormData = (detailData, form) => {
    const {
        answers = '',
        correctAnswers = '',
        questionText = '',
        questionType = '',
        image,
    } = detailData;
    let answerGroups = [];
    const correctAnswersSplit = correctAnswers.split("#");
    const questionTextsSplit = questionText?.split("#");
    const answersSplit = answers.split("#");
    const imageSplit = image?.split("#");

    const checkIsCorrect = (answer, answerIdx, index) => {
        switch (questionType) {
            case questionTypes.MC7:
            case questionTypes.MC8:
                return answerIdx === parseInt(correctAnswersSplit[index]);
            case questionTypes.MC11:
                const subSplit = correctAnswersSplit[index].split("*");
                if (subSplit.length) {
                    return subSplit.includes(answerIdx.toString());
                }
                return answerIdx === parseInt(correctAnswersSplit[index])
            default:
                return answer === correctAnswersSplit[index]
        }
    }

    const checkIsQuestion = (index) => {
        switch (questionType) {
            case questionTypes.MC11:
                return !answersSplit[index]?.startsWith("ex|");
            default:
                return !questionTextsSplit?.[index]?.startsWith("*");
        }
    }

    const getAnswerGroupImage = (index) => {
        if ([questionTypes.MC10, questionTypes.MC9].includes(questionType)) {
            return imageSplit?.[index];
        }

        return '';
    }

    const getAnswerText = (item, index, isQuestion) => {
        if (questionType.startsWith("FB")) {
            return item.split("%/%").map((ans, ansIdx) => ({
                id: ansIdx,
                text: !isQuestion ? ans.replace("ex|", '') : ans,
                isCorrect: checkIsCorrect(ans, ansIdx, index),
            }));
        }

        return item.split("*").map((ans, ansIdx) => ({
            id: ansIdx,
            text: !isQuestion ? ans.replace("ex|", '') : ans,
            isCorrect: checkIsCorrect(ans, ansIdx, index),
        }));
    }

    const getDataSplit = () => {
        if (questionType.startsWith("FB")) {
            return correctAnswers;
        }

        return answers;
    }

    getDataSplit().split("#").map((item, index) => {
        const isQuestion = checkIsQuestion(index);
        answerGroups = [
            ...answerGroups,
            {
                answers: getAnswerText(item, index, isQuestion),
                isCorrect: true,
                isQuestion,
                image: getAnswerGroupImage(index),
                questionText: isQuestion
                    ? questionTextsSplit?.[index]?.replaceAll("%s%", "##")
                    : questionTextsSplit?.[index].slice(1).replaceAll("%s%", "##"),
            }
        ]
    })
    form.setFieldValue("answerGroups", answerGroups);
}