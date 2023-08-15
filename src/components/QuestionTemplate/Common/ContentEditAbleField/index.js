import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import ContentEditable from 'react-contenteditable';
import { Form } from "antd";
import classNames from "classnames";

import FormItem from "@/components/Form/FormItem";
import { convertHtmlToStr, convertStrToHtml, isElement } from "@/components/QuestionTemplate/Utils";

import styles from "./index.module.scss";

const ContentEditAbleField = forwardRef(({
                                             onChange,
                                             onBlur,
                                             html = "",
                                             isMultiTab = false,
                                             disableTabInput = false,
                                             disableTab = false,
                                             maxLength,
                                             maxLengthMsg,
                                             notAllowWhiteSpace,
                                             disableKeys = ["#", "*"],
                                             onClickInput,
                                             onDeleteTabs,
                                             ...formItemProps
                                         }, ref) => {
    const {fieldName} = formItemProps;
    const {getFieldValue, setFieldValue} = Form.useFormInstance();
    const inputRef = useRef();
    const listInput = useRef([]);
    const htmlFormat = useRef(html);
    const hiddenRef = useRef();
    const inputMinWidth = 70;
    useImperativeHandle(ref, () => ({
        pressTab: handleTab,
        getBoundingClientRect: () => {
            return inputRef.current?.getBoundingClientRect()
        },
        contentEditableRef: inputRef.current,
        listInput: listInput.current,
    }))

    const handleTab = useCallback(() => {
        const inputMinWidth = 100;
        let nodeEl = null;
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (!isElement(range.commonAncestorContainer, inputRef.current)) return;

        const newId = `${Math.random()}${listInput?.current?.length || 0}`;
        const parentEl = range.startContainer;
        if (parentEl.nodeName === "INPUT") return;

        if (!isMultiTab && listInput.current.length > 0) return;

        nodeEl = document.createElement("input");
        nodeEl.id = newId;
        nodeEl.autocomplete = "off";
        nodeEl.style.width = `${inputMinWidth}px`;
        nodeEl.readOnly = disableTabInput;
        range.insertNode(nodeEl);

        listInput.current.push({
            id: newId,
            value: "",
            width: inputMinWidth,
            readOnly: disableTabInput,
        });
        htmlFormat.current = convertHtmlToStr(Array.from(inputRef.current?.childNodes));

        if (nodeEl && nodeEl.nodeName === 'INPUT') {
            if (!disableTabInput) {
                nodeEl.focus()
            } else {
                const range1 = document.createRange()
                range1.setStartAfter(nodeEl)
                selection.removeAllRanges()
                selection.addRange(range1)
            }
        }
    }, [])

    const handleEnter = useCallback(() => {
        let nodeEl = null;
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        nodeEl = document.createTextNode("\n\u200B");
        range.insertNode(nodeEl);

        htmlFormat.current = convertHtmlToStr(Array.from(inputRef.current?.childNodes));
        if (nodeEl) {
            const range1 = document.createRange();
            range1.setStart(nodeEl, 1);
            selection.removeAllRanges();
            selection.addRange(range1);
        }
    }, [])

    const onClickInputIn = (e) => {
        const input = e.target;
        if (input.tagName === 'INPUT') {
            e.preventDefault();
            const inputIdx = listInput.current.findIndex((m) => m.id === input.id);
            onClickInput?.(e, inputIdx);
        }
    }

    const onKeyDown = useCallback(event => {
        if (disableKeys.includes(event.key)) {
            event.preventDefault()
            return;
        }

        let ctrlDown = false
        if (event.ctrlKey) ctrlDown = true
        if (ctrlDown && event.key.toLowerCase() === "z") {
            event.preventDefault()
            return;
        }
        const isTab = !disableTab && event.code === "Tab";
        const isEnter = event.code === "Enter";
        if (isTab || isEnter) {
            event.preventDefault()
            if (isTab) handleTab()
            else if (isEnter) handleEnter()
        }
    }, [])

    const onPreventTabKey = useCallback((e) => {
        const el = e.target
        if (el.nodeName === 'INPUT' && (e.code === 'Tab' || e.code === 'Enter')) {
            e.preventDefault()
            e.stopPropagation()
        }
    }, [])

    const onInputChange = useCallback((e) => {
        const el = e.target
        if (el.nodeName !== 'INPUT') return;
        const itemInput = listInput.current.find((m) => m.id === el.id);
        itemInput.value = el.value;
        htmlFormat.current = convertHtmlToStr(Array.from(inputRef.current?.childNodes));
        setTimeout(() => {
            hiddenRef.current.textContent = el.value
            if (hiddenRef.current?.offsetWidth > 70) {
                el.style.width = `${hiddenRef.current?.offsetWidth}px`
                itemInput.width = hiddenRef.current?.offsetWidth
            } else {
                el.style.width = `${inputMinWidth}px`
                itemInput.width = inputMinWidth
            }
        }, 0)
    }, [])

    useEffect(() => {
        inputRef.current?.setAttribute("ondragenter", "return false")
        inputRef.current?.setAttribute("ondragleave", "return false")
        inputRef.current?.setAttribute("ondragover", "return false")
        inputRef.current?.setAttribute("ondrop", "return false")
        inputRef.current?.addEventListener('input', onInputChange)
        inputRef.current?.addEventListener('keydown', onPreventTabKey)
        setTimeout(() => {
            for (let i = 0, len = listInput.current.length; i < len; i++) {
                const childN = document.getElementById(`${listInput.current[i].id}`);

                if (childN && childN.nodeName === 'INPUT') {
                    hiddenRef.current.textContent = childN.value
                    if (hiddenRef.current?.offsetWidth > inputMinWidth) {
                        childN.style.width = `${hiddenRef.current?.offsetWidth}px`
                        listInput.current[i].width = hiddenRef.current?.offsetWidth
                    } else {
                        childN.style.width = `${inputMinWidth}px`
                        listInput.current[i].width = inputMinWidth
                    }
                }
            }
        }, 0);

        const length = (getFieldValue(fieldName)?.match(/##/g) || []).length;
        listInput.current = Array.from(Array(length)).map(_ => ({...{id: `${Math.random()}${listInput?.current?.length || 0}`}}));

        return () => {
            inputRef?.current?.removeEventListener('input', onInputChange)
            inputRef?.current?.removeEventListener('keydown', onPreventTabKey)
        }
    }, [])

    const onPaste = (event) => {
        event.preventDefault()
        let data = event.clipboardData.getData('text').replace(/(\#|\*)/g, '')
        data = data?.replace(/\r?\n|\r/g, '')
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        range.deleteContents()
        const node = document.createTextNode(data)
        range.insertNode(node)
        selection.removeAllRanges()
        const newRange = document.createRange()
        newRange.setStart(node, data.length)
        selection.addRange(newRange)
    }

    useEffect(() => {
        if (fieldName) {
            htmlFormat.current = getFieldValue(fieldName);
            return;
        }

        htmlFormat.current = html;
    }, [html, fieldName])

    const InputContentEditAble = useCallback(({getPlaceHolder, ...inputProps}) => {
        const onChangeValue = (e) => {
            if (fieldName) {
                const el = e.currentTarget;
                let text = "";
                for (let i = 0, len = el.childNodes.length; i < len; i++) {
                    const childNode = el.childNodes[i];
                    text += convertHtmlToStr([childNode]);
                }
                htmlFormat.current = text;
            }
            onChange?.(e);

            //////mark the input has been deleted
            const remainInputIds = [...inputRef.current?.childNodes].filter(item => item.tagName === 'INPUT').map(item => item.id);
            const mappingRemainList = listInput.current?.map(item => remainInputIds.includes(item.id));
            let temp = [...listInput.current];
            for (let i = 0; i < mappingRemainList.length; i++) {
                if (!mappingRemainList[i]) {
                    temp[i] = {...temp[i], isDeleted: true}
                }
            }
            onDeleteTabs?.(e, temp);
            listInput.current = temp;
        }

        const onBlurValue = (e) => {
            setFieldValue(fieldName, htmlFormat.current);

            onBlur?.(e);
        }

        const remainInput = listInput.current.filter(item => !item.isDeleted);
        const {status} = Form.Item.useStatus();

        return (
            <div className={classNames(styles.inputPlaceholder, {
                [styles.error]: status === "error"
            })}>
                <ContentEditable
                    innerRef={inputRef}
                    html={convertStrToHtml(htmlFormat.current || "", {current: remainInput})}
                    onBlur={onBlurValue}
                    onChange={onChangeValue}
                    onKeyDown={onKeyDown}
                    onMouseDown={onClickInputIn}
                    onPaste={onPaste}
                    style={{...formItemProps.style, outline: "none"}}
                />
                <span className={styles.placeholder}>{getPlaceHolder()}</span>
                <span className="hidden-text" ref={hiddenRef}></span>
            </div>
        )
    }, [])

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
        <FormItem {...formItemProps}
                  fieldRules={getTextFieldRules()}>
            <InputContentEditAble listInput={listInput} fieldName={fieldName} getFieldValue={getFieldValue}
                                  onChange={onChange} setFieldValue={setFieldValue} inputRef={inputRef}
                                  hiddenRef={inputRef} onClickInputIn={onClickInputIn} htmlFormat={htmlFormat}
                                  onDeleteTabs={onDeleteTabs} onKeyDown={onKeyDown} {...formItemProps}/>
        </FormItem>
    )
});

export default ContentEditAbleField;