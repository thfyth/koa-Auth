const Router = require("@koa/router");
const { validApp } = require("../../utils/params-validator");
const { createOrUpdateApp } = require("../../controller/application");
let app = new Router({
  prefix: "/application",
});


app.post("/createOrUpdateApp", verifyToken(), validApp(),createOrUpdateApp);