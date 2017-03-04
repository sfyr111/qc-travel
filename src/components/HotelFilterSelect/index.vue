<template>
	<!-- 复选框筛选 -->
	<div class="filter_search_container">
		<ul>
			<!-- 位置 -->
			<li class="clearfix border_t_none">
				<div class="filter_search_container_title fl">
					<span>位置</span>
					<span class="all-icon" :class="{'bg_blue': businessZoneSelectNum === -1 && administrativeRegionSelectNum === -1}" @click="posAll">全部</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul class="filter_search_pos clearfix">
						<li  :class="{'checked': posTabIndex
			=== 0}">
							<a href="javascript:;" @click="checkBusinessZone">
								商业区
								<i class="fa fa-angle-down" v-if="posTabIndex
			!== 0"></i>
								<i class="fa fa-angle-up" v-else></i>
							</a>
						</li>
						<li  :class="{'checked': posTabIndex === 1}">
							<a href="javascript:;"  @click="checkAdministrativeRegion">
								行政区
								<i class="fa fa-angle-down" v-if="posTabIndex
			!== 1"></i>
								<i class="fa fa-angle-up" v-else></i>
							</a>
						</li>
						<li class="none">
							火车站
							<i class="fa fa-angle-down"></i>
							<i class="fa fa-angle-up none"></i>
						</li>
						<li class="none">
							机场
							<i class="fa fa-angle-down"></i>
							<i class="fa fa-angle-up none"></i>
						</li>
						<li class="none">
							地铁
							<i class="fa fa-angle-down"></i>
							<i class="fa fa-angle-up none"></i>
						</li>
					</ul>
				</div>
			</li>
			<!-- 商业区 -->
			<li class="clearfix filter_search_business_zone" v-show="posTabIndex == 0">
				<div v-for="(index, item) in getHotelSearchBusinessZone">
					<a href="javascript:;"@click="selectBusinessZone(item.id, index, item.name)" :class="{ 'select': businessZoneSelectNum === index }">{{ item.name }}</a>
				</div>
			</li>

			<!-- 行政区 -->
			<li class="clearfix filter_search_business_zone"  v-show="posTabIndex === 1">
				<div v-for="(index, item) in getHotelSearchAdministrativeRegion">
					<a href="javascript:;" @click="selectAdministrativeRegion(item.id, index, item.name)" :class="{ 'select': administrativeRegionSelectNum === index }">{{ item.name }}</a>
				</div>
			</li>
			
			<!-- 房价 -->
			<li class="clearfix">
				<div class="filter_search_container_title fl">
					<span>房价</span>
					<span class="all-icon" :class="{'bg_blue': priceIndex === -1}" @click="priceAll">全部</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul>
						<li :class="{'selectedcondition': priceIndex === index}" v-for="(index, item) in price" @click="selectPrice($event, item.min, item.max, index)">
							<a href="javascript:;">
								{{ index === 0 ? item.max + '元以下' : (index === price.length - 1 ? item.min + '元以上' : item.min + '元&nbsp;-&nbsp;' + item.max + '元' ) }}
							</a>
						</li>
					</ul>
					<div class="custom-filter none">
						自定义
						<input type="text" class="start-price"/>—<input type="text" class="end-price"/>
						<input type="button" value="确定" />
					</div>
				</div>
			</li>

			<!-- 星级 -->
			<li class="clearfix">
				<div class="filter_search_container_title fl">
					<span>星级</span>
					<span class="all-icon" :class="{'bg_blue': starTabIndex === -1}" @click="starAll">全部</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul>
						<li v-for="(index, list) in star">
							<label>
								<input type="radio" name="star" v-model="starPicked" :value="list.num" @change="selectStar(starPicked, list.starLev, index)"/>
								<!-- 经济/客栈 -->
								{{ list.starLev }}

							</label>
						</li>
					</ul>
				</div>
			</li>
			<!-- 品牌 -->
			<!-- <li class="clearfix">
				<div class="filter_search_container_title fl">
					<span>品牌</span>
					<span class="all-icon">全部</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul class="clearfix">
						<li>
							<label>
								<input type="checkbox" />
								如家
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								汉庭
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								速8
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								锦江之星
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								维也纳
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								格林豪泰
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								布丁
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								香格里拉
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								希尔顿 
							</label>
						</li>
					</ul>
					<div class="more_brands blue" ms-controller="more_brands">
						<div ms-click="isShowMoreBrandsClick">
							更多品牌
							<i class="fa fa-caret-up none"  ms-visible="isShowMoreBrands"></i>
							<i class="fa fa-caret-down"   ms-visible="!isShowMoreBrands"></i>
						</div>
						<div class="more_brands_content bsizing border_blue none" ms-visible="isShowMoreBrands">
							<div class="more_brands_content_head">
			
								<span ms-click="closeMoreBrands">x</span>
							</div>
							<ul class="clearfix">
								<li>
										<label>
												<input type="checkbox" />
												雅高
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												锦江酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												铁思特连锁酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												铁思特连锁酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												雅高
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												锦江酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												雅高
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												锦江酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												雅高
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												锦江酒店
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												雅高
										</label>
								</li>
								<li>
										<label>
												<input type="checkbox" />
												锦江酒店
										</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</li> -->
			<!-- 设施 -->
			<!-- <li class="clearfix">
				<div class="filter_search_container_title fl">
					<span>品牌</span>
					<span class="all-icon">全部</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul class="clearfix">
						<li>
							<label>
								<input type="checkbox" />
								免费wifi
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								免费停车
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								健身房
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								免费接机
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								游泳池
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								餐厅
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								会议室
							</label>
						</li>
						<li>
							<label>
								<input type="checkbox" />
								商务中心
							</label>
						</li>
					</ul>
				</div>
			</li> -->
			<li class="clearfix selectedcondition_container" v-if="selectedcondition.length">
				<div class="filter_search_container_title fl">
					<span>已选条件</span>
				</div>
				<div class="fl filter_search_container_content">
					<ul class="clearfix">
						<li class="selectedcondition" v-for="(index, item) in selectedcondition">
							<a href="javascript:;">
								{{ item.type === 'price' ? item.text : item.name}}
								<em @click="removeSelectedcondition(index)">x</em>
							</a>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import $ from 'jquery'
