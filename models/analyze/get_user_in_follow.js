function getUid(weibo, content){
	let model = '<td valign="top"><a href="https://weibo.cn/';
	if(content.indexOf(model) < 0){
		return {
			content : undefined,
			uid : undefined
		}
	}
	let temp = content.substring(content.indexOf(model) + model.length);
	let uid = temp.substring(0, temp.indexOf('">'));
	content = temp;
	return {
		content : content,
		uid : uid
	}
}

module.exports = async (weibo, content)=>{
	let uids = [];
	while(true){
		let res = getUid(weibo, content);
		if(res.uid == undefined){
			break;
		}
		uids.push(res.uid);
		content = res.content;
	}

	let ids = uids.map(d=>{
		return d.replace('u/', '');
	})

	return ids;
}