<?php
namespace Admin\Controller;
use Think\Controller;
class VipController extends PublicController
{
    public function index()
    {
        $q = I('get.q');
        if (!empty($q)) {
            $where['username'] = array('like', '%' . $q . '%');
            $where['_logic'] = 'or';
            $map['_complex'] = $where;
        }
        $user = M('User');
        $count = $user->where($map)->count();
        $p = getpage($count, 10);
        $sql="SELECT xg_user.userid,xg_user.money,xg_user.betting,lev,xg_v_aft.username FROM xg_user,xg_v_aft where xg_v_aft.username=xg_user.username ORDER BY lev DESC LIMIT 0,10";
        $user_list=M()->query($sql);
        $i=0;
        foreach($user_list as $val)
        {
            
            $n_betting=$val['betting'];
            $user_list[$i]['n_betting']=300000-$n_betting;
            switch($n_betting){
               case $n_betting<300000:
                 $user_list[$i]['n_betting']=300000-$n_betting; //vip2
               break;
               case 300000<$n_betting && $n_betting<1000000:
                 $user_list[$i]['n_betting']=1000000-$n_betting; //vip3
               break;
               case 1000000<$n_betting && $n_betting<5000000:
                  $user_list[$i]['n_betting']=5000000-$n_betting; //vip4
               break;
               case 5000000<$n_betting && $n_betting<50000000:
                   $user_list[$i]['n_betting']=50000000-$n_betting; //vip5
               break;
               case 50000000<$n_betting && $n_betting<100000000:
                   $user_list[$i]['n_betting']=100000000-$n_betting; //vip6
               break;
               case 100000000<$n_betting && $n_betting<500000000:
                  $user_list[$i]['n_betting']=500000000-$n_betting; //vip7
               break;
               case 500000000<$n_betting && $n_betting<1000000000:
                 $user_list[$i]['n_betting']=1000000000-$n_betting; //vip8
               break;
               case 1000000000<$n_betting && $n_betting<3000000000:
                $user_list[$i]['n_betting']=3000000000-$n_betting; //vip9
               break;  
            }
            $i++;
        }

        foreach ($user_list as $k => $v) {
            $user_list[$k]['username'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['username']);
        }

        $this->assign('q', $q);
        $this->assign('user_list', $user_list);
        // 赋值数据集
        $this->assign('page', $p->show());
        // 赋值分页输出
        $this->display();
    }


    public function i_searchs()
    {
        $q = I('get.q');
        if (!empty($q)) {
            $where['username'] = array('like', '%' . $q . '%');
            $where['_logic'] = 'or';
            $map['_complex'] = $where;
        }
        $user = M('User');
        $count = $user->where($map)->count();
        $p = getpage($count, 10);
        $sql="SELECT xg_user.userid,xg_user.money,xg_user.betting,lev,xg_v_aft.username FROM xg_user,xg_v_aft where xg_v_aft.username=xg_user.username and xg_v_aft.username LIKE '%$q%' ORDER BY lev DESC LIMIT 0,10";
        $user_list=M()->query($sql);
        $i=0;
        foreach($user_list as $val)
        {
            
            $n_betting=$val['betting'];
            $user_list[$i]['n_betting']=300000-$n_betting;
            switch($n_betting){
               case $n_betting<300000:
                 $user_list[$i]['n_betting']=300000-$n_betting; //vip2
               break;
               case 300000<$n_betting && $n_betting<1000000:
                 $user_list[$i]['n_betting']=1000000-$n_betting; //vip3
               break;
               case 1000000<$n_betting && $n_betting<5000000:
                  $user_list[$i]['n_betting']=5000000-$n_betting; //vip4
               break;
               case 5000000<$n_betting && $n_betting<50000000:
                   $user_list[$i]['n_betting']=50000000-$n_betting; //vip5
               break;
               case 50000000<$n_betting && $n_betting<100000000:
                   $user_list[$i]['n_betting']=100000000-$n_betting; //vip6
               break;
               case 100000000<$n_betting && $n_betting<500000000:
                  $user_list[$i]['n_betting']=500000000-$n_betting; //vip7
               break;
               case 500000000<$n_betting && $n_betting<1000000000:
                 $user_list[$i]['n_betting']=1000000000-$n_betting; //vip8
               break;
               case 1000000000<$n_betting && $n_betting<3000000000:
                $user_list[$i]['n_betting']=3000000000-$n_betting; //vip9
               break;  
            }
            $i++;
        }

        foreach ($user_list as $k => $v) {
            $user_list[$k]['username'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['username']);
        }

        $this->assign('q', $q);
        $this->assign('user_list', $user_list);
        // 赋值数据集
        $this->assign('page', $p->show());
        // 赋值分页输出
        $this->display();
    }


