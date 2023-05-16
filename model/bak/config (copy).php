<?php
//error_reporting(E_ALL & ~E_NOTICE); 

/** MySQL host */
set_time_limit(0);
ini_set('memory_limit', '3072M');	// 2048
ini_set('max_execution_time', '3600');	//3600s


/** MySQL host */
define( 'DB_HOST', '127.0.0.1' );

/** MySQL DB */
define( 'DB_NAME', 'qblg_db' );

/** MySQL name */
define( 'DB_USER', 'qblg' );

/** MySQL password */
define( 'DB_PASSWORD', 'Sduqbgar19611..' );

/** MySQL charset */
// define( 'DB_CHARSET', 'utf8' );
define( 'DB_CHARSET', 'utf8mb4' );



/** YouTuBe API  最多2000个视频 			*/ 
define( 'YTBAPIKEY', 'AIzaSyB6v05og_Zf3vKUWXQbccP3RuvBE1-7BAY' );	//p




/*** url ***/
define( 'QBLGHOST', 'qblg.cc' );
//define( 'QBLGHOST', 'qblg.com' );


/*** path ***/
define( 'ROOT', $_SERVER['DOCUMENT_ROOT'] . '/' );
// define( 'DATA', '../DATA/' );
// define( 'DATAMEDIA', '../DATA/media/' );
// define( 'DATATEXT', '../DATA/text/' );

define("DATA", "./DATA/");
define("DATAMEDIA", "./DATA/localMedia/");
define("DATATEXT", "./DATA/text/");

 