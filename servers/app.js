const koa = require("koa");
const app = new koa();
const { koaBody } = require("koa-body");
const json = require("koa-json");
const router = require("./src/routes");
const cors = require("@koa/cors");
const catchError = require("./src/middware/exception");
global.info = require("./src/utils/http-error");
//
app
  .use(koaBody({ multipart: true }))
  .use(json())
  .use(cors())
  .use(catchError)
  .use(router.routes(), router.allowedMethods())
  .use(function* () {
    this.body = "Invalid URL!!!";
  });

app.listen(3000);
console.log("启动成功,端口是http://localhost:3000");
