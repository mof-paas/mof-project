/**
 * 基础方法
 */

window.onscroll = pageElementLayout;
window.onresize = pageElementLayout;
window.onload = pageElementLayout;
/*页面元素布局大小定义*/
function pageElementLayout() {
	if (I.setAutoLayout) {
		I.setAutoLayout();
	}
}
/*普通服务请求*/
function _NormalRequest(who) {
	if (who.para) {
		who.para.ts = Math.random();
	}
	if (who.domId) {
		showLoading(who.domId);
	}
	$.ajax({
		type : (who.type == undefined || who.type == null) ? "POST" : who.type,
		cache: false, 
		url : I.baseUrl + "/" + who.url,
		data : (who.para == undefined || who.para == null) ? {} : who.para,
		/*contentType:"application/x-www-form-urlencoded",*/
		dataType : "json",
		async: (who.async == undefined || who.async == null) ? true : false,
		timeout : 30000,
		success : function(res) {
			if (who.callback) {
				who.callback(res);
			} else {
				console.log(res.message);
			}
			if (who.domId) {
				hideLoading(who.domId);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			debugger;
			layer.msg("服务响应错误！");
			if (who.domId) {
				hideLoading(who.domId);
			}
		}
	});
}
/*form表单提交数据*/
function _FormRequest(who) {
	if (who.para) {
		who.para.ts = Math.random();
	}
	$("#" + who.form).ajaxSubmit({
		type : "POST",
		url : I.baseUrl + "/" + who.url,
		data : (who.para == undefined || who.para == null) ? {} : who.para,
		/*contentType:"application/x-www-form-urlencoded",*/
		dataType : "json",
		success : function(res) {
			if (who.callback) {
				who.callback(res);
			} else {
				popTip(res.message, "1");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus);
		}
	});
}
/*获取URL中的参数(isde:1返回解码后的数据 | 其他的返回原始数据)*/
function getUrlPara(paras, isde) {
	if (!isde) {
		isde = "";
	}
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof (returnValue) == "undefined") {
		return "";
	} else {
		if (isde == "1") {
			return decodeURI(returnValue); 
		} else {
			return returnValue; 
		}
	}
}
/*显示加载进度条*/
function showLoading(c) {
	$("#" + c).append($("<div id='" + c+ "_01' style='position: absolute;z-index: 99999; top:" + (($("#" + c).height()>0?$("#" + c).height():340)/ 2) + "px;left:" + ($("#" + c).width() / 2) + "px;'><img src='" + I.baseUrl + "/res/mof-skin/img/loading.gif'></img></div>"));
}
/*隐藏加载进度*/
function hideLoading(c) {
	$("#" + c + "_01").remove();
}
/*页面顶部提示*/
function popTip(mes, c) {
	var color = "#FE5B15";
	switch (c) {
	case "1": /*绿色*/
		color = "#669900";
		break;
	case "2": /*黄色*/
		color = "#ffbb33";
		break;
	case "3": /*红色*/
		color = "#ff4444";
		break;
	default:
	}
	$("#TipInfo").css("background-color", color);
	$("#TipInfo").html(mes);
	$("#TipInfo").css("left", $(window).width() / 2 - 150 + "px");
	$("#TipInfo").css("width", "300px");
	$("#TipInfo").css("display", "block");
	$("#TipInfo").css("position", "fixed");
	$("#TipInfo").animate({top : 0}, {speed : "slow"});
	setTimeout(function myfunction() {
		$("#TipInfo").animate({top : -200,"display" : "none"}, {speed : "slow"});}, 3000);
};