import {
	hotelSearchBusinessZone,
	hotelSearchAdministrativeRegion,
	isInitHotelSearchBusinessZone,
	isInitHotelSearchAdministrativeRegion
} from '../../vuex/actions'
import {
	gethotelSearchCityId,
	getHotelSearchBusinessZone,
	getHotelSearchAdministrativeRegion,
	getIsInitHotelSearchBusinessZone,
	getIsInitHotelSearchAdministrativeRegion
} from '../../vuex/getters'
import configUrl from '../../data/configUrl'

export default {
	props: {
		selectedcondition: {
			type: Array
		}
	},
	vuex: {
		actions: {
			hotelSearchBusinessZone,
			hotelSearchAdministrativeRegion,
			isInitHotelSearchBusinessZone,
			isInitHotelSearchAdministrativeRegion
		},
		getters: {
			getIsInitHotelSearchBusinessZone,
			getIsInitHotelSearchAdministrativeRegion,
			gethotelSearchCityId,
			getHotelSearchBusinessZone,
			getHotelSearchAdministrativeRegion
		}
	},
	data: function () {
		return {
			filterSelectorArr: {
				address: {
					title: '位置',
					all: '全部',
					list: [
						'商业区',
						'行政区'
					]
				}
			},
			posTabIndex: -2,								//	商业区或行政区选择标志
			businessZoneSelectNum: -1,			//	商业区选择索引
			administrativeRegionSelectNum: -1,		//	行政区选择索引
			priceIndex: -1,												//	价钱筛选索引
			price: [
				{
					min: '',
					max: 150
				},
				{
					min: 150,
					max: 300
				},
				{
					min: 301,
					max: 450
				},
				{
					min: 451,
					max: 600
				},
				{
					min: 600,
					max: 9999
				},
			],																	//	价格
			star: [
				{
					num: '10',
					starLev: '一星'
				},
				{
					num: '20',
					starLev: '二星'
				},
				{
					num: '30',
					starLev: '三星'
				},
				{
					num: '40',
					starLev: '四星'
				},
				{
					num: '50',
					starLev: '五星'
				}
			],																		//	星级
			starTabIndex: -1, 											//	星级索引
			starPicked: ''													//	星级勾选
		}
	},
	methods: {
		//	商业区查询
		checkBusinessZone: function () {
			
			if (this.posTabIndex === 0) {
				this.posTabIndex = -1
			} else {
				if (!this.getIsInitHotelSearchBusinessZone) {
					this.posTabIndex = 0
				}
			}
			//	2次选择城市相同退出
			if (!this.getIsInitHotelSearchBusinessZone) {
				return
			}
			let self = this
			//	初始化商业区
			let opt = {
				type: 'get',
				data: {
					cityId: this.gethotelSearchCityId,
					areaType: 2						
				},
				url: configUrl.hotelSearchBusinessZone.dataUrl,
				success: function (resp) {
					self.isInitHotelSearchBusinessZone(false)
					self.posTabIndex = 0
					console.log(resp)
				},
				fail: function (resp) {
					console.log(resp)
					alert('获取商业区失败')
				}
			}

			this.hotelSearchBusinessZone(opt)
		},

		//	行政区查询
		checkAdministrativeRegion: function () {
			if (this.posTabIndex === 1) {
				this.posTabIndex = -1
			} else {
				if (!this.getIsInitHotelSearchAdministrativeRegion) {
					this.posTabIndex = 1
				}
			}
			//	2次选择城市相同退出
			if (!this.getIsInitHotelSearchAdministrativeRegion) {
				return
			}
			let self = this
			//	初始化商业区
			let opt = {
				type: 'get',
				data: {
					cityId: this.gethotelSearchCityId,
					areaType: 1						
				},
				url: configUrl.hotelSearchAdministrativeRegion.dataUrl,
				success: function (resp) {
					self.isInitHotelSearchAdministrativeRegion(false)
					self.posTabIndex = 1
					console.log(resp)
				},
				fail: function (resp) {
					console.log(resp)
					alert('获取行政区失败')
				}
			}
			console.log(opt.data)
			this.hotelSearchAdministrativeRegion(opt)
		},

		//	选择商业区
		selectBusinessZone: function (id, index, name) {
			if (this.businessZoneSelectNum === index) {
				return
			}
			this.businessZoneSelectNum = index
			this.$dispatch('select-business-zone', id, name)
		},

		//	选择行政区
		selectAdministrativeRegion: function (id, index, name) {
			if (this.administrativeRegionSelectNum === index) {
				return
			}
			this.administrativeRegionSelectNum = index
			this.$dispatch('select-admin-reg', id, name)
		},

		//	行政区商业区全部
		posAll: function () {
			if (this.posTabIndex === -2) {
				return
			}
			this.posTabIndex = -2
			this.businessZoneSelectNum = -1
			this.administrativeRegionSelectNum = -1
			this.$dispatch('pos-all')
		},

		//	删除已选条件
		removeSelectedcondition: function (index) {
			this.$dispatch('remove-selectedcondition', index)
		},

		//	价钱筛选
		selectPrice: function (e, min, max, index) {
			if (this.priceIndex === index) {
				return
			}
			var text = $(e.target).text()
			this.priceIndex = index
			let price = {
				min: min,
				max: max,
				text: text
			}
			this.$dispatch('select-price', price)
		},

		//	价钱筛选所有
		priceAll: function () {
			if (this.priceIndex === -1) {
				return
			}
			this.priceIndex = -1
			this.$dispatch('price-all')
		},

		//	选择星级
		selectStar: function (starNum, starLev, index) {
			this.starTabIndex = index
			//console.log(starNum, starLev)
			this.$dispatch('select-star', starNum, starLev)
		},

		//	星级全部
		starAll: function () {
			this.starTabIndex = -1
			this.starPicked = ''
			this.$dispatch('star-all')
		}

	},
	events: {
		//	删除价钱筛选
		'remove-price': function () {
			this.priceIndex = -1
		},

		//	删除商业区筛选
		'remove-business-zone': function () {
			this.businessZoneSelectNum = -1
		},

		//	删除行政区筛选
		'remove-admin-region': function () {
			this.administrativeRegionSelectNum = -1
		},

		//删除星级筛选
		'remove-star': function () {
			console.log(22)
			this.starTabIndex = -1
			this.starPicked = ''
		},
		//	关闭行政区，商业区
		'hide-business-region': function () {
			this.posTabIndex = -2
		}
	}
}
</script>

