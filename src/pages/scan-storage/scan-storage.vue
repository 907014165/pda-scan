<template>
    <view class="wrapper">
		<view class="info">
			<view class="">操作提示：</view>
			<view class="">请扫描包裹上的条形码/二维码对商品进行入库。</view>
		</view>
		<tuiCard :key="courier.courierNo" v-for="courier in courierList" :title="{text:courier.user}" :image="{url:userImg}" :tag="{text:'已入库'}" style="margin-top: 5rpx;">
			<view slot="body" style="display:flex;justify-content:flex-start;color:rgb(178, 178, 178);padding:20rpx;">
				<view>快递单号:</view>
				<text>{{ courier.courierNo }}</text>
			</view>
		</tuiCard>
		<view>
			<tui-list-cell :hover="false">
			<view class="thorui-input-item">
				<view style="font-size:30rpx;font-weight:900;margin-bottom:5px;">手工输入</view>
				<input v-model="expressNumber" class="thorui-input" placeholder="请输入快递单号" placeholder-class="thorui-phcolor" />
			</view>
			</tui-list-cell>
			<tuiButton style="margin-top:8px;" @click="handlerSubmit" :disabled="!expressNumber">确定</tuiButton>
		</view>
		
		<tuiTips ref="tips" />
		<tuiModal title="请选择对应的客户号" @click="repeatConfirm" :show="this.tuiModalShow" :button="repeatList" />
    </view>
</template>

<script>
import tuiCard from 'thorui-uni/lib/thorui/tui-card/tui-card'
import tuiModal from 'thorui-uni/lib/thorui/tui-modal/tui-modal'
import tuiTips from 'thorui-uni/lib/thorui/tui-tips/tui-tips'
import tuiListCell from 'thorui-uni/lib/thorui/tui-list-cell/tui-list-cell'
import tuiButton from 'thorui-uni/lib/thorui/tui-button/tui-button';
import userImg from './user.png' 
const ruku = require('../../static/ruku.mp3')
export default {
    data() {
        return {
			courierList:[],
			userImg,
			currentCourierNo:'',
			tuiModalShow:false,
			repeatList:[],
			innerAudioContext:null,
			expressNumber:'',
        }
	},
	components:{
		tuiCard,
		tuiModal,
		tuiTips,
		tuiListCell,
		tuiButton,
	},
	methods:{
		repeatConfirm({index = 0 }={}){
			console.log(this.repeatList[index].parcelId)
			this.$newProcess(this.confirmParcelBelong)({
				parcelId:this.repeatList[index].parcelId,
			}).then((res)=>{
				this.courierList.push({
					courierNo:this.repeatList[index].courierNo,
					status:1,
					user:res.customNo,
				});
				this.tuiModalShow = false;
				this.innerAudioContext.play();
				this.$refs.tips.showTips({
					type:'green',
					msg:'入库成功',
					duration:1500,
				});
			})
		},
		handleScan({code=''}={}){
			if(this.tuiModalShow){
				return;
			}
			this.currentCourierNo = code;
			this.$newProcess(this.updateParcelStatus)({
				code,
			});
		},
		async confirmParcelBelong({parcelId = ''}={}){
			const data = await this.$requestApi.parcel.confirmParcelBelong.post({
				parcelId,
			});
			return data;
		},
		async updateParcelStatus({code = ''}={}){
			const data = await this.$requestApi.parcel.updateParcelStatus.post({
				courierNo:code
			})
			if(data.length>1){
				this.tuiModalShow = true;
				this.repeatList = data.map(({parcelId = '',customNo = '',courierName=''})=>({
					text:`客户号:${customNo}-快递名称:${courierName}`,
					type:'primary',
					plain:true,
					parcelId,
					courierNo:code,
				}))
			}else{
				const [{customNo = ''}] = data;
				this.courierList.push({
					courierNo:code,
					status:1,
					user:customNo,
				});
				this.innerAudioContext.play();
				this.$refs.tips.showTips({
					type:'green',
					msg:'入库成功',
					duration:1000,
				})
			}
			
		},
		handlerSubmit(){
			this.$newProcess(this.updateParcelStatus)({
				code:this.expressNumber,
			});
		}
	},
	onLoad(){
		uni.$on('scan',this.handleScan)
		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = ruku;
	},
	onUnload(){
		uni.$off('scan',this.handleScan)
	}
}
</script>
<style lang="less">
	.wrapper {
		width: 100%;
		padding: 10rpx;
	}
	.warning{
        border: 1px solid #ffd77a;
        background-color: #fff9e6;
        padding: 8rpx;
        display: block;
        margin: 5px 0;
    }
    .info {
        border: 1px solid #abdcff;
        background-color: #f0faff;
        padding: 8rpx;
        margin: 5px 0;
        display: block;
    }
</style>