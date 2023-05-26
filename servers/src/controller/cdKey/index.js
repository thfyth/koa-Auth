const { createToken } = require("../../utils/jwt");
const { UserCommon, Custom, CdKey } = require("../../model");
const { nanoid } = require("nanoid");
module.exports = {
  // 批量生成卡密
  async batchCreateCdKey(ctx) {
    try {
      const { len = 10, cdKeyValue = 30, customStr = "" } = ctx.request.body;
      const l = [];
      for (let i = 0; i < len; i++) {
        l.push({
          card: (customStr ? customStr + "-" : "") + nanoid(25),
          cdKeyValue,
          common: {
            type: 1,
          },
        });
      }
      // 关联创建卡密
      const res = await CdKey.bulkCreate([...l], {
        include: [{ association: CdKey.Common }],
      });
      ctx.body = res;
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },

  // 增加卡密时间

  // 禁用卡密

  // 生成卡值

  // 卡值列表

  // 删除卡值
};
