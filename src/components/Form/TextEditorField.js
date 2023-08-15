import apiConfig from '@/constants/apiConfig';
import useFetch from '@/hooks/useFetch';
import React, { useMemo, useRef } from 'react';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import FormItem from './FormItem';
import styles from './TextEditorField.module.scss';

const formats = [
    'header',
    'font',
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'bullet',
    'indent',
    'image',
];

const TextEditorField = ({
    type,
    disabled,
    onBlur,
    defaultValue,
    prefix,
    style,
    ...formItemProps
}) => {
    const quillRef = useRef();
    const { execute: executeUploadImage } = useFetch(apiConfig.media.image);

    const imageHandler = () => {
        const input = document.createElement('input');
        const editor = quillRef.current.editor;

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const imageUrl = await new Promise(res => {
                executeUploadImage({
                    params: {
                        file,
                        directory: 'image-content',
                    },
                    onCompleted: (result) => {
                        res(result?.data?.url);
                    },
                    onError: () => res(),
                });
            });

            if (imageUrl) {
                const index = editor.getSelection(true).index;
                editor.insertEmbed(index, 'image', imageUrl);
            }
        };
    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    [{ color: [] }, { background: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['image'],
                    ['clean'],
                ],
                handlers: {
                    // handlers object will be merged with default handlers object
                    image: imageHandler
                },
            },
            clipboard: {
                matchVisual: false,
            },
        };
    }, [])

    return (
        <FormItem
            {...formItemProps}
        >
            <ReactQuill
                style={style}
                formats={formats}
                modules={modules}
                readOnly={disabled}
                className={styles.textEditor}
                ref={quillRef}
            />
        </FormItem>
    )
}

export default TextEditorField;
