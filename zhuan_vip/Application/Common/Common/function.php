<?php

function get_user_group($userid){
	return 'LV0';
}

function get_groupname($groupid){
    if ($groupid == 0) {
        return "注册会员";
    }
    $name = M('user_group')->where(array('groupid'=>$groupid))->getField('name');
    return $name;
}


function get_authority($id){
    if ($id == 0) {
        return "无权限";
    }
    $title = M('auth')->where(array('id' => $id))->getField('title');
    return $title;
}

function get_admin_auth($adminid,$title){
    $info = M('admin')->where(array('adminid' => $adminid))->getField($title);
    return $info;
}

function get_user_avatar($userid){
	$headpic=M('User')->where(array('userid'=>$userid))->getField('headpic');
	if(empty($avatar)){
		$headpic=__ROOT__.'/Public/User/images/avatar.gif';
	}else{
		$avatar=__ROOT__.'/'.$headpic;
	}
	return $avatar;
}
	
function get_user_point($userid){
	$point=M('User')->where(array('userid'=>$userid))->getField('point');
	return $point;
}


function countnum($catid){
	$csql =  M('Category')->field('count(*) as c_num')->where(array('pid'=>$catid))->find();
	return $csql['c_num'];
}

				
function get_user_nickname($userid){
	$info=M('User')->where(array('userid'=>$userid))->find();
	if(empty($info['nickname']))$info['nickname']=$info['username'];
	return $info['nickname'];
}

function  catid_str($catid){
	    $cate= M('Category');
		$list=$cate->select();
		$list=getSubs($list,$catid);
		$str='';
		foreach($list as $k1=>$v1){
			
			$str.=$v1['catid'].',';
			}
		$str=substr($str,0,-1);	
		if($str==''){
			$str=$catid;
		}else{
			$str=$catid.','.$str;
			}
		return $str;
}

function get_catname($catid,$title){
	$info = M('Category')->where(array('catid'=>$catid))->getField($title);
	return $info;
}
		
function get_article_count($catid){
	return M('Article')->where(array('catid'=>$catid))->count();
}	
	

function p($data){
	if(empty($data)) return false ;
	if (is_array($data) || is_object($data)) {
		echo '<pre>';
		print_r($data);
		echo '</pre>';
	}elseif (is_string($data) || is_int($data)) {
		echo '<pre><h2>';
		echo $data;
		echo '</h2></pre>';
	}else{
		var_dump($data);
	}
}

function getpage($count, $pagesize = 10) {
    $p = new Think\Page($count, $pagesize);
    //$p->setConfig('header', '<li class="jl">%NOW_PAGE%/%TOTAL_PAGE%</li>');
	//<li class="jl">共<b>%TOTAL_ROW%</b>条记录&nbsp;第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>
    $p->setConfig('prev', '上一页');
    $p->setConfig('next', '下一页');
    $p->setConfig('last', '末页');
    $p->setConfig('first', '首页');
    //$p->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');
    $p->lastSuffix = false;//最后一页不显示为总页数
    return $p;
}


/**
* 删除目录及目录下所有文件或删除指定文件
* @param str $path   待删除目录路径
* @param int $delDir 是否删除目录，1或true删除目录，0或false则只删除文件保留目录（包含子目录）
* @return bool 返回删除状态
*/
function delDirAndFile($path, $delDir = FALSE) {
	$message = "";
	$handle = opendir($path);
	if ($handle) {
		while (false !== ( $item = readdir($handle) )) {
			if ($item != "." && $item != "..") {
				if (is_dir("$path/$item")) {
					$msg = delDirAndFile("$path/$item", $delDir);
					if ( $msg ){
						$message .= $msg;
					}
				} else {
					$message .= "删除文件" . $item;
					if (unlink("$path/$item")){
						$message .= "成功<br />";
					} else {
						$message .= "失败<br />";
					}
				}
			}
		}
		closedir($handle);
		if ($delDir){
			if ( rmdir($path) ){
				$message .= "删除目录" . dirname($path) . "<br />";
			} else {
				$message .= "删除目录" . dirname($path) . "失败<br />";
			}
		}
	} else {
		if (file_exists($path)) {
			if (unlink($path)){
				$message .= "删除文件" . basename($path) . "<br />";
			} else {
				$message .= "删除文件" + basename($path) . "失败<br />";
			}
		} else {
			$message .= "文件" + basename($path) . "不存在<br />";
		}
	}
	return $message;
}

function format_bytes($size, $delimiter = '') {
    $units = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
    for ($i = 0; $size >= 1024 && $i < 5; $i++) $size /= 1024;
    return round($size, 2) . $delimiter . $units[$i];
}


