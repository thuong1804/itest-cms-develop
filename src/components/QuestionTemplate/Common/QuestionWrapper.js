import React, { useCallback } from "react";
import { Button, Card, Row, Typography } from "antd";
import classNames from "classnames";

import { EyeOutlined } from "@ant-design/icons";

import styles from "./QuestionWrapper.module.scss";

const QuestionWrapper = ({children, title, className, onPreview, ...props}) => {
    const Title = useCallback(() => (
        <Row justify="space-between" align="middle">
            <Typography.Text>{title}</Typography.Text>
            {onPreview ?
                <Button type="primary" icon={<EyeOutlined/>} onClick={onPreview}>
                    Xem trước
                </Button>
                : null
            }
        </Row>
    ), [title])

    return (
        <>
            <Card
                title={<Title/>}
                type="inner"
                className={classNames(styles.questionWrapper, className)}
                bodyStyle={{backgroundColor: "#f3f4f7"}}
                headStyle={{backgroundColor: "#d7d7d8", position: 'sticky', top: 0, zIndex: 22}}
                {...props}
            >
                {children}
            </Card>
        </>
    )
}

export default QuestionWrapper;