<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<title>后台管理系统</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/Public/assets/js/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/Public/assets/js/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="/Public/assets/js/animate-css/animate.min.css" rel="stylesheet" />
    <link href="/Public/assets/js/pace/pace.css" rel="stylesheet" />
    <link href="/Public/assets/css/style.css" rel="stylesheet" type="text/css" />
</head>
<body class="fixed-left login-page">	
<div class="container">		
	<div class="full-content-center">
		<p class="text-center">
			<h1 class="logo-name">H+</h1>
			<h3 class="ComName">www.xxxxxx.com</h3>
		</p>
		<div class="login-wrap animated flipInX">				
			<div class="login-block">
			<form action="<?php echo U('doLogin');?>" method="post">			
				<div class="form-group login-input">							
					<i class="fa fa-user overlay"></i>							
					<input type="text" class="form-control text-input" name='username' placeholder="用户名" id='username'>						
				</div>
				<div class="form-group login-input">							
					<i class="fa fa-key overlay"></i>							
					<input type="password" class="form-control text-input" name='password' placeholder="密码" id='password'>						
				</div>
                <div class="form-group login-input" style="overflow: hidden;">							
					<i class="fa fa-lock overlay"></i>
                    <input type="text" name="code" class="form-control text-input" style="width: 50%;float: left;" placeholder="验证码" /><img class="verify" style="display:block;float: right;cursor:pointer;width: 40%;height: 34px;" src="<?php echo U('Login/verify');?>" title="点击切换" />
                </div>
				<div class="row">							
					<div class="col-sm-12">							
                        <input type="submit" tabindex="3" value="登陆" class="btn btn-success btn-block" />						
					</div>
				</div>
			</form>
			</div>
		</div>		
	</div>	
</div>	
<script src="/Public/assets/js/jquery/jquery-1.11.1.min.js"></script>
<script src="/Public/assets/js/pace/pace.min.js"></script>
<script type="text/javascript">
    $(function(){
        $('.verify').click(function(){
            $('.verify').attr('src', "<?php echo U('Login/verify');?>?" + Math.random());
        });
    })
</script>
</body>
</html>