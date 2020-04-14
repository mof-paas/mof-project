/**
 * 魔方主页控制台（导航菜单）
 */
//获取系统功能信息
var _sysMenu;
function getSysemMenu(sysId,callback){
	_NormalRequest({
		url:"com/module",
		domId:"",
		para:{"ISSHOW":"1",DSOT:"{MODULESORT:ASC}"},
		callback:function(res){
			if(callback){
				callback(res);
				return;
			}
			if(res.code=="1"){
				_sysMenu=res.data;
				$("#topMenu").html(getMenuDom("0","1"));
			}
		}
	});
}
//生成左边下级导航菜单(二级、三级菜单)
function getMenuDom(pId,type){
	var topItem="";
	var pageUrl="";
	var _mapId;//映射模块
	for (var j = 0; j <  _sysMenu.length; j++) {	
		if(_sysMenu[j].PARENTCODE==pId){
			if(_sysMenu[j].DEFAULTPATH!=""){
				pageUrl=_sysMenu[j].DEFAULTPATH;//系统默认页面
			}else{
				pageUrl=_sysMenu[j].CUSTOMPATH;//自定义页面
			}
			//判断是否映射
			if(_sysMenu[j].ISSHARE=="2" && _sysMenu[j].MAPMODULE!=""){
				_mapId=_sysMenu[j].MAPMODULE;
			}else{
				_mapId="";
			}
			switch (type) {
				case "1":
					//顶部一级菜单
					topItem+="<li id='"+_sysMenu[j].ID+"'  mapId='"+_mapId+"' am='"+_sysMenu[j].ACTIVITYTYPE+"' url='"+pageUrl+"' pt='"+_sysMenu[j].PAGETYPE+"'><span class='glyphicon  "+_sysMenu[j].ICON+"'></span><br> <span>"+_sysMenu[j].MODULENAME+"</span></li>";
					break;
				case "2":
					//左边二级菜单
					topItem+="<li id='"+_sysMenu[j].ID+"'  mapId='"+_mapId+"'  am='"+_sysMenu[j].ACTIVITYTYPE+"' url='"+pageUrl+"' pt='"+_sysMenu[j].PAGETYPE+"' class='left-item'><span class='glyphicon "+_sysMenu[j].ICON+" left-item-icon'></span><span  class='left-item-name' >"+_sysMenu[j].MODULENAME+"</span> &nbsp; <span class='glyphicon "+(pageUrl==""?"glyphicon-menu-right":"glyphicon-link")+" left-item-tag'></span> ";
					//三级菜单
					var threeMenu=getMenuDom(_sysMenu[j].ID,"3");
					if(threeMenu!=""){
						topItem+="<ul>"+threeMenu+"</ul>";
					}
					topItem+="</li>"
					break;
				case "3":
					//左边三级菜单
					topItem+="<li id='"+_sysMenu[j].ID+"'  mapId='"+_mapId+"'  am='"+_sysMenu[j].ACTIVITYTYPE+"' url='"+pageUrl+"' pt='"+_sysMenu[j].PAGETYPE+"'  class='left-item-children-item'><span class='glyphicon "+_sysMenu[j].ICON+" left-item-icon'></span><span  class='left-item-name' >"+_sysMenu[j].MODULENAME+"</span> </li>";
					break;
				default:
					break;
				}
			}
	}
	return topItem;
}
//加载默认页面
function loadMainPage(){
	$(".mof-content-left").hide();
	$(".mof-content-center").css("margin-left","0px");
	$(".view-ifram").show();
	$("#ifram-console").attr("src",I.baseUrl+"/route/mof-views/main");
}
//页面显示
function showPage($menuItem,openType){
	var pageInfo=getModulePages($menuItem.attr("id"));
	var ppath="";
	if(pageInfo.pageUrl==undefined || pageInfo.pageUrl==""){
		return "";
	}
	//判断映射模块
	var mapId="";
	if($menuItem.attr("mapId")!=""){
		mapId+="&mapId="+$menuItem.attr("mapId");
	}
	//页面路径
	ppath=I.baseUrl+"/route/"+pageInfo.pageUrl+"?pageId="+pageInfo.id+mapId;

	if(pageInfo.source=="ifram"){
		if(openType=="A"){
			return ppath;
		}
		//嵌入到Iframe
		$("#view-fragment").hide();
		$(".view-ifram").show();
		$("#ifram-console").attr("src",ppath);
	}else if(pageInfo.source=="fragment"){
		//加载页面片段
		$(".view-ifram").hide();
		$("#view-fragment").load(ppath,{},function(){
			$("#view-fragment").show();//存在缓存
		});
	}else if(pageInfo.source=="http"){
		//外部页面
		ppath=pageInfo.pageUrl;
		if(openType=="A"){
			return ppath;
		}
		$("#view-fragment").hide();
		$(".view-ifram").show();
		$("#ifram-console").attr("src",ppath)
	}
	return ppath;
}
/*获取模块关联的页面*/
function getModulePages(mid){
	/*从后台获取页面信息*/
	var loadPageInfo={};
		_NormalRequest({
			url:"com/view",
			para:{"MODULEID":mid},
			async:false,
			callback:function(res){
				if(res.code=="1" && res.data.length>0){
					/*模块默认加载的页面*/
					for (var i = 0; i < res.data.length; i++) {
						if(res.data[i].ISLOAD=="1"){
							loadPageInfo.id=res.data[i].ID;
							loadPageInfo.source=res.data[i].source;
							loadPageInfo.pageUrl=res.data[i].pageUrl;
							break;
						}
					}
				}
			}
		});
		return loadPageInfo;
};
//页面显示类型
function showPageType(leftMenu){
	 switch (leftMenu.attr("am")) {
			case "0"://下级导航
				break;
			case "1"://下级导航+关联页面
				showPage(leftMenu);
				break;
			case "2"://关联页面
				showPage(leftMenu);
				break;
			case "3"://弹出窗口
				popWindow(leftMenu.text(),showPage(leftMenu,"A"),null,null,false);
				break;
			case "4"://打开新页面
				widows.open(showPage(leftMenu,"A"));
				break;
			default:
				break;
	 	}
	
}
//菜单导航事件
function menuEvent(){
	 //当前用户事件
	 $(".mof-header").on("click",".user-info",function(){
			layer.tips('<div class="user" style="color: #BBFF00;"> '+$(this).attr("title")+'</div><div id="btn-close" style="color:#ccc; text-align: right; cursor: pointer;"><span class="glyphicon glyphicon-off"></span> 退出登录</div>', '.user-info', {
				tips: 3
			});
	 });
	 $("body").on("click","#btn-close",function(){
		 loginOut();
		 window.location.href=I.baseUrl;
	 });
	//顶部导航事件
	$(".mof-header").on("click",".top-menu li",function(){
		var $oneMenu=$(this);
		$("#btnExtend").attr("dn",$oneMenu.text());
		$(".top-menu li").removeClass("active");
		 $oneMenu.addClass("active");
		 //菜单的响应方式
		 switch ($oneMenu.attr("am")) {
				case "0"://下级导航
					$(".mof-content-left").show();
					setLeftShowStatus("2");
					$("#leftMenu").html(getMenuDom( $oneMenu.attr("id"),"2"));
					break;
				case "1"://下级导航+关联页面
					showPage($oneMenu);
					setLeftShowStatus("2");
					$(".mof-content-left").show();
					$("#leftMenu").html(getMenuDom( $oneMenu.attr("id"),"2"));
				
					break;
				case "2"://关联页面
					showPage($oneMenu);
					setLeftShowStatus("3");
					$(".mof-content-left").hide();
					break;
				case "3"://弹出窗口
					popWindow($oneMenu.text(),showPage($oneMenu,"A"),null,null,false);
					break;
				case "4"://打开新页面
					widows.open(showPage($oneMenu,"A"));
					break;
				default:
					break;
		 	}
	});
//左边导航菜单显示状态
 function	setLeftShowStatus(s){
		if(s=="1"){
			//最大展开
			$("#btnExtend").attr("title","收缩");
			$("#btnExtend").removeClass("glyphicon-option-vertical").addClass("glyphicon-menu-hamburger");
			$(".mof-content-left").animate({"width":"210px"},"fast") ;
			$(".mof-content-center").css("margin-left","210px");
			$(".left-item-name").fadeIn("fast");
		}else if(s=="2"){
			//最小收缩
			$("#btnExtend").removeClass("glyphicon-menu-hamburger").addClass("glyphicon-option-vertical");
			$("#btnExtend").attr("title","展开");
			$(".mof-content-left").animate({"width":"70px"},"fast") ;
			$(".mof-content-center").css("margin-left","70px");
			$(".left-item-name").fadeOut("fast");
			$(".left-menu-header-name").html("");
			$(".left-item-children-root").slideUp("fast");
			$(".left-item").children(".glyphicon-menu-down").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-right");
		}else{
			//隐藏
			$(".mof-content-center").css("margin-left","0px");
		}
	}
	//左边导航事件
	$("#btnExtend").click(function(){
		$(".left-item-children-float").hide();
		if(this.title=="展开"){
		$(".left-menu-header-name").html($(this).attr("dn"));
			setLeftShowStatus("1");
		}else{
			$(".left-menu-header-name").html("");
			setLeftShowStatus("2");
		}
	});
	//展开三级菜单
	$("#leftMenu").on("click",".left-item",function(e){
		var $leftmenu=$(this);
		$(".left-item").removeClass("active");
		$leftmenu.addClass("active");
		showPageType($leftmenu);
		var cd=$leftmenu.children("ul");//三级菜单
		if($("#btnExtend").attr("title")=="展开" && cd.length>0){
			if($(".left-item-children-float").is(':hidden')){
				$(".left-item-children-float").css("left",$leftmenu.offset().left+$leftmenu.width()).css("top",$leftmenu.offset().top-3).show("fast");
				//给浮动菜单添加内容
				var floatText="<ul class='children-float'>";
				 floatText+="<li class='float-title'>"+$leftmenu.children("span:eq(1)").html()+"</li>";
				var fcd=$leftmenu.children("ul").children("li");
				for (var i = 0; i < fcd.length; i++) {
					floatText+="<li><span class='glyphicon glyphicon-record'></span> "+$(fcd[i]).children("span:eq(1)").html()+"</li>";
				}
				floatText+="</ul>"
				$(".left-item-children-float").html(floatText);
				e.stopPropagation();  //w3c
			}else{
				$(".left-item-children-float").hide();
			}
		}else{
			if(cd.is(':hidden')){
				cd.slideDown("fast")
				$leftmenu.children(".glyphicon-menu-right").removeClass("glyphicon-menu-right").addClass("glyphicon-menu-down");
			}else{
				cd.slideUp("fast");
				$leftmenu.children(".glyphicon-menu-down").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-right");
			}
		}
	});
	//点击三级菜单
	$("#leftMenu").on("click",".left-item-children-item",function(event){
				$(".left-item-children-item").removeClass("active");
				$(this).addClass("active");
				showPageType($(this));
			  event.stopPropagation();
	});
	//左边菜单收缩状态的悬浮事件
	 var tipIndex = 999;
	 $('#leftMenu').on('mouseenter', '.left-item', function() {
			 if($("#btnExtend").attr("title")=="展开" ){
				  differentindex =layer.tips($(this).children("span:eq(1)").html(), '#'+$(this).attr("id"), {
						tips: [4, '#000'],
						 time: 1000
					});
			} 
		});
		$('#leftMenu').on('mouseleave', '.left-item', function() {
			   layer.close(tipIndex);
		});
	//点击层外任何地方关闭层 
	$(document).click(function(){ 
		   $("#children-float").hide(); 
	})
}
//获取指定菜单信息
 function getMenuItem(id){
	 for (var j = 0; j <  _sysMenu.length; j++) {	
		if(id==_sysMenu[j].ID){
			return _sysMenu[j];
		}
	}
 }
//弹出窗口
function popWindow(title,url,w,h,isfull)
{
	if(url==null || url==""){
		layer.msg("未指定关联页面！");
		return;
	}
	var perContent = layer.open({
		title : "<span class='glyphicon glyphicon-map-marker'></span> "+title,
		type : 2,
		area : [ w?w:'1000px', h?h:'600px' ],
		fixed : false,
		shift:1,
		offset: 'auto',
		maxmin : true,
		content :url
	});
	if(isfull==true){
		  layer.full(perContent);
	}
};
//Ifram页面调度
function pageSwitch(url){
	$("#ifram-console").attr("src",url);
}