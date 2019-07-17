module.exports = async (swc, options)=>{
	swc = await swc.registerService(swc, {
		serviceName : 'weibo',
		path : `${__dirname}/../services/weibo/service`
	})	
	await swc.services.weibo.init(swc, {});

	await swc.services.weibo.jobs.cronLike(swc, {
		uid : '1564541782', //stevewoo
		// uid : '1923212617', //kimo
	})
	return swc;
}