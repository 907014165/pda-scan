import Vue from 'vue'
import App from './App'

import store from './store'
import {newProcess} from './common/kit.js'
import requestApi from './api/index.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$newProcess = newProcess
Vue.prototype.$requestApi = requestApi

App.mpType = 'app'


const app = new Vue({
	store,
	...App
})
app.$mount()
