const { Sequelize } = require("sequelize");
const {
  DATABASE_URL,
  DATABASE_BASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_PASS_WORD,
  DATABASE_PORT,
} = require("../../config/config.default");
const { getUserInfo } = require("../controller/user");
// 分别传递参数 (其它数据库)

const sequelize = new Sequelize(
  DATABASE_BASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_PASS_WORD,
  {
    host: DATABASE_URL,
    port: DATABASE_PORT,
    dialect: "mysql" /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+08:00",
    define: {
      hooks: {
        beforeBulkCreate(instances) {},
        beforeCreate(instances) {
          console.log(getUserInfo);
          // instances.createUser = "创建人员";
          // instances.createUserName = "创建人员名称";
        },
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
