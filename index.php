<link href="view/bootstrap5/bootstrap.min.css" rel="stylesheet" >
<script type="text/javascript" src="view/js/sys_define_functions.js"></script>
<script type="text/javascript" src="view/js/navbar_functions.js"></script>
<script type="text/javascript" src="view/js/index.js"></script>
<!-- <script type="text/javascript" src="view/js/tv.js"></script> -->
<script type="text/javascript" src="view/js/tv.js"></script>



<?php 
require_once 'view/box.php';
require_once 'view/videoPlayer.html';
require_once 'view/audioPlayer.html';
?>



<link rel="stylesheet" type="text/css" href="view/css/switch.css">
 




<!doctype html>
<html lang="cn">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">


  <!--   <meta name="description"
          content="纳贡毕力格,蒙医心身互动医学,纳贡毕力格视频,纳贡毕力格在线听课,运用蒙医蒙药结合蒙医心身互动医学为主，配合现代医学催眠暗示心理疗法，治疗各种心身疾病，尤其擅长治疗失眠、神经血管性头痛、慢性疲劳综合症、焦虑症、抑郁症、高血压、冠心病、各种胃肠疾病、便秘、牛皮癣治、不孕症等。納貢畢力格,蒙醫心身互動醫學,納貢畢力格視頻,納貢畢力格在線聽課,運用蒙醫蒙藥結合蒙醫心身互動醫學為主，配合現代醫學催眠暗示心理療法，治療各種心身疾病，尤其擅長治療失眠、神經血管性頭痛、慢性疲勞綜合症、焦慮症、抑鬱症、高血壓、冠心病、各種胃腸疾病、便秘、牛皮癬治、不孕症等。">
    <meta name="keywords" content="纳贡毕力格,蒙医心身互动医学,纳贡毕力格视频,纳贡毕力格在线听课,运用蒙医蒙药结合蒙医心身互动医学为主，配合现代医学催眠暗示心理疗法，治疗各种心身疾病，尤其擅长治疗失眠、神经血管性头痛、慢性疲劳综合症、焦虑症、抑郁症、高血压、冠心病、各种胃肠疾病、便秘、牛皮癣治、不孕症等。納貢畢力格,蒙醫心身互動醫學,納貢畢力格視頻,納貢畢力格在線聽課,運用蒙醫蒙藥結合蒙醫心身互動醫學為主，配合現代醫學催眠暗示心理療法，治療各種心身疾病，尤其擅長治療失眠、神經血管性頭痛、慢性疲勞綜合症、焦慮症、抑鬱症、高血壓、冠心病、各種胃腸疾病、便秘、牛皮癬治、不孕症等。"> -->
    
    <link rel="canonical" href="https://mglem.com/">


    <title><?php echo $_SERVER['HTTP_HOST']?></title>
    <link href="view/bootstrap5/offcanvas.css" rel="stylesheet">
    <link href="view/css/style.css" rel="stylesheet">
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;

        }
      }


      .dibu {
        text-align: center;
        height: 30px;
        font: 14px/12px arial,sans-serif
      }
      .dibu a {
        color: black;
      }


    </style>
    <link href="view/bootstrap5/dashboard.css" rel="stylesheet">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2161993205063468" crossorigin="anonymous"></script>
  </head>



  <body >
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-1 me-0 px-3" target="_blank" href="http://<?php echo $_SERVER['HTTP_HOST']?>/"><?php echo $_SERVER['HTTP_HOST']?></a>

      <div class="navbar-nav nav-scroller">
        <div class="nav nav-item text-nowrap">
           <!-- <a class="nav-link px-3" href="#" onclick="INDEX.switch(this); INDEX.video(2);">视频</a>
          <a class="nav-link px-3" href="#" onclick="INDEX.switch(this);  INDEX.audio(2);">蒙语</a>
          <a class="nav-link px-3" href="#" onclick="INDEX.switch(this);  INDEX.audio(1);">汉语</a>
         <a class="nav-link px-3" href="#" onclick="QBLG.connect('GET', 'router.php?s=NGNtv', TV.list)">TV</a> -->
          <!-- <a class="nav-link px-3" href="#" onclick="TV.list()">TV</a> -->
          <a class="nav-link px-3" href="#" onclick="TV.list()">TV</a>
          <!-- <a class="nav-link px-3" href="#" onclick="QBLG.connect307('GET','http://cntv.sbs/live?id=cctv1', TV.tests)">tests</a> -->
          <!-- <a class="nav-link px-3" href="#" onclick="TV.cctv('http://cntv.sbs/live?id=cctv1')">test</a>
          <a class="nav-link px-3" href="#" onclick="TV.cctv('router.php?s=NGNtest')">cctv</a>-->
             <!-- <a class="nav-link px-3" href="#" onclick="MGLEMS.m3u8('http://mg.com/list.m3u8');">test++</a>  -->
          <a class="nav-link px-3" href="#" data-bs-toggle="modal" data-bs-target="#dynamic-modal" onclick="INDEX.info()">关于</a>

          <!-- <a class="nav-link px-3" href="#" onclick="TV.get(163)">TV</a> -->
        </div>
      </div> 

    </header>



    <!-------------------------------------------------------------------------------------------------------------------------------------------->
    <!---------------------------------------------------------------- 身体 ----------------------------------------------------------------------->
    <span id="qblg-subnav"></span>
    <div class="container-fluid" id="containerid"></div><br>
 
    
 



 




  <script src="view/bootstrap5/bootstrap.bundle.min.js" ></script>
  </body>
</html>



<script type="text/javascript">

  //QBLG.connect('GET', 'router.php?s=NGNVideos&lang=2', INDEX.init);
  //QBLG.connect('GET', 'router.php?s=NGNList&lang=1', INDEX.init);

 //QBLG.connect('GET', 'router.php?s=NGNList', INDEX.init);

 TV.list();

</script>