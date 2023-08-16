import { useParams } from 'react-router-dom';

import { SavePageContainer } from '@/components';

import paths from '@/constants/paths';
import { seriesActionsTest } from '@/redux/actions';
import SeriesFormTest from "@/containers/series/SeriesForm";

const SavePage = () => {
    const { id } = useParams();
    const isCreating = !id;

    const getBreadcrumbs = (data) => {
        return [
            { breadcrumbName: 'Cấu hình' },
            { breadcrumbName: 'Quản lý chương trình', path: paths.seriesListTest },
            { breadcrumbName: isCreating ? 'Thêm mới chương trình' : data?.name, path: "avoidDuplicate" }
        ];
    }
    return (
        <SavePageContainer
            form={SeriesFormTest}
            isCreating={!id}
            objectName="chương trình"
            pageTitle={isCreating ? "Thêm mới chương trình" : "Cập nhật thông tin chương trình"}
            listUrl={paths.seriesListTest}
            detailUrl={paths.seriesDetailTest}
            updateAction={seriesActionsTest.update}
            getDetailAction={seriesActionsTest.getDetail}
            getBreadcrumbs={getBreadcrumbs}
        />

    )
}

export default SavePage;