    //充值
    public function add()
    {
        $dates=date('Y-m-d H:i:s',time());
        $this->assign('dates', $dates);
        $this->display();
    }

    //处理充值
    public function doadd()
    {
        if (IS_POST) {
            $data = I('post.');
            $data['system_date']=strtotime($data['system_date']);
            $user=M('user');
            $data['update_date']=time();
            $res=$user->where(array('username'=>$data['username']))->find();
            if($res>0){
                  $res['system_date']=$data['system_date'];
                  $res['money']=$res['money']+$data['money'];
                  $res['betting']=$res['betting']+$data['betting'];
                  $user=M('User');
                  $resid=$user->where(array('userid' =>$res['userid']))->save($res);
                  if($resid){
                    $data['uid']=$res['userid'];
                    $account=M('account');
                    $actid=$account->add($data);
                    if($actid>0)
                    {
                        $this->success('充值成功', U('Vip/index'));
                    }else{
                        $this->error('充值失败，请重新充值', U('Vip/add'));
                    }
                  }else{
                    $this->error('充值失败，请重新充值', U('Vip/add'));
                  }        
            }else{
                $lastInsid=$user->add($data);
                if($lastInsid){
                    $data['uid']=$lastInsid;
                    $account=M('account');
                    $actid=$account->add($data);
                    if($actid>0)
                    { 
                        $this->success('充值成功', U('Vip/index'));
                    }else{
                        $this->error('充值失败，请重新充值', U('Vip/add'));
                    }
                } 
            }
        }
    }

    //会员奖金显示列表
    public function bonus_lists()
    {
        $q = I('get.q');
        if (!empty($q)) {
            $where['username'] = array('like', '%' . $q . '%');
            $where['_logic'] = 'or';
            $map['_complex'] = $where;
        }
        $lotteries = M('Lotteries');
        $count = $lotteries->where($map)->count();
        $p = getpage($count, 10);
        $lotteries_list = $lotteries->where($map)->order('id desc')->limit($p->firstRow, $p->listRows)->select();

        $i=0;
        foreach($lotteries_list as $val)
        {
            
            $n_betting=$val['money'];
            $lotteries_list[$i]['n_betting']=300000-$n_betting;
            switch($n_betting){
               case $n_betting<300000:
                 $lotteries_list[$i]['n_betting']=300000-$n_betting; //vip2
               break;
               case 300000<$n_betting && $n_betting<1000000:
                 $lotteries_list[$i]['n_betting']=1000000-$n_betting; //vip3
               break;
               case 1000000<$n_betting && $n_betting<5000000:
                 $lotteries_list[$i]['n_betting']=5000000-$n_betting; //vip4
               break;
               case 5000000<$n_betting && $n_betting<50000000:
                 $lotteries_list[$i]['n_betting']=50000000-$n_betting; //vip5
               break;
               case 50000000<$n_betting && $n_betting<100000000:
                 $lotteries_list[$i]['n_betting']=100000000-$n_betting; //vip6
               break;
               case 100000000<$n_betting && $n_betting<500000000:
                 $lotteries_list[$i]['n_betting']=500000000-$n_betting; //vip7
               break;
               case 500000000<$n_betting && $n_betting<1000000000:
                 $lotteries_list[$i]['n_betting']=1000000000-$n_betting; //vip8
               break;
               case 1000000000<$n_betting && $n_betting<3000000000:
                 $lotteries_list[$i]['n_betting']=3000000000-$n_betting; //vip9
               break;  
            }
            $i++;
        }

        foreach ($lotteries_list as $k => $v) {
            $lotteries_list[$k]['username'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['username']);
        }
        $this->assign('q', $q);
        $this->assign('lotteries_list', $lotteries_list);
        // 赋值数据集
        $this->assign('page', $p->show());
        // 赋值分页输出
        $this->display();
    }

    //导入奖金execl表
    public function b_imports()
    {
        $this->display();
    }