/**
 * 返回经addslashes处理过的字符串或数组
 * @param $string 需要处理的字符串或数组
 * @return mixed
 */
function new_addslashes($string){
	if(!is_array($string)) return addslashes($string);
	foreach($string as $key => $val) $string[$key] = new_addslashes($val);
	return $string;
}

/**
 * 返回经stripslashes处理过的字符串或数组
 * @param $string 需要处理的字符串或数组
 * @return mixed
 */
function new_stripslashes($string) {
	if(!is_array($string)) return stripslashes($string);
	foreach($string as $key => $val) $string[$key] = new_stripslashes($val);
	return $string;
}

/**
 * 返回经htmlspecialchars处理过的字符串或数组
 * @param $obj 需要处理的字符串或数组
 * @return mixed
 */
function new_html_special_chars($string) {
	if(!is_array($string)) return htmlspecialchars($string,ENT_QUOTES,'utf-8');
	foreach($string as $key => $val) $string[$key] = new_html_special_chars($val);
	return $string;
}

function new_html_entity_decode($string) {
	if(!is_array($string)) return html_entity_decode($string,ENT_QUOTES,'utf-8');
	foreach($string as $key => $val) $string[$key] = new_html_entity_decode($val);
	return $string;
}

function new_htmlentities($string) {
	return htmlentities($string,ENT_QUOTES,'utf-8');
}

function str_cut($string, $length, $dot = '...') {
	$strlen = strlen($string);
	if($strlen <= $length) return $string;
	$string = str_replace(array(' ','&nbsp;', '&amp;', '&quot;', '&#039;', '&ldquo;', '&rdquo;', '&mdash;', '&lt;', '&gt;', '&middot;', '&hellip;'), array('∵',' ', '&', '"', "'", '“', '”', '—', '<', '>', '·', '…'), $string);
	$strcut = '';
	$length = intval($length-strlen($dot)-$length/3);
	$n = $tn = $noc = 0;
	while($n < strlen($string)) {
		$t = ord($string[$n]);
		if($t == 9 || $t == 10 || (32 <= $t && $t <= 126)) {
			$tn = 1; $n++; $noc++;
		} elseif(194 <= $t && $t <= 223) {
			$tn = 2; $n += 2; $noc += 2;
		} elseif(224 <= $t && $t <= 239) {
			$tn = 3; $n += 3; $noc += 2;
		} elseif(240 <= $t && $t <= 247) {
			$tn = 4; $n += 4; $noc += 2;
		} elseif(248 <= $t && $t <= 251) {
			$tn = 5; $n += 5; $noc += 2;
		} elseif($t == 252 || $t == 253) {
			$tn = 6; $n += 6; $noc += 2;
		} else {
			$n++;
		}
		if($noc >= $length) {
			break;
		}
	}
	if($noc > $length) {
		$n -= $tn;
	}
	$strcut = substr($string, 0, $n);
	$strcut = str_replace(array('∵', '&', '"', "'", '“', '”', '—', '<', '>', '·', '…'), array(' ', '&amp;', '&quot;', '&#039;', '&ldquo;', '&rdquo;', '&mdash;', '&lt;', '&gt;', '&middot;', '&hellip;'), $strcut);
	 
	return $strcut.$dot;
}

	
/*单图片上传*/
function uploadPic($load='Default'){
	$site = M('Site');
	$size = $site->where('siteid = 1')->getField('file_size');
	$size = intval($size)*1048576;
	$upload = new \Think\Upload();
	$upload->maxSize   =     $size;
	$upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');
	$upload->savePath  =     './'.$load.'/';
	$upload->autoSub = true;
	$info   =   $upload->upload();
	if(!$info) {// 上传错误提示错误信息
	$this->error($upload->getError());
	}else{// 上传成功 获取上传文件信息
		foreach($info as $file){
			$picture=$file['savepath'].$file['savename'];
		}
	}
	$picture_url = str_replace('./',__ROOT__.'/Uploads/',$picture);
	return $picture_url;
}

/*生成缩略图*/
function thumb($picture_url){
	$image = new \Think\Image(); 
	$image->open($picture_url);
	$image->thumb(200, 200,\Think\Image::IMAGE_THUMB_FIXED)->save($picture_url);
	return $picture_url;
}		


/**
 * 安全过滤函数
 *
 * @param $string
 * @return string
 */
