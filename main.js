import Vue from 'vue'
import App from './App'
import config from './config.json'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin({
    data() {
		return {
			ENV: config.env
		}
	}
})

const app = new Vue({
    ...App
})
app.$mount()
