<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>系统首页</title>
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
</head>
<body>
<div style="padding-left: 30px; font-size: 20px;line-height: 60px; color:#ccc; border-bottom: 1px solid #e6e6e6;">
 <span class="glyphicon glyphicon-blackboard"></span> 我的桌面
</div>
	<script type="text/javascript" src="${ctx}/res/mof-skin/lib/jquery/jquery.backstretch.min.js"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-base.js?v=1.0.1"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-main.js?v=1.0.1"></script>
	<script type="text/javascript">
	I.initialPage = function() {
		$("body").backstretch([ I.baseUrl+"/res/mof-skin/img/main_bg.png" ]);
	}
	</script>
</body>
</html>

