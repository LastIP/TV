var MGLEM = {}; 
var QBLG = {}; 
var QBLGPLA = {};
var QBLGCFS = {};

// QBLGCFS.key = 1;

// QBLG.webURLA = `qblg.com`;
// QBLG.webURLA = `qblg.cc`;
// QBLG.webURLB = `tuuh.cc`;

// QBLG.pai = "down";

// QBLG.eJingJson = null;
// QBLG.daoJson = null;
// QBLG.fileJson = null;
//QBLG.mediaJson = null;
// QBLG.YTVideosJson = null;
// QBLG.YTVideosUpJson = null;
// QBLG.storeJson = null;

// QBLG.textJson = null;
// QBLG.textTempJson = null;


// QBLG.modelJson = null;

// QBLG.videoPlayerObj = null;
// QBLG.audioPlayerObj = null; //QBLG.myurl

// QBLG.priK= null;

// QBLG.CFSVideosJson = "";


//////////////////////////////////////////////// get请求 /////////////////////////////////////////////////////
QBLG.request = new XMLHttpRequest(); 
//发送get
 
QBLG.connect = function(type, url, huidiao){
  if (url != "") {
    // 发送请求:
    QBLG.request.open(type, url);
    QBLG.request.send();  
      QBLG.request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        if (QBLG.request.readyState === 4) { // 成功完成
            // 判断响应结果:
            if (QBLG.request.status === 200) {
                  // 成功，通过responseText拿到响应的文本:
                  phpjson = QBLG.request.responseText;
                  // console.log(phpjson);
                  // BII.json = JSON.parse(phpjson);
                  let json = JSON.parse(phpjson);
                return huidiao(json); //转换为json格式
            } else {
                // 失败，根据响应码判断失败原因:
                return huidiao(QBLG.request.status);
            }
        } else {
            // HTTP请求还在继续...
        }
    }
  }
}

QBLG.connectText = function(type, url, huidiao){
  if (url != "") {
    // 发送请求:
    QBLG.request.open(type, url);
    QBLG.request.send();  
      QBLG.request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        if (QBLG.request.readyState === 4) { // 成功完成
            // 判断响应结果:
            if (QBLG.request.status === 200) {
                  // 成功，通过responseText拿到响应的文本:
                  let text = QBLG.request.responseText;
                  // console.log(phpjson);
                  // BII.json = JSON.parse(phpjson);
                  //let json = JSON.parse(phpjson);
                return huidiao(text); //转换为json格式
            } else {
                // 失败，根据响应码判断失败原因:
                return huidiao(QBLG.request.status);
            }
        } else {
            // HTTP请求还在继续...
        }
    }
  }
}

QBLG.connect30X = function(type, url, huidiao){
  if (url != "") {
    // 发送请求:
    QBLG.request.open(type, url);
    QBLG.request.send();  
      QBLG.request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        let text = QBLG.request.responseText;
        return huidiao(text); //转换为json格式

        // if (QBLG.request.readyState === 4) { // 成功完成
        //     // 判断响应结果:
        //     if (QBLG.request.status === 307) {
        //           // 成功，通过responseText拿到响应的文本:
        //           let text = QBLG.request.responseText;
        //           // console.log(phpjson);
        //           // BII.json = JSON.parse(phpjson);
        //           //let json = JSON.parse(phpjson);
        //         return huidiao(text); //转换为json格式
        //     } else {
        //         // 失败，根据响应码判断失败原因:
        //         return huidiao(QBLG.request.status);
        //     }
        // } else {
        //     // HTTP请求还在继续...
        // }
    }
  }
}

 
//空函数
QBLG.null = function() {}


QBLG.navSub = function (mode , nav){
    let subnav = document.getElementById('qblg-subnav');

    if (mode == "on") {
        ///subnav.innerHTML = `<br><div class="navbar-nav nav-scroller"><div class="nav nav-item text-nowrap"><a class="subnav px-2"></a>`+ nav +`</div></div>`;
        subnav.innerHTML = `<br><div class="navbar-nav nav-scroller"><div class="nav nav-item text-nowrap" ><a class="subnav px-2"></a>`+ nav +`</div></div>`;
    }else{
        subnav.innerHTML = ``;
    }
}
QBLG.container = function (num , src){
	let container = document.getElementById('containerid');

	container.style = `
		width: `+ num +`%;
		border-bottom: 900px solid #fff;
		z-index: 11;
	`;

	container.innerHTML = src;
}





