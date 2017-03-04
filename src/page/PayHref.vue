<template>
	<div>正在加载，请稍后．．．</div>
	<div class="pay_href" v-html="html"></div>
</template>

<script>
import { pay } from '../vuex/actions'
import util from '../utils/util'
import configUrl from '../data/configUrl'

export default {
	data: function () {
		return{
			html: '',
			paymentTypeEnum: '',
			orderNo: '',
			orderType: '',
			dataUrl: configUrl.aliPay.dataUrl
		}
	},
	vuex: {
		actions: {
			pay
		}
	},
	created () {
		var query = this.$route.query
		this.paymentTypeEnum = query.paymentTypeEnum
		this.orderNo = query.orderNo
		this.orderType = query.orderType

		let data = {
			paymentTypeEnum: this.paymentTypeEnum,
			orderNo: this.orderNo,
			orderType: this.orderType
		}
		
		this.getPayHtml(data)
	},
	methods: {
		getPayHtml (data) {
			console.log(555)
			let self = this
			let opt = {
				type: 'post',
				url: this.dataUrl,
				data: data,
				success: function (resp) {
					console.log(resp)
				},
				fail: function (resp) {
					self.html = resp.responseText
					self.$nextTick(function () {
						document.forms[0].submit()
					})
				}
			}

			this.pay(opt)
		}
	}
}
</script>
