const fs = require('fs');

/**
* TODO : 为账号们均衡分配代理服务器
*/
async function distributeServer(swc, options){

}

async function loginUser(swc, options){
	var userInfos = [];
	for(var i=0;i<swc.config.weibo.users.length;i++){
		var user = swc.config.weibo.users[i];

		var userInfo = await swc.utils.weibo.login(swc, {
			username : user.username,
			password : user.password
		})

		if(!userInfo){
			continue ;
		}
		userInfos.push(userInfo);
	}

	fs.writeFileSync(`${__dirname}/../dao/userInfos`, JSON.stringify(userInfos));
	return ;
}

module.exports = async function(swc, options){
	if(!swc.config.weibo){
		return ;
	}
	fs.writeFileSync(`${__dirname}/../dao/userInfos`, '[]');

	await loginUser(swc, options);

	return swc;
}