const fs = require('fs');
const request = require('request');
const crypto = require('crypto');
const _config = {
	username : 'tkxruiddqbro-euyp@yahoo.com',
	password : 'IXexcauhqap17'
}

function initConfig(options){	
	var pwd1 = crypto.createHash('sha1').update(_config.password).digest('hex');
	var pwd2 = crypto.createHash('sha1').update(pwd1).digest('hex');
	var pwd3Source = pwd2 + options.servertime + options.nonce;
	var pwd3 = crypto.createHash('sha1').update(pwd3Source).digest('hex');

	var username = Buffer.from(_config.username).toString('base64');

	return {
		username : username,
		password : pwd3
	}
}

function like(options){
	return new Promise(resolve=>{
		var option = {
			url : "https://weibo.cn/attitude/"+options.blogId+"/add?uid="+options.userInfo.uid+"&rl=0&st=" + options.userInfo.st,
			headers : {
				'cookie' : 'SUB=' + options.userInfo.sub
			}
		}

		request(option, function(err, res, body){
			console.log('done');
			resolve();
		})
	})
}

function getSt(userInfo){
	return new Promise(resolve=>{
		var option = {
			url : 'https://weibo.cn/',
			headers : {
				'cookie' : 'SUB=' + userInfo.sub
			}
		}

		request(option, function(err, res, body){
			var stSource = body.substring(body.indexOf('/mblog/sendmblog?st='));
			var st = stSource.substring(stSource.indexOf('st=') + 3, stSource.indexOf('"'));
			resolve(st);
		})
	})
}

function getCookie(result){
	return new Promise(resolve=>{
		var option = {
			url : result.data.loginresulturl
		}

		request(option, function(err, res, body){
			var cookies = res.headers['set-cookie'];
			var sub;
			for(var i=0;i<cookies.length;i++){
				if(cookies[i].substring(0, 3) === 'SUB'){
					sub = cookies[i].substring(4, cookies[i].indexOf(';'));
					break;
				}
			}

			resolve(sub);
		})
	})
}

function login(prelogin){
	return new Promise(resolve=>{
		var body = {
			username : _config.username,
			password : _config.password,
			// "servertime": prelogin.prelogin.servertime,
			// "nonce" : prelogin.prelogin.nonce,
			// "rsakv": prelogin.prelogin.rsakv,

			// "savestate" : 1,
			// "r" : "https%3A%2F%2Fweibo.cn%2F",
			// "ec" : 0,
			// "pagerefer" : "https%3A%2F%2Fweibo.cn%2Fpub%2F%3Fvt%3D",
			// "entry" : "weibo",
			// "mainpageflag" : 1
		}

		var bodyData = [];
		for(var i in body){
			bodyData.push(`${i}=${body[i]}`);
		}

		var option = {
			url : 'https://passport.weibo.cn/sso/login',
			form : bodyData.join('&'),
			headers : {
				'referer' : 'https://passport.weibo.cn/signin/login?entry=mweibo&r=https%3A%2F%2Fweibo.cn%2F&backTitle=%CE%A2%B2%A9&vt=',
				'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
			}
		}


		request.post(option, function(err, res, body){
			console.log(res.statusCode);
			body = JSON.parse(body);
			resolve(body);
		})
	})
}

function getPrelogin(options){
	return new Promise(resolve=>{
		var option = {
			url : 'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=dW5kZWZpbmVk&client=ssologin.js(v1.3.18)&_=1329806375939'
		}

		request(option, function(err, res, body){
			body = body.substring(body.indexOf('({') + 1, body.length - 1);
			body = JSON.parse(body);

			var config = initConfig(body);
			resolve({
				prelogin : body,
				config : config
			});
		})
	})
}

async function main(){
	var userInfo = {};
	var prelogin = await getPrelogin({});
	var result = await login(prelogin);

	userInfo.uid = result.data.uid;

	var sub = await getCookie(result);
	userInfo.sub = sub;

	var st = await getSt(userInfo);
	userInfo.st = st;

	await like({
		userInfo : userInfo,
		blogId : 'HCuZ4vNz1'
	});

	return ;
}

main()
	.then()
	.catch(e=>{
		console.log(e)
	})