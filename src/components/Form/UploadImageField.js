import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import useFetch from '@/hooks/useFetch';
import apiConfig from '@/constants/apiConfig';

import FormItem from './FormItem';

import styles from './UploadImageField.module.scss';
import { useEffect } from 'react';

const UploadImage = ({ value, onChange, maxCount, directory }) => {
    const { execute: executeUploadImage } = useFetch(apiConfig.media.image);

    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList, file }) => {
        const newList = fileList.map(el => {
            if (el.uid === file?.uid) {
                return {
                    ...el,
                    url: file.response,
                }
            }

            return el;
        });
        setFileList(newList);

        if (file.status !== 'uploading') {
            onChange(maxCount > 1 ? newList.map(el => el.url) : (newList[0]?.url || ''));
        }
    }

    const uploadFile = ({ file, onSuccess, onError }) => {
        executeUploadImage({
            params: {
                file,
                directory,
            },
            onCompleted: (result) => {
                onSuccess(result?.data?.url || '');
            },
            onError,
        });
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        const getFileFromValue = () => {
            if (maxCount > 1) {
                return value?.map(el => ({ url: el, uid: `${el}-${new Date().getTime()}` })) || [];
            }

            return value ? [{ url: value, uid: `${value}-${new Date().getTime()}` }] : [];
        }

        setFileList(getFileFromValue());
    }, [value]);

    return (
        <Upload
            listType="picture-card"
            onChange={handleChange}
            fileList={fileList}
            showUploadList={{
                showPreviewIcon: false
            }}
            customRequest={uploadFile}
            maxCount={maxCount}
            className={styles.uploadImage}
        >
            {fileList.length < maxCount && uploadButton}
        </Upload>
    );
}

const UploadImageField = ({
    type,
    disabled,
    defaultValue,
    prefix,
    maxCount = 1,
    directory = 'collection',
    ...formItemProps
}) => {


    return (
        <FormItem
            {...formItemProps}
        >
            <UploadImage maxCount={maxCount} directory={directory} />
        </FormItem>
    )
}

export default UploadImageField;
