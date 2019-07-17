const request = require('request');

function getLikeCount(swc, options){
	return new Promise(resolve=>{
		var option = {
			url : 'https://weibo.cn/attitude/' + options.articleId,
			headers : {
				'cookie' : 'SUB=' + options.userInfo.sub
			}
		}

		request(option, (err, res, body)=>{
			if(err || res.statusCode != 200){
				swc.log.error('get like count faile. article id -- ' + options.articleId);
				resolve(undefined);
				return ;
			}

			var MODEL = '<span class="pms">&nbsp;赞[';
			if(body.indexOf(MODEL) < 0){
				resolve(undefined);
				return ;
			}
			body = body.substring(body.indexOf(MODEL) + MODEL.length);
			var likeCount = body.substring(0, body.indexOf(']'));
			resolve(parseInt(likeCount));
		})
	})
}

async function run(swc, options){
	var ids = await swc.utils.weibo.getArticleByUid(swc, {
		uid : options.uid
	})
	if(ids != undefined){
		// for(var i=0;i<ids.length;i++){
		// 	await swc.services.weibo.handle.like(swc, {
		// 		articleId : ids[i]
		// 	})
		// }
		var userInfos = await swc.services.weibo.dao.getUserInfos(swc, {});
		var likeCount = await getLikeCount(swc, {
			userInfo : userInfos[0],
			articleId : ids[0]
		})

		if(likeCount != undefined && likeCount < 10){
			await swc.services.weibo.handle.like(swc, {
				articleId : ids[0]
			})
		} else if (likeCount == undefined){
			swc.log.error('get article like count error, articleId -- ' + ids[0]);
		} else {

		}
	} else {
		swc.log.error(`get article faile`);
	}

	var nextTime = Math.ceil(Math.random() * 30 + 30);
	console.log('cron like next time : ' + nextTime + " minutes");
	setTimeout(async ()=>{
		await run(swc, options);
	}, nextTime * 60 * 1000);
}

module.exports = async function(swc, options){
	await run(swc, options);
}