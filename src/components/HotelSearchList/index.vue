<template>
	<div class="hotel_search_list_content border_e">
		<ul>
			<li class="clearfix" v-for="(index, item) in list.searchedHotelInfos">
				<div class="fl hotel_search_list_photo">
					<a href="javascript:;" @click="toDetail(item.hotelId, item.minPrice)">
						<img :src="item.imgUrl"/>
					</a>
				</div>
				<div class="fl hotel_search_list_instr">
					<div class="hotel_search_list_instr_top clearfix">
						<div class="fl">
							<a href="javascript:;" @click="toDetail(item.hotelId, item.minPrice)" class="blue font16 hotel_name">{{ item.name }}</a>
							<a href="javascript:;" class="color_ye none">高档行</a>
							<p>
								<a href="javascript:;" @click="toDetail(item.hotelId, item.minPrice)" class="color_66">
									<i class="fa fa-map-marker"></i>
									{{ item.address }}
								</a>
							</p>
						</div>
						<div class="fr">
							<a href="javascript:;">
								<em class="color_red font16">{{ item.praiseDegree }}分</em>
								/ 5分
							</a>
							<p>
								<a href="javascript:;" @click="toComment(item.hotelId, item.minPrice)" class="color_99">{{ item.commentNum }}条客户点评</a>
							</p>
						</div>
					</div>
					<div class="hotel_search_list_instr_bottom none">
						<a href="javascript:;">
							<i class="fa fa-wifi"></i>
							wifi
						</a>
						<a href="javascript:;">
							<i class="fa fa-pinterest"></i>
							停车场
						</a>
						<a href="javascript:;">
							<i class="fa fa-pinterest"></i>
							商务中心
						</a>
						<a href="javascript:;">
							<i class="fa fa-pinterest"></i>
							会议室
						</a>
					</div>
				</div>
				<div class="fl">
					<div class="color_red hotel_search_list">¥<em class="font24">{{ item.minPrice }}</em>起</div>
					<a href="javascript:;" class="hotel_search_list_view_detail" @click="toDetail(item.hotelId, item.minPrice)">查看详情</a>
				</div>
			</li>
		</ul>
		<loading v-if="!list.searchedHotelInfos"></loading>
		<no-data v-if="list.searchedHotelInfos && !list.searchedHotelInfos.length" :html="showString"></no-data>
	</div>
</template>

<script>
import Loading from '../Loading'
import NoData from '../NoData'

export default {
	props: {
		list: {
			type: Object
		}
	},
	data () {
		return{
			showString: '没有搜索到相关结果'
		}
	},
	components: {
		Loading,
		NoData
	},
	methods: {
		//	进入详情
		toDetail: function (hotelId, minPrice) {
			this.$dispatch('to-detail', hotelId, minPrice)
		},

		//	跳转详情评论
		toComment: function (hotelId, minPrice) {
			this.$dispatch('to-comment', hotelId, minPrice)
		}
	}
}
</script>