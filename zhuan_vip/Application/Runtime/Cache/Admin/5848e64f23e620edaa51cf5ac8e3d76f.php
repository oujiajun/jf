<?php if (!defined('THINK_PATH')) exit(); $sel = 15; ?>
<!DOCTYPE HTML>
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
			<li><a href="<?php echo U('Index/index');?>">首页</a></li>
            <li>用户信息</li>
		</ol>
        <div class="content">
			<div class="Config_nav">
                <ul>
                    <li><a href="<?php echo U('User/index');?>">充值信息</a></li>
                </ul>
            </div>
            <form action="<?php echo U('Vip/doadd');?>" method="post"  id="form" enctype="multipart/form-data" >
           		<div class="SiteContent">
                    <ul>
                        <li class="Name">会员账户</li>
                        <li class="input">
                            <input class="common-text input-text" name="username" size="40" type="text">
                        </li>
                    </ul>
                    <ul>
                        <li class="Name">存款金额</li>
                        <li class="input">
                            <input class="common-text input-text" name="money" size="40" type="text">
                        </li>
                    </ul>
                    <ul>
                            <li class="Name">有效投注</li>
                            <li class="input"><input class="common-text input-text" name="betting" size="40" type="text"></li>
                    </ul>

                    <ul>
                            <li class="Name">发布时间</li>
                            <li class="input">
                               <input type="text" name="system_date" class="common-text input-text time" value="<?php echo ($dates); ?>" readonly="readonly" size="40" style="cursor:pointer;" />
                            </li>
                   </ul>

                    <div class="cl" style="height: 10px;"></div>
                    <div class="btn">
                        <input class="btn btn-primary btn6 mr10" value="提交" style="margin-right: 10px;" type="submit">
                        <input class="btn btn6" onClick="history.go(-1)" value="返回" type="button">
                    </div>
				</div>
            </form>
            <!-- Footer Start -->
<footer>
    技术支持：<a href="##" title="某某信息有限公司" target="_blank">某某信息有限公司</a> 1.1.1.100305版本 &copy; 2016 - 2018
</footer>
<!-- Footer End -->	

        </div>


<script type="text/javascript" src="/Public/assets/js/selectTag/selectTag.js"></script>
<script type="text/javascript">
$(function(){
    $('.time').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: "zh-CN",
        minView: 2,
        autoclose: true
    });
    showTab();
});
</script>