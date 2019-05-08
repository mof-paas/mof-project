package com.gsww.sample.controller.mof;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mof.common.entity.UserEntity;
import com.mof.common.log.LogOutput;

/**
 * 页面跳转路由
 * @author wang
 *
 */
@Controller
@RequestMapping(value = "/")
public class RouteController  extends BaseController{
	protected static final String CLASSNAME =RouteController.class.getName();
	/**
	 * @param path：文件夹
	 * @param page：页面
	 * @return
	 */
	@RequestMapping(value = "{path}/{page}")
	public String swapMonitor(@PathVariable String path,@PathVariable String page,HttpServletRequest request,
			HttpServletResponse response,Model model) {
			try {
				//获取当前登录会话验证身份
				UserEntity currentUser= getSessionUser(); 
				if(currentUser!=null)
				{
					model.addAttribute("ID", currentUser.getPkID()); //主键
					model.addAttribute("USERNAME", currentUser.getUserName()); //用户名
					model.addAttribute("USERACCOUNT", currentUser.getUserAccount());//账号
					model.addAttribute("HOMECODE", currentUser.getHomeId());//租户唯标识码
					model.addAttribute("USERORGID", currentUser.getUserOrgId()); //所属机构
					model.addAttribute("USERPHONE", currentUser.getUserPone());//电话
					model.addAttribute("USERTYPE", currentUser.getUserType());//用户类型（1注册用户，0成员用户）
					model.addAttribute("USERSTATUS", currentUser.getUserStatus());//用户状态（0待开通，1已开通，2禁用）
					LogOutput.info(CLASSNAME, "  " +currentUser.getUserName()+"  请求路由："+path+"/"+page );
					return path+"/"+page;  
				}
				else{
					//未登录则重定向到提示页面
					LogOutput.error(CLASSNAME,"会话状态为空！");
					return "/mof-views/info";  
				}
				} catch (Exception e) {
					LogOutput.error(CLASSNAME,"请求路由程序异常！");
				}
				return null;  
	}
}
