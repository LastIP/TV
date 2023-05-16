<?php
// if (session_status() == PHP_SESSION_NONE) {
// 	session_start();
// }
// ob_start();




// ini_set("display_errors", 0);
//error_reporting(E_ALL & ~E_NOTICE); 
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

$GLOBALS['DB_HOST'] = "127.0.0.1";
// $GLOBALS['DB_USER'] = "mg";
// $GLOBALS['DB_NAME'] = "mg_db";
// $GLOBALS['DB_PASSWORD'] = "Mmdusggar1987..";
$GLOBALS['DB_CHARSET'] = "utf8mb4";


define( 'YTBAPIKEY', 'AIzaSyB6v05og_Zf3vKUWXQbccP3RuvBE1-7BAY' );	//p
 

/*** url ***/
define('QBLGHOST', 'mglem.com');



/*** 代理 ***/ //代理地址： https://www.proxydocker.com/zh/socks5-list/country/China
/*
60.190.195.146:1080
218.76.101.25:7302
221.10.151.38:1080
39.170.85.129:7302

*/
define('SOCKS5IP', '60.190.195.146');
define('SOCKS5PORT', '1080');


define('R2HOST', 'https://r2s.dashan123.com');
// define('R2HOST', 'https://r2s.mglem.com');

 
// https://storage.mglme.com/mg/ng/8c817ef07cd44fac83fcce80f1f0e590.mp3?response-content-type=application/octet-stream




/*** path ***/
define( 'ROOT', $_SERVER['DOCUMENT_ROOT'] . '/' );
 

define("DATA", "./DATA/");
define("DATAMEDIA", "./DATA/localMedia/");
define("DATATEXT", "./DATA/text/");

 