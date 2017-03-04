<template>
	<div class="hotel_comment_list">
		<ul>
			<li v-for="item in comment.apiCommentList">
				<div class="clearfix">
					<div class="hotel_comment_list_left fl">
						<span>
							<img :src="imgPrifx+'head.png'">
						</span>
						<div>
							<p>
								{{ item.userPin }}
							</p>
							<p>
								{{ member(item.uclass.toString()) }}
							</p>
						</div>
					</div>
					<div class="hotel_comment_list_right fl">
						<div>
							<em class="color_red">{{ item.score }}.0</em>&nbsp;/&nbsp;5.0分
						</div>
						<div class="hotel_comment_list_content">
							{{ item.content }}
						</div>
						<p>
							发表于{{ item.created }}
						</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div v-if="comment.apiCommentList">
		<no-data v-if="!comment.apiCommentList.length" :html="nodataString"></no-data>
	</div>
</template>

<script>
import NoData from '../NoData'
import configUrl from '../../data/configUrl'

export default {
	props: {
		comment: {
			type: Object
		}
	},
	data: function () {
		return {
			imgPrifx: configUrl.staticPath,
			nodataString: '暂无评论'
		}
	},
	components: {
		NoData
	},
	methods: {
		member: function (key) {
			let obj = {
				'50': '注册用户',
				'59': '注册用户',
				'56': '铁牌用户',
				'60': '铜牌用户',
				'61': '银牌用户',
				'62': '金牌用户',
				'63': '一钻用户',
				'64': '经销商',
				'65': '大用户',
				'66': '京东员工',
				'88': '双钻用户',
				'103': '三钻用户',
				'104': '四钻用户',
				'105': '五钻用户'
			}
			return obj[key]
		}
	}
}
</script>

<style>
.hotel_comment_list li{
	padding: 0 20px;

}
.hotel_comment_list li div.clearfix{
	padding: 23px 0;
	border-bottom: 1px solid #e3e3e3;
}
.hotel_comment_list li:last-child div{
	border-bottom: none;
}
.hotel_comment_list_left{
	width: 190px;
}
.hotel_comment_list_left img{
	width: 80px;
	height: 80px;
	border-radius: 100%;
}
.hotel_comment_list_left span, .hotel_comment_list_left div{
	float: left;
}
.hotel_comment_list_left div{
	height: 62px;
	width: 68px;
	padding-left: 20px;
	padding-top: 18px;
}
.hotel_comment_list_left div p:first-child{
	margin-bottom: 15px;
}
.hotel_comment_list_left div p{
	width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis
}
.hotel_comment_list_right{
	width: 665px;
	padding-left: 20px;
	border-left: 1px solid #e3e3e3;
}
.hotel_comment_list_right img{
	display: inline-block;
	width: 85px;
	height: 15px;
}
.hotel_comment_list_content{
	line-height: 22px;
	margin: 5px 0;
	min-height: 44px;
}
.hotel_comment_list_right p{
	color: #a1a9a7;
}
</style>