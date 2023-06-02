/**
 * 逻辑验证
 */
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");

const { UserCommon, Custom, CdKey, Dictionary } = require("../model");
function returnObj(data, status = false) {
  return {
    data,
    status,
  };
}
module.exports = {
  // 登陆
  async verifyLogin(ctx) {
    try {
      const { userName, password, cdCard } = ctx.request.body;
      if (cdCard) {
        // 卡密登陆
        const res = await CdKey.findOne({
          where: { card: cdCard },
          include: ["user", "value", "common"],
        });
        if (res) {
          return returnObj(res, true);
        } else return returnObj("卡密不存在！");
      }
      // 是否注册
      const isRegister = await Custom.findOne({
        where: { userName },
        include: ["common"],
      });
      if (!isRegister) return returnObj("用户不存在，请先注册！");
      // 密码验证
      const userVerify = bcrypt.compareSync(password, isRegister.password);
      if (!userVerify) return returnObj("密码错误！");
      delete isRegister.password;
      return returnObj(isRegister, true);
    } catch (error) {
      return error;
    }
  },
};
