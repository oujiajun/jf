/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : xgcms

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-10-31 14:17:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `xg_action`
-- ----------------------------
DROP TABLE IF EXISTS `xg_action`;
CREATE TABLE `xg_action` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '行为唯一标识',
  `title` char(80) NOT NULL DEFAULT '' COMMENT '行为说明',
  `rule` text NOT NULL COMMENT '行为规则',
  `log` text NOT NULL COMMENT '日志规则',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '类型',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统行为表';

-- ----------------------------
-- Records of xg_action
-- ----------------------------
INSERT INTO `xg_action` VALUES ('1', 'user_login', '用户登录', '', '[user|get_nickname]在[time|time_format]登录了后台', '1', '1', '1387181220');
INSERT INTO `xg_action` VALUES ('2', 'add_article', '新增信息', '', '[user|get_nickname]在[time|time_format]发表了一篇文章，表[model]，记录编号[record]，文章标题为“[record|get_article_title]”。', '2', '1', '1380173180');
INSERT INTO `xg_action` VALUES ('5', 'add_comment', '发表评论', '', '', '2', '0', '1383285551');
INSERT INTO `xg_action` VALUES ('6', 'update_config', '更新配置', '', '[user|get_nickname]在[time|time_format]更新了基本设置。', '2', '1', '1383294988');
INSERT INTO `xg_action` VALUES ('10', 'update_menu', '更新栏目', '', '', '1', '1', '1383296392');
INSERT INTO `xg_action` VALUES ('11', 'add_menu', '新增栏目', '', '', '1', '1', '1383296765');

