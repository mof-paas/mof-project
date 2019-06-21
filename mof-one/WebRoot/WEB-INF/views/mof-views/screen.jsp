<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>数据分析</title>
<link rel="stylesheet" href="${ctx}/res/mof-skin/lib/gridstack/gridstack.css?v=1.0.6">
<link rel="stylesheet" href="${ctx}/res/mof-skin/css/mof-bi.css?v=1.0.6">
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
<style type="text/css">
/* 模块样式 */
.grid-stack-item-content {
	position: relative;
	overflow: hidden;
	color:rgba(255,255,255,.9);
	border: 10px solid transparent;
	border-image: url(${ctx}/res/mof-skin/img/border_1.png) 5%;
	background:rgba(0,0,0,.3);
	/* box-shadow:  0 0 5rem rgb(0,110,150); */
}
/* 页面头部 */
.ext_header{
background-color:transparent;
border-bottom: 0px solid #000;

}
.kh_title{
 width: 500px;
 margin-left:auto;
 margin-right:auto;
 height: 50px;
 text-align: center;
 color: #66FFFF;
  background:rgba(52,152,219,0.2); ;
 border: 1px solid rgba(52,152,219,0.2); ;
 border-top:0px solid #fff;
 border-radius: 0px 0px 30px 30px ;
 font-size: 20px;
  box-shadow:  0 0 5rem rgb(0,110,150);
  font-weight: bold;
}
/* 模块标题 */
.module_title{
border-bottom: 0px solid #ccc;
color:#33ccff;
}
.panel_1{
	color:rgba(60,240,250,1); 
	font-size: 1.5rem; padding:1rem;
	border-radius: .3rem;
	border: 1px solid rgba(0,180,220,0.5);
	background: linear-gradient(180deg,rgba(0,180,220,0.3),rgba(0,180,220,0.1),rgba(0,180,220,0.1),rgba(0,180,220,0.3));
	box-shadow: 0 0 2rem rgba(0,180,220,.1) inset;
}
.panel_2{
	color:rgba(255,255,255,.9);
	border: 20px solid transparent;
	border-image: url(${ctx}/res/mof-skin/img/border_1.png) 5%;
	background:rgba(0,0,0,.3);
	box-shadow:  0 0 5rem rgb(0,110,150);
}
</style>
</head>
<body style="background-color: #000; ">
<!-- 页面顶部区域 -->
<div class="mof-page-header ext_header" >
	<div class="header-title">
	<div class="page-title kh_title"></div>
	</div>
	<div class="header-tools" >
		<div class="tools-button">
		 	<!-- 按钮区域 -->
		</div>
		<div class="tools-search" >
			<!-- 关键字搜索-->
		</div>
	</div>
</div>
<!-- 页面内容区域 -->
<div class="mof-page-content">
<!-- 数据图表区域 -->
<div class="mof-list-data">
<div id="root-container" class="container-fluid">
        <div class="grid-stack">
     	<!-- 网格模块显示区 -->
        </div>
 </div>
</div>
</div>
<!-- 页面底部区域 -->
<div class="mof-page-footer">
</div>
<!-- 按钮下拉框 -->
<div class="btn-dropdown"></div>
<script type="text/javascript"   src="${ctx}/res/mof-skin/lib/jquery/jquery.backstretch.min.js"></script>
<script src="${ctx}/res/mof-skin/js/mof-file-bi.js?v=1.0.0" type="text/javascript"></script>
<script type="text/javascript">
		//页面初始化
		I.initialPage=function(){
			$("body").backstretch([ I.baseUrl+"/res/mof-skin/img/bg_page.jpg" ]);
		};
		//页面元素创建后
		I.createEleAfter=function(){
			
		};
		//数据列表创建后
		I.dataLoadAfter=function(){
			
		};
		//自定义数据列表
		I.dataListTable=function(args){
			  
		};
		//获取数据记录前
		I.searchBefore=function(){
			
		};
	</script>
	<script src="${ctx}/res/mof-skin/js/mof-bi.js?v=1.0.0"  type="text/javascript"></script>
</body>
</html>

