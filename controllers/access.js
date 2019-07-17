module.exports = async (swc, options)=>{
	var userInfo = await swc.utils.weibo.login(swc, {
		username : 'tkxruiddqbro-euyp@yahoo.com',
		password : 'IXexcauhqap17'
	})

	console.log(userInfo);

	return swc;
}
	