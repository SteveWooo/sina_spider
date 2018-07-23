function get_work(){
	return global.weibo.mq.jobs.shift();
}

async function run(weibo){
	let job = get_work();
	console.log(job)
	if(job!=undefined){
		await weibo.controller[job.controller].mq_event(weibo, job.data);
	}

	setTimeout(function(){
		run(weibo);
	}, weibo.config.control.sleep);
	return ;
}

module.exports = (weibo)=>{
	run(weibo);
}