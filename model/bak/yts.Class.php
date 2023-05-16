<?php 


class YTB {

	///
	public $num = 20000; // 控制最大视频数字  DESC LIMIT $n 20000
	public $YTVID = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&key=". YTBAPIKEY;

	public $stmt;
	public $json;



	/// 下载
	public $YTIMG = "./data/yt-thumbnail/";
	public $R2HOST = R2HOST . "/yt/";


	//
	public $tempYTDownload = "/DATA/download/";

	public static $ytdls = "/controller/ytdlp";
	public static $YTdownloadDir = "./DATA/medias/";
	public static $curl = "/usr/bin/curl";

	function __construct(){
		$this->tempYTDownload = "./" . $this->tempYTDownload;

		$GLOBALS['DB_USER'] = "qblg";
        $GLOBALS['DB_NAME'] = "qblg_db";
        $GLOBALS['DB_PASSWORD'] = "Sduqbgar19611..";
	}


	//////////////////////////////////////////////////////////// curl 连接模块
	private function CURL($options){
		$ch = curl_init(); 
    	curl_setopt($ch, CURLOPT_HEADER, 0 ); 	//0是头文件不显示	
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 ); 	//1不输出到屏幕	
    	curl_setopt($ch, CURLOPT_TIMEOUT, 1200 ); 		//timeout时
    	//curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1800 ); 		//timeout时
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json') ); 		//
    	//curl_setopt($ch, CURLOPT_POST,true);	// post请求
    	//curl_setopt($ch, CURLOPT_POSTFIELDS, "");

