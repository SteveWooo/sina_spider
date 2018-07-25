let weibo = require('./models/init')();
let controller = require('./controller/init')(weibo);
let mq = require('./mq/init')(weibo);

async function main(weibo){
	// weibo.controller.collect_uid_before.init(weibo);
}

main(weibo);