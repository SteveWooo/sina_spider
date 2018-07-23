/*
job = {
	event_name : string,
	data : {}
}
*/

module.exports = (weibo, job)=>{
	global.weibo.mq.jobs.push(job);
}