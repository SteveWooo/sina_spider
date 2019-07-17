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
				console.log(option);
				return ;
			}
			resolve();
		})
	})
}

function waitting (time){
	return new Promise(resolve =>{
		setTimeout(()=>{
			resolve();
		}, time);
	})
}

module.exports = async function(swc, options){
	var userInfos = await swc.services.weibo.dao.getUserInfos(swc, {});
	for(var i=0;i<userInfos.length;i++){
		await like(swc, {
			articleId : options.articleId,
			userInfo : userInfos[i]
		})
		var nextTime = 100 * (Math.ceil(Math.random() * 20 + 1))
		// console.log('next time : ' + nextTime);
		// await waitting(nextTime);
	}
	swc.log.info(`like success, article id -- ${options.articleId}`);
}