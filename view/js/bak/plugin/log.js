var LOG = {
	// token: ``,

	/// 登陆框属性设置
	login: function (){
		document.getElementById('dynamic-modal-attri').setAttribute("class", "modal-dialog  modal-dialog-scrollable"); // modal-dialog modal-dialog-centered
		document.getElementById('dynamic-modal-header').innerHTML = HTML.small + HTML.close; 
		document.getElementById('dynamic-modal-body').innerHTML = LOG.form; 
		document.getElementById('dynamic-modal-body').style = ``;
		document.getElementById('dynamic-modal-footer').innerHTML = HTML.iframe; 
		

		//if (window.location.host.includes(QBLG.webURLA)) {	
			turnstile.render('#login-form', {
		        sitekey: '0x4AAAAAAAA2TMAPVu8pp7nN',
		        callback: function(token) {
		            //console.log(`Challenge Success ${token}`); 
		        },
		    });
		//}
		
		
	},

	/// 提交登陆表单
	submit: function (){
		document.getElementById('login-form').submit();
	//	window.location.reload();	//刷新页面
		setTimeout(function(){ 
			window.location.reload();	//刷新页面
		},3000); 

	},
 
	/// 验证
	verify: function (n){
		LOG.status = n;
		console.log(LOG.status);

		// if (LOG.status == 1) {
		// 	window.location.reload();	//刷新页面
		// 	return;
		// }

		//QBLG.connect('GET', 'router.php?s=listDao', QBLG.dao);
		// QBLG.initEjing();
		QBLG.auto();
	},

	forms: function (){
		// let cf = ``;

		// if (!window.location.host.includes(QBLG.webURLA)) {		
		// 		cf = `<div class="mb-3">
		// 	  	<div class="cf-turnstile" data-sitekey="0x4AAAAAAAA2TMAPVu8pp7nN"></div> 
		// 	  	<input type="hidden" id="cf-turnstile-response">
		// 	</div>`;	
		// 	}else{
		// 		cf = ``;
		// 	}

		form = `
	    <form style="margin: 6px;" target="ifr" action="router.php?s=QLLogin" id="login-form" method="POST">
			<div class="mb-3">
			    <label for="exampleInputEmail1" class="form-label">Email address</label>
			    <input type="text" class="form-control"  id="user" name="user" aria-describedby="emailHelp">
			</div>


			<div class="mb-3">
			    <label for="exampleInputPassword1" class="form-label">Password</label>
			    <input type="password" class="form-control" id="pass" name="pass">
			</div>


			<button type="text" class="btn btn-primary" onclick="LOG.submit()">搜索</button> </form>`;

		return form;
	},


	/// 登陆表单html
	form: `
	    <form style="margin: 6px;" target="ifr" action="router.php?s=QLLogin" id="login-form" method="POST">
			<div class="mb-3">
			    <label for="exampleInputEmail1" class="form-label">Email address</label>
			    <input type="text" class="form-control"  id="user" name="user" aria-describedby="emailHelp">
			</div>


			<div class="mb-3">
			    <label for="exampleInputPassword1" class="form-label">Password</label>
			    <input type="password" class="form-control" id="pass" name="pass">
			</div>


			<button type="text" class="btn btn-primary" onclick="LOG.submit()">搜索</button>


			<div class="mb-3">
			  	<div class="cf-turnstile" data-sitekey="0x4AAAAAAAA2TMAPVu8pp7nN"></div> 
			  	<input type="hidden" id="cf-turnstile-response">
			</div>
		</form>`,
}