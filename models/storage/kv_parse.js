module.exports = (weibo, kv)=>{
	kv = kv.split('`');
	let result = {};
	kv.map(data=>{
		data = data.split('=');
		result[data[0]] = data[1];
	})
	return result;
}