// input 功能自适应高度
// id 是 textarea id / idtemp 是隐藏div高度
QBLG.textareaInit = function (id, idtemp){
	let n = 300;
	var textarea = document.getElementById(id)
	var div = document.getElementById(idtemp);

	//div.innerHTML = `<pre><xmp>` + textarea.value + `</xmp></pre>`;
	let temp = textarea.value;

	temp = temp.replaceAll("<", "&lt");
	temp = temp.replaceAll(">", "&gt");

	div.innerHTML = temp + `<div style="height: 1500px;"></div>`;
	div.style = QLGTEXT.format + `background-color: red; visibility: hidden;`;

	if (div.offsetHeight < document.body.clientHeight) {
		textarea.style.height = document.body.clientHeight + div.offsetHeight + n + `px`;
	}else{
		textarea.style.height = div.offsetHeight + n + `px`;
	}
}	