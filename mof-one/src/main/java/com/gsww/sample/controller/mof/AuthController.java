package com.gsww.sample.controller.mof;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mof.common.entity.Constant;
import com.mof.common.entity.ResultEntity;
import com.mof.common.entity.UserEntity;
import com.mof.common.log.LogOutput;
import com.mof.parse.annotation.EnableCountTime;
import com.mof.parse.tools.RequestHelper;

/**
 * 系统访 问认证
 * @author wang
 */
@Controller
@RequestMapping(value = "/auth")
public class AuthController extends BaseController {
	protected static final String CLASSNAME =BaseController.class.getName();
	/**
	 * 本项目内部认证
	 */
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	@EnableCountTime
	public ResultEntity login(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			result=dispatchService.login(mofEntity,RequestHelper.getRequestEntity(request));
			if(result.getCode().equals(Constant.MOF_SERVICE_SUCCESS)){
				//保存当前登录用户会话状态
				setCurrentSession((UserEntity)result.getData(),request);
			}
		} catch (Exception e) {
			LogOutput.error(CLASSNAME,"login方法登录程序异常！"+e.getMessage());
		}
		return result;
	}
	/**
	 * 单点登录认证
	 * @return ResultEntity
	 */
	@RequestMapping(value = "/sso", method = RequestMethod.GET)
	@ResponseBody
	public ResultEntity sso(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			//1、通过用户名和密码从认证中心获取授权令牌；
			//2、通过有效令牌创建局部会话；
		} catch (Exception e) {
			LogOutput.error(CLASSNAME,"sso登录程序异常！"+e.getMessage());
		}
		return result;
	}
	/**
	 * 统一认证中心  
	 * @return ResultEntity
	 */
	@RequestMapping(value = "/ca", method = RequestMethod.GET)
	@ResponseBody
	public ResultEntity ca(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 系统注销
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	@ResponseBody
	public ResultEntity logout(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			//通知所有注册系统注销
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	//保存当前登录用户会话状态
	private void setCurrentSession(UserEntity userCurrent,HttpServletRequest request){
		//保存到本地Session
		request.getSession().setAttribute("FARM-USER-INFO", userCurrent);
		//保存到中央共享Session
	}
	
}
