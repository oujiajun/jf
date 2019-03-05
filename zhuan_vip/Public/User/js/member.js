//初始化时判断锚点（个人设置选项卡切换）
function checkMall(){
	var local = location.hash.split("#", 2)[1];
	if(local == undefined){
		local = "bases";
	}
	//如果有锚点，则切换到对应的选项卡
	$("[data-target=\""+local+"\"]").addClass("current").siblings().removeClass("current");
	var id = local.substr(0, local.length - 1);
	$("#" + id).removeClass("hidden").siblings().addClass("hidden");
}
$(function(){
	checkMall();
	//选项卡切换
	$(".ua-tab li").click(function(){
		location.hash = "#" + $(this).data("target");
		var local = location.hash.split("#", 2)[1];
		//如果有锚点，则切换到对应的选项卡
    	$("[data-target=\""+local+"\"]").addClass("current").siblings().removeClass("current");
    	var id = local.substr(0, local.length - 1);
		$("#" + id).removeClass("hidden").siblings().addClass("hidden");
	})
	
	//修改个性签名
	$('#description-btn').click(function(){
		var desc = $('.description');
		var texts = desc.text();
		if(texts == '暂无个性签名'){
			texts = '';
		}
		$('#changeDesc').find('textarea').text(texts);
		var html = $('.changedesc');
		var num = $("#changeDesc").find("em");
		var descLen =  $("#changeDesc").find("textarea").val().length;
		num.text(50 - descLen);
		var box = $.ThinkBox(html, {'title' : '修改描述','drag' : true,'unload'	: true});
		$(".ThinkBox-content #changeDesc").Validform({
				tiptype:function(msg,o,cssctl){
					if(!o.obj.is("form")){
						var objtip=o.obj.siblings(".Validform_checktip");
						cssctl(objtip,o.type);
						objtip.text(msg);
					}
				}
			});

		//文本域字数统计
		box.getContent().find("textarea").keyup(function(){
			var txtLen = $(this).val().length;
			var tipNum = box.getContent().find("em");
			tipNum.text( 50 - txtLen);
		});
	});
    
	$('#nickname-btn').click(function(){
		var html = $('.changenickname');
		var box = $.ThinkBox(html, {'title' : '修改昵称','afterHide' : function(){
		},'drag' : true,'unload'	: true});
		$(".ThinkBox-content #changeNickname").Validform({
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.obj.siblings(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}else{
					var objtip=o.obj.find(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			}
		});
	});
	
	$('#email-btn').click(function(){
		var html = $('.changeemail');
		var box = $.ThinkBox(html, {'title' : '修改邮箱','afterHide' : function(){
		},'drag' : true,'unload'	: true});
		$(".ThinkBox-content #changeEmail").Validform({
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.obj.siblings(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}else{
					var objtip=o.obj.find(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			}
		});
	});
	
	
	// 修改密码input验证
	$('#pwd').Validform({
		// def：'',
		tiptype:3,
		label 	 : '.labs',
		postonce : true
	});
	// 修改联系方式验证
	$('#contact').Validform({
		// def：'',
		datatype:{
			"phone":function(gets,obj,curform,regxp){
				var reg=/^\d{3,4}-\d{7,8}$/;
				if(reg.test(gets)){return true;}	
				return false;
			},
			'zcode':function(gets,obj,curform,regxp){
				var reg=/^[1-9]{1}[0-9]{5}$/;
				if(reg.test(gets)){return true;}	
				return false;
			}
			
		},
		tiptype:3,
		label 	 : '.labs',
		postonce : true
	});
	
	
	//全选的实现
	$("#checkAll").click(function(){
		if($(this).attr('checked') == "checked"){
			$(".check-letter").attr("checked", "checked");
		}else{
			$(".check-letter").removeAttr("checked");
		}
	})
	$(".check-letter").click(function(){
		var option = $(".check-letter");
		option.each(function(i){
			if($(this).attr('checked') == undefined){
				$("#checkAll").removeAttr("checked");
				return false;
			}else{
				$("#checkAll").attr("checked", "checked");
			}
		});
	})
	
	
	
});
