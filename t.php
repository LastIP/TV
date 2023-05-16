<?php

// $str = md5(uniqid(mt_rand(), true));


// $b = md5(explode(' ', microtime())[0]);
// var_dump(explode(' ', microtime())); 


// $str = "UU67mXFs8ro7To7V2LbeQ3Mg";

// if (substr($str, 0, 2) == "UU") {
// 	$str = substr($str, 2);
// }


// echo $a . $b;

// echo $str;
 

 // echo $_SERVER['HTTP_HOST'];

//////////////////////////////////////////////////////////////////

$url = 'http://cntv.sbs/live?id=cctv1';
$html = file_get_contents($url);
echo $html;


http://cntv.sbs/live?id=cctv1
http://mgs.com/live?id=cctv1