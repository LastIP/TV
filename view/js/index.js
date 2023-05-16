var INDEX = {

	lang: `蒙语课程`,



	init: function (json){	
		INDEX.json = json;

		//console.log(INDEX.json);

		//INDEX.record(INDEX.json['record']);

		INDEX.audio(2);
	},



	record: function (json){
		let vlist = ``;
		let alist = ``;
		let tv = ``;
		let list = ``;

		for (var i = 0; i < json.length; i++) {
			
			let title = json[i]['date'] + ` ` + json[i]['title'];
			let audio = json[i]['path']['audio'];
			let audioDown = audio + '?response-content-type=application/octet-stream';
			let video = json[i]['path']['video'];
			let img = json[i]['path']['img'];

			//vlist = vlist + `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ video +`?response-content-type=application/octet-stream")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ title +`</div>`;
			vlist = vlist + `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ video +`")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ title +`</div>`;
		//	vlist = vlist + `<div class="img col-6 col-md-2" onclick='MGLEMS.video("https://live2.m2oplus.nmtv.cn/01/hd/live.m3u8?sign=ad2863f3220555b6a577f516934ca2da&t=1683122567")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ title +`</div>`;

			alist = alist + `<div class="tit col-12 col-md-6" onclick='MGLEM.audio("`+ audio +`")'><a href="`+ audioDown +`" download="`+ audioDown +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" >`+ title +`</a></div>`;
		}

		// tv = `<a class="tit col-12 col-md-2" href="http://www.nmtv.cn/folder84/folder86/folder137" target="_blank">内蒙古电视</a>
		// 	<a class="tit col-12 col-md-2" href="http://www.nmtv.cn/folder84/folder86/folder138" target="_blank">内蒙古点播</a>
		// 	`;

		list = `<div class="row"><div class="btit col-12 col-md-12">讲座录制</div></div>
		 
		<div class="row">`+ vlist +`</div>
		<div class="row">`+ alist +`</div><hr>`;
		
		return list;
	},

	audio: function (num){
		let list = ``;
		let json;

		//console.log(INDEX.json['audio2']);

		if (num == 1) {
			json = INDEX.json['1'];
		}
		if (num == 2) {
			json = INDEX.json['2'];
		}

		//console.log(json);

		for (var i = 0; i < json.length; i++) {
			let title = json[i]['ng_date'].substring(0, 10) + ` ** ` + json[i]['ng_duration'];
			let audio = json[i]['ng_audioUrl']['file'];
			let audioDown = audio + '?response-content-type=application/octet-stream';
			
			//console.log(json[i]);
			list = list + `<div class="tit col-12 col-md-6" onclick='MGLEM.audio("`+ audio +`")'><a href="`+ audioDown +`" download="`+ audioDown +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" >`+ title +`</a></div>`;
		}


		//list = INDEX.record(INDEX.json['record']) + `<div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>` + `<div class="row">`+ list +`</div>`;
		list = INDEX.record(INDEX.json['record']) + `<div class="row"><div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>` + list +`</div>`;

		QBLG.container(92, list);
		//QBLG.container(92,  INDEX.record(INDEX.json['record']));
	},


	video: function (num){
		let list = ``;

		if (num == 2) {		json = INDEX.json['v2'];	}

		console.log(json);

		for (var i = 0; i < json.length; i++) {
			let title = json[i]['ng_date'].substring(0, 10) + ` ** ` + json[i]['ng_duration'];
			let video = json[i]['ng_videoUrl']['file'];
			let img = json[i]['ng_videoUrl']['img'];

			console.log(json[i]);
			list = list + `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ video +`")'><img src="`+ img +`" width="100%" class="img-fluid">`+ video +`<br>`+ title +`</div>`;
		}

		
			

		list = `<div class="row"><div class="btit col-12 col-md-12">蒙语视频</div></div><div class="row">` + list + `</div>`;

		QBLG.container(92,  list);

		//console.log(json);
	},

	switch: function (obj){
		INDEX.lang = obj.innerText + `课程`;
	},


	info: function (){
		// console.log('sssdD');
		let modalHeader = document.getElementById('dynamic-modal-header');
	    let modalBody = document.getElementById('dynamic-modal-body');
	    let modalFooter = document.getElementById('dynamic-modal-footer');

	    modalHeader.innerHTML = `<small class="me-auto text-muted" id="main-modal-title"></small> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;
	    modalBody.style.height = "3500px";

	    modalBody.innerHTML = `
	  
	    <hr>
	  
	    NMTV
	    `;
	},

}


 // 通过安卓手机下载：
// 	    <a href="https://sj.qq.com/appdetail/com.yufang.ajt" target="_blank">sj.qq.com/appdetail/com.yufang.ajt</a><br>

// 	    官方地址：
// 	    <a href="http://www.ajtmy.com/" target="_blank">http://www.ajtmy.com/</a><br>

// 	    下载地址：
// 	    <a href="https://think.ajtmy.com/#/downloadApp" target="_blank">https://think.ajtmy.com/#/downloadApp</a><br> 