// input 上使用Tab 键盘
// onkeydown="QBLG.inputTab(this)"
QBLG.textareaTab = function (ele){
	if (event.keyCode == 9){
	        //ele.value = ele.value + "  "; // 跳几格由你自已决定
	        //event.returnValue = false;
	    event.preventDefault();
	    var indent = '	';
	    var start = ele.selectionStart;
	    var end = ele.selectionEnd;
	    var selected = window.getSelection().toString();
	    selected = indent + selected.replace(/\n/g, '\n' + indent);
	    ele.value = ele.value.substring(0, start) + selected + ele.value.substring(end);
	    ele.setSelectionRange(start + indent.length, start + selected.length);
	}	
}	