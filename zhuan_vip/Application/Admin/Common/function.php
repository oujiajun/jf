<?php
function templateList($style)
{
    $list = glob('template' .DIRECTORY_SEPARATOR.$style .DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);
    $arr = array();
    foreach ($list as $key => $v) {
        $dirname = basename($v);
        if (file_exists($v . DIRECTORY_SEPARATOR . 'config.php')) {
            $arr[$key] = (include $v . DIRECTORY_SEPARATOR . 'config.php');
        } else {
            $arr[$key]['name'] = $dirname;
        }
        $arr[$key]['dirname'] = $dirname;
    }
    return $arr;
}


function is_login(){
    $user = session('admin_auth');
    if (empty($user)) {
        return 0;
    } else {
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}

function data_auth_sign($data) {
    //数据类型检测
    if(!is_array($data)){
        $data = (array)$data;
    }
    ksort($data); //排序
    $code = http_build_query($data); //url编码并生成query字符串
    $sign = sha1($code); //生成签名
    return $sign;
}

//获取当前登录用户名
function get_nickname($uid = 0){
    if(!($uid && is_numeric($uid))){
        return session('admin_auth.username');
    }
	$info = M('admin')->field('username')->find($uid);
	if($info !== false && $info['username'] ){
		$name = $info['username'];
	} else {
		$name = '';
	}
    return $name;
}

//获取当前时间
function time_format($time = NULL,$format='Y-m-d H:i'){
    $time = $time === NULL ? NOW_TIME : intval($time);
    return date($format, $time);
}

function get_category_title($id){
	$info = M('Category')->field('catname')->find($id);
	if($info !== false && $info['catname'] ){
		$catname = $info['catname'];
	} else {
		$catname = '';
	}
	return $catname;
}

function get_article_title($id){
	$info = M('Article')->field('title')->find($id);
	if($info !== false && $info['title'] ){
		$title = $info['title'];
	} else {
		$title = '';
	}
	return $title;
}

function get_action($id){
	$info = M('Action')->where(array('status'=>array('eq', 1)))->field('title')->find($id);
	if($info !== false && $info['title'] ){
		$title = $info['title'];
	} else {
		$title = '';
	}
	return $title;
}


function action_log($action = null, $model = null, $record_id = null, $user_id = null){
    //参数检查
    if(empty($action) || empty($model) || empty($record_id)){
        return '参数不能为空';
    }
    if(empty($user_id)){
        $user_id = is_login();
    }
    //查询行为,判断是否执行
    $action_info = M('Action')->getByName($action);
    if($action_info['status'] != 1){
        return '该行为被禁用或删除';
    }
    //插入行为日志
    $data['user_id']        =   $user_id;
    $data['action_ip']      =   ip2long(get_client_ip());
    $data['model']          =   $model;
    $data['record_id']      =   $record_id;
    $data['create_time']    =   NOW_TIME;
    //解析日志规则,生成日志备注
	if(preg_match_all('/\[(\S+?)\]/', $action_info['log'], $match)){
		$log['user']    =   $user_id;
		$log['record']  =   $record_id;
		$log['model']   =   $model;
		$log['time']    =   NOW_TIME;
		$log['data']    =   array('user'=>$user_id,'model'=>$model,'record'=>$record_id,'time'=>NOW_TIME);
		foreach ($match[1] as $value){
			$param = explode('|', $value);
			if(isset($param[1])){
				$replace[] = call_user_func($param[1],$log[$param[0]]);
			}else{
				$replace[] = $log[$param[0]];
			}
		}
		$data['remark'] =   str_replace($match[0], $replace, $action_info['log']);
	}else{
		$data['remark'] =   $action_info['log'];
	}
    M('action_log')->add($data);
}
