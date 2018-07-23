module.exports = (weibo)=>{
	let mq = {
		core : {
			push_job : require('./core/push_job'),
			startup : require('./core/startup')
		}
	}

	mq.core.startup(weibo);
	return mq;
}