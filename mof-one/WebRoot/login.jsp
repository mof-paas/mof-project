<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<%@include file="/include/mof-meta.jsp"%>
<head>
<title>登录</title>
<link rel="stylesheet" href="${ctx}/res/mof-skin/css/mof-base.css">
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}"
	};
</script>
<style type="text/css">
/* 定义仅属于本页的样式 */
.login-form {
	position: fixed;
	top: 50%;
	left: 50%;
	border: 1px solid #e6e6e6;
	background-color: rgba(255, 255, 255, 0.9);
	width: 40%;
	height: 350px;
	border-radius: 5px;
	-webkit-transform: translateX(-50%) translateY(-50%);
	-moz-transform: translateX(-50%) translateY(-50%);
	-ms-transform: translateX(-50%) translateY(-50%);
	transform: translateX(-50%) translateY(-50%);
}

.bg-header {
	position: fixed;
	top: 0px;
	width: 100%;
	height: 60%;
}

.bg-footer {
	position: fixed;
	bottom: 0px;
	width: 100%;
	height: 40%;
	background-color: #f6f6f6;
}

.footer-title {
	text-align: center;
	padding-top: 150px;
	position: absolute;
	bottom: 50px;
	width: 100%;
	font-family: 微软雅黑;
}

.login-table {
	padding: 20px;
	padding-top: 40px;
	padding-left: 70px;
	padding-right: 70px;
	width: 100%;
	height: 50%;
}

.line1 {
	background: #7e7e7e;
	width: 26%;
	height: 1px;
	top: 35px;
	position: absolute;
	background: -moz-linear-gradient(right, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -webkit-linear-gradient(right, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -moz-linear-gradient(right, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -ms-linear-gradient(right, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: linear-gradient(right, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
}

.line2 {
	background: #7e7e7e;
	width: 26%;
	height: 1px;
	top: 35px;
	right: 0px;
	position: absolute;
	background: -moz-linear-gradient(left, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -webkit-linear-gradient(left, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -moz-linear-gradient(left, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: -ms-linear-gradient(left, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
	background: linear-gradient(left, rgba(126, 126, 126, 1) 0%,
		rgba(255, 255, 255, 1) 100%);
}

.lean {
	color: #7e7e7e;
	text-align: center;
	letter-spacing: 0.1em;
	line-height: 20px;
	font-size: 25px;
	font-family: 微软雅黑;
}

.login-btn-root {
	margin-top: 30px;
	text-align: center;
	position: absolute;
	bottom: 30px;
	width: 100%;
	padding-left: 80px;
	padding-right: 80px;
}

.btnLogin {
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px;
	width: 100%;
	line-height: 35px;
	font-family: 微软雅黑;
	font-size: 20px;
	background-color: #33ccff;
	border: 0px;
}
</style>
</head>
<body>
	<div class="bg-header"></div>
	<div class="bg-footer">
		<div class="footer-title">Copyright © 2018 魔方软件服务技术社区</div>
	</div>
	<div class="login-form">
		<span class="line1"></span>
		<h1 id="sysname" class="lean">数据资源管理</h1>
		<span class="line2"></span>
		<div class="login-table">
			<table style="width: 100%; height: 50%;">
				<tr>
					<td><span class="glyphicon glyphicon-user"></span></td>
					<td><input id="ACCOUNT" name="ACCOUNT" class="form-control"
						style="background: none; font-size: 15px;" type="text"
						placeholder="账号"></td>
				</tr>
				<tr>
					<td style="height: 40px;"></td>
				</tr>
				<tr>
					<td><span class="glyphicon glyphicon-lock"></span></td>
					<td><input id="PASSWORD" name="PASSWORD" class="form-control"
						style="background: none; font-size: 15px;" type="password"
						placeholder="密码"></td>
				</tr>
			</table>
		</div>
		<div class="login-btn-root">
			<div id="btnLogin" class="btn btn-danger btnLogin">
				登 &nbsp; &nbsp;&nbsp;录 &nbsp; &nbsp;<span
					class="glyphicon glyphicon-log-in"></span>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="${ctx}/res/mof-skin/lib/jquery/jquery.backstretch.min.js"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/lib/jquery/md5.js"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-base.js?v=1.0.0"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-main.js?v=1.0.0"></script>
	<script type="text/javascript">
		$(function() {
			$(".bg-header").backstretch([ I.baseUrl + "/res/mof-skin/img/login-bg.jpg" ]);
			$("#btnLogin").click(function() {
				login("login");
			});
			getApp(function(res) {
				if (res.code == "1") {
					for (var i = 0; i < res.data.app.length; i++) {
						$("#sysname").html(res.data.app[i]["SYSNAME"]);
						$("title").html(res.data.app[i]["SYSNAME"]);
					}
				}
			});
		});
		document.onkeydown = function() {
			if (event.keyCode == 13) {
				event.keyCode = 0;
				event.returnValue = false;
				login("login");
			}
		};
	</script>
	<script src="${ctx}/res/mof-skin/js/mof-file-bi.js?v=1.0.0"  type="text/javascript"></script>
</body>
</html>