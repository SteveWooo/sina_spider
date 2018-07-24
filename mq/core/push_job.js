/*
job = {
	event_name : string,
	data : {}
}
*/
const fs = require('fs');
module.exports = (weibo, job)=>{
	if(global.weibo.mq.jobs.length >= weibo.config.mq.max_job){
		let surplus_job = fs.readFileSync(weibo.config.mq.cache_path + "/surplus_job").toString();
		surplus_job = JSON.parse(surplus_job);
		surplus_job.push(job);
		fs.writeFileSync(weibo.config.mq.cache_path + "/surplus_job", JSON.stringify(surplus_job));
		return ;
	}
	global.weibo.mq.jobs.push(job);
}