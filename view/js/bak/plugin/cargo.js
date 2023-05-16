var QLGCG_ = {
	json: null,

	///
	down: function (){
		let tableHeader = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>
			<tr><th></th><th>IPhone</th><th>Андройд</th></tr>`;
		let tableFooter = `</tbody></table></div>`;
		let tbody = ``;

		let app = [
		    ["Таобао (淘宝)", "id387682726", "com.taobao.taobao", "taobao.com"],
		    ["PDD (拼多多)", "id1044283059", "com.xunmeng.pinduoduo", "pinduoduo.com"],
		    ["Tmall (天猫)", "id518966501", "com.tmall.wireless", "tmall.com"],
		    ["Жиндонг (京东)", "id414245413", "com.jingdong.app.mall", "jd.com"],
		    ["1688 (阿里巴巴)", "id507097717", "com.xunmeng.pinduoduo", "1688.com"],
		    ["Алипай (支付宝)", "id333206289", "com.eg.android.AlipayGphone", "alipay.com"],
		    ["WeChat (微信)", "id414478124", "com.tencent.mm", "wechat.com"],];

		for (var i = 0; i < app.length; i++) {
			let site = `<a target="_blank" href="http://`+ app[i][3] +`">`+ app[i][0] +`</a>`;	
			let apple = `<a target="_blank" href="http://apps.apple.com/cn/app/`+ app[i][1] +`">татах хаяг</a>`;	
			let android = `<a target="_blank" href="http://play.google.com/store/apps/details?id=`+ app[i][2] +`">татах хаяг</a>`;	
			tbody = tbody + `<tr style="height: 55px; vertical-align: middle;"><th>`+ site +`</th><td>`+ apple +`</td><td>`+ android +`</td></tr>`;
		}

		QBLG.navSub("on" , ""); // QLGCG.navSub("on" , nav);
		QBLG.container(98,  tableHeader + tbody + tableFooter);
	},
	list: function (json){
		let modal = ``;
		let mnphone = ``;
		let group = ``;
		let messenger = ``;
		let fb = ``;
		let width = 50;


		


		QLGCG.json = json;

		let tableHeader = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>
			<tr><th>нэр</th><th>утас</th><th>Mess</th><th>Page</th><th>Group</th></tr>`;
		let tableFooter = `</tbody></table></div>`;
		let tbody = ``;


		for (var i = 0; i < QLGCG.json.length; i++) {

			///手机
			if (QLGCG.json[i]['cg_mn_phone']) {	
				if (QLGCG.json[i]['cg_mn_phone'].includes("`")) {
					let arr = QLGCG.json[i]['cg_mn_phone'].split("`");
					mnphone = arr[0];
				}else{
					mnphone = QLGCG.json[i]['cg_mn_phone'];
				}
						
			}

			///名字
			if (QLGCG.json[i]['cg_name']) {			
				modal = `<a target="_blank" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick='QLGCG.page("`+ i +`")' href="#t" title="`+ QLGCG.json[i]['cg_name'] +` Карго утас `+ mnphone +`">`+ QLGCG.json[i]['cg_name'] +`</a>`;			
			}

			///主页
			if (QLGCG.json[i]['cg_fb_group']) {	
				group = `<a target="_blank" href="https://www.facebook.com/groups/`+ QLGCG.json[i]['cg_fb_group'] +`"><img src="view/icon/1688.png" width="`+ width +`px" class="img-fluid"></a>`;		
			}

			///messages
			if (QLGCG.json[i]['cg_fb_messages']) {
				//信息
				//var messenger = `<div class="row"><a class="img" target="_blank" href="https://www.facebook.com/messages/t/`+ json[i]['cg_fb_messages'] +`"><img src="view/icon/1688.png" width="34px" class="img-fluid"></a></div>`;		
				messenger = `<a  target="_blank" href="https://www.facebook.com/messages/t/`+ QLGCG.json[i]['cg_fb_messages'] +`"><img src="view/icon/1688.png" width="`+ width +`px" class="img-fluid"></a>`;	
				fb = `<a  target="_blank" href="https://facebook.com/`+ QLGCG.json[i]['cg_fb_messages'] +`"><img src="view/icon/1688.png" width="`+ width +`px" class="img-fluid"></a>`;
				// fb = `<a data-bs-toggle="modal" data-bs-target="#dynamic-modal" href="http://qblg.com/" target="dynamic-modal-bodyIfram" onclick='QLGCG.fb("https://baidu.com/")'>
				// <img src="view/icon/1688.png" width="`+ width +`px" class="img-fluid"></a>`;
				//fb = `<a  target="_blank" href="fb://page?id=`+ QLGCG.json[i]['cg_fb_messages'] +`"><img src="view/icon/1688.png" width="`+ width +`px" class="img-fluid"></a>`;
			}


			tbody = tbody + `<tr style="vertical-align: middle;"><td>`+ modal +`</td><td>`+ mnphone +`</td><td>`+ messenger +`</td><td>`+ fb +`</td><td>`+ group +`</td></tr>`;
		}


		let list = tableHeader + tbody + tableFooter;

		QBLG.navSub("on" , ""); // QLGCG.navSub("on" , nav);
		QBLG.container(98,  list);
	},
	///
	fb: function (url){
		QBLG.header = `<a class="me-auto text-muted"><a><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;
		QBLG.footer = ``;
		QBLG.modalx("3500", "text");

		document.getElementById('dynamic-modal-body').style.display = `none`;
		//document.getElementById('dynamic-modal-bodyIfram').src = url;
	},
	///
	page: function (n){
		let headerInfo = ``;
		let utas = ``;
		let addr = ``;
		let hayag = ``;

		let tableHeader = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>`;
		let tableFooter = `</tbody></table></div>`;
		let tbody = ``;

		let phone = ``;
		let email = ``;
		let messenger = ``;
		let FBpage = ``;
		let FBgroup = ``;
		let site = ``;

		///
		if (QLGCG.json[n]['cg_mn_phone']) {
			if (QLGCG.json[n]['cg_mn_phone'].includes("`")) {
				let arr = QLGCG.json[n]['cg_mn_phone'].split("`");
				utas = arr[0];
			}else{
				utas = QLGCG.json[n]['cg_mn_phone'];
			}
		}
		///
		// if (QLGCG.json[n]['cg_default_addr']) {	
		// 	addr = QLGCG.json[n]['cg_name'] +` Карго Тяньжин дахь хүргэлтийн хаяг：<div class="alert alert-secondary" role="alert">收货人：`+ QLGCG.json[n]['cg_addr_name'] +`<br>收货手机：`+ QLGCG.json[n]['cg_addr_phone'] +`<br>收货地址：`+ QLGCG.json[n]['cg_default_addr'] +`</div>`;	
		// }
		if (QLGCG.json[n]['cg_erlian_addr']) {		
			addr = QLGCG.json[n]['cg_name'] +` Карго Эрээн хот дахь хүргэлтийн хаяг：<div class="alert alert-secondary" role="alert">收货人：`+ QLGCG.json[n]['cg_addr_name'] +`<br>收货手机：`+ QLGCG.json[n]['cg_addr_phone'] +`<br>收货地址：`+ QLGCG.json[n]['cg_erlian_addr'] +`</div>`;		
		}
		if (QLGCG.json[n]['cg_tianjin_addr']) {		
			addr = addr + QLGCG.json[n]['cg_name'] +` Карго Тяньжин дахь хүргэлтийн хаяг：<div class="alert alert-secondary" role="alert">收货人：`+ QLGCG.json[n]['cg_addr_name'] +`<br>收货手机：`+ QLGCG.json[n]['cg_addr_phone'] +`<br>收货地址：`+ QLGCG.json[n]['cg_tianjin_addr'] +`</div>`;		
		}
		if (QLGCG.json[n]['cg_huhhot_addr']) {		
			addr = addr + QLGCG.json[n]['cg_name'] +` Карго Хөх хот дахь хүргэлтийн хаяг：<div class="alert alert-secondary" role="alert">收货人：`+ QLGCG.json[n]['cg_addr_name'] +`<br>收货手机：`+ QLGCG.json[n]['cg_addr_phone'] +`<br>收货地址：`+ QLGCG.json[n]['cg_huhhot_addr'] +`</div>`;		
		}


		///
		if (QLGCG.json[n]['cg_mn_phone']) {		
			phone = `<tr style="vertical-align: middle;"><th>утас</th><td>`+ QLGCG.json[n]['cg_mn_phone'] +`</td></tr>`;	}

		if (QLGCG.json[n]['cg_email']) {		
			email = `<tr style="vertical-align: middle;"><th>E-mail</th><td>`+ QLGCG.json[n]['cg_email'] +`</td></tr>`;		}

		if (QLGCG.json[n]['cg_fb_messages']) {		
			messenger = `<tr style="vertical-align: middle;"><th>Mess</th><td><a target="_blank" href="https://www.facebook.com/messages/t/`+ QLGCG.json[n]['cg_fb_messages'] +`">https://www.facebook.com/messages/t/`+ QLGCG.json[n]['cg_fb_messages'] +`</a></td></tr>`;		
			FBpage = `<tr style="vertical-align: middle;"><th>F.B</th><td><a target="_blank" href="https://www.facebook.com/`+ QLGCG.json[n]['cg_fb_messages'] +`">https://www.facebook.com/`+ QLGCG.json[n]['cg_fb_messages'] +`</a></td></tr>`;	}

		if (QLGCG.json[n]['cg_fb_group']) {
			FBgroup = `<tr style="vertical-align: middle;"><th>Group</th><td><a target="_blank" href="https://www.facebook.com/groups/`+ QLGCG.json[n]['cg_fb_group'] +`">https://www.facebook.com/groups/`+ QLGCG.json[n]['cg_fb_group'] +`</a></td></tr>`;
		}

		if (QLGCG.json[n]['cg_site']) {
			site = `<tr style="vertical-align: middle;"><th>Web</th><td><a target="_blank" href="https:/`+ QLGCG.json[n]['cg_site'] +`">https://`+ QLGCG.json[n]['cg_site'] +`</a></td></tr>`;
		}



		tbody = tableHeader + phone + FBpage + messenger + FBgroup + site + email + tableFooter;

		headerInfo = `<a class="me-auto text-muted" target="_blank" href="https://www.facebook.com/profile.php?id=`+ QLGCG.json[n]['cg_fb_messages'] +`">`+ QLGCG.json[n]['cg_name'] +` Карго утас `+ utas +`</a><br>`;
		

		QBLG.header = headerInfo + `<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=""></button>`;
		QBLG.body =  addr + `<hr>` + tbody;
		QBLG.footer = ``;

		QBLG.modalx("3500", "text");
	},



}