QBLG.logModal = function (){
        QBLG.header = `
        <a  class="me-auto text-muted" href="#"></a>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
        QBLG.body = `<div class="row">
                <!-- <form method="post" id="log-user-form" action="model/router.php?s=qblgLogin" target="modal-footer-iframe" class="form-group"> -->

                    <form method="post" id="log-user-form" action="model/router.php?s=qblgLogin" target="modal-footer-iframe" class="form-group">

                    

                    <div class="mb-3">
                      <input type="text" class="form-control" id="log-user" name="log-user" placeholder="选择 ..." value="" style="background-color: #e8e7e3">
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" id="log-pass" name="log-pass" placeholder="选择 ..." value="" style="background-color: #e8e7e3">
                    </div>

                    <!-- cf 验证 -->
                    <input type="hidden" id="cf-turnstile-response" name="cf-turnstile-response" >
                    <div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback" style="width: 100%;"></div>

                </form>

                <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group" >
                  <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" onclick="QBLG.logModalLogin()">
                  <label class="btn btn-outline-secondary" for="btncheck3">登录</label>
                </div><br>
            `;
        QBLG.footer = `<iframe id="modal-footer-iframe" name="modal-footer-iframe" class="me-auto text-muted" frameborder="no" marginwidth="0" marginheight="0" scrolling="yes" style="width: 100%; height: 30px; border: 0; padding: 0; margin: 0;">
        </iframe>`;


        QBLG.modalx("3500", "");

        // cf 验证 
        turnstile.render('#log-user-form', {
            sitekey: '0x4AAAAAAAA2TMAPVu8pp7nN',
            // callback: function(token) {
            //     console.log(`${token}`);
            // },
        });
}

QBLG.logModalLogin = function (){
    document.getElementById('log-user-form').submit();
}

//////////////////////////////////////////////// handler /////////////////////////////////////////////////////



QBLG.time = function (dates){
    var temp = new Date(dates);
    let yer = temp.getFullYear();
    let mon = temp.getMonth() + 1;
    let day = temp.getDate();

    mon = mon < 10 ? "0" + mon : mon;
    day = day < 10 ? "0" + day : day;

    return yer + ` ` + mon + ` ` + day;
}

QBLG.modalx = function (num, s){
    let modalHeader = document.getElementById('dynamic-modal-header');
    let modalBody = document.getElementById('dynamic-modal-body');
    let modalBodyPre = document.getElementsByClassName('prettyprint');
    let modalFooter = document.getElementById('dynamic-modal-footer');
    var fonts = `
            font: 16px/28px msyh;
            white-space: pre-wrap;           /* css-3 */
            white-space: -moz-pre-wrap;      /* Mozilla, since 1999 */
            white-space: -pre-wrap;          /* Opera 4-6 */
            white-space: -o-pre-wrap;        /* Opera 7 */
            word-wrap: break-word;           /* Internet Explorer 5.5+ */ 
        `;

    if (s == "text") {
        modalBody.style = fonts;

    }else{
        modalBody.style = ``;
    }
   
    modalHeader.innerHTML = QBLG.header;

    modalBody.innerHTML = QBLG.body + `<div style="height: 1000px; width: 100%;"></div>`;
    //modalBody.innerHTML = QBLG.body;
    modalBody.style.height = num + "px";

    modalFooter.innerHTML = QBLG.footer;
}




/**
 * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
 */
function getCurrentTime() {
    var date = new Date();//当前时间
    var month = zeroFill(date.getMonth() + 1);//月
    var day = zeroFill(date.getDate());//日
    var hour = zeroFill(date.getHours());//时
    var minute = zeroFill(date.getMinutes());//分
    var second = zeroFill(date.getSeconds());//秒
    
    //当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day
            + " " + hour + ":" + minute + ":" + second;
    
    return curTime;
}
 
/**
 * 补零
 */
function zeroFill(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

// QBLG.sort = function (mod, key) {
//     QBLG.pai = QBLG.pai == "⬆" ?  QBLG.pai = "⬇" : QBLG.pai = "⬆";

//     if (mod == "videos") {
//         QBLG.YTVideosJson.sort(QBLG.compare(key));
//         QBLGYT.videos(QBLG.YTVideosJson); 
//     }

//     if (mod == "modal") {
//         QBLGYT.forStartNum = 0;

//         QBLG.YTModalVideosJson.sort(QBLG.compare(key));
//         QBLG.YTFormatVideosJson = QBLG.YTModalVideosJson;  
//         QBLGYT.videoFormat("img");
//         document.getElementById('dynamic-modal-body').innerHTML = QBLGYT.list + `<div style="height: 1000px; width: 100%;"></div>`;


//         document.getElementById('dynamic-modal-title').innerHTML = QBLG.pai;
//     }
// } 


QBLG.sort = function (mode, key) {
    YTINIT.forNum = 0;
    YTINIT.pai = YTINIT.pai == "⬆" ?  YTINIT.pai = "⬇" : YTINIT.pai = "⬆";

    // modal 排序
    if (mode == "modal" || mode == "videos") {
        if (mode == "modal") {
            YTINIT.listJson = YTINIT.modalJson.sort(QBLG.compares(key));
            YTINIT.list("modal");   
        }
        if (mode == "videos") {
            YTINIT.listJson = YTINIT.videosJson.sort(QBLG.compares(key));
            YTINIT.list("videos");  
        }

        //
        document.getElementById('dynamic-modal-title').innerHTML = YTINIT.pai;
        document.getElementById('dynamic-modal-body').innerHTML = YTINIT.src + `<div style="height: 1000px; width: 100%;"></div>`;
    }

    // 文章排序
    if (mode == "text") {
        QLGTEXT.json.sort(QBLG.compares(key));
        QLGTEXT.navs(QLGTEXT.navDefault); 
        document.getElementById('text-nav').innerHTML = ` ` + YTINIT.pai + ` `;
    }

    
}

QBLG.compare = function (key){ //这是比较函数
    return function(m,n){
        var a = m[key];
        var b = n[key];

        if (QBLG.pai == "⬆") {
          return b - a; //升序
        }
        if (QBLG.pai == "⬇") {
          return a - b; //升序
        }  
    }  
}

QBLG.compares = function (key){ //这是比较函数
    return function(m,n){
        var a = m[key];
        var b = n[key];

        if (YTINIT.pai == "⬆") {
          return b - a; //升序
        }
        if (YTINIT.pai == "⬇") {
          return a - b; //升序
        }  
    }  
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// 替换 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
String.prototype.replaceAll = function (FindText, RepText) {
    return this.replace(new RegExp(FindText, "g"), RepText);
}


QBLG.titles = function (str){
    str = str.split("/").pop().split(".").slice(-2)[0];
    return str;
}

 



//////////// 播放拖动 //////////////
QBLG.divmove = function(_id){
    var flag = false;
    var cur = {
        x:0,
        y:0
    }
    var nx,ny,dx,dy,x,y ;
    function down(){
        flag = true;
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = div2.offsetLeft;
        dy = div2.offsetTop;
    }
    function move(){
        if(flag){
            var touch ;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            nx = touch.clientX - cur.x;
            ny = touch.clientY - cur.y;
            x = dx+nx;
            y = dy+ny;
            div2.style.left = x+"px";
            div2.style.top = y +"px";
            //阻止页面的滑动默认事件
            //document.addEventListener("touchmove",function(){
            document.addEventListener("touchmove",function(event){
                event.preventDefault();
            },false);
        }
    }
    //鼠标释放时候的函数
    function end(){
        flag = false;
    }
    var div2 = document.getElementById(_id);
    div2.addEventListener("mousedown",function(){
        down();
    },false);
    div2.addEventListener("touchstart",function(){
       // down();
    },false)
    div2.addEventListener("mousemove",function(){
        move();
    },false);
    div2.addEventListener("touchmove",function(){
        //move();
    },false)
    document.body.addEventListener("mouseup",function(){
        end();
    },false);
    div2.addEventListener("touchend",function(){
        end();
    },false);
}  
///////////////
//封装了一个取消默认事件的函数，用来兼容老IE
function cancelHandler(event){
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  } 
//拖动主要函数  
function bindEvent(_id) {
  var ele = document.getElementById(_id);
    //设置鼠标落下时的x、y坐标为X和Y,盒子的left和top值存为boxL和boxT,鼠标落下时的点距离盒子左边和上边的距离存为disL和disT
    let X, L, boxL, boxT, disL, disT, drag = false;
    ele.onmousedown = function(e) {
        drag = true;
        var e = e || window.event; //兼容ie
        X = e.clientX;
        Y = e.clientY;
        boxL = ele.offsetLeft;
        boxT = ele.offsetTop;
        disL = X - boxL;
        disT = Y - boxT;
        cancelHandler(e);
    }
    document.onmousemove = function(e) {
        var e = e || window.event;
        if (drag) {
            ele.style.left = e.clientX - disL + 'px';
            ele.style.top = e.clientY - disT + 'px';
        }
    }
    ele.onmouseup = function() {
        drag = false;
    }
} 