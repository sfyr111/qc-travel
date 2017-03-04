<template>
	<div class="hotel_pre_oreder_info">
		<h1 class="font14 border_b_ee">预订信息</h1>
		<div class="hotel_pre_oreder_info_content">
			<!-- 床型 -->
			<div>
				预订房型&nbsp;{{ titleName }}
			</div>
			
			<!-- 入住几晚 -->
			<div class="clearfix hotel_pre_oreder_info_select_date">
				<div class="fl hotel_pre_oreder_info_select_date_tit">入离时间</div>
				<hotel-detail-date-search class="fl" :hidebutton="isHideButton" :startdate="hotelorderinfo.checkInDate" :enddate="hotelorderinfo.checkOutDate"></hotel-detail-date-search>
			</div>

			<!-- 房间数 -->
			<div class="hotel_pre_oreder_info_room_num">
				房间数量
				<select value="1" @change="changePrice($event, hotelorderinfo.totalFee)">
					<option value="0" v-if="!getCheckHotelRoomNum.length">0</option>
					<option :value="index + 1" v-for="(index, item) in getCheckHotelRoomNum"> 
							{{ index + 1 }}
					</option>
				</select>
				<span class="none">
					房费总计
					<em class="color_red font18">
						¥{{ totalPrice }}
					</em>
				</span>
			</div>

			<!-- 需信用卡担保 -->
			<div class="post_card_guarantee none">
				需信用卡担保:
				<em class="color_red">
					首晚担保：¥{{ totalPrice }}
				</em>
			</div>
		</div>
	</div>
</template>

<script>
import HotelDetailDateSearch from '../HotelDetailDateSearch'
import { selectHotelOrderRoomNum, checkHotelRoomNum } from '../../vuex/actions'
import { getCheckHotelRoomNum } from '../../vuex/getters'
import $ from 'jquery'
import configUrl from '../../data/configUrl'

export default {
	props: {
		hotelorderinfo: {
			type: Object
		}
	},
	vuex: {
		actions: {
			selectHotelOrderRoomNum,
			checkHotelRoomNum
		},
		getters: {
			getCheckHotelRoomNum
		}
	},
	data: function () {
		return {
			isHideButton: true,   //	是否隐藏重新搜素按钮
			roomNum: 1,						//	房间数
			price: '',					//	单价
			totalPrice: '',			//	总价格
			nightNum: '',		//	入住天数
			titleName: ''
		}
	},
	created () {
		this.price = this.hotelorderinfo.totalFee
		this.titleName = this.hotelorderinfo.titleName
		let hotelId = this.hotelorderinfo.hotelId
		let roomTypeId = this.hotelorderinfo.roomTypeId
		let pricePlanId = this.hotelorderinfo.pricePlanId
		let checkInDate = this.hotelorderinfo.checkInDate
		let checkOutDate = this.hotelorderinfo.checkOutDate
		let supplierType = this.hotelorderinfo.supplierType

		//	获取酒店剩余房间数
		let data = {
			hotelId: hotelId,
			roomTypeId: roomTypeId,
			pricePlanId: pricePlanId,
			checkInDate: checkInDate,
			checkOutDate: checkOutDate,
			payType: 1,
			supplierType: supplierType
		}

		let opt = {
			type: 'POST',
			data: data,
			url: configUrl.checkHotelRoomNum.dataUrl,
			success: function (resp) {
				console.log(resp)
			},
			fail: function (resp) {
				console.log(resp)
			}
		}

		this.checkHotelRoomNum(opt)

		//	初始化选择的房间数
		this.selectHotelOrderRoomNum(this.roomNum)

		//	测试
		//this.roomNumArr = this.getRoomNumArr(3)
	},
	ready () {
		this.nightNum = $('.total_night').html().match(/\d+/g)[0]
		this.totalPrice = this.price * Number(this.roomNum) * Number(this.nightNum)
		this.totalPrice = this.totalPrice.toFixed(2)
		sessionStorage.setItem('hotelOrderTotalPrice', this.totalPrice.toString())
	},
	components: {
		HotelDetailDateSearch
	},
	//	改变价格
	methods: {
		//	选择房间数量
		changePrice: function (e, price) {
			this.roomNum = e.target.value
			this.totalPrice = this.price * Number(this.roomNum) * Number(this.nightNum)
			this.totalPrice = this.totalPrice.toFixed(2)
			$('.hotel_pre_oreder_right_two_head .color_red i').html(this.totalPrice)
			//	存储选择的房间数
			console.log(this.roomNum)
			this.selectHotelOrderRoomNum(Number(this.roomNum))
		}
	},
	events: {
		'send-night-num': function (nightNum) {
			console.log(nightNum)
			this.nightNum = nightNum
			this.totalPrice = this.price * Number(this.roomNum) * Number(this.nightNum)
			this.totalPrice = this.totalPrice.toFixed(2)
			$('.hotel_pre_oreder_right_two_head .color_red i').html(this.totalPrice)
		}
	}
}
</script>

<style>
.hotel_pre_oreder_info{
	width: 770px;
	border: 1px solid #eee;
}
.hotel_pre_oreder_info h1{
	padding-left: 20px;
	height: 40px;
	line-height: 40px;
}
.hotel_pre_oreder_info_content{
	padding: 15px 48px 30px 48px;
}

.hotel_pre_oreder_info .hotel_detail_date_search{
	display: inline-block;
	padding: 0;
}
.hotel_pre_oreder_info_select_date_tit{
	height: 36px;
	line-height: 36px;
	margin-right: 10px;
}
.hotel_pre_oreder_info_select_date{
	margin-top: 26px;
}
.hotel_pre_oreder_info_room_num select{
	width: 106px;
	border: 1px solid #ddd;
	height: 34px;
	margin: 0 20px 0 10px;
}
.hotel_pre_oreder_info_room_num span em{
	font-weight: bold;
	position: relative;
	top: 2px;
}
.post_card_guarantee{
	padding: 10px 0 0 61px;
}
</style>