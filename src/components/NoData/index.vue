<template>
	<div class="no_data">
		{{ defHtml }}
	</div>
</template>

<script>
export default {
	props: {
		html: {
			type: String
		}
	},
	data: function () {
		return {
			defHtml: '暂无搜索结果'
		}
	},
	created () {
		if (!this.html) {
			return
		}
		this.defHtml = this.html
	}
}
</script>

<style>
.no_data{
	width: 100%;
	height: 230px;
	line-height: 230px;
	font-size: 14px;
	text-align: center;
	color: #666;
}
</style>
