const fs = require('fs');
/*
user = {
	uid
	uid_main
}

file :
{uid : %uid, uid_main : %uid_main}
*/
module.exports = async(weibo, user)=>{
	let data_path = weibo.config.util.data_path + "/users";
	fs.appendFileSync(data_path, weibo.storage.kv_stringify(weibo, user));
}