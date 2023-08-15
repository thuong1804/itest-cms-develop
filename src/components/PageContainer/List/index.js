import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Divider, Form, Modal } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import { PageWrapper, BaseTable, SearchForm } from "@/components";
import {
  DEFAULT_TABLE_ITEM_SIZE,
  DATE_FORMAT_VALUE,
  fieldTypes,
  commonStatus,
} from "@/constants";
import { isNumeric, cleanObject } from "@/utils";
import { useNotification } from "@/hooks";

import {
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import styles from "./index.module.scss";

const { confirm } = Modal;

const ListPageContainer = ({
  objectName,
  breadcrumbs,
  columns,
  disablePagination,
  dataRowKey = "id",
  actionBar,
  detailUrl,
  createUrl,
  searchFields,
  mappingSearchParams,
  getListAction,
  deleteAction,
  buttonActions,
  updateStatusAction,
  onResetSearchParams,
}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchForm] = Form.useForm();

  const dispatch = useDispatch();
  const { showErrorMessage, showSuccessMessage } = useNotification();

  const paginationRef = useRef({ pageSize: DEFAULT_TABLE_ITEM_SIZE });

  const prepareGetListParams = useCallback(() => {
    let page = 0;
    let filter = {};
    if (paginationRef.current.current) {
      page = paginationRef.current.current - 1;
    }
    if (mappingSearchParams) {
      filter = mappingSearchParams(searchFields);
    } else {
      searchFields?.forEach((searchField) => {
        if (searchParams.has(searchField.key)) {
          filter[searchField.key] = searchParams.get(searchField.key);
        }
      });
    }

    return {
      page,
      size: paginationRef.current.pageSize,
      ...filter,
    };
  }, [searchParams]);

  const prepareColumns = () => {
    if (actionBar.isEdit || actionBar.isDelete) {
      return [...columns, renderActionColumn()];
    }

    return columns;
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const searchParams = prepareGetListParams();
    delete searchParams.size;
    setSearchParams({
      ...searchParams,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const getList = useCallback(() => {
    if (!getListAction) return;
    setLoading(true);
    dispatch(
      getListAction({
        params: prepareGetListParams(),
        onCompleted: (response) => {
          if (response?.result) {
            if (disablePagination) {
              setList(response?.data || []);
            } else {
              const { content, totalElements } = response?.data || {};
              paginationRef.current.total = totalElements || 0;
              setList(content || []);
            }
          }
          setLoading(false);
        },
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
      })
    );
  }, [getListAction, prepareGetListParams, disablePagination]);

  const onSearch = (values) => {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = dayjs(values[key]).format(DATE_FORMAT_VALUE);
      } else {
        values[key] = values[key]?.toString()?.trim();
      }
    });

    setSearchParams(cleanObject(values));
  };

  const onResetSearch = () => {
    searchForm.resetFields();
    setSearchParams({});
    onResetSearchParams?.();
  };

  const onConfirmDelete = (id) => {
    confirm({
      title: `Bạn có chắc muốn xóa ${objectName} này?`,
      content: "",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        onDelete(id);
      },
      onCancel() {},
    });
  };

  const onDelete = (id) => {
    if (deleteAction) {
      dispatch(
        deleteAction({
          params: { id },
          onCompleted: () => {
            showSuccessMessage(`Xóa ${objectName} thành công!`);
            const isLastItem = list?.length === 1;
            if (paginationRef.current.current > 1 && isLastItem) {
              setSearchParams({ page: paginationRef.current.current - 1 });
            } else {
              getList();
            }
          },
          onError: (err) => {
            showErrorMessage(`Xóa ${objectName} thất bại. Vui lòng thử lại!`);
          },
        })
      );
    }
  };

  const onConfirmUpdateStatus = (id, status) => {
    confirm({
      title: `Bạn có chắc muốn ${
        status === commonStatus.ACTIVE ? "khóa" : "kích hoạt"
      } ${objectName} này?`,
      content: "",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        onUpdateStatus(id, status);
      },
      onCancel() {},
    });
  };

  const onUpdateStatus = (id, status) => {
    if (deleteAction) {
      const isActive = status === commonStatus.ACTIVE;
      dispatch(
        updateStatusAction({
          params: {
            id,
            status: isActive ? commonStatus.LOCK : commonStatus.ACTIVE,
          },
          onCompleted: () => {
            showSuccessMessage(
              `${isActive ? "Khoá" : "Kích hoạt"} ${objectName} thành công!`
            );
            const isLastItem = list?.length === 1;
            if (paginationRef.current.current > 1 && isLastItem) {
              setSearchParams({ page: paginationRef.current.current - 1 });
            } else {
              getList();
            }
          },
          onError: (err) => {
            showErrorMessage(
              `${
                isActive ? "Khoá" : "Kích hoạt"
              } ${objectName} thất bại. Vui lòng thử lại!`
            );
          },
        })
      );
    }
  };

  useEffect(() => {
    let page = 1;
    let pageSize = paginationRef.current.pageSize;
    if (searchParams.has("page") && isNumeric(searchParams.get("page"))) {
      page = parseInt(searchParams.get("page"));
    }
    if (
      searchParams.has("pageSize") &&
      isNumeric(searchParams.get("pageSize"))
    ) {
      pageSize = parseInt(searchParams.get("pageSize"));
    }
    paginationRef.current = {
      ...paginationRef.current,
      current: page,
      pageSize,
    };

    if (searchFields?.length) {
      const searchFormValues = {};
      searchFields.forEach((searchField) => {
        if (
          searchParams.has(searchField.key) &&
          searchFormValues[searchField.key] !==
            searchParams.get(searchField.key)
        ) {
          if (searchField.fieldType === fieldTypes.DATE) {
            searchFormValues[searchField.key] = dayjs(
              searchParams.get(searchField.key)
            );
            return;
          }

          searchFormValues[searchField.key] = searchParams.get(searchField.key);
        }
      });
      if (Object.keys(searchFormValues).length > 0) {
        searchForm.setFieldsValue(searchFormValues);
      }
    }
    getList();
  }, [getListAction, searchParams, searchForm, getList]);

  const renderSearchForm = () => {
    if (searchFields?.length > 0)
      return (
        <SearchForm
          searchFields={searchFields}
          onSubmit={onSearch}
          onResetForm={onResetSearch}
          form={searchForm}
        />
      );
    return null;
  };
  console.log({ list });
  const renderActionColumn = () => {
    return {
      title: "Action",
      width: "100px",
      align: "center",
      render: (dataRow) => {
        const actionColumns = [];
        if (actionBar.isEdit) {
          actionColumns.push(
            <Link to={detailUrl.replace(":id", dataRow.id)}>
              <Button type="link">
                <EditOutlined />
              </Button>
            </Link>
          );
        }
        if (actionBar.isUpdateStatus) {
          actionColumns.push(
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                onConfirmUpdateStatus(dataRow.id, dataRow.status);
              }}
            >
              {dataRow.status === commonStatus.ACTIVE ? (
                <LockOutlined />
              ) : (
                <UnlockOutlined />
              )}
            </Button>
          );
        }
        if (actionBar.isDelete) {
          actionColumns.push(
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                onConfirmDelete(dataRow.id);
              }}
            >
              <DeleteOutlined />
            </Button>
          );
        }
        const actionColumnsWithDivider = [];
        actionColumns.forEach((action, index) => {
          actionColumnsWithDivider.push(action);
          if (index !== actionColumns.length - 1) {
            actionColumnsWithDivider.push(<Divider type="vertical" />);
          }
        });
        return (
          <span className={styles.actionCol}>
            {actionColumnsWithDivider.map((action, index) => (
              <span key={index}>{action}</span>
            ))}
          </span>
        );
      },
    };
  };

  const renderButtonActions = () => {
    return (
      <Row justify="end" gutter={16} className={styles.actionBar}>
        <Col>
          {createUrl ? (
            <Link to={createUrl}>
              <Button type="primary">
                <PlusOutlined /> Thêm {objectName}
              </Button>
            </Link>
          ) : null}
        </Col>
        {buttonActions?.map((item, index) => {
          return (
            <Col key={index}>
              <Button
                {...item}
                type="primary"
                onClick={(e) => item.onClick?.(e, getList, list)}
              >
                {item.label}
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <div className={styles.listPage}>
        {renderSearchForm()}
        {renderButtonActions()}
        <BaseTable
          rowKey={dataRowKey}
          columns={prepareColumns()}
          loading={loading}
          dataSource={list}
          pagination={disablePagination ? false : paginationRef.current}
          onChange={handleTableChange}
        />
      </div>
    </PageWrapper>
  );
};

export default ListPageContainer;