<style>
/* --- 复选框  --- */
.filter_search_container{
	width: 1170px;
	border: 1px solid #e6e6e6;
	border-top: 0;
	padding: 0 14px;
	color: #666;
	margin: 0 auto;
}
.filter_search_container li{
	min-height: 50px;
	border-top: 1px solid #e6e6e6;
	line-height: 50px;
}

.all-icon{
	width: 38px;
	height: 18px;
	line-height: 18px;
	text-align: center;
	position: absolute;
	top: 50%;
	right: 0;
	margin-top: -9px;
	cursor: pointer;
}
.bg_blue{
	background: #dd1827;
	color: #fff;
}
.filter_search_container_title{
	width: 94px;
	height: 50px;
	position: relative;
}
.filter_search_container_content{
	width: 1029px;
	padding-left: 37px;
	position: relative;
}
.filter_search_container_content li{
	float: left;
	/* padding: 0 5px; */
	line-height: 50px;
	width: 96px;
	margin-left: 6px;
	border-top: none;
	cursor: pointer;
}
.filter_search_container_content li.selectedcondition a{
	padding: 1px 5px;
	background: #dd1827;
	color: #fff;
}
.filter_search_container_content li.selectedcondition a em{
	position: relative;
	top: -2px;
}

.filter_search_container_content li
.filter_search_container_content .filter_search_pos li{
	width: 74px;
	text-align: center;
}
.filter_search_container_content .filter_search_pos{
	margin-left: -15px;
}
.filter_search_container_content li input{
	vertical-align: middle;
}
.filter_search_container .custom-filter{
	line-height: 30px;
	color: #333;
	position: absolute;
	top: 50%;
	margin-top: -16px;
	right: 62px;
}
.custom-filter input[type="text"]{
	width: 62px;
	height: 28px;
	line-height: 28px;
	border: 1px solid #ddd;
}
.custom-filter input[type="button"]{
	padding: 0 7px;
	height: 24px;
	background: #7f8e9e;
	vertical-align: middle;
	color: #fff;
	border-radius: 3px;
	margin-top: -3px;
	margin-left: 5px;
}
.start-price, .end-price{
	margin: 0 5px;
}
.filter_search_container li.border_t_none{
	border-top: none;
}
.more_brands{
	width: 76px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	position: absolute;
	right: 0;
	top: 0;
	cursor: pointer;
}

