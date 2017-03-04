<template>
	<div>
		<q-c-head></q-c-head>
	
		<div class="hotel_detail_container">
			<div class="hotel_detail_wrapper width1200">
				<!-- title位置标志 -->
				<hotel-detail-title-pos :titlestrarr="titleStrArr"></hotel-detail-title-pos>

				<!-- head -->
				<hotel-detail-head  v-if="getHotelDetail.baseInfo" :minprice="minPrice" :baseinfo="getHotelDetail.baseInfo"></hotel-detail-head>

				<!-- banner和地图 -->
				<hotel-detail-banner :detail="getHotelDetail"></hotel-detail-banner>

				<!-- 弹层地图 -->
				<hotel-map v-show="isShowMap && getHotelDetail.baseInfo" :baseinfo="getHotelDetail.baseInfo"></hotel-map>
				
				<div  v-scroll-fixed>
					<!-- tab切换 -->
					<hotel-detail-tab></hotel-detail-tab >

					<!-- 入住时间 -->
					<hotel-detail-date-search :startdate="checkInDate" :enddate="checkOutDate"></hotel-detail-date-search>

					<!-- 价格列表 -->
					<hotel-detail-price-list :priceobj="getCheckHotelRoomType"></hotel-detail-price-list>

					<!-- 酒店其他 -->
					<div class="hotel_detail_other">
						<!-- 酒店简介 -->
						<div class="hotel_instruction">
							<h2 class="border_bottom">酒店简介</h2>
							<div class="border_bottom hotel_instruction_detail" v-if="getHotelDetail.baseInfo">
								{{ getHotelDetail.baseInfo.memo }}
							</div>
						</div>

						<!-- 酒店设施和服务 -->
						<div class="hotel_instruction hotel_tool">
							<h2 class="border_bottom">设施和服务</h2>
							<div class="hotel_instruction_detail border_bottom">
								<ul> 
									<li class="clearfix" v-for="item in getHotelDetail.relatedInfos">
										<div class="fl hotel_tool_title" v-html="getInfoType(item.infoType)"></div>
										<div class="fl hotel_tool_content" v-html="item.overview"></div>
									</li>
									
								</ul>
							</div>
						</div>

						<!-- 评论 -->
						<div class="hotel_instruction hotel_comment_container">
							<h2 class="border_bottom">客户评论</h2>
							<hotel-comment-head v-if="getHotelDetail.level" :commenthead="getHotelDetail.level"></hotel-comment-head>
							<!-- 评论列表 -->
							<!-- 所有评论 -->
							<hotel-comment-list :comment="getAllComment" v-if="!level"></hotel-comment-list>
							<!-- 好评 -->
							<hotel-comment-list :comment="getGoodComment" v-if="level === '3'"></hotel-comment-list>
							<!-- 中评 -->
							<hotel-comment-list :comment="getMidComment" v-if="level === '2'"></hotel-comment-list>
							<!-- 中评 -->
							<hotel-comment-list :comment="getBadComment" v-if="level === '1'"></hotel-comment-list>

							<!-- 酒店详情分页 -->
							<div class="hotel_detail_pagination_container">
								<div class="hotel_detail_allcomment_pagination clearfix" v-show="!level"></div>
								<div class="hotel_detail_goodcomment_pagination clearfix" v-show="level === '3'"></div>
								<div class="hotel_detail_midcomment_pagination clearfix" v-show="level === '2'"></div>
								<div class="hotel_detail_badcomment_pagination clearfix" v-show="level === '1'"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height:46px;background:#f8f8f8;"></div>
		<q-c-footer></q-c-footer>

		<!-- 查看酒店图片弹窗 -->
		<hotel-view-pic :show.sync="showBigPicBox" :select-index.sync="selectPicIndex" :pic-arr="getHotelDetail.pictures"></hotel-view-pic>
	</div>
</template>

<script>
import $ from 'jquery'
import paginationPage from '../components/MricodePagination'
import { QCHead, QCFooter, HotelDetailTitlePos, HotelDetailHead, HotelDetailBanner, HotelMap, HotelDetailTab, HotelDetailDateSearch, HotelDetailPriceList, HotelCommentHead, HotelCommentList, HotelViewPic } from '../components'
import configUrl from '../data/configUrl'
import { hotelDetail, checkHotelRoomType, checkHotelComment, clearCheckHotelRoomList } from '../vuex/actions'
import { getHotelDetail, getCheckHotelRoomType, getAllComment, getGoodComment, getMidComment, getBadComment } from '../vuex/getters'
 
