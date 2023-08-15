import { cmsApiUrl, essoApiUrl } from "@/constants";

const baseHeader = {
  "Content-Type": "application/json",
};

const multipartFormHeader = {
  "Content-Type": "multipart/form-data",
};

const apiConfig = {
  account: {
    getProfile: {
      path: `${essoApiUrl}/account/profile`,
      method: "GET",
      headers: baseHeader,
    },
    updateProfile: {
      path: `${essoApiUrl}/account/update-profile`,
      method: "PUT",
      headers: baseHeader,
    },
    refreshToken: {
      path: `${essoApiUrl}/auth/refresh-token`,
      method: "POST",
      headers: baseHeader,
      isPublic: true,
    },
    changePassword: {
      path: `${essoApiUrl}/account/change-password`,
      method: "PUT",
      headers: baseHeader,
    },
    logout: {
      path: `${essoApiUrl}/account/logout`,
      method: "POST",
      headers: baseHeader,
    },
  },
  admin: {
    getList: {
      path: `${cmsApiUrl}/admins`,
      method: "GET",
      headers: baseHeader,
    },
    getRoleList: {
      path: `${cmsApiUrl}/roles`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/admins/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/admins`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: `${cmsApiUrl}/admins`,
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: `${cmsApiUrl}/admins/:id`,
      method: "DELETE",
      headers: baseHeader,
    },
    updateStatus: {
      path: `${cmsApiUrl}/admins/update-status`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  teacher: {
    getList: {
      path: `${cmsApiUrl}/teachers`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/teachers/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/teachers`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: `${cmsApiUrl}/teachers`,
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: `${cmsApiUrl}/teachers/:id`,
      method: "DELETE",
      headers: baseHeader,
    },
    updateStatus: {
      path: `${cmsApiUrl}/admins/update-status`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  grade: {
    getList: {
      path: `${cmsApiUrl}/grades`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/grades/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/grades`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: `${cmsApiUrl}/grades`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  gradetest: {
    getList: {
      path: `${cmsApiUrl}/grades`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/grades/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/grades`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: `${cmsApiUrl}/grades`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  series: {
    getList: {
      path: `${cmsApiUrl}/series`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/series/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/series`,
      method: "POST",
      headers: baseHeader,
    },
    update: {
      path: `${cmsApiUrl}/series`,
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: `${cmsApiUrl}/series/:id`,
      method: "DELETE",
      headers: baseHeader,
    },
    syncEduHome: {
      path: `${cmsApiUrl}/series/sync`,
      method: "POST",
      headers: baseHeader,
    },
    getAllList: {
      path: `${cmsApiUrl}/series/all`,
      method: "GET",
      headers: baseHeader,
    },
  },
  question: {
    getList: {
      path: `${cmsApiUrl}/questions`,
      method: "GET",
      headers: baseHeader,
    },
    getDetail: {
      path: `${cmsApiUrl}/questions/:id`,
      method: "GET",
      headers: baseHeader,
    },
    create: {
      path: `${cmsApiUrl}/questions`,
      method: "POST",
      headers: multipartFormHeader,
    },
    update: {
      path: `${cmsApiUrl}/questions`,
      method: "PUT",
      headers: baseHeader,
    },
    delete: {
      path: `${cmsApiUrl}/questions/:id`,
      method: "DELETE",
      headers: baseHeader,
    },
    updateStatus: {
      path: `${cmsApiUrl}/questions/update-status`,
      method: "PUT",
      headers: baseHeader,
    },
  },
  package: {
    getList: {
      path: `${cmsApiUrl}/service-packages`,
      method: "GET",
      headers: baseHeader,
    },
  },
  order: {
    getList: {
      path: `${cmsApiUrl}/orders`,
      method: "GET",
      headers: baseHeader,
    },
    exportExcel: {
      path: `${cmsApiUrl}/orders/export`,
      method: "GET",
      headers: baseHeader,
    },
  },
  media: {
    image: {
      path: `${cmsApiUrl}/media/upload-image`,
      method: "POST",
      headers: multipartFormHeader,
    },
  },
};

export default apiConfig;
