<template>
	<view class="wrapper">
		<view class="avatar">
			<image :src="userAvatar"></image>
		</view>
		<view class="content">
			<view class="item" @tap="handleClick(1)">
				<image class="img" src="../../static/img/scanStorage.png" alt="">
				<view class="text">扫码入库</view>
			</view>
			<view class="item" @tap="handleClick(2)">
				<image class="img" src="../../static/img/scanContainer.png" alt="">
				<view class="text">扫码装箱</view>
			</view>
			<view class="item" @tap="handleClick(3)">
				<image class="img" src="../../static/img/scanInfo.png" alt="">
				<view class="text">扫码装柜</view>
			</view>
			<view class="item" @tap="handleClick(5)">
				<image class="img" src="../../static/img/chuku.png" alt="">
				<view class="text">扫码出库</view>
			</view>
			<view class="item" @tap="handleClick(4)">
				<image class="img" src="../../static/img/logout.png" alt="">
				<view class="text">退出系统</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
import userAvatar from '../../static/img/manager.png'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','token']),
		data() {
			return {
				userAvatar: userAvatar,
			}
		},
		onLoad() {
			if(!this.token){
				uni.reLaunch({
					url:'../login/my-login'
				})
			}
		},
		methods: {
			...mapMutations(['logout']),
			handleClick(type){
				const handleMap = {
					1:()=>{
						uni.navigateTo({
							url:'../scan-storage/scan-storage'
						})
					},
					2:()=>{
						uni.navigateTo({
							url:'../scan-container/scan-container'
						})
					},
					3:()=>{
						uni.navigateTo({
							url:'../scan-info/scan-info'
						})
					},
					4:()=>{
						this.logout();
						// console.log(this.logout)
						uni.reLaunch({
							url:'../login/my-login'
						});
					},
					5:()=>{
						uni.navigateTo({
							url:'../chuku/chuku'
						});
					},
				}
				handleMap[type]();
			}
		}
	}
</script>

<style lang="less">
	.wrapper {
		width: 100%;
		position: relative;
		background-image: url('./background.png');
		background-size: 100%;
		background-repeat: no-repeat;

		.avatar {
			position: absolute;
			width: 200rpx;
			height: 200rpx;
			left: 50%;
			border-radius: 50%;
			background-color: #ffffff;
			box-shadow: 2rpx 1rpx 21rpx 0px 
				rgba(94, 132, 255, 0.41);
			transform: translate(-50%,80rpx);
			image{
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}
		}

		.content {
			position: absolute;
			left:50%;
			transform: translate(-50%,350rpx);
			height: 400rpx;
			width: 660rpx;
			border-radius: 10rpx;
			background-color: #ffffff;
			box-shadow: 0px 0px 25rpx 0px 
		rgba(26, 25, 26, 0.1);
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			flex-wrap: wrap;
			
			  
			.item {
				width: 220rpx;
				height: 220rpx;
				text-align: center;
				
				.img {
					height:150rpx;
					width: 150rpx;
				}
				.text {
					text-align: center;
					line-height: 50rpx;
					color: #222222;
				}
			}
		}
	}
</style>
