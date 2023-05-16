<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/model/mysql.Static.Class.php';

// if (session_status() == PHP_SESSION_NONE) {
// 	session_start();
// }

// ini_set("display_errors", 0);

class UserLogin {
	public static $json;

	// CF 服务端验证
	//curl 'https://challenges.cloudflare.com/turnstile/v0/siteverify' --data 'secret=0x4AAAAAAAA2TN3imgfTZ4xGniOvgl6MF3k&response=' . $_POST['cf-turnstile-response']
	// echo Verify::CURL($_POST['cf-turnstile-response']);
	public static function CURL($response){
	    $ch = curl_init(); 
	    curl_setopt($ch, CURLOPT_HEADER, 0 );   //0是头文件不显示  
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );   //1不输出到屏幕   
	    curl_setopt($ch, CURLOPT_TIMEOUT, 60 );         //timeout时
	    curl_setopt($ch, CURLOPT_URL, "https://challenges.cloudflare.com/turnstile/v0/siteverify" );
	    curl_setopt($ch, CURLOPT_POST, 1 );
	    curl_setopt($ch, CURLOPT_POSTFIELDS, 'secret=0x4AAAAAAAA2TN3imgfTZ4xGniOvgl6MF3k&response=' . $response );

	    $str = curl_exec($ch);  //执行
	    curl_close($ch);    //关闭

	    return json_decode($str , true)['success'];
	}
	/// 200 的化可以正常访问
	public static function httpCode($url){
		//$url = "https://" . $url;

		$ch = curl_init();

		$timeout = 6;
		
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt($ch, CURLOPT_URL,$url);

		// curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5 ); 		// 代理
	    // curl_setopt($ch, CURLOPT_PROXY, "192.168.3.28:1080" ); 		// 代理

		curl_exec($ch);

		return $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

		curl_close($ch);
	}



	/// 服务端验证后登陆验证
	public static function turnstile($user, $pass, $turnstile){
		if (UserLogin::CURL($turnstile)) {
			UserLogin::login($user, $pass);
		}
	}

	/// SQL 验证后 存储到session
	public static function login($user, $pass){
		$DB = SQL::Connect();

		$sql = "SELECT user_username, user_pass FROM t_user WHERE user_username = ? AND user_pass = ?";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('ss', $user, md5($pass));

		if (!$stmt->execute()) {  	json_encode("login error", JSON_UNESCAPED_UNICODE );  }

		$stmt->bind_result($user_username, $user_pass);
			if ($_SESSION['username'] == "" && $_SESSION['pass'] == "") {
			 	while ($stmt->fetch()) {
					$_SESSION['username'] = $user_username;
	  				$_SESSION['pass'] = $user_pass;
				}
				//setcookie("USER", md5($user), time() + 3600);
				setcookie("PASS", md5($pass), time() + 7200);
			}

		SQL::Close();
	}

	/// 判断是否函数
	public static function verify_(){
		$DB = SQL::Connect();

		if (isset($_COOKIE['PASS'])) {
		
			$sql = "SELECT user_pass FROM t_user WHERE user_pass = ?";
			$stmt = $DB->prepare($sql);
			$stmt->bind_param('s', $_COOKIE['PASS']);

			$stmt->execute();

			$stmt->bind_result($user_pass);

				while ($stmt->fetch()) {
					if ($user_pass == $_COOKIE['PASS']) {
						$status = 1;
					}
				}

		}elseif(isset($_SESSION['username']) != "" && isset($_SESSION['pass'])) {
			$status = 1;

		}else{
			$status = 0;
		}

		SQL::Close();

  		return $status;
	}

	// public static function verify__(){
	// 	if ($_SESSION['username'] != "" && $_SESSION['pass'] != "") {
  	// 		$status = 1;

  	// 	}else{
  	// 		$status = 0;
  	// 	}

  	// 	return $status;
	// }


	/// 判断是否函数
	public static function verify(){
		$ip = exec("/usr/sbin/ifconfig | /usr/bin/grep 'inet' | /usr/bin/grep -v 'inet6' | /usr/bin/awk '{print $2}' | /usr/bin/head -n 1");
		$localIp = "192.168.3.28";
		$status = 0;

		// 本机
		if (strstr($ip, $localIp)) {
  			$status = 1;
  		// 远程
  		}else{
  			// login
  			if ($_SESSION['username'] != "" && $_SESSION['pass'] != "") {
  				$status = 1;
  			// nologin
  			}else{
  				$status = 0;
  			}
  		}

  		return $status;
	}

 

 


}