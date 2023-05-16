<?php 
/*

13 05 * * * /usr/bin/curl -o ~/mg.log https://mg.com/router.php?s=NGupdateVideos
25 05 * * * /usr/bin/rsync -vrt --delete -e 'ssh root@67.230.169.67 -p 19611 -i ~/.ssh/id_rsa' --exclude={'.git',} /mnt/nvme/web/MDATA/ root@:/home/web/MDATA/
35 05 * * * /usr/local/bin/rclone -P copy /mnt/nvme/web/MG/data/ r2me:public/mg/ >/dev/null
55 05 * * * /usr/bin/rsync -vrt --progress --delete -e 'ssh root@67.230.169.67 -p 19611 -i ~/.ssh/id_rsa' --exclude={'ng/*','.git',} /mnt/nvme/web/MG/data/ root@:/home/web/MG/data/

*/




/// 引入
require_once 'model/config.php';
require './controller/vendor/autoload.php';
require_once 'model/UserLogin.Static.Class.php';
require_once 'model/ngs.Class.php';
require_once 'model/ng.Class.php';
require_once 'model/tv.Class.php';









if (strstr($_GET['s'], "NGN")) {
	$ngs = new Ngs;
	$ng = new Ng;
	$tv = new Tv;

	/// 更新
	if ($_GET['s'] == 'NGNUpdate') {	/// 更新留言 curl -o ~/mg.log http://mg.com/router.php?s=NGNUpdate	 
		/// 
		//$ngs->Token("13779372761");	// 7389
		//$ngs->transfer();

		/// api获取数据库写入
		// $ngs->selectCourseDetailVo(1);	//1中文
		// $ngs->selectCourseDetailVo(2);	//2蒙文

		/// 下载
		//$ngs->download();

		/// 下载文件数据库写入
		//$ngs->init();

		/// 留言
		$ngs->pageByRecommend(32);




	/// 获取视频列表
	}elseif ($_GET['s'] == 'NGNVideos') {	/// 更新留言 curl -o ~/mg.log http://mg.com/router.php?s=NGNVideos&lang=1
 		$json['videos'] = $ngs->videos($_GET['lang']);
 		$json['medias'] = $ngs->staticMediasList();

 		echo json_encode($json, JSON_UNESCAPED_UNICODE);

 	/// 更新
 	}elseif ($_GET['s'] == 'NGNinits') {	/// 更新留言 http://mg.com/router.php?s=NGNinits
 	  	//$ngs->pageByRecommend(50);
 	  	//print_r($ngs->selectCourseDetailVo(1));	//2蒙文
 	  	//$ngs->staticMediasList();
 	  	//$ngs->staticMediasInit();




//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////




 	}elseif ($_GET['s'] == 'NGNList') {	/// 更新留言 curl -o ~/mg.log http://mg.com/router.php?s=NGNList
 		$json['record'] = $ng->recordList();
 		$json['1'] = $ng->list(1);
 		$json['2'] = $ng->list(2);
 		$json['v2'] = $ng->videoList(2);

 		echo json_encode($json, JSON_UNESCAPED_UNICODE);


 	}elseif ($_GET['s'] == 'NGNinit') {	/// 更新留言 http://mg.com/router.php?s=NGNinit
 		$ng->init();

 	}elseif ($_GET['s'] == 'NGNInitTv') {	/// 更新留言 http://mg.com/router.php?s=NGNInitTv&channel=163
 		$tv->init($_GET['channel']);

 	}elseif ($_GET['s'] == 'NGNtv') {	/// 获取直播地址 http://mg.com/router.php?s=NGNtv
 		echo json_encode($tv->channels(), JSON_UNESCAPED_UNICODE);
 		//echo $tv->get($_GET['channel']);


 	}elseif ($_GET['s'] == 'NGNtest') {	/// 更新留言 http://mg.com/router.php?s=NGNtest
 		//echo json_encode($ng->videoList($_GET['lang']), JSON_UNESCAPED_UNICODE);
 		$tv->cntv('http://cntv.sbs/live?id=cctv1'); // 163 & 164
 		

	}













}