-- ----------------------------
-- Table structure for `xg_action_log`
-- ----------------------------
DROP TABLE IF EXISTS `xg_action_log`;
CREATE TABLE `xg_action_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '执行用户id',
  `action_ip` bigint(20) NOT NULL COMMENT '执行行为者ip',
  `model` varchar(50) NOT NULL DEFAULT '' COMMENT '触发行为的表',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '日志备注',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '执行行为的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_action_log
-- ----------------------------
INSERT INTO `xg_action_log` VALUES ('1', '1', '-1062731418', 'Admin', 'admin在2017-10-27 13:58登录了后台', '1', '1509083896');
INSERT INTO `xg_action_log` VALUES ('2', '1', '-1062731418', 'Admin', 'admin在2017-10-27 16:00登录了后台', '1', '1509091208');
INSERT INTO `xg_action_log` VALUES ('3', '1', '-1062731418', 'Admin', 'admin在2017-10-27 16:01登录了后台', '1', '1509091293');
INSERT INTO `xg_action_log` VALUES ('4', '1', '-1062731418', 'Admin', 'admin在2017-10-27 16:03登录了后台', '1', '1509091422');
INSERT INTO `xg_action_log` VALUES ('5', '9', '-1062731418', 'Admin', 'demo在2017-10-27 16:04登录了后台', '1', '1509091458');
INSERT INTO `xg_action_log` VALUES ('6', '1', '-1062731418', 'Admin', 'admin在2017-10-27 16:29登录了后台', '1', '1509092979');
INSERT INTO `xg_action_log` VALUES ('7', '1', '-1062731418', 'Admin', 'admin在2017-10-28 09:19登录了后台', '1', '1509153574');
INSERT INTO `xg_action_log` VALUES ('8', '1', '-1062731418', 'Admin', 'admin在2017-10-28 16:05登录了后台', '1', '1509177951');
INSERT INTO `xg_action_log` VALUES ('9', '1', '-1062731418', 'Admin', 'admin在2017-10-28 16:12登录了后台', '1', '1509178329');
INSERT INTO `xg_action_log` VALUES ('10', '1', '-1062731418', 'Admin', 'admin在2017-10-28 17:27登录了后台', '1', '1509182827');
INSERT INTO `xg_action_log` VALUES ('11', '1', '-1062731418', 'Site', 'admin在2017-10-28 18:29更新了基本设置。', '1', '1509186578');
INSERT INTO `xg_action_log` VALUES ('12', '1', '-1062731418', 'Site', 'admin在2017-10-28 18:38更新了基本设置。', '1', '1509187090');
INSERT INTO `xg_action_log` VALUES ('13', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:21更新了基本设置。', '1', '1509189674');
INSERT INTO `xg_action_log` VALUES ('14', '1', '-1062731418', 'Admin', 'admin在2017-10-28 19:43登录了后台', '1', '1509191015');
INSERT INTO `xg_action_log` VALUES ('15', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:43更新了基本设置。', '1', '1509191026');
INSERT INTO `xg_action_log` VALUES ('16', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:44更新了基本设置。', '1', '1509191094');
INSERT INTO `xg_action_log` VALUES ('17', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:46更新了基本设置。', '1', '1509191200');
INSERT INTO `xg_action_log` VALUES ('18', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:47更新了基本设置。', '1', '1509191256');
INSERT INTO `xg_action_log` VALUES ('19', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:48更新了基本设置。', '1', '1509191281');
INSERT INTO `xg_action_log` VALUES ('20', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:48更新了基本设置。', '1', '1509191339');
INSERT INTO `xg_action_log` VALUES ('21', '1', '-1062731418', 'Site', 'admin在2017-10-28 19:49更新了基本设置。', '1', '1509191389');
INSERT INTO `xg_action_log` VALUES ('22', '1', '-1062731418', 'Admin', 'admin在2017-10-28 20:11登录了后台', '1', '1509192677');
INSERT INTO `xg_action_log` VALUES ('23', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:11更新了基本设置。', '1', '1509192692');
INSERT INTO `xg_action_log` VALUES ('24', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:12更新了基本设置。', '1', '1509192774');
INSERT INTO `xg_action_log` VALUES ('25', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:13更新了基本设置。', '1', '1509192820');
INSERT INTO `xg_action_log` VALUES ('26', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:14更新了基本设置。', '1', '1509192852');
INSERT INTO `xg_action_log` VALUES ('27', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:18更新了基本设置。', '1', '1509193120');
INSERT INTO `xg_action_log` VALUES ('28', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:19更新了基本设置。', '1', '1509193145');
INSERT INTO `xg_action_log` VALUES ('29', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:19更新了基本设置。', '1', '1509193189');
INSERT INTO `xg_action_log` VALUES ('30', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:20更新了基本设置。', '1', '1509193256');
INSERT INTO `xg_action_log` VALUES ('31', '1', '-1062731418', 'Site', 'admin在2017-10-28 20:21更新了基本设置。', '1', '1509193313');
INSERT INTO `xg_action_log` VALUES ('32', '1', '-1062731418', 'Site', 'admin在2017-10-28 21:09更新了基本设置。', '1', '1509196197');
INSERT INTO `xg_action_log` VALUES ('33', '1', '-1062731418', 'Site', 'admin在2017-10-28 21:10更新了基本设置。', '1', '1509196249');
INSERT INTO `xg_action_log` VALUES ('34', '1', '-1062731418', 'Admin', 'admin在2017-10-30 09:36登录了后台', '1', '1509327372');
INSERT INTO `xg_action_log` VALUES ('35', '1', '-1062731418', 'Site', 'admin在2017-10-30 10:12更新了基本设置。', '1', '1509329532');
INSERT INTO `xg_action_log` VALUES ('36', '1', '-1062731418', 'Site', 'admin在2017-10-30 10:16更新了基本设置。', '1', '1509329818');
INSERT INTO `xg_action_log` VALUES ('37', '1', '-1062731418', 'Site', 'admin在2017-10-30 10:41更新了基本设置。', '1', '1509331303');
INSERT INTO `xg_action_log` VALUES ('38', '1', '-1062731418', 'Site', 'admin在2017-10-30 10:42更新了基本设置。', '1', '1509331376');
INSERT INTO `xg_action_log` VALUES ('39', '1', '-1062731418', 'Admin', 'admin在2017-10-30 12:38登录了后台', '1', '1509338307');
INSERT INTO `xg_action_log` VALUES ('40', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:43更新了基本设置。', '1', '1509338595');
INSERT INTO `xg_action_log` VALUES ('41', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:44更新了基本设置。', '1', '1509338690');
INSERT INTO `xg_action_log` VALUES ('42', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:49更新了基本设置。', '1', '1509338964');
INSERT INTO `xg_action_log` VALUES ('43', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:53更新了基本设置。', '1', '1509339228');
INSERT INTO `xg_action_log` VALUES ('44', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:54更新了基本设置。', '1', '1509339268');
INSERT INTO `xg_action_log` VALUES ('45', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:55更新了基本设置。', '1', '1509339308');
INSERT INTO `xg_action_log` VALUES ('46', '1', '-1062731418', 'Site', 'admin在2017-10-30 12:59更新了基本设置。', '1', '1509339551');
INSERT INTO `xg_action_log` VALUES ('47', '1', '-1062731418', 'Site', 'admin在2017-10-30 13:04更新了基本设置。', '1', '1509339840');
INSERT INTO `xg_action_log` VALUES ('48', '1', '-1062731418', 'Site', 'admin在2017-10-30 13:04更新了基本设置。', '1', '1509339847');
INSERT INTO `xg_action_log` VALUES ('49', '1', '-1062731418', 'Site', 'admin在2017-10-30 13:06更新了基本设置。', '1', '1509339994');
INSERT INTO `xg_action_log` VALUES ('50', '1', '-1062731418', 'Site', 'admin在2017-10-30 13:07更新了基本设置。', '1', '1509340021');
INSERT INTO `xg_action_log` VALUES ('51', '1', '-1062731418', 'Site', 'admin在2017-10-30 13:50更新了基本设置。', '1', '1509342619');
INSERT INTO `xg_action_log` VALUES ('52', '1', '-1062731418', 'Site', 'admin在2017-10-30 14:05更新了基本设置。', '1', '1509343552');
INSERT INTO `xg_action_log` VALUES ('53', '1', '-1062731418', 'Site', 'admin在2017-10-30 14:18更新了基本设置。', '1', '1509344291');
INSERT INTO `xg_action_log` VALUES ('54', '1', '-1062731418', 'Admin', 'admin在2017-10-30 15:37登录了后台', '1', '1509349024');
INSERT INTO `xg_action_log` VALUES ('55', '1', '-1062731418', 'Admin', 'admin在2017-10-30 17:02登录了后台', '1', '1509354120');
INSERT INTO `xg_action_log` VALUES ('56', '1', '-1062731418', 'Admin', 'admin在2017-10-30 17:07登录了后台', '1', '1509354440');
INSERT INTO `xg_action_log` VALUES ('57', '1', '-1062731418', 'Site', 'admin在2017-10-30 17:07更新了基本设置。', '1', '1509354450');
INSERT INTO `xg_action_log` VALUES ('58', '1', '-1062731418', 'Site', 'admin在2017-10-30 17:24更新了基本设置。', '1', '1509355467');
INSERT INTO `xg_action_log` VALUES ('59', '1', '-1062731418', 'Admin', 'admin在2017-10-31 09:15登录了后台', '1', '1509412536');
INSERT INTO `xg_action_log` VALUES ('60', '1', '-1062731418', 'Admin', 'admin在2017-10-31 13:44登录了后台', '1', '1509428691');
INSERT INTO `xg_action_log` VALUES ('61', '1', '-1062731418', 'Site', 'admin在2017-10-31 14:17更新了基本设置。', '1', '1509430622');

-- ----------------------------
-- Table structure for `xg_admin`
-- ----------------------------
DROP TABLE IF EXISTS `xg_admin`;
CREATE TABLE `xg_admin` (
  `adminid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT 'MD5密码',
  `encrypt` char(6) NOT NULL DEFAULT '' COMMENT '加密口令',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `lastip` varchar(20) NOT NULL DEFAULT '' COMMENT '登录ip',
  `lasttime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录时间',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  `authority` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '管理员权限',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1-正常，0-禁用',
  PRIMARY KEY (`adminid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xg_admin