export default {
	vuex: {
		actions: {
			hotelDetail,
			checkHotelRoomType,
			checkHotelComment,
			clearCheckHotelRoomList
		},
		getters: {
			getHotelDetail,
			getCheckHotelRoomType,
			getAllComment,
			getGoodComment,
			getMidComment,
			getBadComment
		}
	},
	data: function () {
		return {
			isShowMap: false,
			titleStrArr: [],		//	酒店tit位置
			checkInDate: '',							//	`酒店入住时间
			checkOutDate: '',							//	酒店离店时间
			hotelId: '',										//	酒店id
			hotelDetailUrl: configUrl.hotelDetail.dataUrl,    //   酒店详情URL
			hotelRoomTypeUrl: configUrl.hotelRoomType.dataUrl,			//	房型房价
			minPrice: '',									//	最低价格
			commentUrl: configUrl.hotelComment.dataUrl,         // 	评论URL
			level: '',															//	好评差评标志 差评1、中评2、好评3
			allComment: {														//	所有评论
				page: '1',
				pageSize: '10',
				totalItem: 0					
			},
			goodComment: {
				page: '1',
				pageSize: '10',
				totalItem: 0
			},
			midComment: {
				page: '1',
				pageSize: '10',
				totalItem: 0
			},
			badComment: {
				page: '1',
				pageSize: '10',
				totalItem: 0
			},
			isFirstInitAllComment: true,		//	初始化所有评论
			isFirstInitGoodComment: true,		//	初始化好评
			isFirstInitMidComment: true,		//	初始化中评
			isFirstInitBadComment: true, 		//	初始化差评
			scrollTop: 0,										//	滚动位置
			showBigPicBox: false,            //	查看大图
			selectPicIndex: 0     					//	查看大图索引
		}
	},
	components: {
		QCHead,
		QCFooter,
		HotelDetailTitlePos,
		HotelDetailHead,
		HotelDetailBanner,
		HotelMap,
		HotelDetailTab,
		HotelDetailDateSearch,
		HotelDetailPriceList,
		HotelCommentHead,
		HotelCommentList,
		HotelViewPic
	},
	created () {
		let self = this
		//	初始化参数
		this.hotelId = this.$route.query.hotelId
		this.checkInDate = this.$route.query.checkInDate
		this.checkOutDate = this.$route.query.checkOutDate
		this.minPrice = this.$route.query.minPrice


		

		//	初始化房型房价
		this.HotelRoomType()
	},
	ready () {
		let self = this
		document.body.scrollTop = 0
		this.scrollTop = $('.is_need_fixed').offset().top

		//	初始化酒店详情
		this.initHotelDetail()

		//	初始化酒店评论  全部

		this.commentMethod(this.allComment.page, this.allComment.pageSize).then(function (resp) {
				self.isFirstInitAllComment = false
				let totalLimits = resp.result.totalItem
				self.allComment.totalItem = totalLimits
				//	初始化分页
				$('.hotel_detail_allcomment_pagination').pagination({
				    pageSize: 10,
				    total: totalLimits,
				    showJump: true	//	显示跳转页
				})
				//分页按钮点击事件
				.on("pageClicked", function (event, data) {
		    	let pageIndex = data.pageIndex + 1
		    	self.commentMethod(pageIndex.toString(), '10')

		    	//	滚动定位
		    	let commentTop = $('.hotel_comment_container').offset().top - 53
					$('html, body').stop().animate({
						scrollTop: commentTop + 'px'
					}, 300)
				})
				//跳转按钮点击事件
				.on("jumpClicked", function (event, data) {
		    	console.log(data)
		    	let pageIndex = data.pageIndex + 1
		    	self.commentMethod(pageIndex.toString(), '10')
  	    	//	滚动定位
  	    	let commentTop = $('.hotel_comment_container').offset().top - 53
  				$('html, body').stop().animate({
  					scrollTop: commentTop + 'px'
  				}, 300)
				})
		})


	},
	methods: {
		//	初始化酒店详情
		initHotelDetail: function () {
			let self = this
			let opt = {
				type: 'get',
				data: {
					hotelId: this.hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				},
				url: this.hotelDetailUrl,
				success: function (resp) {
					var data = resp.result
					self.titleStrArr = [
						'酒店预订',
						'',
						data.baseInfo.name
					]
					//	传递地图经纬度
					let msg = {
						longitude: data.baseInfo.longitude,
						latitude: data.baseInfo.latitude
					}
					self.$nextTick(function () {
						self.$broadcast('get-lat-lon', msg)
					})
				},
				fail: function (resp) {
					console.log(resp)
					console.log('查询失败，请稍后再试！')
				}
			}

			this.hotelDetail(opt)
		},

		//	查询房型房价
		HotelRoomType: function () {
			let self = this
			let opt = {
				type: 'POST',
				data: {
					hotelId: this.hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate
				},
				url: this.hotelRoomTypeUrl,
				success: function (resp) {
					var data = resp.result
					console.log(resp)
				},
				fail: function (resp) {
					console.log(resp)
					console.log('查询失败，请稍后再试！')
				}
			}

			this.checkHotelRoomType(opt)
		},

		//	获取设施type
		getInfoType: function (num) {
			var arr = [
				'',
				'接机信息',
				'酒店服务设施',
				'房间服务设施',
				'休闲服务设施',
				'会议服务设施',
				'餐饮服务设施',
				'周边交通信息',
				'周边商务信息',
				'周边餐饮信息',
				'周边景致信息',
				'周边购物信息',
				'酒店特色信息',
				'酒店附近标志物',
				'周边信息',
				'酒店介绍'
			]
			return arr[num]
		},

		// 评论 
		commentMethod: function (page, pageSize) {
			let self = this
			let deferred = $.Deferred();
			let opt = {
				type: 'POST',
				data: {
					hotelId: this.hotelId,
					level: this.level,
					page: page,
					pageSize: pageSize
				},
				url: this.commentUrl,
				success: function (resp) {
					//console.log(resp)
					deferred.resolve(resp)
				},
				fail: function (resp) {
					//console.log(resp)
					console.log('查询失败，请稍后再试！')
					deferred.reject(resp)
				},
				level: this.level
			}

			this.checkHotelComment(opt)
			return deferred.promise()
		}	
	},
	events: {
		//	小地图查看大地图
		'show-map-detail': function () {
			this.isShowMap = true
			this.$nextTick(function () {
				this.$broadcast('first-init-map')
			})
		},

		//	关闭地图
		'close-map': function () {
			this.isShowMap = false
		},

		//	查看地图
		'show-map': function () {
			this.isShowMap = true
			this.$nextTick(function () {
				this.$broadcast('first-init-map')
			})
		},

		//	查看好评差评
		'switch-comment-type': function (index) {
			let self = this
			//console.log(index)
			//	两次选择相同退出
			if (this.switchCommentTypeIndex === index) {
				return
			}
			this.switchCommentTypeIndex = index
			let commentTop = $('.hotel_comment_container').offset().top - 53

			//	全部
			if (index === 0) {
				this.level = ''

				//	切换到全部评论
				if (!this.isFirstInitAllComment) {
					return
				}


			}
			//	好评
			else if (index === 1) {
				this.level = '3'
				
				//初始化评论
				if (!this.isFirstInitGoodComment) {
					return
				}

				this.commentMethod(this.goodComment.page, this.goodComment.pageSize).then(function (resp) {
					self.isFirstInitGoodComment = false
					self.goodComment.tootalItem = resp.result.totalItem
					//	初始化分页
					$('.hotel_detail_goodcomment_pagination').pagination({
					    pageSize: 10,
					    total: self.goodComment.tootalItem,
					    showJump: true	//	显示跳转页
					})
					//分页按钮点击事件
					.on("pageClicked", function (event, data) {
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')
			    	//	滚动定位
						$('html, body').stop().animate({
							scrollTop: commentTop + 'px'
						}, 300)
			    	
					})
					//跳转按钮点击事件
					.on("jumpClicked", function (event, data) {
			    	console.log(data)
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')

    	    	//	滚动定位
    				$('html, body').stop().animate({
    					scrollTop: commentTop + 'px'
    				}, 300)
					})
				})
				
			}
			//	中评
			else if (index == 2) {
				this.level = '2'
				
				//	初始化中评
				if (!this.isFirstInitMidComment) {
					return
				}

				this.commentMethod(this.goodComment.page, this.goodComment.pageSize).then(function (resp) {
					self.isFirstInitMidComment = false
					self.midComment.tootalItem = resp.result.totalItem
					//	初始化分页
					$('.hotel_detail_midcomment_pagination').pagination({
					    pageSize: 10,
					    total: self.midComment.tootalItem,
					    showJump: true	//	显示跳转页
					})
					//分页按钮点击事件
					.on("pageClicked", function (event, data) {
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')
			    	//	滚动定位
    				$('html, body').stop().animate({
    					scrollTop: commentTop + 'px'
    				}, 300)
					})
					//跳转按钮点击事件
					.on("jumpClicked", function (event, data) {
			    	console.log(data)
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')
			    	//	滚动定位
    				$('html, body').stop().animate({
    					scrollTop: commentTop + 'px'
    				}, 300)
					})
				})
			}
			//	差评
			else {
				this.level = '1'
				
				//	初始化差评
				if (!this.isFirstInitBadComment) {
					return
				}

				this.commentMethod(this.goodComment.page, this.goodComment.pageSize).then(function (resp) {
					self.isFirstInitBadComment = false
					self.badComment.tootalItem = resp.result.totalItem
					//	初始化分页
					$('.hotel_detail_badcomment_pagination').pagination({
					    pageSize: 10,
					    total: self.badComment.tootalItem,
					    showJump: true	//	显示跳转页
					})
					//分页按钮点击事件
					.on("pageClicked", function (event, data) {
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')
			    	//	滚动定位
    				$('html, body').stop().animate({
    					scrollTop: commentTop + 'px'
    				}, 300)
					})
					//跳转按钮点击事件
					.on("jumpClicked", function (event, data) {
			    	console.log(data)
			    	let pageIndex = data.pageIndex + 1
			    	self.commentMethod(pageIndex.toString(), '10')
			    	//	滚动定位
    				$('html, body').stop().animate({
    					scrollTop: commentTop + 'px'
    				}, 300)
					})
				})
				
			}
		},
		//	搜索
		'reset-check': function (startDate, endDate) {
			this.checkInDate = startDate
			this.checkOutDate = endDate
			this.clearCheckHotelRoomList()
			this.HotelRoomType()
		},

		//	立即预订
		'to-order': function (msg) {
			//console.log(msg)
			let opt = {
				hotelId: msg.hotelId,
				hotelName: this.getHotelDetail.baseInfo.name,
				roomTypeId: msg.roomTypeId,
				pricePlanId: msg.pricePlanId,
				checkInDate: this.checkInDate,
				checkOutDate: this.checkOutDate,
				guestNum: msg.guestNum,
				totalFee: msg.totalFee,
				cityId: this.getHotelDetail.baseInfo.cityId,
				cityName: this.getHotelDetail.baseInfo.cityName,
				address: this.getHotelDetail.baseInfo.address,
				supplierType: msg.supplierType,
				serviceFee: 0,
				area: msg.area,
				floors: msg.floors,
				bedDesc: msg.bedDesc,
				name: this.getHotelDetail.baseInfo.name,
				titleName: msg.titleName,
				imgUrl: this.getHotelDetail.baseInfo.imgUrl,
				hotelPhone: this.getHotelDetail.baseInfo.phone
			}
			
			sessionStorage.setItem('hotelOrderInfoObj', JSON.stringify(opt))
			console.log(opt)

			this.$router.go({
				name: 'hotelpreorder',
				query: {
					star: this.getHotelDetail.baseInfo.star
				}
			})
		},

		//房型，设施，点评tab切换
		'view-type': function (index) {
				var top = 0
				if (index === 0) {
					top = this.scrollTop - 40
				} else if (index === 1) {
					top = $('.hotel_detail_other').offset().top - 41
				} else {
					top = $('.hotel_comment_head').offset().top - 82
				}

				if (!$('.hotel_detail_tab').hasClass('fixed')) {
					top = top - 53
				}
				
				var body = document.documentElement || document.body
				$('html, body').animate({
					scrollTop: top + 'px'
				}, 400)
				
		},

		//	滚动
		'on-scroll': function (top) {
			//console.log(top)
			let orderRoomTypeTop =  $('.hotel_detail_date_search').offset().top - 53
			let toolTop = $('.hotel_detail_other').offset().top - 53
			let commentTop = $('.hotel_comment_container').offset().top - 53
			let index = 0

			if (top >= orderRoomTypeTop && top < toolTop) {
				index = 0
			} else if (top >= toolTop && top < commentTop) {
				index = 1
			} else if (top >= commentTop) {
				index = 2
			}

			this.$broadcast('scroll-pos-switch-tap', index)
		},

		//	点击小图查看弹层大图
		'select-pic': function (index) {
			this.showBigPicBox = true
			this.selectPicIndex = index
		}
	}
}
</script>

