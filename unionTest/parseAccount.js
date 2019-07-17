const fs = require('fs');
var sourceFile = fs.readFileSync(`${__dirname}/../conf/weibo`).toString().split('\n');

var users = [];

for(var i=0;i<sourceFile.length;i++){
	var data = sourceFile[i].split('----');
	var user = {
		username : data[0],
		password : data[1]
	}

	users.push(user);
}

console.log(JSON.stringify(users));