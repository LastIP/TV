<?php
/*


ffmpeg -i 20230327PM.mp4 -y -f image2 -ss 00:00:33 -vframes 1 -s 352x240 20230327PM.mp4.jpg
ffmpeg -i 20230327PM.mp4 20230327PM.mp3

*/




class Ngs 
{
	private $phone = "13779372761";
	private $userId = "1634020215906742273";
	private $basicToken = "Y3VzdG9tOmN1c3RvbQ==";
	private $token = "9e7f04b9-3e97-470d-9f17-4263238a1c55";

	public $mediaDir = "data/ng/";
	public $ngThum = "data/ng-thumbnail/";
    public $r2mgVideos = R2HOST . "/mg/ng/";
    public $sanHost = GIAHOST . "/mg/ng/";

    public $ngStatic = "data/medias/";


	/// CURL 
    private function CURL($options){
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_HEADER, 0 );   //0是头文件不显示  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );   //1不输出到屏幕   
        curl_setopt($ch, CURLOPT_TIMEOUT, 120 );         //timeout时
        //socks代理
	    curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5 ); 		// 代理
	    // curl_setopt($ch, CURLOPT_PROXY, "60.190.195.146:1080" ); 		// 代理
	    curl_setopt($ch, CURLOPT_PROXY, SOCKS5IP . ":" . SOCKS5PORT ); 		// 代理
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

        curl_setopt_array($ch, $options);   //数组设置
        $str = curl_exec($ch);  //执行
        curl_close($ch);    //关闭

        return $str;
    }



    /// 获取Token ///
	public function Token($phone){
		$requesSMSCodeHeader = array(
			"Host: app-new.ajtmy.com",
			"content-type: application/json",
			"apptype: IOS",
			"phonemodel: iPhone_11",
			"devicename: iOS",
			"authorization: Basic " . $this->basicToken,
			"accept: */*",
			"appversion: 6.0.9",
			"accept-language: zh-Hans-CN;q=1, zh-Hant-TW;q=0.9",
			"tenant_id: 1",
			"user-agent: MainProject-owner/6.0.9 (iPhone; iOS 15.2.1; Scale/2.00)",
			"systemversion: 15.2.1");

		$requesTokenHeader = array(
			"Host: app-new.ajtmy.com",
			"content-type: application/x-www-form-urlencoded",
			"apptype: IOS",
			"phonemodel: iPhone_11",
			"devicename: iOS",
			"accept: */*",
			"authorization: Basic " . $this->basicToken,
			"appversion: 6.0.9",
			"accept-language: zh-Hans-CN;q=1, zh-Hant-TW;q=0.9",
			"tenant_id: 1",
			"user-agent: MainProject-owner/6.0.9 (iPhone; iOS 15.2.1; Scale/2.00)",
			"systemversion: 15.2.1");

		//// request sms code
		// $options = array(
        //     CURLOPT_HTTPHEADER => $requesSMSCodeHeader,
        //     CURLOPT_URL => "https://app-new.ajtmy.com/app/tsmssendlog/loginSms",
        //     CURLOPT_POST => 1,
        //     CURLOPT_POSTFIELDS => '{"phone":"'. $phone .'"}');
		// $json = $this->CURL($options);
		// print_r($json);

		// request token
		$options = array(
            CURLOPT_HTTPHEADER => $requesTokenHeader,
            CURLOPT_URL => "https://app-new.ajtmy.com/auth/oauth/token?mobile=SMS@". $phone ."&code=". $json->data ."&grant_type=mobile&appVersion=6.0.9&appType=IOS&deviceName=iOS&systemVersion=15.2.1&phoneModel=iPhone_11",
     
            CURLOPT_POST => 1);
		//$json = json_decode($this->CURL($options));

		$json = $this->CURL($options);
		print_r($json);

		// echo $json->access_token;
	}


	/// 数据库转移 ///
	// public function transfer(){
	// 	$DB = SQL::Connect();

	// 	$sql = "SELECT ng_id, ng_courseId, ng_courseLanguage, ng_videoUrl, ng_audioUrl, ng_duration, ng_Language, ng_idx, ng_date FROM ng_videos";
    //     $stmt = $DB->prepare($sql);
    //     $stmt->execute();

    //     $stmt->bind_result($ng_id, $ng_courseId, $ng_courseLanguage, $ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_Language, $ng_idx, $ng_date);

    //     while ($stmt->fetch()) {
    //     	$DB2 = SQL::Connect();
    //     	$sql2 = "INSERT IGNORE INTO ng_video(ng_id, ng_courseId, ng_courseLanguage, ng_videoUrl, ng_audioUrl, ng_duration, ng_Language, ng_idx, ng_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //     	$stmt2 = $DB2->prepare($sql2);
	// 	  	$stmt2->bind_param('iiissiiis', $ng_id, $ng_courseId, $ng_courseLanguage, $ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_Language, $ng_idx, $ng_date);
	// 	  	$stmt2->execute();
    //     }

	// 	SQL::Close();
	// }


	//////////////////////////////////////////////////////////////////////
	/// 获取第一层列表 ///
	public function selectAudioListNew($num){
		$requesSelectAudioListNew = array(
			"Host: app-new.ajtmy.com",
			"content-type: application/json",
			"apptype: IOS",
			"phonemodel: iPhone_11",
			"phone: " . $this->phone,
			"devicename: iOS",
			"authorization: Bearer " . $this->token,
			"accept: */*",
			"appversion: 6.0.9",
			"user_id: " . $this->userId,
			"accept-language: zh-Hans-CN;q=1, zh-Hant-TW;q=0.9",
			"tenant_id: 1",
			"user-agent: MainProject-owner/6.0.9 (iPhone; iOS 15.2.1; Scale/2.00)",
			"systemversion: 15.2.1");

		$options = array(
            CURLOPT_HTTPHEADER => $requesSelectAudioListNew,
            CURLOPT_URL => "https://app-new.ajtmy.com/app/tcourse/selectAudioListNew",
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => '{"courseLanguage":"'. $num .'"}');	//1汉语 2语
		$json = json_decode($this->CURL($options));
		// $json = $this->CURL($options);
		// print_r($json); 
		for ($i=0; $i < count($json->data); $i++) { 
			if ($json->data[$i]->courseType == 0) {
				//echo $json->data[$i]->courseName . "<br>";
				return $json->data[$i]->id;	// 返回汉语或蒙语课程的ID 好吗
			}
		}
	}


	/// 获取第二层列表 ///
	public function selectCourseDetailVo($num){
		$this->lang = $num;
		$id = $this->selectAudioListNew($num);	//1汉语 2蒙语

		$requesSelectCourseDetailVo = array(
			"Host: app-new.ajtmy.com",
			"content-type: application/json",
			"apptype: IOS",
			"phonemodel: iPhone_11",
			"phone: " . $this->phone,
			"devicename: iOS",
			"authorization: Bearer " . $this->token,
			"accept: */*",
			"appversion: 6.0.9",
			"user_id: " . $this->userId,
			"accept-language: zh-Hans-CN;q=1, zh-Hant-TW;q=0.9",
			"user-agent: MainProject-owner/6.0.9 (iPhone; iOS 15.2.1; Scale/2.00)",
			"systemversion: 15.2.1");

		$options = array(
            CURLOPT_HTTPHEADER => $requesSelectCourseDetailVo,
            CURLOPT_URL => "https://app-new.ajtmy.com/app/tcourseplaylist/selectCourseDetailVo",
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => '{"courseId":"'. $id .'"}');	//1汉语 2语
		$json = json_decode($this->CURL($options));
		$this->insertVideos($json);

		// $json = $this->CURL($options);
		// return $json;
	}

	/// 数据库插入 ///
	public function insertVideos($json){ 

		$DB = SQL::Connect();


		for ($i=0; $i < count($json->data->playList); $i++) { 

			$id = $json->data->playList[$i]->id;
			$courseId = $json->data->playList[$i]->courseId;
		 
			$videoUrl = $json->data->playList[$i]->videoUrl;
			$audioUrl = $json->data->playList[$i]->audioUrl;


			$duration = $json->data->playList[$i]->duration;
			$courseType = $json->data->playList[$i]->courseType;
			$courseLanguage = $this->lang;
			$idx = $json->data->playList[$i]->idx;

			$sql = "INSERT IGNORE INTO ng_videosNew(ng_id, ng_courseId, ng_videoUrl, ng_audioUrl, ng_duration, ng_courseType, ng_courseLanguage, ng_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = $DB->prepare($sql);
		  	$stmt->bind_param('iissiiii', $id, $courseId, $videoUrl, $audioUrl, $duration, $courseType, $courseLanguage, $idx);

			if (!$stmt->execute()) {  $this->json = "insertVideos error"; }
		}
		

	  	SQL::Close();
	}

	
	/////////////////////////////////////////////////////////////////////
	/// 全部 ///
	public function all(){
        $DB = SQL::Connect();

        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videosNew ";
        $stmt = $DB->prepare($sql);


        if (!$stmt->execute()) {    $json = "all error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_courseLanguage, $ng_date, $ng_r2status);
   			$i = 0;
            while ($stmt->fetch()) {


            	if ($ng_videoUrl != "") {	
            		$json[$i]['ng_videoUrl'] = $ng_videoUrl;
            		$json[$i]['ng_videoId'] = end(explode("/", $ng_videoUrl)); 	
            	}

            	if ($ng_audioUrl != "") {	
            		$json[$i]['ng_audioUrl'] = $ng_audioUrl;
            		$json[$i]['ng_audioId'] = end(explode("/", $ng_audioUrl)); 	
            	}
            	
                $json[$i]['ng_duration'] = $this->timeType($ng_duration);
                $json[$i]['ng_courseLanguage'] = $ng_courseLanguage;
                $json[$i]['ng_date'] = $ng_date;
                $json[$i]['ng_r2status'] = $ng_r2status;
                $i++;   
            }

        SQL::Close();

       // return json_encode($json, JSON_UNESCAPED_UNICODE);
        return $json;
    }

    /// 视频 ///
    public function videos($lang){
        $DB = SQL::Connect();

        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videosNew ";

        if ($lang == "2" || $lang == "1") {
        	$sql = $sql . " WHERE ng_courseLanguage = ? AND ng_r2status = 1 ORDER BY ng_date DESC";
        	$stmt = $DB->prepare($sql);
        	$stmt->bind_param('s', $lang);
        }


        if (!$stmt->execute()) {    $json = "videos error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_courseLanguage, $ng_date, $ng_r2status);
   			$i = 0;
            while ($stmt->fetch()) {


            	//if ($ng_videoUrl != "" && $ng_courseLanguage == 2) {	
            	if ($ng_videoUrl != "" && $ng_courseLanguage == 2) {	
            		$json[$i]['ng_videoId'] = $this->vidoesPath("url", $ng_videoUrl); 	
            		$json[$i]['ng_videoImg'] = $this->vidoesPath("img", $ng_videoUrl); 	
            		//$json[$i]['ng_videoId'] = ""; 	
            	  	
            	}else{
            		$json[$i]['ng_videoId'] = ""; 
            	}



            	if ($ng_audioUrl != "") {	
            		//$json[$i]['ng_videoId'] = end(explode("/", $ng_videoUrl)); 	
            		$json[$i]['ng_audioId'] = $this->audioPath("url", $ng_audioUrl); 	
            	}
            	
                $json[$i]['ng_duration'] = $this->timeType($ng_duration);
                $json[$i]['ng_courseLanguage'] = $ng_courseLanguage;
                $json[$i]['ng_date'] = $ng_date;
                $json[$i]['ng_r2status'] = $ng_r2status;
                $i++;   
            }

        SQL::Close();

        return $json;
    }





    /// 视频路径 ///
 	private function vidoesPath($type, $url){
        require "data/excude.php";
        $file = end(explode("/", $url));


        if (in_array($file, $exclude)) {
            $url = 0;
        }else{
            if ($type == "url") {
            	if (file_exists($this->mediaDir . $file)) {
            		 $url = $this->mediaDir . $file;
            	}else{
            		$url = $this->r2mgVideos . $file;
            	}
                

            }elseif($type == "img") {
                //$url = $this->ngThum . $file . ".jpg";
                if (file_exists($this->ngThum . $file . ".jpg")) {
            		 $url = $this->ngThum . $file . ".jpg";
            	}else{
            		$url = $this->r2mgVideos . $file . ".jpg";
            	}
            }
        }

        return $url;
    }

    private function audioPath($type, $url){
        require "data/excude.php";
        $file = end(explode("/", $url));


        if (in_array($file, $exclude)) {
            $url = 0;
        }else{
            if ($type == "url") {
            	if (file_exists($this->mediaDir . $file)) {
            		 $url = $this->mediaDir . $file;
            	}else{
            		$url = $this->sanHost . $file;
            	}
                

            }elseif($type == "img") {
                //$url = $this->ngThum . $file . ".jpg";
                if (file_exists($this->ngThum . $file . ".jpg")) {
            		 $url = $this->ngThum . $file . ".jpg";
            	}else{
            		$url = $this->r2mgVideos . $file . ".jpg";
            	}
            }
        }

        return $url;
    }


    /// 视频长度格式化 ///
    private function timeType($seconds){
        if ($seconds > 3600) {
            $hours = intval($seconds / 3600);
            $time = $hours . ":" . gmstrftime('%M:%S', $seconds);
        } else {
            $time = gmstrftime('%H:%M:%S', $seconds);
        }

        return $time;
    }


    /// 下载 /// curl -x socks5h://60.190.195.146:1080  -o 1d3c1e41bb184e7db1efc8f50bc807f0.mp4 https://media.ajtmy.com/movie/auto/dest/02/1d3c1e41bb184e7db1efc8f50bc807f0.mp4
    public function download(){
    	$json = $this->all();	//获取全部json
    	$locdate = date("Y-m-d");	//获取本机时间

    	//
    	foreach (glob($this->mediaDir . "*") as $file) {
            unlink($file);
        }

    	for ($i=0; $i < count($json); $i++) { 
    		$mydate = substr($json[$i]['ng_date'], 0, 10);	//mysql时间
    		$file = $this->mediaDir . $json[$i]['ng_audioId'];

    		if ($locdate == $mydate && $json[$i]['ng_audioUrl'] != "" && !file_exists($file) && $json[$i]['ng_r2status'] == 0) {	//判断当天 音频 还没下载
    			exec("/usr/bin/curl -x socks5h://". SOCKS5IP .":". SOCKS5PORT ."  -o ". $file ."  " . $json[$i]['ng_audioUrl']); 
    		}
    	}
    }


   	/// 下载后数据库标识 ///
    public function init(){
    	$json = $this->all();	//获取全部json
    	$locdate = date("Y-m-d");	//获取本机时间

    	for ($i=0; $i < count($json); $i++) { 
    		$mydate = substr($json[$i]['ng_date'], 0, 10);	//mysql时间
    		$file = $this->mediaDir . $json[$i]['ng_audioId'];

    		if ($json[$i]['ng_r2status'] == 0 && $locdate == $mydate && $json[$i]['ng_audioUrl'] != "" && file_exists($file)) {
    			$this->initFile($json[$i]['ng_audioUrl']);
    			//echo $json[$i]['ng_audioUrl'] . "<br>";
    		}
    	}
    }
    public function initFile($url){
        $DB = SQL::Connect();

        $sql = "UPDATE ng_videosNew SET ng_r2status = 1 WHERE ng_audioUrl = ?";
        $stmt = $DB->prepare($sql);
        $stmt->bind_param('s', $url);
        if (!$stmt->execute()) {    echo "init up error";  }

        SQL::Close();
    }




	////////////////////////////////////////////////////////
	/// 获取留言 ///
    public function pageByRecommend($n){
    	$start = 0;	// $n 总共多少页面 每页有八个留言

    	for ($i=$start; $i < $start + $n; $i++) { 

			$requesPageByRecommend = array(
				"Host: app-new.ajtmy.com",
				"content-type: application/json;charset=UTF-8",
				"accept: application/json, text/plain, */*",
				"authorization: Bearer " . $this->token,

				"accept-language: zh-CN,zh-Hans;q=0.9",
				"tenant_id: 1",
				"origin: https://think.ajtmy.com",
				"user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
				"referer: https://think.ajtmy.com/");

			$options = array(
	            CURLOPT_HTTPHEADER => $requesPageByRecommend,
	            CURLOPT_URL => "https://app-new.ajtmy.com/app/tarticle/pageByRecommend",
	            CURLOPT_POST => 1,
	            CURLOPT_POSTFIELDS => "{\"current\":". $i .",\"size\":8}");	//1汉语 2语
			$json = json_decode($this->CURL($options));

			$this->updateCommends($json);	
		}
    }
    /// 插入留言 ///
    private function updateCommends($json){
        $DB = SQL::Connect();

        for ($i=0; $i < count($json->data->records); $i++) { 
            $id = $json->data->records[$i]->id;
            $userId = $json->data->records[$i]->userId;
            $nickname = $json->data->records[$i]->nickname;
            $content = $json->data->records[$i]->content;
            $phone = $json->data->records[$i]->phone;

            $createTime = $json->data->records[$i]->createTime;
            $createTime = str_replace("年", "-", $createTime);
            $createTime = str_replace("月", "-", $createTime);
            $createTime = str_replace("日", "-", $createTime);

            $sql = "INSERT INTO ng_customerNew(ng_id, ng_userId, ng_nickname, ng_content, ng_phone, ng_createTime) SELECT ?,?,?,?,?,? FROM dual WHERE NOT EXISTS(SELECT ng_id FROM ng_customerNew WHERE ng_id = ?)";
            $stmt = $DB->prepare($sql);
            $stmt->bind_param('iissisi', $id, $userId, $nickname, $content, $phone, $createTime, $id);
            if (!$stmt->execute()) {  echo "updateMes error"; }
        }

        SQL::Close();
    }



    public function staticMediasList(){
    	foreach (glob($this->ngStatic . "*") as $value) {
    		if (file_exists($value) && pathinfo($value,  PATHINFO_EXTENSION) == "mp4") {
    			$name = str_replace(".mp4", "", $value);
    			$json[] = $name;
    		}
    	}

    	//print_r($json);
    	return $json;
    }

    public function staticMediasInit(){
    	foreach (glob($this->ngStatic . "*") as $value) {
    		$this->thumbnails($value);
    	}
    }


 	public function thumbnails($value){
        $nameExt = end(explode("/", $value));

        $file = $this->ngStatic . $nameExt;
        $img = $this->ngStatic . $nameExt . ".jpg";  //截图保存位置和名字

        $name = $nameExt;
        $name = str_replace(".mp4", ".mp3", $name);
        $mp3 = $this->ngStatic . $name;
        
       	if (file_exists($file) && pathinfo($nameExt,  PATHINFO_EXTENSION) == "mp4") {
            $initImg = "./model/ffmpeg -i '" . $file . "' -y -f image2 -ss 00:00:08 -vframes 1 -s 352x240 '" . $img . "' 2>&1";    //获取静态缩略图
            $initMp3 = "./model/ffmpeg -i '" . $file . "' '" . $mp3 . "' 2>&1";   

            if (!file_exists($img)) {	$result = exec($initImg); 	}
            if (!file_exists($mp3)) {	$result = exec($initMp3);		}
        }        
    }





}