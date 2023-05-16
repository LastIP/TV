/*

github
https://github.com/fanmingming/live



频道列表
2 蒙语文化频道
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=0&fid=831
1 蒙语频道
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=0&fid=830
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=12&fid=830


频道内列表
http://www.nmtv.cn/folder292/folder663/folder301/folder831/folder864

节目列表
https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=0&count=24&column_id=864
https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=12&count=12&column_id=864


https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=0&count=24&column_id=1395



******* 直播 ************
https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=164
https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=163

https://live9.m2oplus.nmtv.cn/00/playlist.m3u8?sign=ad62e28402658e123dbc5ad6f4935b53&t=1683188208


https://live2.m2oplus.nmtv.cn/01/hd/live.m3u8?sign=18f872c282a88166ccfe16ee3feebb18&t=1683189077

https://drm.media.baidubce.com:8888/v1/sdk-player/media/web/available?videoUrl=https://live4.m2oplus.nmtv.cn/04/playlist.m3u8?sign=a8508316729491c0ce253cb49e412dd1&t=1683189336&type=play&duration=900&time=2023-05-04%2014:37:31.861&sessionTime=1683182244652&env=%7B%22flashVersion%22%3A0%2C%22cyberPlayerVersion%22%3A%223.4.0%22%2C%22ak%22%3A%22d451b301e7bd480fb645a878f38cfd3a%22%2C%22provider%22%3A%22videojs%22%2C%22config%22%3A%22%22%7D&sendTime=2023-05-04%2014:37:31
*/




