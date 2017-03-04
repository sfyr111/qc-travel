<template>
	<div class="hotel_pagination_container">
		<div class="hotel_pagination clearfix"></div>
	</div>
</template>

<script>
import $ from 'jquery'
import paginationPage from '../MricodePagination'

export default {
	data: function () {
		return {
			pageSize: 10,
			isFirstInit: true
		}
	},
	events: {
		'reload-hotel-list': function (totalLimits, isInit) {
			this.$nextTick(function () {
				if (this.isFirstInit) {
						this.isFirstInit = false
						let self = this
						$('.hotel_pagination').pagination({
						    pageSize: self.pageSize,
						    total: totalLimits,
						    showJump: true	//	显示跳转页
						})
						//分页按钮点击事件
						.on("pageClicked", function (event, data) {
				    	//console.log(data)
				    	self.$dispatch('page-click', data)
						})
						//跳转按钮点击事件
						.on("jumpClicked", function (event, data) {
				    	//console.log(data)
				    	self.$dispatch('page-click', data)
						})
					} else {
						//	初始化开始页
						if (isInit) {
							console.log(33)
							$('.hotel_pagination').pagination('setPageIndex', 0)
						}

						//	重新生成分页
						$('.hotel_pagination').pagination('render', [totalLimits])
					}
					
			})
		},
		'reload-air-list': function (totalLimits, pageSize, isInit) {
			this.$nextTick(function () {
				if (this.isFirstInit) {
						this.isFirstInit = false
						let self = this
						$('.hotel_pagination').pagination({
						    pageSize: pageSize,
						    total: totalLimits,
						    showJump: true	//	显示跳转页
						})
						//分页按钮点击事件
						.on("pageClicked", function (event, data) {
				    	//console.log(data)
				    	self.$dispatch('page-click', data)
						})
						//跳转按钮点击事件
						.on("jumpClicked", function (event, data) {
				    	//console.log(data)
				    	self.$dispatch('page-click', data)
						})
					} else {
						//	初始化开始页
						if (isInit) {
							console.log(33)
							$('.hotel_pagination').pagination('setPageIndex', 0)
						}

						//	重新生成分页
						$('.hotel_pagination').pagination('render', [totalLimits])
					}
					
			})
		}
	}
}
</script>

<style>
.hotel_pagination_container{
	text-align: right;
	margin: 25px 0;
}
.hotel_pagination{
	display: inline-block;
}
</style>