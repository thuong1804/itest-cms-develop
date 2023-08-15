import { useParams } from 'react-router-dom';

import { SavePageContainer } from '@/components';
import TeacherForm from './TeacherForm';

import paths from '@/constants/paths';
import { teacherActions } from '@/redux/actions';

const SavePage = () => {
    const { id } = useParams();
    const isCreating = !id;

    const getBreadcrumbs = (data) => {
        return [
            { breadcrumbName: 'Quản lý user' },
            { breadcrumbName: 'Danh sách giáo viên', path: paths.teacherList },
            { breadcrumbName: isCreating ? 'Thêm mới giáo viên' : 'Cập nhật thông tin giáo viên' }
        ];
    }
    return (
        <SavePageContainer
            form={TeacherForm}
            isCreating={!id}
            objectName="giáo viên"
            pageTitle={isCreating ? "Thêm mới giáo viên" : "Cập nhật thông tin người dùng"}
            listUrl={paths.teacherList}
            detailUrl={paths.teacherDetail}
            createAction={teacherActions.create}
            updateAction={teacherActions.update}
            getDetailAction={teacherActions.getDetail}
            getBreadcrumbs={getBreadcrumbs}
            isRefreshUpdateSuccess={true}
        />

    )
}

export default SavePage;