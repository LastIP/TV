<?php


class Ngs 
{
	// {"access_token":"9e7f04b9-3e97-470d-9f17-4263238a1c55","token_type":"bearer","expires_in":172799,"scope":"server","license":"made by ajt","code":0,"user_id":"1634020215906742273","active":true,"client_id":"custom","username":"5qbyul"}
	private $phone = "13779372761";
	private $userId = "1634020215906742273";
	private $basicToken = "Y3VzdG9tOmN1c3RvbQ==";
	private $token = "9e7f04b9-3e97-470d-9f17-4263238a1c55";

	public $mediaDir = "data/ng/";


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
	public function transfer(){
		$DB = SQL::Connect();

		$sql = "SELECT ng_id, ng_courseId, ng_courseLanguage, ng_videoUrl, ng_audioUrl, ng_duration, ng_Language, ng_idx, ng_date FROM ng_videos";
        $stmt = $DB->prepare($sql);
        $stmt->execute();

        $stmt->bind_result($ng_id, $ng_courseId, $ng_courseLanguage, $ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_Language, $ng_idx, $ng_date);

        while ($stmt->fetch()) {
        	$DB2 = SQL::Connect();
        	$sql2 = "INSERT IGNORE INTO ng_video(ng_id, ng_courseId, ng_courseLanguage, ng_videoUrl, ng_audioUrl, ng_duration, ng_Language, ng_idx, ng_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        	$stmt2 = $DB2->prepare($sql2);
		  	$stmt2->bind_param('iiissiiis', $ng_id, $ng_courseId, $ng_courseLanguage, $ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_Language, $ng_idx, $ng_date);
		  	$stmt2->execute();
        }

		SQL::Close();
	}


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


	/// 获取课程列表 ////
	public function selectCourseDetailVo($num){
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

	/// 数据库插入文件
	public function insertVideos($json){ 

	// public function insertVideos(){ 
	// 	require_once 'json.php';
	// 	$json = json_decode($json);


		$DB = SQL::Connect();



		for ($i=0; $i < count($json->data->playList); $i++) { 

			$id = $json->data->playList[$i]->id;
			$courseId = $json->data->playList[$i]->courseId;
		 
			$videoUrl = $json->data->playList[$i]->videoUrl;
			$audioUrl = $json->data->playList[$i]->audioUrl;


			$duration = $json->data->playList[$i]->duration;
			$courseType = $json->data->playList[$i]->courseType;
			$courseLanguage = $json->data->playList[$i]->courseLanguage;
			$idx = $json->data->playList[$i]->idx;

			$sql = "INSERT IGNORE INTO ng_videosNew(ng_id, ng_courseId, ng_videoUrl, ng_audioUrl, ng_duration, ng_courseType, ng_courseLanguage, ng_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = $DB->prepare($sql);
		  	$stmt->bind_param('iissiiii', $id, $courseId, $videoUrl, $audioUrl, $duration, $courseType, $courseLanguage, $idx);

			if (!$stmt->execute()) {  $this->json = "insertVideos error"; }
		}
		

	  	SQL::Close();
	}

	
	/////////////////////////////////////////////////////////////////////
	///全部json
	public function all($lang){
       $DB = SQL::Connect();

        //$sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videosNew ";
        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videosNew ";

        if ($lang == "") {
        	$stmt = $DB->prepare($sql);

        }elseif ($lang == "2" || $lang == "1") {
        	//$sql = $sql . " WHERE ng_r2status = 1 AND (ng_videoUrl IS NOT NULL || ng_audioUrl IS NOT NULL) AND ng_courseLanguage = ? ";
        	$sql = $sql . " WHERE ng_courseLanguage = ? AND ng_r2status = 1 ORDER BY ng_date DESC";
        	$stmt = $DB->prepare($sql);
        	$stmt->bind_param('s', $lang);
        }


        if (!$stmt->execute()) {    $json = "vidoes error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_courseLanguage, $ng_date, $ng_r2status);
   			$i = 0;
            while ($stmt->fetch()) {


            	if ($ng_videoUrl != "") {	
            		if ($lang == "") {
            			$json[$i]['ng_videoUrl'] = $ng_videoUrl;
            		}
            		 
            		$json[$i]['ng_videoId'] = end(explode("/", $ng_videoUrl)); 	
            	}

            	if ($ng_audioUrl != "") {	
            		if ($lang == "") {
            			$json[$i]['ng_audioUrl'] = $ng_audioUrl;
            		}
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

 


    /// 视频长度格式
    private function timeType($seconds){
        if ($seconds > 3600) {
            $hours = intval($seconds / 3600);
            $time = $hours . ":" . gmstrftime('%M:%S', $seconds);
        } else {
            $time = gmstrftime('%H:%M:%S', $seconds);
        }

        return $time;
    }

    /// 下载 curl -x socks5h://60.190.195.146:1080  -o 1d3c1e41bb184e7db1efc8f50bc807f0.mp4 https://media.ajtmy.com/movie/auto/dest/02/1d3c1e41bb184e7db1efc8f50bc807f0.mp4
    public function download(){
    	$json = $this->all("");	//获取全部json
    	$locdate = date("Y-m-d");	//获取本机时间

    	for ($i=0; $i < count($json); $i++) { 
    		$mydate = substr($json[$i]['ng_date'], 0, 10);	//mysql时间
    		$file = $this->mediaDir . $json[$i]['ng_audioId'];

    		if ($locdate == $mydate && $json[$i]['ng_audioUrl'] != "" && !file_exists($file) && $json[$i]['ng_r2status'] == 0) {	//判断当天 音频 还没下载
    			exec("/usr/bin/curl -x socks5h://". SOCKS5IP .":". SOCKS5PORT ."  -o ". $file ."  " . $json[$i]['ng_audioUrl']); 
    		}
    	}
    }


    /// 文件信息写入数据库
    public function init(){
    	$json = $this->all("");	//获取全部json
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









}