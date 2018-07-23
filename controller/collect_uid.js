exports.init = (weibo)=>{
	// push event to mq
	let job = {
		controller : "collect_uid",
		data : {}
	}
	weibo.mq.core.push_job(weibo, job);
}

async function run(weibo, job){
	let content = await weibo.web.get_page(weibo, {});
	let uids = await weibo.analyze.get_user_in_page(weibo, content);
	console.log(uids);
}

exports.mq_event = (weibo, job)=>{
	run(weibo, job);
}