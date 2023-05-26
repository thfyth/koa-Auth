module.exports = (sequelize, { DataTypes, Model, Custom, AppManage }) => {
  // APP 关联用户 多关联关系
  class AppAssoc extends Model {}
  AppAssoc.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "状态,1-正常,0-非正常",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: "appAssoc", // 我们需要选择模型名称
    }
  );
  // app 关联用户
  AppManage.belongsToMany(Custom, { through: AppAssoc });
  //   Custom.belongsToMany(AppAssoc, { through: "UserApp" });
  // 操作日志管理
  class UserHandle extends Model {}
  UserHandle.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 操作类型
      handleTitle: {
        type: DataTypes.STRING,
        comment: "操作类型",
      },
      // 操作IP
      handleIp: {
        type: DataTypes.STRING,
        comment: "操作IP",
      },
      // 操作者 卡密或者用户名
      handleInfo: {
        type: DataTypes.STRING,
        comment: "操作者 卡密或者用户名",
      },
      // 操作类型 0-卡密 1-用户
      handleType: {
        type: DataTypes.INTEGER,
        comment: "操作类型 0-卡密 1-用户",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "状态,1-正常,0-非正常",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: "userHandle", // 我们需要选择模型名称
    }
  );
  return {
    AppAssoc,
    UserHandle,
  };
};
