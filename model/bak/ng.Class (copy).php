<?php

/***

*** 每日病人视频URL视频和音频格式 ***
https://media.ajtmy.com/movie/dest/2023-02-12/02/fb49f2513bdd4e458580b9b0173ba292.mp4
https://media.ajtmy.com/audio/2023-02-12/02/fb49f2513bdd4e458580b9b0173ba292.mp3

*** 每日非病人视频和音频格式 ***
https://media.ajtmy.com/movie/auto/dest/01/8558e6197bdc485181179f3a88645559.mp4
https://media.ajtmy.com/audio/auto/01/8558e6197bdc485181179f3a88645559.mp3



*** 远程对象存储上的列表写入文件 ***
rclone ls r2me:public/mg/ng/ | awk '{print $2}' > r2mg_list.txt



wget -U NoSuchBrowser/1.0 https://media.ajtmy.com/movie/dest/2023-02-18/02/ac9bce84a99a42598a071399a5a181f1.mp4

wget -U NoSuchBrowser/1.0 https://media.ajtmy.com/movie/2023-02-18/02/ac9bce84a99a42598a071399a5a181f1.mp4

wget -U NoSuchBrowser/1.0 https://media.ajtmy.com/audio/2023-02-18/02/ac9bce84a99a42598a071399a5a181f1.mp3

 



ng 的视频下载方法！
* 
* 	验证
* 	https://app-new.ajtmy.com/auth/oauth/token?mobile=SMS@18701466152&code=2329&grant_type=mobile&appVersion=6.0.2&appType=IOS&deviceName=iOS&systemVersion=15.2.1&phoneModel=iPhone_11
*   
*   // 从ajitai视频获取 //
*   00 05 * * * /usr/bin/curl -o ~/qblg.ngup.log http://localhost/router.php?s=PLinitNg
*
*   // 截图初始化
*   13 06 * * * /usr/bin/curl -o ~/qblg.ngimg.log http://localhost/router.php?s=listInitLocalMedia
*   
* 	// 复制到数据库
*   25 06 * * * /usr/bin/rsync -vrt --progress --delete -e 'ssh root@67.230.169.67  -p 19611 -i ~/.ssh/id_rsa' --exclude={'.git',} /mnt/nvme/web/MDATA/ root@:/home/web/MDATA/
*
*   // 复制到R2
*   35 06 * * * /usr/local/bin/rclone sync /mnt/nvme/web/QBLG/DATA/localMedia/ r2me:public/localMedia/ > /dev/null
* 
*   
*   chmod +x /home/web/MG/model/ffmpeg
*   chown www:www /home/web/MG -R
* 
*   cd /home/web/MG/data/ng-thumbnail/ && rm -rf c8d06fef757140aa9237f69c9f860ed3.mp4.jpg && rm -rf ca306e39a98d44ffa6b5658973f69deb.mp4.jpg && rm -rf d8fd28d56ae94b979f13cd4ab7b64abe.mp4.jpg && rm -rf f66dce86514e4cb28f1efd45f1f03ab8.mp4.jpg && rm -rf 3b1987ee76b247539323ae74c427f7e0.mp4.jpg && rm -rf 7e54187f0cc24d8ca3950eb59f4ebe2e.mp4.jpg && rm -rf 4a346cac11c540c88f8f1bf5c133b9c6.mp4.jpg && rm -rf 51a9bfb453a34a53a1033066a712eb9b.mp4.jpg && rm -rf 23695819f123418ab5163955f3fee7c2.mp4.jpg && rm -rf a20ab883e8914f9d8f04138a72317ace.mp4.jpg && rm -rf 339e82097b104a3091da18cbea448983.mp4.jpg


*************************************************************************************
***/




class Ng {
    public $json;
    public $dirNg = "data/ng/";
    // public $ngThum = "data/ng-thumbnail/";

    public $ngThum = "data/ng-thumbnail/";
    public $r2files = R2HOST . "/mg/ng/";
    public $locFiles =  "data/ng/";

    private $basicKey = "Y3VzdG9tOmN1c3RvbQ==";		
    private $token = "7fd7ca90-54b2-4f95-82b8-44a13cd9fa65";


    ///
    public static function httpCode($url){
        $ch = curl_init();

        $timeout = 3;
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_exec($ch);

        return $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    }
    
