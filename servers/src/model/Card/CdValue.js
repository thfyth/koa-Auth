module.exports = (sequelize, { DataTypes, Model }) => {
  class CdValue extends Model {}
  CdValue.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 卡密类型 名称
      cardName: {
        type: DataTypes.STRING,
        comment: "卡密类型 名称",
      },
      // 卡值 数值
      cdKeyValue: {
        type: DataTypes.INTEGER,
        comment: "卡值 数值",
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
      modelName: "cdValue", // 我们需要选择模型名称
    }
  );
  return CdValue;
};
