/**
 * 功能：数据分析显示
 * 版本：V1.0.1
 * 修改日期：2019-07-16
 */
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
	/*用户自定义初始化*/
	I.initialPage();	
	
	/*获取页面模块数据*/
	var getPageModule=function(){
		$(".page-status").html(" 数据正在加载中.....");
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
	};
	/*构造页面模块*/
	var createPageModule=function(mobjs){
		$('.grid-stack').gridstack({cellHeight : 5,disableDrag:true,disableResize:true});
		var grid = $('.grid-stack').data('gridstack');
        grid.removeAll();
        getSearchValue();/*获取查询条件*/
        var items = GridStackUI.Utils.sort(mobjs);
        _.each(items, function (node) {
        	var  gridItem=$('<div id="'+node.id+'" class="grid-stack-item-content grid-module" data="'+(node.data!=""?escape(JSON.stringify(node.data)):"")+'"  type="'+node.type+'" ><div class="grid-title"></div><div class="grid-content"></div></div>');
        	grid.addWidget($('<div></div>').append(gridItem),node.x, node.y, node.width, node.height, true);
        	setModuleAttr(gridItem);
        	getModuleContent(gridItem);
        });
    	$(".page-status").html("");
	};
	/*设置模块属性*/
	var setModuleAttr=	function (domModule){
		if(domModule.attr("data")!=""){
			var attrInfo=JSON.parse(unescape(domModule.attr("data")));
			if(attrInfo.moduleTitle!=""){
						domModule.attr("title_1",attrInfo.moduleTitle);
						domModule.children(".grid-title").html("<span  class='glyphicon glyphicon-dashboard'></span> " +attrInfo.moduleTitle);
			}else{
						domModule.children(".grid-title").html("");
			}
			domModule.attr("title",attrInfo.moduleClass).addClass(attrInfo.moduleClass);
			domModule.children(".grid-title").attr("title",attrInfo.titleClass).addClass(attrInfo.titleClass);
		}
	};	
	var search={};/*页面查询条件*/
	/*获取模块内容数据*/
	var getModuleContent=function($module){
		_NormalRequest({
				domId : $module.attr("id"),
				url : "com/module-content",
				para :{fkModule:$module.attr("id"),MSEARCH:JSON.stringify(search)},
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
		case "1": /*清单表*/
			$module.children(".grid-content").html("<table id='"+$module.attr("id")+"_xc' class='table'></table>");
			show_grid_view($module.attr("id")+"_xc",topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "2": /*交叉表*/
			break;
		case "3": /*图表*/
			$module.children(".grid-content").html("<div id='"+$module.attr("id")+"_xc' class='chartData'  style='width:100%;height:"+($module.height()-40)+"px'></div>");
			show_chart_view($module.attr("id")+"_xc",topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "4": /*卡片*/
			show_card_view($module.attr("id"),topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "5": /*URL链接*/
			break;
		case "6": /*自定义方法*/
			show_custom_view($module.attr("id"),topicView.type,topicView.data,topicView.config,topicView.shell);
			break;
		case "7": /*Tab标签*/
			break;
		case "8": /*流式标签*/
			break;
		default:
			break;
		}	
	};	
	/*获取页面查询元素*/
	var getPageElement=function(){
		_NormalRequest({
			url:"com/view",
			domId:"tableList",
			para:{FID: pageInfo.mid,DSOT:"{METASORT:ASC}"},
			callback:function(res){
				if(res.code=="1"){
					pageInfo.columns=res.data.page;
					creatPageElement();
					getPageModule();
				}
			}
		});
	}();
	/*创建页面查询元素*/
	var creatPageElement=function(){		
		var $scur=$("#search-condition");
		$scur.html("<div class='s-title'>请输入搜索条件：</div>");
		$scur.append("<table class='table-grid'>"+getTableRow(pageInfo.columns)+"</table>");
		$scur.append("<div class='s-footer'><span  class=' btn btn-search'><span class='glyphicon glyphicon-search'> </span> 开始搜索</span></div>");
		pageEvent();
	};
	/*页面查询元素表格*/
	var getTableRow=function(columns){
		if(columns.length>0){
			$(".btn-show-search").show();
		}
		var tables="";
		for (var i = 0; i < columns.length; i++) {
			tables+="<tr><td class='tdl'>"+columns[i].METACN+"：</td>";
			tables+="<td  class='tdv'>"+setDataDom(columns[i])+"</td>";
			tables+="</tr>";
		}
		return tables;
	};
	/*设置数据域类型*/
	var setDataDom=function(column){
		switch (column.DETAILTYPE) {
		case "5":/*自定义字典*/
			return "<select id='"+column.METAEN+"' name='"+column.METAEN+"' class='form-control'>"+getSelectValue(column)+"</select>";
			break;
		case "1":/*年*/
			return	"<input  id='"+column.METAEN+"' name='"+column.METAEN+"'  type='text'  value='"+column.DETAILVALUE+"'   class='form-control form_datetime'   data-date-format='yyyy'>";
			break;
		case "2":/*年月*/
			return	"<input  id='"+column.METAEN+"' name='"+column.METAEN+"'  type='text'  value='"+column.DETAILVALUE+"'   class='form-control form_datetime'   data-date-format='yyyy-mm'>";
			break;
		case "3":/*年月日*/
			return	"<input  id='"+column.METAEN+"' name='"+column.METAEN+"'  type='text'  value='"+column.DETAILVALUE+"'   class='form-control form_datetime'   data-date-format='yyyy-mm-dd'>";
			break;
		case "4":/*关联字典*/
			return "<select id='"+column.METAEN+"' name='"+column.METAEN+"' class='form-control'></select>";
			break;
		default:	
			return "<input  id="+column.METAEN+"  name='"+column.METAEN+"'  value='"+column.DETAILVALUE+"' class='form-control'/>";
			break;
		};
	};
	/*获得下拉值*/
	var getSelectValue=function(column){
		var reop="<option value=''>---</option>";
		/*静态下拉值*/
		if(column.DETAILVALUE!=""){
			try {
				var options=JSON.parse(column.DETAILVALUE);
				for (var i = 0; i < options.length; i++) {
					reop+="<option value='"+options[i].key+"'>"+options[i].val+"</option>";
				}
			} catch (e) {
				console.log("静态字典数据定义不规范！");
			}
			return reop;
		}
		/*关联下拉值*/
		/*..........................*/
		return reop;
	};
	/*注册事件*/
	var pageEvent=function(){
		/*显示查询条件*/
		$("body").on("click",".btn-show-search",function(event){
			layer.open({
				  	type: 1,
				   title: false,
				   closeBtn: 0,
				   shadeClose: true,
				   area: ['400px', '300px'],
				   content: $("#search-condition"),
				   zIndex:100
				});
		});
		/*日期控件*/
		$('.form_datetime').datetimepicker({
			language:  'zh-CN',
            defaultDate: "1990-1-1", 
           autoclose: true,
           startView: 4,
          	minView:2, 
          	todayHighlight: 1,
            todayBtn: true
        });
		$(".search-condition").on("click",".btn-search",function(){
			getPageModule();
			layer.closeAll();
		});
	};
	/*创建查询条件*/
	function getSearchValue(){
		$("#search-condition input,select").each(function(index,item){
			search[$(item).attr("id")]=$(item).val();
		});
	};
	return pageInfo;
}();

/*数据透视图形*/
var function_register = {
	bar : {name:"get_echart_bar",method:get_echart_bar},/* 柱状图 */
	line : {name:"get_echart_line",method:get_echart_line},/* 折线图 */
	pie : {name:"get_echart_pie",method:get_echart_pie},/* 饼图 */
	grid : {name:"get_grid_list",method:get_grid_list},/* 清单表 */
	radar : {name:"get_echart_radar",method:get_echart_radar},/* 雷达图 */
	gauge : {name:"get_echart_gauge",method:get_echart_gauge},/* 仪表盘 */
	card : {name:"get_card_data",method:get_card_data},/* 卡片 */
	custom : {name:"get_custom_data",method:get_custom_data},/* 自定义*/
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
/*表格类数据显示*/
function show_grid_view(mId,vtype,data,config,shell){
	var m_name=function_register[vtype].name;
	var option=null;
	if(shell!="" && shell!="null"){
		option=eval('(function(result,config){'+shell+'})(data,config)');
	}
	initBootstrapGrid({method:m_name,container:mId,data:data,config:config},option);
};
/*卡片类数据显示*/
function show_card_view(mId,vtype,data,config,shell){
	var m_name=function_register[vtype].name;
	var option=null;
	if(shell!="" && shell!="null"){
		option=eval('(function(result,config){'+shell+'})(data,config)');
	}
	initCard({method:m_name,container:mId,data:data,config:config},option);
};
/*自定义数据显示*/
function show_custom_view(mId,vtype,data,config,shell){
	var m_name=function_register[vtype].name;
	var option=null;
	if(shell!="" && shell!="null"){
		option=eval('(function(result,config){'+shell+'})(data,config)');
	}
	initCustom({method:m_name,container:mId,data:data,config:config},option);
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
 * 获取【雷达图】配置模板
 */
function  get_echart_radar(result, config){
	var _legend_data = []; /* 图例 */
	var _xAxis_data = [];/* 维度值 */
	var _series = [];/* 度量项 */
	/* 构造度量项 */
	for (var n = 0; n < config.series.length; n++) {
		_series.push({'value':[],'name':config.series[n].name,'field':config.series[n].field});
		_legend_data.push(config.series[n].name);
	};
	/* 数据行 */
	for (var i = 0; i < result.length; i++) {
		/* 数据列 */
		for ( var key in result[i]) {
			/* 统计维度 */
			for (var h = 0; h < config.xAxis.length; h++) {
				if (key == config.xAxis[h].field) {
					_xAxis_data.push({'text':result[i][key],'max':config.xAxis[h].max});
					break;
				}
			}
			/* 查找度量项的值*/
			for (var j = 0; j < _series.length; j++) {
				if (key == _series[j].field) {
					_series[j].value.push(result[i][key]);
					break;
				}
			}
		}
	};
	var option = {
		    tooltip : {
		    	   trigger: 'axis'
		    },
		    legend: {
		    	 orient : 'vertical',
		         x : 'right',
		         y : 'bottom',
		        data:_legend_data
		    },
		    polar : [
		       {
		           indicator :_xAxis_data
		        }
		    ],
		    calculable : true,
		    series : [{
				    name: '',
		            type: 'radar',
		            itemStyle: {
		                normal: {
		                    areaStyle: {
		                        type: 'default'
		                    }
		                }
		            },
		            data:_series
			    }
		    ]
		};
	return option;
};

function get_echart_gauge(result, config){
	
	var option = {
		    series : [
		        {
		            name:'指标',
		            type:'gauge',
		            splitNumber: 10,  
		            axisLine: { 
		                lineStyle: {   
		                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
		                    width: 5
		                }
		            },
		            axisTick: {
		                splitNumber: 10, 
		                length :6, 
		                lineStyle: { 
		                    color: 'auto'
		                }
		            },
		            axisLabel: {
		                textStyle: {
		                    color: 'auto'
		                }
		            },
		            splitLine: {
		                show: true, 
		                length :10,
		                lineStyle: {
		                    color: 'auto'
		                }
		            },
		            title : {
		                show : false,
		                offsetCenter: [0, '-40%'], 
		                textStyle: { 
		                }
		            },
		            detail : {
		            	 show : false,
		                formatter:'{value}%',
		                textStyle: {
		                    color: 'auto'
		                }
		            },
		            data:[{value: 30, name: '完成率'}]
		        }
		    ]
		};
	return option;
}
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
 * 获取【卡片】配置模板
 */
function get_card_data(result, config) {
	var option={};
	option.height="10px";
	option.width="100%";
	/*样式*/
	for (var i = 0; i < config.option.length; i++) {
		if(config.option[i].id=="txt_style"){
			option.style=config.option[i].value;
			continue;
		}
		if(config.option[i].id=="txt_icon"){
			option.icon=config.option[i].value;
			continue;
		}
	}
	/*数据*/
	if(result.length>0){
		/* 数据列 */
		for ( var key in result[0]) {
			/* 统计维度 */
			for (var h = 0; h < config.xAxis.length; h++) {
				if (key == config.xAxis[h].field) {
					option.text=result[0][key];
					break;
				}
			};
			/* 查找度量项值*/
			for (var j = 0; j < config.series.length; j++) {
				if (key == config.series[j].field) {
					option.value=result[0][key];
					break;
				}
			};
		};
	}else{
		option.value=0;
	}
	return option;
};
/**
 * 获取【自定义】配置模板
 */
function get_custom_data(result, config){
	var option={};
	/*样式*/
	for (var i = 0; i < config.option.length; i++) {
		if(config.option[i].id=="txt_method"){
			option.method=config.option[i].value;
			continue;
		}
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
/**
 * 卡片模板
 */
function initCard(paras, option) {
	var data = paras.data;
	var config = paras.config;
	var cardOption;
	if (option) {
		cardOption = option;
	} else {
		cardOption = eval(paras.method + "(data,config)");
	}
	var $curRoot=$("#"+paras.container);
	$curRoot.attr("style",cardOption.style);
	$curRoot.css("padding-left" ,"35px");
	$curRoot.css("padding-right" ,"30px");
	$curRoot.html("<table style='height:"+$curRoot.height()+"px;width:100%;'><tr><td style='font-size: 35px;'><span class='"+cardOption.icon+"'></span> </td><td style='text-align: right;'><div style='"+ config.series[0].style+"'>"+cardOption.value+"<span style='font-size:11px'>  ("+config.series[0].unit+")</span></div> <div>"+$curRoot.attr("title_1")+"</div></td></tr></table>");
};
/**
 * 自定义模板
 */
function initCustom(paras, option) {
	var data = paras.data;
	var config = paras.config;
	var modId=paras.container;
	var customOption;
	if (option) {
		customOption = option;
	} else {
		customOption = eval(paras.method + "(data,config)");
	}
	try {
		var domContent=eval(customOption.method + "(modId,data,config)");
		$("#"+paras.container).html(domContent);
	} catch (e) {
		$("#"+paras.container).html("未定义方法或定义错误！")
	}
};
/*获取数据*/
function getViewData($module){
	var my = {
			dataContainer : $module.attr("id"),
			url : "bi/getData",
			para :{mid:$module.attr("id")},
			callback : function(res) {
				if(res.code=="1"){
					var topicView={config:res.data.config, shell:res.data.shell, type:res.data.viewType,data:res.data.data};
					showViewData(topicView,$module);
				}
			}
	};
_NormalRequest(my);
};
var aJsLoad = 1;