function safe_replace($string) {
	$string = str_replace('%20','',$string);
	$string = str_replace('%27','',$string);
	$string = str_replace('%2527','',$string);
	$string = str_replace('*','',$string);
	$string = str_replace('"','&quot;',$string);
	$string = str_replace("'",'',$string);
	$string = str_replace('"','',$string);
	$string = str_replace(';','',$string);
	$string = str_replace('<','&lt;',$string);
	$string = str_replace('>','&gt;',$string);
	$string = str_replace("{",'',$string);
	$string = str_replace('}','',$string);
	$string = str_replace('\\','',$string);
	return $string;
}

/**
 * xss过滤函数
 *
 * @param $string
 * @return string
 */
function remove_xss($string) { 
    $string = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/S', '', $string);

    $parm1 = Array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');

    $parm2 = Array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');

    $parm = array_merge($parm1, $parm2); 

	for ($i = 0; $i < sizeof($parm); $i++) { 
		$pattern = '/'; 
		for ($j = 0; $j < strlen($parm[$i]); $j++) { 
			if ($j > 0) { 
				$pattern .= '('; 
				$pattern .= '(&#[x|X]0([9][a][b]);?)?'; 
				$pattern .= '|(&#0([9][10][13]);?)?'; 
				$pattern .= ')?'; 
			}
			$pattern .= $parm[$i][$j]; 
		}
		$pattern .= '/i';
		$string = preg_replace($pattern, ' ', $string); 
	}
	return $string;
}

/**
 * 获取当前页面完整URL地址
 */
function get_url() {
	$sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
	$php_self = $_SERVER['PHP_SELF'] ? safe_replace($_SERVER['PHP_SELF']) : safe_replace($_SERVER['SCRIPT_NAME']);
	$path_info = isset($_SERVER['PATH_INFO']) ? safe_replace($_SERVER['PATH_INFO']) : '';
	$relate_url = isset($_SERVER['REQUEST_URI']) ? safe_replace($_SERVER['REQUEST_URI']) : $php_self.(isset($_SERVER['QUERY_STRING']) ? '?'.safe_replace($_SERVER['QUERY_STRING']) : $path_info);
	return $sys_protocal.(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '').$relate_url;
}

/**
* 产生随机字符串
*
* @param    int        $length  输出长度
* @param    string     $chars   可选的 ，默认为 0123456789
* @return   string     字符串
*/
function random($length, $chars = '0123456789') {
	$hash = '';
	$max = strlen($chars) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $chars[mt_rand(0, $max)];
	}
	return $hash;
}


/**
* 字符串加密、解密函数
*
*
* @param	string	$txt		字符串
* @param	string	$operation	ENCODE为加密，DECODE为解密，可选参数，默认为ENCODE，
* @param	string	$key		密钥：数字、字母、下划线
* @param	string	$expiry		过期时间
* @return	string
*/
function sys_auth($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
	$ckey_length = 4;
	$key = md5($key != '' ? $key : C('AUTH_KEY'));
	$keya = md5(substr($key, 0, 16));
	$keyb = md5(substr($key, 16, 16));
	$keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';

	$cryptkey = $keya.md5($keya.$keyc);
	$key_length = strlen($cryptkey);

	$string = $operation == 'DECODE' ? base64_decode(strtr(substr($string, $ckey_length), '-_', '+/')) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
	$string_length = strlen($string);

	$result = '';
	$box = range(0, 255);

	$rndkey = array();
	for($i = 0; $i <= 255; $i++) {
		$rndkey[$i] = ord($cryptkey[$i % $key_length]);
	}

	for($j = $i = 0; $i < 256; $i++) {
		$j = ($j + $box[$i] + $rndkey[$i]) % 256;
		$tmp = $box[$i];
		$box[$i] = $box[$j];
		$box[$j] = $tmp;
	}

	for($a = $j = $i = 0; $i < $string_length; $i++) {
		$a = ($a + 1) % 256;
		$j = ($j + $box[$a]) % 256;
		$tmp = $box[$a];
		$box[$a] = $box[$j];
		$box[$j] = $tmp;
		$result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
	}

	if($operation == 'DECODE') {
		if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
			return substr($result, 26);
		} else {
			return '';
		}
	} else {
		return $keyc.rtrim(strtr(base64_encode($result), '+/', '-_'), '=');
	}
}

/**
 * 判断email格式是否正确
 * @param $email
 */
function is_email($email) {
	return strlen($email) > 6 && preg_match("/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/", $email);
}

/**
 * 对用户的密码进行加密
 * @param $password
 * @param $encrypt //传入加密串，在修改密码时做认证
 * @return array/password
 */
