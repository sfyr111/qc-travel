<template>
	<q-c-head></q-c-head>
	
	<div class="bg_f8 hotel_pre_oreder_container">
		<div class="hotel_pre_oreder width1200 clearfix">
			<div class="fl hotel_pre_oreder_left">
				<!-- 酒店预订信息 -->
				<hotel-pre-order-info :hotelorderinfo="hotelOrderInfoObj"></hotel-pre-order-info>

				<!-- 酒店入住信息 -->
				<hotel-check-info></hotel-check-info>

				<!-- 信用卡担保信息 -->
				<hotel-post-card-guarantee-info class="none"></hotel-post-card-guarantee-info>

				<!-- 发票信息 -->
				<hotel-invoice-info :poslist="getAddressList" :invoice-mode="invoiceMode"></hotel-invoice-info>
			</div>
			<div class="fr hotel_pre_oreder_right">
				<hotel-pre-order-right></hotel-pre-order-right>
			</div>
		</div>
	</div>

	<!-- 确认订单信息弹窗 -->
	<hotel-order-frame :show.sync="isShowHotelPreOrderFrame" :confirm-order-info="confirmOrderInfo"></hotel-order-frame>

	<!-- 邮寄地址弹窗 -->
	<!-- <add-mailing-address></add-mailing-address> -->
	<invoice-pos :show-Pop.sync="isShowAddMailAddressFrame" :pop-Name="addMailAddressTit"></invoice-pos>

	<q-c-footer></q-c-footer>
</template>

<script>
import $ from 'jquery'
import { QCHead, QCFooter, HotelPreOrderInfo, HotelCheckInfo, HotelPostCardGuaranteeInfo, HotelInvoiceInfo, HotelPreOrderRight, HotelOrderFrame, AddMailingAddress, InvoicePos, AlertMsg, showTips } from '../components'
import configUrl from '../data/configUrl'
import { addressList, submitHotelOrder, checkHotelRoomNum, addressAdd } from '../vuex/actions'
import { getAddressList } from '../vuex/getters'

