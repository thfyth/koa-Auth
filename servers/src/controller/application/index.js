const { AppManage } = require("../../model");


module.exports = {
  // 创建或更新应用
	async createOrUpdateApp(ctx) {
		const {
      appTitle,
      id
		} = ctx.request.body;
		// 应用是否存在
		const isRegister = await Custom.findOne({
			where: { appTitle },
		});
		if (isRegister) {
			ctx.body = new global.info.ParameterException(
				'',
				'APP已存在,请更换应用名!'
			);
			return;
		}
    if(id) {
      delete ctx.request.body.id
      await AppManage.update(
        {
          ...ctx.request.body
        },
        { where: { id } }
      );
    } else {
      await AppManage.create(
        {
          ...ctx.request.body
        },
      );
    }
		ctx.body = new global.info.Success(200, true);
	},
}