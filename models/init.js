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
			get_user_in_page : require('./analyze/get_user_in_page'),
			get_user_in_follow : require('./analyze/get_user_in_follow'),
			get_user_in_fans : require('./analyze/get_user_in_fans'),
		},
		storage : {
			save_user : require('./storage/save_user')
		},
		util : {
			error : require('./utils/error')
		}
	}

	return weibo;
}