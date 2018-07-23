exports.init = (weibo)=>{
	// push event to mq
	for(var i=1;i<=72;i++){
		let job = {
			controller : "collect_uid",
			data : {
				query : {
					page : i
				}
			}
		}
		weibo.mq.core.push_job(weibo, job);
	}
}

async function run(weibo, job){
	let result = await weibo.web.get_page(weibo, {
		page_url : "/1976223032/follow",
		query : job.data.query
	});
	if(result.code != 2000){
		console.log(result.message);
		return ;
	}
	let uids = await weibo.analyze.get_user_in_follow(weibo, result.content);
	uids.map(data=>{
		let user = {
			uid : data
		}
		weibo.storage.save_user(weibo, user);
	})
}

exports.mq_event = (weibo, job)=>{
	run(weibo, job);
}