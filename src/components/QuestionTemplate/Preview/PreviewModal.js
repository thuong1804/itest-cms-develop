import React from "react";
import { Button, Col, Modal, Typography } from "antd";

import { questionTypes } from "@/constants";
import MCPreview from "@/components/QuestionTemplate/Preview/MC";

const PreviewModal = ({isOpen, children, onClose, questionType, previewData}) => {
    const renderContent = () => {
        switch (questionType) {
            case questionTypes.MC1:
            case questionTypes.MC2:
            case questionTypes.MC3:
            case questionTypes.MC4:
            case questionTypes.MC5:
            case questionTypes.MC6:
            case questionTypes.MC7:
            case questionTypes.MC8:
            case questionTypes.MC9:
            case questionTypes.MC10:
            case questionTypes.MC11:
                return <MCPreview data={previewData}/>;
        }
    }

    return (
        <Modal
            title="XEM TRƯỚC CÂU HỎI"
            open={isOpen}
            onCancel={onClose}
            closable
            width={1000}
            bodyStyle={{maxHeight: 700, overflowY: "auto", overflowX: 'hidden'}}
            footer={[
                <Button key="closebtn" type="primary" form="change-password" onClick={onClose}>
                    Đóng
                </Button>
            ]}
        >
            <Col span={24}>
                <Typography.Title
                    level={5}>{previewData.parentQuestionDescription || previewData.questionDescription}</Typography.Title>
            </Col>
            {renderContent()}
        </Modal>
    )
}

export default PreviewModal;