<h1 style="align:center" align="center"><center>寻路-数据地图</center></h1>

<div>一站式大数据元数据信息监控、展示、管理平台。</div>

## 🦠 背景

大数据平台上存在众多来自不同业务线的数据，这些数据没有进行分类，现在的元数据监控只是简单的罗列在一个页面进行展示，只能通过备注信息去查看一张表属于哪个部门，表之间的依赖关系也只能在生成数据的任务详情里面查看，不能直观的展示一个表上下游之间依赖关系，同时，也缺乏对表内数据质量的监控，因而我们需要一个元数据管理平台，对数据平台的元数据信息监控、展示、管理。

## 🔨 面向人群

数仓开发、数据开发及需要查看数据表信息的用户

## ✨ 功能

- 根据业务线对表进行归类
- 表内数据示例, 展示出几行表内数据实例
- 表结构展示, 包括：字段信息，分区信息，数据字典
- 查询模版, 给出表的查询示例
- 表内数据质量监控, 包括：行数监控、空值率监控
- 权限控制, 核心表, 数据质量等信息只有特定分组才能查看
- 敏感字段权限控制, 敏感字段用*号展示数据
- 表之间血缘关系展示, 直观的展示出表产出的前后依赖关系
- Kylin的元数据信息查看
- 表热度显示

##  🌍 主要技术栈

- 后端
1. 语言: Python3
2. Web框架: tornado
3. 数据库: MySQL
4. 数据库框架: sqlalchemy
- 前端
1. 语言: typescript
2. 框架: React+Redux
3. UI库: Antd
4. 关系图库: G6
5. 图表图: bizcharts

## 🏆 目录结构
```
metadata-platform
│   
└───api 后端的代码
│   │   app.py 后端项目主入口文件
│   │   requirements.txt 项目第三方依赖列表
│   └───app
│       │   __init__.py Python包入口文件(后面该文件省略)
│       └───base 项目基础类
│       └───config 配置文件
│       └───controller 控制器目录
│       └───dao 数据库操作类
│       └───domain 数据库映射类
│       └───filter 过滤器，用于接口权限验证
│       └───middleware 中间件，用于在请求中插入操作
│       └───plugin 插件，用于处理一些单独的操作
│       └───server 业务逻辑
│       └───viewmodel 用于转化数据给前端
│   
└───ui  前端代码
    │   package.json node包文件
    │   tsconfig.json typescript 配置
    │   tsconfig.prod.json 生产环境 typescript 配置
    │   tslint.json 代码规范配置
    └───public 静态图标、html
    └───src 项目代码
    │      │   index.tsx 入口文件
    │      └───_error 错误页面 401、404
    │      └───assets 静态资源, 图片等
    │      └───common 公共类
    │      └───module 功能模块
    │      └───store redux 相关类
    └───type 自定义的typescript类型声明
```

## 📦  开发流程
- 主要开发分支： 目前没有开发分支
- 开发环境搭建
1. 依赖安装: MySQl、Python3、Nginx
2. 安装Python依赖： 进入api文件夹，执行下列命令
	```
	pip3 install -r requirements.txt
	```
3. 修改后端配置
	```
	config.database.url = "mysql://MySQL账号:密码@地址IP:端口/数据库名"
	```
4. 启动后端项目
	```
	python3 app.py
	```
5. 安装前端依赖: 进入ui文件夹， 执行下列命令
	```
	npm intall
	```
6. 安装Chrome插件: Redux DevTools、React Developer Tools， 或修改代码ui/src/store/store.ts 代码
	```
	const composedEnhancers = process.env.NODE_ENV === "production" ? compose(applyMiddleware(ReduxThunk)) : compose(applyMiddleware(ReduxThunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
	// 修改为
	const composedEnhancers = compose(applyMiddleware(ReduxThunk)) 
	```
7. 启动前端代码
	```
	npm start
	```
8. 配置nginx(项目依赖cas登录，如果不配置无法成功登录)
	```
	server {
        listen       2100;
        server_name  localhost;

        location /api/ {
            proxy_pass   http://127.0.0.1:25041/;
        }
        
        location / {
            proxy_pass   http://localhost:3000/;
        }
	}
	```
9. 访问地址: http://localhost:2100

## ⌨️ 上线流程
目前没有使用Jenkins部署
