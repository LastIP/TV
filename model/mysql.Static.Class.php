<?php
 

class SQL {
	public static $db;


	public static function Connect() {
		self::$db = new MySQLi(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		self::$db->set_charset(DB_CHARSET);

		if(self::$db->connect_errno){	
		    echo die("MySQLi链接错误！" . self::$db->connect_error);
		}else{	
		    //echo "MySQLi链接成功";
		    return self::$db;
		}
	}

	//mysql 关闭
	public static function Close() {
		if (!self::$db->close()) {
			echo "MySQL 关闭错误";
		}
	}
}








?>