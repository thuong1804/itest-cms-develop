import { Typography } from "antd";

import { ListPageContainer } from "@/components";
import { gradeActions, teacherActions } from "@/redux/actions";
import paths from "@/constants/paths";
const ListPage = () => {
  return (
    <>
      <ListPageContainer
        objectName="khối lớp"
        detailUrl={paths.gradeDetail}
        createUrl={paths.gradeCreate}
        breadcrumbs={[
          { breadcrumbName: "Cấu hình" },
          { breadcrumbName: "Quản lý khối lớp" },
        ]}
        columns={[
          { title: "Mã khối lớp", dataIndex: "id" },
          {
            title: "Tên khối lớp",
            dataIndex: "name",
            render: (name) => (
              <Typography.Text
                ellipsis={{ tooltip: name }}
                style={{ maxWidth: 500 }}
              >
                {name}
              </Typography.Text>
            ),
          },
          { title: "Độ ưu tiên", dataIndex: "priority" },
          { title: "Grade ID", dataIndex: "gradeEduhomeId" },
        ]}
        actionBar={{
          isEdit: true,
          isCreate: true,
        }}
        getListAction={gradeActions.getList}
        updateStatusAction={teacherActions.updateStatus}
        disablePagination={true}
      ></ListPageContainer>
    </>
  );
};

export default ListPage;
