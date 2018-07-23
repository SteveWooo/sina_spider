module.exports = (weibo, kv)=>{
	let result = "";
	console.log(kv)
	for(var i in kv){
		result += "`" + i + "=" + kv[i];
	}
	result = result.replace('`', '');
	result += "\n";
	return result;
}