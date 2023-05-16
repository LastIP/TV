QBLGCFS = {

	list: function (){
		if (QBLG.CFSVideosJson == "") {
			QBLG.connect('GET', 'model/router.php?s=cfstreamList', QBLGCFS.init);
		}

		QBLGCFS.key = QBLGCFS.key == 1 ? QBLGCFS.key = 2 : QBLGCFS.key = 1;

		if (QBLGCFS.key == 1) {
			QBLGCFS.videos();

		}else {
			QBLGCFS.videoTable();
		}

	},

	init: function (json){
		QBLG.CFSVideosJson = json;
	},

	videos: function (){
		let VName = ``;
		let VId = ``;
		let Vdate = ``;
		let VImg = ``;
		let list = ``;

		for (var i = 0; i < QBLG.CFSVideosJson.length; i++) {
			VName = QBLG.CFSVideosJson[i]['VName'];
			SVId = QBLG.CFSVideosJson[i]['SVId'];
			Vdate = QBLG.CFSVideosJson[i]['Vdate'];
				
			if (isNaN(QBLG.CFSVideosJson[i]['VId'])) {
				VImg = `https://customer-c10uwhnvsvyvjdu0.cloudflarestream.com/`+ SVId +`/thumbnails/thumbnail.jpg?time=6s&width=320&height=180&fit=crop`;
				list = list + `<a onclick="QBLGPLA.video('stream','`+ SVId +`','cid')" id="qblg-span" class="col-md-2 col-6" title="`+ VName +`"><img src="`+ VImg +`" class="img-fluid"><h1 id="qblg-img-h1">cname</h1><br>`+ VName +`</a>`;	
			}else{
				//console.log(QBLG.CFSVideosJson[i]['VId']);
				list = list + `<a onclick="QBLGPLA.video('xvi','`+ VId +`','cid')" id="qblg-span" class="col-md-2 col-6" title="`+ VName +`"><img src="`+ VImg +`" class="img-fluid"><h1 id="qblg-img-h1">cname</h1><br>`+ VName +`</a>`;
			}
			
		}
		list = `<div class="row">` + list + `</div>`;

		QBLG.navSub("on" , "");
		QBLG.container(92, list);
	},

	videoTable: function (){
		let list = ``;
		let tableHeader = `<div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>
			<tr><th>名字</th><th>时间</th><th>操作</th></tr>`;
		let tbody = ``;
		let tableFooter = `</tbody></table></div>`;

		for (var i = 0; i < QBLG.CFSVideosJson.length; i++) {
			let dId = `d` + i;
			QBLGCFS.VName = QBLG.CFSVideosJson[i]['VName'];
			let SVId = QBLG.CFSVideosJson[i]['SVId'];
			let VId = QBLG.CFSVideosJson[i]['VId'];
			let Vdate = QBLG.CFSVideosJson[i]['Vdate'];
			let pla = ``;

			if (isNaN(QBLG.CFSVideosJson[i]['VId'])) {
				pla = `<a href="#t" onclick="QBLGPLA.video('stream','`+ SVId +`','cid')" title="`+ QBLGCFS.VName +`">`+ QBLGCFS.VName +`</a>`;
			}else{
				console.log(QBLG.CFSVideosJson[i]['VId']);
			 	pla = `<a href="#t" onclick="QBLGPLA.video('xvi','`+ VId +`','cid')" title="`+ QBLGCFS.VName +`">`+ QBLGCFS.VName +`</a>`;
			}
			
			let del = `<td style="text-align: center;"><a type="button" class="btn-close" onclick="QBLGCFS.videoTableDel('`+ VId +`','`+ dId +`')"></a></td>`;


			tbody =   tbody + `<tr id="`+ dId +`"><td>`+ pla +`</td><td>`+ QBLG.CFSVideosJson[i]['Vdate'] +`</td>`+ del + `</tr>`;
		}

		list = tableHeader + tbody + tableFooter;
			

		QBLG.navSub("on" , "");
		QBLG.container(98,  list);	
	},

	videoTableDel: function (UId, DId){
		let dom = document.getElementById(DId);

		if (window.confirm("[ " + QBLGCFS.VName + " ]  删除吗 !?")) {
			dom.parentNode.removeChild(dom);
			QBLG.connect('GET', 'model/router.php?s=cfstreamDel&UId=' + UId, QBLGCFS.videoTableDelMess);
		}
	},

	videoTableDelMess: function (json){
			console.log(json);
	},



}


 

