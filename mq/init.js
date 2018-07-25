module.exports = (weibo)=>{
	let mq = {
		core : {
			push_job : require('./core/push_job'),
			startup : require('./core/startup'),
			push_fail : require('./core/push_fail')
		}
	}
	weibo.mq = mq;
	mq.core.startup(weibo);
}