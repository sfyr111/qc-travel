<template>
<div class="add_mailing_address" v-if="isShowMailingAddress">
	<div class="add_mailing_address_mask"></div>
	<div class="add_mailing_address_main">
		<div class="add_mailing_address_main_head">
			新增邮寄地址
			<span @click="cancel">x</span>
		</div>

		<div class="add_mailing_address_content">
			<div>
				<label>
					<span><em class="color_red">*</em>发票抬头：</span>
					<input type="text" placeholder="请输入发票抬头类型" v-model="invoiceTitle">
				</label>	
			</div>
			<div>
				<label>
					<span><em class="color_red">*</em>收件人：</span>
					<input type="text" placeholder="请输入收件人姓名" v-model="recipientsName">
				</label>	
			</div>
			<div>
				<label>
					<span><em class="color_red">*</em>手机号：</span>
					<input type="text" placeholder="请输入手机号" v-model="phone">
				</label>	
			</div>
			<div class="select_address">
				<span><em class="color_red">*</em>所在地区：</span>

				<!-- 选择省份 -->
				<select class="province" @change="checkProvince($event)" v-model="provinceName">
					<option value="" v-if="!provinceName">请选择</option>
					<option v-for="(key, val) in getSelectJdProvince" :value="key">{{ key }}</option>
				</select>

				<!-- 选择城市 -->
				<select class="city" @change="checkCtiy($event)" v-model="cityName">
					<option value="">请选择</option>
					<option v-for="(key, val) in getSelectJdCity" :value="key">{{ key }}</option>
				</select>

				<!-- 选择区域 -->
				<select class="area" v-model="areaName" @change="checkArea">
					<option value="">请选择</option>
					<option v-for="(key, val) in getSelectJdArea" :value="key">{{ key }}</option>
				</select>
			</div>
			<div>
				<label>
					<span><em class="color_red">*</em>详细地址：</span>
					<input type="text" placeholder="请输入详细地址" v-model="address">
				</label>	
			</div>
		</div>
	
		<div class="save_mailing_address" @click="saveAddress">保存</div>
	</div>
</div>
</template>

<script>
import configUrl from '../../data/configUrl'
import { selectJdProvince, selectJdCity, selectJdArea, clearSelectArea, addressAdd } from '../../vuex/actions'
import { getSelectJdProvince, getSelectJdCity, getSelectJdArea } from '../../vuex/getters'

export default {
	vuex: {
		actions: {
			selectJdProvince,
			selectJdCity,
			selectJdArea,
			clearSelectArea,
			addressAdd
		},
		getters: {
			getSelectJdProvince,
			getSelectJdCity,
			getSelectJdArea
		}
	},
	data: function () {
		return {
			isShowMailingAddress: false,
			selectProvinceUrl: configUrl.selectProvince.dataUrl,			//	省份地址
			selectCityUrl: configUrl.selectCity.dataUrl,							//	城市
			selectAreaUrl: configUrl.selectArea.dataUrl,							//	地区
			provinceId: '',				//查询城市省份id
			cityId: '',					//	查询区域城市ID
			areaId: '',
			//		新增地址参数
			invoiceTitle: '',				//	发票抬头
			recipientsName: '',			//	收件人
			phone: '',							//	收件人手机号
			provinceName: '',				//	省份名称
			cityName: '',						//	城市名称
			areaName: '',						//	县/区名称
			address: '',							//	详细地址
			isShowSave: false         // 	是否可以保存
		}
	},
	created () {
		//	初始化省份
		this.initProvince()
	
	},
	computed: {

	},
	methods: {
		//	取消添加邮寄地址
		cancel: function () {
			this.isShowMailingAddress = false
		},
		//	初始化省份
		initProvince: function () {
			let opt = {
				type: 'get',
				url: this.selectProvinceUrl,
				data: {},
				success: function (resp) {
					//console.log(resp)
				},
				fail: function (resp) {
					//console.log(resp)
				}
			}

			this.selectJdProvince(opt)
		},

		//	根据省份查询城市
		checkProvince: function () {
			this.provinceId = this.getSelectJdProvince[this.provinceName]
			console.log(this.provinceId)
			let self = this
			let opt = {
				type: 'get',
				url: this.selectCityUrl,
				data: {
					provinceFlag: this.provinceId
				},
				success: function (resp) {
					//console.log(resp)
					self.cityName = ''
					self.areaName = ''
					self.clearSelectArea()
				},
				fail: function (resp) {
					//console.log(resp)
				}
			}

			this.selectJdCity(opt)
		},

		//	根据城市查询区域
		checkCtiy: function (e) {
			let self = this
			this.cityId = this.getSelectJdCity[this.cityName]
			let opt = {
				type: 'get',
				url: this.selectAreaUrl,
				data: {
					cityFlag: this.cityId
				},
				success: function (resp) {
					//console.log(resp)
					self.areaName = ''
				},
				fail: function (resp) {
					//console.log(resp)
				}
			}

			this.selectJdArea(opt)
		},

		//	选择区域
		checkArea: function () {
			this.areaId = this.getSelectJdArea[this.areaName]
		},

		//	保存
		saveAddress: function () {
			
			let msg = {
				invoiceTitle: this.invoiceTitle,
				recipientsName: this.recipientsName,
				phone: this.phone,
				provinceId: this.provinceId,
				cityId: this.cityId,
				areaId: this.areaId,
				provinceName: this.provinceName,
				cityName: this.cityName,
				areaName: this.areaName,
				address: this.address
			}

			let opt = {
				type: 'get',
				url: configUrl.addressAdd.dataUrl,
				data: msg,
				success: function (resp) {
					console.log(resp)
				},
				fail: function () {
					console.log('添加失败')
				}
			}

			this.addressAdd(opt)
		}
	},
	events: {
		//	显示添加邮寄地址
		'add-mailing-address': function () {
			this.isShowMailingAddress = true
		}
	}
}
</script>

<style>
.add_mailing_address{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
}
.add_mailing_address_mask{
	width: 100%;
	height: 100%;
	background: black;
	opacity: 0.5;
	position: absolute;
	top: 0;
	left: 0;
}
.add_mailing_address_main{
	width: 552px;
	height: 404px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -276px;
	margin-top: -202px;
}
.add_mailing_address_main_head{
	height: 34px;
	line-height: 34px;
	background: #f2f2f2;
	padding-left: 24px;
	position: relative;
	font-size: 14px;
	font-weight: bold;
}
.add_mailing_address_main_head span{
	position: absolute;
	top: 0;
	right: 0;
	width: 34px;
	height: 34px;
	line-height: 34px;
	text-align: center;
	cursor: pointer;
}
.add_mailing_address_content{
	padding: 50px 40px 0 40px;
	font-size: 14px;
	color: #666;
}
.add_mailing_address_content span{
	display: inline-block;
	width: 106px;
	height: 30px;
	line-height: 30px;
	text-align: right;
}
.add_mailing_address_content input {
	width: 282px;
	height: 28px;
	padding: 0 8px;
	border: 1px solid #ddd;
}
.add_mailing_address_content div{
	margin-bottom: 10px;
}
.add_mailing_address_content div:last-child{
	margin-bottom: 0;
}
.save_mailing_address{
	width: 140px;
	height: 34px;
	line-height: 34px;
	text-align: center;
	background: #ccc;
	border-radius: 3px;
	color: #fff;
	font-size: 14px;
	margin: 60px auto 0 auto;
	cursor: pointer;
}
.bg_orange{
	background: #e34449;
}
.add_mailing_address .select_address select{
	width: 91px;
	height: 28px;
  border: 1px solid #ddd;
  margin-right: 10px;
}
</style>