-- ----------------------------
INSERT INTO `xg_admin` VALUES ('1', 'admin', '268ba341d8b05bb7b6ae3bef5f38b027', 'Y73E8j', '管理员', '-1062731418', '1509428691', '972971435@qq.com', '1', '1508807883', '1');
INSERT INTO `xg_admin` VALUES ('9', 'demo', 'a2a17506efd298cc54dfdc8c7079ee44', 'Ixi7V1', '小张', '-1062731418', '1509091458', '972971435@qq.com', '2', '1508929004', '1');

-- ----------------------------
-- Table structure for `xg_article`
-- ----------------------------
DROP TABLE IF EXISTS `xg_article`;
CREATE TABLE `xg_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `ptitle` varchar(100) NOT NULL DEFAULT '',
  `pkeywords` varchar(255) NOT NULL DEFAULT '' COMMENT 'SEO关键字',
  `pdescription` varchar(255) NOT NULL DEFAULT '' COMMENT 'SEO描述',
  `thumb` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `catid` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '栏目Id',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `source` varchar(255) NOT NULL DEFAULT '' COMMENT '来源',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '编辑者',
  `gallery` text NOT NULL COMMENT '组图',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `viewtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击',
  `info` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xg_article
-- ----------------------------
INSERT INTO `xg_article` VALUES ('8', '1111', '', '1508807981', '1', '', '', '', '', '50', '1509007707', '本站', '0', 'admin', '', '0', '0', '');

