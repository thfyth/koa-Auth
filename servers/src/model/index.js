const { DataTypes, Model } = require("sequelize");
const sequelize = require(`${global.src}/utils/sql`);

// APP
const AppManage = require("./Application")(sequelize, {
  DataTypes,
  Model,
});

// 卡密 用户公用属性
const UserCommon = require("./User/UserCommon")(sequelize, {
  DataTypes,
  Model,
});

// 用户
const Custom = require("./User/UserModel")(sequelize, {
  DataTypes,
  Model,
  UserCommon,
});

// 导入公用model
const { AppAssoc, UserHandle, Dictionary, DictionaryType } =
  require("./Current")(sequelize, {
    DataTypes,
    Model,
    Custom,
    AppManage,
  });

// 卡密
const CdKey = require("./Card/CdKey")(sequelize, {
  DataTypes,
  Model,
  UserCommon,
  Dictionary,
  Custom,
});

//   force: true,
//   alter: true, alter: true, force: true
sequelize.sync({});
module.exports = {
  UserCommon,
  Custom,
  CdKey,
  // CdValue,
  AppAssoc,
  UserHandle,
  AppManage,
  Dictionary,
  DictionaryType,
};
