const Router = require("@koa/router");
const {
  batchCreateCdKey,
  batchUpdateTime,
  queryKeyList,
  disableCard,
  crateCardValue,
  queryCardList,
  deleteCardById,
  deleteCdValueById,
} = require("../../controller/cdKey");
const { verifyToken } = require("../../utils/jwt");

let cdKey = new Router({
  prefix: "/cd-key",
});

// 批量创建卡密
cdKey.get("/createKey", verifyToken(), batchCreateCdKey);
// 批量更新卡值
cdKey.get("/batchUpdateTime", verifyToken(), batchUpdateTime);
// 查询卡密列表
cdKey.post("/queryKeyList", verifyToken(), queryKeyList);
// 批量禁用卡密
cdKey.post("/disableCard", verifyToken(), disableCard);
// 批量删除卡密
cdKey.get("/deleteCardById", verifyToken(), deleteCardById);

module.exports = cdKey;
