<template>
<div @click="documentClick">
<q-c-head :show.sync='isManager' :head-name.sync='headName'></q-c-head>
	<div class="air_search_container">
	    <div class="air_search_wrapper clearfix">
	        <div class="type fl">
	            <label>
	                <input type="radio" class="radio" name="tripType" value="OW" v-model="tripType" :checked="tripType == 'OW'" @click="checkedOW()">单程
	            </label>
	            <label>
	                <input type="radio" class="radio" name="tripType" value="RT" v-model="tripType" :checked="tripType == 'RT'">返程
	            </label>
	        </div>
	        <div class="address fl">
	            <label @click.stop="openCity($event,'cityDep')">
	                <span>从</span>
	                <input type="text" v-model="airCityData.item.cityDep.value.cityName" class="bsizing" @input.stop="getCity($event, airCityData.item.cityDep.value.cityName, 'dep') | debounce 300"/>
	                <i class="fa fa-map-marker"></i>
	            </label>
	        </div>
	        <div class="address fl">
	            <label @click.stop="openCity($event,'cityArr')">
	                <span>到</span>
	                <input type="text" v-model="airCityData.item.cityArr.value.cityName" class="bsizing" @input.stop="getCity($event, airCityData.item.cityArr.value.cityName, 'arr') | debounce 300"/>
	                <i class="fa fa-map-marker"></i>
	            </label>
	        </div>
	        <div class="check_in_time_start fl">
	            <label @click.stop="open($event,'picker1')">
	                <span>出发</span>
	                <input type="text" readonly="true" v-model="calendars.items.picker1.value" class="bsizing"/>
	                <i class="fa fa-calendar"></i>
	            </label>
	        </div>
	        <div class="check_in_time_end fl" :class="{'disabled': tripType == 'OW'}">
	            <label @click.stop="open($event,'picker2')">
	                <span>返程</span>
	                <input type="text" v-model="calendars.items.picker2.value" readonly="true" class="bsizing"/>
	                <i class="fa fa-calendar"></i>
	            </label>
	        </div>
	        <input v-if="!btnHasUsed" type="button" @click="searchSubmit(true)" value="搜索" class="search-btn fl"/>
            <input v-if="btnHasUsed" type="button" value="正在努力加载中..." class="search-btn fl btnHasUsed"/>
	    </div>
	    <calendar
            :show.sync="calendars.showDatePicker"
            :value.sync="calendars.value"
            :x="calendars.x"
            :y="calendars.y"
            :begin.sync="calendars.begin"
            :end.sync="calendars.end"
            :range.sync="calendars.range"
            :weeks="calendars.weeks"
            :months="calendars.months"
            :type.sync="type"
            :sep.sync="sep"></calendar>
        <air-city 
            :citys="getAirCity"
            :x.sync="airCityData.x"
            :y.sync="airCityData.y"
            :value.sync="airCityData.value"
            :show.sync="airCityData.showCity"
            ></air-city>
        <city-query :is-show-input-city="isShowInputCity" :x="x" :y="y"></city-query>
        
        <air-search-list 
        :air-list="getAirSearchResult"
        :is-show-page-pagination.sync="isShowPagePagination"
        :is-loading.sync="isLoading"
        :show-tips.sync="showTips"
        :city-dep="airCityData.item.cityDep.value.cityName"
        :city-arr="airCityData.item.cityArr.value.cityName"
        :time-dep="showStartDate"
        :trip-type="tripType"
        :search-error="searchError"
        :is-check-dep.sync="isCheckDep"
        ></air-search-list>	    
	</div>
	<q-c-footer></q-c-footer>
	</div>
</template>
<script>
import 'babel-polyfill';
import $ from 'jquery'
import { QCHead, QCFooter, calendar, AirCity, AirSearchList, CityQuery } from '../components'
import { airSearchResult, airCity, clearAirSearchList } from '../vuex/actions'
import { getAirSearchResult, getAirCity } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'