    //处理导入奖金execl表
    public function do_bimports()
    {
        if (!empty($_FILES)){  
            $upload = new \Think\Upload();                      // 实例化上传类  
            $upload->maxSize   = 10485760 ;                 // 设置附件上传大小  
            $upload->exts      = array('xls','xlsx');       // 设置附件上传类型  
            $upload->rootPath  = './Public/Excel/';             // 设置附件上传根目录  
            $upload->autoSub   = false;                         // 将自动生成以photo后面加时间的形式文件夹，关闭  
            // 上传文件  
            $info   = $upload->upload();                            // 上传文件  ;
            $exts   = $info['myfile']['ext'];                                 // 获取文件后缀  
            $filename = $upload->rootPath.$info['myfile']['savename'];        // 生成文件路径名  
            if(!$info) {                                                    // 上传错误提示错误信息  
                $this->error($upload->getError());   
            }else{                                                        // 上传成功  
                import("Org.Util.PHPExcel");  
                import("Org.Util.PHPExcel.IOFactory.php");                     // 导入PHPExcel类库，因为PHPExcel没有用命名空间，只能import导入  
                $PHPExcel = new \PHPExcel();                                // 创建PHPExcel对象，注意，不能少了\  
                if ($exts == 'xls') {                                       // 如果excel文件后缀名为.xls，导入这个类  
                    import("Org.Util.PHPExcel.Reader.Excel5");  
                    $PHPReader = new \PHPExcel_Reader_Excel5();  
                } else   
  
                    if ($exts == 'xlsx') {  
                        import("Org.Util.PHPExcel.Reader.Excel2007");  
                        $PHPReader = new \PHPExcel_Reader_Excel2007();  
                }

                $PHPExcel=$PHPReader->load($filename);  
                $currentSheet = $PHPExcel->getSheet(0);                      // 获取表中的第一个工作表，如果要获取第二个，把0改为1，依次类推  
                $allColumn = $currentSheet->getHighestColumn();              // 获取总列数  
                $allRow = $currentSheet->getHighestRow();                    // 获取总行数  

                $sqls="delete from xg_lotteries";
                $rsd=M()->execute($sqls);

                $i=1;
                for ($j = 2; $j <= $allRow; $j++) {  
                $username=$data[$i]['username'] = $PHPExcel->getActiveSheet()->getCell("A".$j)->getValue();//获取A(用户账户)列的值
                $vip_level=$data[$i]['vip_level'] = intval($PHPExcel->getActiveSheet()->getCell("B".$j)->getValue());//获取B(充值金额)列的值
                $money=$data[$i]['money'] = intval($PHPExcel->getActiveSheet()->getCell("C".$j)->getValue());//获取C(累计投注金额)列的值
                $better=$data[$i]['better'] = intval($PHPExcel->getActiveSheet()->getCell("D".$j)->getValue());//获取D（当月有效投注）
                $gold=$data[$i]['luck'] = intval($PHPExcel->getActiveSheet()->getCell("E".$j)->getValue());//获取E（当月好运金）
                $luck=$data[$i]['gold'] = intval($PHPExcel->getActiveSheet()->getCell("F".$j)->getValue());//获取F(晋级彩金)
                $sql="select `id`,`username`,`vip_level`,`money`,`better`,`gold`,`luck` from xg_lotteries where username='$username'";
                $qian=$money;
                $rid=M()->query($sql);
                if(!empty($rid)){
                    $money=$data[$i]['money'] = intval($PHPExcel->getActiveSheet()->getCell("C".$j)->getValue())+intval($rid[0]['money']);//获取C(充值金额)列的值
                    $sql="update xg_lotteries set `vip_level`='$vip_level', `money`='$money',`better`='$better', `gold`='$gold', `luck`='$luck' where username='$username'";
                    $ress=M()->execute($sql);  
                    if($ress){
                         $username=$rid[0]['username'];
                         $money=$qian;
                         $update_date=date('y-m-d',time());
                         $sql="insert into xg_b_account(`username`,`vip_level`,`money`,`better`,`gold`,`luck`,`update_date`) values('$username','$vip_level','$money','$better','$gold','$luck','$update_date')";
                         $res=M()->execute($sql);
                        }
                } else{
                    $sql="insert ignore xg_lotteries(`username`,`vip_level`,`money`,`better`,`gold`,`luck`) values('$username','$vip_level','$money','$better','$gold','$luck')";
                    $lastInsid=M()->execute($sql);
                    if($lastInsid)
                    {
                        $update_date=date('y-m-d',time());
                        $sql="insert into xg_b_account(`username`,`vip_level`,`money`,`better`,`gold`,`luck`,`update_date`) values('$username','$vip_level','$money','$better','$gold','$luck','$update_date')";
                        $res=M()->execute($sql);  
                    }
                }    
              } 

            if($res){                                         
                $this->success("导入成功",U('Vip/bonus_lists'));  
            }else{  
                $this->error("导入失败，原因可能是excel表中格式错误","5");// 提示错误  
               }  
            }  
        }else {  
          $this->display();   
        }      
        
    }

