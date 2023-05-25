// 路由文件
const Router = require("@koa/router");
// const requireDirectory = require("require-directory");

let router = new Router({
  prefix: "/api/v1",
});
global.src = `${process.cwd()}/servers/src`;

// 注册路由
const users = require("./user");
const cdKey = require("./cd_key");

router.use(users.routes(), users.allowedMethods());
router.use(cdKey.routes(), cdKey.allowedMethods());

module.exports = router;
