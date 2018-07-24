const fs = require('fs');
exports.init = (weibo)=>{
	let my = fs.readFileSync(weibo.config.util.data_path + "/myfollower").toString().split('\n');
	my.pop();
	let data = my.map(d=>{
		let data = d.split('=');
		return data[1];
	})

	for(var i=0;i<data.length;i++){
		let job = {
			controller : "collect_uid_before",
			data : {
				uid : data[i]
			}
		}
		weibo.mq.core.push_job(weibo, job);
	}
	console.log('init finished');
}

//根据uid 获取mainid，粉丝页数
/*
目的构造一堆这个任务
job = {
	controller : "collect_uid",
	data : {
		query : {
			page : int
		},
		main_uid : int,
	}
}
*/
async function run(weibo, job){
	let result = await weibo.web.get_page(weibo, {
		page_url : "/" + job.data.uid
	})

	if(result.code != 2000){
		console.log(result.message);
		return ;
	}

	result.job = job;
	let user = await weibo.analyze.analyze_user(weibo, result);
	
	for(var i=1;i<=user.followPageCount;i++){
		let job = {
			controller : "collect_uid",
			data : {
				main_uid : user.main_uid,
				query : {
					page : i
				},
				user : user
			}
		}
		weibo.mq.core.push_job(weibo, job);
	}
}

exports.mq_event = (weibo, job)=>{
	run(weibo, job);
}