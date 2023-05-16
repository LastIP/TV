<?php
/*
2023 04 27

ffmpeg -i 20230327PM.mp4 -y -f image2 -ss 00:00:33 -vframes 1 -s 352x240 20230327PM.mp4.jpg
ffmpeg -i 20230327PM.mp4 20230327PM.mp3

*/




class Ng 
{
	private $phone = "13779372761";
	private $userId = "1634020215906742273";
	private $basicToken = "Y3VzdG9tOmN1c3RvbQ==";
	private $token = "9e7f04b9-3e97-470d-9f17-4263238a1c55";

	// public $mediaDir = "data/localMedia/";
	// public $ngThum = "data/ng-thumbnail/";
    // public $r2mgVideos = R2HOST . "/mg/ng/";
    // public $sanHost = GIAHOST . "/mg/ng/";
    // public $ngStatic = "data/localMedia/";

    public $mediaDir = "data/localMedia/";
    public $thumDir = "data/ng-thumbnail/";

	///// CURL //////
    private function CURL($options){
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_HEADER, 0 );   //0是头文件不显示  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );   //1不输出到屏幕   
        curl_setopt($ch, CURLOPT_TIMEOUT, 120 );         //timeout时
        //socks代理
	    curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5 ); 		// 代理
	    curl_setopt($ch, CURLOPT_PROXY, SOCKS5 ); 		// 代理
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

        curl_setopt_array($ch, $options);   //数组设置
        $str = curl_exec($ch);  //执行
        curl_close($ch);    //关闭

        return $str;
    }



    ///// recordList //////
    public function recordList(){
        $DB = SQL::Connect();

        $sql = "SELECT record_title, record_file , record_lang, record_day, record_date FROM ng_record ";
        $stmt = $DB->prepare($sql);
        //$stmt->bind_param('s', $lang);
        if (!$stmt->execute()) {    $json = "record error";  }

        $stmt->bind_result($record_title, $record_file , $record_lang, $record_day, $record_date);
   			$i = 0;
            while ($stmt->fetch()) {
                $json[$i]['title'] = $record_title;
                $json[$i]['lang'] = $record_lang;
                $json[$i]['day'] = $record_day;
                $json[$i]['date'] = $record_date;
                $json[$i]['file'] = $record_file;
                $json[$i]['path'] = $this->recordPaths($record_file);
 
                $i++;   
            }

        SQL::Close();

        return $json;
    }

    ///// 路径处理 //////
    public function recordPaths($file){
    	$name = str_replace(".mp4", "", $file);
    	// $name = str_replace(".mp3", "", $name);

    	$mp4 = $this->mediaDir . $name . ".mp4";
    	$r2mp4 = R2HOST . "/mg/ng/" . $name . ".mp4";	//直接R2

    	$img = $this->thumDir . $name . ".mp4.jpg";
    	$r2img = GIAHOST . "/mg/ng-thumbnail/" . $name . ".mp4.jpg";	//走gia

    	$mp3 = $this->mediaDir . $name . ".mp3";
    	$r2mp3 = GIAHOST . "/mg/ng/" . $name . ".mp3";		//走gia

    	/// 视频
        if (file_exists($mp4)) {    $path['video'] = $mp4;  }else{  $path['video'] = $r2mp4;    }
    	//if (file_exists($mp4)) {	$path['video'] = $r2mp4;	}
    	/// 图片
    	if (file_exists($img)) {		$path['img'] = $img;	}else{		$path['img'] = $r2img;	}
    	/// 音频
    	if (file_exists($mp3)) {	$path['audio'] = $mp3; 	}else{	$path['audio'] = $r2mp3;	}
    		

    	return $path;
    }

    ///// 视频转换MP3 和 截图获取 //////
    public function recordMp3Thumbnails($value){
        $nameExt = end(explode("/", $value));

        $file = $this->mediaDir . $nameExt;
        $img = $this->thumDir . $nameExt . ".jpg";  //截图保存位置和名字

        $name = $nameExt;
        $name = str_replace(".mp4", ".mp3", $name);
        $mp3 = $this->mediaDir . $name;
        
       	if (file_exists($file) && pathinfo($nameExt,  PATHINFO_EXTENSION) == "mp4") {
            $initImg = "./model/ffmpeg -i '" . $file . "' -y -f image2 -ss 00:00:08 -vframes 1 -s 352x240 '" . $img . "' 2>&1";    //获取静态缩略图
            $initMp3 = "./model/ffmpeg -i '" . $file . "' '" . $mp3 . "' 2>&1";   

            if (!file_exists($img)) {	$result = exec($initImg); 	}
            if (!file_exists($mp3)) {	$result = exec($initMp3);		}
        }        
    }


    ///// 初始化入口 //////
    public function init(){
    	$recordJson = $this->recordList();

       // print_r($recordJson);

    	for ($i=0; $i < count($recordJson); $i++) { 
            $file = $this->mediaDir . $recordJson[$i]['file'];
           // echo $file . "<br>";
    		$this->recordMp3Thumbnails($file);
    	}
    }





    ///// 获取蒙语和中文音频 //////
    public function list($lang){
        $DB = SQL::Connect();

        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videos ";

        if ($lang == "1") {     //中文音频
            $sql = $sql . " WHERE ng_courseLanguage = ? AND ng_audioUrl != '' AND ng_r2status = 1 ORDER BY ng_date DESC";

        }elseif($lang == "2"){      //英文音频
            $sql = $sql . " WHERE ng_courseLanguage = ? AND ng_audioUrl != '' AND ng_r2status = 1 ORDER BY ng_date DESC";
        }

        $stmt = $DB->prepare($sql);
        $stmt->bind_param('s', $lang);


        if (!$stmt->execute()) {    $json = "videos error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_courseLanguage, $ng_date, $ng_r2status);
            $i = 0;
            while ($stmt->fetch()) {
                //$json[$i]['ng_videoUrl'] = $ng_videoUrl;
                $json[$i]['ng_audioUrl'] = $this->path($ng_audioUrl);
                $json[$i]['ng_duration'] = $this->timeType($ng_duration);
                $json[$i]['ng_courseLanguage'] = $ng_courseLanguage;
                $json[$i]['ng_date'] = $ng_date;
                $json[$i]['ng_r2status'] = $ng_r2status;
                $i++;   
            }

        SQL::Close();

        return $json;
    }

    ///// 获取视频列表 //////
    public function videoList($lang){
        $DB = SQL::Connect();

        $sql = "SELECT ng_videoUrl, ng_audioUrl, ng_duration, ng_courseLanguage, ng_date, ng_r2status FROM ng_videos ";

        if ($lang == "2") {     //蒙文视频
            $sql = $sql . " WHERE ng_courseLanguage = ? AND ng_videoUrl != '' AND ng_r2status = 1 ORDER BY ng_date DESC";
       }

        $stmt = $DB->prepare($sql);
        $stmt->bind_param('i', $lang);


        if (!$stmt->execute()) {    $json = "videos error";  }

        $stmt->bind_result($ng_videoUrl, $ng_audioUrl, $ng_duration, $ng_courseLanguage, $ng_date, $ng_r2status);
            $i = 0;
            while ($stmt->fetch()) {
             
                $json[$i]['ng_videoUrl'] = $this->path($ng_videoUrl);
                $json[$i]['ng_duration'] = $this->timeType($ng_duration);
                $json[$i]['ng_courseLanguage'] = $ng_courseLanguage;
                $json[$i]['ng_date'] = $ng_date;
                $json[$i]['ng_r2status'] = $ng_r2status;
                $i++;   
            }

        SQL::Close();

        return $json;
    }
    



    ///// 音频或视频的路径处理 /////
    private function path($url){
        $name = end(explode("/", $url));
        $local = $this->mediaDir . $name;

        //视频走r2
        if (pathinfo($name,  PATHINFO_EXTENSION) == "mp4") {
            $r2 = R2HOST . "/mg/ng/" . $name;     //走gia
        }
        //音频走GIA
        if (pathinfo($name,  PATHINFO_EXTENSION) == "mp3") {
            $r2 = GIAHOST . "/mg/ng/" . $name;     //走gia
        }

        $img = $this->thumDir . $name . ".jpg";
        $r2img = GIAHOST . "/mg/ng-thumbnail/" . $name . ".jpg";    //走gia

        if (file_exists($local)) {    $arr['file'] = $local;  }else{  $arr['file'] = $r2;    }
        if (file_exists($img)) {    $arr['img'] = $img;  }else{  $arr['img'] = $r2img;    }

        return $arr;
    }

    ///// 时间格式处理 /////
    private function timeType($seconds){
        if ($seconds > 3600) {
            $hours = intval($seconds / 3600);
            $time = $hours . ":" . gmstrftime('%M:%S', $seconds);
        } else {
            $time = gmstrftime('%H:%M:%S', $seconds);
        }

        return $time;
    }


}