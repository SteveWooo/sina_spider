const fs = require('fs');

module.exports = async(weibo, user)=>{
	let data_path = weibo.config.util.data_path + "/users";
	let users = fs.readFileSync(data_path).toString().split('\n');
	users.pop();
	for(var i=0;i<users.length;i++){
		let u = users[i].split('`');
		let usr = {};
		u.map(d=>{
			let temp = d.split('=');
			usr[temp[0]] = temp[1];
		})
		usr.uid = usr.uid.replace('\r', '');
		if(usr.uid == user.uid){
			return usr;
		}
	}
	return undefined;
}