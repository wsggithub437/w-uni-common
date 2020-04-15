<template>
	<view class="content">
		<!-- #ifdef APP-PLUS || H5 -->
		<view style="height: 900px; width: 100%;" v-if="isShow">
			<view @click="ecahrtsModule.onClick" :prop="echartsData1" :change:prop="ecahrtsModule.updateEcharts" id="echarts1" class="echarts"></view>
			<view @click="ecahrtsModule.onClick" :prop="echartsData2" :change:prop="ecahrtsModule.updateEcharts" id="echarts2" class="echarts"></view>
			<button @click="changeData('1', [5, 20, 36, 10, 10, 20])">更新图表1-数据1</button>
			<button @click="changeData('1', [58, 20, 66, 10, 60, 80])">更新数据1-数据2</button>
			<button @click="changeData('2', [58, 20, 66, 10, 60, 80])">更新数据2-数据1</button>
			<button @click="changeData('2', [5, 20, 36, 10, 10, 20])">更新数据2-数据2</button>
		</view>
		<button @click="showEcharts">点击->图表dom加载</button>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false, // 图表是否渲染
				echartsData1: {
					type: '1',
					data: []
				},
				echartsData2: {
					type: '2',
					data: []
				}
			}
		},
		onLoad() {
		},
		methods: {
			// 点击->图表dom加载
			showEcharts() {
				this.isShow = true;
			},
			// 更新图标数据
			changeData(type, data) {
				this['echartsData' + type].data = data;
			},
			onViewClick(options) {
				console.log(options)
			},
			
		}
	}
</script>

<script module="ecahrtsModule" lang="renderjs">
	var myCharts = {}; // 图表集合
	export default {
		methods: {
			init(type, newValue) {
				if (typeof window.echarts === 'function') {
					this['initEcharts' + type](newValue)
				} else {
					// 动态引入较大类库避免影响页面展示
					const script = document.createElement('script')
					// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
					script.src = 'static/echarts.js'
					script.onload = () => {
						this['initEcharts' + type](newValue)
					}
					document.head.appendChild(script)
				}
			},
			// 初始化图表1
			initEcharts1(newValue) {
				if (!myCharts.myChart1) {
					myCharts.myChart1 = echarts.init(document.getElementById('echarts1'))
				}
				myCharts.myChart1.setOption({
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {},
					legend: {
						data: ['销量']
					},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: newValue
					}]
				})
			},
			// 初始化图表2
			initEcharts2(newValue) {
				if (!myCharts.myChart2) {
					myCharts.myChart2 = echarts.init(document.getElementById('echarts2'))
				}
				myCharts.myChart2.setOption({
					title: {
						text: 'ECharts2222222222'
					},
					tooltip: {},
					legend: {
						data: ['销量']
					},
					xAxis: {
						data: ["dfdf", "dsfdsdf", "sdfsfdf", "sdfsddfs", "ad", "dghhh"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: newValue
					}]
				})
			},
			// 监听 service 层数据变更
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 如果有新数据且图表没有渲染过
				if (newValue.data.length > 0 && oldValue.data.length == 0) {
					this.init(newValue.type, newValue.data);
				// 如果有新数据且图表渲染过
				} else if (newValue.data.length > 0 && oldValue.data.length > 0) {
					this['initEcharts' + newValue.type](newValue.data);
				}
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		width: 100%;
		height: 300px;
		background: pink;
	}
</style>
