<template>
<div class="hotel_order_frame" v-if="show">
	<div class="hotel_order_frame_mask"></div>
	<div class="hotel_order_frame_main">
		<h1 class="hotel_order_frame_main_head">
			{{ confirmOrderInfo.title }}
			<span @click="cancel">ｘ</span>
		</h1>
		<div class="hotel_order_frame_main_banner">
			<div class="bg_green clearfix">
				<div class="fl hotel_order_frame_main_banner_left">
					<img :src="confirmOrderInfo.imgUrl">
				</div>
				<div class="fl hotel_order_frame_main_banner_right">
					<p class="font16 color_blue">{{ confirmOrderInfo.name }}</p>
					<p class="color_66">{{ confirmOrderInfo.address }}</p>
				</div>
			</div>
		</div>

		<div class="hotel_order_frame_main_content">
			<ul>
				<li>
					<div class="hotel_order_frame_main_content_container clearfix">
						<div class="left fl">
							<p>入住时间：{{ confirmOrderInfo.checkInDate }}至{{ confirmOrderInfo.checkOutDate }}</p>
							<p class="middle_margin">支付方式：在线支付</p>
							
						</div>
						<div class="right fl">
							<p>房型：{{ confirmOrderInfo.roomType }}</p>
							<p class="middle_margin">房间数：{{ confirmOrderInfo.guestNum }}</p>
						</div>
						<p v-if="confirmOrderInfo.guestName">
							入住人：
							<em v-for="item in confirmOrderInfo.guestName">{{ item }}&nbsp;&nbsp;</em>
						</p>
					</div>

				</li>

				<li>
					<div class="hotel_order_frame_main_content_container clearfix">
						<div class="left fl">
							<p>联系人：{{ confirmOrderInfo.conName }}</p>
						</div>
						<div class="right fl">
							<p>手机号：{{ confirmOrderInfo.conPhone }}</p>
						</div>
					</div>
				</li>

				<li>
					<div class="hotel_order_frame_main_content_container">
						房费：<em class="color_red">¥{{ confirmOrderInfo.totalFee }}</em>
					</div>
				</li>

				<li>
					<div class="hotel_order_frame_main_content_container">
						服务费：<em class="color_red">¥0.00</em>
					</div>
				</li>

				<li>
					<div class="hotel_order_frame_main_content_container font16">
						应付总金额：<em class="color_red">¥{{ confirmOrderInfo.totalFee }}</em>
					</div>
				</li>
			</ul>
		</div>

		<div class="hotel_pre_order_confirm" @click="submitHotelOrder" v-if="!isSubmit">
			确认无误，提交订单
		</div>
		<submiting-btn :html="submitStr" v-else></submiting-btn>
	</div>
</div>
</template>

<script>
import SubmitingBtn from '../SubmitingBtn'

export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		confirmOrderInfo: {
			type: Object,
			default: {}
		}
	},

	data: function () {
		return {
			submitStr: '正在提交，请稍后',
			isSubmit: false
		}
	},

	components: {
		SubmitingBtn
	},

	methods: {
		//	取消提交订单
		cancel: function () {
			this.show = false
		},
		//	提交订单
		submitHotelOrder: function () {
			this.$dispatch('submit-hotel-order')
		}
	},
	events: {
		//	显示订单弹窗
		'show-order-frame': function () {
			this.isShowHotelPreOrderFrame = true
		},
		//	正在提交订单中
		'is-submit': function (msg) {
			this.isSubmit = msg
		}
	}
}
</script>

<style>
.hotel_order_frame{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
}
.hotel_order_frame_mask{
	width: 100%;
	height: 100%;
	background: black;
	opacity: 0.5;
	position: absolute;
	top: 0;
	left: 0;
}
.hotel_order_frame_main{
	width: 682px;
	height: 540px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -270px;
	margin-left: -341px;
}
.hotel_order_frame_main_head{
	line-height: 44px;
	padding: 0 20px;
	font-size: 14px;
	position: relative;
}
.hotel_order_frame_main_head span{
	position: absolute;
	width: 40px;
	top: 0;
	right: 0;
	height: 44px;
	line-height: 44px;
	text-align: center;
	cursor: pointer;
}
.hotel_order_frame_main_banner{
	padding: 0 15px;
}
.hotel_order_frame_main_banner .bg_green{
	padding: 23px 33px 16px 33px;
	border: 1px solid #ddeaf9;
}
.hotel_order_frame_main_banner img{
	width: 72px;
	height: 72px;
}
.hotel_order_frame_main_banner_left{
	margin-right: 14px;
}
.hotel_order_frame_main_banner_right{
	padding-top: 12px;
}
.hotel_order_frame_main_banner_right p:first-child{
	margin-bottom: 10px;
}
.hotel_order_frame_main_content li{
	padding: 0 16px;
}
.hotel_order_frame_main_content .hotel_order_frame_main_content_container{
	padding: 16px 30px;
	border-bottom: 1px dashed #ddeaf9;
}
.middle_margin{
	margin: 10px 0;
}
.hotel_order_frame_main_content_container .left{
	width: 282px;
	margin-right: 56px;
}
.hotel_order_frame_main_content_container .right{
 	width: 252px;
 }
 .hotel_order_frame_main_content_container.font16{
 	border-bottom: none;
 }
 .hotel_order_frame_main_content_container.font16 em{
 	font-weight: bold;
 }
 .hotel_pre_order_confirm{
 	width: 240px;
 	height: 40px;
 	line-height: 40px;
 	text-align: center;
 	color: #fff;
 	font-size: 14px;
 	background: #e34449;
 	margin: 10px auto;
 	cursor: pointer;
 }
  .hotel_pre_order_confirm:hover{
  	background: #b41521;
  }
</style>