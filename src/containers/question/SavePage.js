import { useParams } from 'react-router-dom';

import { SavePageContainer } from '@/components';
import paths from '@/constants/paths';
import { questionActions } from '@/redux/actions';
import QuestionForm from "@/containers/question/QuestionForm";

const SavePage = () => {
    const {id} = useParams();
    const isCreating = !id;

    const getBreadcrumbs = (data) => {
        return [
            {breadcrumbName: 'Quản lý câu hỏi', path: paths.questionList},
            {breadcrumbName: isCreating ? 'Thêm mới câu hỏi' : "Cập nhật câu hỏi"}
        ];
    }
    return (
        <SavePageContainer
            form={QuestionForm}
            isCreating={!id}
            objectName="chương trình"
            pageTitle={isCreating ? "Thêm mới câu hỏi" : "Cập nhật thông tin câu hỏi"}
            listUrl={paths.questionList}
            detailUrl={paths.questionDetail}
            createAction={questionActions.create}
            updateAction={questionActions.update}
            getDetailAction={questionActions.getDetail}
            getBreadcrumbs={getBreadcrumbs}
        />

    )
}

export default SavePage;