-- ----------------------------
-- Table structure for `xg_articlecomment`
-- ----------------------------
DROP TABLE IF EXISTS `xg_articlecomment`;
CREATE TABLE `xg_articlecomment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `articleid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '文章ID',
  `articletitle` varchar(200) NOT NULL DEFAULT '' COMMENT '文章标题',
  `commenttitle` varchar(200) NOT NULL DEFAULT '' COMMENT '评论标题',
  `content` text NOT NULL COMMENT '评论内容',
  `info` smallint(6) unsigned NOT NULL DEFAULT '1' COMMENT '评论指数',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `replycontent` text NOT NULL COMMENT '回复内容',
  `replytime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_articlecomment
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_auth`
-- ----------------------------
DROP TABLE IF EXISTS `xg_auth`;
CREATE TABLE `xg_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0',
  `info` varchar(50) NOT NULL DEFAULT '' COMMENT '描述',
  `category` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '栏目管理',
  `article` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '文章管理',
  `download` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '下载管理',
  `jobs` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '招聘管理',
  `guest` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '全部留言',
  `newguest` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '新消息',
  `guestback` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '已回复',
  `member` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '会员列表',
  `site` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '基本设置',
  `flink` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '友情链接',
  `banner` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '幻灯片管理',
  `cache` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '清理缓存',
  `dbak` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '数据备份',
  `import` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '数据还原',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_auth
-- ----------------------------
INSERT INTO `xg_auth` VALUES ('1', '超级管理员', '1', '0', '管理整个网站后台', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `xg_auth` VALUES ('2', '总务科', '1', '1509088250', '管理后台文章发布及评论审核', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `xg_auth` VALUES ('3', '人事科', '1', '1509088266', '管理后台招聘信息及简历', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `xg_banner`
-- ----------------------------
DROP TABLE IF EXISTS `xg_banner`;
CREATE TABLE `xg_banner` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `cid` smallint(6) unsigned NOT NULL DEFAULT '1',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '幻灯片名称',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '链接',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `ishidden` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_banner
-- ----------------------------
INSERT INTO `xg_banner` VALUES ('1', '0', '1', 'http://www.baidu.com', '0', '/Uploads/Images/2017-10-30/59f6f806d92c8.jpg', '0', '1509357602');

-- ----------------------------
-- Table structure for `xg_category`
-- ----------------------------
DROP TABLE IF EXISTS `xg_category`;
CREATE TABLE `xg_category` (
  `catid` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `catname` varchar(30) NOT NULL DEFAULT '',
  `ecatname` varchar(100) NOT NULL DEFAULT '',
  `pid` int(6) NOT NULL DEFAULT '0',
  `thumb` varchar(100) NOT NULL DEFAULT '',
  `url` varchar(100) NOT NULL DEFAULT '',
  `sort` int(6) unsigned NOT NULL DEFAULT '0',
  `ismodel` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '1-文章，2-产品，3-视频，4-下载，5-招聘',
  `ispart` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `ishidden` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `issend` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `content` text NOT NULL,
  `page` int(6) unsigned NOT NULL DEFAULT '10',
  `ptitle` varchar(100) NOT NULL DEFAULT '',
  `pkeywords` varchar(255) NOT NULL DEFAULT '',
  `pdescription` text NOT NULL,
  `info` text NOT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xg_category
-- ----------------------------
INSERT INTO `xg_category` VALUES ('44', '首页', '', '0', '', 'index/index', '0', '0', '0', '0', '1', '', '10', '1111', '', '', '');
INSERT INTO `xg_category` VALUES ('45', '关于我们', '', '0', '', 'About/index', '0', '0', '1', '0', '0', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('46', '新闻中心', '', '0', '', '', '0', '1', '1', '0', '1', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('47', '业务领域', '', '0', '', '', '0', '0', '1', '0', '0', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('48', '人才招聘', '', '0', '', '', '0', '5', '1', '0', '0', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('49', '联系我们', '', '0', '', '', '0', '0', '1', '0', '0', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('50', '公司新闻', '', '46', '', '', '0', '1', '0', '1', '1', '', '0', '', '', '', '');
INSERT INTO `xg_category` VALUES ('51', '业务系统', '', '0', '', '', '0', '1', '1', '0', '1', '', '0', '', '', '', '');

-- ----------------------------
-- Table structure for `xg_config`
-- ----------------------------
DROP TABLE IF EXISTS `xg_config`;
CREATE TABLE `xg_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '配置名称',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '配置说明',
  `group` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '配置分组',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '配置说明',
  `value` text NOT NULL COMMENT '配置值',
  `inc_type` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_config
