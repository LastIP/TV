
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// 文件 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
QBLG.file = function (json){
	if (!json == "") {	QBLG.fileJson = json;	}

	let list = "";
	let bt = "";
	let temp = "";
	let decodeURL = "";

	for (var i = 0; i < QBLG.fileJson.length; i++) {
		decodeURL = decodeURIComponent(QBLG.fileJson[i]);
		bt = decodeURL.split("/").slice(-2)[0];

		if (!temp.match(bt)) {
			temp = temp + bt;
			list = list + `<div class="btit col-12 col-md-12">`+ bt +`</div>` + tit(bt);
		}
	}

	function tit (key){
		let tit = "";
		for (var i = 0; i < QBLG.fileJson.length; i++) {
			let URL = QBLG.fileJson[i];
			let decodeURL = decodeURIComponent(QBLG.fileJson[i]);
			//let title = decodeURL.split("/").pop().split(".").slice(-2)[0];
			let title = decodeURL.split("/").pop();
			//console.log(title);

			if (decodeURL.match(key)) {
				tit = tit + `<a title="`+ title+`" class="tit col-md-2 col-6" target="_blank" download href="`+ URL +`">`+ title +`</a>`;
			}
		}
		return tit;
	}

  list = `<div class="row">` + list + `</div>`;

  QBLG.navSub("" , "");
  QBLG.container(85, list);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// 店铺 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
QBLG.store = function (json){
	if (!json == "") {	QBLG.storeJson = json;	}
	let nav = ``;
	let str = ``;

	/// 子导航
	for (var i = 0; i < QBLG.storeJson['t_nav'].length; i++) {
		//QBLG.storeJson['t_nav'][i] = decodeURIComponent(QBLG.storeJson['t_nav'][i]);     //数组话
		if ( !str.match( QBLG.storeJson['t_nav'][i]['nav_name'] ) ) {
			str = str + QBLG.storeJson['t_nav'][i]['nav_name'];
			nav = nav + `<a class="subnav px-2" onclick="QBLG.storeTit('`+ QBLG.storeJson['t_nav'][i]['nav_name'] +`')" title="分组ID： `+ QBLG.storeJson['t_nav'][i]['nav_url_id'] +`">`+ QBLG.storeJson['t_nav'][i]['nav_name'] +`</a>`; //class="nav-link px-3"
			//console.log(QBLG.storeJson['t_nav'][i]['nav_name']);
		}
	}
	QBLG.navSub("on" , nav);

	///
	QBLG.storeTit = function (nav_name){ 
		let tableHeader = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>
		<tr><th>ID</th><th>公司 (产品)</th><th>链接</th><th>1688 ID</th><th>分组 (公司 ID)</th><th>年限</th><th>状态</th><th>地址</th></tr>`;
		let tableFooter = `</tbody></table></div>`;
		let img = ``;
		let tbody = ``;

	

		///
		for (var i = 0; i < QBLG.storeJson['t_url'].length; i++) {
			//導航欄
			for (var j = 0; j < QBLG.storeJson['t_nav'].length; j++) {
				let color = ``;
				let store = ``;

				if (  !str.match(QBLG.storeJson['t_url'][i]['url_1688']) && QBLG.storeJson['t_url'][i]['url_id'] === QBLG.storeJson['t_nav'][j]['nav_url_id'] && ( nav_name === QBLG.storeJson['t_nav'][j]['nav_name'] || nav_name === "" ) ) {
					//console.log(QBLG.storeJson['t_nav'][j]['nav_name']);
					//圖片模式哦
					str = str + QBLG.storeJson['t_url'][i]['url_1688'];
					img = img + QBLG.imgs(QBLG.storeJson['t_url'][i]['url_id']); 
					//顏色
					if ( QBLG.storeJson['t_url'][i]['url_status'] === "1" ) { color = `style="background-color: #00ff00"`; 	}
					if ( QBLG.storeJson['t_url'][i]['url_status'] === "2" ) { color = `style="background-color: #beffbe"`; 	}
					if ( QBLG.storeJson['t_url'][i]['url_status'] === "5" ) { color = `style="background-color: red"`; 	}
					if ( QBLG.storeJson['t_url'][i]['url_status'] === "null"  || QBLG.storeJson['t_url'][i]['url_status'] === 0 ) { color = ``; 	}
					//編號
					let nav = QBLG.storeJson['t_nav'][j]['nav_name'] + ` (` + QBLG.storeJson['t_nav'][j]['nav_url_id'] + `)`;
					let id = i + 1;
					let url_title = QBLG.storeJson['t_url'][i]['url_title'] + ` (` + QBLG.storeJson['t_url'][i]['url_products'] + `)`;
					let url_1688 = QBLG.storeJson['t_url'][i]['url_1688'];
					let url_id = QBLG.storeJson['t_url'][i]['url_id'];
					let url_loc = QBLG.storeJson['t_url'][i]['url_loc'];
					let url_date = QBLG.storeJson['t_url'][i]['url_date'];
					let url_status = QBLG.storeJson['t_url'][i]['url_status'];

					

					if ( QBLG.storeJson['t_url'][i]['url_1688'] ) {
						store =  `<a target="_blank" id="shop" href="http://` + QBLG.storeJson['t_url'][i]['url_1688'] + `.1688.com/page/offerlist.htm?sortType=tradenumdown" title="` + QBLG.storeJson['t_url'][i]['url_1688'] + `">1688</a> `;
					}
					if ( QBLG.storeJson['t_url'][i]['url_jd'] && QBLG.storeJson['t_url'][i]['url_jd'] != null ) {
						if ( isNaN(QBLG.storeJson['t_url'][i]['url_jd']) ) {
							store =  store + `&nbsp;&nbsp;<a target="_blank" id="shop" href="http://` + QBLG.storeJson['t_url'][i]['url_jd'] + `.jd.com" title="` + QBLG.storeJson['t_url'][i]['url_jd'] + `">京东</a> `;
						}else{
							// console.log(QBLG.storeJson['t_url'][i]['url_jd']);
							store =  store + `&nbsp;&nbsp;<a target="_blank" id="shop" href="https://mall.jd.com/index-` + QBLG.storeJson['t_url'][i]['url_jd'] + `.html" title="` + QBLG.storeJson['t_url'][i]['url_jd'] + `">京东</a> `;
						}
					}
					if ( QBLG.storeJson['t_url'][i]['url_tmall'] ) {
						store =  store + `&nbsp;&nbsp;<a target="_blank" id="shop" href="http://` + QBLG.storeJson['t_url'][i]['url_tmall'] + `.tmall.com/">天猫</a>`;
					}
					if ( QBLG.storeJson['t_url'][i]['url_pdd'] ) {
						store =  store + `&nbsp;&nbsp;<a target="_blank" id="shop" href="https://mobile.yangkeduo.com/mall_page.html?&mall_id=` + QBLG.storeJson['t_url'][i]['url_pdd'] + `">拼多多</a>`;
					}
					if ( QBLG.storeJson['t_url'][i]['url_web'] ) {
						store =   store + `&nbsp;&nbsp;<a target="_blank" id="shop" href="http://` + QBLG.storeJson['t_url'][i]['url_web'] + `" >官方</a> `;
					}
						
					//
					tbody =   tbody + `<tr `+ color +`><td>`+ id +`</td><td>`+ url_title +`</td><td>`+ store +`</td><td>`+ url_1688 +`</td><td>`+ nav +`</td><td>`+ url_date +`</td><td>`+ url_status +`</td><td>`+ url_loc +`</td></tr>` ;
				}
			}
			
		}
		if (img != "") {  img = `<div class="row">`+ img + `</div>`;  }
		QBLG.container(98,  img + tableHeader + tbody + tableFooter);
	}



	///
	QBLG.imgs = function (url_id){ 
		let t_pro = QBLG.storeJson['t_pro'];
		let img = ``;
			for (var k = 0; k < t_pro.length; k++) {
				if ( url_id === t_pro[k]['pro_url_id'] ) {
					let name = t_pro[k]['pro_price'] + `元 | ` + t_pro[k]['pro_name'];
					//img = img + `<a class="img col-md-2 col-6" target="_blank" href="http://`+ t_pro[k]['pro_url'] +`" ><img src="view/imgs/shop0956148a278g4.jpg" width="100%" class="img-fluid"><br>`+ t_pro[k]['pro_name'] +`</a>`; 
					img = img + `<a class="img col-md-2 col-6" target="_blank" href="http://`+ t_pro[k]['pro_url'] +`" title="`+ name +`"><img src="view/imgs/`+ t_pro[k]['pro_img'] +`" width="100%" class="img-fluid"><br>`+ name +`</a>`; 
				}
				
			}
		return img;
	}

	QBLG.storeTit(`手机`);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// 3D模型 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
QBLG.model = function (json){
	if (!json == "") {	QBLG.modelJson = json;	}

	let btit = ``;
	let temp = ``;
	let nav = ``;


	for (var i = 0; i < QBLG.modelJson.length; i++) {
		let btit = decodeURIComponent(QBLG.modelJson[i]).split("/").slice(-2)[0];     //数组话
		if (!temp.match(btit) && btit != "thumbnail" && btit != "bak") {
			temp = temp + btit;
			nav = nav + `<a class="subnav px-2" onclick='QBLG.modelTit("/`+ btit +`/")'>`+ btit +`</a>`;
		}
		
	}
	// QBLG.navSub(nav);
	QBLG.navSub("on" , nav);
	//QBLG.tit('MO')

    QBLG.modelTit = function (key){
    	let list = ``;
    	let name = ``;
 
    	let pic = ``;


		for (var i = 0; i < QBLG.modelJson.length; i++) {
			QBLG.modelJson[i] = QBLG.modelJson[i].replaceAll("'","&apos;"); 
		    QBLG.modelJson[i] = QBLG.modelJson[i].replaceAll('"',"&quot;"); 
		    let arr = decodeURIComponent(QBLG.modelJson[i]).split("/");     //数组话
		    name = arr.pop();
		    

		    if (QBLG.modelJson[i].match(key) && !QBLG.modelJson[i].match(".jpg")) {
		    	//console.log(name);
		    	//pic = `<div class="tit col-12 col-md-6"><a href="`+ QBLG.modelJson[i] +`" download target="_blank" style="color: #e8e7e3; float: top; float: right;">下载</a><a href="#">`+ name.substring(0,118) +`</a></div>` + pic;
		    	//pic = `<a class="tit col-6 col-md-2" href="`+ QBLG.modelJson[i] +`"><img src="`+ QBLG.modelPic(name) +`" width="100%" class="img-fluid"><br>`+ name.substring(0,118) +`</a>` + pic;
		    	pic = `<a class="img col-6 col-md-2" href="`+ QBLG.modelJson[i] +`"><img src="`+ QBLG.modelPic(name) +`" width="100%" class="img-fluid"><br>` + pic;
		    }	  
		}
		list = `<div class="row">` + pic + `</div>`;
		QBLG.container(92 , list);
    }
    ///
    QBLG.modelPic = function (tit){
		let thum = ``;
		tit = tit.split(".").slice(-2)[0]; 
		// console.log(tit);
		// // tit = tit.replaceAll(".zip",""); 
		// // tit = tit.replaceAll(".rar",""); 
		// // tit = tit.replaceAll(".7z",""); 


		for (var i = 0; i < QBLG.modelJson.length; i++) {
			if (QBLG.modelJson[i].match(tit + '.jpg')){
		    	thum = QBLG.modelJson[i];
			}
		}
	  return thum;
	}
	///
	QBLG.modelTit("/配件/")
}
