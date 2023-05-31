module.exports = (sequelize, { DataTypes, Model }) => {
  const UserCommon = sequelize.define(
    "UserCommon",
    {
      // 公用ID
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      // 机器码
      machineCode: {
        type: DataTypes.STRING,
        comment: "机器码",
      },
      // vip 开始时间
      vipStartTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "VIP开始时间",
      },
      // VIP结束时间
      vipEndTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "VIP结束时间",
      },
      // 当前状态 0-离线 1-在线
      newStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "当前状态 0-离线 1-在线",
      },
      // 是否禁用 0 -禁用 1 -正常
      enable: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "是否禁用 0 -禁用 1 -正常",
      },
      // 类型 0-用户 1-卡密
      type: {
        type: DataTypes.INTEGER,
        comment: "类型",
      },
      // 禁用理由
      disable: {
        type: DataTypes.STRING,
        defaultValue: "无",
        comment: "禁用理由",
      },
      // 使用类型 0-正常使用 1 - 手动续费
      useType: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "使用类型",
      },
      // 是否邀请注册 0-否 1-是
      isInvite: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "是否邀请注册",
      },
      // 关联应用
      relevanceApp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: "关联应用",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: "卡值 状态,1-正常,0-非正常",
      },
      // 创建人员
      createUser: {
        type: DataTypes.UUID,
        defaultValue: "",
        comment: "创建人员",
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      tableName: "auth_common_info",
      modelName: "common", // 我们需要选择模型名称
    }
  );
  return UserCommon;
};

// // 相应字段有:
// // type 字段数据类型(sequlize. …)
// // allowNull(是否允许为空true,false)
// // autoIncrement(自增, true ,false)
// // unique(唯一性, true,false, string)
// // comment (解释 说明)
// // defaultValue (字段默认值)
// // primaryKey (对主键的设置, true,false)
// // defaultValue(默认值的设置)
