const fs = require('fs');
module.exports = async function(swc, options){
	var userInfos = fs.readFileSync(`${__dirname}/userInfos`).toString();
	userInfos = JSON.parse(userInfos);
	return userInfos;
}