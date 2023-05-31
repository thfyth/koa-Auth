const { createToken } = require("../../utils/jwt");
const { UserCommon, Custom, CdKey, Dictionary } = require("../../model");
const { nanoid } = require("nanoid");
const sequelize = require("../../utils/sql");
const { createDictionary } = require("../utils");
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
  /**批量增加卡密时间
   * 批量查询，include中使用两个$符号
   * await User.update
      '$Address.birthdate$': sequelize.literal("DATE_ADD(Address.birthdate, INTERVAL 10 DAY)")
      include: Address, // 包括关联模型
      where: {
        '$Address.address$': 'your_address' // 根据地址筛选用户
      }
   * @param {*} ctx
   */
  async batchUpdateTime(ctx) {
    const { day = 10 } = ctx.request.body;
    try {
      await UserCommon.update(
        {
          vipEndTime: sequelize.literal(
            `DATE_ADD(vipEndTime,INTERVAL ${day} DAY)`
          ),
        },
        {
          where: {
            status: 1,
          },
        }
      );
      ctx.body = new global.info.Success(200, "操作成功");
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },
  // 卡密列表
  async queryKeyList(ctx) {
    const { pageSize = 10, pageNumber = 1 } = ctx.request.body;
    const offset = (pageNumber - 1) * pageSize;
    const { count, rows } = await Project.findAndCountAll({
      where: { status: 1 },
      offset,
      limit: pageSize,
      include: "common",
    });

    ctx.body = {
      count,
      pageSize,
      pageNumber,
      records: rows,
    };
  },
  // 禁用卡密
  async disableCard(ctx) {
    const { ids = [], disableInfo = "" } = ctx.request.body;
    try {
      await UserCommon.update(
        { enable: 0, disable: disableInfo },
        { where: { id: ids } }
      );
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },
  // 删除卡密
  async deleteCardById(ctx) {
    try {
      const { ids = [] } = ctx.request.body;
      await CdKey.update(
        { "$common.status$": 0 },
        {
          // 查找管理模型
          include: "common",
          where: { id: ids },
        }
      );
      ctx.body = new global.info.Success(200, "操作成功");
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 500);
    }
  },
  // 生成卡值
  async crateCardValue(ctx) {
    try {
      const res = createDictionary(ctx);
      ctx.body = res;
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 500);
    }
  },
  // 卡值列表
  async queryCardList() {
    try {
      const { pageSize = 10, pageNumber = 1 } = ctx.request.body;
      const offset = (pageNumber - 1) * pageSize;
      const { count, rows } = await CdKey.findAndCountAll({
        where: { status: 1 },
        offset,
        limit: pageSize,
      });

      ctx.body = {
        count,
        pageSize,
        pageNumber,
        records: rows,
      };
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 500);
    }
  },
  // 删除卡值
  async deleteCdValueById() {
    try {
      const { id } = ctx.request.body;
      await Dictionary.update({ status: 0 }, { where: { id } });
      ctx.body = new global.info.Success(200, "操作成功");
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 500);
    }
  },
};
