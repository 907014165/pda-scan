import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		token:uni.getStorageSync('token'),
		printId:uni.getStorageSync('printId'),
	},
	mutations: {
		login(state, {userName,token}={}) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			state.token = token;
			uni.setStorageSync('token',token)
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.token = '';
			uni.removeStorageSync('token');
		},
		printIdChange(state,printId){
			// console.log('printId change')
			state.printId = printId;
			uni.setStorageSync('printId',printId);
		}
	}
})

export default store
