QLGSEAR = {
	/// 搜索框的HTML
    HTML: `
    	<div style="margin: 12px;">
			<div class="mb-3">
			    <input type="text" class="form-control"  id="search-input" name="search-input" placeholder="搜索 ..." onkeydown="QLGSEAR.keyEnter()">
			</div>
	
			<div class="btn-group btn-group-sm" role="group" aria-label="Basic checkbox toggle button group" style="padding: 1px; width: 100%;">
				<a onclick="QLGSEAR.close()" class="btn btn-outline-secondary" >Close</a>

				<a onclick="YTINIT.searchSubmit('正')" class="btn btn-outline-secondary" >正体</a>
				<a onclick="YTINIT.searchSubmit('简')" class="btn btn-outline-secondary">简体</a>

				<a onclick="QLGSEAR.submit()" class="btn btn-outline-secondary" >文本</a>
			</div> `,
		
	/// 显示搜框
	box: function (){
		let search = document.getElementById("qblg-search");
		search.style.display = "block";

		document.getElementById('qblg-search').innerHTML = QLGSEAR.HTML; 
		QBLG.divmove('qblg-search');
	},

	/// 提交文本搜索
	submit: function (){
		let key = document.getElementById('search-input'); 
		//console.log(key.value);
		QBLG.connect('GET', 'router.php?s=textList&key=' + key.value, QLGTEXT.list);
	},

	///
	keyEnter: function(){ //回车键运行
		let val = document.getElementById("search-input").value;

		if (val != "" && event.keyCode == 13) {
			QLGSEAR.submit('submit');
		}
	},

	/// 关闭搜索框
	close: function (){
		document.getElementById("qblg-search").style.display = "none";
		//delete QLGSEAR;
	},
}
	