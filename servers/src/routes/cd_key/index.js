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

let cdKey = new Router({
  prefix: "/cd-key",
});

// 批量创建卡密
cdKey.get("/createKey", batchCreateCdKey);
// 批量更新卡值
cdKey.get("/batchUpdateTime", batchUpdateTime);
// 查询卡密列表
cdKey.post("/queryKeyList", queryKeyList);
// 批量禁用卡密
cdKey.post("/disableCard", disableCard);
// 批量删除卡密
cdKey.get("/deleteCardById", deleteCardById);
// 创建卡值
cdKey.post("/crateCardValue", crateCardValue);
// 查询卡值列表
cdKey.post("/queryCardList", queryCardList);
// 根据ID删除卡值
cdKey.get("/deleteCdValueById", deleteCdValueById);

module.exports = cdKey;
