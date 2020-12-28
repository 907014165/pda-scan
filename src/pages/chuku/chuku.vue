<template>
    <view class="wrapper">
		<view class="info">
			操作提示：
            <br>
            1.请扫描装箱号出库
		</view>
        <view>
			<tui-list-cell :hover="false">
			<view class="thorui-input-item">
				<view style="font-size:30rpx;font-weight:900;margin-bottom:5px;">手工输入</view>
				<input v-model="expressNumber" class="thorui-input" placeholder="请输入装柜号" placeholder-class="thorui-phcolor" />
			</view>
			</tui-list-cell>
			<tuiButton style="margin-top:8px;" @click="handlerSubmit" :disabled="!expressNumber">确定</tuiButton>
		</view>
        <!-- <view @click="handleScan({code:'gggg'})">fdsfas</view> -->
        <tuiTips ref="tips" />
    </view>
</template>

<script>
import tuiTips from 'thorui-uni/lib/thorui/tui-tips/tui-tips';
import tuiListCell from 'thorui-uni/lib/thorui/tui-list-cell/tui-list-cell';
import tuiButton from 'thorui-uni/lib/thorui/tui-button/tui-button';
const chuku = require('../../static/chuku.mp3');

export default {
    data() {
        return {
            innerAudioContext:null,
            expressNumber:''
        }
    },
    components:{
        tuiTips,
        tuiListCell,
        tuiButton,
    },
    methods:{
        async pickUpPacking(packingNo){
			console.log(packingNo)
            await this.$requestApi.packing.pickUpPacking.put({
                packingNo,
            })
        },  
        handlerSubmit(){
            this.handleScan({
                code:this.expressNumber
            })
        },
        handleScan({code = ''}={}){
            console.log(code)
            this.$newProcess(this.pickUpPacking)(code).then(()=>{
                this.$refs.tips.showTips({
					type:'green',
					msg:'出库成功',
					duration:1500,
                });
                this.innerAudioContext.play();
            })
        }
    },
    mounted(){
        // this.$newProcess(this.pickUpPacking('5989A-1'))
    },
    onLoad(){
        uni.$on('scan',this.handleScan);
        this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = chuku;
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