<style>
@import url('../css/common.css');
.hotel_detail_container{
	width: 100%;
	background: #f8f8f8;
}
.hotel_detail_other{
	width: 916px;
	border: 1px solid #e3e3e3;
	background: #fff;
}
.hotel_instruction h2{
	padding: 0 18px;
	height: 40px;
	line-height: 40px;
	font-weight: normal;
	font-size: 15px;
}
.border_bottom{
	border-bottom: 1px solid #eee;
}
.hotel_instruction div.hotel_instruction_detail{
	padding: 20px 18px;
	line-height: 22px;
}

/* --- 酒店设施 --- */
.hotel_tool_title{
	width: 90px;
	margin-right: 40px;
}
.hotel_tool_content{
	width: 732px;
}
.hotel_instruction_detail li{
	margin-bottom: 20px;
}
.hotel_instruction_detail li:last-child{
	margin-bottom: 0;
}

/* --- 分页 --- */
.hotel_detail_pagination_container{
	padding: 30px 0;
	text-align: center;
	border-top: 1px solid #e3e3e3;
}
.hotel_detail_allcomment_pagination, .hotel_detail_goodcomment_pagination, .hotel_detail_midcomment_pagination, .hotel_detail_badcomment_pagination{
	display: inline-block;
}

</style>
