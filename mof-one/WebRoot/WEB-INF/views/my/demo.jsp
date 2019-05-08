<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>自定义界面</title>
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
</head>
<body>
	<div style="text-align: center;line-height: 100px;font-family: 微软雅黑;">
	   需要我自己开发的个性化功能
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

