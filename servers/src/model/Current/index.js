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
      tableName: "auth_app_assoc",
      modelName: "appAssoc", // 我们需要选择模型名称
    }
  );
  // app 关联用户
  AppManage.belongsToMany(Custom, { through: AppAssoc });
  Custom.belongsToMany(AppManage, { through: AppAssoc });
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
      tableName: "auth_user_handle",
      modelName: "userHandle", // 我们需要选择模型名称
    }
  );
  // 字典表
  class Dictionary extends Model {}
  Dictionary.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 字典key
      label: {
        type: DataTypes.STRING,
        comment: "字典 key",
      },
      // 字典 数值
      value: {
        type: DataTypes.INTEGER,
        comment: "字典 数值",
      },
      // 附加项
      append: {
        type: DataTypes.STRING,
        comment: "附加项",
      },
      // 字典备注
      description: {
        type: DataTypes.STRING,
        comment: "字典备注",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "字典 状态,1-正常,0-非正常",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      tableName: "auth_dictionary",
      modelName: "dictionary", // 我们需要选择模型名称
    }
  );
  // 字典类型
  class DictionaryType extends Model {}
  DictionaryType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 字典类型 名称
      title: {
        type: DataTypes.STRING,
        comment: "字典 名称",
      },
      // 字典类型备注
      description: {
        type: DataTypes.STRING,
        comment: "字典类型备注",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "类型 状态,1-正常,0-非正常",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      tableName: "auth_dictionary_type",
      modelName: "dictionaryType", // 我们需要选择模型名称
    }
  );

  // 字典关联类型
  Dictionary.Type = Dictionary.belongsTo(DictionaryType, {
    foreignKey: "typeId",
    as: "type",
  });

  return {
    AppAssoc,
    UserHandle,
    Dictionary,
    DictionaryType,
  };
};
