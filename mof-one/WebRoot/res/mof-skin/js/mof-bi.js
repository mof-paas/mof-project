/*创建页面模块*/
;var _pageModule=function(){
	/*从控制台获取指定功能信息*/
	var pageInfo={};
	pageInfo.base= parent.getMenuItem(getUrlPara("mid"));
	/*判断是否映射的模块*/
	if(getUrlPara("mapId")!=""){
		pageInfo.mid=getUrlPara("mapId")
	}else{
		pageInfo.mid=pageInfo.base.ID
	}
	$(".page-title").html(pageInfo.base.MODULENAME);
	if(pageInfo.base.REMARK!=""){
		$(".page-remark").html("——" +pageInfo.base.REMARK);
	}
	/*获取页面模块数据*/
	var getPageModule=function(){
		
		_NormalRequest({
				domId:"root-container",
				url : "com/page-module",
				para:{fkId: pageInfo.mid,DSOT:"{moduleSort:ASC}"},
				callback:function(res){
					if(res.code=="1"){
						var ms=[];
						for (var i = 0; i < res.data.length; i++) {
							if(res.data[i].moduleXY!=null && res.data[i].moduleXY!=""){
								ms.push(JSON.parse(res.data[i].moduleXY));
							}
						}
						pageInfo.module=res.data;
						createPageModule(ms);
					}
				}
		});
	}();
	/*构造页面模块*/
	var createPageModule=function(mobjs){
		$('.grid-stack').gridstack({cellHeight : 5,disableDrag:true,disableResize:true});
		var grid = $('.grid-stack').data('gridstack');
        grid.removeAll();
        var items = GridStackUI.Utils.sort(mobjs);
        _.each(items, function (node) {
        	var  gridItem=$('<div id="'+node.id+'" class="grid-stack-item-content grid-module" data="'+(node.data!=""?escape(JSON.stringify(node.data)):"")+'"  type="'+node.type+'" ><div class="grid-title"></div><div class="grid-content"></div></div>');
        	grid.addWidget($('<div></div>').append(gridItem),node.x, node.y, node.width, node.height, true);
        	setModuleAttr(gridItem);
        	getModuleContent(gridItem);
        });
	};
	/*设置模块属性*/
	var setModuleAttr=	function (domModule){
		if(domModule.attr("data")!=""){
			var attrInfo=JSON.parse(unescape(domModule.attr("data")));
			if(attrInfo.moduleTitle!=""){
						domModule.children(".grid-title").html("<span  class='glyphicon glyphicon-dashboard'></span> " +attrInfo.moduleTitle);
			}else{
						domModule.children(".grid-title").html("");
			}
			domModule.attr("title",attrInfo.moduleClass).addClass(attrInfo.moduleClass);
			domModule.children(".grid-title").attr("title",attrInfo.titleClass).addClass(attrInfo.titleClass);
		}
	};	
	/*获取模块内容数据*/
	var getModuleContent=function($module){
		_NormalRequest({
				domId : $module.attr("id"),
				url : "com/module-content",
				para :{fkModule:$module.attr("id")},
				callback : function(res) {
					if(res.code=="1"){
					
						var topicView={config:res.data.config, shell:res.data.shell, type:res.data.viewType,data:res.data.data};
						createModuleContent(topicView,$module);
					}
				}
		});
	};
	/*创建模块内容元素*/
	var createModuleContent=function(topicView,$module){
		switch ($module.attr("type")) {
		case "1": //清单表
			$module.children(".grid-content").html("<table id='"+$module.attr("id")+"_xc' class='table'></table>");
			show_grid_view($module.attr("id")+"_xc",topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "2": //交叉表
			break;
		case "3": //图表
			$module.children(".grid-content").html("<div id='"+$module.attr("id")+"_xc' class='chartData'  style='width:100%;height:"+($module.height()-40)+"px'></div>");
			show_chart_view($module.attr("id")+"_xc",topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "4": //卡片
			break;
		case "5": //URL链接
			break;
		case "6": //自定义方法
			break;
		case "7": //Tab标签
			break;
		case "8": //流式标签
			break;
		default:
			break;
		}	
	};	
	return pageInfo;
}();

/*数据显示类型*/
var function_register = {
	bar : {name:"get_echart_bar",method:get_echart_bar},/* 柱状图 */
	line : {name:"get_echart_line",method:get_echart_line},/* 折线图 */
	pie : {name:"get_echart_pie",method:get_echart_pie},/* 饼图 */
	grid : {name:"get_grid_list",method:get_grid_list},/* 清单表 */
};
/*图表类数据显示*/
function show_chart_view(mId,vtype,data,config,shell){
	var m_name=function_register[vtype].name;
	var option=null;
	if(shell!="" && shell!="null"){
		option=eval('(function(result,config){'+shell+'})(data,config)');
	}
	initEchart({method:m_name,container:mId,data:data,config:config},option);
};
//表格类数据显示
function show_grid_view(mId,vtype,data,config,shell){
	var m_name=function_register[vtype].name;
	var option=null;
	if(shell!="" && shell!="null"){
		option=eval('(function(result,config){'+shell+'})(data,config)');
	}
	initBootstrapGrid({method:m_name,container:mId,data:data,config:config},option);
};
/**
 * 获取【柱状图】配置模板
 */
function get_echart_bar(result, config) {
	var _legend_data = []; /* 图例 */
	var _xAxis_data = [];/* 维度值 */
	var _series = [];/* 度量项 */
	/* 构造度量项 */
	for (var n = 0; n < config.series.length; n++) {
		_series.push(config.series[n]);
		_legend_data.push(config.series[n].name);
	};
	/* 数据行 */
	for (var i = 0; i < result.length; i++) {
		var temx="";
		/* 数据列 */
		for ( var key in result[i]) {
			/* 统计维度 */
			for (var h = 0; h < config.xAxis.length; h++) {
				if (key == config.xAxis[h].field) {
					temx+=result[i][key]+"_";
					break;
				}
			}
			/* 查找度量项 的值*/
			for (var j = 0; j < _series.length; j++) {
				if (key == _series[j].field) {
					_series[j].data.push(result[i][key]);
					break;
				}
			}
		}
		_xAxis_data.push(temx.substring(0,temx.length-1));
	};
	var option = {
		color : [ '#3398DB', '#FFFF00' ],
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'shadow'
			}
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		legend : {
			data : _legend_data
		},
		xAxis : [ {
			type : 'category',
			data : _xAxis_data,
			axisTick : {
				alignWithLabel : true
			},
			splitLine : {
				show : true
			}
		} ],
		yAxis : [ {
			type : 'value',
			splitLine : {
				show : true
			}
		} ],
		series : _series
	};
	return option;
};
/**
 * 获取【折线图】配置模板
 */
function get_echart_line(result, config) {
	var _legend_data = []; /* 图例 */
	var _xAxis_data = [];/* 维度值 */
	var _series = [];/* 度量项 */
	/* 构造度量项 */
	for (var n = 0; n < config.series.length; n++) {
		_series.push(config.series[n]);
		_legend_data.push(config.series[n].name);
	};
	/* 数据行 */
	for (var i = 0; i < result.length; i++) {
		var temx="";
		/* 数据列 */
		for ( var key in result[i]) {
			/* 统计维度 */
			for (var h = 0; h < config.xAxis.length; h++) {
				if (key == config.xAxis[h].field) {
					temx+=result[i][key]+"_";
					break;
				}
			}
			/* 查找度量项 的值*/
			for (var j = 0; j < _series.length; j++) {
				if (key == _series[j].field) {
					_series[j].data.push(result[i][key]);
					break;
				}
			}
		}
		_xAxis_data.push(temx.substring(0,temx.length-1));
	};
	var option = {
		color : [ '#3398DB', '#FFFF00' ],
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'shadow'
			}
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		legend : {
			data : _legend_data
		},
		xAxis : [ {
			type : 'category',
			data : _xAxis_data,
			axisTick : {
				alignWithLabel : true
			},
			splitLine : {
				show : true
			}
		} ],
		yAxis : [ {
			type : 'value',
			splitLine : {
				show : true
			}
		} ],
		series : _series
	};
	return option;
};
/**
 * 获取【饼图】配置模板
 */
