LISTS = {
	n: null,
	json: [],
	decodeJson: [],
	lang: `蒙语`,
	url: `r2s.dashan123.com`,
 



	init: function (json){
		LISTS.json = json;

		console.log(LISTS.json);

		LISTS.list();
	},

	list: function (){
		let list = ``;
		let static = ``;
		let video = ``;
		let audio = ``;

		for (var i = 0; i < LISTS.json.length; i++) {
			let aurl = LISTS.json[i]['ng_audioUrl'];
			let vurl = LISTS.json[i]['ng_videoUrl'];

			let aDownUrl = LISTS.json[i]['ng_audioUrl'] + '?response-content-type=application/octet-stream';
			//let vDownUrl = LISTS.json[i]['ng_videoUrl'] + '?response-content-type=application/octet-stream';

			let img = LISTS.json[i]['ng_img'];
			let year = LISTS.json[i]['ng_date'].substring(0, 4) + `年 `;
			let month = LISTS.json[i]['ng_date'].substring(5, 7) + `月 `;
			let day = LISTS.json[i]['ng_date'].substring(8, 10) + `日 `;

			let title = year + month + day + ` - ` + LISTS.json[i]['ng_duration'];


			//let downloadHref = `down/mg/ng/` + aurl.split("/").pop();
			//let downloadHref = `https://meserver.top/mg/ng/` + aurl.split("/").pop();
		
			if (LISTS.json[i]['ng_videoUrl'] != "") {
				video = `<div class="img col-6 col-md-2" onclick='QBLGPLA.video("local","`+ vurl +`")'><img src="`+ img +`" width="100%" class="img-fluid">`+ vurl +`<br>`+ title +`</div>` + video;

				audio = `<div class="tit col-12 col-md-6"><a href="`+ aDownUrl +`" download="`+ aDownUrl +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a>
				<a href="#a" onclick='QBLG.audio("`+ aurl +`")' >`+ title +`</a></div>` + audio;
			}


			if (LISTS.json[i]['ng_audioUrl'] != "") {
				//audio = `<div class="tit col-12 col-md-6" onclick='QBLG.audio("`+ aurl +`")'><a href="#a" >`+ title +`</a></div>` + audio;
				audio = `<div class="tit col-12 col-md-6" onclick='QBLG.audio("`+ aurl +`")'><a href="`+ aDownUrl +`" download="`+ aDownUrl +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" >`+ title +`</a></div>` + audio;
			}
		}

		//LISTS.lang == `蒙语` ? LISTS.lang = `汉语` : LISTS.lang = `蒙语`;

		//list = `<div class="row">` + video + `<hr style="opacity:0;">` + audio + `</div>`;
		static = `<div class="row">
		<div class="img col-6 col-md-2" onclick='QBLGPLA.video("local","https://`+ LISTS.url +`/mg/ng/c67ce837b64a4bfcbcee2859516a96c1.mp4?response-content-type=application/octet-stream")'>
		<img src="http://mglem.com/data/ng-thumbnail/c67ce837b64a4bfcbcee2859516a96c1.mp4.jpg" width="100%" class="img-fluid"><br>蒙语养生操</div>
		<div class="img col-6 col-md-2" onclick='QBLGPLA.video("local","https://`+ LISTS.url +`/mg/ng/f727fcb417bf4db2bd34704948504139.mp4?response-content-type=application/octet-stream")'>
		<img src="http://mglem.com/data/ng-thumbnail/f727fcb417bf4db2bd34704948504139.mp4.jpg" width="100%" class="img-fluid"><br>汉语养生操</div></div>`;

		// list = `<div class="btit col-12 col-md-12">`+ LISTS.lang +`</div>`+ static +`<hr><div class="row">` + video + `<hr style="opacity:0;">` + audio + `</div>`;
		list = `<div class="btit col-12 col-md-12">`+ LISTS.lang +`</div>`+ static +`<hr><div class="row">` + audio + `<hr style="opacity:0;">` + video + `</div>`;

		QBLG.container(92,  list);
	},

	switch: function (obj){
		LISTS.lang = obj.innerText;
		//document.getElementById('btit-id').innerText = obj.innerText;
	},

	// 下载文件
    downLoad() {
      const url = this.fileUrl + '?response-content-type=application/octet-stream' // 支持跨域下载
      const name = this.fileName + '.' + this.suffix // 自定义文件名
      const a = document.createElement('a')
      a.href = url
      a.download = name // 下载后文件名
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click() // 点击下载
      document.body.removeChild(a) // 下载完成移除元素
    },


}



