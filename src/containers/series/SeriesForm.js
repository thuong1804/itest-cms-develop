import { Col, Form, Row } from 'antd';

import { NumericField, TextField } from '@/components/Form';
import { cleanObject } from "@/utils";

const AdminForm = ({
                       form,
                       formId,
                       detailData,
                       isCreating,
                       onSubmit
                   }) => {
    const handleSubmit = (values) => {
        onSubmit(cleanObject(values));
    }

    return (
        <Form
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            initialValues={{...detailData}}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <NumericField
                        fieldName="id"
                        label="Mã chương trình"
                        required
                        width="100%"
                        disabled={true}
                        min={1}
                    />
                </Col>
                <Col span={12}>
                    <TextField
                        fieldName="name"
                        label="Tên chương trình"
                        maxLength={100}
                        notAllowWhiteSpace
                        required
                    />
                </Col>
                <Col span={12}>
                    <NumericField
                        fieldName="priority"
                        label="Độ ưu tiên"
                        required
                        width="100%"
                        min={1}
                        max={1000}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default AdminForm;