// 通用方法接口
const { Dictionary, DictionaryType } = require("../../model");
const sequelize = require("../../utils/sql");
const { createDictionary } = require("../utils");
module.exports = {
  // 创建字典类型
  async createDicType(ctx) {
    try {
      const { title, description = "" } = ctx.request.body;
      if (!title) {
        throw new global.info.ParameterException(
          "名称是必传项！",
          null,
          10001,
          500
        );
      }
      return await DictionaryType.create({
        title,
        description,
      });
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },
  // 创建或更新字典
  async createOrUpdateDic(ctx) {
    try {
      const {
        id = null,
        typeId,
        label,
        value,
        append = "",
        description = "",
      } = ctx.request.body;
      if (id) {
        const r = ctx.request.body;
        delete r.id;
        return await Dictionary.update({ ...r }, { where: { id } });
      }
      return await Dictionary.create({
        typeId,
        label,
        value,
        append,
        description,
      });
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },
  // 查询字典类型列表
  async queryDicType(ctx) {
    const { pageSize = 10, pageNumber = 1 } = ctx.request.body;
    const offset = (pageNumber - 1) * pageSize;
    const { count, rows } = await DictionaryType.findAndCountAll({
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
  },
  //查询字典列表
  async queryDicList(ctx) {
    const { pageSize = 10, pageNumber = 1, typeId } = ctx.request.body;
    const offset = (pageNumber - 1) * pageSize;
    const { count, rows } = await Dictionary.findAndCountAll({
      include: "type",
      where: { status: 1, typeId, "$type.status$": 1 },
      offset,
      limit: pageSize,
    });

    ctx.body = {
      count,
      pageSize,
      pageNumber,
      records: rows,
    };
  },
  // 删除字典类型
  async deleteDicType(ctx) {
    try {
      const { ids = [] } = ctx.request.body;
      return await DictionaryType.update({ status: 0 }, { where: { id: ids } });
    } catch (error) {
      throw new global.info.HttpException(error, null, 10001, 400);
    }
  },
};
