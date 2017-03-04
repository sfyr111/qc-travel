<template>
	<div class="hotel_search_list_head clearfix">
		<div class="hotel_search_list_head_left fl">
			<span :class="{'blue': tabIndex === 0}" @click="hotelListSort(0)">默认排序</span>
			<em>|</em> 
			<a href="javascript:;" @click="hotelListSort(1)"  :class="{'blue': tabIndex === 1}">
				价格
				<i class="fa fa-unsorted"></i>
			</a>
			<em>|</em>        
			<a href="javascript:;" @click="hotelListSort(2)"  :class="{'blue': tabIndex === 2}">
				星级
				<i class="fa fa-unsorted"></i>
			</a>
			<!-- <em>|</em> 
			<a href="javascript:;">
				点评
				<i class="fa fa-unsorted"></i>
			</a> -->
		</div>
		<div class="hotel_search_list_head_right fr">
			<span class="color_66 hotel_num">
				<em class="color_red">{{ num ? num : 0 }}</em>
				家酒店满足条件
			</span>
			<span class="none">
				<a href="javascript:;">&lt;</a>
				<em class="blue">1</em>
				/
				<em>1025</em>
				<a href="javascript:;">&gt;</a>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		num: {
			type: Number
		}
	},
	data: function () {
		return {
			tabIndex: 0,
			priceSort: false,						//	价格升降序
			starSort: false,   					//	星级升降序
			sortTypeStr: 'sort_hot_level_desc'	//	列表排序默认字段
		}
	},
	methods: {
		hotelListSort: function (index) {
			if (!this.tabIndex && !index) {
				return
			}
			this.tabIndex = index
			switch (index) {
				case 0:
					this.sortTypeStr = 'sort_hot_level_desc'
					break;

				case 1:
					//	价格升序
					if (this.priceSort) {
						this.priceSort = false
						this.sortTypeStr = 'sort_expand_member_price_asc'
					}
					//	价格升序
					else {
						this.priceSort = true
						this.sortTypeStr = 'sort_expand_member_price_desc'
					}
					break;

				default:
					 	//	星级升序
					 	if (this.starSort) {
					 		this.starSort = false
					 		this.sortTypeStr = 'sort_star_asc'
					 	}
					 	//	星级升序
					 	else {
					 		this.starSort = true
					 		this.sortTypeStr = 'sort_star_desc'
					 	}
					 	break;
			}
			this.$dispatch('hotel-list-sort', this.sortTypeStr)
		}
	}
}
</script>