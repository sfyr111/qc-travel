<template>
<div class="hotel_pre_oreder_right_container">
	<div class="hotel_pre_oreder_right_one bg_green">
		<div class="hotel_pre_oreder_right_one_top clearfix">
			<div class="fl hotel_pre_oreder_right_one_top_left">
				<img :src="imgUrl">
			</div>
			<div class="fl hotel_pre_oreder_right_one_top_right">
				<h1 class="font16 color_blue">{{ name }}</h1>
				<p class="color_66">{{ address }}</p>
			</div>
		</div>
		<div class="hotel_pre_oreder_right_one_bottom">
			<h2 class="font14">房型：{{ titleName }}</h2>
			<p>
				床型：{{ bedDesc }}
				楼层：{{ floors }}
				面积：{{ area }}平方米
			</p>
		</div>
	</div>

	<div class="hotel_pre_oreder_right_two bg_green">
		<div class="hotel_pre_oreder_right_two_head clearfix">
			<div class="fl font16">
				<em>¥</em>
				<i>应付金额：</i>
			</div>
			<div class="fr">
				<b class="color_red">
					¥<i class="font18">{{ totalPrice }}</i>
				</b>
			</div>
		</div>
	
		<ul>
			<li>
				<span class="fl">房费</span>
				<span>
					<i>¥{{ price }}/间</i>
					<em>x1</em>
				</span>
			</li>
			<li>
				<span class="fl">服务费</span>
				<span>
					<i>¥00.00/间</i>
					<em>x1</em>
				</span>
			</li>
		</ul>

	</div>

	<div class="hotel_pre_oreder_right_three bg_green">
		<h2 class="color_blue font14">温馨提示：</h2>
		<p>
			-订单提交后需要在线支付房费，如订单不确认将全额退款
			至您的付款账户
		</p>
		<p>
			-该订单确认后不可被取消或修改，未入住将收取全额房费
		</p>
		<p>
			-为确保按当前价格预订房间，请在2小时内完成订单支付，否则订单将
			自动取消
		</p>
	</div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
	data: function () {
		return {
			name: '',
			address: '',
			titleName: '',
			bedDesc: '',
			floors: '',
			area: '',
			totalPrice: '',
			price: '',		//	房间单价
			imgUrl: ''		//	图片地址
		}
	},
	created () {
		let hotelOrderInfo = JSON.parse(sessionStorage.getItem('hotelOrderInfoObj'))
		this.titleName = hotelOrderInfo.titleName
		this.name = hotelOrderInfo.name
		this.address = hotelOrderInfo.address
		this.bedDesc = hotelOrderInfo.bedDesc
		this.floors = hotelOrderInfo.floors
		this.area = hotelOrderInfo.area
		this.price = hotelOrderInfo.totalFee
		this.totalPrice = hotelOrderInfo.totalFee
		this.imgUrl = hotelOrderInfo.imgUrl
	},
	ready () {
		let nightNum = $('.total_night').html().match(/\d+/g)[0]
		let roomNum = 1

		let totalPrice = this.price * Number(nightNum) * Number(roomNum)
		
		$('.hotel_pre_oreder_right_two_head .color_red i').html(totalPrice)
	}
}
</script>

<style>
.bg_green{
	background: #f1fcff;
}
.hotel_pre_oreder_right_one{
	padding: 16px 18px 25px 10px;
}
.hotel_pre_oreder_right_one, .hotel_pre_oreder_right_two, .hotel_pre_oreder_right_three{
	border: 1px solid #ddeaf9;
}
.hotel_pre_oreder_right_one_top img{
	width: 100px;
	height: 100px;
}
.hotel_pre_oreder_right_one_top {
	padding-bottom: 20px;
	border-bottom: 1px dashed #ddeaf9;
}
.hotel_pre_oreder_right_one_top_left{
	margin-right: 20px;
}
.hotel_pre_oreder_right_one_top_right{
	padding-top: 8px;
	max-width: 254px;
}
.hotel_pre_oreder_right_one_top_right p{
	margin-top: 10px;
}
.hotel_pre_oreder_right_one_bottom{
	padding: 16px 0 0 12px;
}
.hotel_pre_oreder_right_one_bottom h2{
	margin-bottom: 14px;
}
.hotel_pre_oreder_right_two, .hotel_pre_oreder_right_three{
	margin-top: 10px;
}
.hotel_pre_oreder_right_two_head{
	height: 39px;
	line-height: 40px;
	border-bottom: 1px solid #ddeaf9;
	background: #fff;
	padding: 0 20px 0 12px;
}
.hotel_pre_oreder_right_two_head em{
	display: inline-block;
	width: 24px;
	height: 24px;
	text-align: center;
	line-height: 24px;
	background: #e34449;
	border-radius: 100%;
	color: #fff;
	font-size: 14px;
	margin-right: 3px;
}
.hotel_pre_oreder_right_two_head i, .hotel_pre_oreder_right_two_head b{
	font-weight: bold;
}
.hotel_pre_oreder_right_two ul{
	padding: 0 10px;
}
.hotel_pre_oreder_right_two ul li{
	padding: 0 20px;
	line-height: 40px;
	height: 40px;
	position: relative;
	color: #666;
	border-bottom: 1px dashed #ddeaf9;
}
.hotel_pre_oreder_right_two ul li:last-child{
	border-bottom: none;
}
.hotel_pre_oreder_right_two li span:last-child i{
	display: inline-block;
	min-width: 64px;
	margin-right: 12px;
}
.hotel_pre_oreder_right_two li span:last-child{
	height: 40px;
	line-height: 40px;
	position: absolute;
	top: 50%;
	right: 20px;
	margin-top: -20px;
}
.hotel_pre_oreder_right_three{
	padding: 16px 15px 22px 15px;
}
.hotel_pre_oreder_right_three p{
	line-height: 30px;
}
.hotel_pre_oreder_right_three p:first-of-type{
	margin-top: 10px;
}
</style>