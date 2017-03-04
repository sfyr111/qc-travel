<template>
	<div @click="documentClick">
		<q-c-head :show.sync='isManager' :head-name.sync='headName'></q-c-head>
		<!-- 搜索 -->
		<div class="hotel_search_container">
			<div class="hotel_search_wrapper clearfix">

				<!-- 目的地选择 -->
				<hotel-search-destination :hoteldestination="getHotelDestination" :hotelcityname="hotelCityName"></hotel-search-destination>

				<div class="check_in_time_start fl marginR10"  @click.stop="open($event,'picker1')">
					<label>
						入住：
						<input class="bsizing input" size="50" type="text" v-model="calendar.items.picker1.value" placeholder="选择日期" readonly="true" />
						<i class="fa fa-map-marker"></i>
					</label>
				</div>
				<div class="check_in_time_end fl marginR10" @click.stop="open($event,'picker2')">
					<label for="myDate">
						离店：
						<input class="bsizing input"  size="50" type="text" v-model="calendar.items.picker2.value" readonly="true">
						<i class="fa fa-map-marker"></i>
				</div>
				
				<!-- 日历组件 -->
				<calendar
				    :show.sync="calendar.show"
				    :type="calendar.type"
				    :value.sync="calendar.value" 
				    :x="calendar.x" 
				    :y="calendar.y" 
				    :begin.sync="calendar.begin" 
				    :end.sync="calendar.end" 
				    :range.sync="calendar.range"
				    :weeks="calendar.weeks"
				    :months="calendar.months"
				    :sep.sync="calendar.sep">
				</calendar>

				<div class="address_title_search fl">
					<label>
						<input type="text" class="bsizing silver"  placeholder="酒店名称" @blur="hotelName"/>
					</label>
				</div>

				<input type="button" value="搜索" class="search-btn fl" @click="search" v-if="!isShowSearchingBtn"/>
				<input type="button" value="正在搜索" class="search-btn fl" id="searching_btn" v-else/>
			</div>
		</div>
		
		<!-- 搜索条件 -->
		<hotel-filter-select :selectedcondition="selectedCondition"></hotel-filter-select>

		<!-- 酒店列表 -->
		<div class="hotel_search_list_container">
			<hotel-search-list-sort :num="getHotelSearchList.totalItem"></hotel-search-list-sort>

			<hotel-search-list :list="getHotelSearchList"></hotel-search-list>

			<!-- 分页 -->
			<Pagation v-show="isShowPagePagination"></Pagation>
		</div>

		<q-c-footer></q-c-footer> 
	</div>
</template>

<script>
import 'babel-polyfill'
import $ from 'jquery'

import { QCHead, QCFooter, HotelFilterSelect, HotelSearchDestination, calendar, HotelSearchListSort, HotelSearchList, Pagation } from '../components'
//import DatePicker from 'vue-datepicker-simple'
import { setHotelSearchList, hotelDestination, clearHotelSearchList, hotelSearchCityId } from '../vuex/actions'
import { getHotelSearchList, getHotelDestination, gethotelSearchCityId } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'

