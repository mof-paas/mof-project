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
.grid-stack-item-content {
	background-color: #fff;
	position: relative;
	overflow: hidden;
}
</style>
</head>
<body style="background-color: #f6f6f6; ">
<!-- 页面顶部区域 -->
<div class="mof-page-header">
	<div class="header-title">
	<span class="glyphicon glyphicon-file"></span>
	<span class="page-title">***</span>
	<span class="page-remark"></span> 
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
	<script src="${ctx}/res/mof-skin/js/mof-file-bi.js?v=1.0.2" type="text/javascript"></script>
	<script type="text/javascript">
	//自定义扩展方法
	var	_ext=function(){
		//页面元素创建后
		var createEleAfter=function(){
			
		};
		//数据列表创建后
		var dataLoadAfter=function(){
			
		};
		//自定义数据列表
		var dataListTable=function(args){
			  
		};
		//获取数据记录前
		var searchBefore=function(){
			
		};
	};
	</script>
</body>
</html>

