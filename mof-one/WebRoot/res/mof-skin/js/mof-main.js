/**
 * 功能：公共业务方法
 */

/*系统登录*/
function login(m){
	if($("#ACCOUNT").val()=="" || $("#PASSWORD").val()==""){
		layer.msg("请输入账号、密码！");
		return;
	}
	_NormalRequest({
		url:"auth/"+m,
		//hex_md5($("#PASSWORD").val())
		para:{ACCOUNT:$("#ACCOUNT").val(),PASSWORD:$("#PASSWORD").val()},
		callback:function(res){
			if(res.code=="1"){
				location.href=I.baseUrl+"/route/mof-views/console";
			}else{
				layer.msg(res.message);
			}
		}
	});
};
/*退出登录*/
function loginOut(m){
	_NormalRequest({url:"biz/out"});
}
/* 获取系统信息*/
function getApp(callFun){
	_NormalRequest({
		url:"com/app",
		domId:"",
		para:{},
		callback:function(res){
			if(callFun){
				callFun(res);
			}
		}
	});
};
/* 获取模型对象定义*/
function getModel(option){
	if(!option.moId){
		layer.msg("模型对象是空！");
		return;
	}
	_NormalRequest({
		url:"com/obj",
		domId:option.domId,
		para:{"MOID":option.moId},
		callback:function(res){
			option.callback(res);
		}
	});
}
/* 业务对象数据*/
function getData(moId,option){
	var  globalParas= $.extend({}, {	MOID :moId},option.args);
	_NormalRequest({
		url:"biz/read",
		domId:option.domId,
		para:globalParas,
		callback:function(res){
			option.callback(res);
		}
	});
};
/*保存表单数据*/
function saveData(option) {
	var my = {
			form : option.formId,
			url : "biz/"+option.action,
			para : option.args,
			callback:function(res){
					if(res.code=="1"){
						if(option.saveAfter){
							option.saveAfter(res);
						}
					}
					layer.msg(res.message);
			}
		};
	_FormRequest(my);
}
/*明细界面赋值*/
function setPageData(option) {
	var my = {
			domId:option.domId,
			url : "biz/read",
			para : option.args,
			callback : function(res) {
			if(res.code=="1" && res.data.length>0){
				$.setValue(res.data[0]);
			}else{
				layer.msg(res.message);
			}
			if(option.setPageDataLast)
				{
					option.setPageDataLast();
				}
		}
	}
	_NormalRequest(my);
};
/*删除数据*/
 function deleteData(option){
		layer.open({
				title:" 操作提示",
				content: "<span style='font-size: 30px;color:red;'> <span class='glyphicon glyphicon-question-sign' ></span></span> 您确定要删除数据吗？",
				btn: ['确认', '取消'],
				shadeClose: false,
				yes: function(){
					_NormalRequest({
						url:"biz/delete",
						domId:option.domId,
						para:option.args,
						callback:function(res){
							if(res.code=="1"){
								layer.msg(res.message);
								if(option.deleteLast){
									option.deleteLast();
								}
							}
						}
					});
				}, no: function(){
					layer.msg("取消");
					}
			});
 };
/* 远程获取数据*/
function getDataList(option) {
		var my = {
			domId:option.domId,
			url : option.url,
			para :option.args,
			callback : function(res) {
				if(res.code==1){
					if(option.listTemplate){
						/*自定义列表显示模板*/
						option.listTemplate(res);
						}
					else{
						/*默认Bootstrap列表模板*/
						initTable(option.column, res.data,option.grid);
					}
					if(option.bindListDataAfter)
					{
						/*显示出列表数据后*/
						option.bindListDataAfter();
					}
				}
			}
		};
		_NormalRequest(my);
}
function initTable(col,data,option)
{
	if(option==undefined){option={};}
	var $listTable = $("#"+(option.domId?option.domId:"tableList"));
	$listTable.bootstrapTable({
						columns : col,
						uniqueId : "ID",
						sortable: true,   
						sortOrder: "DESC",   
						cardView: (option.cv==undefined ? false:option.cv),    
						pagination: (option.isPage!=undefined?option.isPage:true),  
						pageNumber:1,     
						search: (option.search==undefined ? false:option.search),    
				        pageSize: (option.ps==undefined ? 20:option.ps),   
				        pageList: [20, 100],      
				        clickToSelect: true,  
				        locale:'zh-CN',
				  	  	onDblClickCell: function (field, value,row,td) {
				  	  		if(option.clickDbCell){
				  	  			option.clickDbCell(row);
				  	  			return;
				  	  		}
				         if(I.listDbClick)
				        	   {
				        	 		I.listDbClick(row);
				        	   }
				        } ,
				        onClickRow: function (row) {
				        	if(option.clickRow){
				        		option.clickRow(row);
				        		return;
				        	}
					         if(I.listClick)
					        	   {
					        	 		I.listClick(row);
					        	   }
					        } 
					});
					$listTable.bootstrapTable('load', data);
					$listTable.bootstrapTable("hideColumn", "ID");

					$listTable.bootstrapTable('refresh', data);
					return $listTable;
	}
/* 初始化表格【服务器端分页】*/
function initPaginationTable(col,dataUrl,option)
{
	var $listTable = $("#tableList");
	$listTable.bootstrapTable({
						columns : col,
						method: 'post',
						contentType: "application/x-www-form-urlencoded",
						url:dataUrl,
						uniqueId : "ID",
						sortable: true,   
						sortOrder: "ASC",   
						cardView: false,   
						pagination: true,  
						pageNumber:1,                    
				        pageSize: 50,   
				        sidePagination: "server",  
				        pageList: [50, 100],      
				       queryParamsType:'',
				        queryParams:function(params){
				       	 return {
				    	        pageSize : params.pageSize, 
				    	        pageIndex : params.pageNumber, 
				    	        sid : I.SID
				    	    }
				        },
				        responseHandler:responseHandler,
				        clickToSelect: true,  
				        locale:'zh-CN',
				    	onDblClickCell: function (field, value,row,td) {
					         if(I.listDbClick)
					        	   {
					        	 		I.listDbClick(row);
					        	  }
					        } ,
					        onClickRow: function (row) {
						         if(I.listClick)
						        	   {
						        	 		I.listClick(row);
						        	   }
						      } 
					});
					$listTable.bootstrapTable('refresh', {url: dataUrl});
					$listTable.bootstrapTable("hideColumn", "ID");
					return $listTable;
	}
  /*请求成功方法*/
    function responseHandler(result){
        if(result.success != "1"){
            return;
        }
        return {
            total : result.data.total, 
            rows : result.data.rows 
        };
    };