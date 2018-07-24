const config = require('../config.json');

function init(){
	global.weibo = {
		mq : {
			jobs : []
		}
	};
}

module.exports = ()=>{
	init();
	let weibo = {
		config : config,
		web : {
			get_page : require('./web/get_page'),
		},
		analyze : {
			analyze_user : require('./analyze/analyze_user'),
			get_user_in_page : require('./analyze/get_user_in_page'),
			get_user_in_follow : require('./analyze/get_user_in_follow'),
			get_user_in_fans : require('./analyze/get_user_in_fans'),
		},
		storage : {
			save_user : require('./storage/save_user'),
			get_user : require('./storage/get_user'),
			kv_parse : require('./storage/kv_parse'),
			kv_stringify : require('./storage/kv_stringify')
		},
		util : {
			error : require('./utils/error')
		}
	}

	return weibo;
}