import {
    bookTypes, cefrTypes,
    commonStatus,
    currencyTypes, formatTypes, levelTypes, publisherTypes,
    questionTypes,
    skillTypes,
    statusTypes,
    teacherSourceTypes, typeTypes,
    userRoles
} from '.';

export const statusDDL = [
    {value: commonStatus.ACTIVE, label: 'Active'},
    {value: commonStatus.LOCK, label: 'Lock'}
]

export const currencyOptions = [
    {value: currencyTypes.VND, label: 'VNĐ'},
]

export const rolesDDL = [
    {value: userRoles.TEACHER, label: 'Giáo viên'},
    {value: userRoles.ADMIN, label: 'Admin'},
]

export const teacherSourceDDL = [
    {value: teacherSourceTypes.DTP, label: 'DTP'},
    {value: teacherSourceTypes.UNKNOWN, label: 'Tự do'},
]

export const orderStatusDDL = [
    {value: statusTypes.SUCCESS, label: 'Thành công'},
    {value: statusTypes.FAILED, label: 'Thất bại'},
    {value: statusTypes.PROCESSING, label: 'Đang xử lý'},
]

export const bookSourceDDL = [
    {value: bookTypes.BOOK, label: 'SGK'},
    {value: bookTypes.SUPPLEMENTARY, label: 'Sách bổ trợ'},
]

export const questionSourceDDL = [
    {value: questionTypes.MC1, label: 'Multiple Choice - Type 1', image: '/images/preview-question/mc1.png'},
    {value: questionTypes.MC2, label: 'Multiple Choice - Type 2', image: '/images/preview-question/mc2.png'},
    {value: questionTypes.MC3, label: 'Multiple Choice - Type 3', image: '/images/preview-question/mc3.png'},
    {value: questionTypes.MC4, label: 'Multiple Choice - Type 4', image: '/images/preview-question/mc4.png'},
    {value: questionTypes.MC5, label: 'Multiple Choice - Type 5', image: '/images/preview-question/mc5.png'},
    {value: questionTypes.MC6, label: 'Multiple Choice - Type 6', image: '/images/preview-question/mc6.png'},
    {value: questionTypes.MC7, label: 'Multiple Choice - Type 7', image: '/images/preview-question/mc7.png'},
    {value: questionTypes.MC8, label: 'Multiple Choice - Type 8', image: '/images/preview-question/mc8.png'},
    {value: questionTypes.MC9, label: 'Multiple Choice - Type 9', image: '/images/preview-question/mc9.png'},
    {value: questionTypes.MC10, label: 'Multiple Choice - Type 10', image: '/images/preview-question/mc10.png'},
    {value: questionTypes.MC11, label: 'Multiple Choice - Type 11', image: '/images/preview-question/mc11.png'},
    {value: questionTypes.FB1, label: 'Fill In The Blanks - Type 1', image: '/images/preview-question/fb1.png'},
    {value: questionTypes.FB2, label: 'Fill In The Blanks - Type 2', image: '/images/preview-question/fb2.png'},
    {value: questionTypes.FB3, label: 'Fill In The Blanks - Type 3', image: '/images/preview-question/fb3.png'},
    {value: questionTypes.FB4, label: 'Fill In The Blanks - Type 4', image: '/images/preview-question/fb4.png'},
    {value: questionTypes.FB5, label: 'Fill In The Blanks - Type 5', image: '/images/preview-question/fb5.png'},
    {value: questionTypes.FB6, label: 'Fill In The Blanks - Type 6', image: '/images/preview-question/fb6.png'},
    {value: questionTypes.FB7, label: 'Fill In The Blanks - Type 7', image: '/images/preview-question/fb7.png'},
    {value: questionTypes.FB8, label: 'Fill In The Blanks - Type 8', image: '/images/preview-question/fb8.png'},
    {value: questionTypes.SL1, label: 'Select from list - Type 1', image: '/images/preview-question/sl1.png'},
    {value: questionTypes.SL2, label: 'Select from list - Type 2', image: '/images/preview-question/sl2.png'},
    {value: questionTypes.DD1, label: 'Drag and Drop - Type 1', image: '/images/preview-question/dd1.png'},
    {value: questionTypes.DD2, label: 'Drag and Drop - Type 2', image: '/images/preview-question/dd2.png'},
    {value: questionTypes.DL1, label: 'Draw Line - Type 1', image: '/images/preview-question/dl1.png'},
    {value: questionTypes.DL2, label: 'Draw Line - Type 2', image: '/images/preview-question/dl2.png'},
    {value: questionTypes.DL3, label: 'Draw Line - Type 3', image: '/images/preview-question/dl3.png'},
    {value: questionTypes.SA1, label: 'Short Answer - Type 1', image: '/images/preview-question/sa1.png'},
    {value: questionTypes.TF1, label: 'True False - Type 1', image: '/images/preview-question/tf1.png'},
    {value: questionTypes.TF2, label: 'True False - Type 2', image: '/images/preview-question/tf2.png'},
    {value: questionTypes.TF3, label: 'True False - Type 3', image: '/images/preview-question/tf3.png'},
    {value: questionTypes.TF4, label: 'True False - Type 4', image: '/images/preview-question/tf4.png'},
    {value: questionTypes.TF5, label: 'True False - Type 5', image: '/images/preview-question/tf5.png'},
    {value: questionTypes.MG1, label: 'Matching - Type 1', image: '/images/preview-question/mg1.png'},
    {value: questionTypes.MG2, label: 'Matching - Type 2', image: '/images/preview-question/mg2.png'},
    {value: questionTypes.MG3, label: 'Matching - Type 3', image: '/images/preview-question/mg3.png'},
    {value: questionTypes.MG4, label: 'Matching - Type 4', image: '/images/preview-question/mg4.png'},
    {value: questionTypes.MG5, label: 'Matching - Type 5', image: '/images/preview-question/mg5.png'},
    {value: questionTypes.MG6, label: 'Matching - Type 6', image: '/images/preview-question/mg6.png'},
    {value: questionTypes.MR1, label: 'Multiple Response - Type 1', image: '/images/preview-question/mr1.png'},
    {value: questionTypes.MR2, label: 'Multiple Response - Type 2', image: '/images/preview-question/mr2.png'},
    {value: questionTypes.MR3, label: 'Multiple Response - Type 3', image: '/images/preview-question/mr3.png'},
    {value: questionTypes.LS1, label: 'Liker Scale - Type 1', image: '/images/preview-question/ls1.png'},
    {value: questionTypes.LS2, label: 'Liker Scale - Type 2', image: '/images/preview-question/ls2.png'},
    {value: questionTypes.MIX1, label: 'TF2 AND MC5', image: '/images/preview-question/mix1.png'},
    {value: questionTypes.MIX2, label: 'LS1 AND MC5', image: '/images/preview-question/mix2.png'},
    {value: questionTypes.SO1, label: 'Select Object - Type 1', image: '/images/preview-question/so1.png'},
    {value: questionTypes.DS1, label: 'Draw Shape - Type 1', image: '/images/preview-question/ds1.png'},
    {value: questionTypes.FC1, label: 'Fill Color - Type 1', image: '/images/preview-question/fc1.png'},
    {value: questionTypes.FC2, label: 'Fill Color - Type 2', image: '/images/preview-question/.png'},
]

