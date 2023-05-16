<?php


/*

频道列表
2 蒙语文化频道
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=0&fid=831
1 蒙语频道
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=0&fid=830
https://mapi.m2oplus.nmtv.cn/api/v1/column.php?&count=12&offset=12&fid=830


频道内列表
http://www.nmtv.cn/folder292/folder663/folder301/folder831/folder864

节目列表
https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=0&count=24&column_id=864
https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=12&count=12&column_id=864


https://mapi.m2oplus.nmtv.cn/api/v1/contents.php?offset=0&count=24&column_id=1395



******* 直播 ************
https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=164
https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=163

https://live9.m2oplus.nmtv.cn/00/playlist.m3u8?sign=ad62e28402658e123dbc5ad6f4935b53&t=1683188208


这里有直播地址
https://live4.m2oplus.nmtv.cn/04/playlist.m3u8?sign=150b5703a3c244119f942e170d886786&t=1683197482

 
*/




class Tv {
	private function CURL($options){
		$ch = curl_init(); 
    	curl_setopt($ch, CURLOPT_HEADER, 0 ); 	//0是头文件不显示	
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 ); 	//1不输出到屏幕	
    	curl_setopt($ch, CURLOPT_TIMEOUT, 1200 ); 		//timeout时
    	//curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1800 ); 		//timeout时
    	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json') ); 		//
    	//curl_setopt($ch, CURLOPT_POST,true);	// post请求
    	//curl_setopt($ch, CURLOPT_POSTFIELDS, "");

    	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    	curl_setopt_array($ch, $options);	//数组设置
    	$str = curl_exec($ch);	//执行
		curl_close($ch);	//关闭

		return $str;
	}	



	public function get($id){	

		$requesHeader = array(
		"Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"Accept-Encoding:gzip, deflate, br",
		"Accept-Language:en-US,en;q=0.9",
		"Cache-Control:max-age=0",
		"Connection:keep-alive",
		"Cookie:_gscu_977640069=83187386eiyvmn15; _gscbrs_977640069=1; _gscs_977640069=83187386ssxn4r15|pv:6",
		"Host:mapi.m2oplus.nmtv.cn",
		"Sec-Ch-Ua:\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
		"Sec-Ch-Ua-Mobile:?0",
		"Sec-Ch-Ua-Platform:\"Linux\"",
		"Sec-Fetch-Dest:document",
		"Sec-Fetch-Mode:navigate",
		"Sec-Fetch-Site:none",
		"Sec-Fetch-User:?1",
		"Upgrade-Insecure-Requests:1",
		"User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");


		//$options = array(CURLOPT_URL => "https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=163");
		$options = array(CURLOPT_URL => "https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=". $id ."&zone=0");
		$json = json_decode($this->CURL($options));
		//$json = $this->CURL($options);


		for ($i=0; $i < count($json); $i++) { 
			if (strstr($json[$i]->m3u8, "/playlist.m3u8")) {
				$urlHead = explode("playlist.m3u8", $json[$i]->m3u8)[0];


				$options = array(CURLOPT_URL => $json[$i]->m3u8);
				$str = $this->CURL($options);


				$liveUrl = $urlHead . strstr($str, "hd/live.m3u8");
				
				return $liveUrl;
			}
		}
	}
	public function channels(){	
		$DB = SQL::Connect();

		$sql = "SELECT tv_ids, tv_name, tv_url FROM t_tv ";
		$stmt = $DB->prepare($sql);
		// $stmt->bind_param('s', $GUId);
		if (!$stmt->execute()) {   echo "channels error"; 		}

		$stmt->bind_result($tv_ids, $tv_name, $tv_url);
  			$i = 0;
  			while ($stmt->fetch()) {
				$this->arr[$i]['tv_ids'] =  $tv_ids;
				$this->arr[$i]['tv_name'] =  $tv_name;
				$this->arr[$i]['tv_url'] =  $tv_url;
			   $i++;
			}

		SQL::Close();	

		// $url['163'] = $this->get(163);
		// $url['164'] = $this->get(164);

		return $this->arr;
	}


	public function init($num){	
		$url = $this->get($num);
		

		$DB = SQL::Connect();

		//$sql = "INSERT IGNORE INTO t_tv(tv_ids, tv_url) VALUES (?, ?)";
		$sql = "UPDATE t_tv SET tv_ids = ?, tv_url = ? WHERE tv_ids  = ?";
		$stmt = $DB->prepare($sql);
		$url = str_replace("\n", "", $url);
		$stmt->bind_param('isi', $num, $url, $num);
		if (!$stmt->execute()) {  echo "init error"; }

		SQL::Close();

		//echo $url;
	}


	public function get_($id){	

		$requesHeader = array(
		"Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"Accept-Encoding:gzip, deflate, br",
		"Accept-Language:en-US,en;q=0.9",
		"Cache-Control:max-age=0",
		"Connection:keep-alive",
		"Cookie:_gscu_977640069=83187386eiyvmn15; _gscbrs_977640069=1; _gscs_977640069=83187386ssxn4r15|pv:6",
		"Host:mapi.m2oplus.nmtv.cn",
		"Sec-Ch-Ua:\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
		"Sec-Ch-Ua-Mobile:?0",
		"Sec-Ch-Ua-Platform:\"Linux\"",
		"Sec-Fetch-Dest:document",
		"Sec-Fetch-Mode:navigate",
		"Sec-Fetch-Site:none",
		"Sec-Fetch-User:?1",
		"Upgrade-Insecure-Requests:1",
		"User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36");


		//$options = array(CURLOPT_URL => "https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=163");
		$options = array(CURLOPT_URL => "https://mapi.m2oplus.nmtv.cn/api/v1/program.php?channel_id=" . $id);
		$json = json_decode($this->CURL($options));
		//$json = $this->CURL($options);


		for ($i=0; $i < count($json); $i++) { 
			if (strstr($json[$i]->m3u8, "/playlist.m3u8")) {
				// echo $json[$i]->m3u8 . "<br>";
				$urlHead = explode(".", $json[$i]->m3u8)[0];
				//echo $json[$i]->m3u8;

				$options = array(CURLOPT_URL => $json[$i]->m3u8);
				$str = $this->CURL($options);
				//$liveUrl = explode(" ", $str);
				//echo $liveUrl;
				//print_r($liveUrl);
				//$liveUrl = "https://live4.m2oplus.nmtv.cn/04/" . strstr($str, "hd/live.m3u8");
				$liveUrl = $urlHead . ".m2oplus.nmtv.cn/04/" . strstr($str, "hd/live.m3u8");
				return $liveUrl;

	 
				//return $url;
				//break;
			}
		}
	}


	function cntv($url){
		$options = array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_URL => $url
		);
		//$m3u8 = json_decode($this->CURL($options));
		$m3u8 = $this->CURL($options);


		//$myfile = fopen("list.m3u8", "w")
		//print_r($m3u8);
		//return $m3u8;

		$m3u8File = "list.m3u8";

		$myfile = fopen($m3u8File, "w") or die("Unable to open file!");
 
		fwrite($myfile, $m3u8);
		fclose($myfile);
	}

	


}