const fs = require('fs');
module.exports = (weibo, job)=>{
	let fail_job = fs.readFileSync(weibo.config.mq.cache_path + "/fail_job").toString();
	fail_job = JSON.parse(fail_job);
	fail_job.push(job);
	fs.writeFileSync(weibo.config.mq.cache_path + "/fail_job", JSON.stringify(fail_job));
	//同时停止全局任务 防止被封IP。。
	global.weibo.mq.status = false;
	global.weibo.mq.next_run_time = (+new Date()) + 1000 * 60 * 10;
}