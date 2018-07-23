let weibo = require('./models/init')();
let controller = require('./controller/init')(weibo);

async function main(){
	controller.collect_uid(weibo);
}

main()