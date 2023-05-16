var QLGTXT = {
	oldText: null,	//最初文本
	converText: null,	//
	textFormat: `
		font: 16px/28px msyh;
      white-space: pre-wrap;           /* css-3 */
            white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
            white-space: -pre-wrap;          /* Opera 4-6 */
            white-space: -o-pre-wrap;        /* Opera 7 */
            word-wrap: break-word;           /* Internet Explorer 5.5+ */ 

	`,


	///
	titList: function (json){
		// if (!json == "") {	json = json;	}
		
		QBLG.textNav = ``;
		let list = ``;

		/// 子导航 ///
		if (json['dir']) {
			for (var i = 0; i < json['dir'].length; i++) {
				let arr = json['dir'][i].split('/');
				QBLG.textNav = QBLG.textNav + `<a href="#" class="subnav px-2" onclick="QBLG.connect('GET', 'router.php?s=textList&path=`+ json['dir'][i] +`', QLGTXT.titList)">`+ arr.pop() +`</a>`;
			}
			QBLG.navSub("on" , QBLG.textNav);
		}

		/// 列表 ///
		if (json['files']) {
			for (var j = 0; j < json['files'].length; j++) {
				if ( json['files'][j].match(".sh") || json['files'][j].match(".conf") || json['files'][j].match(".py")  ) {
					list = `<div onclick='QBLG.connect("GET", "router.php?s=textContent&path=`+ json['files'][j] +`", QLGTXT.page)' data-bs-toggle="modal" data-bs-target="#dynamic-modal" class=" bg tit  col-12 col-md-4"><a href="#t">`+ json['files'][j]  +`</a></div>` + list;

				}
				if ( json['files'][j].match(".html") || json['files'][j].match(".js") || json['files'][j].match(".htm") ) {
					list = `<div onclick='QBLG.connect("GET", "router.php?s=textContent&path=`+ json['files'][j] +`", QLGTXT.page)' data-bs-toggle="modal" data-bs-target="#dynamic-modal" class="tit  col-12 col-md-4"><a href="#t">`+  QBLG.titles(json['files'][j])  +`</a></div>` + list;

				} 
				if ( json['files'][j].match(".pdf") ) {
					list = `<a class="tit bg col-12 col-md-4" target="_blank" href="`+ json['files'][j] +`">`+ json['files'][j] +`</a>` + list; 
				}

				console.log(json['files']);
			}
		}
		list = `<div class="row">` + list + `</div>`
		QBLG.container(92,  list);
	},

	page: function (json){
		if (!json == "") {	QBLG.textJson = json;	}
		QLGTXT.oldText = QBLG.textJson['cont'];
		// console.log(QBLG.textJson);

		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-xl modal-dialog modal-dialog-scrollable");

		/// QLGTXT.HTML(`switch`)
		QBLG.header = QLGTXT.HTML(`switch`) + QLGTEXT.editBtn() + QLGTXT.HTML(`close`); 

	  QBLG.body = QBLG.textJson['cont'] + `<div style="width: 100%; height: 1600px;  opacity: 0;"></div>`;		//内容
	  //QBLG.footer = QBLG.textJson['tit'].substring(1,15) + ` . . .`;
	  QBLG.footer = `<div style="width: 100%; height: 20px; border: 0; padding: 2px; margin: 0;">`+ QBLG.textJson['tit'] +`<div>`;

	  QBLG.modalx("3500", "text");
	  //document.getElementById('modal-footer-iframe').contentWindow.document.body.innerHTML = ``;

	  /// 音频加载
	  let oldFooter = document.getElementById('dynamic-modal-footer').innerHTML;

		if (QBLG.textJson['audio']) {
			// 原生版本
			document.getElementById('dynamic-modal-footer').innerHTML = `<audio id="audioid" crossorigin controls="controls" preload="none"></audio>`;

			//green audio 版本
			// document.getElementById('modal-footer-id').innerHTML = `<div class="ready-player-1" style="width: 100%"><audio id="audioid" crossorigin preload="none"></audio></div>`;
			// new GreenAudioPlayer('.ready-player-1', { showTooltips: false, showDownloadButton: false, enableKeystrokes: false });

			document.getElementById('audioid').src = QBLG.textJson['audio'];
		}else{
			document.getElementById('dynamic-modal-footer').innerHTML = oldFooter;
		}
	
		//QLGTXT.prettyCode();
		Prism.highlightAll();
	},




	////
	editText: function (){

			QBLG.header = `
		    <small class="me-auto text-muted" id="main-modal-title">`+ QBLG.textJson['tit'].substring(1,15) + ` . . .` +`</small> 
		    <a href="#" class="me-auto" onclick="QLGTXT.savePage()" data-bs-dismiss="modal">保存</a>
		    <a href="#" class="me-auto" onclick="QLGTXT.updatePage()">更新</a>
		    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;

			QBLG.body = `
				<form method="post" id="text-form" action="router.php?s=textUpContent" target="modal-footer-iframe" class="form-group">
					<div class="mb-3">
					  <input type="hidden" class="form-control" id="text-path" name="text-path" value="`+ QBLG.textJson['path'] +`">
					  <input type="text" class="form-control" id="text-title" name="text-title"  placeholder="选择" value="`+ QBLG.textJson['tit'] +`" style="background-color: #e8e7e3">
					</div>
					<div class="mb-3">
					  <textarea onkeydown="QLGTXT.textareaTab(this)" class="form-control" id="text-content" name="text-content" style="background-color: #e8e7e3; overflow-y: hidden;">`+ QBLG.textJson['cont'] +`</textarea>
					  <div id="tempDiv"></div>
					</div>
				</form>`;
			QBLG.footer = `<iframe id="modal-footer-iframe" name="modal-footer-iframe" class="me-auto text-muted" frameborder="no" marginwidth="0" marginheight="0" scrolling="yes" style="width: 100%; height: 30px; border: 0; padding: 0; margin: 0;">
	        </iframe>`;

	    //
	    

			QBLG.modalx("3500", "");

			var textarea = document.getElementById('text-content')
	    var div = document.getElementById('tempDiv');


			div.innerHTML = `<pre><xmp>` + textarea.value + `</xmp></pre>`;
			div.style = QLGTXT.textFormat + `background-color: red; visibility: hidden;`;

 
			let n = 300;

			if (div.offsetHeight < document.body.clientHeight) {
				textarea.style.height = document.body.clientHeight + div.offsetHeight + n + `px`;
			}else{
				textarea.style.height = div.offsetHeight + n + `px`;
			}

			

			console.log(divH);

	},


	savePage: function (){
		document.getElementById('text-form').submit();
		//QLGTXT.page();
	},
	updatePage: function (){
		document.getElementById('text-form').submit();
	},



	///美化代码语言
	prettyCode: function (){
	//复制代码语言
		let preOBJ = document.getElementsByTagName('pre');
		for (var i = 0; i < preOBJ.length; i++) { 
			if ( preOBJ[i].getAttribute("class") && preOBJ[i].getAttribute("class").match("prettyprint") ) {
				let copyele = document.createElement('textarea'); //创建textarea元素
				let copybtn = document.createElement('div'); //创建textarea元素
				let copyeleid = "textareaid" + i;	//定义ID名
				let copybtnid = "textareaid" + i;	//定义ID名

					//代碼復制框
					copyele.innerHTML = preOBJ[i].innerHTML;	//代码复制到textarea元素内
					copyele.setAttribute("id", copyeleid);		//设置textarea元素ID
					copyele.style.opacity = 0;		//透明
					copyele.style.height = '1px';
					copyele.style.width = '100%';
					
					//復制按鈕
				 	copybtn.innerText = '复制';
				 	copybtn.style = `
				 		text-align: center;
				 		border-radius: 3px;
				 		cursor: pointer;
				 		background-color: #cac9c9;
				 		width: 100%;
				 	`;
					
					copybtn.setAttribute("onclick", "QLGTXT.copyCode('"+ copyeleid +"',this)");
					
				preOBJ[i].parentNode.insertBefore(copyele, preOBJ[i]);
				preOBJ[i].parentNode.insertBefore(copybtn, preOBJ[i]);
			}
		}
		//加载代码语言
		PR.prettyPrint();
	},

	///复制
	copyCode: function (eleid, obj){
		let copyele = document.getElementById(eleid);
		copyele.select();	//全部选择
		//复制
		if (document.execCommand('copy')) {
			document.execCommand('copy');
		}
		//
		obj.innerHTML = '复制成功';
		setTimeout(function(){ 
			obj.innerHTML = '复制'
		},1000); // 5秒后执行
	},

	///
	conver: function (){
		if (document.getElementById('flexSwitch').checked === false) {
			QLGTXT.converText = QLGTXT.oldText;
		}

		if (document.getElementById('flexSwitch').checked === true) {
			QLGTXT.converText = QLGTXT.oldText;
				for (var i = 0; i < QBLG.hans.length; i++) {
				    let jian = QBLG.hans[i][0];
				    let zheng = QBLG.hans[i][1];

				    QLGTXT.converText =  QLGTXT.converText.replaceAll(jian , zheng);
		  		}
		}

		//document.getElementById('dynamic-modal-body').innerHTML = QLGTXT.converText;
		document.getElementById('dynamic-modal-body').innerHTML = QLGTXT.converText + `<div style="width: 100%; height: 1400px;  opacity: 0;"></div>`;		//内容
		//QLGTXT.prettyCode();
		Prism.highlightAll();
	},
	convers: function (str){
		QLGTXT.converText = str;
		
		for (var i = 0; i < QBLG.hans.length; i++) {
				let jian = QBLG.hans[i][0];
				let zheng = QBLG.hans[i][1];

				QLGTXT.converText =  QLGTXT.converText.replaceAll(jian , zheng);
		}

		//Prism.highlightAll();

		return QLGTXT.converText;
	},
	textareaTab: function(obj){
	    if (event.keyCode == 9)
	    {
	        //obj.value = obj.value + "  "; // 跳几格由你自已决定
	        //event.returnValue = false;
	        event.preventDefault();
	        var indent = '	';
	        var start = obj.selectionStart;
	        var end = obj.selectionEnd;
	        var selected = window.getSelection().toString();
	        selected = indent + selected.replace(/\n/g, '\n' + indent);
	        obj.value = obj.value.substring(0, start) + selected
	                + obj.value.substring(end);
	        obj.setSelectionRange(start + indent.length, start
	                + selected.length);
	    }
	},


	///缩放
	fontSize: function (swit){
		let elm = document.getElementById('dynamic-modal-body');
		let fontSizeNum = parseInt(window.getComputedStyle(elm).fontSize.replaceAll("px",""));
		let fontLineHeight = parseInt(window.getComputedStyle(elm).lineHeight.replaceAll("px",""));

		if (swit === '1') {
			fontSizeNum = fontSizeNum + 1;
			fontLineHeight = fontLineHeight + 1;
		}else if (swit === '-1') {
			fontSizeNum = fontSizeNum - 1;
			fontLineHeight = fontLineHeight - 1;
		}else if (swit === '0') {
			fontSizeNum = 16;
			fontLineHeight = 28;
		}
		
		elm.style.fontSize = fontSizeNum + 'px';
		elm.style.lineHeight = fontLineHeight + 'px';
	},

	///
	tempText: function (json){
		QBLG.header = `
			<small class="me-auto text-muted" id="main-modal-title">2 seconds ago</small>
	        <span class="me-auto text-muted" >
	            <a href="#" onclick="QLGTXT.submitTempText()">保存</a>
	        </span>
	        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;

	  // QBLG.title = json['TEXT_TITLE'];

		QBLG.body = `
			<form method="post" id="text-form" action="router.php?s=textTempUp" target="iframe-mess">
				<textarea onkeydown="QLGTXT.textareaTab(this)" class="form-control" id="main-modal-textarea" name="main-modal-textarea" rows="150" style="margin: 3px; background-color: #e8e7e3">`+ json['t_content'] +`</textarea>
			<form>
				<iframe class="col-12 col-md-12" id="iframe-mess" name="iframe-mess" frameborder="no" marginwidth="0" marginheight="0" scrolling="yes" ></iframe>`;
		QBLG.footer = ``;


		QBLG.modalx("3500", "");
	},



	////// 初始化易经和 导航页面 //////
	eJingTitInit: function (json){
		if (!json == "") {	QBLG.eJingJson = json;	}

		let n = 0;
		QLGTXT.eJingTit = "";

		for (var i = 0; i < QBLG.eJingJson.length; i++) {
			n = i + 1;
			QLGTXT.eJingTit = QLGTXT.eJingTit + `<a class="tit col-md-2 col-6" onclick="QLGTXT.guaMix(`+ QBLG.eJingJson[i]['gua_id'] +`)" data-bs-toggle="modal" data-bs-target="#dynamic-modal" href="#t">`+ QBLG.eJingJson[i]['gua_name']+ ` (`+ n +`)` +`</a>`;
		}
		///
		QBLG.auto();
		//QBLG.connect('POST', 'router.php?s=listDao', QBLG.dao);
	},
	///
	guaMix: function (id){
		QBLG.title = `周易`;
		QBLG.header = QLGTXT.HTML(`switch`) + QLGTXT.HTML(`zoom`) + QLGTXT.HTML(`close`);
		QBLG.footer = ``;

		QBLG.modalx("3500", "");

		let list = "";

			for (var i = 0; i < QBLG.eJingJson.length; i++) {
				if (id === QBLG.eJingJson[i]['gua_id']) {
					list = QLGTXT.guaTable(QBLG.eJingJson[i]['gua_id'] , '本卦') + QLGTXT.guaTable(QBLG.eJingJson[i]['gua_hu'] , '互卦') + QLGTXT.guaTable(QBLG.eJingJson[i]['gua_cuo'] , '错卦') + QLGTXT.guaTable(QBLG.eJingJson[i]['gua_zong'] , '综卦');
				}
			}
		document.getElementById('dynamic-modal-body').innerHTML = list;		//内容

		//简体转翻体
		QLGTXT.oldText = list;
	},
	///
	guaTable: function (id , guas){
		let list = "";
		let tableHeader = `<div style="float: top; float: left; width: 25%;"><div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>`;
		let tableFooter = `</tbody></table></div></div>`;

		for (var i = 0; i < QBLG.eJingJson.length; i++) {
			if (id === QBLG.eJingJson[i]['gua_id']) {

				list = `<div style="float: top; float: left; width: 25%;">
					<tr><td>`+ guas +`</td></tr>
					<tr><td>`+ QLGTXT.guaIMG(QBLG.eJingJson[i]['gua_tu']) +`</td></tr>

					<tr><td><b>`+ QBLG.eJingJson[i]['gua_name'] +`卦(`+ QBLG.eJingJson[i]['gua_id'] +`)</b></td></tr>
					<tr><td><b>`+ QBLG.eJingJson[i]['gua_ci'] +`</b></td></tr>
					<tr><td><b>彖： </b>`+ QBLG.eJingJson[i]['gua_tuan'] +`</td></tr>
					<tr><td><b>象： </b>`+ QBLG.eJingJson[i]['gua_xiang'] +`</td></tr>

					<tr><td><b>六： </b>`+ QBLG.eJingJson[i]['gua_6'] +` 「 `+ QBLG.eJingJson[i]['gua_6_xiang'] +`」</td></tr>
					<tr><td><b>五： </b>`+ QBLG.eJingJson[i]['gua_5'] +` 「 `+ QBLG.eJingJson[i]['gua_5_xiang'] +`」</td></tr>
					<tr><td><b>四： </b>`+ QBLG.eJingJson[i]['gua_4'] +` 「 `+ QBLG.eJingJson[i]['gua_4_xiang'] +`」</td></tr>
					<tr><td><b>三： </b>`+ QBLG.eJingJson[i]['gua_3'] +` 「 `+ QBLG.eJingJson[i]['gua_3_xiang'] +`」</td></tr>
					<tr><td><b>二： </b>`+ QBLG.eJingJson[i]['gua_2'] +` 「 `+ QBLG.eJingJson[i]['gua_2_xiang'] +`」</td></tr>
					<tr><td><b>一： </b>`+ QBLG.eJingJson[i]['gua_1'] +` 「 `+ QBLG.eJingJson[i]['gua_1_xiang'] +`」</td></tr>

					<tr><td><a href="`+ QBLG.eJingJson[i]['gua_url'] +`" target="_blank">链接</a></td></tr>
					<tr><td>`+ QBLG.eJingJson[i]['gua_info'] +`</td></tr>
				</div>`;
			}
		}

		list = tableHeader + list + tableFooter;

		return list;
	},
	///
	guaIMG: function (num){
		let str = num.toString();

		str = str.replaceAll('2','<img src="view/icon/liu.png" width="40%" style="border-top: 8px solid #fff;"><br>');
		str = str.replaceAll('1','<img src="view/icon/jiu.png" width="40%" style="border-top: 8px solid #fff;"><br>');
		
		return str;
	}, 
	

	///
	submitTempText: function (){
		document.getElementById("text-form").submit();
	},

	HTML: function (mode){
		small = `<small class="me-auto text-muted" id="main-modal-title"></small>`;

		switchs = `
			<!-- <div class="form-check form-switch" id="flexSwitchid">
        <input class="form-check-input" onclick="QLGTXT.conver()" type="checkbox" role="switch" id="flexSwitch">
        <label class="form-check-label" for="flexSwitch"></label>
      </div> -->

     	<div class="me-auto text-muted" id="flexSwitchid"><label><input onclick="QLGTXT.conver()" id="flexSwitch" class="mui-switch mui-switch-animbg" type="checkbox"></label></div>`;

    zoom = `
    	<span class="me-auto text-muted" id="main-modal-zoom">
        <a href="#" onclick="QBLG.fontSize('-1')">缩小</a>
        <a href="#" onclick="QBLG.fontSize('0')">默认</a>
        <a href="#" onclick="QBLG.fontSize('1')">放大</a>
      </span>`;

    close = `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;
    

    if (mode == "small") {		return small;	}
    if (mode == "switch") {		return switchs;	}
    if (mode == "zoom") {		return zoom;	}
    if (mode == "close") {		return close;	}
	},

}



/////////////////////////////////// 监视 ///////////////////////////////////
// addEventListener("click", function(){
// 	if ( document.getElementById('dynamic-modal').getAttribute("class") === "modal fade" ) {
// 		document.getElementById('dynamic-modal-footer').innerHTML = ``;
// 	}
// });