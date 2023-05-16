/*

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

	//	https://img.m2oplus.nmtv.cn/
	//	https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=0&fid=830
	channelsList: [
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
			["2386", "202211023a216acba62d22256e30bd2a69d4f840.png"],
		],



 


	list: function(){
		//console.log(json);

		let list = ``;
		let tv = ``;
		
		for (var i = 0; i < TV.channelsList.length; i++) {
			let id = TV.channelsList[i][0];
			let img = `https://img.m2oplus.nmtv.cn/` + TV.channelsList[i][1];
			

			list = `<div class="img col-6 col-md-2" onclick="QBLG.connect('GET', 'https://mapi.m2oplus.nmTV.cn/api/v1/contents.php?offset=0&count=`+ TV.pageNumber +`&column_id=`+ id +`', TV.model)" data-bs-toggle="modal" data-bs-target="#dynamic-modal"><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ id +`</div>` + list;			
		}

		// for (var i = 0; i < json.length; i++) {
		// 	let url = json[i]['tv_url'];
		// 	let name = json[i]['tv_name'];


		// 	console.log(url);

		// 	tv = `<a class="tit col-12 col-md-2" onclick='MGLEMS.m3u8("`+ url +`")' target="_blank">`+ name +`</a>` + tv;	

		// }
		tv = `<a class="tit col-12 col-md-2" onclick='TV.live(164)' target="_blank">蒙语直播S</a>
			<a class="tit col-12 col-md-2" onclick='TV.live(163)' target="_blank">蒙语文化直播S</a>
			<a class="tit col-12 col-md-2" onclick='TV.live(168)' target="_blank">内蒙古电视S</a>
			<a class="tit col-12 col-md-2" onclick='TV.live(161)' target="_blank">内蒙古经济S</a>
			`;	

		/*
			<a class="tit col-12 col-md-2" onclick='TV.get(164)' target="_blank">蒙语直播</a>	
			<a class="tit col-12 col-md-2" onclick='TV.get(163)' target="_blank">蒙语文化直播</a>
			<a class="tit col-12 col-md-2" onclick='TV.live(164)' target="_blank">蒙语直播S</a>
			<a class="tit col-12 col-md-2" onclick='TV.live(163)' target="_blank">蒙语文化直播S</a>
			
		*/	



		list = `<hr><div class="row">`+ tv +`</div><div class="row">`+ list +`</div>`;

		//QBLG.navSub("on" , "");
		QBLG.container(90, list);	//视频运行
	},

	model: function (json){
		let img = ``;
		let video = ``;
		let videos = ``;

		// console.log(json);


		for (var i = 0; i < json.length; i++) {
			let img = json[i]['index_pic'];
			let video = json[i]['video']['host'] + json[i]['video']['filepath'] + json[i]['video']['filename'];
			let dates = json[i]['created_at'];

	 		//console.log(video);

			videos = videos + `<div class="img col-6 col-md-2" onclick='MGLEMS.m3u8("`+ video +`")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ dates +`</div>`;
		}

		videos = `<div class="row">`+ videos +`</div>`;

		QBLG.header = TV.small + TV.close;
		//QBLG.header = ``;
		QBLG.body = videos;
		QBLG.footer = ``;

		QBLG.modalx("3500", "text");
	},




	/// 前端获取nmtv live地址
	live: async function(NMTVId){
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

		console.log(liveUrl);

		MGLEMS.m3u8(liveUrl);
	},
	



	small: `<small class="me-auto text-muted" id="main-modal-title"></small>`,
	close: `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`,

}