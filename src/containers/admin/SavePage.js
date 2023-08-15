import { useParams } from 'react-router-dom';

import { SavePageContainer } from '@/components';
import AdminForm from './AdminForm';

import paths from '@/constants/paths';
import { adminActions } from '@/redux/actions';

const SavePage = () => {
    const { id } = useParams();
    const isCreating = !id;
    
    const getBreadcrumbs = (data) => {
        return [
            { breadcrumbName: 'Quản lý user' },
            { breadcrumbName: 'Danh sách administrator', path: paths.adminList },
            { breadcrumbName: isCreating ? 'Thêm mới administrator' : 'Cập nhật thông tin administrator' }
        ];
    }
    return (
        <SavePageContainer
            form={AdminForm}
            isCreating={!id}
            objectName="administrator"
            pageTitle={isCreating ? "Thêm mới administrator" : "Cập nhật thông tin administrator"}
            listUrl={paths.adminList}
            detailUrl={paths.adminDetail}
            createAction={adminActions.create}
            updateAction={adminActions.update}
            getDetailAction={adminActions.getDetail}
            getBreadcrumbs={getBreadcrumbs}
        />

    )
}

export default SavePage;