<?php
namespace Admin\Controller;
use Think\Controller;

class IpController extends PublicController
{
    public function ip()
    {
        $q = I('get.q');
        if (!empty($q)) {
            $where['ip'] = array('like', '%' . $q . '%');
            $where['_logic'] = 'or';
            $map['_complex'] = $where;
        }
        $ip = M('Ip');
        $count = $ip->where($map)->count();
        $p = getpage($count, 10);
        $ip_list = $ip ->where($map)->order('id desc')->limit($p->firstRow, $p->listRows)->select();
        foreach ($ip_list as $k => $v) {
            $ip_list[$k]['ip'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['ip']);
        }
        $this->assign('q', $q);
        $this->assign('ip_list', $ip_list);
        // 赋值数据集
        $this->assign('page', $p->show());
        // 赋值分页输出
        $this->display();
    }
   
   //添加ip
    public function add(){
        $this->display();
    }

  //处理添加Ip
    public function doadd()
    {
        if (IS_POST) {
            $data = I('post.');
            $ip=M('Ip');
            $ipid=$ip->add($data);
            if($ipid)
            {
                $this->success('添加成功', U('Ip/ip'));
            }else{
                $this->success('添加失败功', U('Ip/ip'));
            }
        }
    }

   //删除Ip
	public function delete()
	{
       $id = I('get.id', 0, 'intval');
		if (!$id) {
            $this->error('参数错误');
        }
		if (M('Ip')->where(array('id'=>$id))->delete()) {
            $this->success('删除成功');
        } else {
            $this->error('删除失败');
        }
    }
}
?>