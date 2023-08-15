import { Result, Typography } from "antd";

const {Text, Title} = Typography;

const EmptyData = () => {
    return (
        <Result
            status="404"
            title="Không tìm thấy dữ liệu phù hợp!"
            subTitle="Xin lỗi, dữ liệu mà bạn tìm kiếm không tồn tại trên hệ thống."
        />
    )
}

export default EmptyData;