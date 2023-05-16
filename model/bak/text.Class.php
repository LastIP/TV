<?php
// if (session_status() == PHP_SESSION_NONE) {
// 	session_start();
// }
// ob_start();

// require_once $_SERVER['DOCUMENT_ROOT'] . '/' . 'model/config.php';
// require_once $_SERVER['DOCUMENT_ROOT'] . '/' . 'model/mysql.class.php';
// require_once $_SERVER['DOCUMENT_ROOT'] . '/' . 'controller/Sign.php';

// ini_set("display_errors", 0);
date_default_timezone_set('PRC');


class Text {
	private $arr;
	public $json;
	public $content;

	private $name = "这里标题 ...";
	private $cont = "<qblg-href> 这里内容 ... </qblg-href> <qblg-code> 这里内容 ... </qblg-code><! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>";
	


 	

	/// 获取列表
	public function list(){
		$DB = SQL::Connect();


		$sql = "SELECT text_id, text_guid, text_group, text_title, text_content, text_modi_date, text_date, text_status, text_count FROM t_text";
		
			if (!isset($_GET['key'])) {	//所有列表
				if (!UserLogin::verify()) {	 $sql = $sql . " WHERE text_status = 1 ";	}
				$sql = $sql . " ORDER BY text_date DESC";
		  			$stmt = $DB->prepare($sql);

			}elseif (isset($_GET['key'])) {	//搜索
				if (!UserLogin::verify()) {	 $sql = $sql . " WHERE text_status = 1 AND ";	}else{	$sql = $sql . " WHERE ";	}
				$sql = $sql . " (text_content LIKE ? OR text_title LIKE ? ) ORDER BY text_date DESC";
		  			$stmt = $DB->prepare($sql);
		  			$key = '%' . $key . '%';
		  			$stmt->bind_param('ss', $key, $key);
			}
			

  		if (!$stmt->execute()) {  	$this->json = "list error";  }

  		$stmt->bind_result($text_id, $text_guid, $text_group, $text_title, $text_content, $text_modi_date, $text_date, $text_status, $text_count);
  			$i = 0;
  			while ($stmt->fetch()) {
				$this->json[$i]['text_id'] =  $text_id;
				$this->json[$i]['text_guid'] =  $text_guid;
				$this->json[$i]['text_group'] =  $text_group;
				$this->json[$i]['text_title'] =  $text_title;
				$this->json[$i]['text_content'] =  $text_content;
				$this->json[$i]['text_modi_date'] =  $text_modi_date;
				$this->json[$i]['text_date'] =  $text_date;

				$this->json[$i]['text_date_int'] =  strtotime($text_date);
				$this->json[$i]['text_status'] =  $text_status;
				$this->json[$i]['text_count'] =  $text_count;
			   $i++;
			}

  		SQL::Close();
	}

 

	
	/// 根据id获取文章内容
	public function content($Id){

		$DB = SQL::Connect();

		$sql = "SELECT text_id, text_guid, text_group, text_title, text_content, text_date, text_modi_date, text_status, text_src FROM t_text";

		if ($Id == "init") {
			$sql = $sql . " WHERE text_title = ? AND text_content = ?";
	  		$stmt = $DB->prepare($sql);
	  		$stmt->bind_param('ss', $this->name, $this->cont);

  		}elseif (is_numeric($Id)) {
  		//}else {
  			if (!UserLogin::verify()) {	 $sql = $sql . " WHERE text_status = 1 AND ";	}else{	$sql = $sql . " WHERE ";	}
  			$sql = $sql . " text_id = ?";
	  		$stmt = $DB->prepare($sql);
	  		$stmt->bind_param('i', $Id);
  		}

  		if (!$stmt->execute()) {  	$this->json = "content error";  }

  		$stmt->bind_result($text_id, $text_guid, $text_group, $text_title, $text_content, $text_date, $text_modi_date, $text_status, $text_src);
  			while ($stmt->fetch()) {
				$this->json['text_id'] =  $text_id;
				$this->json['text_guid'] =  $text_guid;
				$this->json['text_group'] =  $text_group;
				$this->json['text_title'] =  $text_title;

				$this->json['text_content'] =  $text_content;
				$this->json['text_date'] =  $text_date;
				$this->json['text_modi_date'] =  $text_modi_date;
				$this->json['text_status'] =  $text_status;
				$this->json['text_src'] =  $text_src;
				//$this->json['text_comments'] =  $this->comments($text_id);
				$this->comments($text_guid);
				$this->json['text_comments'] = $this->arr;
			}

  		SQL::Close();
	}

