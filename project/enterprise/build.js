const fs = require('fs')
const path = require('path')
const router = require('./index.js')

// 将子路由模块配置文件转化为 uniapp 配置文件格式
const buildRouter = route => {
	const res = []
	const {
		baseUrl,
		children
	} = route
	children.forEach(i => {
		const obj = {
			path: baseUrl + i.path,
			style: {
				navigationBarTitleText: i.name
			}
		}
		Object.keys(i).forEach(ii => {
			!['path', 'name'].includes(ii) && (obj.style[ii] = i[ii])
		})
		res.push(obj)
	})
	return res
}

// 自动加载 './modules' 目录子路由配置文件
const getRouter = () => {
	const srcPath = path.resolve(__dirname, './modules')
	const result = fs.readdirSync(srcPath)
	let router = []
	result.forEach(r => {
		const route = require('./modules/' + r)
		router = [...router, ...buildRouter(route)]
	})
	return router
}

// 构建 pages 并写入 pages.json 文件
// router.pages = getRouter()

// fs.writeFile(
// 	__dirname + '/../../pages.json',
// 	// 我这边是用两个空格来缩进 pages.json，如果喜欢制表符，第三个参数更换你为 \t 即可
// 	JSON.stringify(router, null, '\t'),
// 	e => e ? console.error(e) : console.log('pages.json 配置文件更新成功')
// )

// // 自动加载 './common' 目录配置文件
// const getCommon = () => {
// 	const result = require('./common/config.js')
// 	// const route = require('./common/config.js')
// 	console.log(result)
// 	return result
// }

// const config = getCommon()

// fs.writeFile(
// 	__dirname + '/../../config.json',
// 	// 我这边是用两个空格来缩进 pages.json，如果喜欢制表符，第三个参数更换你为 \t 即可
// 	JSON.stringify(config, null, '\t'),
// 	e => e ? console.error(e) : console.log('config.json 配置文件更新成功')
// )




// fs.writeFile(
// 	__dirname + '/../../uni.scss',
// 	// 我这边是用两个空格来缩进 pages.json，如果喜欢制表符，第三个参数更换你为 \t 即可
// 	result,
// 	e => e ? console.error(e) : console.log('uni.scss 配置文件更新成功')
// )

//  删除文件
// fs.unlink('./common/uni.scss',(err)=>{
//     if(err){
//         console.log(err);
//         return false;
//     }else{
//         console.log('删除文件成功');
//     }
// })

fs.copyFile(__dirname + '/common/uni.scss', __dirname + '/../../uni.scss',(err)=>{
    if(err){
        console.log(err);
        return false;
    }else{
        console.log('复制成功');
    }
})