    //流水账显示列表
    public function account_lists()
    {
        $account = M('Account');
        $count = $account->count();
        $p = getpage($count, 10);
        $account_list = $account->order('id ASC')->limit($p->firstRow, $p->listRows)->select();
        $i=0;
        foreach ($account_list as $val) {
            $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
            $i++;
        }
        $this->assign('q', $q);
        $this->assign('account_list', $account_list);
        // 赋值数据集
        $this->assign('page', $p->show());
        // 赋值分页输出
        $this->display();
    }

    //查询
    public function searchs()
    {
        $q = I('get.q');
        $start=I('get.start');
        $end=I('get.end');
        if (!empty($q) && empty($start) && empty($end)) {
            $where['username'] = array('like', '%' . $q . '%');
            $where['_logic'] = 'or';
            $map['_complex'] = $where;
            $account = M('Account');
            $count =$account->where($map)->count();
            $p = getpage($count, 10);
            $countm=0;
            $countb=0;
            $account_list = $account->where($map)->order('id ASC')->limit($p->firstRow, $p->listRows)->select();
            $i=0;
          
            foreach ($account_list as $val) {
                $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
                $countm=$countm+$account_list[$i]['money'];
                $countb=$countb+$account_list[$i]['betting'];
                $i++;
            }
          
            foreach ($account_list as $k => $v) {
                $account_list[$k]['username'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['username']);
            }
         
            
            $this->assign('q', $q);
            $this->assign('start', $start);
            $this->assign('end', $end);
            $this->assign('countm', $countm);
            $this->assign('countb', $countb);
            $this->assign('account_list',$account_list);
            //赋值数据集
            $this->assign('page', $p->show());
           // 赋值分页输出
            $this->display();
        }else if(!empty($q) && !empty($start) && !empty($end)){
            $start=strtotime($_GET['start']);
            $end=strtotime($_GET['end']);
            $sql="select * from xg_account";
            $userlist=M()->query($sql);
            $countm=0;
            $countb=0;
            foreach($userlist as $val)
            {
                $update_date=$val['update_date'];
                $sql="select * from xg_account where `username`='$q' and `update_date`>='$start' and update_date<='$end'";
                $account_list=M()->query($sql);
            }

            $i=0;
            foreach ($account_list as $val) {
                $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
                $countm=$countm+$account_list[$i]['money'];
                $countb=$countb+$account_list[$i]['betting'];
                $i++;
            }
            foreach ($account_list as $k => $v) {
                $account_list[$k]['username'] = str_replace($q, '<font color=red>' . $q . '</font>', $v['username']);
            }

            $this->assign('q', $q);
            $this->assign('start', $start);
            $this->assign('end', $end);
            $this->assign('account_list', $account_list);
            $this->assign('countm', $countm);
            $this->assign('countb', $countb);
            // 赋值数据集
            //$this->assign('page', $p->show());
            // 赋值分页输出
            $this->display();
        }
    }