export default {
	vuex: {
		actions: {
			addressList,
			submitHotelOrder,
			checkHotelRoomNum,
			addressAdd
		},
		getters: {
			getAddressList
		}
	},
	data: function () {
		return {
			hotelId: '',					//	酒店ID
			hotelName: '',				//	酒店名称
			roomTypeId: '',				//  房型id
			pricePlanId: '',			//  价格计划id
			checkInDate: '',			//	入住日期 yyyy-MM-dd
			checkOutDate: '',			
			guestNum: '',					//	房间数量
			totalFee: '',					//	总金额
			guestName: [],				//	入住人信息 list
			conName: '',					//	联系人
			conPhone: '',					//	联系人手机号
			cityId: '',						//	酒店所属城市Id
			cityName: '',					//	酒店所属城市名称
			address: '',					//	酒店地址
			serviceFee: '',				// 服务费
			supplierType: '',			//	供应商类型:1艺龙 2携程
			invoice: '',					//	是否需要发票：0不需要 1需要
			invoiceMode: '',
			//	以下为非必填
			invoiceId: '',				//	发票地址ID
			invoiceJson: {
				itemName: '',					//	发票项目
				title: '',						//	发票抬头
				recipientName: '',		//	收件人
				phone: '',						//	手机号
				provinceId: '',				//	发票省份
				cityId: '',						//	发票市
				areaId: '',						//	发票区
				address: '',					//	发票地址
				postCode: ''					//	发票邮编
			},
			//	存储对象
			hotelOrderInfoObj: null,
			addressListUrl: configUrl.addressList.dataUrl,   //	查询默认邮寄地址
			isShowAddMailAddressFrame: false, // 是否显示邮寄地址弹框
			addMailAddressTit: '新增邮寄地址',    //	弹窗邮寄地址title
			failMsg: {
				title: '新增邮寄地址',
				content: '添加失败，请稍后再试'
			},
			isShowFailMsg: false,							//	显示提示弹窗
			isShowHotelPreOrderFrame: false,   //	确认订单弹窗
			confirmOrderInfo: {},								//	确认订单信息
			imgUrl: '',													//	酒店图片URL
			roomType: '',												//	房型
			isCanSubmit: true,   								//	是否可以提交订单
			hotelPhone: ''											//	酒店电话
		}
	},
	created () {
		let hotelOrderInfo = JSON.parse(sessionStorage.getItem('hotelOrderInfoObj'))
		
		this.hotelOrderInfoObj = hotelOrderInfo
		this.hotelId = hotelOrderInfo.hotelId
		this.hotelName = hotelOrderInfo.hotelName
		this.roomTypeId = hotelOrderInfo.roomTypeId
		this.pricePlanId = hotelOrderInfo.pricePlanId
		this.checkInDate = hotelOrderInfo.checkInDate
		this.checkOutDate = hotelOrderInfo.checkOutDate
		this.guestNum = hotelOrderInfo.guestNum
		this.totalFee = hotelOrderInfo.totalFee
		this.cityId = hotelOrderInfo.cityId
		this.cityName = hotelOrderInfo.cityName
		this.address = hotelOrderInfo.address
		this.serviceFee = hotelOrderInfo.serviceFee
		this.supplierType = hotelOrderInfo.supplierType
		this.imgUrl = hotelOrderInfo.imgUrl
		this.roomType = hotelOrderInfo.titleName
		this.hotelPhone = hotelOrderInfo.hotelPhone

		//	设置默认地址
		let self = this
		let opt = {
		    type: 'post',
		    data: {},
		    url: configUrl.addressList.dataUrl,
		    success: function (resp) {
		    	let arr = resp.data 
		    	if (arr.length) {
		    		self.invoiceJson.recipientName = arr[0].recipientsName
		    		self.invoiceJson.phone = arr[0].phone
		    		self.invoiceJson.provinceId = arr[0].provinceId ? arr[0].provinceId: ''
		    		self.invoiceJson.cityId = arr[0].cityId ? arr[0].cityId : ''
		    		self.invoiceJson.areaId = arr[0].areaId ? arr[0].areaId : ''
		    		self.invoiceJson.address = arr[0].address
		    		self.invoiceJson.postCode = arr[0].postCode ? arr[0].postCode : ''
		    		self.invoiceId = arr[0].invoiceId
		    		self.invoiceJson.title = arr[0].invoiceTitle
		    	}
		    },
		    fail: function (resp) {
		    }
		}
		this.addressList(opt)
	},
	ready () {
		document.body.scrollTop = 0
	},
	components: {
		QCHead,
		QCFooter,
		HotelPreOrderInfo,
		HotelCheckInfo,
		HotelPostCardGuaranteeInfo,
		HotelInvoiceInfo,
		HotelPreOrderRight,
		HotelOrderFrame,
		AddMailingAddress,
		InvoicePos,
		AlertMsg,
		showTips
	},
	events: {
		//	显示订单弹窗
		'show-hotel-pre-order-frame': function () {
			this.$broadcast('show-order-frame')
		},
		//	确认提交订单
		'submit-hotel-order': function () {
			if (!this.isCanSubmit) {
				return
			}
			this.isCanSubmit = false
			let self = this
			self.$broadcast('is-submit', true)

			let data = {
				hotelId: this.hotelId,					//	酒店ID
				hotelName: this.hotelName,				//	酒店名称
				roomTypeId: this.roomTypeId,				//  房型id
				pricePlanId: this.pricePlanId.toString(),			//  价格计划id
				checkInDate: this.checkInDate,			//	入住日期 yyyy-MM-dd
				checkOutDate: this.checkOutDate,			
				guestNum: this.guestNum,					//	房间数量
				totalFee: this.totalFee,					//	总金额
				guestName: this.guestName,				//	入住人信息 list
				conName: this.conName,					//	联系人
				conPhone: this.conPhone,					//	联系人手机号
				cityId: this.cityId.toString(),						//	酒店所属城市Id
				cityName: this.cityName,					//	酒店所属城市名称
				address: this.address,					//	酒店地址
				serviceFee: this.serviceFee.toString(),				// 服务费
				supplierType: this.supplierType.toString(),			//	供应商类型:1艺龙 2携程
				invoice: this.invoice,					//	是否需要发票：0不需要 1需要
				//	以下为非必填
				invoiceId: this.invoiceId.toString(),				//	发票地址ID
				invoiceJson: this.invoiceJson,			//	发票信息
				roomTypeName: this.roomType,				//	房型名称
				hotelPhone: this.hotelPhone,					//	酒店电话
				payType: 1,													//	供应商
				star: this.$route.query.star        // 	星级
			}

			let opt = {
			    type: 'post',
			    data: data,
			    url: configUrl.prebookHotel.dataUrl,
			    success: function (resp) {
			    	self.$broadcast('is-submit', true)
			    	self.isCanSubmit = true
			    	self.$router.go({
			    		name: 'pay',
			    		query: {
			    			orderNo: resp.result,
			    			orderPrice: self.totalFee,
			    			orderTypeNum: 0
			    		}
			    	})
			    },
			    fail: function (resp) {
			    	self.$broadcast('is-submit', false)
			    	self.isCanSubmit = true
			    	showTips('提交失败，请稍后再试', 2500)
			    }
			}
			this.submitHotelOrder(opt)
		},
		//	提交弹出层
		'to-submit-order': function () {
			//	获取入住人信息
			let guestNameIsEmpty = false
			this.guestName = []
			let self = this
			$('.check_in_person_info .gust_name').each(function () {
				var val = $(this).val()
				if (!val) {
					guestNameIsEmpty = true
				}
				self.guestName.push(val)
				console.log(self.guestName)
			})

			if (guestNameIsEmpty) {
				showTips('入住人不能为空', 2500)
				return
			}


			
			this.checkInDate = $('.hotel_detail_start_date input').val()
			this.checkOutDate = $('.hotel_detail_end_date input').val()
			this.guestNum = $('.hotel_pre_oreder_info_room_num select').val()
			this.totalFee = $('.hotel_pre_oreder_right_two_head .color_red i').html()
			this.conName = $('.hotel_order_con_name').val()
			this.conPhone = $('.hotel_order_phone').val()
			this.invoice = $('.is_need_hotel_invoice_info input[name="isNeedInvoice"]:checked').val()

			//	联系人
			if (!this.conName) {
				showTips('联系人不能为空', 2500)
				return
			}

			//	手机号
			if (!this.conPhone) {
				showTips('手机号不能为空', 2500)
				return
			}

			//	手机号格式不正确
			var pattern = /^(\d){11}$/
			if (!pattern.test(this.conPhone)) {
				showTips('请输入正确的手机号码', 2500)
				return
			}

			//	需要邮寄发票，但没有添加邮寄地址
			console.log(typeof this.invoice)
			if (this.invoice === '1' && !this.getAddressList.length) {
				showTips('请先添加邮寄地址', 2500)
				return
			}

			this.isShowHotelPreOrderFrame = true

			//	确定订单信息
			this.confirmOrderInfo = {
				title: '请核对以下订单信息',
				name: this.hotelName,
				address: this.address,
				imgUrl: this.imgUrl,
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate,
				roomType: this.roomType,
				guestNum: this.guestNum,					//	房间数量
				totalFee: this.totalFee,					//	总金额
				conName: this.conName,					//	联系人
				conPhone: this.conPhone,					//	联系人手机号
				guestName: this.guestName,				//	入住人
				imgUrl: this.imgUrl
			}
			
		},
		//	选择地址
		'select-address': function (msg) {
			//this.$broadcast('is-show-mailing-address')
			console.log(msg)
			this.invoiceJson.recipientName = msg.recipientName
			this.invoiceJson.phone = msg.phone
			this.invoiceJson.provinceId = msg.provinceId ? msg.provinceId: ''
			this.invoiceJson.cityId = msg.cityId ? msg.cityId : ''
			this.invoiceJson.areaId = msg.areaId ? msg.areaId : ''
			this.invoiceJson.address = msg.address
			this.invoiceJson.postCode = msg.postCode ? msg.postCode : ''
			this.invoiceId = msg.invoiceId
			this.invoiceJson.title = msg.invoiceTitle
		},
		//	添加邮寄地址弹窗
		'add-address': function () {
			//this.$broadcast('add-mailing-address')
			this.isShowAddMailAddressFrame = true
			var province = {
			    provinceName: "请选择",
			    provinceUrl: configUrl.selectJdProvince.dataUrl
			}
			var city = {
			    cityName: "请选择",
			    cityUrl: configUrl.selectJdCity.dataUrl
			}
			var area = {
			    areaName: "请选择",
			    areaUrl: configUrl.selectJdArea.dataUrl
			}
			this.$broadcast('init', province, city, area)  
		},
		// 确定添加邮寄地址
		'address-submit': function (msg) {
			let self = this
			console.log(msg)
			let opt = {
				type: 'get',
				url: configUrl.addressAdd.dataUrl,
				data: msg,
				success: function (resp) {
					console.log(resp)
					showTips('添加成功', 3000)
					self.isShowAddMailAddressFrame = false

					//	设置默认地址
					let data = {
					    type: 'post',
					    data: {},
					    url: configUrl.addressList.dataUrl,
					    success: function (resp) {
					    	console.log(resp)
					    },
					    fail: function (resp) {
					    }
					}
					self.addressList(data) 
				},
				fail: function(resp) {
					console.log('添加失败')
					showTips('添加失败，请稍后再试', 3000)
				}
			}

			this.addressAdd(opt)
		},
		//	获取入住多少晚
		'get-night-num': function (nightNum, checkInDate, checkOutDate) {
			this.$broadcast('send-night-num', nightNum)

			//	获取酒店剩余房间数
			let data = {
				hotelId: this.hotelId,
				roomTypeId: this.roomTypeId,
				pricePlanId: this.pricePlanId,
				checkInDate: checkInDate,
				checkOutDate: checkOutDate,
				payType: 1,
				supplierType: this.supplierType
			}
			let self = this
			let opt = {
				type: 'POST',
				data: data,
				url: configUrl.checkHotelRoomNum.dataUrl,
				success: function (resp) {
					self.$dispatch('update_model', resp.result.webOrderPlan.invoiceMode)
				},
				fail: function (resp) {
					console.log(resp)
				}
			}

			this.checkHotelRoomNum(opt)
		},
		'update_model': function (str) {
			this.invoiceMode = str
		}
	}
}
</script>

<style>
@import url('../css/common.css');
.hotel_pre_oreder_left{
	width: 772px;
}
.hotel_pre_oreder_right{
	width: 404px;
}
.hotel_pre_oreder_info h1{
	background: #f1f1f1;
}
.hotel_pre_oreder_container{
	padding: 26px 0 116px 0;
}
.hotel_pre_oreder_left{
	background: #fff;
}
</style>