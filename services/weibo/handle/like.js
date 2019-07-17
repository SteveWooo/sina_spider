/**
* @param.articleId
*/
const request = require('request');
function like(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : "https://weibo.cn/attitude/"+options.articleId+"/add?uid="+options.userInfo.uid+"&rl=0&st=" + options.userInfo.st,
			headers : {
				'cookie' : 'SUB=' + options.userInfo.sub
			}
		}

		request(option, function(err, res, body){
			if(err || res.statusCode != 200){
				swc.log.error(`like faile, account -- ${options.userInfo.username}`);
				resolve();
				console.log(option)
				return ;
			}
			resolve();
		})
	})
}

module.exports = async function(swc, options){
	var userInfos = await swc.services.weibo.dao.getUserInfos(swc, {});
	userInfos.map(async (userInfo, index)=>{
		await like(swc, {
			articleId : options.articleId,
			userInfo : userInfo
		})
	})

	swc.log.info(`like success, article id -- ${options.articleId}`);
}