TV = {
	pageNumber: 48,	

	
	/// IP
	IPchannelList: [
		["亚洲新闻", "http://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_4.m3u8"],
		// ["TV", "http://38.64.72.148:80/hls/modn/list/4005/chunklist0.m3u8"],	
		// ["TV新闻", "http://38.64.72.148:80/hls/modn/list/4006/chunklist0.m3u8"],	
		// ["民视新闻台", "http://38.64.72.148:80/hls/modn/list/4012/chunklist0.m3u8"],
		// ["台视新闻", "http://38.64.72.148:80/hls/modn/list/4013/chunklist0.m3u8"],	

		// ["test", "http://mg.com/router.php?s=NGNtest"],
		// ["AAAA", "BBBB"],
		// ["AAAA", "BBBB"],
		// ["AAAA", "BBBB"],
		// ["AAAA", "BBBB"],
		
	],

	/// 内蒙古频道列表
	NMchannelList: [
			["内蒙古蒙语 Монгол", "164"],	//内蒙古蒙语
			["内蒙古蒙语文化 Монгол", "163"],	//内蒙古蒙语文化

			["内蒙古", "161"],	//内蒙古汉语
			["内蒙古经济", "168"],	//内蒙古汉语经济
			["内蒙古农牧频道", "167"],	//内蒙古汉语经济
			["内蒙古新闻综合", "162"],	//内蒙古汉语经济
			["内蒙古文化娱乐", "166"],],	//内蒙古汉语经济

	/// 蒙语节目列表列表
	NMProgramList: [
			["877", "202203287b80c75ef5acc9bfd9ee5142466ce1aa.png"],
			["850", "20220328513de7f65071f7eda5f9ce714b64973a.png"],
			["848", "20220328bf687074da4c298d27bff13443b6352e.png"],
			["849", "202203281cbab6ea4f057940e2ad8dff7612f4d2.png"],
			["836", "20220905f305df115cdcf4cd1e62232a6d24438a.png"],
			["837", "20220218b8ace2d94c48d03f6d681378aeffeb93.png"],
			["1395", "2022091452c653488ab2f45e1ce44271e034d551.png"],
			["841", "202209149acfe9a74f99c7be1df6deb5725245a4.png"],
			["1142", "202110068e76b423f02f80e5a87d2c3624a4391d.png"],
			["845", "20200604116a3e9e63519ae905083b96926c3c14.png"],
			["847", "202203289c940fd6851bf6592a955e8873e02b37.png"],
			["838", "20220328cd151a0ee350a54db33b50cd014d33d9.png"],
			["2542", "20230214c41e0ab76f48d6bd71d8417e4656cd06.png"],
			["1823", "20220914d20bc65ac8bc42e88c0badda9e6ec88c.png"],
			["1822", "20211103fa13f1daaf95d4cf5e296be0b3eb5abc.png"],
			["2263", "202205100229594d01393c79a559880abb7d5b4f.png"],
			["2259", "202205076002f056ea807ed40db1065edd84a31d.png"],
			["860", "20200604c8d656d120ccf094f2598db0d13d5ffd.png"],
			["864", "20220908c49c038c70bfdfc070a8044086b29e85.png"],
			["865", "202209085adb4b65e5121b0cc21a4f4636e0deb8.png"],
			["856", "2021110582d935446c0d2a27ec9a5a40ff0bdb92.png"],
			["855", "20220908adaeb8ef305b6b3ec5a8e383336e1ebc.png"],
			["1820", "20211103b266c7903218f29e39ed645fee5cdf5e.png"],
			["1821", "20211103802baec5c1fe435d93b86dc119222317.png"],
			["2385", "20221023da53d13a84c260164af8668dda0dfb3c.png"],
			["2386", "202211023a216acba62d22256e30bd2a69d4f840.png"],],




	list: function(){
		let list = ``;
		let lives = ``;
		let channels = ``;

		//NMTV直播
		for (var i = 0; i < TV.NMchannelList.length; i++) {
			lives = lives + `<a class="tit col-12 col-md-2" onclick='TV.NMStream(`+ TV.NMchannelList[i][1] +`)' target="_blank">`+ TV.NMchannelList[i][0] +`</a>`;
		}
		//lives = lives + `<a class="tit col-12 col-md-2" href='https://tv.cctv.com/live/cctv3/?spm=C28340.P2SHI2l84K3W.ExidtyEJcS5K.14' target="_blank">CCTV-3</a>`;

		//其他直播
		for (var i = 0; i < TV.IPchannelList.length; i++) {
			console.log(TV.IPchannelList[i][1]);
			lives = lives + `<a class="tit col-12 col-md-2" onclick='MGLEMS.m3u8("`+ TV.IPchannelList[i][1] +`")' target="_blank">`+ TV.IPchannelList[i][0] +`</a>`;
		}

		//节目
		for (var i = 0; i < TV.NMProgramList.length; i++) {
			let id = TV.NMProgramList[i][0];
			let img = `https://img.m2oplus.nmtv.cn/` + TV.NMProgramList[i][1];
			
			channels = `<div class="img col-6 col-md-2" onclick="QBLG.connect('GET', 'https://mapi.m2oplus.nmTV.cn/api/v1/contents.php?offset=0&count=`+ TV.pageNumber +`&column_id=`+ id +`', TV.model)" data-bs-toggle="modal" data-bs-target="#dynamic-modal"><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ id +`</div>` + channels;	
		}


		list = `<hr><div class="row">`+ lives +`</div><div class="row">`+ channels +`</div>`;

		QBLG.container(90, list);	//视频运行
	},

	/// 前端获取nmtv live地址
	NMStream: async function(NMTVId){
		let url = `https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=${NMTVId}&zone=0`;

		let res = await fetch(url);
		let json = await res.json();

		for(var i=0; i<json.length; i++){
			if (json[i]['m3u8'].includes("playlist.m3u8")) {
				let url = json[i]['m3u8'];
				let host = url.split("playlist.m3u8")[0];
				
				res = await fetch(json[i]['m3u8']);
				date = await res.text();
				date = date.split("\n")[2];

				MGLEMS.m3u8(host + date);
			}
		}
	},

	/// model
	model: function (json){
		let img = ``;
		let video = ``;
		let videos = ``;

		for (var i = 0; i < json.length; i++) {
			let img = json[i]['index_pic'];
			let video = json[i]['video']['host'] + json[i]['video']['filepath'] + json[i]['video']['filename'];
			let dates = json[i]['created_at'];

			videos = videos + `<div class="img col-6 col-md-2" onclick='MGLEMS.m3u8("`+ video +`")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ dates +`</div>`;
		}

		videos = `<div class="row">`+ videos +`</div>`;

		QBLG.header = TV.small + TV.close;
		QBLG.body = videos;
		QBLG.footer = ``;

		QBLG.modalx("3500", "text");
	},


	test: async function(url){ //https://juejin.cn/post/7064127816404566053
		let date =``;
		let res = fetch(url, {
		    method: 'POST', // *GET, POST, PUT, DELETE, etc.
		    mode: 'cors', // no-cors, *cors, same-origin
		    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		    credentials: 'same-origin', // include, *same-origin, omit
		    headers: {
		      //'Content-Type': 'application/json'
		       'Content-Type': 'application/x-www-form-urlencoded',
		    },
		    redirect: 'follow', // manual, *follow, error
		    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		    body: JSON.stringify(url) // body data type must match "Content-Type" header
		  });

	 

		console.log(res);
	},

	tests: async function(str){
		console.log(str);
	},

/////////////////////////////////////////////////////////

	get: function(id){
		QBLG.connect('GET', 'https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id='+ id +'&zone=0', TV.getStreamUrl);
	},
	getFetch: async function(url){
	  let res = await fetch(url);
	  let data = await res.text();	//res.json();

	  let path = data.split("\n")[2];
	  let liveUrl = TV.host + path;

	  console.log(liveUrl);

	  MGLEMS.m3u8(liveUrl);
	},
	getStreamUrl: function(json){

		for (var i = 0; i < json.length; i++) {
			
			if (json[i]['m3u8'].includes("playlist.m3u8")) {
				let url = json[i]['m3u8'];

				 TV.host = url.split("playlist.m3u8")[0];

				TV.getFetch(url);
 				//QBLG.connectText('GET', url, TV.getLiveUrl);
 				//MGLEMS.m3u8("https://live2.m2oplus.nmtv.cn/01/hd/live.m3u8?sign=5a579d9298d5d9f1ee2fbb834cd0d256&t=1683255827");
				//console.log(path);
			}
		}
	},

	getLiveUrl: function(text){
		let path = text.split("\n")[2];
		let liveUrl = TV.host + path;

		//console.log(liveUrl);

		MGLEMS.m3u8(liveUrl);
	},

	//https://segmentfault.com/a/1190000022506474
	//https://juejin.cn/post/7064127816404566053
	cctv: async function(url){	
		let res = await fetch(url);
		let date = await res.text();

		//console.log(date);

		MGLEMS.m3u8(date);
	},
	test:  function(url){	
		console.log(url);
	},
	



	small: `<small class="me-auto text-muted" id="main-modal-title"></small>`,
	close: `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`,

}