    /// 初始化数据库
    function __construct(){
        $GLOBALS['DB_USER'] = "mg";
        $GLOBALS['DB_NAME'] = "mg_db";
        $GLOBALS['DB_PASSWORD'] = "Mmdusggar1987..";
    }

    /// CURL
    private function CURL($options){
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_HEADER, 0 );   //0是头文件不显示  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );   //1不输出到屏幕   
        curl_setopt($ch, CURLOPT_TIMEOUT, 120 );         //timeout时
        curl_setopt_array($ch, $options);   //数组设置
        $str = curl_exec($ch);  //执行
        curl_close($ch);    //关闭

        return $str;
    }

    /// API 头部
    private function header($headerAdd){
        $header = array( 
            "accept-language: zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8, zh-Hant-TW;q=0.7", 
            "user-agent: MainProject-owner/6.0.1 (iPhone; iOS 15.2.1; Scale/2.00)", 
            "tenant_id: 1", 
            "accept-encoding: gzip, deflate, br", 
            "accept: */*");

        $header = array_merge($header, $headerAdd);

        return $header;
    }





////// 视频
    public function vidoes($lang){
       $DB = SQL::Connect();

        //$sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_date FROM ng_videos WHERE ng_r2status = 1 AND ng_courseLanguage = ?";
        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_date FROM ng_videosNew WHERE ng_r2status = 1 AND ng_courseLanguage = ?";
        $stmt = $DB->prepare($sql);
        $stmt->bind_param('i', $lang);

        if (!$stmt->execute()) {    $json = "NGVidoes error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_date);
            $i = 0;
            while ($stmt->fetch()) {
                        $excludeFile = end(explode("/", $ng_videoUrl));

                        if ($ng_videoUrl != "") {
                            $json[$i]['ng_videoUrl'] = $this->vidoesPath("url", $ng_videoUrl);
                        }else{
                            $json[$i]['ng_videoUrl'] = "";
                        }

                        if ($ng_audioUrl != "" ) {
                            $json[$i]['ng_audioUrl'] = $this->vidoesPath("url", $ng_audioUrl);
                        }else{
                            $json[$i]['ng_audioUrl'] = "";
                        }
                        
                        $json[$i]['ng_duration'] = $this->timeType($ng_duration);
                        $json[$i]['ng_date'] = str_replace("-", " ", $ng_date);
                        $json[$i]['ng_img'] = $this->vidoesPath("img", $ng_videoUrl);
                        $i++;
                    
                }

        SQL::Close();

        echo json_encode($json, JSON_UNESCAPED_UNICODE);
    }



    /// URL初始化
    private function vidoesPath($type, $url){
        require "data/excude.php";
        $file = end(explode("/", $url));


        if (in_array($file, $exclude)) {
            $url = 0;
        }else{
            if ($type == "url") {
                if (file_exists($this->locFiles . $file)) {
                    $url = $this->locFiles . $file;
                }else{
                    $url = $this->r2files . $file;
                }
                

            }elseif($type == "img") {
                $url = $this->ngThum . $file . ".jpg";
            }
        }

        return $url;
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

    

////// 地一层JSON
    public function selectAudioList(){
        $options = array(
            CURLOPT_HTTPHEADER => $this->header(array("authorization: Bearer " . $this->token)),
            CURLOPT_URL => "https://app-new.ajtmy.com/app/tcourse/selectAudioList");

        $json = json_decode($this->CURL($options));

        //循环获取中文和蒙文列表
        for ($i=0; $i < count($json->data); $i++) { 
        	$this->selectCourseDetailVo(array("Content-Type: application/json", "content-length: 34", "authorization: Bearer " . $this->token),
        		$json->data[$i]->id,
        		$json->data[$i]->courseLanguage,
        		$json->data[$i]->courseDate
        	);
        }
    }

    /// 第二层JSON
    private function selectCourseDetailVo($headerAdd, $courseId, $courseLanguage, $courseDate){
        $options = array(
            CURLOPT_HTTPHEADER => $this->header($headerAdd),
            CURLOPT_URL => "https://app-new.ajtmy.com/app/tcourseplaylist/selectCourseDetailVo",
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => '{"courseId":"'. $courseId .'"}');
        $json = json_decode($this->CURL($options));

        //$this->createUrl($json);

        $this->insertVideos($json, $courseLanguage, $courseDate);
    }

    /// JSON写入数据库
    private function insertVideos($json, $courseLanguage, $courseDate){ 
		$DB = SQL::Connect();

		for ($i=0; $i < count($json->data->playList); $i++) { 
			$id = $json->data->playList[$i]->id;
			$courseId = $json->data->playList[$i]->courseId;
		 
			$videoUrl = $json->data->playList[$i]->videoUrl;
			$audioUrl = $json->data->playList[$i]->audioUrl;

            /// 补视频连接
            // if ($videoUrl == "" && $audioUrl != "") {
            //     $vurl = $audioUrl;

            //         if (strstr($vurl, "/audio/20")) {
            //             $vurl = str_replace("/audio/", "/movie/dest/", $vurl); 

            //         }elseif (strstr($vurl, "/audio/auto/")) {
            //             $vurl = str_replace("/audio/auto/", "/movie/auto/dest/", $vurl); 
            //         }

            //     $vurl = str_replace(".mp3", ".mp4", $vurl); 
            //     $videoUrl = $vurl;
            // }
            /// 补音频连接
            // if ($videoUrl != "" && $audioUrl == "") {
            //     $aurl = $videoUrl;

            //     if (strstr($aurl, "/movie/auto/dest/")) {
            //         $aurl = str_replace("/movie/auto/dest/", "/audio/auto/", $aurl); 

            //     }elseif (strstr($aurl, "/movie/dest/20")) {
            //         $aurl = str_replace("/movie/dest/20", "/audio/20", $aurl); 
            //     }

            //     $aurl = str_replace(".mp4", ".mp3", $aurl); 
            //     $audioUrl = $aurl;
            // }


			$duration = $json->data->playList[$i]->duration;
			$language = $json->data->playList[$i]->courseLanguage;
			$idx = $json->data->playList[$i]->idx;

			$sql = "INSERT IGNORE INTO ng_videos(ng_id, ng_courseId, ng_videoUrl, ng_audioUrl, ng_duration, ng_Language, ng_idx, ng_courseLanguage, ng_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = $DB->prepare($sql);
		  	$stmt->bind_param('iissiiiss', $id, $courseId, $videoUrl, $audioUrl, $duration, $language, $idx, $courseLanguage, $courseDate);

		  	if (!$stmt->execute()) {  $this->json = "insert DB NG error"; }
		}
		

	  	SQL::Close();
	}

    /// 创建URL http://mg.com/router.php?s=NGupdateVideos
    public function createUrl(){ 
        $DB = SQL::Connect();

        $sql = "SELECT ng_id, ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_r2status = 1 ORDER BY ng_id DESC";
        $stmt = $DB->prepare($sql);
        if (!$stmt->execute()) {    $json = "createUrl error";  }

        $stmt->bind_result($ng_id, $ng_videoUrl, $ng_audioUrl);
            $i = 0;
            while ($stmt->fetch()) {
    
                if ($ng_videoUrl == "" && $ng_audioUrl != "") {
                    $videoUrl = $ng_audioUrl;
      
                        if (strstr($videoUrl, "/audio/20")) {
                            $videoUrl = str_replace("/audio/", "/movie/dest/", $videoUrl); 

                        }elseif (strstr($videoUrl, "/audio/auto/")) {
                            $videoUrl = str_replace("/audio/auto/", "/movie/auto/dest/", $videoUrl); 
                        }

                    $videoUrl = str_replace(".mp3", ".mp4", $videoUrl); 
        
                    echo $videoUrl . "<br>";
                    if (Ng::httpCode($videoUrl) == 200) {
                        // code...
                    }
                }

                $i++;
            }

        SQL::Close();
    }

 


////// 获取留言
    public function commendsAPI($pageNum){
        $pageStart = 1;   //开始时间
        //$pageNum = 50;  // 每页 8个留言 总共 30次

        for ($i=$pageStart; $i < $pageStart + $pageNum; $i++) { 

            $header = array(
                    "Host: app-new.ajtmy.com",
                    "content-type: application/json;charset=UTF-8",
                    "accept: application/json, text/plain, */*",
                    "accept-language: zh-CN,zh-Hans;q=0.9",
                    "tenant_id: 1",
                    "origin: https://think.ajtmy.com",
                    "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", 
                    "referer: https://think.ajtmy.com/",
                    "authorization: Bearer " . $this->token);

            // 获取短信
            $options = array(
                CURLOPT_HTTPHEADER => $header,
                CURLOPT_URL => "https://app-new.ajtmy.com/app/tarticle/pageByRecommend",
                CURLOPT_POST => 1,
                CURLOPT_POSTFIELDS => '{"current":'. $i .',"size":8}');

           $json = json_decode($this->CURL($options));
    

           $this->updateCommends($json);
        }
    }
    /// 留言JSON写入数据库
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

            $sql = "INSERT INTO ng_customer(ng_id, ng_userId, ng_nickname, ng_content, ng_phone, ng_createTime) SELECT ?,?,?,?,?,? FROM dual WHERE NOT EXISTS(SELECT ng_id FROM ng_customer WHERE ng_id = ?)";
            $stmt = $DB->prepare($sql);
            $stmt->bind_param('iissisi', $id, $userId, $nickname, $content, $phone, $createTime, $id);
            if (!$stmt->execute()) {  echo "updateMes error"; }
        }

        SQL::Close();
    }




