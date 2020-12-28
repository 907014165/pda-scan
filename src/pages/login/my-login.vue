<template>
	<view class="content">
		<view class="logo">
			<image class="avatar" :src="userAvatar" alt="">
		</view>
		<image class="background-image" :src="backgroundImage" alt="">
		<!-- <view class="login-type-bar">
			<view :class="{item:true,active:loginType==='1'}" @click="loginType = '1'">账号登录</view>
			<view :class="{item:true,active:loginType==='2'}" @click="loginType = '2'">验证码登录</view>
		</view> -->
		<view class="tui-form">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="people" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							:value="account"
							placeholder="请输入账号"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="11"
							@input="inputAccount"
						/>
						<view class="tui-icon-close" v-show="account" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							:value="password"
							placeholder="请输入密码"
							placeholder-class="tui-phcolor"
							type="password"
							maxlength="36"
							@input="inputPwd"
						/>
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			<!-- <view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							:value="mobile"
							placeholder="请输入手机号"
							placeholder-class="tui-phcolor"
							type="number"
							maxlength="11"
							@input="inputMobile"
						/>
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="message" color="#6d7a87" :size="20"></tui-icon>
						<input
							:adjust-position="false"
							:value="password"
							placeholder="请输入验证码"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
							@input="inputPwd"
						/>
						<view style="color:#43a9ff;font-size:24rpx;">获取验证码</view>
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" :size="16" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view> -->
			<view class="tui-btn-box"><tui-button :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle" @click="handleLogin">登录</tui-button></view>
		</view>
	</view>
</template>

<script>
import tuiButton from 'thorui-uni/lib/thorui/tui-button/tui-button'
import tuiListCell from 'thorui-uni/lib/thorui/tui-list-cell/tui-list-cell'
import tuiIcon from 'thorui-uni/lib/thorui/tui-icon/tui-icon'

import backgroundImage from './background.png'
import userAvatar from '../../static/img/manager.png'

import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				loginType:'2',
				account:'',
				password:'',
				backgroundImage:backgroundImage,
				userAvatar:userAvatar,
			}
		},
		computed:{
			disabled(){
				return !this.account || !this.password;
			}
		},
		components:{
			tuiButton,
			tuiListCell,
			tuiIcon,
		},
		methods:{
			...mapMutations(['login']),
			inputAccount(e){
				this.account = e.target.value;
			},
			inputPwd(e){
				this.password = e.target.value;
			},
			clearInput(type){
				const handle = {
					1:()=>{
						this.account = ''
					},
					2:()=>{
						this.password = ''
					}
				}
				handle[type]();
			},
			handleLogin(){
				const handle = async () => {
					const {userName,token} = await this.$requestApi.login.post({
						userName:this.account,
						password:this.password,
					})
					this.login({
						userName,
						token:token
					})
					uni.reLaunch({
						url:'../main/main'
					})
				}
				//handle()
				this.$newProcess(handle)();
			}
		}	
	}
</script>
<style lang="less">
	.content {
		background-color: #ffffff;
		padding: 0;
		position: relative;
		.background-image {
			width: 750rpx;
			height: 430rpx;
		}
		.login-type-bar {
			margin-top: 100rpx;
			display: flex;
			padding: 0 50rpx;
			
			.item {
				flex: 1;
				font-size: 30rpx;
				color: #999999;
				text-align: center;
				padding-bottom: 40rpx;
				border-bottom: 1px solid #eaeef1;
				&.active {
					color: #43a9ff;
					border-bottom: 1px solid #43a9ff;
				}
			}
		}

		.logo {
			width: 164rpx;
			height: 164rpx;
			position: absolute;
			z-index: 10;
			left: 50%;
			transform: translate(-50%,335rpx);
			background-color: #ffffff;
			box-shadow: 2rpx 1rpx 21rpx 0px 
				rgba(94, 132, 255, 0.41);
			border-radius: 20rpx;
			.avatar{
				width: 164rpx;
				height: 164rpx;
			}
		}
		
			.tui-form {
				padding-top: 50rpx;

				.tui-view-input {
					width: 100%;
					box-sizing: border-box;
					padding: 0 40rpx;

					.tui-cell-input {
						width: 100%;
						display: flex;
						align-items: center;
						padding-top: 48rpx;
						padding-bottom: 10rpx;

						input {
							flex: 1;
							padding-left: 20rpx;
						}

						.tui-icon-close {
							margin-left: auto;
						}
					}
				}

				/* .tui-cell-text {
					width: 100%;
					padding: $uni-spacing-col-lg $uni-spacing-row-lg;
					box-sizing: border-box;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-grey;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.tui-color-primary {
						color: $uni-color-primary;
					}
				} */

				.tui-btn-box {
					width: 100%;
					padding: 0 30rpx;
					box-sizing: border-box;
					margin-top: 80rpx;
				}
			}
	}
</style>