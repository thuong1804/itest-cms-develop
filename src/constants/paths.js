import { CLIENT_APP_ID, LOGIN_URL } from "@/constants/index";

const paths = {
  login: `${LOGIN_URL}?clientAppId=${CLIENT_APP_ID}&returnUrl=${window.location.origin}`,
  adminList: "/admins",
  adminCreate: "/admins/create",
  adminDetail: "/admins/:id",
  teacherList: "/teachers",
  teacherCreate: "/teachers/create",
  teacherDetail: "/teachers/:id",
  profile: "/profile",
  payment: "/payments",
  banner: "/banners",
  teacherPackageList: "/teacher-packages",
  teacherPackageDetail: "/teacher-packages/:id",
  teacherScopePackageUpdate: "/teacher-packages/:id/update",
  gradeList: "/grades",
  gradeCreate: "/grades/create",
  gradeDetail: "/grades/:id",
  seriesList: "/series",
  seriesDetail: "/series/:id",
  seriesCreate: "/series/create",
  gradesListTest: "/gradestest",
  gradesTestDetail: "/gradestest/:id",
  gradesTestCreate: "/gradestest/create",
  seriesListTest: "/seriestest",
  seriesDetailTest: "/seriestest/:id",
  seriesCreateTest: "/seriestest/create",
  questionList: "/questions",
  questionCreate: "/questions/create",
  questionDetail: "/questions/:id",
};

export default paths;
