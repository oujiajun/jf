<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>vip中心</title>
	<link href="/favicon.ico" rel="shortcut icon">
    <link rel="stylesheet" href="/Public/Home/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Public/Home/css/screen.min.css">
    <link rel="stylesheet" href="/Public/Home/css/base.css">
    <link rel="stylesheet" href="/Public/Home/css/style.css">
    <script src="/Public/Home/js/jquery.min.js"></script>
    <script src="/Public/Home/js/bootstrap.min.js"></script>
    <style>
            /*----------tab切换----------*/
        #tabs {
            overflow: hidden;
            width: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
        }
        #tabs li {
            float: left;
            margin: 0;
        }
            #tabs li a {
            position: relative;
            background: #ddd;
            padding: 5px 20px;
            float: left;
            text-decoration: none;
            color: #444;
            text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 2px 2px rgba(0, 0, 0, .4);
        }

        .current a{
            outline: 0;
            background: #fff;
            z-index: 4;
        }
        .hoverItem a{
            background: #AAC8B9;
        }
        .item{
            display: none;
        }

        .show{
            display: block;
        }

        /*---------弹出层-------------*/
        .modal-content{
            background: #171717;border: 2px solid #6a6a6a;
            overflow: hidden;padding: 20px 0;
        }
        .form-dialog{
            padding: 20px 0 50px;
        }
        .game-table thead tr {
            background: #7c4f26;
        }
        .game-table tbody tr td{ padding: 8px;}

        @media screen and (min-width: 441px) and (max-width: 992px) {
            .vip-bg .vip-liberty-nav ul li{
                width: 200px;height: 200px;margin:0 17px 10px 17px;
            }
            .vip-bg .vip-liberty-nav ul li img.roll {
                width: 120px;height: 120px;
                top: 38px;left: 40px;
            }
        }

		  @media screen and (max-width: 768px){
            .vip-banner {
                background: url("/Public/Home/images/vip-banner-mobile.png") no-repeat;
                background-size: 100% 100%;
                background-position: center 20%;
                padding: 120px 0;
            }
        } 

        @media screen and (max-width: 640px){
            /*---------搜索狂-----------*/
            .vip-bg .vip-searchs{
                width: 300px;margin: 0 auto;background: url("/Public/Home/images/vip-search-box.png")no-repeat;
                height: 50px;top: -20px; background-size: 100% 100%;
            }
            .vip-bg .vip-searchs .search-box{
                position: relative;left: 100px; height: 30px;font-size: 12px;
                top: 10px;width: 120px;float: left;border: 0;outline: 0;
            }
            .vip-bg .vip-searchs .search-btn{
                float: right;position: relative;right: 5px;width: 70px;
                height: 48px;top: 9px;
            }
        }

        @media screen and (max-width: 440px){
            .vip-bg {
                background: #000;
            }
            .vip-bg .vip-step {
                width: 90%;
                height: 100px;
                overflow: hidden;
            }
            .vip-bg .vip-liberty p {
                font-size: 14px;
            }
            .vip-bg .vip-liberty-list p {
                font-size: 14px;
            }
            .vip-bg .vip-liberty-nav ul li{
                width: 150px;height: 150px;
            }
            .vip-bg .vip-liberty-nav ul li img.roll {
                width: 90px;height: 90px;
                top: 28px;left: 30px;
            }
        }
    </style>
