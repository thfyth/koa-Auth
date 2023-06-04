module.exports = (sequelize, { DataTypes, Model }) => {
  class AppManage extends Model {}
  AppManage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      appTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "应用名称",
      },
      appKey: {
        type: DataTypes.STRING,
        comment: "app初始化认证码",
      },
      appType: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "类型 0-免费 1-付费",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "状态,1-正常,0-关闭",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      tableName: "auth_app_model",
      modelName: "appManage", // 我们需要选择模型名称
    }
  );

  return AppManage;
};
