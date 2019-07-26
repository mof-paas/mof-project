<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>系统控制台</title>
<link rel="stylesheet"
	href="${ctx}/res/mof-skin/css/mof-sys.css?v=1.0.6">
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
</head>
<body style="overflow: hidden;">
	<!-- 页头 -->
	<div class="mof-header">
		<div class="logo-img"></div>
		<div class="logo-title">系统名称</div>
		<div class="top-menu">
			<ul id="topMenu">
			</ul>
		</div>
		<div class="user-info">
			<span class="glyphicon glyphicon-user"></span>
		</div>
	</div>
	<!-- 	内容 -->
	<div class="mof-content">
		<!-- 左边 -->
		<div class="mof-content-left">
			<div class="left-menu">
				<div class="left-menu-header">
					<span id="btnExtend"
						class="glyphicon glyphicon-option-vertical  left-menu-header-icon"
						title="展开"></span><span class="left-menu-header-name"></span>
				</div>
				<div>
					<ul id="leftMenu">
					</ul>
				</div>
			</div>
			<!-- 漂浮菜单 -->
			<div id="children-float" class='left-item-children-float'></div>
		</div>
		<!-- 中间 -->
		<div class="mof-content-center">
			<!-- 页面片段 -->
			<div id="view-fragment" class="view-fragment"></div>
			<!-- 全页面嵌入 -->
			<div class="view-ifram">
				<iframe id="ifram-console" frameborder="0" src="" scrolling="auto"
					width="100%"></iframe>
			</div>
		</div>
	</div>
	<!-- 	页脚 -->
	<div class="mof-footer"></div>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-base.js?v=1.0.0"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-main.js?v=1.0.0"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-console.js?v=1.0.0"></script>
	<script type="text/javascript">
		$(function() {
			loadMainPage();
			//菜单导航事件
			menuEvent();
			//获取系统信息
			getApp(function(res) {
				if (res.code == "1") {
					$(".user-info").attr("title", res.data.user);
					for (var i = 0; i < res.data.app.length; i++) {
						$("title").html(res.data.app[i]["SYSNAME"]);
						$(".logo-title").html(res.data.app[i]["SYSNAME"]);
						getSysemMenu(res.data.app[i]["ID"]);//魔方默认的系统菜单显示
						/* getSysemMenu(res.data[i]["ID"],function(res){
							//自定义系统菜单显示
						}); */
					}
				}
			});
		});
		I.setAutoLayout = function() {
			$(".mof-content-left").height(document.documentElement.clientHeight -76);
			$("#ifram-console").height(document.documentElement.clientHeight - 76);
		};
	</script>
</body>
</html>

