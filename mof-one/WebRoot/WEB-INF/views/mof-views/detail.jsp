<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>明细表单</title>
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
	<span class="glyphicon glyphicon-list-alt"></span>
	<span class="page-title">***</span>
	<span class="page-remark"></span> 
	<span class="badge page-status"></span>
	</div>
	<div class="header-tools" >
		<div class="tools-button">
		 	<!-- 按钮区域 -->
		</div>
	</div>
</div>
<!-- 页面内容区域 -->
<div class="mof-page-content">
	<form id="form_detail" action="" >
		<div id="tableDetail" class="table-detail">
		<!-- 显示数据域 -->
		</div>
		<div class="form-hidden">
		<!-- 隐藏数据域 -->
		</div>
	</form>
</div>
<!-- 页面底部区域 -->
<div class="mof-page-footer">
</div>
<!-- 按钮下拉框 -->
<div class="btn-dropdown"></div>
	<script src="${ctx}/res/mof-skin/js/mof-file.js?v=1.0.2" type="text/javascript"></script>
	<script src="${ctx}/res/mof-skin/js/mof-detail.js?v=1.0.2" type="text/javascript"></script>
	<script type="text/javascript">
	//自定义扩展方法
	var	_ext=function(){
		//页面元素创建后
		var createEleAfter=function(){
			
		};
		//业务数据赋值后
		var dataLoadAfter=function(){
			
		};
		//保存数据成功后
		var saveDataAfter=function(args){
			
		};
		//保存数据前
		var saveDataBefore=function(){
			
		};
	};
	</script>
</body>
</html>