	/// 初始化
	public function init(){
		$DB = SQL::Connect();

			$datas = date("Y-m-d G:i:s");	//获取时间
			$guid = md5(uniqid(mt_rand(), true));	//唯一id

			$sql = "INSERT INTO t_text(text_guid, text_title, text_content, text_modi_date) SELECT ?,?,?,? FROM dual WHERE NOT EXISTS(SELECT text_title, text_content FROM t_text WHERE text_title = ? AND text_content = ?)";
		
			$stmt = $DB->prepare($sql);
			$stmt->bind_param('ssssss', $guid, $this->name, $this->cont, $datas, $this->name, $this->cont);

			if (!$stmt->execute()) {   $this->json = "text init error"; 		}
		
		SQL::Close();

		// 返回初始化文章
		$this->content("init");	
	}

	/// 编辑插入或更新
	public function edit(){
		$DB = SQL::Connect();
		
		$sql = "UPDATE t_text SET text_group = ?, text_title = ?, text_content = ?, text_date = ?, text_modi_date = ?, text_src = ?, text_status = ? WHERE text_guid  = ?";

		$stmt = $DB->prepare($sql);
		$dates = date("Y-m-d G:i:s");
		$stmt->bind_param('ssssssis', $_POST['text-group'], $_POST['text-title'], $_POST['text-content'], $_POST['text-date'], $dates, $_POST['text-src'], $_POST['text-status'], $_POST['text-guid']); // 

		if (!$stmt->execute()) {   
			echo '<div style="width: 100%; height: 18px; text-align: center; color: red;">edit error</div>';  
		}else{	
			echo '<div style="width: 100%; height: 18px; text-align: center; color: green;">edit OK </div>';	
		}
		
		$DB = SQL::Close();
	}

	
	/// 删除
	public function delete(){
		$DB = SQL::Connect();
		///
		$sql = "DELETE FROM t_text WHERE text_guid = ? AND text_guid != '81f9cc567a91cb67c54733a89ab82e2d'";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $_GET['GUId']);
		
		if (!$stmt->execute()) {  $this->json = "delete 1 error"; }

