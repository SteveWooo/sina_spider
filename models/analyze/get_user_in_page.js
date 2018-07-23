//获取页面下所有用户ID
function getUid(content, start){
	let model = '<a class="nk" href="https://weibo.cn/';
	if(content.indexOf(model) < 0){
		return {
			index : -1,
			uid : undefined
		};
	}
	let uid = content.substring(content.indexOf(model) + model.length);
	uid = uid.substring(0, uid.indexOf('">'));
	let index = 1;
	content = content.substring(content.indexOf(model+uid) + (model+uid).length);
	return {
		index : index,
		uid : uid,
		content : content.substring(content.indexOf(model+uid))
	}
}

module.exports =  async (weibo, data)=>{
	let uids = [];
	let index = 0;
	let content = data.content;
	while(true){
		let result = getUid(content, index);
		if(result.index == -1){
			break;
		}
		uids.push(result.uid);
		index = result.index;
		content = result.content;
	}

	let ids = uids.map(data=>{
		return data.replace('u/', '');
	})
	return ids;
}