import React, { useEffect, useState } from 'react';
import { Form, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import FormItem from './FormItem';

import styles from "./UploadFileLocalField.module.scss";
import { generateCndImageUrl } from "@/utils";

const UploadImage = ({value, onChange, maxCount, acceptType, uploadText, type, ...formItemProps}) => {
    const {status} = Form.Item.useStatus();
    const {fieldName} = formItemProps;
    const {setFieldValue} = Form.useFormInstance();
    const [fileList, setFileList] = useState([]);
    const uploadFile = ({file, onSuccess, onError}) => {
        if (file) {
            onSuccess(file);
        } else {
            onError();
        }
    };

    const handleChange = ({fileList, file}) => {
        const newList = fileList.map(el => {
            if (el.uid === file?.uid) {
                return {
                    ...el,
                    url: file.originFileObj,
                }
            }

            return el;
        });
        setFileList([...newList]);
        setFieldValue(fieldName, file.originFileObj);

        if (file.status !== 'uploading') {
            onChange(maxCount > 1 ? newList.map(el => el.url) : (newList[0]?.url || ''));
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>{uploadText}</div>
        </div>
    );

    useEffect(() => {
        const getFileFromValue = () => {
            if (maxCount > 1) {
                return value?.map(el => ({url: el, uid: `${el}-${new Date().getTime()}`})) || [];
            }

            return value ? [{url: value, uid: `${value}-${new Date().getTime()}`}] : [];
        }

        setFileList(getFileFromValue());
    }, []);

    const renderItem = (file, fileList, {remove}) => {
        if (type === 'image') {
            return (
                fileList.length ?
                    <div className={styles.imgPreviewWrapper}>
                        <img
                            src={typeof fileList[0]?.url === 'object' ? URL.createObjectURL(file?.url) : generateCndImageUrl(file?.url)}
                            width="100%" height="auto" alt=""/>
                        <DeleteOutlined onClick={remove}/>
                    </div>
                    : null
            )
        }

        if (type === 'audio') {
            return (
                fileList.length ?
                    <div className={styles.audioWrapper}>
                        <audio
                            controls>
                            <source
                                src={
                                    typeof fileList[0]?.url === 'object' ? URL.createObjectURL(file?.url) : generateCndImageUrl(file?.url)
                                }
                                type="audio/mpeg"
                            />
                        </audio>
                        <DeleteOutlined onClick={remove}/>
                    </div>
                    : null
            )
        }
    }

    return (
        <Upload
            className={status === 'error' && styles.error}
            listType="picture-card"
            showUploadList={{
                showPreviewIcon: false
            }}
            customRequest={uploadFile}
            maxCount={maxCount}
            onChange={handleChange}
            accept={acceptType}
            fileList={fileList}

            itemRender={(_, file, fileList, {remove}) => {
                return renderItem(file, fileList, {remove});
            }}
        >
            {fileList?.length < maxCount && uploadButton}
        </Upload>
    );
}

const UploadImageField = ({
                              type = 'image',
                              disabled,
                              defaultValue,
                              prefix,
                              maxCount = 1,
                              acceptType,
                              uploadText,
                              ...formItemProps
                          }) => {


    return (
        <FormItem
            {...formItemProps}
        >
            <UploadImage maxCount={maxCount} acceptType={acceptType} uploadText={uploadText}
                         type={type} {...formItemProps}/>
        </FormItem>
    )
}

export default UploadImageField;
