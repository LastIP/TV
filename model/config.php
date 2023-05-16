<?php
// if (session_status() == PHP_SESSION_NONE) {
// 	session_start();
// }
// ob_start();




ini_set("display_errors", 0);
error_reporting(E_ALL & ~E_NOTICE); 
date_default_timezone_set('PRC');
// set_time_limit(0);
ini_set('memory_limit', '1024M');	// 2048
ini_set('max_execution_time', '3600');	//3600s




/** MySQL host */
define('DB_HOST', '127.0.0.1' );

/** MySQL DB */
define('DB_NAME', 'mg_db' );

/** MySQL name */
define('DB_USER', 'mg' );

/** MySQL password */
define('DB_PASSWORD', 'Mmdusggar1987..');

/** MySQL charset */
define('DB_CHARSET', 'utf8mb4' );




 

/*** url ***/
define('QBLGHOST', 'mglem.com');
// define('R2HOST', 'https://r2s.dashan123.com');


/*** GIA 40 正式 ***/
define('R2HOST', 'https://r2.mglem.com'); # 视频 r2.mglem.com
define('GIAHOST', 'https://meserver.top'); # 音频 meserver.top	gia.mglem.com

/*** GIA 10 测试 ***/
// define('R2HOST', 'https://r2.fastytb.cc'); # 视频 r2.fastytb.cc
// define('GIAHOST', 'https://gia.fastytb.cc'); # 音频 meserver.top	gia.mglem.com

// https://r2s.mglem.com/mg/ng/3d2836fefb93444492a6c55d96feee74.mp3
// https://meserver.top/mg/ng/3d2836fefb93444492a6c55d96feee74.mp3




/*** 代理 ***/ //代理地址： https://www.proxydocker.com/zh/socks5-list/country/China
/*
60.190.195.146:1080
218.76.101.25:7302
221.10.151.38:1080
39.170.85.129:7302
*/

define('SOCKS5IP', '60.190.195.146');
define('SOCKS5PORT', '1080');

define('SOCKS5', '60.190.195.146:1080');