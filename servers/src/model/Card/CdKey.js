module.exports = (sequelize, { DataTypes, Model }) => {
  class CdKey extends Model {}
  CdKey.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      // key value 卡密名称
      card: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "卡密名称",
      },
      // 卡密类型
      cardCode: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "卡密类型",
      },
      // 卡值 数值
      cdKeyValue: {
        type: DataTypes.INTEGER,
        comment: "卡值 数值",
      },
      // 是否使用 0 已使用 1-未使用
      isUse: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "是否使用 0 已使用 1-未使用",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "卡值 状态,1-正常,0-非正常",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: "cdKey", // 我们需要选择模型名称
    }
  );
  return CdKey;
};
