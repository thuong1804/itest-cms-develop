import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'antd';
import { useDispatch } from 'react-redux';

import { PageWrapper } from '@/components';
import { useNotification } from '@/hooks';

import styles from './index.module.scss';
import classNames from "classnames";

const SavePageContainer = ({
    form: SaveForm,
    isCreating,
    objectName,
    actionButtons,
    disableActions,
    listUrl,
    detailUrl,
    tabs: tabsProp,
    createAction,
    updateAction,
    getDetailAction,
    onCreate: onCreateProp,
    onUpdate: onUpdateProp,
    getBreadcrumbs,
    getTabs,
    onChangeTab,
    getDetailDataMapping,
    pageTitle,
    isRefreshUpdateSuccess = false,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [detailData, setDetailData] = useState({});
    const { id } = useParams();
    const [form] = Form.useForm();

    const { showErrorMessage, showSuccessMessage } = useNotification();

    const formId = `form-${objectName}`;
    const breadcrumbs = getBreadcrumbs?.(detailData) || [];
    const tabs = getTabs?.(detailData) || tabsProp;

    const onCancel = () => {
        navigate(-1);
    }

    const onCreate = (values) => {
        if (onCreateProp) {
            onCreateProp(values);
        }
        else if (createAction) {
            setIsSubmitting(true);
            dispatch(createAction({
                params: values,
                onCompleted: response => {
                    if (response?.result) {
                        onSaveSuccess(response.data);
                    }
                    else {
                        onSaveFail(response);
                    }
                },
                onError: err => {
                    onSaveFail(err);
                }
            }))
        }
    }

    const onUpdate = (values) => {
        if (onUpdateProp) {
            onUpdateProp(values);
        }
        else if (updateAction) {
            setIsSubmitting(true);
            dispatch(updateAction({
                params: { id: detailData.id, ...values },
                onCompleted: response => {
                    if (response?.result) {
                        onSaveSuccess(response.data);
                    }
                    else {
                        onSaveFail(response);
                    }
                },
                onError: err => {
                    onSaveFail(err);
                }
            }))
        }
    }

    const onSaveFail = (err) => {
        const action = isCreating ? 'Thêm mới' : 'Cập nhật';
        const errMsg = err?.message || `${action} ${objectName} thất bại. Vui lòng thử lại!`;
        setIsSubmitting(false);
        showErrorMessage(errMsg);
    }

    const onSaveSuccess = (data) => {
        const action = isCreating ? 'Thêm mới' : 'Cập nhật';
        setIsSubmitting(false);
        showSuccessMessage(`${action} ${objectName} thành công!`);

        if (!isCreating && isRefreshUpdateSuccess) {
            setDetailData(data);
        }

        if (isCreating && data.id) {
            navigate(listUrl);
        } else {
            navigate(-1);
        }
    }

    const onGetDetailFail = useCallback((err) => {
        showErrorMessage(`Lấy dữ liệu thất bại. Vui lòng thử lại!`);
        navigate(listUrl);
    }, [navigate, showErrorMessage, listUrl])

    useEffect(() => {
        if (!isCreating && id && getDetailAction) {
            dispatch(getDetailAction({
                params: { id },
                onCompleted: response => {
                    if (response?.result) {
                        const data = getDetailDataMapping ? getDetailDataMapping(response.data) : response.data;
                        setDetailData(data);
                    }
                    else {
                        onGetDetailFail(response);
                    }
                },
                onError: err => {
                    onGetDetailFail(err);
                }
            }))
        }
    }, [isCreating, id])

    useEffect(() => {
        form.setFieldsValue(detailData);
    }, [form, detailData])

    return (
        <PageWrapper
            breadcrumbs={breadcrumbs}
            tabs={tabs}
            onChangeTab={onChangeTab}
        >
            <div className={styles.savePage}>
                <div className={classNames(styles.savePageForm, {
                    [styles.hasTabs]: tabs,
                    [styles.disableAction]: disableActions,
                    [styles.hasTabsDisableAction]: disableActions && tabs
                })}>
                    <Card style={{borderRadius: 0, minHeight: '100%'}}>
                        <h5 className={styles.pageTitle}>{pageTitle}</h5>
                        <SaveForm
                            form={form}
                            formId={formId}
                            detailData={detailData}
                            isCreating={isCreating}
                            setDetailData={setDetailData}
                            onSubmit={isCreating ? onCreate : onUpdate}
                        />
                    </Card>
                </div>
                {
                    !disableActions
                    ?
                    <div className={styles.actionBar}>
                        {
                            actionButtons || (
                                <>
                                    <Button disabled={isSubmitting} onClick={onCancel}>Hủy</Button>
                                    <Button form={formId} type="primary" htmlType="submit" loading={isSubmitting}>{isCreating ? 'Thêm mới' : 'Cập nhật'}</Button>
                                </>
                            )
                        }
                    </div>
                    :
                    null
                }
            </div>
        </PageWrapper>

    )
}

export default SavePageContainer;