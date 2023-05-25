// 用户逻辑处理
const { createToken } = require("../../utils/jwt");
const { UserCommon, Custom } = require("../../model");
const { verifyLogin } = require("../utils");
const dayjs = require("dayjs");
module.exports = {
  // 用户注册 或者更新信息
  async registerOrUpdate(ctx) {
    const {
      machineCode,
      password,
      email,
      authority = "[]",
      level = 1,
      userName,
    } = ctx.request.body;

    // 用户是否存在

    const isRegister = await Custom.findOne({
      where: { userName },
    });
    if (isRegister) {
      ctx.body = new global.info.ParameterException(
        "",
        "用户已存在,请更换用户名!"
      );
      return;
    }
    const common = await UserCommon.create({ machineCode, type: 1 });
    await Custom.create({
      userName,
      password,
      email,
      authority,
      level,
      relevancyId: common.id,
    });
    ctx.body = new global.info.Success(200, true);
  },

  // 用户登陆
  async login(ctx) {
    const res = await verifyLogin(ctx);
    if (res.status) {
      const token = await createToken(res.data);
      ctx.body = new global.info.Success(200, {
        ...res.data.dataValues,
        token,
      });
    } else ctx.body = new global.info.ParameterException("", res.data);
  },

  // 获取用户信息
  async getUserInfo(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = new global.info.ParameterException(
        null,
        "",
        "用户id是必填项!"
      );
      return;
    }
    try {
      const r = await Custom.findOne({
        where: { id },
        include: "common",
      });
      if (r) ctx.body = new global.info.Success(200, r);
      else ctx.body = new global.info.resultNull("账号不存在，请先注册!");
    } catch (error) {
      console.log("失败");
      ctx.body = new global.info.HttpException("", error);
    }
  },

  // 获取用户列表
  async getUserList(ctx) {
    console.log(ctx.user);
    const list = await Custom.findAll();
    ctx.body = new global.info.Success(200, list);
  },
};
