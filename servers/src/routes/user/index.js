const Router = require("@koa/router");
const { verifyToken } = require("../../utils/jwt");
const {
  login,
  registerOrUpdate,
  getUserInfo,
  getUserList,
} = require("../../controller/user");
const { validUserInfo, validLogin } = require("../../utils/params-validator");

// 用户路由
let user = new Router({
  prefix: "/user",
});

// 获取用户信息
user
  // 获取用户信息
  .get("/getUserInfo:id", getUserInfo)
  // 注册
  .post("/register", validUserInfo(), registerOrUpdate)
  // 登陆
  .post("/login", validLogin(), login)
  // 查询用户列表
  .post("/list", verifyToken(), getUserList);

module.exports = user;
