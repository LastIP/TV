MEDIAS = {
	json: '',

	list: function (json){
		let video = ``;
		MEDIAS.json = json;

		for (var i = 0; i < MEDIAS.json.length; i++) {
			let title = MEDIAS.json[i]['media_title'];

			let img = MEDIAS.json[i]['src']['img'];
			let mp4 = MEDIAS.json[i]['src']['mp4'];
			let mp3 = MEDIAS.json[i]['src']['mp3'];
			
			video = `<div class="img col-6 col-md-2" onclick='QBLGPLA.video("localMedias","`+ mp4 +`","`+ mp3 +`")'><img src="`+ img +`" width="100%" class="img-fluid"><br>`+ title +`</div>` + video;
		}

		list = `<div class="row">` + video + `</div>`;
		QBLG.navSub("on", "");
		QBLG.container(92,  list);
	},


}