package com.gsww.sample.controller.mof;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mof.common.entity.Constant;
import com.mof.common.entity.RequestEntity;
import com.mof.common.entity.ResultEntity;
import com.mof.common.entity.UserEntity;
import com.mof.parse.tools.RequestHelper;

/**
 * 应用模型控制器
 * @author wang
 */
@Controller
@RequestMapping(value = "/com")
public class ModelController extends BaseController {
	protected static final Logger logger = LoggerFactory.getLogger(ModelController.class);
	/**
	 * 获取应用模型数据
	 */
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readApp(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			//非空参数验证
			List<String> vpara=new ArrayList<String>(1);
			vpara.add(Constant.MOF_MOID);
			String emptyKeys=validateParas(vpara,requestEntity);
			if(!emptyKeys.isEmpty()){
				result.setCode(Constant.MOF_SERVICE_ERROR);
				result.setMessage("以下参数不能为空值："+emptyKeys);
				return result;
			}
			result=dispatchService.readData(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readApp]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取模型对象定义
	 */
	@RequestMapping(value = "/obj", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readModel(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			//非空参数验证
			List<String> vpara=new ArrayList<String>(1);
			vpara.add(Constant.MOF_MOID);
			String emptyKeys=validateParas(vpara,requestEntity);
			if(!emptyKeys.isEmpty()){
				result.setCode(Constant.MOF_SERVICE_ERROR);
				result.setMessage("以下参数不能为空值："+emptyKeys);
				return result;
			}
			result=dispatchService.readModel(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readModel]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取系统信息
	 */
	@RequestMapping(value = "/app", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readSystemInfo(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity	requestEntity =new RequestEntity();
			Map<String,Object> paras=new HashMap<String,Object>(1);
			paras.put("SYSCODE", mofEntity.getMofAppId());
			requestEntity.setMapParas(paras);
			Map<String,Object> data=new HashMap<String,Object>(2);
			ResultEntity sysData=dispatchService.readSystem(getSessionUser(), mofEntity, null,requestEntity);
			data.put("app",sysData.getData());
			UserEntity user=getSessionUser();
			if(user!=null){
				data.put("user", user.getUserName());	
			}else{
				data.put("user", "");	
			}
			result.setData(data);
			result.setCode(sysData.getCode());
			result.setMessage(sysData.getMessage());
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readSystemInfo]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取系统功能信息
	 */
	@RequestMapping(value = "/module", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readSystemModule(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			requestEntity.getMapParas().put("SYSTEMID", mofEntity.getMofAppId());
			result=dispatchService.readSystemModule(getSessionUser(), mofEntity, null,requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readSystemModule]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取系统模块页面
	 */
	@RequestMapping(value = "/view", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readSysModulePage(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			result=dispatchService.readSysModulePage(getSessionUser(), mofEntity,requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readSysModulePage]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取系统页面元素
	 */
	@RequestMapping(value = "/element", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readSysPageElement(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			result=dispatchService.readSysPageElement(getSessionUser(), mofEntity,requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readSysPageElement]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取页面模块
	 */
	@RequestMapping(value = "/page-module", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readPageModule(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			result=dispatchService.readPageModule(getSessionUser(), mofEntity,requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readPageModule]");
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取页面模块内容
	 */
	@RequestMapping(value = "/module-content", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readPageModuleContent(HttpServletRequest request, HttpServletResponse response) {
		ResultEntity result = new ResultEntity();
		try {
			RequestEntity requestEntity=RequestHelper.getRequestEntity(request);
			result=dispatchService.readPageModuleContent(getSessionUser(), mofEntity,requestEntity);
		} catch (Exception e) {
			result.setCode(Constant.MOF_SERVICE_ERROR);
			result.setMessage("程序异常[readPageModuleContent]");
			e.printStackTrace();
		}
		return result;
	}
}