export default {
	vuex: {
		actions: {
			setHotelSearchList,
			hotelDestination,
			clearHotelSearchList,
			hotelSearchCityId
		},
		getters: {
			getHotelSearchList,
			getHotelDestination,
			gethotelSearchCityId
		}
	},
	data: function () {
		return {
			headName: "查询酒店",
			isManager: false,      //是否为管理中心
			date: '',// 默认yyyy-mm-dd
			isFistGetHotelDestination: true,   		//	是否第一次获取目的地
			calendar:{
        show:false,
        x:0,
        y:0,
        begin: '',
        end:"",
        sep:"-",
        weeks:['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        value: '',
        items:{
            // 单选模式
            picker1:{
                type:"date",
                begin: util.setDate(0),
                end:"",
                value: util.setDate(0)
            },
                
            // 2个日期模式
            picker2:{
              type:"date",
              value: util.setDate(1),
              begin: util.setDate(1),
              end:""
            }
        }
			},
			cityId: '',			//城市id
			checkInDate: util.setDate(0), //	酒店入住时间
			checkOutDate: util.setDate(1),	// 酒店离店时间
			cbdId: '',												//	商业区id
			disId: '',											//	行政区
			minPrice: '',										//	最低价
			maxPrice: '',										//	最高价
			selectedCondition: [],						//	已选条件
			star: '',												//	星级
			page: 1,
			pageSize: 10,
			hotelSortType: 'sort_hot_level_desc',
			timer: null,    								//	切换条件停下500毫秒请求接口
			name: '',												//	酒店名称
			isShowPagePagination: false,     //	是否显示分页
			hotelCityName: '北京',
			isShowSearchingBtn: false,    		//	是否显示正在搜索中
			preUrl: process.env.NODE_ENV === 'development' ? '/?#/' : '/security/index.jsp?#/'
		}
	},
	created () {
		let query = this.$route.query
				this.checkInDate = query.checkInDate
				this.checkOutDate = query.checkOutDate
				this.calendar.items.picker1.begin = query.checkInDate
				this.calendar.items.picker1.value = query.checkInDate
				this.calendar.items.picker2.begin = query.checkOutDate
				this.calendar.items.picker2.value = query.checkOutDate
				this.hotelCityName = query.hotelCityName
				this.cityId = query.hotelCityId
				// 存储城市id
				this.hotelSearchCityId(this.cityId)
	},
	ready () {
		//	初始化酒店列表
		this.checkHotelList()
	},
	components: {
		QCHead,
		QCFooter,
		HotelFilterSelect,
		HotelSearchDestination,
		calendar,
		HotelSearchListSort,
		HotelSearchList,
		Pagation
	},
	watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value = value
    }
  },
	methods: {
		getDemoData: function () {
			console.log(this.getDataDemo)
		},
		//	点击空白关闭
		documentClick: function () {
			this.$broadcast('document-click')
		},
		// 打开显示选择器
    open (e,type) {
        // 设置类型
        this.calendar.picker = type
        this.calendar.type = this.calendar.items[type].type
        this.calendar.range = this.calendar.items[type].range
        this.calendar.begin = this.calendar.items[type].begin
        this.calendar.end = this.calendar.items[type].end
        this.calendar.value = this.calendar.items[type].value
        // 可不用写
        this.calendar.sep = this.calendar.sep
        this.calendar.weeks = this.calendar.weeks
        this.calendar.months = this.calendar.months

        this.calendar.show = true
        var $el = $(e.target).closest('div')
        var h = parseInt($el.css('height').replace('px'))
        this.calendar.x = $el.offset().left
        this.calendar.y = $el.offset().top + 8 + h
        this.$broadcast('hide-select-destination', false)
    },
    //	查询酒店列表
    checkHotelList: function (isInit) {
    	var dd = $.Deferred()
    	let self = this
    	this.isShowPagePagination = false
    	let opt = {
    		type: 'get',
    		data: {
    			cityId: this.cityId,
    			checkInDate: this.checkInDate,
    			checkOutDate: this.checkOutDate,
    			minPrice: this.minPrice,
    			maxPrice: this.maxPrice,
    			star: this.star,
    			cbdId: this.cbdId,
    			disId: this.disId,
    			page: this.page,
    			pageSize: this.pageSize,
    			hotelSortType: this.hotelSortType,
    			name: this.name
    		},
    		url: configUrl.hotelSearchList.dataUrl,
    		success: function (resp) {
    			self.isShowPagePagination = true
    			var totalLimit = resp.result.totalItem
    			self.$broadcast('reload-hotel-list', totalLimit, isInit)
    			dd.resolve(resp)
    		},
    		fail: function (resp) {
    			console.log(resp)
    			console.log('查询失败，请稍后再试！')
    			dd.reject(resp)
    		}
    	}
    	this.clearHotelSearchList()
    	this.setHotelSearchList(opt)
    	return dd.promise()
    },
    //	酒店名称
    hotelName: function (e) {
    	console.log(e.target.value)
    	this.name = e.target.value
    },
    //	搜索
    search: function () {
    	let self = this
    	this.isShowSearchingBtn = true
    	this.page = 1
    	this.checkHotelList(true).then(function () {
    		self.isShowSearchingBtn = false
    	}, function () {
    		self.isShowSearchingBtn = false
    	})
    }
	},
	events: {
		//	酒店搜索目的地
		'select-address': function () {
			//	关闭选择时间
			this.calendar.show = false
			if (!this.isFistGetHotelDestination) {
				return false
			}
			let self = this
			let opt = {
				type: 'post',
				data: {},
				url: configUrl.hotelDestination.dataUrl,
				success: function (resp) {
					console.log('成功')
					self.isFistGetHotelDestination = false
				},
				fail: function (resp) {
					console.log(resp)
				}
			}

			this.hotelDestination(opt)
		},

		//	选择城市
		'select-city': function (id, name) {
			//console.log(name)
			this.cityId = id
			this.page = 1
			this.hotelCityName = name
			let url = window.location.href.toString()
			let newVal = util.replaceParamVal(url, 'hotelCityName', this.hotelCityName)
			newVal = util.replaceParamVal(newVal, 'hotelCityId', this.cityId)
			console.log(newVal)
			window.history.replaceState(null, '', newVal)
			//	关闭行政区和商业区选择
			this.$broadcast('hide-business-region')
			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	日历选择完日期
		'select-date-confirm': function (msg) {
			//	获取当前是哪个时间
			var obj = this.calendar.picker
			//	选择开始时间 设置结束时间
			if (obj === 'picker1') {
				// 如果开始时间比结束日期大 则设置结束日期大于开始日期1天
				var startDate = util.selectDateFormat(msg, '-')
				var endDate = util.selectDateFormat(this.calendar.items.picker2.value, '-')
				if (+new Date(startDate) >= +new Date(endDate)) {
					this.calendar.items.picker2.value = util.setDate(1, startDate)
					this.checkOutDate = this.calendar.items.picker2.value
				}
				this.calendar.items.picker2.begin = util.setDate(1, startDate)
				this.checkInDate = msg
			} else {
				this.checkOutDate = msg
			}
		},

		//	选择商业区
		'select-business-zone': function (id, name) {
			let opt = {
					type: 'cbdId',
					id: id,
					name: name
			}
			var self = this

			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'cbdId') {
					self.selectedCondition.splice(index, 1)
				}
			})
			this.selectedCondition.push(opt)
			this.cbdId = id
			this.page = 1

			//console.log(this.cbdId)
			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	选择行政区
		'select-admin-reg': function (id, name) {
			console.log(id)
			let opt = {
				type: 'disId',
				id: id,
				name: name
			}
			var self = this
			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'disId') {
					self.selectedCondition.splice(index, 1)
				}
			})
			this.selectedCondition.push(opt)
			this.disId = id
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	行政区商业区全部
		'pos-all': function () {
			for (var i = 0, flag = true, len = this.selectedCondition.length;i < len; flag ? i ++ : i) {
				var item = this.selectedCondition[i]
				if (!item) {
					break
				}
				if (item.type === 'disId'|| item.type === 'cbdId') {
					this.selectedCondition.splice(i, 1)
					flag = false
				} else {
					flag = true
				}
			}
			
			this.cbdId = ''
			this.disId = ''
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	删除已选条件
		'remove-selectedcondition': function (index) {
			let type = this.selectedCondition[index].type
			switch (type) {
				//	删除商业区筛选
				case 'cbdId':
					this.cbdId = ''
					this.$broadcast('remove-business-zone')
					break;

				//	删除行政区筛选
				case 'disId':
					this.disId = ''
					this.$broadcast('remove-admin-region')
					break;

				//	删除价格筛选
				case 'price':
					this.minPrice = ''
					this.maxPrice = ''
					this.$broadcast('remove-price')
					break;

				//	删除星级筛选
				default:
					this.star = ''
					this.$broadcast('remove-star')
					break;
			}
			this.selectedCondition.splice(index, 1)
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	价钱筛选
		'select-price': function (msg) {
			var self = this
			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'price') {
					self.selectedCondition.splice(index, 1)
				}
			})
			let opt = {
				type: 'price',
				min: msg.min,
				max: msg.max,
				text: msg.text
			}
			this.selectedCondition.push(opt)
			this.minPrice = msg.min
			this.maxPrice = msg.max
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	价钱筛选全部
		'price-all': function () {
			var self = this
			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'price') {
					self.selectedCondition.splice(index, 1)
				}
			})
			this.minPrice = ''
			this.maxPrice = ''
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	选择星级
		'select-star': function (starNum, starLev) {
			var self = this

			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'star') {
					self.selectedCondition.splice(index, 1)
				}
			})

			let opt = {
				type: 'star',
				id: starNum,
				name: starLev
			}

			this.selectedCondition.push(opt)
			this.star = starNum
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	星级全部
		'star-all': function () {
			var self = this

			this.selectedCondition.forEach(function (val, index) {
				if (val.type === 'star') {
					self.selectedCondition.splice(index, 1)
				}
			})
			this.star = ''
			this.page = 1
			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	分页点击页码
		'page-click': function (data) {
			console.log(data)
			this.page = data.pageIndex + 1
/*
			let url = window.location.href.toString()
			let newVal = url + '&pageIndex=' + data.pageIndex
			console.log(newVal)
			window.history.replaceState(null, '', newVal)*/

			//	查询酒店列表
			this.checkHotelList(false)
		},

		//	排序
		'hotel-list-sort': function (type) {
			this.hotelSortType = type
			console.log(this.hotelSortType)
			this.page = 1

			//	查询酒店列表
			this.checkHotelList(true)
		},

		//	酒店详情
		'to-detail': function (hotelId, minPrice) {
			var rootPath = util.getRootPath()
			var params = [
				this.preUrl + 'hoteldetail?hotelId=' + hotelId,
				'&checkInDate=' + this.checkInDate,
				'&checkOutDate=' + this.checkOutDate,
				'&minPrice=' + minPrice
			].join('')

			window.open(rootPath + params)
			
			/*this.$router.go({
				name: 'hoteldetail',
				query: {
					hotelId: hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate,
					minPrice: minPrice
				}
			})*/
		},

		//	跳转酒店详情评论
		'to-comment': function (hotelId, minPrice) {
			var rootPath = util.getRootPath()
			var params = [
				this.preUrl + 'hoteldetail?hotelId=' + hotelId,
				'&checkInDate=' + this.checkInDate,
				'&checkOutDate=' + this.checkOutDate,
				'&minPrice=' + minPrice,
				'&toComment=true'
			].join('')

			window.open(rootPath + params)
			/*this.$router.go({
				name: 'hoteldetail',
				query: {
					hotelId: hotelId,
					checkInDate: this.checkInDate,
					checkOutDate: this.checkOutDate,
					minPrice: minPrice,
					toComment: true
				}
			})*/
		}
	}
}
</script>

<style>
@import url('../css/common.css');
@import url('../css/hotelSearch.css');
@import url('../css/mricode.pagination.css');
.hotel_search_wrapper div.date-select-container{
	border: none;
	margin-right: 0;
}
</style>