function get_echart_pie(result, config){
	var _series = [];/* 度量项 */
	/* 构造度量项 */
	for (var n = 0; n < config.series.length; n++) {
		_series.push(config.series[n]);
	};
	/* 数据行 */
	for (var i = 0; i < result.length; i++) {
		var val_obj={};
		/* 数据列 */
		for ( var key in result[i]) {
			/* 统计维度 */
			for (var h = 0; h < config.xAxis.length; h++) {
				if (key == config.xAxis[h].field) {
					val_obj.name=result[i][key];
					break;
				}
			};
			/* 查找度量项值*/
			for (var j = 0; j < _series.length; j++) {
				if (key == _series[j].field) {
					val_obj.value=result[i][key];
					break;
				}
			};
		};
		_series[j].data.push(val_obj);
	};
	var option = {
			color : [ '#3398DB', '#FFFF00' ],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : _series
		};
	return option;
};
/**
 * 获取【清单表格】配置模板
 */
function get_grid_list(result, config) {
	var option=[];
	/* 统计维度 */
	for (var h = 0; h < config.xAxis.length; h++) {
		option.push(config.xAxis[h]);
	};
	for (var n = 0; n < config.series.length; n++) {
		option.push(config.series[n]);
	}
	return option;
};
/**
 * 基于echart图表显示模板
 */
function initEchart(paras, option) {
	var chart = echarts.init(document.getElementById(paras.container));
	var data = paras.data;
	var config = paras.config;
	var echartOption;
	if (option) {
		echartOption = option;
	} else {
		echartOption = eval(paras.method + "(data,config)");
	}
	chart.setOption(echartOption, true);
};
/**
 * 基于bootstrap-table列表模板【包含客户端分页】
 */
function initBootstrapGrid(paras, option)
{
	var data = paras.data;
	var config = paras.config;
	var cols;
	if (option) {
		cols = option;
	} else {
		cols = eval(paras.method + "(data,config)");
	}
	var $listTable = $("#"+paras.container);
	$listTable.bootstrapTable({
						columns : cols,
						sortable: true,   
						sortOrder: "ASC",   
						pagination: (option.isPage!=undefined?option.isPage:false),  
						pageNumber:1,     
						search: (option.search==undefined ? false:option.search),    
				        pageSize: 20,   
				        pageList: [20, 100],      
				        clickToSelect: true,  
				        locale:'zh-CN',
				        onClickRow: function (row) {
				        	if(option.clickRow){
				        		option.clickRow(row);
				        		return;
				        	}
					      },
					});
					$listTable.bootstrapTable('load', data);
					/*删除刷新*/
					$listTable.bootstrapTable('refresh', data);
};
/*获取数据*/

