package com.gsww.sample.controller.mof;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mof.common.entity.MofEntity;
import com.mof.common.entity.RequestEntity;
import com.mof.common.entity.UserEntity;
import com.mof.parse.core.DispatcherService;
import com.mof.parse.core.IDispatchService;

/**
 * 控制器基础父类
 * @author wang
 */
public class BaseController {
	
	protected static MofEntity mofEntity = null;// 魔方软件平台给本系统生成的访问参数
	protected IDispatchService dispatchService;// 魔方平台服务调度器

	public BaseController() {
		// 实例化魔方SDK服务调度器
		dispatchService = new DispatcherService();
		initialMofPaas();
	}

	// 获取当前会话用户
	protected UserEntity getSessionUser() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		UserEntity currentUser = (UserEntity) request.getSession().getAttribute("FARM-USER-INFO");
		return currentUser;
	}
	// 移出当前会话用户
	protected  void removeSession() {
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
			HttpSession	session =  request.getSession();
			 if(session!=null){
		            session.removeAttribute("FARM-USER-INFO");
		       }
	}
	// 初始化魔方对象
	protected void initialMofPaas() {
		if(mofEntity!=null){
			return;
		}
		mofEntity = new MofEntity();
		// Web.xml中配置了Spring的监听器才能获得Servlet上下文
		mofEntity.setMofUserId(ContextLoader.getCurrentWebApplicationContext().getServletContext().getInitParameter("MOF-USER-ID"));// 魔方注册用户
		mofEntity.setMofAppId(ContextLoader.getCurrentWebApplicationContext().getServletContext().getInitParameter("MOF-APP-ID"));// 魔方应用标识
		mofEntity.setMofAppType(ContextLoader.getCurrentWebApplicationContext().getServletContext().getInitParameter("MOF-APP-TYPE"));// 魔方应用类型
	}
	//验证请求必须参数
	protected String validateParas(List<String> keys,RequestEntity requestEntity){
		StringBuffer str=new StringBuffer("");
		for (String key : keys) {
			if(requestEntity.getMapParas().get(key)==null || requestEntity.getMapParas().get(key).equals("")){
				str.append(key+"|");
			}
		}
		return str.toString();
	}
}
