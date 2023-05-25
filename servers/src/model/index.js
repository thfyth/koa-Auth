const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${global.src}/utils/sql`);

// 卡密 用户公用属性
const UserCommon = require("./User/UserCommon")(sequelize, {
  DataTypes,
  Model,
});

// 用户
const Custom = require("./User/UserModel")(sequelize, {
  DataTypes,
  Model,
});

// 卡密
const CdKey = require("./Card/CdKey")(sequelize, {
  DataTypes,
  Model,
});

// 卡密数值
const CdValue = require("./Card/CdValue")(sequelize, {
  DataTypes,
  Model,
});

Custom.belongsTo(UserCommon, {
  foreignKey: "relevancyId",
  as: "common",
});
CdKey.belongsTo(UserCommon, {
  foreignKey: "relevancyId",
  as: "common",
});
CdKey.belongsTo(Custom, {
  foreignKey: "userId",
  as: "user",
});
CdKey.belongsTo(CdValue, {
  foreignKey: "valueId",
  as: "value",
});
//   force: true,
//   alter: true, alter: true, force: true
sequelize.sync({ alter: true, force: true });
module.exports = {
  UserCommon,
  Custom,
  CdKey,
  CdValue,
};
