function getFollowCount(weibo, result, user){
	let content = result.content;
	let model = '<a href="/'+user.main_uid+'/follow">关注[';
	if(content.indexOf(model) < 0){
		return undefined;
	}
	let temp = content.substring(content.indexOf(model) + model.length);
	temp = temp.substring(0, temp.indexOf(']'));
	return temp;
}

function getMainId(weibo, result, user){
	let content = result.content;
	let model = /<a href="\/(\d+)\/avatar\?rl=0\">/;
	let id = content.match(model);
	if(id.length < 2){
		return undefined;
	}

	return id[1];
}

module.exports = async (weibo, result)=>{
	let user = {
		uid : result.job.data.uid,
		main_uid : undefined,
		followCount : undefined,
	}
	user.main_uid = getMainId(weibo, result, user);
	user.followCount =  getFollowCount(weibo, result, user);
	user.followPageCount = Math.ceil(user.followCount / 10);
	return user;
}