-- ----------------------------
INSERT INTO `xg_config` VALUES ('1', 'MAIL_HOST', 'smtp服务器', '1', 'smtp服务器的名称', 'smtp.yeah.net', 'smtp');
INSERT INTO `xg_config` VALUES ('2', 'MAIL_USERNAME', '邮箱用户名', '1', '您的邮箱用户名', 'comsystem@yeah.net', 'smtp');
INSERT INTO `xg_config` VALUES ('3', 'MAIL_FROM', '邮箱地址', '1', '发件人地址(也就是你的邮箱地址)', 'comsystem@yeah.net', 'smtp');
INSERT INTO `xg_config` VALUES ('4', 'MAIL_FROMNAME', '发件人姓名', '1', '发件人姓名', 'comsystem@yeah.net', 'smtp');
INSERT INTO `xg_config` VALUES ('5', 'MAIL_PASSWORD', '邮箱密码', '1', '配置的邮箱密码', 'ok990909', 'smtp');

-- ----------------------------
-- Table structure for `xg_download`
-- ----------------------------
DROP TABLE IF EXISTS `xg_download`;
CREATE TABLE `xg_download` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '标题',
  `content` text NOT NULL COMMENT '内容',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `keywords` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(200) NOT NULL DEFAULT '',
  `thumb` varchar(255) NOT NULL DEFAULT '',
  `catid` smallint(6) unsigned NOT NULL DEFAULT '0',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0',
  `source` varchar(100) NOT NULL DEFAULT '' COMMENT '来源',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '上传者',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '下载量',
  `file` varchar(200) NOT NULL DEFAULT '' COMMENT '附件',
  `filesize` varchar(50) NOT NULL DEFAULT '' COMMENT '附件大小',
  `filename` varchar(50) NOT NULL DEFAULT '' COMMENT '附件名称',
  `info` text NOT NULL COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_download
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_flink`
-- ----------------------------
DROP TABLE IF EXISTS `xg_flink`;
CREATE TABLE `xg_flink` (
  `linkid` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `cid` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '链接类型',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '链接名称',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '网址',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `logo` varchar(100) NOT NULL DEFAULT '' COMMENT '链接logo',
  `ishidden` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`linkid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xg_flink
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_guestbook`
-- ----------------------------
DROP TABLE IF EXISTS `xg_guestbook`;
CREATE TABLE `xg_guestbook` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL DEFAULT '',
  `content` text NOT NULL COMMENT '内容',
  `addtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0-未回复，1-已回复',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '姓名',
  `qq` varchar(20) NOT NULL DEFAULT '' COMMENT 'QQ',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  `telephone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话/手机号',
  `replytime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '回复时间',
  `replycontent` text NOT NULL COMMENT '回复内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_guestbook
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_jobjoin`
-- ----------------------------
DROP TABLE IF EXISTS `xg_jobjoin`;
CREATE TABLE `xg_jobjoin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `jobsid` int(10) unsigned NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '应聘职位',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '应聘者姓名',
  `sex` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '性别',
  `years` smallint(6) unsigned NOT NULL DEFAULT '1' COMMENT '工作年限',
  `telphone` varchar(20) NOT NULL DEFAULT '' COMMENT '联系方式',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '电子邮箱',
  `born` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '出生年月',
  `address` varchar(100) NOT NULL DEFAULT '' COMMENT '生源地',
  `current` varchar(100) NOT NULL DEFAULT '' COMMENT '现居地',
  `school` varchar(200) NOT NULL DEFAULT '' COMMENT '毕业学校',
  `qualifi` smallint(6) unsigned NOT NULL DEFAULT '1' COMMENT '学历',
  `profe` varchar(50) NOT NULL DEFAULT '' COMMENT '专业',
  `wage` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '期望工资',
  `certificate` text NOT NULL COMMENT '相关证书',
  `fortes` text NOT NULL COMMENT '技能与特长',
  `other` text NOT NULL COMMENT '自我评价',
  `addtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '提交时间',
  `status` tinyint(1) unsigned NOT NULL COMMENT '0-未查看，1-已查看',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_jobjoin
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_jobs`
-- ----------------------------
DROP TABLE IF EXISTS `xg_jobs`;
CREATE TABLE `xg_jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `company` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0-全职，1-兼职',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '职位',
  `keywords` varchar(100) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(200) NOT NULL DEFAULT '' COMMENT 'SEO描述',
  `catid` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '栏目Id',
  `rens` varchar(10) NOT NULL DEFAULT '1' COMMENT '招聘人数',
  `daiy` varchar(20) NOT NULL DEFAULT '0' COMMENT '工资',
  `qualifi` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0-不限，1-小学，2-初中，3-高中，4-大专，5-本科，6-研究生，7-硕士',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `content` text NOT NULL COMMENT '岗位职责',
  `inputtime` int(10) unsigned NOT NULL COMMENT '发布时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `years` text NOT NULL COMMENT '工作经验',
  `profe` text NOT NULL COMMENT '任职资格',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `info` text NOT NULL COMMENT '薪酬福利',
  `province` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '省份',
  `city` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '城市',
  `area` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '区域',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_product`
