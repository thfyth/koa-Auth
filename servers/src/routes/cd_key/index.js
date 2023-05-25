const Router = require("@koa/router");
const { createCdKey, batchCreateCdKey } = require("../../controller/cdKey");

let cdKey = new Router({
  prefix: "/cd-key",
});

cdKey.post("/add", createCdKey).get("/createKey", batchCreateCdKey);

module.exports = cdKey;
