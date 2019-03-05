<?php
namespace Common\Tag;
use Think\Template\TagLib;
class My extends TagLib {

    // 标签定义
    protected $tags   =  array(
        // 标签定义： attr 属性列表 close 是否闭合（0 或者1 默认1） alias 标签别名 level 嵌套层次
       'arclist' =>array('attr' => 'key,item,limit,catid,order','close' =>1),
	   'category'=>array('attr' => 'key,item,limit,pid,order,catid','close' =>1),
	   'flink'     =>array('attr' => 'key,item,limit,order,cid','close' =>1),
	   'banner'     =>array('attr' => 'key,item,limit,order,cid','close' =>1),
        );
    
	 public function _arclist ($tag,$content){
		
       $item=$tag['item'];
	   
	   $key=!empty($tag['key'])?$tag['key']:'key';
     
	   $where=!empty($tag['catid'])?'catid in ('.catid_str($tag['catid']).') and status=1':'status=1';
	 
       $limit=!empty($tag['limit'])?$tag['limit']:10;
 
       $order=!empty($tag['order'])?$tag['order']:'id desc';
	   
       $str='<?php ';
	   
       $str .= '$list=M("Article")->where("'.$where.'")->limit('.$limit.')->order("'.$order.'")->select();';//查询语句
 
	   
       $str .= 'foreach ($list as $'.$key.'=>$'.$item.'):?>';
	   
	   $str .= $content;
	   
       $str .='<?php endforeach; ?>';
	   
 
       return $str;
 
       }
	   
	  public function _category ($tag,$content){
		
       $item=$tag['item'];
	   
       $key=!empty($tag['key'])?$tag['key']:'key';
	   
	   
	   $where=!empty($tag['pid'])?'pid='.$tag['pid'].' and ishidden=0':'pid=0 and ishidden=0';
	   
	   if ($tag['catid'] != ""){
	   $where=!empty($tag['catid'])?'catid='.$tag['catid'].' and ishidden=0':'pid=0 and ishidden=0';
	   }
	   
       $limit=!empty($tag['limit'])?$tag['limit']:10;
 
       $order=!empty($tag['order'])?$tag['order']:'catid desc';
	   
       $str='<?php ';
	   
       $str .= '$list=M("Category")->where("'.$where.'")->limit('.$limit.')->order("'.$order.'")->select();';//查询语句
 
	   
       $str .= 'foreach ($list as $'.$key.'=>$'.$item.'):?>';
	   
	   $str .= $content;
	   
       $str .='<?php endforeach; ?>';
	   
 
       return $str;
 
       }
	   
	   
	 public function _banner ($tag,$content){
	   
	   $item=$tag['item'];
	   
	   $key=!empty($tag['key'])?$tag['key']:'key';
	   
	   $where=!empty($tag['cid'])?'cid='.$tag['cid'].' and ishidden=0':'cid=0 and ishidden=0';
      
       $limit=!empty($tag['limit'])?$tag['limit']:10;
 
       $order=!empty($tag['order'])?$tag['order']:'id desc';
	   
       $str='<?php ';
	   
       $str .= '$list=M("banner")->where("'.$where.'")->limit('.$limit.')->order("'.$order.'")->select();';//查询语句
 
	   
       $str .= 'foreach ($list as $'.$key.'=>$'.$item.'):?>';
	   
	   $str .= $content;
	   
       $str .='<?php endforeach; ?>';
	   
 
       return $str;
 
       }  
  
	 public function _flink ($tag,$content){
	   
	   $item=$tag['item'];
	   
	   $key=!empty($tag['key'])?$tag['key']:'key';
	   
	   $where=!empty($tag['cid'])?'cid='.$tag['cid'].' and ishidden=0':'cid=0 and ishidden=0';
      
       $limit=!empty($tag['limit'])?$tag['limit']:10;
 
       $order=!empty($tag['order'])?$tag['order']:'tagid desc';
	   
       $str='<?php ';
	   
       $str .= '$list=M("Flink")->where("'.$where.'")->limit('.$limit.')->order("'.$order.'")->select();';//查询语句
 
	   
       $str .= 'foreach ($list as $'.$key.'=>$'.$item.'):?>';
	   
	   $str .= $content;
	   
       $str .='<?php endforeach; ?>';
	   
 
       return $str;
 
       }  
 
}