function password($password, $encrypt='') {
	$pwd = array();
	$pwd['encrypt'] =  $encrypt ? $encrypt : create_randomstr();
	$pwd['password'] = md5(md5(trim($password)).$pwd['encrypt']);
	return $encrypt ? $pwd['password'] : $pwd;
}
/**
 * 生成随机字符串
 * @param string $lenth 长度
 * @return string 字符串
 */
function create_randomstr($lenth = 6) {
	return random($lenth, '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
}

/**
 * 检查密码长度是否符合规定
 *
 * @param STRING $password
 * @return 	TRUE or FALSE
 */
function is_password($password) {
	$strlen = strlen($password);
	if($strlen >= 6 && $strlen <= 18) return true;
	return false;
}

 /**
 * 检测输入中是否含有错误字符
 *
 * @param char $string 要检查的字符串名称
 * @return TRUE or FALSE
 */
function is_badword($string) {
	$badwords = array("\\",'&',' ',"'",'"','/','*',',','<','>',"\r","\t","\n","#");
	foreach($badwords as $value){
		if(strpos($string, $value) !== FALSE) {
			return TRUE;
		}
	}
	return FALSE;
}

/**
 * 检查用户名是否符合规定
 *
 * @param STRING $username 要检查的用户名
 * @return 	TRUE or FALSE
 */
function is_username($username) {
	$strlen = strlen($username);
	if(is_badword($username) || !preg_match("/^[a-zA-Z0-9_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]+$/", $username)){
		return false;
	} elseif ( 20 < $strlen || $strlen < 2 ) {
		return false;
	}
	return true;
}

function is_user($username) {
	if(M('Admin')->where(array('username' => $username))->find()){
		return false;
	}
	return true;
}

/**
* 将字符串转换为数组
*
* @param	string	$data	字符串
* @return	array	返回数组格式，如果，data为空，则返回空数组
*/
function string2array($data) {
	$data = trim($data);
	if($data == '') return array();
	if(strpos($data, 'array')===0){
		@eval("\$array = $data;");
	}else{
		if(strpos($data, '{\\')===0) $data = stripslashes($data);
		$array=json_decode($data,true);
		
	}
	return $array;
}
/**
* 将数组转换为字符串
*
* @param	array	$data		数组
* @param	bool	$isformdata	如果为0，则不使用new_stripslashes处理，可选参数，默认为1
* @return	string	返回字符串，如果，data为空，则返回空
*/
function array2string($data, $isformdata = 1) {
	if($data == '' || empty($data)) return '';
	
	if($isformdata) $data = new_stripslashes($data);
	
	if (version_compare(PHP_VERSION,'5.3.0','<')){
		return addslashes(json_encode($data));
	}else{
		return addslashes(json_encode($data,JSON_FORCE_OBJECT));
	}
}


function seo($title = '',$keywords = '', $description = '') {
	if (!empty($title))$title = strip_tags($title);
	if (!empty($description)) $description = strip_tags($description);
	if (!empty($keywords)) $description = strip_tags($keywords);
	$seo['keywords'] = $keywords ;
	$seo['description'] =$description ;
	$seo['title'] =$title;
	foreach ($seo as $k=>$v) {
		$seo[$k] = str_replace(array("\n","\r"),	'', $v);
	}
	return $seo;
}


function catpos($catid, $symbol=' > '){
		$cate=M('Category');
		$list=$cate->select();
		$list=getParents($list,$catid);
		$url=__ROOT__."/index.php/Index/lists/catid/";
		$str='';
		foreach($list as $v){
			$str.='<a href='.$url.$v['catid'].'>'.$v['catname'].'</a>'.$symbol;
		}
		$str= '<a href='.__ROOT__.'>首页</a>'.$symbol.$str;	
		return $str;
			 
 }


//获取某分类的直接子分类 
function getSons($categorys,$catId=0){ 
  $sons=array(); 
  foreach($categorys as $item){ 
    if($item['pid']==$catId) 
      $sons[]=$item; 
  } 
  return $sons; 
} 
  
//获取某个分类的所有子分类 
function getSubs($categorys,$catId=0,$level=1){ 
  $subs=array(); 
  foreach($categorys as $item){ 
    if($item['pid']==$catId){ 
      $item['level']=$level; 
      $subs[]=$item; 
      $subs=array_merge($subs,getSubs($categorys,$item['catid'],$level+1)); 
    }     
  } 
  return $subs; 
} 
  
//获取某个分类的所有父分类 
//方法一，递归 
function getParents($categorys,$catId){ 
  $tree=array(); 
  foreach($categorys as $item){ 
    if($item['catid']==$catId){ 
      if($item['pid']>0) 
        $tree=array_merge($tree,getParents($categorys,$item['pid'])); 
      $tree[]=$item;  
      break;  
    } 
  } 
  return $tree; 
} 
  
//方法二,迭代 
function getParents2($categorys,$catId){ 
  $tree=array(); 
  while($catId != 0){ 
    foreach($categorys as $item){ 
      if($item['catid']==$catId){ 
        $tree[]=$item; 
        $catId=$item['pid']; 
        break;  
      } 
    } 
  } 
  return $tree; 
} 


/**
* 转化 \ 为 /
* 
* @param	string	$path	路径
* @return	string	路径
*/
function dir_path($path) {
	$path = str_replace('\\', '/', $path);
	if(substr($path, -1) != '/') $path = $path.'/';
	return $path;
}
/**
* 创建目录
* 
* @param	string	$path	路径
* @param	string	$mode	属性
* @return	string	如果已经存在则返回true，否则为flase
*/
function dir_create($path, $mode = 0777) {
	if(is_dir($path)) return TRUE;
	$ftp_enable = 0;
	$path = dir_path($path);
	$temp = explode('/', $path);
	$cur_dir = '';
	$max = count($temp) - 1;
	for($i=0; $i<$max; $i++) {
		$cur_dir .= $temp[$i].'/';
		if (@is_dir($cur_dir)) continue;
		@mkdir($cur_dir, 0777,true);
		@chmod($cur_dir, 0777);
	}
	return is_dir($path);
}


/* 远程图片本地化 $body为html原内容 */
function auto_save_image($body,$body_path='Images'){
        $img_array = explode('&',$body);
        $img_array = array();
        preg_match_all("/(src)=[\"|\'| ]{0,}(http:\/\/(.*)\.(gif|jpg|jpeg|bmp|png|JPEG|GIF|PNG))[\"|\'| ]{0,}/isU", $body, $img_array);
        $img_array = array_unique($img_array[2]);//也可以自动匹配
    
    
        set_time_limit(0);
        $imgPath = 'Uploads/'.$body_path.'/'.date("Y-m-d");
        $milliSecond = date("YmdHis");
        dir_create($imgPath);
        foreach($img_array as $key =>$value)
        {
                $value = trim($value);
                $get_file = @file_get_contents($value);
                
                $rndFileName = $imgPath."/".create_randomstr(6).$milliSecond.$key.substr($value,strrpos($value, '.'));
                if($get_file)
                {
                        $fp = @fopen($rndFileName,"w");
                        @fwrite($fp,$get_file);
                        @fclose($fp);
                }
                $body = @ereg_replace($value, __ROOT__.'/'.$rndFileName, $body);
        }
     
        return $body;
}
/**
* 邮件发送函数
*/
function send_email($to,$subject='',$content=''){
    require_once THINK_PATH.'Library/Vendor/phpmailer/PHPMailerAutoload.php';
    $mail = new PHPMailer;
    $config = tpCache('smtp'); //读取Config表里面,"smtp"类型的数据
	$mail->CharSet  = 'UTF-8'; //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
    $mail->isSMTP();
    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 0;
    //调试输出格式
	//$mail->Debugoutput = 'html';
    //smtp服务器
    $mail->Host = $config['MAIL_HOST'];
    //端口 - likely to be 25, 465 or 587
    $mail->Port = 25;
	if($mail->Port === 465) $mail->SMTPSecure = 'ssl';// 使用安全协议
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    //用户名
    $mail->Username = $config['MAIL_USERNAME'];
    //密码
    $mail->Password = $config['MAIL_PASSWORD'];
    //Set who the message is to be sent from
    $mail->setFrom($config['MAIL_FROM']);
    //回复地址
    //$mail->addReplyTo('replyto@example.com', 'First Last');
    //接收邮件方
    if(is_array($to)){
    	foreach ($to as $v){
    		$mail->addAddress($v);
    	}
    }else{
    	$mail->addAddress($to);
    }
    $mail->isHTML(true);// send as HTML
    //标题
    $mail->Subject = $subject;
    //HTML内容转换
    $mail->msgHTML($content);
    //Replace the plain text body with one created manually
    //$mail->AltBody = 'This is a plain-text message body';
    //添加附件
    //$mail->addAttachment('images/phpmailer_mini.png');
    //send the message, check for errors
    return $mail->send();
}

//网站基本设置
function getWebSetting($title){
	$site = M('Site');
	$info = $site->where('siteid = 1')->getField($title);
	return $info;
}
?>