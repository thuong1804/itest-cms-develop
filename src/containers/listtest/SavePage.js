import { SavePageContainer } from "@/components";
import FormTest from '@/containers/listtest/formList'
import paths from "@/constants/paths";
import { gradeActionsTest } from "@/redux/actions";
import { useParams } from "react-router-dom";
const SavePageTest = () => {
    const { id } = useParams();
    const isCreating = !id;
    const getBreadcrumbs = (data) => {
        return [
            { breadcrumbName: "Cấu hình" },
            { breadcrumbName: "Quản lý khối lớp", path: paths.gradesListTest },
            {
                breadcrumbName: isCreating ? "Thêm mới khối lớp" : data?.name,
                path: "avoidDuplicate",
            },
        ];
    };
    console.log(id);
    return (<>
        <SavePageContainer
            form={FormTest}
            isCreating={!id}
            objectName="khối lớp"
            listUrl={paths.gradesListTest}
            detailUrl={paths.gradesTestDetail}
            getDetailAction={gradeActionsTest.getDetail}
            getBreadcrumbs={getBreadcrumbs}
            createAction={gradeActionsTest.create}
            updateAction={gradeActionsTest.update}
        />
    </>)
}
export default SavePageTest;