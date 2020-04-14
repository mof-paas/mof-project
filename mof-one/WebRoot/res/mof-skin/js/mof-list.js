/* 列表页面 */
;var _listPage=function(){
	/*从控制台获取指定功能信息*/
	var pageInfo={};
	/*全局变量缓存*/
	pageInfo.cacheData={};
	getPageBaseInfo(getUrlPara("pageId"));
	$(".page-title").html(pageInfo.base.pageName);
	if(pageInfo.base.pageRemark!=""){
		$(".page-remark").html("——" +pageInfo.base.pageRemark);
	}
	/*判断是否映射的模块*/
	if(getUrlPara("mapId")!=""){
		pageInfo.mid=getUrlPara("mapId")
	}else{
		pageInfo.mid=pageInfo.base.ID
	}
	if(pageInfo.base.entityIns!=""){
		/*暂时支持单实例*/
		I.MOID=pageInfo.base.entityIns
	}
	if(pageInfo.base.pageCss!=null &&pageInfo.base.pageCss!=""){
		$("head").append("<link rel='stylesheet' href="+I.baseUrl+"/res/"+pageInfo.base.pageCss+"'>");
	}
	if(pageInfo.base.extendAttr!=""){
		/*扩展类*/
	}
	/*用户自定义初始化*/
	I.initialPage();	
	/*获取当前页面信息*/
	function getPageBaseInfo(pageId){
		/*从后台获取页面信息*/
			_NormalRequest({
				url:"com/view",
				para:{"ID":pageId},
				async:false,
				callback:function(res){
					if(res.code=="1" && res.data.length>0){
						pageInfo.base=res.data[0];
					}
				}
			});
	};
	/*获取页面结构元素*/
	var getPageElement=function(){
		_NormalRequest({
			url:"com/element",
			domId:"tableList",
			para:{PAGEID: pageInfo.base.ID,DSOT:"{METASORT:ASC,BTNSORT:ASC}"},
			callback:function(res){
				if(res.code=="1"){
					pageInfo.columns=res.data.page;
					pageInfo.buttons=res.data.button;
					creatPageElement();
				}
			}
		});
	}();
	/*创建页面元素*/	
	var creatPageElement=function(){
		creatTableList()/*数据列表*/
		pageEvent();/*注册页面事件*/
	};
	/*设置表格列属性*/
var setColumn=function(){
			var tableColumn=[];/*表格列*/
			tableColumn.push({radio : true});
			/*序号*/
			tableColumn.push({field : 'NO',title : '序号', width:60,
				formatter : function (value, row, index) {
						return index+1;
			       }
			});
			for (var i = 0; i < pageInfo.columns.length; i++) {
					var col={field : pageInfo.columns[i].METAEN,title : pageInfo.columns[i].METACN};
					if(pageInfo.columns[i].LISTISSHOW=="0"){
							col.visible=false;
					}
					/*编码转换列*/		
					if(pageInfo.columns[i].DETAILTYPE=="2"){
						try {
							var columnData=pageInfo.columns[i];
							col.formatter=function(value, row, index){
								if(value==null || value==""){
									return "-"
								}else{
									return getCodeText(columnData,value);
								}
							};
						} catch (e) {
							layer.msg("编码转换错误："+e);
						}
					}
					/*列样式模板*/
					var ctem=pageInfo.columns[i].LISTTEMPLATE;
					if(ctem!=null && ctem!="null" && ctem!=""){
						try {
							var action_fun;
							eval('action_fun='+unescape(ctem))
							col.formatter=action_fun;
						} catch (e) {
							layer.msg(e);
						}
					}
					tableColumn.push(col);
			};
			var listBtn={};	/*设置操作列*/
			var topBtn={};/*顶部操作按钮*/
			for (var j = 0; j < pageInfo.buttons.length; j++) {
					/*列表按钮*/
					if(pageInfo.buttons[j].VIEWTYPE=="list" && pageInfo.buttons[j].BTNLOCATION=="list"){
						 if(!listBtn[pageInfo.buttons[j].BTNGROUP]){
							 listBtn[pageInfo.buttons[j].BTNGROUP]=[pageInfo.buttons[j]];
						 }else{
							 listBtn[pageInfo.buttons[j].BTNGROUP].push(pageInfo.buttons[j]);
						 }
						 continue;
					}
					/*顶部按钮*/
					if(pageInfo.buttons[j].VIEWTYPE=="list" && pageInfo.buttons[j].BTNLOCATION=="top"){
							 if(!topBtn[pageInfo.buttons[j].BTNGROUP]){
								 topBtn[pageInfo.buttons[j].BTNGROUP]=[pageInfo.buttons[j]];
							 }else{
								 topBtn[pageInfo.buttons[j].BTNGROUP].push(pageInfo.buttons[j]);
							 }
							 continue;
						}
					}
					tableColumn.push({title : '操作',width:150,align: 'center',
							formatter : function (value, row, index) {
									return setButtonDom(listBtn,{"id":row.ID},"0");
						       }
					});
			/*设置页面顶部按钮*/
			$(".tools-button").html(setButtonDom(topBtn,{"id":""},"1"));
			return tableColumn;
	};
/*按钮显示模板*/
var setButtonDom=function(btns,args,t){
			/*t:表示相比顶部样式有变动*/
			var btnOne="";
			var btnGroups="";
			 for(var btn in btns){
				/*独立按钮*/
				 if(btns[btn].length==1){
					 btnOne+= " <button data='"+args.id+"'  id='"+btns[btn][0].BTNCODE+"' class='btn page-btn"+(t=="0"?" btn-list":"")+"'  action='"+btns[btn][0].BTNEVENT+"'><span class='glyphicon "+btns[btn][0].BTNICON+"'></span> "+btns[btn][0].BTNNAME+"</button> ";
				 	continue;
				 }
				/*下拉按钮*/
				 var btnItems="";
				 for (var i = 0; i < btns[btn].length; i++) {
					 btnItems+="<li data='"+args.id+"'  id='"+btns[btn][i].BTNCODE+"' action='"+btns[btn][i].BTNEVENT+"' class='page-btn'><span class='glyphicon "+btns[btn][i].BTNICON+"' > </span> "+btns[btn][i].BTNNAME+"</li>";
				 }
				 btnGroups+="<button class='btn  btn-list-down' down='"+escape("<ul>"+btnItems+"</ul>")+"'> <span class='glyphicon glyphicon-cog'></span> <span class='caret'></span></button>";
			 	}
			 return btnOne+btnGroups;
	};
	/*注册事件*/
	var pageEvent=function(){
		/*下拉按钮事件*/
		$("body").on("click",".btn-list-down",function(event){
			var $cur=$(this);
			$(".btn-dropdown").css("left",$cur.offset().left-$(".btn-dropdown").width()+$cur.width()).css("top",$cur.offset().top+$cur.height()+8).html(unescape($cur.attr("down"))).slideDown("fast");
			event.stopPropagation();
		});
		/*常规按钮事件*/
		$("#tableList,.tools-button,.btn-dropdown").on("click",".page-btn",function(event){
			btnAction($(this))
		});
	};
	/*常规默认按钮事件*/
	var btnAction=function(btnObj){
		if(!btnObj.attr("action") || btnObj.attr("action")=="") {
			layer.msg("未注册事件！");
			return;
		}
		switch (btnObj.attr("action")) {
			case "add()":
				_pageAction.add();
			break;
			case "update()":
				_pageAction.update({"id":btnObj.attr("data")});
				break;
			case "delete()":
				_pageAction.del({domId:"tableList",args:{MOID:I.MOID,ID:btnObj.attr("data")},deleteLast:function(){
					creatTableList();
				}});
				break;
			case "search()":
				_pageAction.search();
				break;
		default:
			if(btnObj.attr("action")!="" ){
				eval(btnObj.attr("action"));
			}else{
				layer.msg("未定义事件！");
			}
			break;
		}
	};
	/*1、*从路径中获取参数*/
	function getPathParas(){
		var pathPara={};
		if(pageInfo.base.urlParas!=""){
			var paralist=pageInfo.base.urlParas.split();
			for (var p = 0; p < paralist.length; p++) {
				pathPara[paralist[p]]=getUrlPara(paralist[p]);
			}
		}
		return pathPara;
	};
	/*2、页面动态查询参数*/
	var getActionSearchParas=function(){
		var actionPara={};
		/*...........*/
		return actionPara;
	};
	/*创建数据列表*/
	var creatTableList=function(){
		if(!I.MOID || I.MOID==""){
			layer.msg("页面未指定实体对象！");
			return;
		}
		/*查询参数*/
		 var  globalParas= $.extend({}, {MOID:I.MOID},getPathParas());
		 _NormalRequest({
				url:"biz/read",
				domId:"tableList",
				para:globalParas,
				callback:function(res){
					if(res.code=="0"){
						layer.msg(res.message);
						return;
					}
					initTable(setColumn(),res.data,{search:true});
					/*快速查询*/
					$(".tools-search").append($(".search").addClass("search-layout").append("<span class='glyphicon glyphicon-search search-icon'></span>"));
				}
			});
	};
	/*当前视图关联页面*/
	var getRelationPage=function(type){
		if(pageInfo.base.pageRelation==null || pageInfo.base.pageRelation==""){return null};
		var relationPages=JSON.parse(pageInfo.base.pageRelation);
		for (var i = 0; i < relationPages.length; i++) {
			if( relationPages[i].type==type){
				return relationPages[i];
			}
		}
		return null;
	};
/*字典编码转换*/
var getCodeText=function(column,vd){
	
	var dataItems=pageInfo.cacheData[column.METAEN];
	 if(dataItems!=null){
		 for (var d = 0; d < dataItems.length; d++) {
			 if(dataItems[d].key==vd){
				 return dataItems[d].value;
			 }
		}
	 }
	var dictionaries=[];
	/*静态下拉值*/
	if(column.DETAILVALUE!=null && column.DETAILVALUE!=""){

		try {
				var options=JSON.parse(column.DETAILVALUE);
				for (var o = 0; o < options.length; o++) {
					dictionaries.push({"key":options[o]["key"],"value":options[o]["val"]});
				}
				pageInfo.cacheData[column.METAEN]=dictionaries;
				 for (var f = 0; f < dictionaries.length; f++) {
					 if(dictionaries[f].key==vd){
						 return dictionaries[f].value;
					 }
				}
			} catch (e) {
				layer.msg("静态字典格式不正确！")
			}
			return vd;
	}
	/*动态字典编码*/
	if(column.METADIC!=null && column.METADIC!=""){
		 var  globalParas= $.extend({}, {MOID:column.METADIC},getPathParas());
		 	layer.msg("从远程获取字典表...");
			_NormalRequest({
				url:"biz/objdata",
				domId:"tableDetail",
				para:globalParas,
				async:false, 
				callback:function(res){
					if(res.code=="1"){
						var meta=res.data.meta;
						var bizdata=res.data.data;
						var key="",value="";
						for (var j = 0; j < meta.objectItems.length; j++) {
							if(meta.objectItems[j].dicItem=="K" && key==""){
								key=meta.objectItems[j].attrCode;
								continue;
							}
							if(meta.objectItems[j].dicItem=="V" && value==""){
								value=meta.objectItems[j].attrCode;
							}
						}
						for (var i = 0; i < bizdata.length; i++) {
							dictionaries.push({"key":bizdata[i][key],"value":bizdata[i][value]});
						}	
					}
				}
			});
			pageInfo.cacheData[column.METAEN]=dictionaries;
			 for (var f = 0; f < dictionaries.length; f++) {
				 if(dictionaries[f].key==vd){
					 return dictionaries[f].value;
				 }
			}
			return vd;
	}
};
/* 页面行为 */
var _pageAction=function(){
		  var crud={};
		  /*路径参数*/
		  var parasObj=getPathParas();
		  var  paraStr="";
		  for ( var key in parasObj) {
			  paraStr+="&"+key+"="+parasObj[key];
		  }
		  var relationPage=getRelationPage("1");
		  if(relationPage==null){layer.msg("未指定关联页面！"); return;}
		  /*页面路径*/
		  var pagePath;
		  if(relationPage.ps=="ifram"){
			  pagePath=I.baseUrl+"/route/"+relationPage.pu;
		  }else{
			  pagePath=relationPage.pu;
		  }
		  /*添加*/
		  crud.add=function(option){
			 /*parent.pageSwitch(pagePath+"?s=add&mid="+_listPage.base.ID);*/
			  window.location.href=pagePath+"?s=add&pageId="+relationPage.page+paraStr;
		  }
		  /*更新*/
		  crud.update=function(option){
			  /* parent.pageSwitch(pagePath+"?s=update&mid="+_listPage.base.ID+"&id="+option.id);*/
			  window.location.href=pagePath+"?s=update&pageId="+relationPage.page+"&id="+option.id+paraStr;
		  }
		  /*删除*/
		  crud.del=function(option){
			  deleteData(option);
		  }
		  /*读取*/
		crud.read=function(option){	  
		 }
		  return crud;
	}();
	/*关闭按钮下拉*/
	$(document).click(function(){ 
		   $(".btn-dropdown").hide(); 
	});
	return pageInfo;
}();

