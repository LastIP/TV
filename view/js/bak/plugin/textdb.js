var QLGTEXT = {
	contentJson: ``,
	navDefault: `lkf`,
	format: `
		font: 16px/28px msyh;
      	white-space: pre-wrap;           /* css-3 */
            white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
            white-space: -pre-wrap;          /* Opera 4-6 */
            white-space: -o-pre-wrap;        /* Opera 7 */
            word-wrap: break-word;           /* Internet Explorer 5.5+ */ `,


	list: function (json){
		QLGTEXT.json = json;
		console.log(QLGTEXT.json);

		QLGTEXT.nav = ``;
		QLGTEXT.navs("");
		QLGTEXT.nav =  `<a class="subnav px-2" onclick="QBLG.sort('text', 'text_id')">ID</a>
		 				<a class="subnav px-2" onclick="QBLG.sort('text', 'text_date_int')">时</a>
						<a class="subnav px-2" onclick="QBLG.sort('text', 'text_count')">看</a>
						<a class="subnav px-2" id="text-nav"> ⬆ </a>` + QLGTEXT.nav;

		QLGTEXT.navs(QLGTEXT.navDefault);

		// if (QLGTEXT.navDefault == "") {
		// 	QLGTEXT.navs("lkf");
		// }else{
		// 	QLGTEXT.navs(QLGTEXT.navDefault);
		// }

		// if (QLGTEXT.navDefault != "") {
		// 	QLGTEXT.navs(QLGTEXT.navDefault);
		// 	return;
		// }else{
		// 	QLGTEXT.navs("lang");
		// } 
	},

	navs: function (str){
		let temp = ``;
		let nav = ``;
		let list = ``;
		
		
		for (var i = 0; i < QLGTEXT.json.length; i++) {
			let grp = QLGTEXT.json[i]['text_group'];
			let date = QLGTEXT.json[i]['text_date'];
			date = `<span style="font: bold arial,sans-serif; color: #838383;">[`+ date.substring(0,4) +`] </span>`;
			if (str == "" && grp != 0) {
				if (!temp.includes(grp)) {
					temp = temp + grp;
					QLGTEXT.nav = QLGTEXT.nav + `<a class="subnav px-2" onclick="QLGTEXT.navs('`+ QLGTEXT.json[i]['text_group'] +`')">`+ QLGTEXT.json[i]['text_group'] +`</a>`;
					//list = list + `<a id="del`+ QLGTEXT.json[i]['text_id'] +`" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="QBLG.connect('GET', 'router.php?s=textContents&Id=`+ QLGTEXT.json[i]['text_id'] +`', QLGTEXT.page)" href="#t" class="tit col-12 col-md-4" >`+ QLGTEXT.json[i]['text_title'] +`</a>`;
				}
				
			}else{
				if (str == grp) {
					QLGTEXT.navDefault = str;
					if (QLGTEXT.json[i]['text_status'] == "1") {
						list = list + `<a style="background-color: #e8e7e3;" id="del`+ QLGTEXT.json[i]['text_id'] +`" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="QBLG.connect('GET', 'router.php?s=textContent&Id=`+ QLGTEXT.json[i]['text_id'] +`', QLGTEXT.page)" href="#t" class="tit col-12 col-md-4" >`+ date + QLGTEXT.json[i]['text_title'] +`</a>`;
					}else{
						list = list + `<a style="background-color: #c8c8c8;" id="del`+ QLGTEXT.json[i]['text_id'] +`" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="QBLG.connect('GET', 'router.php?s=textContent&Id=`+ QLGTEXT.json[i]['text_id'] +`', QLGTEXT.page)" href="#t" class="tit col-12 col-md-4" >`+ date + QLGTEXT.json[i]['text_title'] +`</a>`;
					}
				}
			}
		}

		

		list = `<div class="row">` + list + `</div>`;
		QBLG.navSub("on", QLGTEXT.nav);
		//QLGTEXT.nav = ``;
		QBLG.container(92,  list);
	},


	page: function (json){
		// 初始化
		QLGTEXT.contentJson = json;
		QBLG.oldText = QLGTEXT.contentJson['text_content'];

		// console.log(json);

		// header
		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-xl modal-dialog modal-dialog-scrollable");
		QBLG.header = HTML.switchs + QLGTEXT.deleteBtn() + QLGTEXT.editBtn() + HTML.close; 

		// body
		//QBLG.body = QLGTEXT.contentJson['text_content'] + QLGTEXT.HTML('commentForm') + QLGTEXT.comments();
		QBLG.body = QLGTEXT.contentJson['text_content'] + QLGTEXT.HTML('commentForm') + `<div id="qblg-modal-comments"></div>`;

		//QBLG.body = "sadsad";

		// footer
		tit = QLGTEXT.contentJson['text_title'];
		dates = QLGTEXT.contentJson['text_date'];
		mdates = QLGTEXT.contentJson['text_modi_date'];
		if (QLGTEXT.contentJson['text_src'] == "") {
		//if (QLGTEXT.contentJson['text_src'] == null || QLGTEXT.contentJson['text_src'] == "null" || QLGTEXT.contentJson['text_src'] == "") {
			url = tit;
		}else{
			url = `<a target="_blank" href="`+ QLGTEXT.contentJson['text_src'] +`">`+ tit.substring(0, 13) +` . . .</a>`;
		}
		QBLG.footer = HTML.iframe;

		 
		//正体
		QBLG.modalx("3500", "text");
		document.getElementById("ifr").contentWindow.document.body.innerHTML = `<div style="width: 100%; text-align: center;">` + url + ` | ` + dates.substring(2, 11) + ` | ` + mdates.substring(2, 11) + `</div>`;
		QLGTEXT.comments();

		///
		QLGTEXT.encode(); 
		QBLG.conver();

		/// 统计出错了
		//QBLG.connect('GET', 'router.php?s=textCount&Id=' + QLGTEXT.contentJson['text_id'], QBLG.null);
	},
	comments: function (){
		let str = ``;

		if (QLGTEXT.contentJson['text_comments'] != null) {

			for (var i = 0; i < QLGTEXT.contentJson['text_comments'].length; i++) {
				str = str + `<button style="padding: 6px; margin: 7px; text-align: left;" type="button" class="btn btn-success">`+ QLGTEXT.contentJson['text_comments'][i]['comment_post'] +`</button><br>`;
			}

			document.getElementById("qblg-modal-comments").innerHTML = `<div id="qblg-modal-comments">` + str + `</div>`;
		}
	},

	
	commentSubmit: function (){
		document.getElementById('comment-form').submit();

		//console.log(QLGTEXT.contentJson);

		setTimeout(function(){ 
			QBLG.connect('GET', 'router.php?s=textContent&Id=' + QLGTEXT.contentJson['text_id'], QLGTEXT.commentRes);  // `+ QLGTEXT.contentJson['text_id'] +`
			document.getElementById("comment-input").value = ``;
		},1000);
	},

	commentRes: function (json){
		QLGTEXT.contentJson = json;
		QLGTEXT.comments();
		
	},


	encode: function (){
		/// 代码高亮初始化
		let qblgCode = document.getElementsByTagName('qblg-code');
		for (var i = 0; i < qblgCode.length; i++) {
			let str = qblgCode[i].innerHTML;
			let id = `copyCode` + i;
			str = str.replaceAll("<", "&lt");
			str = str.replaceAll(">", "&gt");
			str = `<button style="width: 100%;" class="btn btn-dark btn-sm" data-clipboard-action="copy" data-clipboard-target="#`+ id +`">复制</button><pre><code id="`+ id +`">` + str + `</code></pre>`;
			qblgCode[i].innerHTML = str;
		}
		// 超链接初始化
		let qblgHref = document.getElementsByTagName('qblg-href');
		for (var i = 0; i < qblgHref.length; i++) {
			let str = qblgHref[i].innerHTML;
			str = `<a href="`+ str +`" target="_blank">`+ str +`</a>`;
			qblgHref[i].innerHTML = str;
		}

		//
		let qblgImg = document.getElementsByTagName('qblg-img');
		for (var i = 0; i < qblgImg.length; i++) {
			let str = qblgImg[i].innerHTML;
			str = `<img src="DATA/text/textimgs/`+ str +`" class="rounded mx-auto d-block img-thumbnail" alt="...">`;
			qblgImg[i].innerHTML = str;
		}

		// 代码
		hljs.highlightAll();	//代码高亮
		// QBLG.conver();		//转正体
		// 复制
		var clipboard = new ClipboardJS('.btn');
	    clipboard.on('success', function(e) {
	        console.log(e);
	    });
	    clipboard.on('error', function(e) {
	        console.log(e);
	    });

	},

	edit: function (json){
		if (json != "") {	QLGTEXT.contentJson = json;	}
		//console.log(QLGTEXT.contentJson);

		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-xl modal-dialog modal-dialog-scrollable");
		//
		// document.getElementById('dynamic-modal').setAttribute("data-bs-backdrop", "static");
		//document.getElementById('dynamic-modal').setAttribute("data-bs-keyboard", "false");

		document.getElementById('dynamic-modal-header').innerHTML = HTML.switchs + QLGTEXT.deleteBtn() + `<a class="me-auto" href="#t" onclick="QLGTEXT.save()">保存</a>` + HTML.close; 
		document.getElementById('flexSwitch').onclick = QLGTEXT.change;
		//document.getElementById('flexSwitch').onclick = function(){alert("hello"); };
		
		if (QLGTEXT.contentJson['text_status'] == 1) {
			document.getElementById('flexSwitch').checked = true;
		}
		if (QLGTEXT.contentJson['text_status'] == 0) {
			document.getElementById('flexSwitch').checked = false;
		}


		
		document.getElementById('dynamic-modal-body').innerHTML = QLGTEXT.HTML('editForm'); 
		document.getElementById('dynamic-modal-body').style = ``;
		document.getElementById('dynamic-modal-footer').innerHTML = HTML.iframe;

		QBLG.textareaInit("text-content", "text-content-div");
	},
	change: function (){
		//console.log("asd");
		//let val = document.getElementById('text-status').value;
		if (document.getElementById('flexSwitch').checked === true) {
			document.getElementById('text-status').value= 1;
		}else{
			document.getElementById('text-status').value= 0;
		}

	},
	save: function (){
		document.getElementById('text-form').submit();

		setTimeout(function(){ 
			QBLG.connect('GET', 'router.php?s=textList', QLGTEXT.list);
		},2000);
		
	},

	/// 删除
	delete: function (){
		let confirm = window.confirm(`[ `+ QLGTEXT.contentJson['text_title'] +` ]` + ` 删除吗`);
		if (confirm) {
			let id = QLGTEXT.contentJson['text_id'];
			
			for (var i = 0; i < QLGTEXT.json.length; i++) {
				if (QLGTEXT.json[i]['text_id'] == id) {
					//删除列表
					let ele = document.getElementById("del" + QLGTEXT.json[i]['text_id']);
					ele.parentNode.removeChild(ele);
					///
					// document.getElementById('dynamic-modal').setAttribute("class", "modal fade");
					var dynamicModal = document.getElementById('dynamic-modal')
					var modal = bootstrap.Modal.getInstance(dynamicModal) // Returns a Bootstrap modal instance
					modal.hide()
					//删除服务器
					//QBLG.connect('GET', 'router.php?s=textDelete&Id=' + QLGTEXT.json[i]['text_id'], QBLG.null);
					QBLG.connect('GET', 'router.php?s=textDelete&GUId=' + QLGTEXT.json[i]['text_guid'], QBLG.null);
					//
					setTimeout(function(){ 
						QBLG.connect('GET', 'router.php?s=textList', QLGTEXT.list);
					},1500);
				}
			}
		}
	},


	HTML: function (mode){
		//QLGTEXT.contentJson['text_date'] = QLGTEXT.contentJson['text_date'].substring(0, 10) + ` ` + `12:35:35`;
		// if (QLGTEXT.contentJson['text_src'] == null) {
		// 	QLGTEXT.contentJson['text_src'] = "";
		// }

		commentForm = `<hr><form method="post" id="comment-form" action="router.php?s=textCommentInsert" target="ifr" class="input-group">
					<input type="hidden" class="form-control" id="text-guid" name="text-guid" aria-label="ID ..." value="`+ QLGTEXT.contentJson['text_guid'] +`">
				  <textarea id="comment-input" name="comment-input" class="form-control" aria-label="With textarea" style="background-color: #e8e7e3;"></textarea>
				  <button class="input-group-text" onclick="QLGTEXT.commentSubmit()">留言</button></form>`;


		editForm = `<form method="post" id="text-form" action="router.php?s=textEdit" target="ifr" class="form-group"> <!-- modal-footer-iframe -->

					<div class="input-group mb-3">
						<!--	<span class="input-group-text">ID</span> -->
					  <input type="hidden" class="form-control" id="text-guid" name="text-guid" aria-label="ID ..." value="`+ QLGTEXT.contentJson['text_guid'] +`">

					  	

					  	<span class="input-group-text">名</span>
					  <input type="text" class="form-control" id="text-title" name="text-title" aria-label="title ..." value="`+ QLGTEXT.contentJson['text_title'] +`" style="background-color: #e8e7e3;">

					  <span class="input-group-text">组</span>
					  <input type="text" class="form-control" id="text-group" name="text-group" aria-label="Group ..." value="`+ QLGTEXT.contentJson['text_group'] +`" style="background-color: #e8e7e3;">

					  	<!-- <span class="input-group-text">状</span> -->
					  <input type="hidden" class="form-control" id="text-status" name="text-status" aria-label="Group ..." value="`+ QLGTEXT.contentJson['text_status'] +`" style="background-color: #e8e7e3;">
					</div>


					<div class="input-group mb-3">
					  	<span class="input-group-text">時</span>
					  		<input type="text" class="form-control" id="text-date" name="text-date" aria-label="Group ..." value="`+ QLGTEXT.contentJson['text_date'] +`" style="background-color: #e8e7e3;">
					  	<span class="input-group-text">源</span>
					  		<input type="text" class="form-control" id="text-src" name="text-src" aria-label="Group ..." value="`+ QLGTEXT.contentJson['text_src'] +`" style="background-color: #e8e7e3;">
					  	 
					</div>




					<!--	<div class="mb-3">
					  <input type="text" class="form-control" id="text-id" name="text-id" value="">
					  <input type="text" class="form-control" id="text-id" name="text-id" value="">
					  <input type="text" class="form-control" id="text-title" name="text-title" placeholder="选择" value="" style="background-color: #e8e7e3">
					</div> -->

					<div class="mb-3">
					  <textarea  onkeydown="QBLG.textareaTab(this)" class="form-control" id="text-content" name="text-content" style="background-color: #e8e7e3; overflow-y: hidden;">`+ QLGTEXT.contentJson['text_content'] +`</textarea>
					  <div id="text-content-div" style=""></div>  

					 <!--  contenteditable="true"
					 <textarea onkeydown="QBLG.textareaTab(this)" class="form-control" id="text-contents" name="text-contents" style="background-color: #e8e7e3; overflow-y: hidden;"></textarea> -->
					    
					</div>
				</form>`;

		if (mode == "commentForm") {	return commentForm;	}
		if (mode == "editForm") {	return editForm;	}

		
	},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

	fileList: function (json){
		QBLG.textNav = ``;
		let list = ``;

		/// 子导航 ///
		if (json['dir']) {
			for (var i = 0; i < json['dir'].length; i++) {
				let arr = json['dir'][i].split('/');
				QBLG.textNav = QBLG.textNav + `<a href="#" class="subnav px-2" onclick="QBLG.connect('GET', 'router.php?s=textFileList&path=`+ json['dir'][i] +`', QLGTEXT.fileList)">`+ arr.pop() +`</a>`;
			}
			QBLG.navSub("on" , QBLG.textNav);
		}

		/// 列表 ///
		if (json['files']) {
			for (var j = 0; j < json['files'].length; j++) {
				if ( json['files'][j].match(".sh") || json['files'][j].match(".conf") || json['files'][j].match(".py")  ) {
					list = `<div onclick='QBLG.connect("GET", "router.php?s=textFileContent&path=`+ json['files'][j] +`", QLGTEXT.filePage)' data-bs-toggle="modal" data-bs-target="#dynamic-modal" class=" bg tit  col-12 col-md-4"><a href="#t">`+ json['files'][j]  +`</a></div>` + list;

				}
				if ( json['files'][j].match(".html") || json['files'][j].match(".js") || json['files'][j].match(".htm") ) {
					list = `<div onclick='QBLG.connect("GET", "router.php?s=textFileContent&path=`+ json['files'][j] +`", QLGTEXT.filePage)' data-bs-toggle="modal" data-bs-target="#dynamic-modal" class="tit  col-12 col-md-4"><a href="#t">`+  QBLG.titles(json['files'][j])  +`</a></div>` + list;

				} 
				if ( json['files'][j].match(".pdf") ) {
					list = `<a class="tit bg col-12 col-md-4" target="_blank" href="`+ json['files'][j] +`">`+ json['files'][j] +`</a>` + list; 
				}

				//console.log(json['files']);
			}
		}
		list = `<div class="row">` + list + `</div>`
		QBLG.container(92,  list);
	},

	filePage: function (json){
		if (!json == "") {	QBLG.fileJson = json;	}
		QBLG.oldText = QBLG.fileJson['cont'];
		// console.log(QBLG.textJson);

		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-xl modal-dialog modal-dialog-scrollable");

		/// QLGTXT.HTML(`switch`)
		QBLG.header = HTML.switchs + QLGTEXT.editBtn() + HTML.close; 

	  QBLG.body = QBLG.fileJson['cont'] + `<div style="width: 100%; height: 1600px;  opacity: 0;"></div>`;		//内容
	  //QBLG.footer = QBLG.textJson['tit'].substring(1,15) + ` . . .`;
	  QBLG.footer = `<div style="width: 100%; height: 20px; border: 0; padding: 2px; margin: 0;">`+ QBLG.fileJson['tit'] +`<div>`;

	  QBLG.modalx("3500", "text");
	  //document.getElementById('modal-footer-iframe').contentWindow.document.body.innerHTML = ``;

	  /// 音频加载
	  let oldFooter = document.getElementById('dynamic-modal-footer').innerHTML;

		if (QBLG.fileJson['audio']) {
			// 原生版本
			document.getElementById('dynamic-modal-footer').innerHTML = `<audio id="audioid" crossorigin controls="controls" preload="none"></audio>`;

			//green audio 版本
			// document.getElementById('modal-footer-id').innerHTML = `<div class="ready-player-1" style="width: 100%"><audio id="audioid" crossorigin preload="none"></audio></div>`;
			// new GreenAudioPlayer('.ready-player-1', { showTooltips: false, showDownloadButton: false, enableKeystrokes: false });

			document.getElementById('audioid').src = QBLG.fileJson['audio'];
		}else{
			document.getElementById('dynamic-modal-footer').innerHTML = oldFooter;
		}
	
		//QLGTXT.prettyCode();
		Prism.highlightAll();
	},


	/// 文本编辑按钮
	editBtn: function (){
		if (LOG.status == 1) {
			html = `<a class="me-auto" href="#t" onclick="QLGTEXT.edit('')">编辑</a>`;
		}else{
			html = `<a class="me-auto" href="#t" ></a>`;
		}

		return html;
	},

	deleteBtn: function (){
		if (LOG.status == 1) {
			html = `<a class="me-auto" href="#t" onclick="QLGTEXT.delete('')">删除</a>`;
		}else{
			html = `<a class="me-auto" href="#t" ></a>`;
		}

		return html;
	},

	
}
	