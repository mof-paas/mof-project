## 框架使用帮助

#### 第一步：把框架导入到IDE开发环境

#### 第二步：安装依赖Jar文件

* 在魔方软件服务平台 (  http://www.mofsoft.cn  )  下载3个jar文件：mof-data-1.0.1.jar 、mof-common-1.0.1.jar、mof-sdk-1.0.8.jar （中央仓库中暂时没有）

* 把Jar包通过maven 命令安装在本地仓库。 如：
 
 ``` java
   mvn install:install-file -DgroupId=mof-paas -DartifactId=mof-sdk -Dversion=v1.0.8 -Dpackaging=jar -Dfile=D:\mof-sdk-1.0.8.jar
 ```

* 在pom.xml文件中添加依赖
 
 ``` java
<dependency>
		<groupId>mof-paas</groupId>
		<artifactId>mof-sdk</artifactId>
		<version>1.0.8</version>
</dependency>
 ```
#### 第二步：配置数据源文件

 * 修改  jdbc_sample.properties 文件名为  jdbc.properties ，并修改文件中的数据库配置参数。

#### 第三步：修改Web.xml文件

 * 修改 web_sample.xml 文件名为 web.xml，并修改如下的配置参数：
 
 ``` java
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
 ```
 
##### 参数说明：
 * " {魔方平台用户标识}"：注册魔方软件服务平台 (  http://www.mofsoft.cn  ) 可获得用户标识。
 
 * " {应用标识}"：在系统定制功能中获取您所定义的应用ID。
 
 * " {应用类型}"："1:业务管理类系统，2：数据分析类系统"。 
  
## 系统运行效果预览截图
  
![](http://www.mofsoft.cn/static/images/demo/1.png)

![](http://www.mofsoft.cn/static/images/demo/2.png)

![](http://www.mofsoft.cn/static/images/demo/3.png)

![](http://www.mofsoft.cn/static/images/demo/4.png)

![](http://www.mofsoft.cn/static/images/demo/5.png)
		
