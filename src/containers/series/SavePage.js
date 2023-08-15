import { useParams } from 'react-router-dom';

import { SavePageContainer } from '@/components';

import paths from '@/constants/paths';
import { seriesActions } from '@/redux/actions';
import SeriesForm from "@/containers/series/SeriesForm";

const SavePage = () => {
    const { id } = useParams();
    const isCreating = !id;

    const getBreadcrumbs = (data) => {
        return [
            { breadcrumbName: 'Cấu hình' },
            { breadcrumbName: 'Quản lý chương trình', path: paths.seriesList },
            { breadcrumbName: isCreating ? 'Thêm mới chương trình' : data?.name, path: "avoidDuplicate" }
        ];
    }
    return (
        <SavePageContainer
            form={SeriesForm}
            isCreating={!id}
            objectName="chương trình"
            pageTitle={isCreating ? "Thêm mới chương trình" : "Cập nhật thông tin chương trình"}
            listUrl={paths.seriesList}
            detailUrl={paths.seriesDetail}
            updateAction={seriesActions.update}
            getDetailAction={seriesActions.getDetail}
            getBreadcrumbs={getBreadcrumbs}
        />

    )
}

export default SavePage;