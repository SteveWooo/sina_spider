let weibo = require('./models/init')();
let controller = require('./controller/init')(weibo);
weibo.controller = controller;
let mq = require('./mq/init')(weibo);
weibo.mq = mq;

async function main(weibo){
	// controller.collect_uid_before.init(weibo);
}

main(weibo);