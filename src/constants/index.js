export const cmsApiUrl = process.env.REACT_APP_CMS_API;
export const essoApiUrl = process.env.REACT_APP_ESSO_API;
export const CLIENT_APP_ID = process.env.REACT_APP_CLIENT_APP_ID;
export const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
export const IMAGE_URL = process.env.REACT_APP_CDN_IMAGE_URL;
export const DEFAULT_TABLE_ITEM_SIZE = 10;

// Datetime format
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DATE_FORMAT_VALUE = 'YYYY-MM-DD';
export const DATETIME_FORMAT_VALUE = 'YYYY-MM-DD HH:mm:ss';
export const DATETIME_FORMAT_DISPLAY = 'DD/MM/YYYY HH:mm:ss';

export const storageKeys = {
    ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN_KEY,
    REFRESH_TOKEN: process.env.REACT_APP_REFRESH_TOKEN_KEY,
}

export const fieldTypes = {
    TEXT: 'TEXT',
    NUMBER: 'NUMBER',
    SELECT: 'SELECT',
    AUTOCOMPLETE: 'AUTOCOMPLETE',
    DATE: 'DATE',
    UPLOAD: 'UPLOAD',
    RADIO: 'RADIO',
    BOOLEAN: 'BOOLEAN',
    CHECKBOX: 'CHECKBOX'
}

export const commonStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    LOCK: 'LOCK'
}

export const userRoles = {
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    OPERATOR: 'OPERATOR',
    SALE: 'SALE',
}

export const currencyTypes = {
    VND: 'VND',
}

export const PACKAGES = {
    BASIC: "BASIC",
    ADVANCE: "ADVANCE",
    INTERNATIONAL: "INTERNATIONAL",
}

export const teacherSourceTypes = {
    DTP: 'DTP',
    UNKNOWN: 'UNKNOWN',
}

export const statusTypes = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    PROCESSING: 'PROCESSING',
}

export const orderStatusCode = {
    NEW: 0,
    DONE: 1,
}

export const bookTypes = {
    BOOK: 'BOOK',
    SUPPLEMENTARY: 'SUPPLEMENTARY',
    EXTERNAL: 'EXTERNAL',
}

export const questionTypes = {
    MC1: "MC1",
    MC2: "MC2",
    MC3: "MC3",
    MC4: "MC4",
    MC5: "MC5",
    MC6: "MC6",
    MC7: "MC7",
    MC8: "MC8",
    MC9: "MC9",
    MC10: "MC10",
    MC11: "MC11",
    FB1: 'FB1',
    FB2: 'FB2',
    FB3: 'FB3',
    FB4: 'FB4',
    FB5: 'FB5',
    FB6: 'FB6',
    FB7: 'FB7',
    FB8: 'FB8',
    SL1: 'SL1',
    SL2: 'SL2',
    DD1: 'DD1',
    DD2: 'DD2',
    DL1: 'DL1',
    DL2: 'DL2',
    DL3: 'DL3',
    SA1: 'SA1',
    TF1: 'TF1',
    TF2: 'TF2',
    TF3: 'TF3',
    TF4: 'TF4',
    TF5: 'TF5',
    MG1: 'MG1',
    MG2: 'MG2',
    MG3: 'MG3',
    MG4: 'MG4',
    MG5: 'MG5',
    MG6: 'MG6',
    MR1: 'MR1',
    MR2: 'MR2',
    MR3: 'MR3',
    LS1: 'LS1',
    LS2: 'LS2',
    MIX1: 'MIX1',
    MIX2: 'MIX2',
    SO1: 'SO1',
    DS1: 'DS1',
    FC1: 'FC1',
    FC2: 'FC2',
}

export const skillTypes = {
    PR: 'PR',
    VO: 'VO',
    GR: 'GR',
    RE: 'RE',
    WR: 'WR',
    LI: 'LI',
    SP: 'SP',
}

export const levelTypes = {
    NA: 'NA',
    M1: 'M1',
    M2: 'M2',
    M3: 'M3',
    M4: 'M4',
}

export const publisherTypes = {
    NA: 'NA',
    DTP: 'DTP',
    EX: 'EX',
    GE: 'GE',
    IN: 'IN',
}

export const formatTypes = {
    NA: 'NA',
    DO: 'DO',
    CA: 'CA',
    IELTS: 'IELTS',
    APTIS: 'APTIS',
    TOEIC: 'TOEIC',
    TOFLE: 'TOFLE',
}