    	//根据域名判断代理
    	if (QBLGHOST != $_SERVER['HTTP_HOST']) { 
	    	curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5 ); 		// 代理
	    	curl_setopt($ch, CURLOPT_PROXY, "127.0.0.1:1080" ); 		// 代理
    	}
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);



    	curl_setopt_array($ch, $options);	//数组设置
    	$str = curl_exec($ch);	//执行
		curl_close($ch);	//关闭

		return $str;
	}

 	


	public function videos(){
		if (isset($_GET['UUId'])) {		$UUId = $_GET['UUId'];	}else{	$UUId = "";	}
			

		$sql = "SELECT DISTINCT user_name, user_yt_cid, user_yt_uploads, yt_id, yt_video_id, yt_title, yt_viewCount, yt_likeCount, yt_duration, yt_r2, yt_data FROM yt_video, t_user WHERE yt_r2 = 1 AND ";

		$DB = SQL::Connect();

		  	if ($UUId == "") {
		  		//$sql = $sql . " user_yt_uploads = yt_uploads AND user_lang = 'MN' AND DATE_SUB(CURDATE(), INTERVAL 20 DAY) <= date(yt_data) ORDER BY yt_data DESC";
		  		$sql = $sql . " user_yt_uploads = yt_uploads AND yt_r2 = 1 AND user_lang = 'MN' ORDER BY yt_viewCount DESC LIMIT 100";
		  		$stmt = $DB->prepare($sql);

		  	 
		  	}elseif ($UUId == "upCount") {
		  		$sql =  $sql . " yt_id > ? AND user_yt_uploads = yt_uploads ORDER BY yt_id ASC LIMIT 49";
		  		$stmt = $DB->prepare($sql);
		  		$stmt->bind_param('i', $id);

		  	}elseif ($UUId != "") {
		  		$sql =  $sql . " user_yt_uploads = yt_uploads AND yt_uploads != 'UUO3pO3ykAUybrjv3RBbXEHw' AND yt_uploads = ? ORDER BY yt_data DESC LIMIT $this->num";
		  		$stmt = $DB->prepare($sql);
		  		$stmt->bind_param('s', $_GET['UUId']);
		  	}
	  		
	  	///
		if (!$stmt->execute()) {  	$json = "videos error";  }

	  	$stmt->bind_result($user_name, $user_yt_cid, $user_yt_uploads, $yt_id, $yt_video_id, $yt_title, $yt_viewCount, $yt_likeCount, $yt_duration, $yt_r2, $yt_data);
	  		$i = 0;
	  		while ($stmt->fetch()) {
	  				
				$json[$i]['u_name'] = $user_name ;
				$json[$i]['u_cid'] = $user_yt_cid;
				$json[$i]['u_up'] = $user_yt_uploads;
				//$json[$i]['y_vid'] = $yt_video_id;
				$json[$i]['y_vid'] = $this->R2HOST . $yt_video_id .".mp4";
				// $json[$i]['y_img'] = "data/y/". $yt_video_id .".webp";
				$json[$i]['y_img'] = $this->YTIMG($yt_video_id);
	  			$json[$i]['y_tit'] = $yt_title;
	  			$json[$i]['yt_r2'] = $yt_r2;


	  			$json[$i]['y_id'] = $yt_id;
	  			$json[$i]['y_cCount'] = $yt_viewCount;
	  			$json[$i]['y_lCount'] = $yt_likeCount;
	  			$json[$i]['y_duration'] = $yt_duration;
	  			$json[$i]['y_data'] = $yt_data;
	  			$json[$i]['y_data_int'] = strtotime($yt_data);
				$i++;
		}

	  	///
	  	SQL::Close();

	  	return $json;
	}

	public function YTIMG($vid){
		$file = "./data/yt-thumbnail/". $vid .".jpg";

		if (!file_exists($file)) {
			$file = $this->R2HOST . $vid .".webp";
		}

		return $file;
	}


	
	/// 频道列表
	public function chennels($lang){
	  	$DB = SQL::Connect();

	  		// if ($lang == "") {
	  		// 	$sql = "SELECT user_id, user_yt_cid, user_yt_uploads, user_name, user_yt_thumbnails, user_yt_subscriberCount, user_yt_data FROM t_user WHERE user_yt_cid != '' AND user_yt_r2 = 1 ORDER BY user_id ASC";
	  		// 	$stmt = $DB->prepare($sql);
	  		// }else{
	  			$sql = "SELECT user_id, user_yt_cid, user_yt_uploads, user_name, user_yt_thumbnails, user_yt_subscriberCount, user_yt_data FROM t_user WHERE user_yt_cid != '' AND user_yt_uploads != 'UUO3pO3ykAUybrjv3RBbXEHw' AND user_yt_r2 = 1 AND user_lang = 'MN' ORDER BY user_id ASC";
	  			$stmt = $DB->prepare($sql);
	  			// $stmt->bind_param('s', $lang);
	  		// }
	  		

	  		if (!$stmt->execute()) {  	$this->json = "chennels error";  }

	  		$stmt->bind_result($user_id, $user_yt_cid, $user_yt_uploads, $user_name, $user_yt_thumbnails, $user_yt_subscriberCount, $user_yt_data);
	  			$i = 0;
	  			while ($stmt->fetch()) {
	  				if (strstr($user_yt_uploads, "UU")) {
						$json[$i]['u_id'] =  $user_id;

						$json[$i]['u_cid'] =  $user_yt_cid;
						$json[$i]['u_uid'] =  $user_yt_uploads;
						$json[$i]['u_name'] = $user_name;
						$json[$i]['u_thum'] = $user_yt_thumbnails;

						$json[$i]['u_sub'] = $user_yt_subscriberCount;
						$json[$i]['u_data'] = $user_yt_data;
						$json[$i]['u_data_int'] = strtotime($user_yt_data);
					}
				   	$i++;
				}

	  	SQL::Close(); 

	  	return $json;
	}	



	private function db(){
	 	if (!$this->stmt->execute()) {  	$this->json = "db error";  }

	  	$this->stmt->bind_result($user_name, $user_yt_cid, $user_yt_uploads, $yt_id, $yt_video_id, $yt_title, $yt_viewCount, $yt_likeCount, $yt_duration, $yt_data);
	  		$i = 0;
	  		while ($this->stmt->fetch()) {
	  				
				$this->json[$i]['u_name'] = $user_name ;
				$this->json[$i]['u_cid'] = $user_yt_cid;
				$this->json[$i]['u_up'] = $user_yt_uploads;
				$this->json[$i]['y_vid'] = $yt_video_id;
	  			$this->json[$i]['y_tit'] = $yt_title;


	  			$this->json[$i]['y_id'] = $yt_id;
	  			$this->json[$i]['y_cCount'] = $yt_viewCount;
	  			$this->json[$i]['y_lCount'] = $yt_likeCount;
	  			$this->json[$i]['y_duration'] = $yt_duration;
	  			$this->json[$i]['y_data'] = $yt_data;
	  			$this->json[$i]['y_data_int'] = strtotime($yt_data);
				$i++;
		}	
	}	

	public function clear(){
		$arr = $this->chennels("ZH");

		for ($i=0; $i < count($arr); $i++) { 
			//$this->delete($arr[$i]['u_uid']);
		}
	}


	/// API //////////////////////////////////////////////////////////////////////////////////////////
	/// 获取频道所有 playlist  
	public function playlistsAPI($channelId){
		$options = array(CURLOPT_URL => "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=". $channelId ."&maxResults=50&key=" . YTBAPIKEY,);
		$json = json_decode($this->CURL($options));
		//echo $this->CURL($options);

		$this->insertPlaylists($json);
	}
	public function channelInfoAPI($videoID){
		$videoID = explode("=", $videoID);
		$videoID = $videoID[1];
		if (strpos($videoID, "&t")) {
			$videoID = str_replace("&t", "", $videoID);
		}

		///获取频道ID
		$options = array(CURLOPT_URL => "https://youtube.googleapis.com/youtube/v3/videos?key=". YTBAPIKEY ."&part=snippet%2CcontentDetails%2Cstatistics&id=" . $videoID,);
		$json = json_decode($this->CURL($options));
		$channelId = $json->items[0]->snippet->channelId;

		// /// uploads 列表ID
		$options = array(CURLOPT_URL => "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=". YTBAPIKEY ."&id=" . $channelId,);
		$json = json_decode($this->CURL($options));
		//
		//print_r($json);

		///
		$this->insertChannel($json, $channelId);

		$uploads = $json->items[0]->contentDetails->relatedPlaylists->uploads;
		$this->videosAPI("init", $uploads); 
	}

	/// 获取视频 API
	public function videosAPI($mode, $yt_playlistid_id){
		$opt = array(CURLOPT_URL => $this->YTVID . "&playlistId=" . $yt_playlistid_id,);
		$json = json_decode($this->CURL($opt));
		

		/// 调用函数
		$this->insertVideos($json);
		//$this->videoAPI($json);
		$this->videoDetailsAPI($json);
		
		if ($mode == "init" && isset($json->nextPageToken)) {
			$this->YTVID = $this->YTVID . "&pageToken=" . $json->nextPageToken;
			$this->videosAPI("init", $json->items[0]->snippet->playlistId);
			if (isset($json)) { unset($json); }
		}
	}
	// public function videosAPIsss($yt_playlistid_id){
	// 	$opt = array(CURLOPT_URL => $this->YTVID . "&playlistId=" . $yt_playlistid_id,);
	// 	echo $this->CURL($opt);

	// }

	/// 获取视频点击数
	public function videoDetailsAPI($json){
		$id = null;
		$str = null;
		$n = count($json->items);

		for ($i=0; $i < $n; $i++) { 

		   if (($n - 1) == $i) {
		     $id = $json->items[$i]->contentDetails->videoId;
		   }else{
		     $id = $json->items[$i]->contentDetails->videoId . ",";
		   }

		   $str = $str . $id;
		}

		$options = array(CURLOPT_URL => "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=". YTBAPIKEY ."&id=" . $str,);
		$json = json_decode($this->CURL($options));

		$this->insertVideoDetails($json);
	}

	/// 更新点击数 如果$id 数字的化 videos表编号开始更新， $id如果是字符串 跟军playlistId更新
	public function videosCountUpAPI($id){
		$max = 50000;	//单词最大更新

		///// 全表更新
		$this->db = SQL::Connect();

		if (is_numeric($id)) {	//数字排序
			$sql = "SELECT DISTINCT yt_id, yt_video_id, yt_data FROM yt_video WHERE yt_id > ? ORDER BY yt_id ASC LIMIT $max";
	  		$stmt = $this->db->prepare($sql);
	  		$stmt->bind_param('i', $id);
	  		
		}else{	//单独频道更新
			$sql = "SELECT DISTINCT yt_id, yt_video_id, yt_data FROM yt_video WHERE yt_uploads = ? ORDER BY yt_data DESC LIMIT $max";
	  		$stmt = $this->db->prepare($sql);
	  		$stmt->bind_param('s', $id);
		}

		if (!$stmt->execute()) {  	$this->json = "count update error";  }
		  $stmt->bind_result($yt_id, $yt_video_id, $yt_data);
		  $i = 0;
			  while ($stmt->fetch()) {
				$this->json[$i]['yt_id'] = $yt_id ;
				$this->json[$i]['yt_video_id'] = $yt_video_id;
				$this->json[$i]['yt_data'] = $yt_data;
				$i++;
			}

		$n = $this->json[(count($this->json) - 1)]['yt_id'];

		SQL::Close();


		///// 获取统计数字
		$num = 49;
		for ($i=0; $i < count($this->json); $i=$i+$num) { 
			$str = '';
			//$m = 0;
			for ($j=$i; $j < $i+$num; $j++) { 
				//$m++;
				if ($this->json[$j]['yt_video_id']) {
					if ($j == $i) {
						$str = $this->json[$j]['yt_video_id'];
					}else{
						$str = $str . "," . $this->json[$j]['yt_video_id'];
					}
					
				}
			}

			$options = array(CURLOPT_URL => "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=". YTBAPIKEY ."&id=" . $str,);
			$json = json_decode($this->CURL($options));
			$this->insertVideoDetails($json);
		}

		$this->json = $n; //
	}

	/// 插入 //////////////////////////////////////////////////////////////////////////////////////////
	/// 频道插入
	public function insertPlaylists($json){
		$DB = SQL::Connect();

		for ($i=0; $i < count($json->items); $i++) { 
			$title = $json->items[$i]->snippet->title;
			$playListId = $json->items[$i]->id;
			$lang = $json->items[$i]->snippet->description;
			$publishedAt = $json->items[$i]->snippet->publishedAt;

			$publishedAt = str_replace("Z","", $publishedAt); 
		    $publishedAt = str_replace("T"," ", $publishedAt);
			

			$sql = "INSERT INTO t_user(user_name, user_yt_uploads, user_lang, user_yt_data) SELECT ?,?,?,? FROM dual WHERE NOT EXISTS(SELECT user_yt_uploads FROM t_user WHERE user_yt_uploads = ?)";
			$stmt = $DB->prepare($sql);
		  	$stmt->bind_param('sssss', $title, $playListId, $lang, $publishedAt, $playListId);

		  	if (!$stmt->execute()) {  $this->json = "insert playlists error"; }
		}
		

	  	SQL::Close();		
	}

	public function insertChannel($json, $channelId){

		$title = $json->items[0]->snippet->title;
		$description = $json->items[0]->snippet->description;
		$uploads = $json->items[0]->contentDetails->relatedPlaylists->uploads;
		$publishedAt = $json->items[0]->snippet->publishedAt;
		$country = $json->items[0]->snippet->country;
		$thumbnails = $json->items[0]->snippet->thumbnails->default->url;
		$subscriberCount = $json->items[0]->statistics->subscriberCount;


		$publishedAt = str_replace("Z","", $publishedAt); 
	    $publishedAt = str_replace("T"," ", $publishedAt);


		$DB = SQL::Connect();

		//$sql = "INSERT INTO t_user(user_yt_uploads, user_yt_cid, user_yt_country, user_yt_subscriberCount, user_yt_title, user_yt_data, user_yt_thumbnails, user_yt_des) SELECT ?,?,?,?,?,?,?,? FROM dual WHERE NOT EXISTS(SELECT user_yt_cid FROM t_user WHERE user_yt_cid = ?)";
		$sql = "INSERT INTO t_user(user_yt_uploads, user_yt_cid, user_yt_country, user_yt_subscriberCount, user_name, user_yt_data, user_yt_thumbnails, user_yt_des) SELECT ?,?,?,?,?,?,?,? FROM dual WHERE NOT EXISTS(SELECT user_yt_cid FROM t_user WHERE user_yt_cid = ?)";
		$stmt = $DB->prepare($sql);
	  	$stmt->bind_param('sssisssss', $uploads, $channelId, $country, $subscriberCount, $title, $publishedAt, $thumbnails, $description, $channelId);

	  	if (!$stmt->execute()) {  $this->json = "insert Channel error"; }

	  	SQL::Close(); 
	}


	/// 视频插入
	public function insertVideos($json){
		$DB = SQL::Connect();

		for ($i=0; $i < count($json->items); $i++) { 
			//$channelId = $json->items[$i]->snippet->videoOwnerChannelId;
			$uploads = $json->items[$i]->snippet->playlistId;

			$videoId = $json->items[$i]->contentDetails->videoId;
			$title = $json->items[$i]->snippet->title;
			$videoPublishedAt = $json->items[$i]->contentDetails->videoPublishedAt;
			$videoPublishedAt = str_replace("Z","", $videoPublishedAt); 
	    	$videoPublishedAt = str_replace("T"," ", $videoPublishedAt);

			///
			$DB = SQL::Connect();

			// $sql = "INSERT INTO yt_video(yt_uploads, yt_title, yt_video_id, yt_data) SELECT ?,?,?,? FROM dual WHERE NOT EXISTS(SELECT yt_video_id FROM yt_video WHERE yt_video_id = ?)";

	  		$sql = "INSERT IGNORE INTO yt_video (yt_uploads, yt_title, yt_video_id, yt_data) VALUES (?, ?, ?, ?)";
			$stmt = $DB->prepare($sql);
	  		$stmt->bind_param('ssss', $uploads, $title, $videoId, $videoPublishedAt);


	  		if (!$stmt->execute()) {  $this->json = "insert videos error"; }
		}

		SQL::Close();
	}

	/// 插入视频点击率
	public function insertVideoDetails($json){
		$DB = SQL::Connect();

		for ($i=0; $i < count($json->items); $i++) { 
			$sql = "UPDATE yt_video SET yt_viewCount = ?, yt_likeCount = ?, yt_favoriteCount = ?, yt_commentCount = ?, yt_duration = ? WHERE yt_video_id = ?";
			$stmt = $DB->prepare($sql);

			$viewCount = $json->items[$i]->statistics->viewCount;
			$likeCount = $json->items[$i]->statistics->likeCount;
			$favoriteCount = $json->items[$i]->statistics->favoriteCount;
			$commentCount = $json->items[$i]->statistics->commentCount;

			$duration = $json->items[$i]->contentDetails->duration;

			$id = $json->items[$i]->id;

			
			$stmt->bind_param('iiiiss', $viewCount, $likeCount, $favoriteCount, $commentCount, $duration, $id);
			if (!$stmt->execute()) {  $this->json = "count insert error"; }
			// $stmt->execute();
		}
		
		$DB = SQL::Close();
	}

	

	/// 更新 //////////////////////////////////////////////////////////////////////////////////////////
	/// 每天更新视频
	public function updateVideos(){
		//$this->chennels("");
		$json = $this->chennels("MN");
		//$this->json = "";
		//print_r($json);

		for ($i=0; $i < count($json); $i++) { 
			$uu = $json[$i]['u_uid'];
			if (substr($uu, 0, 2) == "UU" && $uu != "") {
				$this->videosAPI("", $uu);
			}
		}
	}



	/// 下载视频封面 //////////////////////////////////////////////////////////////////////////////////////////
	public static function downloadYTIMG(){
		// echo "sad";
		if (UserLogin::httpCode("www.youtube.com") == 200) {
			YTB::$curl = YTB::$curl;
		}else{
			YTB::$curl = YTB::$curl . " -x socks5h://192.168.3.28:1080 ";
		}
		///
		$DB = SQL::Connect();

		$sql = "SELECT yt_video_id FROM yt_video WHERE yt_r2 = 1";
		$stmt = $DB->prepare($sql);
		$stmt->bind_result($yt_video_id);
		if (!$stmt->execute()) {  	echo "downloadYTIMG error";  }


		//$fileList = fopen("testfile.txt", "w");

		while ($stmt->fetch()) {
			$file = "./data/yt-thumbnail/". $yt_video_id .".jpg";
			if (!file_exists($file)) {
				exec(YTB::$curl . "https://img.youtube.com/vi/". $yt_video_id ."/mqdefault.jpg --output " . $file);
			}
			//
			
			//fwrite($fileList, $yt_video_id . "\n");
		}

		//fclose($fileList);
		SQL::Close(); 
	}
	

	public function upR2List($UUId){
		$DB = SQL::Connect();

		$file = fopen("./list.txt", "r");

			while(!feof($file)){
			  	$vid = current(explode(".", fgets($file)));
			  	
				$sql = "UPDATE yt_video SET yt_r2 = 1 WHERE yt_uploads = ? AND yt_video_id = ?";
				//$sql = "UPDATE yt_video SET yt_r2 = 0";
				$stmt = $DB->prepare($sql);
				$stmt->bind_param('ss', $UUId, $vid);
			
				if (!$stmt->execute()) { 	echo "upR2List error";  } 
			}

			fclose($file);

		SQL::Close(); 

		//system(YTB::$rclone . " ls -P r2me:public/y/ | grep '.mp4$' | awk '{print $2}'");
		// rclone ls -P r2me:public/y/ | grep '.mp4$' | awk '{print $2}' >/mnt/nvme/web/MG/list.txt
	}
	

	
	private function delete($playlistId){
		$DB = SQL::Connect();

		$sql = "DELETE FROM yt_video WHERE yt_uploads = ?";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $playlistId);
			if (!$stmt->execute()) {  
		      $this->json = "delete videos error"; 
		    }else{
		    	$this->json = "delete videos OK";
		    }
	    ///
	    $sql = "DELETE FROM t_user WHERE user_yt_uploads = ? ";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $playlistId);
			if (!$stmt->execute()) {  
		      $this->json = "delete channels error"; 
		    }else{
		    	$this->json = "delete channels ok"; 
		    }

		SQL::Close(); 
	}


	function __destruct(){
		if (!$this->json == null) {
			echo json_encode( $this->json , JSON_UNESCAPED_UNICODE );
		}
	}	

}