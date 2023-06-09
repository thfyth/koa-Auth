/**
 * 参数验证
 */
const Joi = require("joi");
module.exports = {
  /**
   * 用户注册参数
   */
  validUserInfo: function () {
    return async (ctx, next) => {
      const schema = Joi.object({
        userName: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        access_token: [Joi.string(), Joi.number()],
        // 权限
        authority: Joi.string(),
        birth_year: Joi.number().integer().min(1900).max(2013),
        machineCode: Joi.string().pattern(new RegExp("^[a-zA-Z]{3,30}$")),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
        level: Joi.number().integer().min(1).max(10),
      }).xor("password", "access_token");

      try {
        await schema.validateAsync(ctx.request.body);
        await next();
      } catch (err) {
        console.log(err);
        ctx.body = new global.info.ParameterException(err.details);
      }
    };
  },
  /**
   * 用户登陆参数
   */
  validLogin: function () {
    return async (ctx, next) => {
      const schema = Joi.object({
        userName: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        cdCard: [Joi.string(), Joi.number()],
      })
        .with("userName", "password")
        .or("userName", "cdCard")
        .or("password", "cdCard");
      try {
        await schema.validateAsync(ctx.request.body);
        await next();
      } catch (err) {
        console.log(err);
        ctx.body = new global.info.ParameterException(err.details[0]);
      }
    };
  },
  /**
   * 字典注册参数
   */
  validDic: function () {
    return async (ctx, next) => {
      const schema = Joi.object({
        label: Joi.string().min(3).max(10),
        value: [Joi.string(), Joi.number()],
        typeId: Joi.number(),
      });
      try {
        await schema.validateAsync(ctx.request.body);
        await next();
      } catch (err) {
        ctx.body = new global.info.ParameterException(err.details[0]);
      }
    };
  },
  // app 注册
  validApp: function () {
    return async (ctx, next) => {
      const schema = Joi.object({
        appTitle: Joi.string().alphanum().min(2).max(15),
        appType: Joi.number()
      })
      try {
        await schema.validateAsync(ctx.request.body);
        await next();
      } catch (err) {
        console.log(err);
        ctx.body = new global.info.ParameterException(err.details[0]);
      }
    };
  },
};
