import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { useDispatch } from 'react-redux';

import FormItem from './FormItem';

import { PlusOutlined } from '@ant-design/icons';

import styles from './UploadImageField.module.scss';

const UploadImage = ({
                         value,
                         onChange,
                         maxCount,
                         defaultValue,
                         objectId,
                         uploadApiAction,
                         deleteApiAction,
                         onSuccessUpload,
                     }) => {
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([]);

    const handleChange = ({fileList, file}) => {
        const newList = fileList.map(el => {
            if (el.uid === file?.uid) {
                return {
                    ...el,
                    ...file.response,
                    url: file.response?.data,
                }
            }

            return el;
        });
        setFileList(newList);

        if (file.status !== 'uploading') {
            onChange((!maxCount || maxCount > 1) ? newList.map(el => el.url) : (newList[0]?.url || ''));
        }
    }

    const uploadFile = ({file, onSuccess, onError}) => {
        dispatch(uploadApiAction({
            params: {
                file,
                id: objectId,
            },
            onCompleted: (result) => {
                onSuccessUpload(result);
                if (result.result) {
                    onSuccess(result?.data);
                } else {
                    onError();
                }
            },
            onError,
        }));
    };

    const removeFile = async (file) => {
        if (deleteApiAction) {
            dispatch(deleteApiAction({
                params: {
                    id: file.id,
                },
                onCompleted: () => {
                },
                onError: () => {
                },
            }));
        }

        return true;
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    useEffect(() => {
        setFileList(defaultValue);
    }, [defaultValue]);

    return (
        <Upload
            accept='image/*'
            listType="picture-card"
            onChange={handleChange}
            fileList={fileList}
            showUploadList={{
                showPreviewIcon: false
            }}
            customRequest={uploadFile}
            maxCount={maxCount}
            className={styles.uploadImage}
            onRemove={removeFile}
        >
            {(!maxCount || fileList.length < maxCount) && uploadButton}
        </Upload>
    );
}

const UploadImageImmediatelyField = ({
                                         type,
                                         disabled,
                                         defaultValue,
                                         prefix,
                                         maxCount,
                                         objectId,
                                         uploadApiAction,
                                         deleteApiAction,
                                         onSuccessUpload,
                                         ...formItemProps
                                     }) => {


    return (
        <FormItem
            {...formItemProps}
        >
            <UploadImage
                maxCount={maxCount}
                defaultValue={defaultValue}
                objectId={objectId}
                uploadApiAction={uploadApiAction}
                deleteApiAction={deleteApiAction}
                onSuccessUpload={onSuccessUpload}
            />
        </FormItem>
    )
}

export default UploadImageImmediatelyField;
