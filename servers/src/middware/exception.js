const { HttpException } = require("../utils/http-error");

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log("错误");
    // 开发环境
    const isHttpException = true || error instanceof HttpException;
    const isDev = true || global.config.environment === "dev";

    if (isDev && !isHttpException) {
      throw error;
    }
    console.log(error.data);
    // 生成环境
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
        data: error.data,
        code: error.code,
      };
      ctx.status = error.code;
    } else {
      ctx.body = {
        msg: "未知错误！",
        code: 500,
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;
