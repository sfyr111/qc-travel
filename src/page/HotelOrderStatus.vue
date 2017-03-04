<template>
<q-c-head></q-c-head>

<div class="hotel_order_status width1200">
	<hotel-detail-title-pos :titlestrarr="titleStrArr"></hotel-detail-title-pos>
</div>

<q-c-footer></q-c-footer>
</template>

<script>
import { QCHead, QCFooter, HotelDetailTitlePos } from '../components'

export default {
	data: function () {
		return {
			titleStrArr: ['商旅预订1', '深圳酒店2', '深圳温德姆酒店3']     //	酒店tit位置
		}
	},
	components: {
		QCHead,
		QCFooter,
		HotelDetailTitlePos
	}
}
</script>

<style>
@import url('../css/common.css');
</style>