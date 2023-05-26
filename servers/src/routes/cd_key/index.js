const Router = require("@koa/router");
const { batchCreateCdKey } = require("../../controller/cdKey");

let cdKey = new Router({
  prefix: "/cd-key",
});

cdKey.get("/createKey", batchCreateCdKey);

module.exports = cdKey;
