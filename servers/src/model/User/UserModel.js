const bcrypt = require("bcryptjs");
module.exports = (sequelize, { DataTypes, Model, UserCommon }) => {
  class Custom extends Model {}

  Custom.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 用户名
      userName: {
        type: DataTypes.STRING,
        comment: "用户名",
      },
      // 密码
      password: {
        type: DataTypes.STRING,
        set(val) {
          // 加密
          const salt = bcrypt.genSaltSync(10);
          // 生成加密密码
          const psw = bcrypt.hashSync(val, salt);
          this.setDataValue("password", psw);
        },
        comment: "用户密码",
      },
      email: {
        type: DataTypes.STRING,
        // unique: true,
        comment: "用户邮箱",
      },
      // 拥有权限管理
      authority: {
        type: DataTypes.STRING,
        unique: false,
        comment: "权限",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "卡值 状态,1-正常,0-非正常",
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户等级",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: "custom", // 我们需要选择模型名称
    }
  );
  Custom.Common = Custom.belongsTo(UserCommon, {
    foreignKey: "relevancyId",
    as: "common",
  });
  return Custom;
};
