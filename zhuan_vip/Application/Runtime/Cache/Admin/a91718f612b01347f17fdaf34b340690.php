<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="renderer" content="webkit">
<title><?php echo ($config["companyname"]); ?>-后台管理系统</title>
<!--[if lt IE 8]>
<script>
	alert('H+已不支持IE6-8，请使用谷歌、火狐等浏览器\n或360、QQ等国产浏览器的极速模式浏览本页面！');
</script>
<![endif]-->
<link rel="shortcut icon" href="/favicon.ico">
<link rel="stylesheet" type="text/css" href="/Public/assets/css/Css.css" />
<link href="/Public/assets/css/font-awesome.min.css" rel="stylesheet">
<?php if($sel == 1 || $sel == 3 || $sel == 4): ?><script type="text/javascript" charset="utf-8" src="/Public/Ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="/Public/Ueditor/ueditor.all.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="/Public/Ueditor/ueditor.parse.js"></script>
    <script type="text/javascript" src="/Public/Ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" charset="utf-8" src="/Public/Ueditor/ueditor.config.min.js"></script><?php endif; ?>
<?php if($sel == 2 || $sel == 3 || $sel == 4 || $sel==15): ?><link rel="stylesheet" type="text/css" href="/Public/User/css/uploadify.css" />
	<script src="/Public/assets/js/jquery/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="/Public/User/js/jquery.uploadify-3.1.js"></script><?php endif; ?>
<?php if($sel == 4 || $sel==15): ?><link href="/Public/assets/datetimepicker/css/datetimepicker.css" rel="stylesheet" type="text/css">
<link href="/Public/assets/datetimepicker/css/dropdown.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/Public/assets/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="/Public/assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script><?php endif; ?>
</head>
<body>
	
</body>
</html>


    <ol class="breadcrumb">
        <li><a href='<?php echo U('Index/index');?>'>首页</a></li>
    </ol>
    <div class="content">
        <div class="geren">
            <div class="Title"><b><?php echo L('system_info');?></b><span><?php echo L('esystem_info');?></span></div>
            <ul>
                <li><span><?php echo L('yikecms_version');?>：</span><?php echo ($system_info["version"]); ?></li>
                <li><span><?php echo L('server_domain');?>：</span><?php echo ($system_info["server_domain"]); ?></li>
                <li><span><?php echo L('server_os');?>：</span><?php echo ($system_info["server_os"]); ?></li>
                <li><span><?php echo L('web_server');?>：</span><?php echo ($system_info["web_server"]); ?></li>
                <li><span><?php echo L('php_version');?>：</span><?php echo ($system_info["php_version"]); ?></li>
                <li><span><?php echo L('mysql_version');?>：</span><?php echo ($system_info["mysql_version"]); ?></li>
                <li><span><?php echo L('upload_max_filesize');?>：</span><?php echo ($system_info["upload_max_filesize"]); ?></li>
                <li><span><?php echo L('max_execution_time');?>：</span><?php echo ($system_info["max_execution_time"]); ?></li>
                <li><span><?php echo L('safe_mode');?>：</span><?php echo ($system_info["safe_mode"]); ?></li>
                <li><span><?php echo L('zlib');?>：</span><?php echo ($system_info["zlib"]); ?></li>
                <li><span><?php echo L('curl');?>：</span><?php echo ($system_info["curl"]); ?></li>
                <li><span><?php echo L('timezone');?>：</span><?php echo ($system_info["timezone"]); ?></li>
                 <li><span><?php echo L('Thinkphp');?>：</span><?php echo ($system_info["Thinkphp"]); ?></li>
                <li><span><?php echo L('yunxin');?>：</span><?php echo ($system_info["yunxin"]); ?></li>
            </ul>
        </div>
        <!-- Footer Start -->
<footer>
    技术支持：<a href="##" title="某某信息有限公司" target="_blank">某某信息有限公司</a> 1.1.1.100305版本 &copy; 2016 - 2018
</footer>
<!-- Footer End -->	

    </div>