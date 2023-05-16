var INDEX = {
	img: `http://mglem.com/data/ng-thumbnail/`,
	cdn: `https://r2s.dashan123.com/mg/ng/`,
	lang: `蒙语`,


 


	init: function (json){	
		INDEX.json = json;

		//console.log(INDEX.json);

		INDEX.list(INDEX.json['videos']);
		INDEX.statics(INDEX.json['medias']);
	},


	statics: function (json){
		let list = ``;

		for (var i = 0; i < json.length; i++) {
			//console.log(json[i]);

			let name = json[i];
			name = name.split("/").pop();

			list =  `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ json[i] +`.mp4?response-content-type=application/octet-stream")'><img src="`+ json[i] +`.mp4.jpg" width="100%" class="img-fluid"><br>`+ name +`</div>` + list;
		}

		list = `<div class="row">`+ list +`</div>`;
		return list;
	},

	videos: function (json){
		
		//console.log(json);

		let list = ``;
		//let static = ``;
		let video = ``;
		//let audio = ``;
		let img = ``;

		for (var i = 0; i < json.length; i++) {

			if (json[i]['ng_videoId'] != "") {
				let aurl = json[i]['ng_audioId'];
				//let vurl = INDEX.cdn + json[i]['ng_videoId'];
				let vurl = json[i]['ng_videoId'];

	
			
				img = json[i]['ng_videoImg'];
				


				let year = json[i]['ng_date'].substring(0, 4) + `年 `;
				let month = json[i]['ng_date'].substring(5, 7) + `月 `;
				let day = json[i]['ng_date'].substring(8, 10) + `日 `;

				let title = year + month + day + ` - ` + json[i]['ng_duration'];


			
				if (json[i]['ng_videoUrl'] != "") {
					video = video + `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ vurl +`")'><img src="`+ img +`" width="100%" class="img-fluid">`+ vurl +`<br>`+ title +`</div>`;
				}

			}


			// if (json[i]['ng_audioUrl'] != "") {
			// 	audio = audio + `<div class="tit col-12 col-md-6" onclick='MGLEM.audio("`+ aurl +`")'><a href="`+ aurlDown +`" download="`+ aurlDown +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" >`+ title +`</a></div>`;
			// }
		}



	 
		//list = `<div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>`+ static +`<hr><div class="row">` + audio + `<hr style="opacity:0;">` + video + `</div>`;
		list = `<div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>`+ INDEX.statics(INDEX.json['medias']) +`<hr><div class="row">` + video + `</div>`;

		QBLG.container(92,  list);
	},


	//// new
	list: function (json){
		
		//console.log(json);

		let list = ``;
		let static = ``;
		let video = ``;
		let audio = ``;
		let img = ``;

		for (var i = 0; i < json.length; i++) {
			let aurl = json[i]['ng_audioId'];
			//let vurl = INDEX.cdn + json[i]['ng_videoId'];
			let vurl = INDEX.cdn + json[i]['ng_videoId'];

			let aurlDown = json[i]['ng_audioId'] + '?response-content-type=application/octet-stream';
	

			if (json[i]['ng_videoId'] != "") {
				img = INDEX.img + json[i]['ng_videoId'] + `.jpg`;
			}



			let year = json[i]['ng_date'].substring(0, 4) + `年 `;
			let month = json[i]['ng_date'].substring(5, 7) + `月 `;
			let day = json[i]['ng_date'].substring(8, 10) + `日 `;

			let title = year + month + day + ` - ` + json[i]['ng_duration'];


		
			if (json[i]['ng_videoUrl'] != "") {
				//video = `<div class="img col-6 col-md-2" onclick='MGLEMS.video("`+ vurl +`")'><img src="`+ img +`" width="100%" class="img-fluid">`+ vurl +`<br>`+ title +`</div>` + video;o;
			}


			if (json[i]['ng_audioUrl'] != "") {
				audio = audio + `<div class="tit col-12 col-md-6" onclick='MGLEM.audio("`+ aurl +`")'><a href="`+ aurlDown +`" download="`+ aurlDown +`" target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#a" >`+ title +`</a></div>`;
			}
		}

		//LISTS.lang == `蒙语` ? LISTS.lang = `汉语` : LISTS.lang = `蒙语`;

		//list = `<div class="row">` + video + `<hr style="opacity:0;">` + audio + `</div>`;
		

	 
		//list = `<div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>`+ static +`<hr><div class="row">` + audio + `<hr style="opacity:0;">` + video + `</div>`;
		list = `<div class="btit col-12 col-md-12">`+ INDEX.lang +`</div>`+ INDEX.statics(INDEX.json['medias']) +`<hr><div class="row">` + audio + `</div>`;

		QBLG.container(92,  list);
	},




	switch: function (obj){
		INDEX.lang = obj.innerText;
	},

	info: function (){
		// console.log('sssdD');
		let modalHeader = document.getElementById('dynamic-modal-header');
	    let modalBody = document.getElementById('dynamic-modal-body');
	    let modalFooter = document.getElementById('dynamic-modal-footer');

	    modalHeader.innerHTML = `<small class="me-auto text-muted" id="main-modal-title"></small> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;
	    modalBody.style.height = "3500px";

	    modalBody.innerHTML = `
	    <h5>如果侵犯版权 请联系邮箱删除</h5>
	    <p>联系邮箱： moru123@protonmail.com</p>
	    <hr>
	    通过安卓手机下载：
	    <a href="https://sj.qq.com/appdetail/com.yufang.ajt" target="_blank">sj.qq.com/appdetail/com.yufang.ajt</a><br>

	    官方地址：
	    <a href="http://www.ajtmy.com/" target="_blank">http://www.ajtmy.com/</a><br>

	    下载地址：
	    <a href="https://think.ajtmy.com/#/downloadApp" target="_blank">https://think.ajtmy.com/#/downloadApp</a><br>

	    苹果下载：
	    <a href="https://apps.apple.com/cn/app/id1247380390" target="_blank">https://apps.apple.com/cn/app/id1247380390</a><br>

	    安卓下载：
	    <a href="https://stream.ajtjk.net.cn/appapk/ajtapp20221127.apk" target="_blank">https://stream.ajtjk.net.cn/appapk/ajtapp20221127.apk</a><br>
	    <a class="col-md-2 col-6" ><img src="data/qr.jpg" class="img-fluid"></a><hr>

	    	纳贡毕力格、男、蒙古族、1964年5月生，内蒙古国际蒙医医院心身医学科科主任、建科创始人，蒙医主任医师。蒙医临床心理学在读博士、临床心理主任医师(国家二级岗位)、国医大师苏荣扎布教授学术继承人、蒙医心身医学学科奠基人、蒙医心身互动疗法创立人、著作权人，国家临床重点专科、国家民族医重点学科、国家民族医重点专科等国家级建设项目学科带头人和项目负责人。被授予“全国卫生系统先进工作者”、“全国中医药系统创先争优活动先进个人”、“全国中医文化建设工作先进个人”、“内蒙古自治区草原英才”、“内蒙古自治区优秀科技工作者”等荣誉称号。擅长各种心身疾病的蒙医蒙药治疗和催眠暗示心理治疗。 临床实践方面，他在不断学习与实践的同时对自己的经验和医技进行总结创新，创立了一项适合中国人的本土化心理疗法--“心身互动疗法”。应用蒙医蒙药结合互动心理疗法医治了诸如癌症、高血压、冠心病、哮喘、失眠、神经性头疼、牛皮癣、不孕不育症等多种疑难杂症，用“疗效就是硬道理”验证了蒙医蒙药的博大精深。“心身互动疗法”被列入自治区非物质文化保护项目。 科研方面，出版了《蒙医心身互动疗法》、《新概念医学健康教育讲座》、《蒙医心身健康学概论》等9部专著；发行了《世纪健康之歌VCD》、《纳贡毕力格特色疗法-健康讲座DVD》等心理治疗音像作品；他的“试论身心灵全人健康互动心理疗法”、“蒙医学是一门整体观自然医学”、“从与西方医学的差异点上论蒙医学特色和优点”等20多篇论文分别在《国际中医中药杂志》、《中国蒙医药杂志》等国际、国家级医学刊物上发表或在国际学术论坛上演讲，其中《蒙医心身健康学概论》获中国民族医学学会学术著作一等奖；有一项发明获国家专利（专利号：ZL 20082 0055511. 3）。他还主持着“国家标准化项目”和“自治区重大科技攻关项目”的科研任务。 社会影响方面，2013年心身医学科门诊量达21万人次。他经常给困难患者减免医疗费，举办义诊为其募集医药费。十年前他曾资助过10名特困大学生和50名失学女童，而十年以后其中2名--那日苏（留日博士）和白香辉两位受助学生却成了他门下的主力干将。他还帮助锡林郭勒盟蒙医医院、鄂尔多斯市蒙医医院等7家基层医院成立了心身医学科，使每一家医院都呈现出新的发展景象。现加入“心身医学专科建设协作联盟”的8家医院里每天有3000左右人在接受健康教育和心理治疗，获得了良好的社会效益和经济效益。
	    
	    `;
	},
}