export const skillDDL = [
    {value: skillTypes.PR, label: 'Pronunciation'},
    {value: skillTypes.VO, label: 'Vocab'},
    {value: skillTypes.GR, label: 'Grammar'},
    {value: skillTypes.RE, label: 'Reading'},
    {value: skillTypes.WR, label: 'Writing'},
    {value: skillTypes.LI, label: 'Listening'},
    {value: skillTypes.SP, label: 'Speaking'},
]

export const levelDDL = [
    {value: levelTypes.NA, label: 'Không xác định'},
    {value: levelTypes.M1, label: 'M1 - Nhận biết'},
    {value: levelTypes.M2, label: 'M2 - Hiểu'},
    {value: levelTypes.M3, label: 'M3 - Vận dụng'},
    {value: levelTypes.M4, label: 'M4 - Vận dụng cao'},
]

export const publisherDDL = [
    {value: publisherTypes.NA, label: 'Không xác định'},
    {value: publisherTypes.DTP, label: 'DTP'},
    {value: publisherTypes.EX, label: 'EXPRESS'},
    {value: publisherTypes.GE, label: 'Global ELT'},
    {value: publisherTypes.IN, label: 'INNOVA'},
]

export const formatDDL = [
    {value: formatTypes.NA, label: 'Không xác định'},
    {value: formatTypes.DO, label: 'DOET'},
    {value: formatTypes.CA, label: 'CAMBRIDGE'},
    {value: formatTypes.IELTS, label: 'IELTS'},
    {value: formatTypes.APTIS, label: 'APTIS'},
    {value: formatTypes.TOEIC, label: 'TOEIC'},
    {value: formatTypes.TOFLE, label: 'TOEFL'},
]

export const typeDDL = [
    {value: typeTypes.NA, label: 'Không xác định'},
    {value: typeTypes.PT, label: 'Xếp lớp'},
    {value: typeTypes.UT, label: 'Unit tests'},
    {value: typeTypes.PGT, label: 'Thường xuyên HK1'},
    {value: typeTypes.M1T, label: 'Giữa HK1'},
    {value: typeTypes.T1T, label: 'Cuối HK1'},
    {value: typeTypes.PGT2, label: 'Thường xuyên HK2'},
    {value: typeTypes.M2T, label: 'Giữa HK2'},
    {value: typeTypes.T2T, label: 'Cuối HK2'},
    {value: typeTypes.AM10, label: 'Tuyển sinh 10'},
    {value: typeTypes.E10M, label: 'Tuyển sinh 10 chuyên'},
    {value: typeTypes.HSG, label: 'Tốt nghiệp THPT'},
    {value: typeTypes.RC, label: 'Đánh giá năng lực'},
]

export const cerfDDL = [
    {value: cefrTypes.NA, label: 'Không xác định'},
    {value: cefrTypes.PA1Y, label: 'Pre A1(starters)'},
    {value: cefrTypes.A1Y, label: 'A1 (Movers)'},
    {value: cefrTypes.A2Y, label: 'A2 (Flyers)'},
    {value: cefrTypes.A1, label: 'A1 (Beginner)'},
    {value: cefrTypes["A1+"], label: 'A1+ (False beginner)'},
    {value: cefrTypes.A2, label: 'A2 (Elementary)'},
    {value: cefrTypes.B1, label: 'B1 (Pre-intermediate)'},
    {value: cefrTypes["B1+"], label: 'B1+ (Intermediate)'},
    {value: cefrTypes.B2, label: 'B2 (Upper-intermediade)'},
    {value: cefrTypes.C1, label: 'C1 (Advanced)'},
    {value: cefrTypes.C2, label: 'C2 (Proficiency)'},
]