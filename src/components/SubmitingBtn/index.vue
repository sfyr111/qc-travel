<template>
	<div class="submiting_btn">
		<div class="hotel_pre_oreder_submit_btn">{{ html }}</div>
	</div>
</template>

<script>
export default {
	props: {
		html: {
			type: String
		}
	}
}
</script>

<style>
.submiting_btn{
	text-align: center;
}
.submiting_btn .hotel_pre_oreder_submit_btn{
	display: inline-block;
	min-width: 244px;
	height: 40px;
	line-height: 40px;
	background: #ccc;
	font-size: 14px;
	color: #fff;
	cursor: pointer;
	border-radius: 2px;
	margin-top: 15px;
}
</style>