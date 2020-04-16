### 切换项目环境文件
#### 写入pages.json、config.js，覆盖uni.scss
```
+hello				// 项目名称（关键字）
	+common
		config.js		// 配置文件（存放环境变量等）
		uni.scss		
	+modules
		index.js		// 路由模块文件
	build.js
	index.js
```
+ 根目录下指令：  node change-env/项目名称/build.js