<template>
    <div class="air_search_main clearfix">
        <div class="page1200">
            <div class="air_search_main_l">
                <div class="air_inf">
                    <div class="air_name fl">
                       选择航班：<span>{{cityDep}}-{{cityArr}}&nbsp;&nbsp;{{timeDep}}</span>
                    </div>
                    <div class="air_total fr">
                        为您找到<em>{{airList.list ? airList.list.length : 0}}</em>个航班
                    </div></div>
                <!-- <div class="calendar_tab clearfix">
                    <span class="calendar_control_l" :class="{'disableBtn':isHd}">&lt;</span>
                    <div class="calendar_tab_list clearfix">
                        <ul>
                            <li v-for="day in getDateBanner" :class="$index == activeDay ? 'active' : ''" @click="clickDay($index)">
                                <span class="calendar_date">{{day.depDate}}&nbsp周二</span>
                                <span class="base_price">￥{{day.price}}</span>
                            </li>	                           
                        </ul>
                    </div>
                    <span class="calendar_control_r" :class="{'disableBtn':isFoot}" @click="goNext()">&gt;</span>
                </div> -->
                <div class="air_list_container clearfix">
                    <ul class="air_list_head">
                        <li class="sort_d">航班信息</li>
                        <li class="sort_stime" @click.stop="sortByTime()">
                            <a href="javascript:void(0);">起飞时间<i class="fa fa-unsorted"></i></a>
                        </li>
                        <li class="sort_time">
                            <a href="javascript:void(0);">行程时长</a>
                        </li>
                        <li class="sort_atime" @click.stop="sortByTime()">
                            <a href="javascript:void(0);">到达时间<i class="fa fa-unsorted"></i></a>
                        </li>
                        <li class="sort_price" @click.stop="sortByPrice()">
                            <a href="javascript:void(0);">价格<i class="fa fa-unsorted"></i></a>
                        </li>
                    </ul>
                    <div class="air_list_content" v-if="airList.list && airList.list.length">
                        <div class="air_list_item" :class="{'first_item' : $index == 0}" v-for="flight in airList.list">
	                        <table class="air_list_item_head" :class="{'active' : flight.showPannel==true}" @click="showThisPannel($index)">
	                            <tr>
	                                <td width="180px">
	                                    <div class="flight_no">
	                                        <img :src="imgPrifx+flight.airways+'.png'" alt="">
	                                        {{flight.airwaysCn}}{{flight.flightNo}}
	                                    </div>
	                                    <div class="flight_text">
	                                        {{flight.planeStyleCN || "其他机型"}}{{flight.planeStyle}}
	                                    </div>
	                                </td>
	                                <td width="134px">
	                                    <span class="s_time">{{flight.depTime.substring(0,2)+':'+flight.depTime.substring(2,4)}}</span>
	                                    <span class="s_airport">{{flight.depAirdrome}}</span>
	                                </td>
	                                <td width="150px">
	                                    <span class="during_time">{{flight.duringTime}}
	                                        <i class="line"></i>
	                                    </span>
	                                    <span class="air_type">{{flight.isStop==1?'经停':'直达'}}</span>
	                                </td>
	                                <td width="140px">
	                                    <span class="a_time">{{flight.arrTime.substring(0,2)+':'+flight.arrTime.substring(2,4)}}</span>
	                                    <span class="a_airport">{{flight.arrAirdrome}}{{flight.arrTerminal}}</span>
	                                </td>
	                                <td width="156px">
	                                    <span class="price_def"><em>￥</em>{{flight.bingoClassInfos | getMin}}<em>起</em></span>
	                                </td>
	                                <td width="210px">
	                                    <span class="package_price">民航发展基金<!-- +燃油 --></span>
	                                    <span class="package_price_no"><em>￥{{flight.tax}}</em><!-- +<em>￥{{flight.oilTax}}</em> --></span>
	                                    <a href="javascript:;" class="btn_up">收起</a>
	                                </td>
	                            </tr>
	                        </table>     
	                        <table class="air_list_item_pannel" v-show="flight.showPannel" v-if="flight.bingoClassInfos && flight.bingoClassInfos.length > 0">
	                            <tr v-for="FlightClassInfo in flight.bingoClassInfos">
	                                <td width="180px">
	                                    <span class="filter_classes">{{FlightClassInfo.classNoCn}}</span>
	                                    <em class="sourceLogo">{{FlightClassInfo.airCompanyFlag === 1 ? '航司' : '商家'}}</em>
	                                </td>
	                                <td width="134px">
	                                    <span class="discount">{{FlightClassInfo.discount/10 == 10 ? "全价" : FlightClassInfo.discount/10 + "折"}}</span>
	                                </td>
	                                <td width="150px">
	                                    <span class="filter_tag" @mouseout="flightOut()" @mouseover="changeOrder($parent.$index, $index)">改退签</span>
	                                </td>
	                                <td width="140px">
	                                    <!-- <span class="base_price">￥{{FlightClassInfo.price}}</span> -->
	                                </td>
	                                <td width="156px">
	                                    <span class="base_price">￥{{FlightClassInfo.price}}</span>
	                                </td>
	                                <td width="210px">	                                    	
	                                    <a 
	                                    v-show="tripType == 'OW'" 
	                                    href="javascript:;" 
	                                    @click="goOrderOW($parent.$index, $index)" 
	                                    class="btn_book">预订</a>
	                                    <a 
	                                    v-show="!isCheckDep && tripType == 'RT'" 
	                                    href="javascript:;" 
	                                    @click="goOrderRTStart($parent.$index, $index)" 
	                                    class="btn_book">选去程</a>
	                                    <a 
	                                    v-show="isCheckDep && tripType == 'RT'" 
	                                    href="javascript:;" 
	                                    @click="goOrderRTEnd($parent.$index, $index)" 
	                                    class="btn_book">选返程</a>
	                                    <span class="surplus" v-if="FlightClassInfo.seatNum !== 'A'">仅剩{{FlightClassInfo.seatNum}}张</span>
	                                </td>
	                            </tr>
	                        </table>  
	                    </div>
                    </div>
                    
                    <!-- 分页 -->
					<!-- <Pagation v-show="isShowPagePagination"></Pagation> -->
                    <loading v-if="isLoading"></loading>
					<no-data v-if="!isLoading && airList && airList.list && !airList.list.length || searchError"></no-data>
					<tips 
                    :x="x"
                    :y="y"
                    :show.sync="showTips" 
                    :ticket-turn="ticketTurn"
                    :ticket-change="ticketChange"
                    :ticket-back="ticketBack"></tips>                      
                </div>
            </div>
            <!-- <air-search-destination></air-search-destination> -->
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
import Pagation from '../Pagation'
import NoData from '../NoData'
import Tips from '../Tips'
import Loading from '../Loading'
import getMin from '../../filter/getMin'
	export default {
		props: {
			airList: {
				type: Object
			},
			isShowPagePagination: {
				type: Boolean,
				default: false
			},
			isLoading: {
				type: Boolean,
				default: false
			},
			showTips: {
				type: Boolean,
				default: false
			},
			searchError: {
				type: Boolean,
				default: false
			},
			cityDep: {
				type: String
			},
			cityArr: {
				type: String
			},
			timeDep: {
				type: String
			},
			tripType: {
				type: String,
				default: 'OW'
			},
			isCheckDep: {
				type: Boolean,
				default: false
			}
		},
		components: {
			Pagation,
			Loading,
			NoData,
			Tips,
		},
		created: function () {
			this.imgPrifx = configUrl.staticPath
		},
		data () {
			return {
				imgPrifx: '',
				ticketTurn: '',
				ticketChange: '',
				ticketBack: '',
				sourceId: '',
				x: 0,
				y: 0,
			}
		},
		methods: {
			showThisPannel: function(index) {			
				this.airList.list[index].showPannel = !this.airList.list[index].showPannel;
			},			
			sortByTime: function () {
				this.sortType = 1
				this.$dispatch('search-submit')
			},
			sortByPrice: function () {
				this.sortType = 2
				this.$dispatch('search-submit')
			},
			// 退出退改签
			flightOut: function () {
	          this.showTips = false
	        },
	        // 查询退改签
	        changeOrder: function (Pindex, index) {
				var $el = $(event.target).closest('td')
				var h = parseInt($el.css('height').replace('px'))
				this.x = $el.offset().left - 330
				this.y = $el.offset().top+h-280

				var data = {}
	            data = {
	              sourceId: this.airList.list[Pindex].bingoClassInfos[index].sourceId,
	              airways: this.airList.list[Pindex].airways,
	              depCity: this.airList.list[Pindex].depCity,
	              arrCity: this.airList.list[Pindex].arrCity,
	              beginDate: this.airList.list[Pindex].depDate,
	              fareItemId: this.airList.list[Pindex].bingoClassInfos[index].fareItemId,
	              classNO: this.airList.list[Pindex].bingoClassInfos[index].classNo
	            }
				this.showTips = false
				let self = this
				let opt = {
					type: 'post',
					data: data,
					url: configUrl.changeOrder.dataUrl,
					success: function (resp) {     
						self.ticketTurn = resp.result.ticketTurn
						self.ticketChange =resp.result.ticketChange
						self.ticketBack=resp.result.ticketBack
						self.showTips = true                  
					},
					fail: function (resp) {
						self.showTips = false
					}
				}
				util.getMyrequest(opt)
	        },
	        // 单程
	        goOrderOW: function(Pindex, index) {
				sessionStorage.clear()
				var model = this.setModel(Pindex, index)
				sessionStorage.setItem('model', '['+JSON.stringify(model)+']')

	            this.sourceId = this.airList.list[Pindex].bingoClassInfos[index].sourceId
				this.$router.go({
					name: 'airOrder',
					query: {
						sourceId: this.sourceId
					}
				})
			},
	    // 选定去程
			goOrderRTStart: function(Pindex, index) {
				this.isCheckDep = true
				sessionStorage.clear()

				var model = this.setModel(Pindex, index)
				model.tripType = 'OW'
				sessionStorage.setItem('model', '['+JSON.stringify(model)+']')

				this.sourceId = this.airList.list[Pindex].bingoClassInfos[index].sourceId

        var temp = this.cityDep
        this.cityDep = this.cityArr
        this.cityArr = temp

        this.$dispatch('search-to-flight', false, this.sourceId, this.cityDep, this.cityArr)
			},
	    // 选返程
			goOrderRTEnd: function(Pindex, index) {				
				let trip = JSON.parse(sessionStorage.getItem('model'))
	            var self = this
				trip.push(this.setModel(Pindex, index))

				sessionStorage.setItem('model', JSON.stringify(trip))
				this.$router.go({
					name: 'airOrder',
					query: {
	          sourceId: self.sourceId
					}
				})
			},
			setModel: function (Pindex, index) {
	        var model = {}	        	
			    model.airways=this.airList.list[Pindex].airways								 // 航空公司代码

			    model.airwaysCn=this.airList.list[Pindex].airwaysCn									 // 航空公司名称

			    model.arrCityCode=this.airList.list[Pindex].arrCity							 // 到达城市代码

			    model.arrTerminal=this.airList.list[Pindex].arrTerminal									 // 到达城市航站楼

			    model.arrCityName=this.cityArr								 // 到达城市中文名

			    model.arrdate=this.airList.list[Pindex].arrDate									 // 到达日期

			    model.arrival=this.airList.list[Pindex].arrCity									 // 到达机场三字码

			    model.arrtime=this.airList.list[Pindex].arrTime									 // 到达时间

			    model.arrairdrome=this.airList.list[Pindex].arrAirdrome									 // 到达城市机场

			    model.buildfee=this.airList.list[Pindex].tax									 // 机场建设费

			    model.childOilTax=this.airList.list[Pindex].bingoClassInfos[index].childOilTax									 // 儿童燃油税

			    model.childSalePrice=this.airList.list[Pindex].bingoClassInfos[index].childSalePrice									 // 京东儿童销售价格

			    model.childSeatCode=this.airList.list[Pindex].bingoClassInfos[index].childSeatCode									 // 深航儿童仓位 ,如果不传会导致无法出票

			    model.childVenderPrice=this.airList.list[Pindex].bingoClassInfos[index].childVenderPrice									 // 商家儿童成本价格

			    model.commisionPoint=''									 // 政策反点

			    model.depCityCode=this.airList.list[Pindex].depCity									 // 出发城市代码

			    model.depCityName=this.cityDep									 // 出发城市中文名

			    model.depTerminal=this.airList.list[Pindex].depTerminal									 // 出发城市航站楼

			    model.depairdrome=this.airList.list[Pindex].depAirdrome									 // 出发城市机场
			    
			    model.departure=this.airList.list[Pindex].depCity									 // 出发机场三字码

			    model.depdate=this.airList.list[Pindex].depDate									 // 出发日期

			    model.deptime=this.airList.list[Pindex].depTime									 // 起飞时间

			    model.discount=this.airList.list[Pindex].bingoClassInfos[index].discount									 // 折扣

			    model.discountId=''									 // 直降政策

			    model.planeStyle=this.airList.list[Pindex].planeStyle
			    model.fareitemid=this.airList.list[Pindex].bingoClassInfos[index].fareItemId									 // 特价id

			    model.flightNo=this.airList.list[Pindex].flightNo									 // 航班号

			    model.fullPrice=this.airList.list[Pindex].bingoClassInfos[index].fullPrice									 // Y舱价格

			    model.iOilTax=this.airList.list[Pindex].bingoClassInfos[index].childOilTax									 // 婴儿燃油税，默认填0

			    model.isStop=this.airList.list[Pindex].bingoClassInfos[index].isStop									 // 是否经停1、是，0、否

			    model.originalPrice=this.airList.list[Pindex].bingoClassInfos[index].originalPrice									 // 原始票价

			    model.oiltax=this.airList.list[Pindex].bingoClassInfos[index].oilTax									 // 燃油税

			    model.policyId=this.airList.list[Pindex].bingoClassInfos[index].policyId || ""									 // 政策id,

			    model.price=this.airList.list[Pindex].bingoClassInfos[index].price									 // 购买票价

			    model.promotionId=''									 // 促销Id

			    // model.saleDiscountType=this.airList.list[Pindex].bingoClassInfos[index].saleDiscountMap[0].entry.SaleDiscount.saleDiscountType									 // 促销类型， 1 直降， 2返券

			    model.seatcodeCn=this.airList.list[Pindex].bingoClassInfos[index].classNoCn									 // 舱位
			    model.seatcode=this.airList.list[Pindex].bingoClassInfos[index].classNo

			    model.stopCity=''									 // 经停城市

			    model.ticketBack=''									 // 退票规定

			    model.ticketChange=''									 // 改签规定

			    model.ticketTurn=''									 // 转签规定

			    model.total=''									 // 单张合计为price+buildfee+ oiltax

			    model.tripType=this.tripType									 // 行程标志 OW,单程。 RT往返

			    model.venderPrice=this.airList.list[Pindex].bingoClassInfos[index].venderPrice									 // 商家成本价格
			    model.uniqueKey=this.airList.list[Pindex].bingoClassInfos[index].uniqueKey									 // 商家成本价格
			    model.productCode=this.airList.list[Pindex].bingoClassInfos[index].productCode									 // 商家成本价格
			    model.seatType=this.airList.list[Pindex].bingoClassInfos[index].seatType									 // 商家成本价格

	        	return model
	        },
		}
	}
</script>