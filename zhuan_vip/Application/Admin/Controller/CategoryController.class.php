<?php
namespace Admin\Controller;
use Think\Controller;
class CategoryController extends PublicController
{
    public function index()
    {
        $list = $this->listCate();
        $this->assign('list', $list);
        $this->display();
    }
    public function add()
    {
        $list = $this->listCate();
        $this->assign('list', $list);
        $this->display();
    }
    public function addBatch()
    {
        $list = $this->listCate();
        $this->assign('list', $list);
        $this->display();
    }
    public function checkCatnameUnique()
    {
        $catname = $_POST['param'];
        if (!is_username($catname)) {
            $this->ajaxReturn(array('info' => '格式不正确', 'status' => 'n'));
        }
        if (M('Category')->where(array('catname' => $catname))->find()) {
            $this->ajaxReturn(array('info' => '栏目已存在', 'status' => 'n'));
        }
        $this->ajaxReturn(array('info' => '输入正确', 'status' => 'y'));
    }
    public function checkHtml()
    {
        $html = $_POST['param'];
        if (preg_match('/^(.+).html$/', $html)) {
            $this->ajaxReturn(array('info' => '输入正确', 'status' => 'y'));
        } else {
            $this->ajaxReturn(array('info' => '格式不正确', 'status' => 'n'));
        }
    }
    public function insert()
    {
        if (IS_POST) {
            $data = I('post.');
			$catname = I('post.catname');
			if ($catname == '') {
				$this->error('请输入栏目名称');	
			}
            if (!empty($_POST['editorValue'])) {
                $data['content'] = auto_save_image($_POST['editorValue']);
            }
			$data['info'] = auto_save_image($_POST['info']);
			$data['content'] = htmlspecialchars_decode($data['editorValue']);
			if ($_POST['pdescription'] == '' && !empty($_POST['editorValue'])) {
                $data['pdescription'] = str_cut(str_replace(array('\\r\\n', '\\t'), '', strip_tags($data['content'])), 300);
            }
            $cate = M('category');
            $catid = $cate->add($data);
            if ($catid > 0) {
                $this->success('添加成功', U('Category/index'));
            } else {
                $this->error('添加失败');
            }
        }
    }
    public function insertBatch()
    {
        if (IS_POST) {
            $data = I('post.');
            $cate = M("category");
			$catname = I('post.catname');
			if ($catname == '') {
				$this->error('请输入栏目名称');	
			}
			$data['content'] = htmlspecialchars_decode($data['editorValue']);
            if (strpos($data['catname'], "\n") === false) {
                $catid = $cate->add($data);
                $this->success('添加成功', U('Category/index'));
            } else {
                $cat_arr = explode("\n", $data['catname']);
                foreach ($cat_arr as $key => $val) {
                    $val = trim($val);
                    if (!$val) {
                        continue;
                    }
                    $data['catname'] = $val;
                    $catid = $cate->add($data);
                }
                $this->success('添加成功', U('Category/index'));
            }
        }
    }
    public function edit()
    {
        $catid = I('get.catid', 0, 'intval');
        if (!$catid) {
            $this->error('参数错误');
        }
        $list = $this->listCate();
        $detail = M('Category')->where(array('catid' => $catid))->find();
		if (!$detail) {
            $this->error('此栏目不存在');
        }
        $this->assign('list', $list);
        $this->assign('detail', $detail);
        $this->display();
    }
    public function update()
    {
        if (IS_POST) {
            $catid = I('post.catid', 0, 'intval');
            if (!$catid) {
                return false;
            }
            $sub_cates = $this->listCate($catid);
            $sub_ids = array();
            foreach ($sub_cates as $v) {
                $sub_ids[] = $v['catid'];
            }
            $pid = I('post.pid', 0, 'intval');
            if ($pid == $catid || in_array($pid, $sub_ids)) {
                $this->error('不能放置到当前栏目或其子栏目');
            }
            $data = I('post.');
			$catname = I('post.catname');
			if ($catname == '') {
				$this->error('请输入栏目名称');	
			}
            $data['page'] = I('post.page', 10, 'intval');
            if (!empty($_POST['editorValue'])) {
                $data['content'] = auto_save_image($_POST['editorValue']);
            }
			$data['info'] = auto_save_image($_POST['info']);
			$data['content'] = htmlspecialchars_decode($data['editorValue']);
			if ($_POST['pdescription'] == '' && !empty($_POST['editorValue'])) {
                $data['pdescription'] = str_cut(str_replace(array('\\r\\n', '\\t'), '', strip_tags($data['content'])), 300);
            }
            $result = M('Category')->where(array('catid' => $catid))->save($data);
            if ($result !== false) {
                $this->success('修改成功', U('Category/index'));
            } else {
                $this->erroe('修改失败');
            }
        }
    }
    public function listorder()
    {
        if (IS_POST) {
            $sort = I('post.sort');
            foreach ($sort as $key => $val) {
                M('Category')->where(array('catid' => $key))->save(array('sort' => intval($val)));
            }
            $this->success('排序成功');
        }
    }
    public function delete()
    {
        $catid = I('get.catid', 0, 'intval');
        if (!$catid) {
            $this->error('参数错误');
        }
        $sub_cates = $this->listCate($catid);
        if (empty($sub_cates)) {
            $cate = M('Category');
            if ($cate->where(array('catid' => $catid))->delete()) {
                $this->success('删除成功', U('Category/index'));
            } else {
                $this->error('删除失败');
            }
        } else {
            $this->error('该栏目下面还包含其他栏目');
        }
    }
}