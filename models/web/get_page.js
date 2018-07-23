const request = require('request');
/**
info : {
	page_url : string,
	query : {},
}
return {
	code : http code,
	content : utf8 content
}
*/
function req (weibo, option) {
	return new Promise((resolve, reject)=>{
		request(option, function(err, res, body){
			if(err || res.statusCode != 200){
				resolve(weibo.util.error( 4000, '网络请求错误' ));
				return ;
			}

			resolve({
				code : 2000,
				content : body
			})
		})
	})
}

module.exports = async (weibo, info)=>{
	let query = "?";
	for(var i in info.query){
		query += "&" + i + "=" + info.query[i];
	}
	query = query.replace('&', '');
	let option = {
		url : weibo.config.base_url
		 + (info.page_url ? "/" + info.page_url : "")
		 + (query.length == 1 ? "" : query),
		headers : {
			"cookie" : weibo.config.user.cookie
		}
	}

	let content = await req(weibo, option);
	return content;
}