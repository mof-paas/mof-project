/* 列表页面 */
;var _listPage=function(){
	/*从控制台获取指定功能信息*/
	var pageInfo={};
	pageInfo.base= parent.getMenuItem(getUrlPara("mid"));
	$(".page-title").html(pageInfo.base.MODULENAME);
	if(pageInfo.base.REMARK!=""){
		$(".page-remark").html("——" +pageInfo.base.REMARK);
	}
	/*判断是否映射的模块*/
	if(getUrlPara("mapId")!=""){
		pageInfo.mid=getUrlPara("mapId")
	}else{
		pageInfo.mid=pageInfo.base.ID
	}
	if(pageInfo.base.ENTITYINS!=""){
		var $entitys=JSON.parse(pageInfo.base.ENTITYINS);
		for (var i = 0; i < $entitys.length; i++) {
			I.MOID=$entitys[i].ID;
		}
	}
	if(pageInfo.base.LISTCSS!=null &&pageInfo.base.LISTCSS!=""){
		$("head").append("<link rel='stylesheet' href="+I.baseUrl+"/res/"+pageInfo.base.LISTCSS+"'>");
	}
	if(pageInfo.base.LISTEXT!=""){
		/*扩展类*/
	}
	/*获取页面结构元素*/
	var getPageElement=function(){
		_NormalRequest({
			url:"com/view",
			domId:"tableList",
			para:{FID: pageInfo.mid,DSOT:"{METASORT:ASC}"},
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
		creatTableList()//数据列表
		pageEvent();//注册页面事件
	};
	//设置表格列属性
var setColumn=function(){
			var tableColumn=[];//表格列；
			tableColumn.push({radio : true});
			//序号
			tableColumn.push({field : 'NO',title : '序号', width:60,
				formatter : function (value, row, index) {
						return index+1;
			       }
			});
			for (var i = 0; i < pageInfo.columns.length; i++) {
					var col={field : pageInfo.columns[i].METAEN,title : pageInfo.columns[i].METACN};
					if(pageInfo.columns[i].LISTISSHOW=="1"){
							col.visible=false;
					}
					//列样式模板
					var ctem=pageInfo.columns[i].LISTTEMPLATE;
					if(ctem!=null && ctem!="null" && ctem!=""){
						col.formatter=eval("("+unescape(ctem)+")");
					}
					tableColumn.push(col);
			};
			var listBtn={};	//设置操作列
			var topBtn={};//顶部操作按钮
			for (var j = 0; j < pageInfo.buttons.length; j++) {
					//列表按钮
					if(pageInfo.buttons[j].VIEWTYPE=="list" && pageInfo.buttons[j].BTNLOCATION=="list"){
						 if(!listBtn[pageInfo.buttons[j].BTNGROUP]){
							 listBtn[pageInfo.buttons[j].BTNGROUP]=[pageInfo.buttons[j]];
						 }else{
							 listBtn[pageInfo.buttons[j].BTNGROUP].push(pageInfo.buttons[j]);
						 }
						 continue;
					}
					//顶部按钮
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
			//设置页面顶部按钮
			$(".tools-button").html(setButtonDom(topBtn,{"id":""},"1"));
			return tableColumn;
	};
//按钮显示模板
var setButtonDom=function(btns,args,t){
			//t:表示相比顶部样式有变动
			var btnOne="";
			var btnGroups="";
			 for(var btn in btns){
				//独立按钮
				 if(btns[btn].length==1){
					 btnOne+= " <button data='"+args.id+"'  id='"+btns[btn][0].BTNCODE+"' class='btn page-btn"+(t=="0"?" btn-list":"")+"'  action='"+btns[btn][0].BTNEVENT+"'><span class='glyphicon "+btns[btn][0].BTNICON+"'></span> "+btns[btn][0].BTNNAME+"</button> ";
				 	continue;
				 }
				//下拉按钮
				 var btnItems="";
				 for (var i = 0; i < btns[btn].length; i++) {
					 btnItems+="<li data='"+args.id+"'  id='"+btns[btn][i].BTNCODE+"' action='"+btns[btn][i].BTNEVENT+"' class='page-btn'><span class='glyphicon "+btns[btn][i].BTNICON+"' > </span> "+btns[btn][i].BTNNAME+"</li>";
				 }
				 btnGroups+="<button class='btn  btn-list-down' down='"+escape("<ul>"+btnItems+"</ul>")+"'> <span class='glyphicon glyphicon-cog'></span> <span class='caret'></span></button>";
			 	}
			 return btnOne+btnGroups;
	};
	//注册事件
	var pageEvent=function(){
		//下拉按钮事件
		$("body").on("click",".btn-list-down",function(event){
			var $cur=$(this);
			$(".btn-dropdown").css("left",$cur.offset().left-$(".btn-dropdown").width()+$cur.width()).css("top",$cur.offset().top+$cur.height()+8).html(unescape($cur.attr("down"))).slideDown("fast");
			event.stopPropagation();
		});
		//常规按钮事件
		$("#tableList,.tools-button,.btn-dropdown").on("click",".page-btn",function(event){
			btnAction($(this))
		});
	};
	//常规默认按钮事件
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
	//创建数据列表
	var creatTableList=function(){
		if(!I.MOID || I.MOID==""){
			layer.msg("页面未指定实体对象！");
			return;
		}
		 _NormalRequest({
				url:"biz/read",
				domId:"tableList",
				para:{MOID:I.MOID},
				callback:function(res){
					if(res.code=="0"){
						layer.msg(res.message);
						return;
					}
					initTable(setColumn(),res.data,{search:true});
					//快速查询
					$(".tools-search").append($(".search").addClass("search-layout").append("<span class='glyphicon glyphicon-search search-icon'></span>"));
				}
			});
	};
	//关闭按钮下拉 
	$(document).click(function(){ 
		   $(".btn-dropdown").hide(); 
	});
	return pageInfo;
	}();
	/* 页面行为 */
var _pageAction=function(){
	  var crud={};
	  //添加
	  crud.add=function(option){
			parent.pageSwitch(I.baseUrl+"/mof-views/detail?s=add&mid="+_listPage.base.ID);
	  }
	  //更新
	  crud.update=function(option){
		  parent.pageSwitch(I.baseUrl+"/mof-views/detail?s=update&mid="+_listPage.base.ID+"&id="+option.id);
	  }
	  //删除
	  crud.del=function(option){
		  deleteData(option);
	  }
	  //读取
	crud.read=function(option){
		  
	  }
	  return crud;
}();
