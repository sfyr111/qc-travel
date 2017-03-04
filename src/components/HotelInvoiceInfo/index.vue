<template>
<div class="hotel_pre_oreder_info hotel_invoice_info">
	<h1 class="font14 border_b_ee">
		发票信息
	</h1>
	<div class="hotel_invoice_info_content">
		<!-- 是否需要发票 -->
		<div class="is_need_hotel_invoice_info clearfix">
			<span class="fl color_66">
				是否需要发票
			</span>
			<span class="fl">
				<label>
					<input type="radio" name="isNeedInvoice" v-model="isNeedInvoice" :value="0">
					否
				</label>
				<label class="need_hotel_invoice_info">
					<input type="radio" name="isNeedInvoice" v-model="isNeedInvoice" value="1">
					是
				</label>
			</span>
			<span class="fl">
				发票由商家开具（离店后次日开具并寄出，预计10-15个工作日送达，遇节假日顺延）
			</span>
		</div>

		<!-- 添加邮寄地址 -->
		<div class="select_mailing_address" v-if="isNeedInvoice === '1' && !poslist.length">
			邮寄地址
			<a href="javascript:;" @click="addAddress">添加邮寄地址</a>
		</div>

		<!-- 发票收件人 -->
		<div class="invoice_recipient clearfix"  v-show="isNeedInvoice === '1'  && poslist.length">
			<div class="fl">发票收件人</div>
			<ul class="fl">
				<li v-for="(index, item) in poslist">
					<label>
						<input type="radio" name="selectAddress" @change="selectAddress(item)" :checked="  index === 0">
						{{ item.recipientsName }}
						<em>
							{{ item.provinceName }}&nbsp;&nbsp;{{ item.cityName }}&nbsp;&nbsp;{{ item.areaName }}
						</em>
						{{ item.address }}&nbsp;&nbsp;
						{{ item.phone }}
					</label>
				</li>
				
			</ul>
		</div>

	</div>
</div>
<div class="hotel_pre_oreder_submit">
	<label class="none">
		<input type="checkbox" checked="true">
		我已阅读并同意遵守
		<a href="#">《齐采酒店预订协议》</a>
	</label>
	<div>
		<div class="hotel_pre_oreder_submit_btn" @click="toSubmitOrder">提交订单</div>
	</div>
</div>
</template>

<script>
import SubmitingBtn from '../SubmitingBtn'

export default {
	props: {
		poslist: {
			type: Array
		}
	},
	data: function () {
		return {
			isNeedInvoice: '0',			//	是否需要发票
			isShowBtn: false,
			submitStr: '正在提交'
		}
	},
	components: {
		SubmitingBtn
	},
	created () {},
	methods: {
		//	显示订单弹窗
		showHotelPreOrederFrame: function () {
			this.$dispatch('show-hotel-pre-order-frame')
		},
		//	选择地址
		selectAddress: function (item) {
			let msg = {
				recipientName: item.recipientsName,
				phone: item.phone,
				provinceId: item.provinceId,
				cityId: item.cityId,
				areaId: item.areaId,
				address: item.address,
				postCode: item.postCode,
				invoiceId: item.invoiceId,
				invoiceTitle: item.invoiceTitle
			}	
			this.$dispatch('select-address', msg)
		},
		//提交订单
		toSubmitOrder: function () {
			var roomNum = document.querySelector('.hotel_pre_oreder_info_room_num select').value
			if (!parseInt(roomNum)) {
				console.log('房间数不能为0')
				return
			} 
			//this.isShowBtn = true
			this.$dispatch('to-submit-order')
		},
		//	添加邮寄地址
		addAddress: function () {
			this.$dispatch('add-address')
		}
	},

	events: {
		'is-submit': function (msg) {
			this.isShowBtn = msg
			console.log(this.isShowBtn)
		}
	}
}
</script>

<style>
.hotel_invoice_info_content{
	padding: 32px 42px;
}
.is_need_hotel_invoice_info span:first-child{
	margin-right: 20px;
	width: 72px;
}
.need_hotel_invoice_info{
	margin-left: 40px;
}
.is_need_hotel_invoice_info span{
	line-height: 22px;
}
.is_need_hotel_invoice_info span:last-child{
	margin-left: 18px;
	width: 434px;
	color: #999;
}
.is_need_hotel_invoice_info input{
	vertical-align: -2px;
}
.select_mailing_address{
	padding-left: 24px;
}
.select_mailing_address a{
	display: inline-block;
	width: 104px;
	height: 22px;
	line-height: 22px;
	border: 1px solid #35a9f9;
	text-align: center;
	cursor: pointer;
	margin-left: 15px;
}
.invoice_recipient, .select_mailing_address{
	margin-top: 38px;
}
.invoice_recipient li em{
	margin: 0 25px;
}
.invoice_recipient div{
	width: 72px;
	text-align: right;
	margin-right: 18px;
}
.invoice_recipient li{
	margin-bottom: 16px;
}
.invoice_recipient li input, .hotel_pre_oreder_submit input{
	vertical-align: -2px;
}
.hotel_pre_oreder_submit{
	text-align: center;
	padding: 36px 0;
}
.hotel_pre_oreder_submit_btn{
	display: inline-block;
	width: 244px;
	height: 40px;
	line-height: 40px;
	background: #e34449;
	font-size: 14px;
	color: #fff;
	cursor: pointer;
	border-radius: 2px;
	margin-top: 15px;
}
.hotel_pre_oreder_submit_btn:hover{
	background: #b41521;
}
.hotel_pre_oreder_submit a{
	color: #35a9f9;
}
</style>