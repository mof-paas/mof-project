<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>信息提示</title>
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
</head>
<body>
	<div>
		<div style="line-height: 80px; border-bottom: 1px solid #e6e6e6; font-size: 30px; text-align: center;
		color: #808080;">访问异常提示</div>
	</div>
	<script src="${ctx}/res/mof-skin/js/mof-base.js" type="text/javascript"></script>
	<script type="text/javascript">
		I.initialPage = function() {
			
		};
	</script>
</body>
</html>

