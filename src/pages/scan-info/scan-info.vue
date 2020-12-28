<template>
    <view class="wrapper">
		<view class="info">
			操作提示：
            <br>
            1.请扫描已装箱的包裹进行装柜
		</view>
		<view>
			
		</view>
        <view class="warning">
            当前正在为<b>{{ currentContainerInfo.containerNo }}</b>进行装柜
        </view>	
		<view style="position:absolute;bottom:10px;left:10rpx;right:10rpx;">
            <tuiButton @click="handlerClose">关闭当前装柜</tuiButton>
        </view>

        <view>
			<tui-list-cell :hover="false">
			<view class="thorui-input-item">
				<view style="font-size:30rpx;font-weight:900;margin-bottom:5px;">手工输入</view>
				<input v-model="expressNumber" class="thorui-input" placeholder="请输入装箱号" placeholder-class="thorui-phcolor" />
			</view>
			</tui-list-cell>
			<tuiButton style="margin-top:8px;" @click="handlerSubmit" :disabled="!expressNumber">确定</tuiButton>
		</view>
		<tui-modal :show="modal"  title="提示" content="确定关闭当前装柜吗？" @click="closeCurrentContainer"></tui-modal>
        <tuiTips ref="tips" />
    </view>
</template>

<script>
import tuiTips from 'thorui-uni/lib/thorui/tui-tips/tui-tips';
import tuiButton from 'thorui-uni/lib/thorui/tui-button/tui-button';
import tuiModal from 'thorui-uni/lib/thorui/tui-modal/tui-modal';
import tuiListCell from 'thorui-uni/lib/thorui/tui-list-cell/tui-list-cell'
const zhuanggui = require('../../static/zhuanggui.mp3');

export default {
    data() {
        return {
            currentContainerInfo:{},
            innerAudioContext:null,
            modal:false,
            expressNumber:''
        }
    },
    components:{
        tuiTips,
		tuiButton,
        tuiModal,
        tuiListCell,
    },
    methods:{   
        async getCurrentContainerInfo(){
            this.currentContainerInfo = await this.$requestApi.container.selectCurrentContainer.get(); 
        },
        async scanContainer(code){
            await this.$requestApi.container.changeParcelStatus.post({
                containerId:this.currentContainerInfo.containerId,
                packingNo:code,
            })
        },
        handleScan({code = ''}={}){
            this.$newProcess(this.scanContainer)(code).then(()=>{
                this.$refs.tips.showTips({
					type:'green',
					msg:'装柜成功',
					duration:1500,
                });
                this.innerAudioContext.play();
            })
        },
		handlerClose(){
			this.modal = true;
        },
        handlerSubmit(){
            this.handleScan({
                code:this.expressNumber
            })
        },
		closeCurrentContainer(){
			this.$newProcess(this.$requestApi.container.changeParcelStatus.put)({
				containerId:this.currentContainerInfo.containerId
			}).then(()=>{
				this.modal = false;
			    this.$refs.tips.showTips({
					type:'green',
					msg:'关闭成功',
					duration:1500,
			    });
				setTimeout(()=>{
					uni.navigateBack()
				},1500)
			})
		},
    },
    mounted(){
        this.$newProcess(this.getCurrentContainerInfo)()
    },
    onLoad(){
        uni.$on('scan',this.handleScan);
        this.innerAudioContext = uni.createInnerAudioContext();
		this.innerAudioContext.src = zhuanggui;
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