<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<%@ include file="/include/mof-meta.jsp"%>
<head>
<title>系统首页</title>
<script type="text/javascript">
	var I = {
		baseUrl : "${ctx}",
	};
</script>
<style type="text/css">
.project-lists{
padding: 30px;
}
.project-lists .item{
border: 1px solid #f6f6f6;
border-radius: 5px;
padding: 10px;
margin-bottom: 30px;
}
.project-lists .item-table{
min-height:130px;
width: 100%;
}
.item-btn{
border: 1px solid rgb(190,234,240);width: 120px;margin-top: 8px;
margin-left: 5px;
}
.project-name{
font-size: 20px; font-weight: bold;line-height: 35px;
}
.project-remark{
color:#808080;line-height: 25px;
}
.nodata{
text-align: center;
margin-top: 50px;
font-size: 30px;
color: #808080;
}
</style>
</head>
<body>
<div style="padding-left: 30px; font-size: 20px;line-height: 60px; color:#ccc; border-bottom: 1px solid #e6e6e6;">
 <span class="glyphicon glyphicon-blackboard"></span> 我的桌面
</div>
<div class="project-lists">
</div>
	<script type="text/javascript" src="${ctx}/res/mof-skin/lib/jquery/jquery.backstretch.min.js"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-base.js?v=1.0.1"></script>
	<script type="text/javascript" src="${ctx}/res/mof-skin/js/mof-main.js?v=1.0.1"></script>
	<script type="text/javascript">
	(function(){
		$("body").backstretch([ I.baseUrl+"/res/mof-skin/img/main_bg.png" ]);
		$(".project-lists").on("click",".item-btn",function(){
			var path="${ctx}/"+$(this).attr("url")+"&SSXM="+$(this).parent().attr("pid");
			var ifFull=false;
			if($(this).attr("id")=="gnbj"){
				ifFull=true;
			}
			parent.popWindow($(this).parent().attr("pn"),path,"900px","600px",ifFull);
		});
		 //getProject();
	})();
	function getProject(){
		 _NormalRequest({
				url:"biz/read",
				domId:"tableList",
				para:{MOID:"6000000691600758"},
				callback:function(res){
						var items="";
						for (var i = 0; i < res.data.length; i++) {
							items+="<div class='item'><table class='item-table'><tr >"
							+"<td style='vertical-align: top;'>"
							+"<div class='project-name'>"+res.data[i]["XMMC"]+"</div>"
							+"<p class='project-remark'>"+res.data[i]["XMSM"]+"</p>"
							+"<span>所属行业：</span> <span style='font-weight: bold;'>"+res.data[i]["SSHY"]+"</span> <span> &nbsp; &nbsp;项目类型：</span> <span style='font-weight: bold;'>"+res.data[i]["XMLX"]+"</span>"
							+"  &nbsp; &nbsp;<span>委托方：</span> <span style='font-weight: bold;'>"+res.data[i]["WTF"]+"</span> <span>  &nbsp; &nbsp; 创建日期：</span> <span style='font-weight: bold;'>"+res.data[i]["CREATETIME"]+"</span>"
							+" </td>"
							+"<td pn='"+res.data[i]["XMMC"]+"'  pid='"+res.data[i]["ID"]+"'  class='td-oper' style='width: 300px; text-align:right; padding-right: 10px;'>"
							+"<span id='gnbj' class='btn item-btn'  url='route/mof-views/list?pageId=a0d8aac7b4864d81b01dfca2b3092380'>功能部件</span>"
							+"<span class='btn item-btn'   url='route/mof-views/detail?s=edit&pageId=0f5cdcddc2e0479089c30739d4e9f7d0'>非功能因素</span>"
							+"<span class='btn item-btn' url='route/mof-views/list?pageId=02bb9efd0ef44ec5915ac6d82b69ec99'>字典数据(FPA)</span>"
							+"<span class='btn item-btn' url='route/mof-views/detail?s=edit&pageId=6c422187edfc437fa88bffda64ecb5fd'>调整因子</span>"
							+"<span class='btn btn-info item-btn'  url='route/rjdl/measure?1=1' style='width: 243px;'> <span class='glyphicon glyphicon-search'></span>  度量结果</span>"
							+"</td>"
							+"</tr>	</table></div>";
						}
						if(items!=""){
							$(".project-lists").html(items);
						}else{
							$(".project-lists").html("<div class='nodata'>您还没有添加要预算的项目！</div>");
						}
				}
			});
	};
	</script>
</body>
</html>

