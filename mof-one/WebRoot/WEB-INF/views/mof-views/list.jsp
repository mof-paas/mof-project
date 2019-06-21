<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>列表表单</title>
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
</head>
<body>
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
<!-- 列表记录 -->
<div class="mof-list-data">
	<table id="tableList" class="table">
	</table>
</div>
</div>
<!-- 页面底部区域 -->
<div class="mof-page-footer">
</div>
<!-- 按钮下拉框 -->
<div class="btn-dropdown"></div>
	<script src="${ctx}/res/mof-skin/js/mof-file.js?v=1.0.0" type="text/javascript"></script>
	<script type="text/javascript">
		//页面初始化
		I.initialPage = function() {
	
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
	<script src="${ctx}/res/mof-skin/js/mof-list.js?v=1.0.0" type="text/javascript"></script>
</body>
</html>

