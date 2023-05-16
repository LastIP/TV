LISTS = {
	n: null,
	json: [],
	decodeJson: [],
 



	init: function (json){
		LISTS.json = json;
		// console.log(LISTS.json);

		if (LISTS.json[0].includes("./DATA/")) {
			LISTS.n = 3;
			LISTS.nav();
			LISTS.list("英语");

		}else if (LISTS.json[0].includes("meserver.top") || LISTS.json[0].includes("r2.cloudflarestorage.com")) {
			LISTS.n = 4;
			LISTS.nav();
			LISTS.list("100");

		}else if (LISTS.json[0].includes("cdn.dashan123.com")) {
			LISTS.n = 6;
			LISTS.nav();
			LISTS.list("国语");
		}
		
	},

	nav: function (n){
		let arr = [];
		let nav = ``;

		for (var i = 0; i < LISTS.json.length; i++) {
			LISTS.decodeJson[i] = decodeURIComponent(LISTS.json[i]);
			let key = LISTS.decodeJson[i].split("/")[LISTS.n];
			// LISTS.key = LISTS.decodeJson[i].split("/")[LISTS.n];
			
				
			if (arr.indexOf(key) == -1 && key != "thumbnail") {
				arr.push(key);

				//nav = nav + `<a href="#" class="subnav px-2" onclick="LISTS.list('`+ key +`')">`+ key +`</a>`;
				nav = nav + `<a href="#" class="subnav px-2" onclick="LISTS.list('`+ key +`')">`+ key +`</a>`;
			}
		}

		QBLG.navSub("on" , nav);
	},

	list: function (key){
		let list = ``;
		let audio = ``;
		let video = ``;

		for (var i = 0; i < LISTS.decodeJson.length; i++) {
			if (LISTS.decodeJson[i].includes('/' + key + '/')) {
				LISTS.key = key;
				LISTS.json[i] = LISTS.json[i].replaceAll("'","&apos;"); 
				LISTS.json[i] = LISTS.json[i].replaceAll('"',"&quot;"); 

				let url = LISTS.json[i];
				let name = ``;

				if (LISTS.decodeJson[i].includes("r2.cloudflarestorage.com")) {
					name = LISTS.decodeJson[i].split("/")[LISTS.n + 1].split("?")[0];
				}else{
					name = LISTS.decodeJson[i].split("/")[LISTS.n + 1];
				}

				if (LISTS.decodeJson[i].match(".mp3") || LISTS.decodeJson[i].match(".flac") || LISTS.decodeJson[i].match(".wav")) {
					audio = `<div class="tit col-12 col-md-6"><a href="`+ url +`" download target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" onclick='QBLG.audio("`+ url +`")' >`+ name +`</a></div>` + audio;
				}else if (LISTS.decodeJson[i].match(".mp4") || LISTS.decodeJson[i].match(".mkv")) {

					video = `<div class="img col-6 col-md-2" onclick='QBLGPLA.video("local","`+ url +`")'><img src="`+ LISTS.thumbnail(name) +`" width="100%" class="img-fluid"><br>`+ name +`</div>` + video;
				}
			}
		}

		list = `<div class="row">` + audio + `<hr style="opacity:0;">` + video + `</div>`;
		QBLG.container(92,  list);
	},

	thumbnail: function (name){
		if (LISTS.json[0].includes("cdn.dashan123.com") || LISTS.json[0].includes("r2.cloudflarestorage.com")) {
			name = encodeURIComponent(name);
		}

		for (var i = 0; i < LISTS.json.length; i++) {
			if (LISTS.json[i].match(name + '.jpg')){
			    return LISTS.json[i];
			}
		}
	},





}