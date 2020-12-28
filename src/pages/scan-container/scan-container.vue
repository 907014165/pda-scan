<template>
    <view class="wrapper">
        <view class="info">
			操作提示：
			<view class="">1.请扫描已入库的包裹。</view>
			<view class="">2.系统会对您扫描的第一件包裹的客户进行装箱。</view>
		</view>
		
		<view class="warning">
			正在为<b>客户:{{ this.currentCustomNo }}</b>装箱
		</view>
		<tuiList v-for="(courier,index) in courierNoList" :key="index">{{ courier }}</tuiList>
		<view style="display:flex;align-items:center;padding:10rpx 0;border:1px solid #dcdee2;margin-bottom:10rpx;padding-right:10rpx;">
			<view style="font-size:30rpx;font-weight:900;padding:0 10rpx;">手工输入</view>
			<input style="flex:1" v-model="expressNumber" class="thorui-input" placeholder="请输入快递单号" placeholder-class="thorui-phcolor" />
			<tuiButton style="width:128rpx;" :disabled="!expressNumber" height="64rpx" @click="handlerSubmit">确定</tuiButton>
		</view>
		<tuiButton @click="confirmPacking">装箱</tuiButton>
		<tuiTips ref="tips" />
		<tuiModal title="请选择打印设备" @click="selectPrint" :show="this.tuiModalShow" :button="printList" />
    </view>
</template>
	
<script>
import tuiTips from 'thorui-uni/lib/thorui/tui-tips/tui-tips'
import tuiList from 'thorui-uni/lib/thorui/tui-list-cell/tui-list-cell'
import tuiButton from 'thorui-uni/lib/thorui/tui-button/tui-button'
import tuiModal from 'thorui-uni/lib/thorui/tui-modal/tui-modal'
import {mapState,mapMutations} from 'vuex'
const zhuangxiang = require('../../static/zhuangxiang.mp3')
export default {
    data() {
        return {
			currentCustomNo:'',
			packingList:[],
			courierNoList:[],
			printList:[],
			tuiModalShow:false,
			innerAudioContext:null,
			expressNumber:'',
        }
	},
	components:{
		tuiTips,
		tuiList,
		tuiButton,
		tuiModal,
	},
	computed:{
		...mapState(['printId'])
	},
	methods:{
		...mapMutations(['printIdChange']),
		handleScan({code = ''}={}){
			if(this.courierNoList.includes(code)){
				return;
			}
			this.$newProcess(this.packing)(code)
		},
		selectPrint({index = 0 }={}){
			this.printIdChange(this.printList[index].text);
			this.tuiModalShow = false;
		},
		handlerSubmit(){
			this.handleScan({
				code:this.expressNumber
			})
		},
		async getPrintList(){
			this.printList = (await this.$requestApi.packing.getAllConnectionPrint.get()).map((item)=>({
				text:item,
				type:'',
				plain:true,	
			}));
			// console.log(this.printId)
			const findIndex = this.printList.findIndex((item)=> item.text===this.printId);
			if(!this.printList.length){
				this.$refs.tips.showTips({
					type:'warning',
					msg:'当前无打印设备',
					duration:1500,
				})
			}else if(findIndex===-1&&this.printList.length>=1){
				console.log(findIndex,this.printId)
				this.tuiModalShow = true;
			}else {
				// todo
				this.selectPrint();
			}
		},
		async packing(courierNo){
			const [data] = await this.$requestApi.packing.selectCustomPacking.get({
				courierNo,
			});
			// console.log(data)
			if(this.currentCustomNo&&data.customNo!==this.currentCustomNo){
				this.$refs.tips.showTips({
					type:'warning',
					msg:`当前不是${this.currentCustomNo}的包裹`,
					duration:1500,
				})
			}else{
				this.packingList.push(data);
				this.courierNoList.push(courierNo);
				this.currentCustomNo = data.customNo;
			}
		},
		// 获取包裹信息
		confirmPacking(){
			const handler = async () => {
				await this.$requestApi.packing.updateParcelStatus.post({
					deviceNo:this.printId,
					list:this.packingList,
				})
			}
			this.$newProcess(handler)().then(()=>{
				this.$refs.tips.showTips({
					type:'green',
					msg:'装箱成功',
					duration:1500,
				});
				this.innerAudioContext.play();
				this.initData();
			});
		},
		initData(){
			this.currentCustomNo = '';
			this.packingList = [];
			this.courierNoList = [];
		}
	},
	onLoad(){
		uni.$on('scan',this.handleScan);
		this.$newProcess(this.getPrintList)();
		this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = zhuangxiang;
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