		/// 留言删除
		$sql = "DELETE FROM t_comment WHERE comment_text_guid = ? ";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $_GET['GUId']);
		
		if (!$stmt->execute()) {  $this->json = "delete 2 error"; }
		
		SQL::Close();
	}

	/// count ++
	public function count(){
		$DB = SQL::Connect();

		$sql = "UPDATE t_text SET text_count = text_count + 1 WHERE text_id = ?";
		$stmt = $DB->prepare($sql);
			
		$stmt->bind_param('s', $_GET['Id']);
		if (!$stmt->execute()) {  $this->json = "count insert error"; }
		
		$DB = SQL::Close();
	}

	
	////////////////////////////
	public function comments($GUId){	//text_id
		$DB = SQL::Connect();

		$sql = "SELECT comment_text_guid, comment_post FROM t_comment WHERE comment_text_guid = ? ORDER BY comment_id DESC";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $GUId);
		if (!$stmt->execute()) {   $this->json = "comments error"; 		}

		$stmt->bind_result($comment_text_guid, $comment_post);
  			$i = 0;
  			while ($stmt->fetch()) {
				$this->arr[$i]['comment_text_guid'] =  $comment_text_guid	;
				$this->arr[$i]['comment_post'] =  $comment_post;
			   $i++;
			}
	}


	public function commentInsert(){
		$DB = SQL::Connect();

		$sql = "INSERT INTO t_comment(comment_text_guid, comment_post, comment_date) VALUES(?, ?, ?)";
		$stmt = $DB->prepare($sql);
		$dates = date("Y-m-d G:i:s");

		$stmt->bind_param('sss', $_POST['text-guid'], $_POST['comment-input'], $dates); 

		if (!$stmt->execute()) {   $this->json = "comment Insert error"; 		}


		SQL::Close();
	}

	////////////
	public function test(){
		// $DB = SQL::Connect();

		// $sql = "SELECT text_id FROM t_text";
		// $stmt = $DB->prepare($sql);

		// if (!$stmt->execute()) {   $this->json = "test error"; 		}

		// $stmt->bind_result($text_id);
  		// 	while ($stmt->fetch()) {
		// 		$this->GUIDInsert($text_id);
		// 	}

  		// SQL::Close();	

  		for ($i=0; $i < 300000; $i++) { 
  			$this->GUIDInsert();
  		}
  		//
  		// $this->GUIDInsert();
	}

	public function GUIDInsert(){
		//$guid = md5(uniqid(mt_rand(), true));
		$guid = uniqid(mt_rand(100000,999999), true);
		$guid = str_replace(".", "", $guid);

		$DB = SQL::Connect();
	
		//$sql = "DELETE FROM t_test WHERE test_id > 0";
		$sql = "INSERT INTO t_test(test_guid) VALUES(?)";
		$stmt = $DB->prepare($sql);
		$stmt->bind_param('s', $guid); 

		if (!$stmt->execute()) {  	$this->json = '<div style="width: 100%; height: 18px; text-align: center; color: red;">GUIDInsert error</div>';  }
		
		SQL::Close();
	}


	/// 文本文件插入
	public function insert(){
		$DB = SQL::Connect();

		foreach (glob(DATATEXT . "lang/*") as $path) {
			if ( is_dir($path) && !strpos($path,'bak') == true && !strpos($path,'img') == true ) {
				//$this->json['dir'][] = $path;
			}else{
				$name = end(explode("/", $path));
				$cont = file_get_contents($path);
				$d = date("Y-m-d G:i:s");

				$sql = "INSERT INTO t_text(text_group, text_title, text_content, text_modi_date) SELECT ?,?,?,? FROM dual WHERE NOT EXISTS(SELECT text_title FROM t_text WHERE text_title = ?)";
		
				$stmt = $DB->prepare($sql);
			  	$stmt->bind_param('sssss', $_GET['group'], $name, $cont, $d, $name);

			  	if (!$stmt->execute()) {  $this->json = "insert text error"; }else{		$this->json = "insert text ok";	}
			}
		}

		SQL::Close();
 
	}

	/// 搜索
	// public function search(){
	// 	$DB = SQL::Connect();

	// 	//$sql = "SELECT text_id, text_title, text_content, text_modi_date, text_date FROM t_text WHERE (text_title LIKE ? OR text_content LIKE ?) ORDER BY text_id DESC";
	// 	$sql = "SELECT text_id, text_title, text_content, text_modi_date, text_date FROM t_text WHERE text_content LIKE ? ORDER BY text_id DESC";
  	// 	$stmt = $DB->prepare($sql);
  	// 	$key = '%' . $_GET['key'] . '%';
  	// 	//$stmt->bind_param('ss', $key, $key);
  	// 	$stmt->bind_param('s', $key);

  	// 	if (!$stmt->execute()) {  	$this->json = "search error";  }

  	// 	$stmt->bind_result($text_id, $text_title, $text_content, $text_modi_date, $text_date);
  	// 		$i = 0;
  	// 		while ($stmt->fetch()) {
	// 			$this->json[$i]['text_id'] =  $text_id;
	// 			$this->json[$i]['text_title'] =  $text_title;
	// 			$this->json[$i]['text_content'] =  $text_content;
	// 			$this->json[$i]['text_modi_date'] =  $text_modi_date;
	// 			$this->json[$i]['text_date'] =  $text_date;
	// 		   $i++;
	// 		}

  	// 	SQL::Close();
	// }


 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public function fileList($dir){
		foreach (glob(ROOT . $dir."/*") as $path) {
			if ( is_dir($path) && !strpos($path,'bak') == true && !strpos($path,'img') == true ) {
				$this->json['dir'][] = $this->pathFilter($path);
			}else{
				$this->json['files'][] = $this->pathFilter($path);
			}
		}
	}

	/// 获取文档 ///
	public function fileContent($path){
		$this->json['path'] = $path;

		//$path = $this->pathFilter('../' . $path);
		$path = $this->pathFilter($path);
		$tit = str_replace( ".html", "", end(explode( '/' , $path )));

		$this->json['tit'] = $tit;
		//$this->json['cont'] = '<h5>' . $tit . '</h5><hr>' . file_get_contents($path);
		//$this->json['cont'] = file_get_contents($path);
		$this->json['cont'] = str_replace('<pre class="prettyprint">', '<pre><code class="language-css">', file_get_contents($path));
		$this->json['cont'] = str_replace('</pre>', '</code></pre>', $this->json['cont']);
	 
 

		/// 图片替换
		$this->json['cont'] = str_replace('``{', '<img src="' .  DATATEXT . 'textimgs/', $this->json['cont']);
		$this->json['cont'] = str_replace('}``', '" class="img-fluid col-12 col-md-8 img-thumbnail" alt="Responsive image">', $this->json['cont']);
		
		$this->fileMedia(DATATEXT . '歌词/*');

		$_SESSION['n'] = 0;
	}

	private function pathFilter($path){
		$path =str_replace(ROOT , '' , $path);

		return $path;
	}
	public function fileMedia($dir){
		foreach (glob($dir) as $value) {
			
			if(is_dir($value)) {
				$value = $value . "/*";
				$this->fileMedia($value);
			}else{
				if (strstr($value, $this->json['tit']) != false && (pathinfo($value)['extension'] == "flac" || pathinfo($value)['extension'] == "mp3" || pathinfo($value)['extension'] == "m4a" || pathinfo($value)['extension'] == "wav" || pathinfo($value)['extension'] == "mp4")) {
					$this->json['audio'] = $value;
					//$this->json['audio'] = Sign::CDN("a" , str_replace("../data/" , "" , $value));
				}
			}
		}
	}





	/// JSON格式化 ///
	function __destruct(){
		if (isset($this->json)) {
			echo json_encode($this->json , JSON_UNESCAPED_UNICODE);
		}
	}
}