</head>
<body>
<nav class="main-navigation header">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <span class="mobile-show"><img src="/Public/Home/images/menu%20.png" alt=""></span>
                <div class="navbar-collapse" id="main-menu">
                    <ul class="menu navbar head-nav">
                        <li role="presentation"><a href="https://qx588.com/pc/index/register.html">免费注册</a></li>
                        <li role="presentation"><a href="http://jifen789.com">积分商城</a></li>
                        <li role="presentation"><a href="https://qx588.com/pc/index/register.html">抢红包</a></li>
                        <li role="presentation"><a href="http://www.jgj789.com">金管家</a></li>
                        <li role="presentation"><a href="http://qxyhhd.com">优惠大厅</a></li>
                        <li role="presentation"><a href="https://messenger.providesupport.net/messenger/0e4az8utlr19c0yswj0z4c4spk.html">在线客服</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
    <div class="container-fluid vip-banner"></div>
    <div class="container-fluid vip-bg">
        <div class="container">
            <div class="row">
                <div class="vip-searchs">
                     <input id="username" class="search-box" type="text" placeholder="点击输入会员账号">
                     <a id="imgok" class="search-btn" role="button" data-toggle="modal" data-target="#myModa8">
                       <img src="/Public/Home/images/check.png" alt="">
                     </a>
                </div>
                <!-- 模态框（Modal） -->
                <div class="modal fade" id="myModa8" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <button id="btnok" type="button" class="close-Btn" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h5 class="col-md-12" style="color: #fff;">查询中心</h5>
                            <div class="col-md-12">
                                <table class="table game-table" style="margin: 0 0 20px;">
                                    <thead>
                                    <tr>
                                        <th>会员帐号</th>
                                        <th>VIP等级</th>
                                        <th>累总投注金额</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td id="name"></td>
                                        <td id="lev"></td>
                                        <td id="money"></td>
                                    </tr>
                                    <tr>
                                        <td class="tishi" colspan="3" style="text-algin:center;"></td>
                                    </tr>
                                    </tbody>
                                </table>
                               <ul id="tabs">
                                    <li class="current"><a href="#" title="tab1">晋级彩金</a></li>
                                    <li><a href="#" title="tab2">好运金</a></li>
                                </ul>
                                <div id="content">
                                    <div id="tab1" class="item show">
                                        <table class="table game-table" style="margin: 0;">
                                            <thead>
                                            <tr>
                                                <th>会员帐号</th>
                                                <th>VIP等级</th>
                                                <th>晋级彩金</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td id="name1"></td>
                                                <td id="vip_level"></td>
                                                <td id="gold"></td>
                                            </tr>
                                            <tr>
                                              <td class="tishi" colspan="3" style="text-algin:center;"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                    <div id="tab2" class="item">
                                        <table class="table game-table" style="margin: 0;">
                                            <thead>
                                            <tr>
                                                <th>会员帐号</th>
                                                <th>当月有效投注</th>
                                                <th>当月好运金</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td id="name2"></td>
                                                <td id="better"></td>
                                                <td id="luck"></td>
                                            </tr>
                                            <tr>
                                               <td class="tishi" colspan="3" style="text-algin:center;"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div> 

                                </div>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal -->
                </div>
                <div class="vip-step col-md-offset-3">
                    <img src="/Public/Home/images/vip-step1.png" alt="">
                </div>
            </div>
            <div class="vip-condition table-responsive">
                <table class="col-md-12 table">
                    <tbody>
                    <tr>
                        <td rowspan="2">活动时间</td>
                        <td colspan="2">VIP1晋升条件（满足任意一个即可）</td>
                        <td rowspan="2">VIP1晋级彩金</td>
                        <td rowspan="2">钻石等级</td>
                    </tr>
                    <tr>
                        <td>①:周总有效投注</td>
                        <td>②:周累计总存款</td>
                    </tr>
                    <tr>
                        <td>2018年4月9日起</td>
                        <td>15万+</td>
                        <td>2万+</td>
                        <td>58元</td>
                        <td>VIP1</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="vip-step-tips">
                    <p class="col-md-12" style="font-size:14px;">
                        <span id="p" style="font-size:14px;">
                            <a style="color: rgba(255,0,0,1); font-size:14px;">●注：</a>
                        </span>
                        vip1晋级条件每周统计一次（北京时间每周一至周日为统计区间），每周三23点前系统自动更新。
                    </p>
                    <p class="col-md-12" style="font-size:14px;">
                        <span id="p" style="font-size:14px;">
                            <a style="color: rgba(255,0,0,1); font-size:14px;">●例如1：</a>
                            新老会员在北京时间4月9日（周一）--4月15日（周日）期间，累计总入款2万+，即可晋升为谦喜钻石VIP1，总投注将从4月16日（周一）开始统计计算；
                        </span>
                    </p>
                    <p class="col-md-12" style="font-size:14px;">
                        <span id="p" style="font-size:14px;">
                            <a style="color: rgba(255,0,0,1); font-size:14px;">●例如2：</a>
                            新老会员在北京时间4月9日（周一）--4月15日（周日）期间，总有效投注达到15万+，即可晋升为谦喜钻石VIP1，总投注将从4月16日（周一）开始统计计算。
                        </span>
                    </p>
                    <p class="col-md-12" style="font-size:18px;">
                            <span id="p" style="font-size:18px;">
                                <a style="color:#fff; font-size:20px;">活动详情：</a>
                                全新VIP系统正式开启，全民共享，特权就要与众不同！您的每一笔投注【谦喜娱乐城<span style="color: rgba(255,0,0,1); font-size:14px;">qxbet.com</span>】都将会永久累计，累计到一定标准，将审计为更高级别的VIP，尊享更多特权！VIP等级越高，能参与更多的优惠活动和收获更多的彩金，我们将不断推出更多的优惠活动反馈新老会员！
                            </span>
                        </p>
                </div>
                <div class="vip-step col-md-offset-3">
                    <img src="/Public/Home/images/vip-step2.png" alt="">
                </div>
                <div class="grow-chart col-md-6 col-md-offset-3">
                    <img src="/Public/Home/images/grow-chart.png" alt="">
                </div>
                <div class="vip-liberty">
                    <h1 class="col-md-12 liberty">【钻石VIP特权】</h1>
                    <p class="col-md-12">
                        北京时间2018年4月5日起，您晋升VIP后的每一笔有效投注都将永久累计，当累积到对应标准时，可升级为更高级的钻石VIP。钻石等级越高，不仅可以获得更丰厚的彩金，同时还可以开通更多活动优惠。全民VIP，点亮你的专属星钻，照亮你的尊贵人生。
                    </p>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th>钻石等级</th>
                        <th>VIP1</th>
                        <th>VIP2</th>
                        <th>VIP3</th>
                        <th>VIP4</th>
                        <th>VIP5</th>
                        <th>VIP6</th>
                        <th>VIP7</th>
                        <th>VIP8</th>
                        <th>SVIP</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td scope="row">晋级标准</td>
                        <td>-</td>
                        <td>10W+</td>
                        <td>100W+</td>
                        <td>500W+</td>
                        <td>5000W+</td>
                        <td>1亿+</td>
                        <td>5亿+</td>
                        <td>10亿+</td>
                        <td>30亿+</td>
                    </tr>
                    <tr>
                        <td scope="row">晋级彩金</td>
                        <td>58</td>
                        <td>88</td>
                        <td>188</td>
                        <td>888</td>
                        <td>1888</td>
                        <td>3888</td>
                        <td>8888</td>
                        <td>18888</td>
                        <td>38888</td>
                    </tr>
                    <tr>
                        <td scope="row">月月好运金</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                    </tr>
                    <tr>
                        <td scope="row">月月免费筹码</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>888</td>
                        <td>1888</td>
                        <td>3888</td>
                        <td>8888</td>
                        <td>18888</td>
                     </tr>
                     <tr>
                        <td scope="row">生日礼金</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>88</td>
                        <td>188</td>
                        <td>388</td>
                        <td>888</td>
                        <td>1888</td>
                        <td>8888</td>
                      </tr>
                      <tr>
                        <td scope="row">存取款加速通道</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                      </tr>
                      <tr>
                        <td scope="row">专属域名</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                      </tr>
                      <tr>
                        <td scope="row">VIP客服专属服务</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                      </tr>
                      <tr>
                        <td scope="row">月盈利/亏损</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                      </tr>
                      <tr>
                        <td scope="row">彩金自动派送</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                        <td>&radic;</td>
                      </tr>
                      <tr>
                        <td scope="row">年终奖</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&mdash;</td>
                        <td>&radic;</td>
                        <td>8888</td>
                        <td>38888</td>
                        <td>88888</td>
                     </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="vip-step-tips">
                    <p class="col-md-12" style="font-size:14px;">
                        <span id="p" style="font-size:14px;">
                            <a style="color: rgba(255,69,70,1); font-size:14px;">●例如：</a>
                            会员初次晋升VIP后，打码量开始累积，数据每周更新，若有效投注达到500万，即可直接晋升为钻石VIP4，可获晋级彩金58+88+188+888=1222元.
                        </span>
                    </p>
                </div>
                <div class="vip-liberty">
                    <h1 class="col-md-12 liberty">【月月好运金】</h1>
                    <p class="col-md-12">
                        钻石VIP每月达到相应的有效投注，月月可得相对应的好运金，等级越高好运金越高，月月最高可得8888元。
                    </p>
                </div>
            </div>
            <div class="vip-condition table-responsive">
                <table class="col-md-12 table">
                    <tbody>
                    <tr>
                        <td>钻石等级</td>
                        <td>每月总有效投注</td>
                        <td>月月好运金</td>
                        <td>派送方式</td>
                    </tr>
                    <tr>
                        <td>VIP1</td>
                        <td>1W+</td>
                        <td>18</td>
                        <td rowspan="9">无需申请，每月截止日期后24小时内系统自动派送</td>
                    </tr>
                    <tr>
                        <td>VIP2</td>
                        <td>3W+</td>
                        <td>38</td>
                    </tr>
                    <tr>
                        <td>VIP3</td>
                        <td>10W+</td>
                        <td>88</td>
                    </tr>
                    <tr>
                        <td>VIP4</td>
                        <td>30W+</td>
                        <td>188</td>
                    </tr>
                    <tr>
                        <td>VIP5</td>
                        <td>50W+</td>
                        <td>388</td>
                    </tr>
                    <tr>
                        <td>VIP6</td>
                        <td>100W+</td>
                        <td>888</td>
                    </tr>
                   <tr>
                        <td>VIP7</td>
                        <td>300W+</td>
                        <td>1888</td>
                    </tr>
                    <tr>
                        <td>VIP8</td>
                        <td>500W+</td>
                        <td>3888</td>
                    </tr>
                    <tr>
                        <td>SVIP</td>
                        <td>1000W+</td>
                        <td>8888</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="row">
                <div class="vip-step-tips">
                    <p class="col-md-12" style="font-size:14px;">
                        <span id="p" style="font-size:14px;">
                            <a style="color: rgba(255,69,70,1); font-size:14px;">●温馨提示：</a>
                            首月好运金统计区间为晋级成功后开始累计至当月最后一个星期日，次日开始累计到下一期，每月最后一个星期日为当月截止日期。
                        </span>
                    </p>
                </div>
                <div class="vip-step col-md-offset-3">
                    <img src="/Public/Home/images/vip-step3.png" alt="">
                </div>
                <nav class="nav vip-liberty-nav col-md-12">
                    <ul class="navbar col-md-12">
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic1.png" class="roll">
                        </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic2.png" class="roll">
                        </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic3.png" class="roll">
                            </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic4.png" class="roll">
                        </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic5.png" class="roll">
                            </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic6.png" class="roll">
                                </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic7.png" class="roll">
                                    </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic8.png" class="roll">
                                    </li></div>
                        <div class="p1 col-md-4 col-xs-6"><li class="col-md-4 col-sm-6 col-xs-4">
                            <div></div>
                            <img src="/Public/Home/images/con3_pic9.png" class="roll">
                                        </li></div>
                    </ul>
                </nav>
                <div class="vip-step col-md-offset-3">
                    <img src="/Public/Home/images/vip-step4.png" alt="">
                </div>
                <div class=" vip-liberty-list">
                    <div>
                        <H4>1. 什么是晋级标准？</H4>
                        <P>会员达到晋级条件后，即可晋升为钻石VIP1，成功晋级后总有效投注开始累积计算，达到指定标准，即可晋升对应钻石等级。</P>
                        <H4>2. 什么是晋级彩金？</H4>
                        <P>会员达到活动要求从钻石VIP1晋级到钻石VIP2，即可享受88晋级彩金！晋级彩金将于北京时间每周二23:00钻石等级更新完毕后系统自动派送。</P>
                        <H4>3. 什么是月月好运金？</H4>
                        <P>会员晋级钻石VIP1后，每月达到相应的打码量即可获得相应的好运金奖励，每月截止日期后24小时内系统自动派送，月月赠送最高可到8888元。</P>
                        <H4>4. 什么是生日礼金？</H4>
                        <P>会员晋升为钻石VIP4后，即可享有每年一次的生日彩金，等级越高奖金就越高，最高可到8888元，符合的会员点击联系7*27小时在线客服申请即可【生日以身份证日期为准】</P>
                        <H4>5. 什么是存取款加速通道？</H4>
                        <P>我们奉行3分钟存款到账/10分钟提款到账的服务原则，会员晋升为钻石VIP3后，处理效率优先，VIP等级越高，处理效率更为优先！</P>
                        <H4>6. 什么是专属域名？</H4>
                        <P>VIP5以上的会员，我们可以为您开通一条简单易记的登入网址，达到条件的会员请联系在线客服等级申请。</P>
                        <H4>7. 什么是VIP客服专属服务？</H4>
                        <P>会员晋升为钻石VIP6后，即可享有独立的1v1专属VIP服务通道</P>
                        <H4>8. 什么是免费筹码</H4>
                        <P>会员晋升为钻石VIP5后，月月都免费享受到免费筹码，等级越高筹码越多，最高每月可达18888元，符合的会员点击<a href="https://messenger.providesupport.net/messenger/0e4az8utlr19c0yswj0z4c4spk.html
						" style="color: rgba(255,0,0,1)">联系客服</a>申请即可。</P>
                        <H4>9. 什么是月盈利/亏损？</H4>
                        <P>会员晋升钻石VIP6后，月盈利20万+，即可获得1%的鼓励金，最高8888元，月亏损20+，即可获得2%的转运金，最高28888元，符合条件的会员点击活动大厅申请即可。</P>
                        <H4>10. 什么是年终奖？</H4>
                        <P> 会员晋升钻石VIP7后，每年都可以享受到年终分红奖励，等级越高分红越高，最高可到88888元。</P>
                        <H4>11.参与钻石VIP，即表示您同意《优惠规则与条款》。</H4>
                        <P>谦喜保留有对活动的最终解释权。【为了更便于同意和更及时的发放彩金，好运金不再以输赢计算，更换为有效投注标准】</P>
                    </div>
                </div>
                <div class="vip-step col-md-offset-3">
                    <img src="/Public/Home/images/vip-step5.png" alt="">
                </div>
                <div class="vip-liberty-list">
                    <div>
                        <p><label>1.</label>所有优惠以人民币【CNY】为结算金额，以北京时间【BJS】为计算时间。</p>
                        <p><label>2.</label>每位玩家丶每一住址丶每一电子邮箱丶相同支付方式【相同借记卡/信用卡/银行账户】及IP地址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金权利。</p>
                        <p><label>3.</label>谦喜的所有优惠特为玩家而设，如发现团体或个人，以不诚实方式套取红利或任何威胁丶滥用公司优惠等行为，公司保留冻结丶取消该团队或个人账户及账号结余的权利。</p>
                        <p><label>4.</label>若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，谦喜有权要求会员向我们提供充足有效的文件，用于确认是否享有该优惠资格。</p>
                        <p><label>5.</label>当参与优惠会员未能完全遵守丶或违反丶或滥用任何有关公司优惠丶或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，谦喜保留权利向此团队或个人停止丶取消优惠或索回已支付的全部优惠红利。此外，公司亦保留权利向这些客户扣取相当于优惠红利的行政费用，以补偿我们的行政成本。</p>
                        <p><label>6.</label>谦喜娱乐城保留对活动的最终解释权；以及在无通知情况下修改丶终止活动的权利；适用于所有优惠。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
