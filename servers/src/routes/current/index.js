// 公用方法路由

const Router = require("@koa/router");
const { validDic } = require("../../utils/params-validator");
const { verifyToken } = require("../../utils/jwt");
const {
  createDicType,
  createOrUpdateDic,
} = require("../../controller/current");
// 用户路由
let current = new Router({
  prefix: "/current",
});

// 获取用户信息
current
  // 创建字典
  .post("/createDicType", verifyToken(), createDicType)
  // 创建字典类型
  .post("/createOrUpdateDic", verifyToken(), validDic(), createOrUpdateDic);

module.exports = current;
