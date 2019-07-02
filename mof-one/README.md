一、框架初始化方法
第一步：导入到IDE开发环境
第二步：配置数据源文件
					修改 jdbc_sample.properties文件名为 jdbc.properties，并修改文件中的数据库配置参数。
第三步：修改Web.xml文件
			<context-param>
						    <param-name>MOF-USER-ID</param-name>
						    <param-value>{魔方平台用户标识}</param-value>
						  </context-param>
						  <context-param>
						    <param-name>MOF-APP-ID</param-name>
						    <param-value>{应用标识}</param-value>
						  </context-param>
						  <context-param>
						    <param-name>MOF-APP-TYPE</param-name>
						    <param-value>{应用类型}</param-value>
			</context-param>
参数说明：
 " {魔方平台用户标识}"：注册魔方软件服务平台(http://www.mofsoft.cn/)可获得用户标识。
 " {应用标识}"：在系统定制功能中获取您所定义的应用ID。
 " {应用类型}"："1:业务管理类系统，2：数据分析类系统"。
		
