<template>
	<div class="hotel_check_info hotel_pre_oreder_info">
		<h1 class="font14 border_b_ee">
			入住信息
		</h1>
		<div class="hotel_check_info_content hotel_pre_oreder_info_content">
			<div class="clearfix check_in_person_info_title">
					<div class="fl">
						<em class="color_red">*</em>入住人
					</div>
					
					<div class="fl check_in_person_info">
						<input class="gust_name" type="text" :placeholder="'第'+ (index + 1) +'位客人姓名'"  v-for="(index, item) in getSelectHotelRoomNum" @blur="blurCheck($event, 'occupancy')" @focus="focusInput($event)" :class="{ 'first': index === 0 }">
					</div>
			</div>
			<div class="post_card_guarantee color_66">
				每1个房间只需填写1位，请确保所填写姓名与所持证保持一致
			</div>

			<div class="margin_top16">
				<label>
					<em class="color_red">*</em>
					联系人
					<input class="hotel_order_con_name" type="text" placeholder="请填写联系人姓名" @blur="blurCheck($event, 'concat')" v-model="concat" @focus="focusInput($event)">
				</label> 
			</div>

			<div class="margin_top16">
				<label>
					<em class="color_red">*</em>
					手机号
					<input class="hotel_order_phone" type="number" placeholder="预订成功后将短信通知"  @blur="blurCheck($event, 'phone')" v-model="phone" @focus="focusInput($event)">
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import { getSelectHotelRoomNum } from '../../vuex/getters'
import showTips from '../ShowTips'
import $ from 'jquery'

export default {
	data: function () {
		return {
			concat: '',			//	联系人
			phone: '',			//	手机号
			isFirstInputConcatName: true   //	是否是第一次输入入住人
		}
	},
	vuex: {
		getters: {
			getSelectHotelRoomNum
		}
	},

	components: {
		showTips
	},

	methods: {
		//	检查必填项
		blurCheck: function (e, type) {
			let target = e.target
			target.classList.remove('focus_input')

			//	入住人
			if (type === 'occupancy') {
				if (!target.value) {
					showTips('入住人不能为空', 2500)
				}
			}
			//	联系人
			else if (type === 'concat') {
				if (!this.concat) {
					showTips('联系人不能为空', 2500)
				}
			}
			//	手机号
			else if (type === 'phone') {
				var pattern = /^(\d){11}$/
				if (!this.phone) {
					showTips('手机号不能为空', 2500)
				}
				else if (!pattern.test(this.phone)) {
					showTips('请输入正确的手机号码', 2500)
				}
			}

		},

		//	获取焦点
		focusInput: function (e) {
			var target = e.target
			target.classList.add('focus_input')
			//	如果是联系人
			if (target.className.indexOf('hotel_order_con_name') > -1 && this.isFirstInputConcatName) {
				var val = $('.gust_name.first').val()
				if (val) {
					this.isFirstInputConcatName = false
					this.concat = val
				}
			}
		}
	}
}
</script>

<style>
.hotel_check_info_content input{
	width: 218px;
	height: 34px;
	border: 1px solid #ddd;
	padding: 0 10px;
	margin-left: 10px;
}
.hotel_check_info_content .margin_top16 input{
	margin-left: 5px;
}
.hotel_check_info_content .post_card_guarantee{
	color: #999;
	    padding: 10px 0 0 56px;
}
.margin_top16{
	margin-top: 16px;
}
.check_in_person_info{
	width: 600px;
}
.check_in_person_info input {
	margin-bottom: 15px;
}
.check_in_person_info input:last-child{
	margin-bottom: 0;
}
.check_in_person_info_title{
	line-height: 36px;
}
.hotel_check_info_content input.focus_input{
	border: 1px solid orange;
}
</style>