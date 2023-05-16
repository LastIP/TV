var YTINIT = {
	videosJson: ``,		//视频json
	modalJson: ``,		//modal json
	channelsJson: ``,	//频道json
	listJson: ``,		//格式化json
	// lang: `MN`,		//格式化json

	src: ``,
	videosMode: `videos`,
	modalMode: `modal`,
	channelsMode: `channels`,


	PAGE: 300,	//翻页数量

	/// 钥匙
	k1: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCy8NwLEwXTaUZr9gZX7z14q/7T8/bYsYeymVu3CVOI556Z/BZs
8poZu7VfAE2euzPSskV5um6sTs1W4WDsbyit6+vTvVWF+VglFG3pFoO9i0K96Qxv
x8OHgb3q5OyLavI3zNRSUiJmiC7E2eXvg4`,
	k2: ``,
	k3: `-----END RSA PRIVATE KEY-----`,


	get: function(mode){
		if (mode == "videos") {
			QBLG.connect('GET', 'router.php?s=YTVideos', YTINIT.videos);
		}

		if (mode == "channels") {
			QBLG.connect('GET', 'router.php?s=YTChennels', YTINIT.channels);
		}
	},

	/// 视频
	videos: function(json){
		if (json != "") {		
			YTINIT.videosJson = json;	
		}
		
		YTINIT.forNum = 0;
		/// 格式化
		if (YTINIT.list("videos")) {
			nav = YTINIT.html("nav"); //子导航
			QBLG.navSub("", nav);
			QBLG.container(90, YTINIT.src); //内容
		}
		QBLG.body = ``;
	},

	/// 频道
	channels: function(json){
		console.log(json);
	 

		if (json != "") {		
			YTINIT.channelsJson = json; 	
			//YTINIT.decrypt("channels");	
		}

		YTINIT.src = ``;

		nav = YTINIT.html("nav");
		QBLG.navSub("", nav);
	 

		for (var i = 0; i < YTINIT.channelsJson.length; i++) {
			UName = YTINIT.channelsJson[i]['u_name'];
			UThum = YTINIT.channelsJson[i]['u_thum'];
			UUID = YTINIT.channelsJson[i]['u_uid'];
			USub = ` [` + (YTINIT.channelsJson[i]['u_sub'] / 1000).toFixed(1) + `K] `;

			//YTINIT.src = YTINIT.src + `<a data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="QBLG.connect('GET', 'router.php?s=YTVideos&UUId=`+ UUID +`', YTINIT.modal)" id="qblg-span" class="col-md-1 col-3" ><img src="`+ UThum +`" class="img-fluid" style="width: 100%;"><h1 id="qblg-img-h1" style="top: 50%;">` + USub +`<br>` + UName +`</h1></a>`;
			YTINIT.src += `<a class="tit col-md-3 col-4" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="QBLG.connect('GET', 'router.php?s=YTVideos&UUId=`+ UUID +`', YTINIT.modal)">` + UName + USub +`</a>`;
		}

		YTINIT.src = `<hr><div class="row">`+ YTINIT.src +`</div>`
		QBLG.container(90, YTINIT.src);
		QBLG.body = ``;
	},


	list: function(mode){
		YTINIT.src = ``;
		let duration = ``;

		if (mode == "videos") {		YTINIT.listJson = YTINIT.videosJson;		}
		if (mode == "modal") {		YTINIT.listJson = YTINIT.modalJson;		}
		// console.log(YTINIT.listJson);
		YTINIT.mergeJson();

		//for (var i = 0; i < YTINIT.listJson.length; i++) {
		for (var i = YTINIT.forNum; i < (YTINIT.forNum + YTINIT.PAGE); i++) {
			//if (YTINIT.listJson[i]['y_guid'] != null) {
				// let a = i + `  ` + YTINIT.listJson[i]['y_guid'] + ` (` + YTINIT.listJson[i]['y_vid'] + `)`;
				// console.log(a);
			//}


			UName = YTINIT.listJson[i]['u_name'];
			UCId = YTINIT.listJson[i]['u_cid'];
			UUID = YTINIT.listJson[i]['u_up'];

			VName = YTINIT.listJson[i]['y_tit'];
			VId = YTINIT.listJson[i]['y_vid'];
			//Vdate = YTINIT.listJson[i]['y_data'];
			VdateInt = YTINIT.listJson[i]['y_data_int'];

			//VImg = `https://img.youtube.com/vi/`+ VId +`/mqdefault.jpg`;
			VImg = YTINIT.listJson[i]['y_img'];
			
			if (YTINIT.listJson[i]['y_duration']) {
				duration = YTINIT.listJson[i]['y_duration'];
				duration = duration.replaceAll("PT", "");
				duration = duration.replaceAll("H", ":");
				duration = duration.replaceAll("M", ":");
				duration = duration.replaceAll("S", "");
 
			}else{
				duration = ``;
			}

			if (YTINIT.listJson[i]['y_data']) {
				Logo = UName + `<br>` + YTINIT.listJson[i]['y_data'].substring(2,11) + `[` + duration + `]`;
			}
			
			if (VName != "null" && VId != "null") {
				//console.log(UUID);
				YTINIT.src = YTINIT.src + `<a onclick='QBLGPLA.video("local","`+ VId +`")' id="qblg-span" class="col-md-2 col-6" title="`+ VName +`"><img width="640px" height="360px" src="`+ VImg +`" class="img-fluid"><h1 id="qblg-img-h1">`+ Logo +`</h1><br>`+ VName +`</a>`;

				//video = `<div class="img col-6 col-md-2" onclick='QBLGPLA.video("local","`+ url +`")'><img src="`+ LISTS.thumbnail(name) +`" width="100%" class="img-fluid"><br>`+ name +`</div>` + video;
			}
		}

	 
		YTINIT.src = `<div class="row">` + YTINIT.src + `</div>`;
		return true;
	},


	modal: function(json){

		YTINIT.modalJson = json;
		console.log(json);
		//YTINIT.decrypt("modal");
		YTINIT.forNum = 0;

		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-xl modal-dialog modal-dialog-scrollable");

		//console.log(YTINIT.modalJson);

		//
		YTINIT.channelCountUpdate(YTINIT.modalJson[0]['u_up']);

		n = YTINIT.forNum + YTINIT.PAGE;
		YTINIT.channel = `<a href="https://www.youtube.com/channel/`+ YTINIT.modalJson[0]['u_cid'] +`" target="_blank" title="">[`+ YTINIT.forNum + `--` + n +`] [`+ YTINIT.modalJson.length +`] `+ YTINIT.modalJson[0]['u_name'] +`</a>`;

		//document.getElementById('dynamic-modal-body').innerHTML = `<div style="height: 3500px; width: 100%;"></div>`;

		if (YTINIT.list("modal")) {
			QBLG.header = YTINIT.html("modal");

			QBLG.body = YTINIT.src;
			QBLG.footer = YTINIT.channel;
			//QBLG.footer = "sadsad";
			QBLG.modalx("3500", "text");
		}
	},

 

	videosCountUpdate: function(){
		let UUID = YTINIT.modalJson[0]['u_up'];
		QBLG.connect('GET', 'router.php?s=YTVideosCountUp&UUId=' + UUID, QBLG.null);
	},

	channelCountUpdate: function(UUID){
		QBLG.connect('GET', 'router.php?s=YTChanCountUp&UUId=' + UUID, QBLG.null);
	},


	mergeJson: function(){
 		rem = YTINIT.listJson.length % YTINIT.PAGE;
		count = parseInt(YTINIT.listJson.length / YTINIT.PAGE);

		let n = 0;
		let arr = new Array(n);

		for (var i = n; i < n + (YTINIT.PAGE - rem); i++) {
			arr[i] = {
			    "u_cid":"null", "u_name":"null", "u_up":"null",
			    "y_id":"null", "y_tit":"null", "y_vid":"null","y_cCount":"null", "y_lCount":"null", "y_data":"null", "y_data_int":"null",   
			};
		}

		YTINIT.listJson = YTINIT.listJson.concat(arr);
	},


	page: function(str){
		if (str == "pre" && YTINIT.forNum != 0) {
			YTINIT.forNum = YTINIT.forNum - YTINIT.PAGE;
		}
		if (str == "next" && (YTINIT.forNum + YTINIT.PAGE) != YTINIT.listJson.length) { // QLGYT.fullNum ==  &&
			YTINIT.forNum = YTINIT.forNum + YTINIT.PAGE;
		}

		YTINIT.list("modal");
        document.getElementById('dynamic-modal-body').innerHTML = YTINIT.src + `<div style="height: 1000px; width: 100%;"></div>`;


        n = YTINIT.forNum + YTINIT.PAGE;
        if (n > YTINIT.modalJson.length) {	n = YTINIT.modalJson.length;	}
		document.getElementById('dynamic-modal-footer').innerHTML = `<a href="https://www.youtube.com/channel/`+ YTINIT.modalJson[0]['u_cid'] +`" target="_blank" title="">[`+ YTINIT.forNum + `--` + n +`] [`+ YTINIT.modalJson.length +`] `+ YTINIT.modalJson[0]['u_name'] +`</a>`;
	},


	sort: function (mode, key) {
		YTINIT.forNum = 0;
		YTINIT.pai = YTINIT.pai == "⬆" ?  YTINIT.pai = "⬇" : YTINIT.pai = "⬆";

	    if (mode == "modal") {
	    	YTINIT.listJson = YTINIT.modalJson.sort(QBLG.compares(key));
	        YTINIT.list("modal");	
	    }
	    if (mode == "videos") {
	    	YTINIT.listJson = YTINIT.videosJson.sort(QBLG.compares(key));
	        YTINIT.list("videos");	
	    }

	    document.getElementById('dynamic-modal-title').innerHTML = YTINIT.pai;
	    document.getElementById('dynamic-modal-body').innerHTML = YTINIT.src + `<div style="height: 1000px; width: 100%;"></div>`;
	},



	html: function(mode){
		// 二级导航
		nav = `
			<a class="subnav px-2" onclick="YTINIT.update()">更新</a>

			<a class="subnav px-2" onclick="YTINIT.get('videos')">视频</a>
			<a class="subnav px-2" onclick="YTINIT.get('channels')">频道</a>

			<a onclick="YTINIT.downloder()" data-bs-toggle="modal" data-bs-target="#dynamic-modal" class="subnav px-2" >下载</a>
			<a onclick="YTINIT.search()" data-bs-toggle="modal" data-bs-target="#dynamic-modal" class="subnav px-2" >搜索</a>`;
		// modal 导航
		modal = `
			<small class="me-auto text-muted" id="dynamic-modal-title">⬆</small>

 

		 
			<a type="button" class="me-auto" onclick="QBLG.sort('modal', 'y_cCount')">View</a>
			<a type="button" class="me-auto" onclick="QBLG.sort('modal', 'y_lCount')">Like</a>
			<a type="button" class="me-auto" onclick="QBLG.sort('modal', 'y_data_int')">Date</a>



			<a type="button" class="me-auto" onclick="YTINIT.page('pre')"><<<</a>
			<a type="button" class="me-auto" onclick="YTINIT.page('next')">>>></a>
			`;

		//
		search = `<small class="me-auto text-muted" id="dynamic-modal-title"></small>
					<div class="input-group-sm me-auto text-muted btn-group" style="margin: -3px;" onkeydown="YTINIT.keyEnter()">
					  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="search-input" name="search-input">
					  	<label class="btn btn-outline-secondary" for="btncheck3" onclick="YTINIT.searchSubmit('YT')">YT</label>
						<label class="btn btn-outline-secondary" for="btncheck1" onclick="YTINIT.searchSubmit('正')">正</label>
						<label class="btn btn-outline-secondary" for="btncheck2" onclick="YTINIT.searchSubmit('简')">原</label>  
					</div>

				<!-- <span class="input-group-text" id="inputGroup-sizing-sm">YT</span>
					  <span class="input-group-text" id="inputGroup-sizing-sm">正</span>
					  <span class="input-group-text" id="inputGroup-sizing-sm">原</span> -->

				<!-- <a type="button" class="me-auto" onclick="YTINIT.sort('modal', 'y_cCount')">View</a>
				<a type="button" class="me-auto" onclick="YTINIT.sort('modal', 'y_lCount')">Like</a>
				<a type="button" class="me-auto" onclick="YTINIT.sort('modal', 'y_data_int')">Date</a> -->



				`;
		//
		downloderHead = `<a onclick="QBLG.connect('GET', 'router.php?s=YTDownloadDelete', YTINIT.downloadDel);" class="me-auto text-muted" href="#">***</a>`;
		downloder = `<div class="row">
				<form method="post" id="yt-down-form" action="router.php?s=YTDownloader" target="ifr-mess" class="form-group">
					<div class="mb-3">
					  <input type="email" class="form-control" id="yt-down-select" name="yt-down-select" placeholder="选择" value="a" style="background-color: #e8e7e3">
					</div>
					<div class="mb-3">
					  <textarea class="form-control" id="yt-down-url" name="yt-down-url" rows="2" style="background-color: #e8e7e3"></textarea>
					</div>
				</form>

				<div class="btn-group" role="group" aria-label="Basic checkbox toggle button group" >
				  <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" onclick="QBLG.connect('GET', 'router.php?s=YTDownloadList', YTINIT.downloadList)">
				  <label class="btn btn-outline-secondary" for="btncheck1">刷新</label>

				  <a onclick="YTINIT.download(this)" class="btn btn-outline-secondary" href="" target="ifr">下载+</a>
				</div><br>

				<hr><div class="col-12 col-md-12" id="yt-down-list"></div></div>`;

		downloderTempIframe = `
		<div class="row">
				<form method="post" id="yt-down-form" action="controller/down.php?s=down" target="ifr-mess" class="form-group">
					<div class="mb-3">
					  <input type="email" class="form-control" id="yt-down-select" name="yt-down-select" placeholder="选择" value="a" style="background-color: #e8e7e3">
					</div>
					<div class="mb-3">
					  <textarea class="form-control" id="yt-down-url" name="yt-down-url" rows="2" style="background-color: #e8e7e3"></textarea>
					</div>
				</form>

				<iframe class="col-12 col-md-12" id="ifr-mess" name="ifr-mess" frameborder="no" marginwidth="0" marginheight="0" scrolling="yes" style="height: 20px; width: 100%;"></iframe>`;
		
		// 关闭
		close = `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;

		if (mode == "modal") {	return 	modal + close;	}
		if (mode == "nav") {	return 	nav;	}
		if (mode == "close") {	return 	close;	}
		if (mode == "search") {	return 	search + close;	}
		if (mode == "downloder") {	return 	downloder;	}
		if (mode == "downloderHead") {	return 	downloderHead + close;	}
	},



}