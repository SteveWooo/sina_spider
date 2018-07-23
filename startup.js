let weibo = require('./models/init')();
let controller = require('./controller/init')(weibo);
weibo.controller = controller;
let mq = require('./mq/init')(weibo);
weibo.mq = mq;

async function main(){
	controller.collect_uid.init(weibo);
}

main()