export const typeTypes = {
    NA: 'NA',
    PT: 'PT',
    UT: 'UT',
    PGT: 'PGT',
    M1T: 'M1T',
    T1T: 'T1T',
    PGT2: 'PGT2',
    M2T: 'M2T',
    T2T: 'T2T',
    AM10: 'AM10',
    E10M: 'E10M',
    HSG: 'HSG',
    RC: 'RC',
}
export const cefrTypes = {
    NA: 'NA',
    PA1Y: 'PA1Y',
    A1Y: 'A1Y',
    A2Y: 'A2Y',
    A1: 'A1',
    'A1+': 'A1+',
    A2: 'A2',
    B1: 'B1',
    'B1+': 'B1+',
    B2: 'B2',
    C1: 'C1',
    C2: 'C2',
}

export const questionTypeDes = {
    MC1: 'Câu hỏi dạng text điền vào chỗ trống gợi ý',
    MC2: 'Câu hỏi dạng có hình gợi ý',
    MC3: 'Câu hỏi dạng text gợi ý',
    MC4: 'Chọn đáp án, có từ gạch chân (biến thể của dạng 3)',
    MC5: 'Đọc đoạn văn và trả lời câu hỏi (theo group)',
    MC6: 'Nghe và trả lời câu hỏi (theo group)',
    MC7: 'Nghe và chọn ra hình ảnh đúng',
    MC8: 'Xem và chọn ra đáp án đúng',
    MC9: 'Xem hình ảnh minh họa và chọn đáp án đúng',
    MC10: 'Nghe audio và xem hình ảnh minh họa để chọn đáp án đúng',
    MC11: 'Nghe audio và xem hình ảnh minh họa để chọn đáp án đúng',
    FB1: 'Điền vào chỗ trống với từ gợi ý sẵn',
    FB2: 'Điền từ thích hợp vào chỗ trống',
    FB3: 'Nghe và điền từ bất kỳ vào chỗ trống (Fill in the blanks) cho phù hợp với đoạn văn',
    FB4: 'Điền vào chỗ trống cho đoạn văn theo gợi ý từ hình ảnh',
    FB5: 'Điền vào chỗ trống cho các câu dựa vào hình ảnh gợi ý',
    SL1: 'Điền vào ô trống bằng cách lựa chọn các đáp án cho sẵn',
    DD1: 'Sắp xếp các từ thành câu hoàn chỉnh',
    DD2: 'Nghe audio và sắp xếp các câu trả lời với hình ảnh đúng',
    SA1: 'Viết lại câu theo gợi ý (nếu có) để không thay đổi nghĩa của câu cho trước',
    TF1: 'Nghe audio và trả lời câu hỏi True-False',
    TF2: 'Đọc đoan văn và trả lời câu hỏi True-False',
    TF3: 'Xem hình minh họa và trả lời câu hỏi True-False',
    TF4: 'Xem hình ảnh và trả lời câu hỏi True-False',
    TF5: 'Nghe audio và trả lời câu hỏi True-False',
    MG1: 'Đọc đoạn văn và nối các câu ở cột A với câu trả lời đúng ở cột B (cột A cố định)',
    MG2: 'Nối các câu ở cột trái với câu trả lời đúng ở cột bên phải',
    MG3: 'Nghe và nối các câu ở cột trái với câu trả lời đúng ở cột bên phải',
    MG4: 'Xem hình minh họa và nối các câu ở cột trái với câu trả lời đúng ở cột bên phải',
    MG5: 'Nối các câu ở cột trái với câu trả lời đúng ở cột bên phải',
    MR1: 'Lựa chọn các đáp án đúng từ các từ cho sẵn',
    MR2: 'Nghe audio và trả lời câu hỏi bằng cách lựa chọn các từ cho sẵn (dành cho câu hỏi ngắn)',
    MR3: 'Nghe audio và trả lời câu hỏi theo yêu cầu (dành cho hỏi dài)',
    LS1: 'Đoạn đoạn văn và trả lời các câu hỏi',
    LS2: 'Nghe audio và trả lời các câu hỏi',
    SO1: 'Nghe audio và chọn hình ảnh đúng',
    DL1: '',
    DL2: ''
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50];
export const phoneRegExp = /^0([35789]([0-9]{8}))$/;
export const passwordRegex = /^[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+(\s+[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+)*$/;
export const whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/g;