-- ----------------------------
DROP TABLE IF EXISTS `xg_product`;
CREATE TABLE `xg_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(200) NOT NULL DEFAULT '' COMMENT '产品名称',
  `content` text NOT NULL COMMENT '内容',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态',
  `ptitle` varchar(100) NOT NULL DEFAULT '',
  `pkeywords` varchar(255) NOT NULL DEFAULT '' COMMENT 'SEO关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT 'SEO描述',
  `thumb` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `catid` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '栏目ID',
  `updatetime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '链接',
  `gallery` text NOT NULL COMMENT '多图',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `price` varchar(255) NOT NULL DEFAULT '' COMMENT '价格',
  `item` varchar(10) NOT NULL DEFAULT '' COMMENT '编号',
  `brand` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌',
  `model` varchar(255) NOT NULL DEFAULT '' COMMENT '型号',
  `unit` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '单位',
  `stock` int(10) unsigned NOT NULL DEFAULT '9999' COMMENT '库存',
  `moq` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最小起批',
  `quality` varchar(255) NOT NULL DEFAULT '' COMMENT '质量',
  `color` varchar(255) NOT NULL DEFAULT '' COMMENT '颜色',
  `mark` varchar(255) NOT NULL COMMENT '标签',
  `yprice` varchar(255) NOT NULL DEFAULT '' COMMENT '原价',
  `info` text NOT NULL COMMENT '产品简介',
  `compro` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '推荐',
  `hotpro` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '热门',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_product
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_productcomment`
-- ----------------------------
DROP TABLE IF EXISTS `xg_productcomment`;
CREATE TABLE `xg_productcomment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `articleid` int(11) unsigned NOT NULL DEFAULT '0',
  `articletitle` varchar(200) NOT NULL DEFAULT '',
  `commenttitle` varchar(200) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `info` smallint(6) unsigned NOT NULL DEFAULT '1',
  `inputtime` int(10) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `replycontent` text NOT NULL,
  `replytime` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_productcomment
