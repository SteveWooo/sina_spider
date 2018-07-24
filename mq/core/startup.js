const fs = require('fs');
function get_work(weibo){
	let job = global.weibo.mq.jobs.shift();
	fs.writeFileSync(weibo.config.mq.cache_path + "job", JSON.stringify(global.weibo.mq.jobs));
	return job; 
}

function init_cache(weibo){
	let data = fs.readFileSync(weibo.config.mq.cache_path + "/job").toString();
	data = data == '' ? [] : JSON.parse(data);
	global.weibo.mq.jobs = data;
}

function add_surplus_job(weibo){
	let surplus_job = fs.readFileSync(weibo.config.mq.cache_path + "/surplus_job").toString();
	surplus_job = JSON.parse(surplus_job);
	console.log("溢出任务数:" + surplus_job.length);
	let job = surplus_job.shift();
	fs.writeFileSync(weibo.config.mq.cache_path + "/surplus_job", JSON.stringify(surplus_job));
}

async function run(weibo){
	let job = get_work(weibo);
	console.log("任务数：" + global.weibo.mq.jobs.length);
	if(global.weibo.mq.jobs.length < weibo.config.mq.max_job){
		add_surplus_job(weibo);
	}
	if(job!=undefined){
		await weibo.controller[job.controller].mq_event(weibo, job);
	}

	let slp = Math.ceil(Math.random() * weibo.config.control.sleep);
	console.log('slp:' + slp);
	setTimeout(function(){
		run(weibo);
	}, slp);
	return ;
}

module.exports = (weibo)=>{
	init_cache(weibo);
	console.log('#### mq cache has initialed ##');
	run(weibo);
}