////// 视频下载
    public function init(){
        $DB = SQL::Connect();

        $sql = "SELECT DISTINCT ng_id, ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_r2status = 0";
        $stmt = $DB->prepare($sql);
        if (!$stmt->execute()) {    echo "init error";  }

        $stmt->bind_result($ng_id, $ng_videoUrl, $ng_audioUrl);

        while ($stmt->fetch()) {
           $audio = $this->dirNg . end(explode("/", $ng_audioUrl));

            //// 视频音频模式
            // if (file_exists($video) && file_exists($audio)) {   //自动模式
            //     $this->initFile($ng_videoUrl);
            // }

            // 自动模式
            if (file_exists($audio) && $ng_audioUrl != "") {       //视频模式
                $this->initFile($ng_audioUrl);
                //echo $audio . "<br>";
            }
        }

        SQL::Close();
    }

    public function initFile($audioUrl){
        $DB = SQL::Connect();

        $sql = "UPDATE ng_videos SET ng_r2status = 1 WHERE ng_audioUrl = ?";
        $stmt = $DB->prepare($sql);
        $stmt->bind_param('s', $audioUrl);
        if (!$stmt->execute()) {    echo "init up error";  }

        SQL::Close();
    }

    ///// 下载音频
    public function download(){
        foreach (glob($this->dirNg . "*") as $file) {
            unlink($file);
        }

        $dd = date("Y-m-d");

        $DB = SQL::Connect();

        //$sql = "SELECT DISTINCT ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_audioUrl != '' AND ng_audioUrl NOT LIKE '%/audio/auto/%' AND ng_r2status = 0 AND ng_date LIKE '2023-02-18'";
        $sql = "SELECT DISTINCT ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_audioUrl != '' AND ng_audioUrl NOT LIKE '%/audio/auto/%' AND ng_r2status = 0 AND ng_date = ?";
        $stmt = $DB->prepare($sql);
        $stmt->bind_param('s', $dd);
        if (!$stmt->execute()) {    echo "download error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl);

        while ($stmt->fetch()) {
            // echo $ng_audioUrl . "<br>";

            ///音频下载
            $audio = $this->dirNg . end(explode("/", $ng_audioUrl));
            if (!file_exists($audio)) {
                exec("wget -U NoSuchBrowser/1.0 $ng_audioUrl -P " . $this->dirNg);
            }
        }

        SQL::Close();
    }

    //视频补缺模式！
    public function download_(){
        foreach (glob($this->dirNg . "*") as $file) {
            unlink($file);
        }

        $DB = SQL::Connect();

        $sql = "SELECT DISTINCT ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_r2status = 0";
        $stmt = $DB->prepare($sql);
        if (!$stmt->execute()) {    echo "download error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl);

        while ($stmt->fetch()) {
            ///
            $video = $this->dirNg . end(explode("/", $ng_videoUrl));
            if ($ng_videoUrl != "" && !file_exists($video)) {
                exec("wget -U NoSuchBrowser/1.0 $ng_videoUrl -P " . $this->dirNg);
            }
            ///音频下载
            $audio = $this->dirNg . end(explode("/", $ng_audioUrl));
            if ($ng_audioUrl != "" && !file_exists($audio)) {
                exec("wget -U NoSuchBrowser/1.0 $ng_audioUrl -P " . $this->dirNg);
            }
            ///截图
            if ($ng_videoUrl != "") {
                $this->thumbnails(end(explode("/", $ng_videoUrl)));
            }
        }

        SQL::Close();
    }


    public function initThumbnails(){
        $DB = SQL::Connect();

        $sql = "SELECT DISTINCT ng_videoUrl, ng_audioUrl FROM ng_videos WHERE ng_r2status = 1";
        $stmt = $DB->prepare($sql);
        if (!$stmt->execute()) {    echo "download error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl);

        while ($stmt->fetch()) {
            if ($ng_videoUrl != "") {
                $this->thumbnails(end(explode("/", $ng_videoUrl)));
                //echo $ng_videoUrl . "<br>";
            }
        }

        SQL::Close();
    }

    /// 截图获取
    public function thumbnails($name){
        $file = $this->dirNg . $name;  //截图保存位置和名字
        $img = $this->ngThum . $name . ".jpg";  //截图保存位置和名字

        if (file_exists($file) && !file_exists($img) && pathinfo($name,  PATHINFO_EXTENSION) == "mp4") {
            $cmd = "./model/ffmpeg -i '" . $file . "' -y -f image2 -ss 00:00:08 -vframes 1 -s 352x240 '" . $img . "' 2>&1";    //获取静态缩略图
            $result = exec($cmd);   //命令执行
        }        
    }






/// 根据手机号和验证码后获取APP token 
    public function Token($phoneNum){
        $header = array(
            "systemversion: 15.2.1", 
            "apptype: IOS", 
            "phonemodel: iPhone_11", 
            "devicename: iOS", 
            "appversion: 6.0.2");

        // 获取短信
        $options = array(
            CURLOPT_HTTPHEADER => $this->header(array_merge(array("Content-Type: application/json", "content-length: 23", "authorization: Basic " . $this->basicKey), $header)),
            CURLOPT_URL => "https://app-new.ajtmy.com/app/tsmssendlog/loginSms",
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => '{"phone":"'. $phoneNum .'"}');

        $json = json_decode($this->CURL($options));


        // 获取token json
        $options = array(
            CURLOPT_HTTPHEADER => $this->header(array_merge(array("Host: app-new.ajtmy.com", "content-type: application/x-www-form-urlencoded", "authorization: Basic " . $this->basicKey), $header)),
            CURLOPT_URL => "https://app-new.ajtmy.com/auth/oauth/token?mobile=SMS@". $phoneNum ."&code=". $json->data ."&grant_type=mobile&appVersion=6.0.2&appType=IOS&deviceName=iOS&systemVersion=15.2.1&phoneModel=iPhone_11",
             // CURLOPT_URL => "https://app-new.ajtmy.com/auth/oauth/token?mobile=SMS@". $phoneNum ."&code=1104&grant_type=mobile&appVersion=6.0.2&appType=IOS&deviceName=iOS&systemVersion=15.2.1&phoneModel=iPhone_11",
            CURLOPT_POST => 1);

        $json = json_decode($this->CURL($options));

        //
        $this->token = $json->access_token;

        echo $this->token;
    }




    public function r2(){
        $bucket_name        = "public";
        $account_id         = "64d3c365794b5f3974f3d4f22ae38ef2";
        $access_key_id      = "2f90ca0514c5cbd8aa5c53b7e6bb8379";
        $access_key_secret  = "cd4d703b5f5102d7fba8c10be5ec566feefe6ca0f950bd01797eabad86ec594d";

        $credentials = new Aws\Credentials\Credentials($access_key_id, $access_key_secret);

        $options = [
            'region' => 'auto',
            'endpoint' => "https://$account_id.r2.cloudflarestorage.com",
            'version' => 'latest',
            'credentials' => $credentials
        ];

        $s3_client = new Aws\S3\S3Client($options);

        $contents = $s3_client->listObjectsV2([
            'Bucket' => $bucket_name
        ]);

        //var_dump($contents['Contents']);
        var_dump($contents);
    }
 

    




	/// JSON格式化 ///
	function __destruct(){
		if (isset($this->json)) {
			echo json_encode($this->json , JSON_UNESCAPED_UNICODE);
		}
	}
}
