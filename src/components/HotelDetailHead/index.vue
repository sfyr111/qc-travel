<template>
	<div class="hotel_detail_head clearfix">
		<div class="hotel_detail_head_left fl">
			<div class="color_33">
				<b class="font18">{{ baseinfo.name }}</b>
				<em class="color_66 none">{{ baseinfo.hotelType }}</em> 
			</div>
			<p>
				<span class="color_66">
					{{ baseinfo.address }}
				</span>
				<span class="blue" @click="showMap">
					<i class="fa fa-map-marker"></i>
					查看地图
				</span>
			</p>
		</div>
		<div class="hotel_detail_head_right fr">
			<ul class="clearfix">
				<li class="color_66">
					<em class="color_red font16">{{ baseinfo.praiseDegree }}</em>&nbsp;/&nbsp;5分
				</li>
				<li class="color_66">
					<em class="color_red font16">{{ baseinfo.commentNum }}条</em>客户点评
				</li>
				<li class="color_red right_now_order">
					¥<i class="font24">{{ Math.ceil(minprice) }}</i><em class="color_66">起</em>
				</li>
				<!-- <li class="right_now_order font14">
					<a href="#">立即预订</a>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	props: {
		minprice: {
			type: String
		},
		baseinfo: {
			type: Object
		}
	},
	methods: {
		showMap: function () {
			this.$dispatch('show-map')
		}
	}
}
</script>

<style scoped>
.hotel_detail_head{
	width: 100%;
	height: 86px;
	border: 1px solid #eee;
	background: #fff;
}
.hotel_detail_head_left{
	padding-top: 17px;
	padding-left: 18px;
}
.hotel_detail_head_left b{
	font-weight: bold;
	margin-right: 15px;
}
.hotel_detail_head_left p{
	margin-top: 10px;
}
.hotel_detail_head_left p .blue{
	margin-left: 12px;
	cursor: pointer;
}
.hotel_detail_head_right{
	padding-top: 17px;
}
.hotel_detail_head_right li{
	float: left;
	height: 54px;
	line-height: 54px;
	width: 180px;
	text-align: center;
	border-right: 1px solid #ddd;
}
.hotel_detail_head_right li.right_now_order{
	border-right: none;
	position: relative;
}
.right_now_order a{
	display: block;
	width: 110px;
	height: 36px;
	line-height: 36px;
	background: #e34449;
	text-align: center;
	color: #fff;
	border-radius: 3px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -18px;
	margin-left: -55px;
}
</style>