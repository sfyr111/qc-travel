<template>
	<div class="pay_count_down_container" v-if="isShowCountDownBox">
		<div class="mask"></div>

		<div class="pay_count_down_box">
			<div class="pay_count_down_box_content">{{ orderTimeoutStr }}</div>
			<div class="pay_count_down_box_footer">
				<a href="#">去首页</a>
				<a href="javascript:;" @click="viewOrderDetail">查看订单</a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.pay_count_down_container {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;

	.mask {
		width: 100%;
		height: 100%;
		background: black;
		opacity: .3;
		position: absolute;
		top: 0;
		left: 0;
	}

	.pay_count_down_box {
		width: 420px;
		height: 200px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -210px;
		margin-top: -100px;
		background: #fff;

		.pay_count_down_box_content {
			height: 100px;
			font-size: 14px;
			padding: 40px 40px 0 40px;
			line-height: 25px;
		}
		.pay_count_down_box_footer {
			height: 40px;
			padding: 15px 20px;
			text-align: right;

			a {
				display: inline-block;
				width: 90px;
				height: 30px;
				line-height: 30px;
				border: 1px solid #ddd;
				text-align: center;
			}
			a:first-child{
				margin-right: 15px;
			} 
		}
	}
}

</style>

<script>
export default {
	data () {
		return {
			orderTimeoutStr: '抱歉，该订单在时效内未支付，系统已取消订单，请重新预订！',
			isShowCountDownBox: false,                //     支付超时显示弹窗
      timeoutNum: 11 * 60,                            //    订单超过10分钟超时
      timeoutTimer: null
		}
	},
	created () {
		//  10分钟超时处理
		this.timeoutFun()
	},

	methods: {
		//  10分钟超时处理
		timeoutFun () {
		  this.timeoutTimer = setInterval(function () {
		    if (this.timeoutNum <= 0) {
		      this.isShowCountDownBox = true
		      clearInterval(this.timeoutTimer)
		    }

		    this.timeoutNum --
		    //console.log(this.timeoutNum) 
		  }.bind(this), 1000)
		},
		//查看订单详情
		viewOrderDetail () {
			this.$dispatch('view-order-detail')
		}
	}
}
</script>