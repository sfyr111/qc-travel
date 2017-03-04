<template>
	<div class="clearfix hotel_comment_head border_bottom">
		<div class="fl">
			<div class="fl font24 color_red hotel_comment_score">{{ commenthead.averageScore.toFixed(1) }}</div>
			<div class="fl total_score">
				5分<br/>
				总分
			</div>
		</div>
		<!-- <div class="fl hotel_comment_img">
			<img src="http://userimg.qunar.com/imgs/201410/24/GIGWX47MJwmbklvf7180.jpg">
		</div> -->
		<div class="fr hotel_comment_type">
			<ul>
				<li @click="switchCommentType(0)" :class="{'active': tabIndex === 0}">
					全部{{ '（' + commenthead.allComment + '）'}}
				</li>
				<li @click="switchCommentType(1)" :class="{'active': tabIndex === 1}">
					好评{{ '（' + commenthead.good + '）'}}
				</li>
				<li @click="switchCommentType(2)" :class="{'active': tabIndex === 2}">
					中评{{ '（' + commenthead.mid + '）'}}
				</li>
				<li @click="switchCommentType(3)" :class="{'active': tabIndex === 3}">
					差评{{ '（' + commenthead.bad + '）'}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
export default {
	props: {
		commenthead: {
			type: Object
		}
	},
	data: function () {
		return {
			tabIndex: 0
		}
	},

	ready () {
		//定位到评论
		var comment = this.$route.query.toComment
		if (comment === 'true') {
			setTimeout(function () {
				var top = $('.hotel_comment_container').offset().top - 90
				$('html, body').animate({
					scrollTop: top + 'px'
				}, 200)
			}, 500)
		}
	},

	methods: {
		switchCommentType: function (index) {
			this.tabIndex = index
			this.$dispatch('switch-comment-type', index)
		}
	}
}
</script>

<style scoped>
.hotel_comment_head{
	padding-left: 123px;
	height: 46px;
}
.hotel_comment_head div{
	height: 46px;
}
.hotel_comment_type, .hotel_comment_score, .hotel_comment_img{
	line-height: 46px;
}
.total_score{
	position: relative;
	top: 6px;
	margin-right: 30px;
}
.hotel_comment_head img{
	width: 122px;
	height: 24px;
	margin-top: 11px;
}
.hotel_comment_score{
	margin-right: 5px;
}
.hotel_comment_type li{
	float: left;
	padding: 0 10px;
	line-height: 46px;
	cursor: pointer;
	min-width: 92px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.hotel_comment_type{
	margin-right: 36px;
}
.hotel_comment_type li.active{
	border-top: 1px solid #fdbb5a;
	border-left: 1px solid #e3e3e3;
	border-right: 1px solid #e3e3e3;
	border-bottom: 2px solid #fff;
	background: #fff;
}
</style>