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
        <li><a href="<?php echo U('Index/index');?>">首页</a></li>
        <li>用户信息</li>
    </ol>
    <div class="content">
        <div class="Config_nav">
            <ul>
                <li><a class="on" href="<?php echo U('Vip/index');?>">用户信息</a></li>
                <li><a href="<?php echo U('Vip/add');?>">用户充值</a></li>
                <li><a href="<?php echo U('Vip/b_imports');?>">导入彩金表数据</a></li>
            </ul>
        </div>
        <div class="Search">
            <form action="" method="get">
                <div class="keyword"><input class="common-text input-text" size="25" placeholder="用户名" name="q" value=""  type="text"></div>
                <div class="btn1"><input class="btn btn-primary btn6 mr10" value="查询" type="submit" /></div>
            </form>
        </div>
        <div class="List">
            <div class="table-list">
                <ul>
                    <li class="ID" style="width:10%;">ID</li>
                    <li class="Name" style="width:20%;">会员账号</li>
                    <li class="Property" style="width:10%;">vip等级</li>
                    <li class="S_Order" style="width:10%;">累积投注金额</li>
                    <li class="Status" style="width:10%;">当月有效投注</li>
                    <li class="Oper" style="width:10%;">晋级彩金</li>
                    <li class="Oper" style="width:10%;">当月好运金</li>
                </ul>
            </div>
            <?php if(is_array($lotteries_list)): foreach($lotteries_list as $k=>$vo): ?><div class="ProList">
                    <ul>
                        <li class="ID" style="width:10%;"><?php echo ($vo["id"]); ?></li>
                        <li class="Name" style="width:20%; text-align:center;"><?php echo ($vo["username"]); ?></li>
                        <li class="Property" style="width:10%;"><?php echo ($vo["vip_level"]); ?></li>
                        <li class="S_Order" style="width:10%;"><?php echo ($vo["money"]); ?></li>
                        <li class="Status" style="width:10%;"><?php echo ($vo["better"]); ?></li> 
                        <!-- <?php if($vo["status"] == '1'): ?><li style="width:10%;">
                            <a>vip1</a>
                          </li> 
                        <?php elseif($vo["status"] == '2'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip2</a>
                         </li> 
                         <?php elseif($vo["status"] == '3'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip3</a>
                         </li> 
                         <?php elseif($vo["status"] == '4'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip4</a>
                         </li> 
                         <?php elseif($vo["status"] == '5'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip5</a>
                         </li> 
                         <?php elseif($vo["status"] == '6'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip6</a>
                         </li> 
                         <?php elseif($vo["status"] == '7'): ?>
                          <li style="width:10%;" class="S_Order">
                             <a>vip7</a>
                         </li> 
                         <?php elseif($vo["status"] == '8'): ?>
                         <li style="width:10%;" class="S_Order">
                            <a>vip8</a>
                        </li>
                        <?php elseif($vo["status"] == '9'): ?>
                        <li style="width:10%;" class="S_Order">
                           <a>vip9</a>
                       </li>
                       <?php else: ?>
                       <li style="width:10%;" class="S_Order">
                          <a>无</a>
                      </li><?php endif; ?> -->

                     <li class="Oper" style="width:10%;"><?php echo ($vo["gold"]); ?></li> 
                     <li class="Oper" style="width:10%;"><?php echo ($vo["luck"]); ?></li> 
                    </ul>
                </div><?php endforeach; endif; ?>
            <div class="cl" style="margin-top: 15px;"></div>
            <div class="Order_submit">
                <div class="tp_pages"><?php echo ($page); ?></div>
            </div>
        </div>
        <!-- Footer Start -->
<footer>
    技术支持：<a href="##" title="某某信息有限公司" target="_blank">某某信息有限公司</a> 1.1.1.100305版本 &copy; 2016 - 2018
</footer>
<!-- Footer End -->	

    </div>