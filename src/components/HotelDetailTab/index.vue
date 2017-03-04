<template>
	<div class="hotel_detail_tab is_need_fixed">
		<ul class="clerfix">
			<li v-for="(index, item) in tabArr" @click="viewType(index)" :class="{'active': tabIndex === index}">{{ item }}</li>
		</ul>
	</div>
</template>

<style scoped>
.hotel_detail_tab{
	width: 100%;
	height: 38px;
	background: #4883d0;
	margin-top: 15px;
}
.hotel_detail_tab li{
	float: left;
	padding: 0 34px;
	height: 38px;
	line-height: 38px;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
.hotel_detail_tab li.active{
	background: #fff;
	color: #4883d0;
	height: 36px;
	border-top: 2px solid #4883d0;
}
</style>

<script>
import $ from 'jquery'
export default{
	data () {
		return {
			tabArr: ['房型预订', '酒店设施', '客户点评'],
			tabIndex: 0,
			timer: null
		}
	},

	created () {
		//定位到评论
		var comment = this.$route.query.toComment
		if (comment === 'true') {
			this.tabIndex = 2
		}
	},

	methods: {
		viewType: function (index) {
			this.tabIndex = index
			this.$dispatch('view-type', index)
		}
	},

	events: {
		//	滚动位置切换tab
		'scroll-pos-switch-tap': function (index) {
			let self = this 
			if (this.timer) {
				clearTimeout(this.timer)
			}
			
			this.timer = setTimeout(function () {
				self.tabIndex = index
			}, 50)
		}
	}
}
</script>