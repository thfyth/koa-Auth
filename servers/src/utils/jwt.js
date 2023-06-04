const token = require("jsonwebtoken");
const { promisify } = require("util");
const toJwt = promisify(token.sign);
const verify = promisify(token.verify);
const key = "auth-key-jwt-web-token";
 class GetUserToken{
  static user;
  constructor(user) {
    this.user = user
  }
  getUser() {
    return this.user
  }
}
module.exports = {
  getUserInfo: async()=> {
    return new GetUserToken().getUser()
  },
  createToken: async (userinfo) => {
    return await toJwt({ userinfo }, key, {
      expiresIn: 60 * 60 * 24,
    });
  },
  verifyToken: function (required = true) {
    return async (ctx, next) => {
      var token = ctx.headers.authorization;
      token = token ? token.split("Bearer ")[1] : null;
      if (token) {
        try {
          ctx.user = await verify(token, key);
          new GetUserToken(ctx.user)
          await next();
        } catch (error) {
          console.log(error);
          ctx.body = new global.info.AuthFailed("无效token", null);
        }
      } else if (required) {
        ctx.body = new global.info.AuthFailed("登陆已过期", null);
      } else {
        next();
      }
    };
  },
};