<script>
    $(function(){
        $('#tabs a').click(function(e) {
            e.preventDefault();
            $('#tabs li').removeClass("current").removeClass("hoverItem");
            $(this).parent().addClass("current");
            $("#content div").removeClass("show");
            $('#' + $(this).attr('title')).addClass('show');
        });

        $('#tabs a').hover(function(){
            if(!$(this).parent().hasClass("current")){
                $(this).parent().addClass("hoverItem");
            }
        },function(){
            $(this).parent().removeClass("hoverItem");
        });
    });
</script>
<script>
    $(function () {
        $(".mobile-show").click(function () {
            $(".navbar-collapse").toggle(100);
        });
    })
</script>
<script>
        $(function () {
            $("#imgok").click(function () {
              var key = $("#username").val();
              var datas = {'key': key};  
              $.ajax({
                  url:'/index.php/index/serach',
                  data: datas,
                  type: 'POST',
                  dataType: 'json',
                  success: function(data) {
                  if(data.code==1){
                    console.log(data);
                     $("#name").html(data.data[0]['username']);
                     $("#lev").html(data.data[0]['vip_level']);
                     $("#money").html(data.data[0]['money']);
                     $("#vip_level").html(data.data[0]['vip_level']);
                     $("#gold").html(data.data[0]['gold']);
                     $("#better").html(data.data[0]['better']);
                     $("#luck").html(data.data[0]['luck']);
                     $("#name1").html(data.data[0]['username']);
                     $("#name2").html(data.data[0]['username']);
                 }else{
                    $(".tishi").html('没有数据');
                 }
                },
              });
            });

            $("#btnok").click(function(){
                $("#name").html(' ');
                     $("#lev").html(' ');
                     $("#money").html(' ');
                     $("#vip_level").html(' ');
                     $("#gold").html(' ');
                     $("#better").html(' ');
                     $("#luck").html(' ');
                     $("#name1").html(' ');
                     $("#name2").html(' ');
                     $(".tishi").html(' ');
            });
        })
</script>