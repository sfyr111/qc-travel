<template>
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
	 <div class="qc_container" @click="documentClick">
        <div class="search_mod clearfix">
            <div class="search_mod_page">
                <div class="search_tab">
                    <div class="tab_title_main clearfix">
                        <a class="title_a tab_air" @click="showAir" :class="{'tab_active':showAirForm}">机票</a>
                        <a class="title_a tab_hotel" @click="showHotel" :class="{'tab_active':!showAirForm}">酒店</a>
                    </div>
                    <form id="tab_air" v-show="showAirForm" onsubmit="return false;">
                        <div class="table2div clearfix">
                            <div class="item">
                                <div class="item_left">航班类型：</div>
                                <div class="item_right">
                                    <label><input class="radio" type="radio" v-model="tripType" value="OW" checked>单程</label>
                                    <label><input class="radio" type="radio" v-model="tripType" value="RT">往返</label>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_left">出发城市：</div>
                                <div class="item_right item_border" @click.stop="openCity($event,'cityDep')">
                                    <input type="text" v-model="airCityData.item.cityDep.value.cityName" placeholder="选择出发城市">
                                    <i class="fa fa-map-marker"></i>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_left">到达城市：</div>
                                <div class="item_right item_border" @click.stop="openCity($event,'cityArr')">
                                    <input type="text" v-model="airCityData.item.cityArr.value.cityName" placeholder="选择到达城市">
                                    <i class="fa fa-map-marker"></i>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_left">出发日期：</div>
                                <div class="item_right item_border" @click.stop="open($event,'picker1')">
                                    <input class="input" size="50" type="text" v-model="calendars.items.picker1.value" placeholder="请选择出发时间">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_left">返程日期：</div>
                                <div class="item_right item_border" :class="{'disabled': tripType == 'OW'}" @click.stop="open($event,'picker2')">
                                    <input class="input" size="50" type="text" v-model="calendars.items.picker2.value" placeholder="请选择到达时间">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>
                        <button @click="formAirSubmit" class="btn_search">搜索</button>
                    </form>
                    <form action="" v-show="!showAirForm">
                        <div class="table2div tab_hotel_padding m_b clearfix">
                            <div class="item" id="index_hotel_select_address">
                                <!-- <div class="item_left">目的地：</div> -->
                                <!-- 目的地选择 -->
                                <hotel-search-destination :hoteldestination="getHotelDestination" :hotelcityname="hotelCityName"></hotel-search-destination>
                               <!--  <div class="item_right item_border" @click.stop="openCity($event,'cityArr1')">
                                   <input type="text" v-model="airCityData.item.cityArr1.value.cityName" placeholder="请选择城市">
                                   <i class="fa fa-map-marker"></i>
                               </div> -->
                            </div>
                            <div class="item">
                                <div class="item_left">入住日期：</div>
                                <div class="item_right item_border" @click.stop="open($event,'picker3')">
                                    <input class="input" size="50" type="text" v-model="calendars.items.picker3.value" placeholder="请选择时间">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item_left">离店日期：</div>
                                <div class="item_right item_border" @click.stop="open($event,'picker4')">
                                    <input class="input" size="50" type="text" v-model="calendars.items.picker4.value" placeholder="请选择时间">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>
                        <button @click="formHotelSubmit" class="btn_search">搜索</button>
                    </form>
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
                    :sep.sync="sep">

                    </calendar>
                    <air-city 
                    :citys="getAirCity"
                    :x.sync="airCityData.x"
                    :y.sync="airCityData.y"
                    :value.sync="airCityData.value"
                    :show.sync="airCityData.showCity"
                    ></air-city>
                </div>
                <div class="user_manager">
                    <span class="prefix">尊敬的</span>
                    <span class="user_name">{{userName || "asdasdasd"}}</span>
                    <span class="greet">{{timeText}}</span>
                    <div class="user_img">
                        <img :src="imgPrifx+'head.png'" alt="用户头像">
                    </div>
                    <span class="sign_log">上次登录时间 {{lastLoginTime}}</span>
                    <a href="#" class="btn_manager" v-link="{ path: '/orderList/airOrderList' }" >进入管理中心</a>
                </div>
            </div>
        </div>
        <div class="order_mod">
            <div class="order_mod_title clearfix">
                <span>近期商旅订单</span>
                <a href="javascript:void(0)" v-link="{ path: '/orderList/airOrderList' }">查看更多></a>
            </div>
            <div class="order_list" v-if="getRencetOrder">
                <div class="order_row" v-for="order in getRencetOrder">
                    <div class="air_logo">
                        <img v-if="order.orderType == 1" :src="imgPrifx+'fly.png'" alt="xx航空公司">
                        <img v-if="order.orderType == 0" :src="imgPrifx+'hotel.png'" alt="xx航空公司">
                    </div>
                    <div class="order_inf">
                        <span class="order_id">订单号：{{order.orderNo}}</span>
                        <span class="order_time">{{order.createDate}}</span>
                    </div>
                    <div class="air_type" v-if="order.orderType == 1">国内航班</div>
                    <div class="air_type" v-if="order.orderType == 0">国内酒店</div>
                    <div class="air_line" v-if="order.orderType == 1 && order.forFlightOrder" style="vertical-align: 14px;">                      
                        <span class="air_se">{{order.depCityName}}<i class="dep2arr"></i>{{order.arrCityName}}</span>
                        <span class="air_no">{{order.airwaysCn}}&nbsp;{{order.flightNo}}</span>
                        <div v-for="re in order.forFlightOrder" class="air_re">
                            <span class="air_se">{{re.depCityName}}<i class="dep2arr"></i>{{re.arrCityName}}</span>
                            <span class="air_no">{{re.airwaysCn}}&nbsp;{{re.flightNo}}</span>
                        </div>
                    </div>  
                    <div class="air_line" v-if="order.orderType == 1 && !order.forFlightOrder" style="vertical-align: 14px;">                      
                        <span class="air_se">{{order.depCityName}}<i class="dep2arr"></i>{{order.arrCityName}}</span>
                        <span class="air_no">{{order.airwaysCn}}&nbsp;{{order.flightNo}}</span>
                    </div> 
                    <div class="hotel_line" v-if="order.hotelName">                        
                        <span class="hotel_se">{{order.hotelName}}</span> 
                    </div>                                     
                    <div class="air_time">
                        <span v-if="order.depdate">出发时间</span>
                        <span v-if="order.depdate">{{order.depdate}}&nbsp;{{order.deptime.substring(0,2)+':'+order.deptime.substring(2,4)}}</span>
                        <span v-if="order.checkinDate">入住时间</span>
                        <span v-if="order.checkinDate">{{order.checkinDate}}</span>
                    </div>
                    <div class="order_status">{{order.orderType == 1 && order.status === 0 ? "等待付款" :
                                            order.orderType == 1 && order.status === 1 ? "下单中" : 
                                            order.orderType == 1 && order.status === 2 ? "出票中" : 
                                            order.orderType == 1 && order.status === 3 ? "出票失败" : 
                                            order.orderType == 1 && order.status === 4 ? "出票成功" : 
                                            order.orderType == 1 && order.status === 5 ? "订单取消" : 
                                            order.orderType == 0 && order.status === 0 ? "待付款" : 
                                            order.orderType == 0 && order.status === 1 ? "预定中" :  
                                            order.orderType == 0 && order.status === 2 ? "支付成功" : 
                                            order.orderType == 0 && order.status === 3 ? "下单失败" : 
                                            order.orderType == 0 && order.status === 4 ? "预订成功" : 
                                            order.orderType == 0 && order.status === 5 ? "已取消" : "未知"}}</div>
                    <div class="order_price">￥{{order.totalMoney}}</div>
                    <!-- <a href="#" class="rebuy">再次预订</a> -->
                </div>                        
            </div>
            <loading v-if="isLoad"></loading>
            <no-data v-if="!getRencetOrder.length && !isLoad"></no-data>  
        </div>
        <div class="que_mod">
            <div class="que_mod_title clearfix">
                <span>常见问题</span>
                <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&articleId=10060">查看更多></a>
            </div>
            <div class="que_list">
                <div class="que_row">             
                    <a target="_blank" class="question" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&articleId=10060">
                        机票常见问题
                    </a>
                    <span class="answer">Q:订票之后我必须拿机票去坐飞机吗？</span>
                </div>
                <div class="que_row last_row">
                    <a target="_blank" class="question" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&articleId=10070">
                        酒店常见问题
                    </a>
                    <span class="answer">Q:已到酒店时前台说没有我的预订怎么办？</span>
                </div>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import 'babel-polyfill';