    //导出用户信息
    public function exports()
    {
        //$date=date('Y-m-d',time()).'-'.time();
        $date=date('Y-m-d',time());
        $fileName="用户充值金额投注表{$date}";
        $user=M('User');
        $user_list=$user->select();

        foreach ($user_list as $k => $v) {
            $w[$k] = $v['level'];
            switch ($w[$k]) {
                case 1:
                    $user_list[$k]['level'] = 'VIP1';
                    break;
                case 2:
                    $user_list[$k]['level'] = 'VIP2';
                    break;
                case 3:
                    $user_list[$k]['level'] = 'VIP3';
                    break;
                case 4:
                    $user_list[$k]['level'] = 'VIP4';
                    break;
                case 5:
                    $user_list[$k]['level'] = 'VIP5';
                    break;
                case 6:
                    $user_list[$k]['level'] = 'VIP6';
                    break;
                case 7:
                    $user_list[$k]['level'] = 'VIP7';
                    break;
                case 8:
                    $user_list[$k]['level'] = 'VIP8';
                    break;
                case 9:
                    $user_list[$k]['level'] = 'SVIP';
                    break;
            }
        }

        $i=0;
        foreach($user_list as $val)
        {
            

            $user_list[$i]['system_date']=date('Y-m-d H:i:s',$val['system_date']);
            $user_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
            $i++;
        }

        import("Org.Util.PHPExcel");
        import("Org.Util.PHPExcel.Reader.Excel5");
        $objPHPExcel=new \PHPExcel();
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(12);
        $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
        $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);    
        $objPHPExcel->getActiveSheet()->setCellValue('A1','用户id');
        $objPHPExcel->getActiveSheet()->setCellValue('B1','用户账户');
        $objPHPExcel->getActiveSheet()->setCellValue('C1','充值金额');
        $objPHPExcel->getActiveSheet()->setCellValue('D1','有效投注');
        $objPHPExcel->getActiveSheet()->setCellValue('E1','会员等级');
        $objPHPExcel->getActiveSheet()->setCellValue('F1','充值时间');
        $objPHPExcel->getActiveSheet()->setCellValue('G1','更新时间');
        $i = 2;
        foreach($user_list as $r){
        $objPHPExcel->getActiveSheet()->setCellValue('A'.$i,$r['userid']);
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$i,$r['username']);
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$i,$r['money']);
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$i,$r['betting']);
        $objPHPExcel->getActiveSheet()->setCellValue('E'.$i,$r['level']);
        $objPHPExcel->getActiveSheet()->setCellValue('F'.$i,$r['system_date']);
        $objPHPExcel->getActiveSheet()->setCellValue('G'.$i,$r['update_date']);
        $i++;
        }

        $objPHPExcel->getActiveSheet()->setTitle('用户充值金额投注表');
        $fileName = iconv("utf-8", "gb2312", $fileName);
        //设置活动单指数到第一个表,所以Excel打开这是第一个表
        $objPHPExcel->setActiveSheetIndex(0);
        ob_end_clean();//清除缓冲区,避免乱码
        header('Content-Type: application/vnd.ms-excel');//告诉浏览器将要输出excel03文件
        header("Content-Disposition: attachment;filename=\"$fileName\".xls");//告诉浏览器将输出文件的名称(文件下载)
        header('Cache-Control: max-age=0');//禁止缓存
        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output');//告诉浏览器下载
        exit;
    }

    //导出流水账Excel
    public function account_exports()
    {
        $date=date('Y-m-d',time());
        $fileName="用户充值流水账表{$date}";
        $account=M('Account');
        $account_list=$account->select();
        $i=0;
        foreach($account_list as $val)
        {
            
            $account_list[$i]['system_date']=date('Y-m-d H:i:s',$val['system_date']);
            $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
            $i++;
        }

        import("Org.Util.PHPExcel");
        import("Org.Util.PHPExcel.Reader.Excel5");
        $objPHPExcel=new \PHPExcel();
        $objPHPExcel->getDefaultStyle()->getFont()->setSize(12);
        $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
        $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);    
        $objPHPExcel->getActiveSheet()->setCellValue('A1','记录id');
        $objPHPExcel->getActiveSheet()->setCellValue('B1','用户id');
        $objPHPExcel->getActiveSheet()->setCellValue('C1','用户名称');
        $objPHPExcel->getActiveSheet()->setCellValue('D1','充值金额');
        $objPHPExcel->getActiveSheet()->setCellValue('E1','有效投注');
        $objPHPExcel->getActiveSheet()->setCellValue('F1','充值时间');
        $objPHPExcel->getActiveSheet()->setCellValue('G1','更新时间');
        $i = 2;
        foreach($account_list as $r){
        $objPHPExcel->getActiveSheet()->setCellValue('A'.$i,$r['id']);
        $objPHPExcel->getActiveSheet()->setCellValue('B'.$i,$r['uid']);
        $objPHPExcel->getActiveSheet()->setCellValue('C'.$i,$r['username']);
        $objPHPExcel->getActiveSheet()->setCellValue('D'.$i,$r['money']);
        $objPHPExcel->getActiveSheet()->setCellValue('E'.$i,$r['betting']);
        $objPHPExcel->getActiveSheet()->setCellValue('F'.$i,$r['system_date']);
        $objPHPExcel->getActiveSheet()->setCellValue('G'.$i,$r['update_date']);
        $i++;
        }

        $objPHPExcel->getActiveSheet()->setTitle('用户充值流水账表');
        $fileName = iconv("utf-8", "gb2312", $fileName);
        //设置活动单指数到第一个表,所以Excel打开这是第一个表
        $objPHPExcel->setActiveSheetIndex(0);
        ob_end_clean();//清除缓冲区,避免乱码
        header('Content-Type: application/vnd.ms-excel');//告诉浏览器将要输出excel03文件
        header("Content-Disposition: attachment;filename=\"$fileName\".xls");//告诉浏览器将输出文件的名称(文件下载)
        header('Cache-Control: max-age=0');//禁止缓存
        $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
        $objWriter->save('php://output');//告诉浏览器下载
        exit;   
    }

    //导出搜索流水账
    public function s_exports()
    {
        $date=date('Y-m-d',time());
        $username= I('post.q');
        $start=I('post.start');
        $end=I('post.end');
        $fileName="{$username}用户充值投注流水账表{$date}";
        if (!empty($username) && empty($start) && empty($end)) {
            $account = M('Account');
            $countm=0;
            $countb=0;
            $sql="select * from xg_account where `username`='$username'";
            $account_list=M()->query($sql);
            $i=0;
            foreach ($account_list as $val) {
                $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
                $countm=$countm+$account_list[$i]['money'];
                $countb=$countb+$account_list[$i]['betting'];
                $i++;
            }     
            import("Org.Util.PHPExcel");
            import("Org.Util.PHPExcel.Reader.Excel5");
            $objPHPExcel=new \PHPExcel();
            $objPHPExcel->getDefaultStyle()->getFont()->setSize(12);
            $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);  
            $objPHPExcel->getActiveSheet()->setCellValue('A1','记录id');
            $objPHPExcel->getActiveSheet()->setCellValue('B1','用户id');
            $objPHPExcel->getActiveSheet()->setCellValue('C1','用户名称');
            $objPHPExcel->getActiveSheet()->setCellValue('D1','充值金额');
            $objPHPExcel->getActiveSheet()->setCellValue('E1','有效投注');
            $objPHPExcel->getActiveSheet()->setCellValue('F1','充值时间');
            $objPHPExcel->getActiveSheet()->setCellValue('G1','金额总数');
            $objPHPExcel->getActiveSheet()->setCellValue('H1','投注总数');
            $i = 2;
            foreach($account_list as $r){
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$i,$r['id']);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$i,$r['uid']);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$i,$r['username']);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$i,$r['money']);
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$i,$r['betting']);
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$i,$r['update_date']);
            $i++;
            }
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$i,$countm);
            $objPHPExcel->getActiveSheet()->setCellValue('H'.$i,$countb);

            $objPHPExcel->getActiveSheet()->setTitle('用户充值流水账表');
            $fileName = iconv("utf-8", "gb2312", $fileName);
            //设置活动单指数到第一个表,所以Excel打开这是第一个表
            $objPHPExcel->setActiveSheetIndex(0);
            ob_end_clean();//清除缓冲区,避免乱码
            header('Content-Type: application/vnd.ms-excel');//告诉浏览器将要输出excel03文件
            header("Content-Disposition: attachment;filename=\"$fileName\".xls");//告诉浏览器将输出文件的名称(文件下载)
            header('Cache-Control: max-age=0');//禁止缓存
            $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
            $objWriter->save('php://output');//告诉浏览器下载
            exit;   
        }else if(!empty($username) && !empty($start) && !empty($end)){
            $sql="select * from xg_account";
            $user_list=M()->query($sql);
            $countm=0;
            $countb=0;
            foreach($user_list as $val)
            {
                $update_date=$val['update_date'];
                $sql="select * from xg_account where `username`='$username' and `update_date`>='$start' and update_date<='$end'";
                $account_list=M()->query($sql);
            }

            $i=0;
            foreach ($account_list as $val) {
                $account_list[$i]['update_date']=date('Y-m-d H:i:s',$val['update_date']);
                $countm=$countm+$account_list[$i]['money'];
                $countb=$countb+$account_list[$i]['betting'];
                $i++;
            }

            import("Org.Util.PHPExcel");
            import("Org.Util.PHPExcel.Reader.Excel5");
            $objPHPExcel=new \PHPExcel();
            $objPHPExcel->getDefaultStyle()->getFont()->setSize(12);
            $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(20);
            $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);    
            $objPHPExcel->getActiveSheet()->setCellValue('A1','记录id');
            $objPHPExcel->getActiveSheet()->setCellValue('B1','用户id');
            $objPHPExcel->getActiveSheet()->setCellValue('C1','用户名称');
            $objPHPExcel->getActiveSheet()->setCellValue('D1','充值金额');
            $objPHPExcel->getActiveSheet()->setCellValue('E1','有效投注');
            $objPHPExcel->getActiveSheet()->setCellValue('F1','充值时间');
            $objPHPExcel->getActiveSheet()->setCellValue('G1','金额总数');
            $objPHPExcel->getActiveSheet()->setCellValue('H1','投注总数');
            $i = 2;
            foreach($account_list as $r){
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$i,$r['id']);
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$i,$r['uid']);
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$i,$r['username']);
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$i,$r['money']);
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$i,$r['betting']);
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$i,$r['update_date']);
            $i++;
            }
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$i,$countm);
            $objPHPExcel->getActiveSheet()->setCellValue('H'.$i,$countb);

            $objPHPExcel->getActiveSheet()->setTitle('用户充值流水账表');
            $fileName = iconv("utf-8", "gb2312", $fileName);
            //设置活动单指数到第一个表,所以Excel打开这是第一个表
            $objPHPExcel->setActiveSheetIndex(0);
            ob_end_clean();//清除缓冲区,避免乱码
            header('Content-Type: application/vnd.ms-excel');//告诉浏览器将要输出excel03文件
            header("Content-Disposition: attachment;filename=\"$fileName\".xls");//告诉浏览器将输出文件的名称(文件下载)
            header('Cache-Control: max-age=0');//禁止缓存
            $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
            $objWriter->save('php://output');//告诉浏览器下载
            exit;  
        }
    }



    public function imports()
    {
     $this->display();
    }

    //导入用户充值投注Excel表
    public function doimports()
    {
        if (!empty($_FILES)){  
            $upload = new \Think\Upload();                      // 实例化上传类  
            $upload->maxSize   = 10485760 ;                 // 设置附件上传大小  
            $upload->exts      = array('xls','xlsx');       // 设置附件上传类型  
            $upload->rootPath  = './Public/Excel/';             // 设置附件上传根目录  
            $upload->autoSub   = false;                         // 将自动生成以photo后面加时间的形式文件夹，关闭  
            // 上传文件  
            $info   = $upload->upload();                            // 上传文件  ;
            $exts   = $info['myfile']['ext'];                                 // 获取文件后缀  
            $filename = $upload->rootPath.$info['myfile']['savename'];        // 生成文件路径名  
            if(!$info) {                                                    // 上传错误提示错误信息  
                $this->error($upload->getError());   
            }else{                                                          // 上传成功  
                import("Org.Util.PHPExcel");  
                import("Org.Util.PHPExcel.IOFactory.php");                     // 导入PHPExcel类库，因为PHPExcel没有用命名空间，只能import导入  
                $PHPExcel = new \PHPExcel();                                // 创建PHPExcel对象，注意，不能少了\  
                if ($exts == 'xls') {                                       // 如果excel文件后缀名为.xls，导入这个类  
                    import("Org.Util.PHPExcel.Reader.Excel5");  
                    $PHPReader = new \PHPExcel_Reader_Excel5();  
                } else   
  
                    if ($exts == 'xlsx') {  
                        import("Org.Util.PHPExcel.Reader.Excel2007");  
                        $PHPReader = new \PHPExcel_Reader_Excel2007();  
                }

                $PHPExcel=$PHPReader->load($filename);  
                $currentSheet = $PHPExcel->getSheet(0);                      // 获取表中的第一个工作表，如果要获取第二个，把0改为1，依次类推  
                $allColumn = $currentSheet->getHighestColumn();              // 获取总列数  
                $allRow = $currentSheet->getHighestRow();                    // 获取总行数  

                $sqls="delete from xg_account where routes='充值'";
                $rsd=M()->execute($sqls);
                $sqla="update xg_user set `money`='0',`betting`='0'";
                $rsd=M()->execute($sqla);

                $i=1;
                for ($j = 2; $j <= $allRow; $j++) {  
                $username=$data[$i]['username'] = $PHPExcel->getActiveSheet()->getCell("A".$j)->getValue();//获取B(用户账户)列的值
                $money=$data[$i]['money'] = intval($PHPExcel->getActiveSheet()->getCell("B".$j)->getValue());//获取D(充值金额)列的值
                $betting=$data[$i]['betting'] = intval($PHPExcel->getActiveSheet()->getCell("C".$j)->getValue());//获取D(有效投注)列的值
                //$level=$data[$i]['level'] = intval($PHPExcel->getActiveSheet()->getCell("D".$j)->getValue());//获取D(会员等级)列的值
                $update_date=$data[$i]['update_date'] =gmdate("Y-m-d H:i:s",\PHPExcel_Shared_Date::ExcelToPHP($PHPExcel->getActiveSheet()->getCell("D".$j)->getValue()));  
                $update_date=strtotime($update_date);
                $system_date=$update_date;
                $qian=$money;
                $touzhu=$betting;
                $i++; 
                $sql="select `userid`,`username`,`money`,`betting`,`system_date`,`update_date` from xg_user where username='$username'";
                $rid=M()->query($sql);
                if(!empty($rid)){
                    $money=$data[$i]['money'] = intval($PHPExcel->getActiveSheet()->getCell("B".$j)->getValue())+intval($rid[0]['money']);//获取D(充值金额)列的值
                    $betting=$data[$i]['betting'] = intval($PHPExcel->getActiveSheet()->getCell("C".$j)->getValue())+$rid[0]['betting'];//获取D(积分)列的值
                    //$level=$PHPExcel->getActiveSheet()->getCell("D".$j)->getValue();
                    // switch($level){
                    //     case vip1:
                    //     $level=$rid[0]['level'] = 1;
                    //     break;
                    //     case vip2:
                    //     $level=$rid[0]['level'] = 2;
                    //     break;
                    //     case vip3:
                    //     $level=$rid[0]['level'] = 3;
                    //     break;
                    //     case vip4:
                    //     $level=$rid[0]['level'] = 4;
                    //     break;
                    //     case vip5:
                    //     $level=$rid[0]['level'] = 5;
                    //     break;
                    //     case vip6:
                    //     $level=$rid[0]['level'] = 6;
                    //     break;
                    //     case vip7:
                    //     $level=$rid[0]['level'] = 7;
                    //     break;
                    //     case vip8:
                    //     $level=$rid[0]['level'] = 8;
                    //     break;
                    //     case svip:
                    //     $level=$rid[0]['level'] = 9;
                    //     break;
                    // }
                    $system_date[$i]['system_date']=$rid[0]['system_date'];
                    $sql="update xg_user set `money`='$money',`betting`='$betting',`update_date`='$update_date' where username='$username'";
                    $ress=M()->execute($sql);  
                    if($ress){
                         $uid=$rid[0]['userid'];
                         $username=$rid[0]['username'];
                         $money=$qian;
                         $betting=$touzhu;
                         $update_date=$update_date;
                         $routes="充值";
                         $sql="insert into xg_account(`uid`,`username`,`money`,`betting`,`update_date`,`routes`) values('$uid','$username','$money','$betting','$update_date','$routes')";
                         $res=M()->execute($sql);
                        }
                }else{
                    //$level=$PHPExcel->getActiveSheet()->getCell("D".$j)->getValue();
                    // switch($level){
                    //     case vip1:
                    //     $level= 1;
                    //     break;
                    //     case vip2:
                    //     $level= 2;
                    //     break;
                    //     case vip3:
                    //     $level = 3;
                    //     break;
                    //     case vip4:
                    //     $level = 4;
                    //     break;
                    //     case vip5:
                    //     $level = 5;
                    //     break;
                    //     case vip6:
                    //     $level = 6;
                    //     break;
                    //     case vip7:
                    //     $level = 7;
                    //     break;
                    //     case vip8:
                    //     $level = 8;
                    //     break;
                    //     case svip:
                    //     $level = 9;
                    //     break;
                    // }
                    $sql="insert ignore xg_user(`userid`,`username`,`money`,`betting`,`level`,`system_date`,`update_date`) values('','$username','$money','$betting','','$system_date','$update_date')";
                    $lastInsid=M()->execute($sql); 
                    if($lastInsid)
                    {
                        $lastInsid= $lastInsid;
                        $money=$qian;
                        $integral=$touzhu;
                        $routes="充值";
                        $sql="insert into xg_account(`uid`,`username`,`money`,`betting`,`update_date`,`routes`) values('$uid','$username','$money','$betting','$update_date','$routes')";
                        $res=M()->execute($sql);
                    }
                }    
              }  

            if($res){                                         
                $this->success("导入成功",U('Vip/index'));  
            }else{  
                $this->error("导入失败，原因可能是excel表中格式错误","5");// 提示错误  
               }  
            }  
        }else {  
          $this->display();   
        }  
    }


    //自动结算
    // public function Auto_weeks()
    // {
    //     $w   = date( "w",time());   //这天是星期几
    //     $w=$w==0?7:$w;
    //     $d0  = mktime   (0,0,0,date( "m"), date( "d") - $w - 6,date( "Y"));       //创建上周开始时间
    //     $d1  = mktime   (23,59,59,date( "m"), date( "d") - $w,date( "Y"));       //创建上周结束时间
    //     //查询数据库
    //     $User = M("User")->select();
    //     foreach ($User as $k=>$v){
    //         //计算金额
    //         $where="update_date betwwen '".$d0."' and '".$d1."' and uid=".$v['userid'];
    //         $data = M("account")->filed('sum(money) as money')->where($where)->find();
    //         //更改等级
    //         $level=0;
    //         switch($data['money']){
    //             case money>=100:
    //                 $level=1;
    //                 break;
    //             case  money>=100:
    //                 $level=2;
    //                 break;
    //             case  money>=100:
    //                 $level=3;
    //                 break;
    //         }
    //         M("User")->where("userid=".$v['userid'])->save(['level'=>$level]);
    //     }
    // }


    //ip界面
    public  function ip()
    {
       $this->display();
    }
}
?>