-- ----------------------------

-- ----------------------------
-- Table structure for `xg_site`
-- ----------------------------
DROP TABLE IF EXISTS `xg_site`;
CREATE TABLE `xg_site` (
  `siteid` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `companyname` varchar(100) NOT NULL DEFAULT '' COMMENT '公司名称',
  `ptitle` varchar(255) NOT NULL DEFAULT '',
  `pkeywords` varchar(255) NOT NULL DEFAULT '',
  `pdescription` text NOT NULL,
  `template_pc` varchar(100) NOT NULL DEFAULT '' COMMENT 'PC模板',
  `template_wap` varchar(100) NOT NULL DEFAULT '' COMMENT 'WAP模板',
  `pattern` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '后台风格',
  `site_phone` varchar(20) NOT NULL DEFAULT '' COMMENT '公司电话',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '网站网址',
  `site_logo` varchar(255) NOT NULL DEFAULT '',
  `site_address` varchar(255) NOT NULL DEFAULT '' COMMENT '公司地址',
  `site_email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱',
  `site_filing` varchar(100) NOT NULL DEFAULT '' COMMENT '备案号',
  `site_jstransfer` text NOT NULL COMMENT 'js代码调用',
  `site_copyright` text NOT NULL COMMENT '底部版权',
  `file_size` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '文件上传限制',
  PRIMARY KEY (`siteid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xg_site
-- ----------------------------
INSERT INTO `xg_site` VALUES ('1', '某某信息有限公司', '', '', '', 'default', 'default', '1', '020-8888888', 'http://www.gtt-gz.com/', '/Uploads/Images/2017-10-30/59f6b19e0ce83.png', '', '88888888@qq.com', '粤ICP备14014041号', '', '版权所有 Copyright(C)2015-2017 某某信息有限公司', '20');

-- ----------------------------
-- Table structure for `xg_user`
-- ----------------------------
DROP TABLE IF EXISTS `xg_user`;
CREATE TABLE `xg_user` (
  `userid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(32) NOT NULL DEFAULT '' COMMENT '用户密码',
  `lasttime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `money` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '金额',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  `nickname` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `encrypt` char(6) NOT NULL DEFAULT '' COMMENT '加密口令',
  `lastip` varchar(20) NOT NULL DEFAULT '' COMMENT '上次登录Ip',
  `regip` varchar(20) NOT NULL DEFAULT '' COMMENT '当前登录Ip',
  `regtime` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '当前登录时间',
  `point` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点劵',
  `groupid` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '会员组ID',
  `headpic` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `telphone` varchar(20) NOT NULL DEFAULT '' COMMENT '电话/手机',
  `sex` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '性别',
  `islock` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否锁定',
  `address` varchar(50) NOT NULL DEFAULT '' COMMENT '地址',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_user
-- ----------------------------
INSERT INTO `xg_user` VALUES ('1', 'demo', '7265e1d9ceaeec4c95fc9dad613c40d2', '1495696986', '0', '972971435@qq.com', 'demo', 'Thc9LN', '127.0.0.1', '127.0.0.1', '1495696986', '1000', '0', '', '13660661420', '0', '0', '湖南省衡阳市衡阳县演陂镇');

-- ----------------------------
-- Table structure for `xg_user_group`
-- ----------------------------
DROP TABLE IF EXISTS `xg_user_group`;
CREATE TABLE `xg_user_group` (
  `groupid` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '会员组ID',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '会员组名',
  `point` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所需点劵',
  `sort` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`groupid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_user_group
-- ----------------------------
INSERT INTO `xg_user_group` VALUES ('1', '初级会员', '1000', '0', '1');
INSERT INTO `xg_user_group` VALUES ('2', '中级会员', '2000', '0', '1');
INSERT INTO `xg_user_group` VALUES ('3', '高级会员', '3000', '0', '1');

-- ----------------------------
-- Table structure for `xg_video`
-- ----------------------------
DROP TABLE IF EXISTS `xg_video`;
CREATE TABLE `xg_video` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xg_video
-- ----------------------------
