import { useParams } from "react-router-dom";
import { SavePageContainer } from "@/components";
import paths from "@/constants/paths";
import { gradeActions } from "@/redux/actions";
import GradeForm from "@/containers/grade/GradeForm";

const SavePage = () => {
  const { id } = useParams();
  const isCreating = !id;

  const getBreadcrumbs = (data) => {
    return [
      { breadcrumbName: "Cấu hình" },
      { breadcrumbName: "Quản lý khối lớp", path: paths.gradeList },
      {
        breadcrumbName: isCreating ? "Thêm mới khối lớp" : data?.name,
        path: "avoidDuplicate",
      },
    ];
  };
  return (
    <SavePageContainer
      form={GradeForm}
      isCreating={!id}
      objectName="khối lớp"
      pageTitle={
        isCreating ? "Thêm mới khối lớp" : "Cập nhật thông tin khối lớp"
      }
      listUrl={paths.gradeList}
      detailUrl={paths.gradeDetail}
      createAction={gradeActions.create}
      updateAction={gradeActions.update}
      getDetailAction={gradeActions.getDetail}
      getBreadcrumbs={getBreadcrumbs}
    />
  );
};

export default SavePage;
