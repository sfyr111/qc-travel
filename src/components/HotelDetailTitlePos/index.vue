<template>
	<div class="hotel_detail_tit_pos color_33">
		<b class="font14">{{ titlestrarr[0] }}</b>&nbsp;&gt;<em class="color_66">{{ titlestrarr[1] }}</em>{{ titlestrarr[2] }}
	</div>
</template>

<script>
export default {
	props: {
		titlestrarr: {
			type: Array
		}
	}
}
</script>

<style>
.hotel_detail_tit_pos{
	height: 48px;
	line-height: 48px;
}
.hotel_detail_tit_pos b{
	font-weight: bold;
}
</style>