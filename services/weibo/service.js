module.exports = {
	init : require('./server/init'),
	dao : {
		getUserInfos : require('./dao/getUserInfos')
	},
	handle : {
		like : require('./handle/like'),
	},

	jobs : {
		cronLike : require('./jobs/cronLike')
	}
}