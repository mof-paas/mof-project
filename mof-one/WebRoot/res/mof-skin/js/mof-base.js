/**
 * 通用JS工具包
 */

//页面初始化方法
$(function() {
	//业务元素初始化
	if (I.initialPage) {
		I.initialPage();
	}
	//业务数据初始化
	if(I.initialData){
		I.initialData();
	}
});
//自适应大小
window.onscroll = pageElementLayout;
window.onresize = pageElementLayout;
window.onload = pageElementLayout;
// 页面元素布局大小定义
function pageElementLayout() {
	if (I.setLayoutHeight) {
		I.setLayoutHeight();
	}
}
/**
 * 普通服务请求
 */
function _NormalRequest(who) {
	if (who.para) {
		who.para.ts = Math.random();
	}
	// 显示数据的容器
	if (who.domId) {
		showLoading(who.domId);
	}
	$.ajax({
		type : (who.type == undefined || who.type == null) ? "POST" : who.type,
		cache: false, 
		url : I.baseUrl + "/" + who.url,
		data : (who.para == undefined || who.para == null) ? {} : who.para,
		//contentType:"application/x-www-form-urlencoded", //指定请求体类型
		dataType : "json",
		async: (who.async == undefined || who.async == null) ? true : false,
		timeout : 30000,
		success : function(res) {
			if (who.callback) {
				who.callback(res);
			} else {
				console.log(res.message);
			}
			// 隐藏数据的容器
			if (who.domId) {
				hideLoading(who.domId);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			debugger;
			layer.msg("服务响应错误！");
			// 隐藏数据的容器
			if (who.domId) {
				hideLoading(who.domId);
			}
		}
	});
}
/**
 * form表单提交数据
 * @param who 请求对象
 */
function _FormRequest(who) {
	if (who.para) {
		who.para.ts = Math.random();
	}
	$("#" + who.form).ajaxSubmit({
		type : "POST",
		url : I.baseUrl + "/" + who.url,
		data : (who.para == undefined || who.para == null) ? {} : who.para,
		//contentType:"application/x-www-form-urlencoded",//指定请求体类型
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
/**
 * 获取URL中的参数
 * @param paras:参数键值
 * @param isde:1返回解码后的数据 | 其他的返回原始数据
 * @returns
 */
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
			return decodeURI(returnValue); // 返回解码的数据
		} else {
			return returnValue; // 返回参数中的原始数据
		}
	}
}
// 显示加载进度条
function showLoading(c) {
	$("#" + c).append($("<div id='" + c+ "_01' style='position: absolute;z-index: 99999; top:" + (($("#" + c).height()>0?$("#" + c).height():340)/ 2) + "px;left:" + ($("#" + c).width() / 2) + "px;'><img src='" + I.baseUrl + "/res/mof-skin/img/loading.gif'></img></div>"));
}
// 隐藏加载进度
function hideLoading(c) {
	$("#" + c + "_01").remove();
}
// 页面顶部提示
function popTip(mes, c) {
	var color = "#FE5B15";
	switch (c) {
	case "1": // 绿色
		color = "#669900";
		break;
	case "2": // 黄色
		color = "#ffbb33";
		break;
	case "3": // 红色
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