import $ from 'jquery'
import { QCHead, QCFooter, calendar, AirCity, HotelSearchDestination } from '../components'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import { airCity, rencetOrder, hotelDestination, hotelSearchCityId } from '../vuex/actions'
import { getAirCity, getRencetOrder, getHotelDestination, gethotelSearchCityId } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'
export default {
    vuex: {
        actions: {
            airCity,
            rencetOrder,
            hotelDestination,
            hotelSearchCityId
        },
        getters: {            
            getAirCity,
            getRencetOrder,
            getHotelDestination,
            gethotelSearchCityId        
        }
    },
	components: {
		QCHead,
		QCFooter,
        calendar,
        AirCity,
        Loading,
        NoData,
        HotelSearchDestination
	},
	data: function() {
		return {
            imgPrifx: '', // 图片前缀
            isManager: false,
			showAirForm: true,
            headName: '这是神马鬼',
            userName: 'sss',
            lastLoginTime: '2015-06-01',
			show: true,
            tripType: '',
            type:"date",
            sep:"-",
            isLoad: true,
            timeText: "",
            isFistGetHotelDestination: true,        //  是否第一次获取目的地
            calendars: {
                showDatePicker: false,
                x:0,
                y:0,
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
                    },
                    picker3:{
                        type:"date",
                        begin: util.setDate(0),
                        end:"",
                        value: util.setDate(0)
                    },
                    picker4:{
                        type:"date",
                        begin: util.setDate(1),
                        end:"",
                        value: util.setDate(1)
                    }
                }
            },
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
                    },
                    cityArr1:{
                        value: {
                            cityName: '',
                            cityCode: ''
                        }
                    }
                }
            },
            hotelCityId: '824297',         //  酒店默认ID
            hotelCityName: '北京'
		}
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
            if (this.calendars.picker == 'picker3') {
                // 如果开始时间比结束日期大 则设置结束日期大于开始日期1天
                var startDate = util.selectDateFormat(this.calendars.items.picker3.value, '-')
                var endDate = util.selectDateFormat(this.calendars.items.picker4.value, '-')
                if (+new Date(startDate) >= +new Date(endDate)) {
                    this.calendars.items.picker4.value = util.setDate(1, startDate)
                    this.calendars.value = this.calendars.items.picker1.value
                    this.calendars.items.picker4.begin = util.setDate(1, startDate)
                }
            }
        },
        'airCityData.value.cityName': function (value) {
            this.airCityData.item[this.airCityData.cityType].value.cityName=value
        }
    },
    created() {       
        this.init()  
    },
	methods: {
        // 初始化
        init: function () {
            this.headName = window.user ? window.user.companyName : "" // 从session中获取用户id
            this.userName = window.user ? window.user.loginName : "" // 从session中获取用户id
            this.lastLoginTime =  window.user ? window.user.lastLoginTime : "" // 从session中获取上次登录时间
            // 机票查询参数初始化
            this.airCityData.item.cityArr.value.cityName = "北京"
            this.airCityData.item.cityDep.value.cityName = "深圳"
            this.calendars.items.picker1.value = util.setDate(0, new Date())
            this.calendars.items.picker2.value = util.setDate(1, new Date())
            // 酒店查询参数初始化
            this.airCityData.item.cityArr1.value.cityName = "北京"
            this.calendars.items.picker3.value = util.setDate(0, new Date())
            this.calendars.items.picker4.value = util.setDate(1, new Date())
            // 图片路径初始化
            this.imgPrifx = configUrl.staticPath
            // 近期订单
            this.getRecentOrder()

            this.airCityInit()
            // 时间判断
            var now = new Date(),
                hour = now.getHours() 
            if(hour < 6){
                this.timeText = ""
            } 
            else if (hour < 9){
                this.timeText = "早上好！"
            } 
            else if (hour < 12){
                this.timeText = "上午好！"
            } 
            else if (hour < 14){
                this.timeText = "中午好！"
            } 
            else if (hour < 17){
                this.timeText = "下午好！"
            } 
            else if (hour < 19){
                this.timeText = "傍晚好！"
            } 
            else if (hour < 22){
                this.timeText = "晚上好！"
            } 
            else {
                this.timeText = "晚上好！"
            } 
        },
		showAir: function() {
			this.showAirForm = true
		},
		showHotel: function() {
			this.showAirForm = false
		},
		formAirSubmit: function() {
			this.$router.go({
				name: 'airSearch',
				query: {
					arrCity: this.airCityData.item.cityArr.value.cityName || "北京",
                    arrDate: this.calendars.items.picker2.value,
                    depCity: this.airCityData.item.cityDep.value.cityName || "深圳",
                    depDate: this.calendars.items.picker1.value || util.setDate(1, new Date()),
                    depTime: '',
                    sortType: '',
                    pageNo: '',
                    pageSize: '',
                    tripType: this.tripType
				}
			})
		},
		formHotelSubmit: function() {
			this.$router.go({
				name: 'hotelsearch',
				query: {
					type: this.type,
                    checkInDate: this.calendars.items.picker3.value,
                    checkOutDate: this.calendars.items.picker4.value,
                    hotelCityName: this.hotelCityName,
                    hotelCityId: this.hotelCityId
				}
			})
		},
        // 打开日期过滤
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

            var $el = $(e.target).closest('div')
            var h = parseInt($el.css('height').replace('px'))
            this.calendars.x = $el.offset().left
            this.calendars.y = $el.offset().top + h - 140
        },
        // 打开地址过滤
        openCity: function (e, type) {
            this.airCityData.cityType = type
            this.airCityData.value.cityName = this.airCityData.item[type].value.cityName
            this.airCityData.value.cityCode = this.airCityData.item[type].value.cityCode
            
            var $el = $(e.target).closest('div')
            var h = parseInt($el.css('height').replace('px'))
            this.airCityData.x = $el.offset().left
            this.airCityData.y = $el.offset().top + h - 140

            this.airCityData.showCity = true
        },
        //  点击空白关闭
        documentClick: function () {
            this.$broadcast('document-click')
        },
        // 获取近期订单
        getRecentOrder: function () {            
            var self = this
            let recentOpt = {
                type: 'post',
                data: {},
                url: configUrl.rencetOrder.dataUrl,
                success: function (resp) {
                    self.isLoad = false
                },
                fail: function (resp) {
                    console.log('失败')
                    console.log(resp)
                }
            }
            this.rencetOrder(recentOpt) // 获取近期机票订单
        },
        // 城市初始化
        airCityInit: function () {
            let airCityOpt = {
                type: 'post',
                data: {},
                url: configUrl.airCity.dataUrl,
                success: function (resp) {
                },
                fail: function (resp) {
                    console.log('失败')
                    console.log(resp)
                }
            }
            this.airCity(airCityOpt)
        }
	},
    events: {
        //  酒店搜索目的地
        'select-address': function () {
            //  关闭选择时间
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
        //选择城市
        'select-city': function (id, name) {
            this.hotelCityName = name
            this.hotelCityId = id
        }
    }
}
</script>
<style>
@import url('../css/common.css');
@import url('../css/main.css');
#index_hotel_select_address .address{
    position: relative;
}
#index_hotel_select_address .address .address_city{
    width: 457px;
    position: absolute;
    top: 35px;
    left: 74px;
    z-index: 100;
    background: #f5fbff;
    border: 1px solid #ddd;
}
#index_hotel_select_address .address{
    text-align: left;
    padding-left: 20px;

}
#index_hotel_select_address .address input{
    border:  1px solid #ddd;
    height: 30px;
    width: 254px;
    margin-left: 2px;
    padding-right: 18px;
}
#index_hotel_select_address .address i{
    position: relative;
    left: -18px;

}
#index_hotel_select_address .address .address_city .address_city_head{
    border-bottom: 1px solid #c8e6fb;
    height: 25px;
}
#index_hotel_select_address .address .address_city_head li.active:last-child{
   border-right: none;
}
#index_hotel_select_address .address .address_city_head li.active{
    height: 26px;
    background: #f5fbff;
    color: #fc3c3c;
    border-left: 1px solid #c8e6fb;
    border-right: 1px solid #c8e6fb;
}
#index_hotel_select_address .address .address_city_content{
    max-height: 400px;
    overflow-y: auto;
    min-height: 150px;
}
.address_city_head li:last-child{
    width: 95px;
}
</style>
