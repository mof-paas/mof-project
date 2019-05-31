/**
 * 数据分析类页面插件
 */
;(function(){
	var resources=function(){
		/*页面网格布局插件*/
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/lib/gridstack/jquery-ui.js'></script>");
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/lib/gridstack/lodash.min.js'></script>");
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/lib/gridstack/gridstack.js'></script>");
		/*图表插件*/
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/lib/echarts/echarts.min.js'></script>");
		 /*自定义基础方法*/
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/js/mof-base.js'></script>");
		document.write("<script src='"+I.baseUrl+"/res/mof-skin/js/mof-bi.js'></script>");
		onComplete();
	};
	var onComplete=function(){
		layer.closeAll();
	};
	var onStart=function(){
		layer.msg("开始初始化....");
		resources();
	}();
})();