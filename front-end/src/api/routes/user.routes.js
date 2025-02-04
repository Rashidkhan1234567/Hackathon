import apiUser from "../index";

const userRoutes = {
  login: apiUser.apiUser+ "/login",
  register: apiUser.apiUser + "/register",
  guarantor : apiUser.apiUser + "/guarantors",
  forgetPassword : apiUser.apiUser + "/forgetPassword",
  loan_request : apiUser.apiUser + "/loan-request"
};


export default userRoutes;