export default {
	vuex: {
		actions: {
			airSearchResult,
			airCity,
			clearAirSearchList			
		},
		getters: {
			getAirSearchResult,
			getAirCity			
		}
	},
	components: {
		QCHead,
		QCFooter,
		calendar,
		AirCity,
        AirSearchList,
        CityQuery    
	},
	data: function() {
		return {
            headName: "查询机票",
			isManager: false,      //是否为管理中心
			tripType: "OW",			//类型，单程还是往返
			depCity: "北京",
			arrCity: "上海",
			pageNo: 1,
			pageSize: 20,
			sortType: '1',
			isCheckDep: false,      //是否已选去程
			type:"date",
            sep:"-",
            showTips: false,
            isInit: true,
            x: 0,
            y: 0,
            ticketTurn: '',
            ticketChange: '',
            ticketBack: '',
            imgPrifx: '',
            sourceId: "",
            searchError: false,
            isLoading: false,
            queryuuid: '',
            retType: '1',
            isFinished: 0,
            isQuering: false,
            btnHasUsed: false, // 节流
            isShowPagePagination: false, // 是否显示分页
            isShowInputCity: false, // 是否展示按字符串匹配
            cityType: 'arr',
            airCityData: {
            	x: 0,
            	y: 0,
            	showCity: false,
            	value: {
            		cityName: '',
            		cityCode: ''
            	},
            	cityType: '',
            	item: {
	            	cityDep:{
	            		value: {
	            			cityName: '',
	            			cityCode: ''
            			}
	            	},
	            	cityArr:{
	            		value: {
	            			cityName: '',
	            			cityCode: ''
            			}
	            	}
	            }
            },
			calendars: {
                showDatePicker: false,
                x:800,
                y:300,
                picker: '',
                value:"",
                begin:"",
                end:"",
                range:false,
                weeks:['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                items: {
                    picker1:{
                        type:"date",
                        begin: util.setDate(0),
                        end:"",
                        value: util.setDate(0)
                    },
                    picker2:{
                        type:"date",
                        begin: util.setDate(1),
                        end:"",
                        value: util.setDate(1)
                    }
                }
            },
            startDate: '',          //  开始日期
            endDate: '',             //  结束日期
            showStartDate: '',         //    航班显示预订日期
            isCheckDep: false,
		}
	},
	created () {
		// 接收路由传递过来的参数，初始化页面
		this.airCityData.item.cityDep.value.cityName = this.$route.query.depCity || "深圳"
		this.airCityData.item.cityArr.value.cityName = this.$route.query.arrCity || "北京"
		this.calendars.items.picker1.value = this.$route.query.depDate
		this.calendars.items.picker2.value = this.$route.query.arrDate
        this.startDate = this.calendars.items.picker1.value
        this.endDate = this.calendars.items.picker2.value
        this.showStartDate = this.startDate
		this.tripType = this.$route.query.tripType
        this.imgPrifx = configUrl.staticPath

		this.searchSubmit()
		//	初始化机票城市数据
		let airCityOpt = {
			type: 'post',
			data: {},
			url: configUrl.airCity.dataUrl,
			success: function (resp) {
				console.log('成功')
			},
			fail: function (resp) {
				console.log('失败')
				console.log(resp)
			}
		}
		this.airCity(airCityOpt)
	},
	watch:{
        'calendars.value': function (value) {
            this.calendars.items[this.calendars.picker].value=value

            if (this.calendars.picker == 'picker1') {
                // 如果开始时间比结束日期大 则设置结束日期大于开始日期1天
                var startDate = util.selectDateFormat(this.calendars.items.picker1.value, '-')
                var endDate = util.selectDateFormat(this.calendars.items.picker2.value, '-')
                if (+new Date(startDate) >= +new Date(endDate)) {
                    this.calendars.items.picker2.value = util.setDate(1, startDate)
                    this.calendars.value = this.calendars.items.picker1.value
                    this.calendars.items.picker2.begin = util.setDate(1, startDate)
                }
            }

            this.startDate = this.calendars.items.picker1.value
            this.endDate = this.calendars.items.picker2.value
        },
        'airCityData.value.cityName': function (value) {
            this.airCityData.item[this.airCityData.cityType].value.cityName=value
        }
    },
	methods: {		
		searchSubmit: function (isInit, sourceId, cityDep, cityArr) {
			// if (!this.getAirSearchResult.list) {
			// 	return
			// }
            if (this.btnHasUsed) {
                return
            }
            //  如果是点击搜索初始化
            if (isInit) {
                this.showStartDate = this.calendars.items.picker1.value
                this.startDate = this.calendars.items.picker1.value
                this.isCheckDep = false
                console.log('初始化')
                this.clearAirSearchList()
            }
            // var def = $.Deferred()
            if (cityDep) {
                this.airCityData.item.cityDep.value.cityName = cityDep
            }
            if (cityArr) {
                this.airCityData.item.cityArr.value.cityName = cityArr
            }
            this.btnHasUsed = true
			this.clearAirSearchList()
			this.isShowPagePagination = false
            this.isLoading = true
            this.searchError = false
            this.isFinished = 0;

            this.queryFlight(isInit)

		},
        queryFlight (isInit) {
            var self = this
            let data = {
                sourceId: self.sourceId || "",
                arrCity: this.airCityData.item.cityArr.value.cityName,
                arrDate: '',
                depCity: this.airCityData.item.cityDep.value.cityName,
                depDate: this.startDate,
                sortType: this.sortType,
                // pageSize: this.pageSize,
                // pageNo: this.pageNo,
                queryuuid: this.queryuuid,
                retType: this.retType
            }

            let opt = {
                type: 'post',
                data: data,
                async: false,
                url: configUrl.airSearchResult.dataUrl,
                success: function (resp) {     
                    var totalLimit = resp.result.rowCount
                    // var pageSize = self.pageSize
                    // self.$broadcast('reload-air-list', totalLimit, pageSize, isInit)    
                    self.isShowPagePagination = false    
                    self.queryuuid = resp.result.queryuuid
                    if (resp.result.isFinished === 0) {
                        setTimeout(function() {
                            self.queryFlight(false)
                        }, 1000);                        
                    }
                    if (resp.result.isFinished === 1) {
                        self.isFinished = resp.result.isFinished

                        self.btnHasUsed = false
                        self.isLoading = false
                    }
                },
                fail: function (resp) {    
                    console.log('1'+resp.resultMessage)
                    self.isLoading = false
                    self.searchError = true
                    self.btnHasUsed = false
                    // def.reject()
                }
            }
            this.airSearchResult(opt)
        },
		checkedOW: function () {
			this.isCheckDep = false;
		},
		open(e, type) {
            e.stopPropagation();
            if (type == 'picker2' && this.tripType == 'OW') {// 单程点击到达日期直接返回
                return
            }
            // 设置类型
            this.calendars.picker = type
            this.type=this.calendars.items[type].type
            this.calendars.range=this.calendars.items[type].range
            this.calendars.begin=this.calendars.items[type].begin
            this.calendars.end=this.calendars.items[type].end
            this.calendars.value = this.calendars.items[type].value
            this.calendars.sep = this.calendars.items[type].sep

            this.calendars.showDatePicker = true
            this.airCityData.showCity = false
            this.isShowInputCity = false
            this.calendars.x = e.target.offsetLeft - 44
            this.calendars.y = e.target.offsetTop + 40
        },        
        openCity: function (e, type) {
        	this.airCityData.cityType = type
        	this.airCityData.value.cityName = this.airCityData.item[type].value.cityName
        	this.airCityData.value.cityCode = this.airCityData.item[type].value.cityCode

        	this.airCityData.x = e.target.offsetLeft - 44
        	this.airCityData.y = e.target.offsetTop + 40
        	this.airCityData.showCity = true
        	this.calendars.showDatePicker = false
            this.isShowInputCity = false
        },
        //	点击空白关闭
		documentClick: function () {
            this.airCityData.showCity = false
            this.isShowInputCity = false
			this.$broadcast('document-click')
            if (!this.airCityData.item.cityDep.value.cityName) {
                this.airCityData.item.cityDep.value.cityName = this.$route.query.depCity || "深圳"                
            }
            if (!this.airCityData.item.cityArr.value.cityName) {
                this.airCityData.item.cityArr.value.cityName = this.$route.query.arrCity || "北京"
            }
		},	
        // 根据字符串查城市
        getCity: function (e, str, type) {
            this.cityType=type
            this.airCityData.showCity = false
            this.isShowInputCity = true
            this.x = e.target.offsetLeft - 44
            this.y = e.target.offsetTop + 34
            this.$broadcast('get-city', str)
        }
	},
	events: {
		//	分页点击页码
		'page-click': function (data) {
			this.pageNo = data.pageIndex + 1
			//	查询酒店列表
			this.searchSubmit(false)
		},
        //  重新搜索
        'search-submit': function (isInit, sourceId, cityDep, cityArr) {
            let self = this
            console.log(isInit)
            this.searchSubmit(isInit, sourceId, cityDep, cityArr)
        },
        //  选定去程
        'search-to-flight': function (isInit, sourceId, cityDep, cityArr) {
            let self = this
            this.startDate = this.calendars.items.picker2.value
            this.sourceId = sourceId
            this.searchSubmit(isInit, sourceId, cityDep, cityArr).then(function () {
                self.showStartDate = self.startDate
            })
        },
        'input-select-city': function (city) {
            this.isShowInputCity = false
            if (this.cityType==='arr' && !city[1]) {
                this.airCityData.item.cityArr.value.cityName = this.$route.query.arrCity || "北京"
            }
            if (this.cityType==='arr' && city[1]) {
                this.airCityData.item.cityArr.value.cityName = city[1]
            }
            if (this.cityType==='dep' && !city[1]) {
                this.airCityData.item.cityDep.value.cityName = this.$route.query.depCity || "深圳"
            }
            if (this.cityType==='dep' && city[1]) {
                this.airCityData.item.cityDep.value.cityName = city[1]  
            }

        }
	}
}
</script>
<style>
@import url('../css/common.css');
@import url('../css/airSearch.css');
</style>
