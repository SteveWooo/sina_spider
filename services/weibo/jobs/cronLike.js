async function run(swc, options){
	var ids = await swc.utils.weibo.getArticleByUid(swc, {
		uid : options.uid
	})
	if(ids != undefined){
		for(var i=0;i<ids.length;i++){
			await swc.services.weibo.handle.like(swc, {
				articleId : ids[i]
			})
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