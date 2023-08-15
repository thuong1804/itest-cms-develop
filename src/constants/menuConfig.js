import React from "react";
import {
  UsergroupAddOutlined,
  FileImageOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import paymentIcon from "@/assets/images/payment.svg";
import packageIcon from "@/assets/images/package.svg";

import paths from "./paths";

const navMenuConfig = [
  // {
  //     label: 'Quản lý user',
  //     icon: <UsergroupAddOutlined />,
  //     children: [
  //         {
  //             label: 'Giáo viên',
  //             path: paths.teacherList,
  //         },
  //         {
  //             label: 'Học sinh',
  //         },
  //         {
  //             label: 'Phụ huynh',
  //         },
  //         {
  //             label: 'Administrator',
  //             path: paths.adminList
  //         },
  //     ]
  // },
  // {
  //     label: 'Quản lý thanh toán',
  //     icon: <img src={paymentIcon} alt=''/>,
  //     path: paths.payment,
  // },
  {
    label: "Quản lý câu hỏi",
    icon: <QuestionCircleOutlined />,
    path: paths.questionList,
  },
  // {
  //     label: 'Quản lý gói dịch vụ',
  //     icon: <img src={packageIcon} alt=''/>,
  //     children: [
  //         {
  //             label: 'Giáo viên',
  //             path: paths.teacherPackageList
  //         },
  //     ]
  // },
  // {
  //     label: 'Quản lý banner',
  //     icon: <FileImageOutlined />,
  //     path: paths.banner,
  // },
  {
    label: "Cấu hình",
    icon: <SettingOutlined />,
    children: [
      {
        label: "Quản lý khối lớp",
        path: paths.gradeList,
      },
      {
        label: "Quản lý chương trình",
        path: paths.seriesList,
      },
      {
        label: "Quản lý giáo viên",
        path: paths.gradesListTest,
      },
    ],
  },
];

export default navMenuConfig;