/* --- 酒店更多品牌 --- */
.more_brands_content{
	width: 652px;
	padding: 0 54px 10px 40px;
	position: absolute;
	top: 38px;
	right: 5px;
	z-index: 100;
	background: #fff;
	border-radius: 3px;
}
.more_brands_content li{
	float: left;
	width: 112px;
	line-height: 28px;
	height: 28px;
	text-align: left;
	color: #666;
	margin-left: 20px;
	margin-bottom: 15px;
}
.more_brands_content_head{
	width: 100%;
	line-height: 28px;
	height: 28px;
	position: relative;
}
.more_brands_content_head span{
	position: absolute;
	top: 0;
	right: -54px;
	width: 38px;
	text-align: center;
	font-size: 16px;
}
.filter_search_container li.filter_search_business_zone{
	background: #f6f6f6;
	padding: 0 23px;
}
.filter_search_container li.filter_search_business_zone div{
	width: 180px;
	/* margin-right: 39px; */
	float: left;
	line-height: 30px;
	margin-right: 44px;
}
.filter_search_container li.filter_search_business_zone a{
	padding: 5px;
}
.select{
	background: #dd1827;
	color: #fff;
}
.select:hover{
	color: #fff;
}
.selectedcondition_container .filter_search_container_content{
	padding-left: 0;
}
.selectedcondition_container .filter_search_container_title{
	width: 60px;
}
.selectedcondition_container .filter_search_container_content li{
	width: auto;
	margin-left: 0;
	margin-right: 15px;
}
.filter_search_container_content .filter_search_pos li{
	margin-left: 0;
	text-align: center;
}
.filter_search_container_content .filter_search_pos li.checked{
	border-bottom: 1px solid #dd1827;
}
.filter_search_container_content .filter_search_pos li.checked a{
	color: #dd1827;
}
</style>