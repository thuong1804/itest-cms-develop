import { Select, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListPageContainer } from '@/components';
import { gradeActions, questionActions, seriesActions } from '@/redux/actions';
import paths from '@/constants/paths';
import { bookTypes, DATETIME_FORMAT_DISPLAY, fieldTypes } from "@/constants";
import { levelDDL, questionSourceDDL, skillDDL } from "@/constants/masterData";
import { mappingDropdownData, mappingDropdownSeries, removeAccents } from "@/utils";
import { formatDate } from "@/utils/date";

import styles from "./index.module.scss";

const ListPage = () => {
    const dispatch = useDispatch();
    const [grades, setGrades] = useState([]);
    const series = useSelector(state => state.series.seriesAll);
    const [selectedGrade, setSelectedGrade] = useState(-1);

    useEffect(() => {
        dispatch(gradeActions.getList({
            onCompleted: (res) => {
                setGrades(res.data || []);
            },
            onError: (err) => {
                console.log(err)
            }
        }))
        dispatch(seriesActions.getAllList({groups: [...Object.values(bookTypes)]}));
    }, [])

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

    const renderItem = (_, _1, item) => {
        return (
            <React.Fragment key={item.value}>
                {Array.isArray(item.options) ?
                    <Select.OptGroup label={item.label}>
                        {item.options.map(op =>
                            <Select.Option
                                key={op['value']}
                                label={op['label']}>
                                {renderLabel ? renderLabel(op) : op['label']}
                            </Select.Option>
                        )}
                    </Select.OptGroup>
                    :
                    <Select.Option
                        key={item['value']}
                        label={item['label']}
                    >
                        {renderLabel ? renderLabel(item) : item['label']}
                    </Select.Option>
                }
            </React.Fragment>
        )
    }

    const onChangeGrade = (e, form) => {
        if (e !== 0 && !e) {
            setSelectedGrade(-1);
            return;
        }
        setSelectedGrade(e);
        form.setFieldValue('seriesId', undefined);
    }

    return (
        <>
            <ListPageContainer
                objectName="câu hỏi"
                detailUrl={paths.questionDetail}
                createUrl={paths.questionCreate}
                breadcrumbs={[
                    {breadcrumbName: 'Cấu hình'},
                    {breadcrumbName: 'Quản lý câu hỏi'}
                ]}
                columns={[
                    {title: 'ID', dataIndex: 'id'},
                    {
                        title: 'Khối lớp',
                        dataIndex: 'gradeId',
                        render: (gradeId) => {
                            const grade = grades.find(g => g.id === gradeId);
                            return grade?.name || "N/A";
                        }
                    },
                    {
                        title: 'Kỹ năng',
                        dataIndex: 'skill',
                        render: (skill) => skillDDL.find(item => item.value === skill).label,
                    },
                    {
                        title: 'Loại câu hỏi',
                        dataIndex: 'questionType',
                        render: (questionType) => questionSourceDDL.find(item => item.value === questionType).label
                    },
                    {
                        title: 'Độ khó',
                        dataIndex: 'level',
                        render: (level) => levelDDL.find(item => item.value === level).label
                    },
                    {
                        title: 'Yêu cầu đề bài',
                        dataIndex: 'questionDescription',
                        render: (questionDescription, row) =>
                            <Typography.Paragraph ellipsis={{tooltip: questionDescription, rows: 3}} style={{margin: 0}}>
                                {row.parentQuestionDescription || questionDescription}
                            </Typography.Paragraph>
                    },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdDate',
                        render: (createdDate) => {
                            const dateTime = formatDate(createdDate, DATETIME_FORMAT_DISPLAY);
                            const dateTimeSplit = dateTime ? dateTime.split(" ") : [];
                            return (
                                dateTimeSplit.length ?
                                    <Space direction="vertical" size={1} style={{minWidth: 80}}>
                                        <Typography.Text>{dateTimeSplit[1]}</Typography.Text>
                                        <Typography.Text>{dateTimeSplit[0]}</Typography.Text>
                                    </Space>
                                    :
                                    <Typography.Text>N/A</Typography.Text>
                            )
                        }
                    },
                ]}
                searchFields={[
                    {
                        key: 'search',
                        searchPlaceholder: 'Tìm kiếm yêu cầu đề bài hoặc câu hỏi',
                        gridCol: 6
                    },
                    {
                        key: 'gradeId',
                        searchPlaceholder: 'Khối lớp',
                        fieldType: fieldTypes.AUTOCOMPLETE,
                        gridCol: 6,
                        options: mappingDropdownData(grades),
                        onChange: onChangeGrade,
                    },
                    {
                        key: 'seriesId',
                        searchPlaceholder: 'Chương trình',
                        fieldType: fieldTypes.AUTOCOMPLETE,
                        gridCol: 6,
                        options: mappingDropdownSeries(selectedGrade, series),
                        renderItem: renderItem,
                        className: styles.labelSeries,
                    },
                    {
                        key: 'skill',
                        searchPlaceholder: 'Kỹ năng',
                        fieldType: fieldTypes.AUTOCOMPLETE,
                        gridCol: 6,
                        options: skillDDL,
                    },
                    {
                        key: 'questionType',
                        searchPlaceholder: 'Loại câu hỏi',
                        fieldType: fieldTypes.AUTOCOMPLETE,
                        gridCol: 6,
                        options: questionSourceDDL,
                    },
                    {
                        key: 'level',
                        searchPlaceholder: 'Độ khó',
                        fieldType: fieldTypes.AUTOCOMPLETE,
                        gridCol: 6,
                        options: levelDDL,
                    },
                    {
                        key: 'createdDate',
                        searchPlaceholder: 'Ngày tạo',
                        fieldType: fieldTypes.DATE,
                        gridCol: 6,
                    },
                ]}
                actionBar={{
                    isEdit: true,
                    isCreate: true,
                    isDelete: true,
                }}
                getListAction={questionActions.getList}
                deleteAction={seriesActions.delete}
            >
            </ListPageContainer>
        </>
    )
}

export default ListPage;