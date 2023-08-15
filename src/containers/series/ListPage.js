import { Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { ListPageContainer } from "@/components";
import { gradeActions, seriesActions } from "@/redux/actions";
import paths from "@/constants/paths";
import { fieldTypes } from "@/constants";
import { bookSourceDDL } from "@/constants/masterData";
import { mappingDropdownData } from "@/utils";
import { useNotification } from "@/hooks";

import { ArrowDownOutlined, PictureOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ListPage = () => {
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = useNotification();
  const [, setSearchParams] = useSearchParams();

  const [grades, setGrades] = useState([]);

  const onUpdateSeriesFromEduHome = (e, getList) => {
    confirm({
      title: "Bạn chắc chắn muốn cập nhật toàn bộ chương trình?",
      content: "",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        onConfirm(getList);
      },
      onCancel() {},
    });
  };

  const onConfirm = (getList) => {
    dispatch(
      seriesActions.syncEduHome({
        onCompleted: (res) => {
          showSuccessMessage("Cập nhật toàn bộ chương trình thành công");
          setSearchParams({});
          getList();
        },
        onError: () => {
          showErrorMessage("Cập nhật toàn bộ chương trình thất bại");
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      gradeActions.getList({
        onCompleted: (res) => {
          setGrades(res.data || []);
        },
        onError: (err) => {
          console.log(err);
        },
      })
    );
  }, []);

  return (
    <>
      <ListPageContainer
        objectName="chương trình"
        detailUrl={paths.seriesDetail}
        breadcrumbs={[
          { breadcrumbName: "Cấu hình" },
          { breadcrumbName: "Quản lý chương trình" },
        ]}
        columns={[
          { title: "Mã chương trình", dataIndex: "id" },
          {
            title: "Tên chương trình",
            dataIndex: "name",
            render: (name) => (
              <Typography.Text
                ellipsis={{ tooltip: name }}
                style={{ maxWidth: 500 }}
              >
                {name}
              </Typography.Text>
            ),
          },
          {
            title: "Sách minh họa",
            dataIndex: "imageUrl",
            render: (imageUrl) =>
              imageUrl ? (
                <img
                  src={imageUrl}
                  style={{ height: "auto", width: 50 }}
                  alt={"logo"}
                />
              ) : (
                <PictureOutlined className="empty-img-col" />
              ),
          },
          {
            title: "Series Eduhome ID",
            dataIndex: "seriesEduhomeId",
            render: (seriesEduhomeId) => seriesEduhomeId || "N/A",
          },
          {
            title: "Grade",
            dataIndex: "gradeId",
            render: (gradeId) => {
              const grade = grades.find((g) => g.id === gradeId);
              return grade?.name || "N/A";
            },
          },
          {
            title: "Loại sách",
            dataIndex: "seriesGroup",
            render: (seriesGroup) => {
              const group = bookSourceDDL.find((b) => b.value === seriesGroup);
              return group?.label || "N/A";
            },
          },
          { title: "Độ ưu tiên", dataIndex: "priority" },
        ]}
        searchFields={[
          {
            key: "name",
            searchPlaceholder: "Tên chương trình",
            gridCol: 6,
          },
          {
            key: "group",
            searchPlaceholder: "Loại sách",
            fieldType: fieldTypes.SELECT,
            gridCol: 6,
            options: bookSourceDDL,
          },
          {
            key: "gradeId",
            searchPlaceholder: "Grade",
            fieldType: fieldTypes.SELECT,
            gridCol: 6,
            options: mappingDropdownData(grades),
          },
        ]}
        buttonActions={[
          {
            label: "Cập nhật",
            icon: <ArrowDownOutlined />,
            onClick: onUpdateSeriesFromEduHome,
          },
        ]}
        actionBar={{
          isEdit: true,
          isCreate: true,
          isDelete: true,
        }}
        getListAction={seriesActions.getList}
        deleteAction={seriesActions.delete}
      ></ListPageContainer>
    </>
  );
};

export default ListPage;
