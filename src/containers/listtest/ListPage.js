import "../listtest/formlist.scss";
import { ListPageContainer } from "@/components";
// import { gradeActionsTest } from "@/redux/actions";
import paths from "@/constants/paths";
import { gradeActionsTest } from "@/redux/actions";
const ListPageTest = () => {
  const columns = [
    {
      title: "Mã Khối Lớp",
      dataIndex: "id",
      key: "idClass",
    },
    {
      title: "Tên Khối Lớp",
      dataIndex: "name",
      key: "nameClass",
    },
    {
      title: "Độ Ưu Tiên",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Grade ID",
      dataIndex: "gradeEduhomeId",
      key: "gradeId",
    },
  ];
  return (
    <ListPageContainer
      objectName='Khối Lớp'
      getListAction={gradeActionsTest.getList}
      columns={columns}
      breadcrumbs={[
        { breadcrumbName: "Cấu hình" },
        { breadcrumbName: "Quản lý khối giáo viên" },
      ]}
      detailUrl={paths.gradesTestDetail}
      createUrl={paths.gradesTestCreate}
      actionBar={{
        isEdit: true,
        isCreate: true,
        isDelete: true,

      }}
      disablePagination={true}
    ></ListPageContainer>
  );
};
export default ListPageTest;
