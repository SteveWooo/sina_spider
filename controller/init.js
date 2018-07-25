module.exports = (weibo)=>{
	let controller = {
		collect_uid : require('./collect_uid'),
		collect_uid_before : require('./collect_uid_before')
	}
	weibo.controller = controller;
}