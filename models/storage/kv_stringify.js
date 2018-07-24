module.exports = (weibo, kv)=>{
	let result = "";
	for(var i in kv){
		result += "`" + i + "=" + kv[i];
	}
	result = result.replace('`', '');
	result += "\n";
	return result;
}