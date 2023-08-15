import React from "react";
import { Space, Tooltip } from "antd";

import { BoldOutlined, ItalicOutlined, LineOutlined, UnderlineOutlined } from "@ant-design/icons";

const Toolbar = ({onAddInput, isAddInput = true}) => {
    const onBold = (e) => {
        e.preventDefault()
        const selection = window.getSelection()
        if (selection.rangeCount === 0) return
        document.execCommand('Bold', false, null)
    }
    const onItalic = (e) => {
        e.preventDefault()
        const selection = window.getSelection()
        if (selection.rangeCount === 0) return
        document.execCommand('Italic', false, null)
    }
    const onUnderline = (e) => {
        e.preventDefault()
        const selection = window.getSelection()
        if (selection.rangeCount === 0) return
        document.execCommand('Underline', false, null)
    }

    return (
        <Space>
            {isAddInput ?
                <Tooltip title="Thêm khoảng trống">
                    <LineOutlined onMouseDown={onAddInput} className="cursor-pointer"/>
                </Tooltip>
                : null}
            <BoldOutlined onMouseDown={onBold} className="cursor-pointer"/>
            <ItalicOutlined onMouseDown={onItalic} className="cursor-pointer"/>
            <UnderlineOutlined onMouseDown={onUnderline} className="cursor-pointer"/>
        </Space>
    )
}

export default Toolbar;