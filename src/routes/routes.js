import paths from "@/constants/paths";

import AdminListPage from "@/containers/admin/ListPage";
import AdminSavePage from "@/containers/admin/SavePage";
import TeacherListPage from "@/containers/teacher/ListPage";
import TeacherSavePage from "@/containers/teacher/SavePage";
import ProfilePage from "@/containers/profile";
import PaymentListPage from "@/containers/payment/ListPage";
import BannerListPage from "@/containers/banner/ListPage";
import TeacherPackageListPage from "@/containers/package/teacher/ListPage";
import TeacherPackageListEditPage from "@/containers/package/teacher/ListEditPage";
import TeacherPackageScopeUpdatePage from "@/containers/package/teacher/UpdateScopePackage";
import { userRoles } from "@/constants";
import GradeListPage from "@/containers/grade/ListPage";
import GradeSavePage from "@/containers/grade/SavePage";
import SeriesListPage from "@/containers/series/ListPage";
import SeriesSavePage from "@/containers/series/SavePage";
import QuestionListPage from "@/containers/question/ListPage";
import QuestionSavePage from "@/containers/question/SavePage";
import ListPageTest from "@/containers/listtest/ListPage";
import FormListTest from "@/containers/listtest/formList";
import SavePageTest from "@/containers/listtest/SavePage";
const routes = [
  // forbidden: {
  //     path: '/forbidden',
  //     isPublic: false,
  //     component: Forbidden
  // },
  {
    path: paths.adminList,
    component: AdminListPage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.adminCreate,
    component: AdminSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.adminDetail,
    component: AdminSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.teacherList,
    component: TeacherListPage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.teacherCreate,
    component: TeacherSavePage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.teacherDetail,
    component: TeacherSavePage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.payment,
    component: PaymentListPage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.banner,
    component: BannerListPage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.teacherPackageList,
    component: TeacherPackageListPage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.teacherPackageDetail,
    component: TeacherPackageListEditPage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.teacherScopePackageUpdate,
    component: TeacherPackageScopeUpdatePage,
    roles: [userRoles.ADMIN, userRoles.SALE],
  },
  {
    path: paths.gradeList,
    component: GradeListPage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.gradeCreate,
    component: GradeSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.gradeDetail,
    component: GradeSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.seriesList,
    component: SeriesListPage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.seriesCreate,
    component: SeriesSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.seriesDetail,
    component: SeriesSavePage,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.seriesListTest,
    component: ListPageTest,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.gradesListTest,
    component: ListPageTest,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.gradesTestCreate,
    component: SavePageTest,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.gradesTestDetail,
    component: SavePageTest,
    roles: [userRoles.ADMIN],
  },
  {
    path: paths.questionList,
    component: QuestionListPage,
    roles: [userRoles.OPERATOR, userRoles.ADMIN],
  },
  {
    path: paths.questionCreate,
    component: QuestionSavePage,
    roles: [userRoles.OPERATOR, userRoles.ADMIN],
  },
  {
    path: paths.questionDetail,
    component: QuestionSavePage,
    roles: [userRoles.OPERATOR, userRoles.ADMIN],
  },
  {
    path: paths.profile,
    component: ProfilePage,
  },
];

export default routes;
