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
import com.mof.data.pool.DbConnect;
import com.mof.parse.tools.RequestHelper;

/**
 * 常规业务控制器
 * @author wang
 */
@Controller
@RequestMapping(value = "/biz")
public class BusinessController extends BaseController {
	protected static final Logger logger = LoggerFactory.getLogger(BusinessController.class);
	// 读取
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity read(HttpServletRequest request, HttpServletResponse response) {
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
			result=dispatchService.read(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取对象元数据和业务数据
	 */
	@RequestMapping(value = "/objdata", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity readMetaAndData(HttpServletRequest request, HttpServletResponse response) {
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
			Map<String,Object> metaMap=new HashMap<String,Object>();
			metaMap.put("data", dispatchService.read(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity).getData());
			metaMap.put("meta", dispatchService.readModel(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity).getData());
			result.setData(metaMap);
			result.setCode(Constant.MOF_SERVICE_SUCCESS);
			} catch (Exception e) {
				result.setCode(Constant.MOF_SERVICE_ERROR);
				result.setMessage("程序异常[readMetaAndData]");
				e.printStackTrace();
		}
		return result;
	}
	// 创建
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity create(HttpServletRequest request, HttpServletResponse response) {
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
			result=dispatchService.create(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 更新
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity update(HttpServletRequest request, HttpServletResponse response) {
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
			result=dispatchService.update(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	// 删除
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity delete(HttpServletRequest request, HttpServletResponse response) {
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
			result=dispatchService.delete(getSessionUser(), mofEntity, (String)requestEntity.getMapParas().get(Constant.MOF_MOID), requestEntity);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 退出登录
	 */
	@RequestMapping(value = "/out", method = RequestMethod.POST)
	@ResponseBody
	public ResultEntity outLogin(){
		ResultEntity result = new ResultEntity();
		try {
			removeSession();
			result.setCode(Constant.MOF_SERVICE_SUCCESS);
			result.setMessage("退出成功!");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
