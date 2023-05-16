var EJING = {


	////// 初始化易经和 导航页面 //////
	init: function (json){
		let n = 0;
		EJING.tit = "";

		if (!json == "") {	EJING.json = json;	}

		for (var i = 0; i < EJING.json.length; i++) {
			n = i + 1;
			EJING.tit = EJING.tit + `<a class="tit col-md-2 col-6" onclick="EJING.mix(`+ EJING.json[i]['gua_id'] +`)" data-bs-toggle="modal" data-bs-target="#dynamic-modal" href="#t">`+ EJING.json[i]['gua_name']+ ` (`+ n +`)` +`</a>`;
		}

		//console.log(json);
	},
	///
	mix: function (id){
		//QBLG.title = `周易`;
		QBLG.header = HTML.switchs + HTML.close;
		QBLG.footer = ``;

		QBLG.modalx("3500", "");

		let list = "";

			for (var i = 0; i < EJING.json.length; i++) {
				if (id === EJING.json[i]['gua_id']) {
					list = EJING.guaTable(EJING.json[i]['gua_id'] , '本卦') + EJING.guaTable(EJING.json[i]['gua_hu'] , '互卦') + EJING.guaTable(EJING.json[i]['gua_cuo'] , '错卦') + EJING.guaTable(EJING.json[i]['gua_zong'] , '综卦');
				}
			}
		document.getElementById('dynamic-modal-body').innerHTML = list;		//内容

		//简体转翻体预备
		QBLG.oldText = list;
	},

	///
	guaTable: function (id , guas){
		let list = "";
		let tableHeader = `<div style="float: top; float: left; width: 25%;"><div class="table-responsive"><table class="table table-bordered table-striped table-hover border-default"><tbody>`;
		let tableFooter = `</tbody></table></div></div>`;

		for (var i = 0; i < EJING.json.length; i++) {
			if (id === EJING.json[i]['gua_id']) {

				list = `<div style="float: top; float: left; width: 25%;">
					<tr><td>`+ guas +`</td></tr>
					<tr><td>`+ EJING.img(EJING.json[i]['gua_tu']) +`</td></tr>

					<tr><td><b>`+ EJING.json[i]['gua_name'] +`卦(`+ EJING.json[i]['gua_id'] +`)</b></td></tr>
					<tr><td><b>`+ EJING.json[i]['gua_ci'] +`</b></td></tr>
					<tr><td><b>彖： </b>`+ EJING.json[i]['gua_tuan'] +`</td></tr>
					<tr><td><b>象： </b>`+ EJING.json[i]['gua_xiang'] +`</td></tr>

					<tr><td><b>六： </b>`+ EJING.json[i]['gua_6'] +` 「 `+ EJING.json[i]['gua_6_xiang'] +`」</td></tr>
					<tr><td><b>五： </b>`+ EJING.json[i]['gua_5'] +` 「 `+ EJING.json[i]['gua_5_xiang'] +`」</td></tr>
					<tr><td><b>四： </b>`+ EJING.json[i]['gua_4'] +` 「 `+ EJING.json[i]['gua_4_xiang'] +`」</td></tr>
					<tr><td><b>三： </b>`+ EJING.json[i]['gua_3'] +` 「 `+ EJING.json[i]['gua_3_xiang'] +`」</td></tr>
					<tr><td><b>二： </b>`+ EJING.json[i]['gua_2'] +` 「 `+ EJING.json[i]['gua_2_xiang'] +`」</td></tr>
					<tr><td><b>一： </b>`+ EJING.json[i]['gua_1'] +` 「 `+ EJING.json[i]['gua_1_xiang'] +`」</td></tr>

					<tr><td><a href="`+ EJING.json[i]['gua_url'] +`" target="_blank">链接</a></td></tr>
					<tr><td>`+ EJING.json[i]['gua_info'] +`</td></tr>
				</div>`;
			}
		}

		list = tableHeader + list + tableFooter;

		return list;
	},

	///
	img: function (num){
		let str = num.toString();

		str = str.replaceAll('2','<img src="view/icon/liu.png" width="40%" style="border-top: 8px solid #fff;"><br>');
		str = str.replaceAll('1','<img src="view/icon/jiu.png" width="40%" style="border-top: 8px solid #fff;"><br>');
		
		return str;
	}, 

}
