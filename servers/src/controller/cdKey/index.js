const { createToken } = require("../../utils/jwt");
const { UserCommon, Custom, CdKey } = require("../../model");
const { nanoid } = require("nanoid");
module.exports = {
  // 生成卡密
  async createCdKey(ctx) {
    const { machineCode } = ctx.request.body;
    const common = await UserCommon.create({ machineCode, type: 1 });
    const res = await CdKey.create({
      card: nanoid(25),
      cdKeyValue: 30,
      relevancyId: common.id,
    });
    ctx.body = res;
  },
  // 批量生成卡密
  async batchCreateCdKey(ctx) {
    try {
      const { len = 10 } = ctx.request.body;
      const l = [];
      for (let i = 0; i < len; i++) {
        l.push({ type: 1 });
      }
      const res = await UserCommon.bulkCreate([...l]);
      // 获取ID 循环生成卡密
      const k = res.map((v) => {
        return {
          relevancyId: v.id,
          card: nanoid(25),
          cdKeyValue: 30,
        };
      });
      const r = await CdKey.bulkCreate(k);
      ctx.body = r;
    } catch (error) {
      throw new global.info.HttpException("新增卡密失败！", null, 10001, 400);
    }
  },

  // 增加卡密时间

  // 禁用卡密

  // 生成卡值

  // 卡值列表

  // 删除卡值
};
