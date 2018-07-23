async function getIndex(weibo){
	let content = await weibo.web.get_page(weibo, {});
	let uids = await weibo.analyze.get_user_in_page(weibo, content);
	console.log(uids);
}

module.exports = (weibo)=>{
	getIndex(weibo);
}