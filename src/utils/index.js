import { bookTypes, IMAGE_URL } from "@/constants";

export const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
}

export const camelCaseToTitleCase = (camelCase) => {
    if (camelCase === null || camelCase === '') {
        return camelCase;
    }

    camelCase = camelCase.trim();
    let newText = '';
    for (let i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i])
            && i !== 0
            && /[a-z]/.test(camelCase[i - 1])) {
            newText += ' ';
        }
        if (i === 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toLowerCase();
        } else {
            newText += camelCase[i].toLowerCase();
        }
    }

    return newText;
}

export const removeAccents = (str) => {
    if (str)
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}

export const cleanObject = (obj) => {
    let result = {};
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if ((!Array.isArray(obj[key]) && obj[key]) || obj[key]?.length)
                result[key] = obj[key];
        });
    }
    return result;
};

export const formatNumber = (value) => {
    if (value) {
        const decimalPosition = value.toString().indexOf('.');
        if (decimalPosition > 0) {
            const intVal = value.toString().substring(0, decimalPosition);
            const decimalVal = value.toString().substring(decimalPosition + 1);
            return `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalVal}`;
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else if (value === 0)
        return 0;
    return '';
}

export const findNestedObj = (entireObj, keyToFind, valToFind) => {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
            foundObj = nestedValue;
        }
        return nestedValue;
    });
    return foundObj;
};

export const differenceArray = (arr1, arr2) => {
    if(!arr1.length && !arr2.length) return [];
    if(!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

    return arr1.filter(x => !arr2.includes(x));
}

export const getErrMsgFromApi = (errorRes) => {
    if (errorRes.errors?.length) {
        return  <div dangerouslySetInnerHTML={{__html: errorRes.errors.map((item) => item.message).join("<br/>")}}/>;
    }
     
    return errorRes.message;
}

export const combineName = (data) => {
    return [data.firstName, data.lastName].filter(item => item).join(" ");
}

export const mappingDropdownData = (options = []) =>{
    return options.map(item => ({label: item.name, value: item.id}))
}

export const mappingDropdownSeries = (selectedGrade, series) => {
    let tempData = [...series];
    const renderLabelGroup = (key) => {
        switch (key) {
            case bookTypes.BOOK:
                return "SGK"
            case bookTypes.SUPPLEMENTARY:
                return "Sách bổ trợ";
            case "Other":
                return "Khác";
            default:
                return "Bài thi quốc tế";
        }
    }
    if (selectedGrade !== -1) {
        tempData = series.filter(item => item.gradeId === selectedGrade);
    }

    tempData.push({seriesGroup: 'Other', name: "Không xác định", id: 1})

    const groupByList = tempData.reduce((result, item) => ({
        ...result,
        [item["seriesGroup"]]: [
            ...(result[item["seriesGroup"]] || []),
            item,
        ],
    }), {})

    return Object.entries(groupByList).map(([key, values]) => ({
        label: renderLabelGroup(key),
        options: values.map(item => ({label: item.name, value: item.id, imageUrl: item.imageUrl}))
    }));
}

export const generateCndImageUrl = (url) => {
    if(!url) return;

    return `${IMAGE_URL}/${url}`;
}

export const flatten = (data = []) => {
    return data.reduce((a, b) => a.concat(b), [])
}