;var _detailPage=function(){
			var pageInfo={};
			getPageBaseInfo(getUrlPara("pageId"));
			pageInfo.status=getUrlPara("s");
			$(".page-title").html(pageInfo.base.pageName);
			if(pageInfo.base.REMARK!=""){
				$(".page-remark").html("——" +pageInfo.base.pageRemark);
			};
			if(pageInfo.base.entityIns!=""){
				/*暂时支持单实例*/
				I.MOID=pageInfo.base.entityIns
			}
			if(pageInfo.base.LISTCSS!=null && pageInfo.base.LISTCSS!=""){
				$("head").append("<link rel='stylesheet' href="+I.baseUrl+"/res/"+pageInfo.base.LISTCSS+"'>");
			};
			if(pageInfo.base.LISTEXT!=""){
				/*扩展类*/
			};
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
					domId:"tableDetail",
					para:{PAGEID: pageInfo.base.ID,DSOT:"{METASORT:ASC}"},
					callback:function(res){
						if(res.code=="1"){
							pageInfo.columns=res.data.page;
							pageInfo.buttons=res.data.button;
							/*创建页面元素*/
							creatPageElement();
						}
					}
				});
			}();
		var creatPageElement=function(){
				setTableGroup(); /*创建数据域*/
				setTools();/*创建按钮*/
				setPageStatus(); /*创建页面状态*/
				initialPageData();/*初始化页面数据*/
				loadPageData();/*加载页面域数据*/
				pageEvent();/*注册页面事件*/
			};
		/*设置页面当前状态*/
		var setPageStatus=function(){
				switch (pageInfo.status) {
				case "add":
					$(".page-status").html("添加").addClass("mof-bg-green");
					break;
				case "update":
					$(".page-status").html("修改").addClass("mof-bg-red");
					$("#ID").val(getUrlPara("id"));
					break;
				case "edit":
					$(".page-status").html("编辑").addClass("mof-bg-red");
				
					break;
				default:
					break;
				};
			};
		/*创建数据域表格*/
		var setTableGroup=function(){
			/*表格分组*/
			var groups={};
			for (var n = 0; n< pageInfo.columns.length;n++) {
				if(!groups[pageInfo.columns[n].DETAILGROUP]){
					groups[pageInfo.columns[n].DETAILGROUP]=[pageInfo.columns[n]];
				 }else{
					 groups[pageInfo.columns[n].DETAILGROUP].push(pageInfo.columns[n]);
				 }
			};
			$(".table-detail").html("");
			for (var  group in groups) {
				$(".table-detail").append("<div class='table-grid-group'> <span class='glyphicon glyphicon-tag'></span> "+group+"</div>");
				$(".table-detail").append("<table class='table-grid'>"+getTableRow(groups[group])+"</table>");
			}
		}
		/*获取表格行*/
		var getTableRow=function(columns){
					var tables="";
					var trs="";
					var k=0;
					var istr=true;
					var bt="";
					for (var i = 0; i < columns.length; i++) {
						/*隐藏*/
						if(columns[i].DETAILRULES.substr(2,1)=="1"){
							$(".form-hidden").append("<input  type='hidden' id='"+columns[i].METAEN+"'   name='"+columns[i].METAEN+"'  value='"+columns[i].DETAILVALUE+"' />");
							continue;
						}
						if(columns[i].DETAILRULES.substr(0,1)=="1"){
							/*必填*/
							bt="<span class='bt'>*</span>";
						}else{
							bt="";
						}
						if(columns[i].DETAILLAYOUT=="2"){
							if(!istr){
								tables+=("</tr>");
							}
							/*独占行*/
							tables+="<tr><td class='tdl'>" +bt +" "+columns[i].METACN+"：</td>";
							tables+="<td  class='tdv' colspan='3'>"+setDataDom(columns[i])+"</td>";
							tables+="</tr>";
							continue;
						}
						/*双列*/
						if(k%2==0){
							tables+="<tr><td class='tdl'>" +bt +" "+columns[i].METACN+"：</td>";
							tables+="<td  class='tdv'>"+setDataDom(columns[i])+"</td>";
							istr=false;
						}else{
							tables+="<td class='tdl'>" +bt +" "+columns[i].METACN+"：</td>";
							tables+="<td class='tdv'>"+setDataDom(columns[i])+"</td>";
							tables+="</tr>";
							istr=true;
						}
						k++;
					}
					if(!istr){
						tables+=("</tr>");
					}
					return tables;
			};
		/*设置数据域类型*/
		var setDataDom=function(column){
			switch (column.DETAILTYPE) {
			case "2":/*下拉域*/
				return "<select id='"+column.METAEN+"' name='"+column.METAEN+"' class='form-control'>"+getSelectValue(column)+"</select>";
				break;
			case "3":/*数字域*/
				return "<input  id="+columns.METAEN+"  name='"+columns.METAEN+"'  value='"+column.DETAILVALUE+"' class='form-control'/>";
				break;
			case "4":/*日期域*/
				 return	"<input  id='"+column.METAEN+"' name='"+column.METAEN+"'  type='text'  value=''   class='form-control form_datetime'   data-date-format='yyyy-mm-dd'>";
				break;
			case "5":/*大文本*/
				return "<textarea  rows='8' cols='8'    id="+column.METAEN+"  name='"+column.METAEN+"'  value='"+column.DETAILVALUE+"' class='form-control'></textarea>";
				break;
			case "6":/*富文本*/
				return "<textarea  rows='8' cols='8'    id="+column.METAEN+"  name='"+column.METAEN+"'  value='"+column.DETAILVALUE+"' class='form-control'></textarea>";
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
					layer.msg("静态字典格式不正确！")
				}
				return reop;
			}
			/*动态关联下拉值*/
			if(column.METADIC!=""){
				 var  globalParas= $.extend({}, {MOID:column.METADIC},getPathParas());
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
								reop+="<option value='"+ bizdata[i][key]+"'>"+bizdata[i][value]+"</option>";
							}	
						}
					}
				});
			}
			return reop;
		};
		/*按钮数据*/
		var setTools=function(){
		var bottomBtn={};	/*设置操作列*/
			var topBtn={};/*顶部操作按钮*/
			for (var j = 0; j < pageInfo.buttons.length; j++) {
					/*列表按钮*/
					if(pageInfo.buttons[j].VIEWTYPE=="detail" && pageInfo.buttons[j].BTNLOCATION=="bottom"){
						 if(!bottomBtn[pageInfo.buttons[j].BTNGROUP]){
							 bottomBtn[pageInfo.buttons[j].BTNGROUP]=[pageInfo.buttons[j]];
						 }else{
							 bottomBtn[pageInfo.buttons[j].BTNGROUP].push(pageInfo.buttons[j]);
						 }
						 continue;
					}
					/*顶部按钮*/
					if(pageInfo.buttons[j].VIEWTYPE=="detail" && pageInfo.buttons[j].BTNLOCATION=="top"){
							 if(!topBtn[pageInfo.buttons[j].BTNGROUP]){
								 topBtn[pageInfo.buttons[j].BTNGROUP]=[pageInfo.buttons[j]];
							 }else{
								 topBtn[pageInfo.buttons[j].BTNGROUP].push(pageInfo.buttons[j]);
							 }
							 continue;
						}
					}
			/*设置页面顶部按钮*/
			$(".tools-button").html(setButtonDom(topBtn,"1"));
		};
		/*按钮显示模板*/
		var setButtonDom=function(btns,t){
					var btnOne="";
					var btnGroups="";
					 for(var btn in btns){
						/*独立按钮*/
						 if(btns[btn].length==1){
							 btnOne+= " <button id='"+btns[btn][0].BTNCODE+"' class='btn page-btn"+(t=="0"?" btn-list":"")+"'  action='"+btns[btn][0].BTNEVENT+"'><span class='glyphicon "+btns[btn][0].BTNICON+"'></span> "+btns[btn][0].BTNNAME+"</button> ";
						 	continue;
						 }
						/*下拉按钮*/
						 var btnItems="";
						 for (var i = 0; i < btns[btn].length; i++) {
							 btnItems+="<li id='"+btns[btn][i].BTNCODE+"' action='"+btns[btn][i].BTNEVENT+"' class='page-btn'><span class='glyphicon "+btns[btn][i].BTNICON+"' > </span> "+btns[btn][i].BTNNAME+"</li>";
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
				/*默认按钮事件*/
				$(".tools-button,.btn-dropdown").on("click",".page-btn",function(event){
					btnAction($(this))
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
			};
			/*事件处理单元*/
		var btnAction=function(btnObj){
				if(!btnObj.attr("action") || btnObj.attr("action")=="") {
					layer.msg("未注册事件！");
					return;
				}
				switch (btnObj.attr("action")) {
					case "save()":
						/*新增||更新保存*/
						var act=(pageInfo.status=="add"?"create":"update");
						if(pageInfo.status=="edit"){
							/*表单填报保存*/
							if($("#ID").val()==""){
								act="create";
							}else{
								act="update";
							}
						}
						_pageAction.save({formId:"form_detail",action:act,args:{MOID:I.MOID}});
					break;
					case "close()":
						_pageAction.close();
						break;
				default:
						eval(btnObj.attr("action"));
					break;
				}
			};
		/*初始化页面数据*/
		var initialPageData=function(){
			/*从路径中获取参数*/
			var pathPara=getPathParas();
			for ( var key in pathPara) {
				$("#"+key).val(pathPara[key]);
			}
		};
		/*加载页面数据*/
		var loadPageData=function(){
				if(pageInfo.status=="update" && $("#ID").val()!=""){
					setPageData({domId:"tableDetail",args:{ID:$("#ID").val(),MOID:I.MOID}});
				}
				/*用于填报明细表单*/
				if(pageInfo.status=="edit"){
					var  globalParas= $.extend({}, {MOID:I.MOID},getPathParas());
					setPageData({domId:"tableDetail",args:globalParas});
				}
			};
			/*从路径中获取参数*/
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
			/*关闭按钮下拉 */
			$(document).click(function(){ 
				   $(".btn-dropdown").hide(); 
			});
			return pageInfo;
	 	}(); 
		/* 页面行为 */
		var _pageAction=function(){
			  var crud={};
			  /*保存*/
			  crud.save=function(option){
				  saveData(option);
			  }
			  /*返回*/
			  crud.close=function(option){
				  window.history.go(-1);
			  }
			  return crud;
}();