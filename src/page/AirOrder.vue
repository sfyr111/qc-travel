<template>
	<q-c-head></q-c-head>
	<div class="order">
		<div class="page1200 clearfix">
			<div class="fl order_main" id="signinForm">
          <form @submit.prevent="onSubmit">
            <div class="section section_passenger">
              <div class="section_hd clearfix">
                <span class="hd_name">乘客信息</span>
                <account-passenger v-if="getUserList && getUserList.length>0" :account-list="getUserList" :is-link="passengerAcc"></account-passenger>
              </div>              
              <div v-for="passenger in passengers">
                <div class="passenger_no">
                  第<em>{{$index + 1}}</em>位乘客<i @click.stop="removePassenger($index)">{{passengers.length==1?'清除':'删除'}}</i>
                </div>
                <div class="row">
                  <span class="row_hd"><i>*</i>姓名</span>
                  <select class="row_mid" v-model="passenger.psgtype" :value="passenger.psgtype" @change="changePsgtype()">
                    <option value="ADT">成人</option>
                    <option value="CHD">儿童</option>
                  </select>
                  <input
                    class="row_foot"
                    type="text"
                    placeholder="姓名与登机所持证中的名字一致"
                    v-model="passenger.psgname"
                    required>
                  <!-- <span v-if="$validation.psgname.invalid">请输入姓名</span> -->
                  <i class="fa fa-question-circle" @mouseout="hideNameRule()" @mouseover="showNameRule()"></i>
                  <div class="name_rule" v-show="showName">
                    <span>乘客姓名填写说明</span>
                    <span>乘客姓名需与登机所持证件上的名字一致。</span>
                    <span>中文姓名：</span>
                    <span>1. 若持护照登机，必须确认护照上有中文姓名。</span>
                    <span>2. 生僻字可用拼音代替，例如：“王厴丽”可输为“王yanli”</span>
                    <span>英文姓名：</span>
                    <span>1.乘客姓名必须与登机时所使用证件上的名字一致。</span>
                    <span>2.根据民航系统要求，英文姓和名间空格必须以“/”代替，并且姓在前名在后。</span>
                    <span>3.姓名中如含有繁体字或生僻字，则从繁体字和生僻字开始，请都适用拼音进行替代。例如，華安安，请输入“hua/anan”</span>
                  </div>
                </div>
                <div class="row">
                  <span class="row_hd"><i>*</i>性别</span>
                  <select class="row_body" :value="passenger.psgsex" v-model="passenger.psgsex">
                    <option value="M">男</option>
                    <option value="F">女</option>
                    <option value="U">未知</option>
                  </select>
                </div>
                <div class="row">
                  <span class="row_hd"><i>*</i>电话</span>
                  <input class="row_body" :value="passenger.mobileNo" v-model="passenger.mobileNo" placeholder="请输入电话号码" required type="number">
                </div>
                <div class="row">
                  <span class="row_hd"><i>*</i>生日</span>
                  <input class="row_body" :value="passenger.psgbirthdate" v-model="passenger.psgbirthdate" placeholder="请输入生日" required>
                </div>                
                <div class="row">
                  <span class="row_hd"><i>*</i>证件信息</span>
                  <select class="row_mid" v-model="passenger.certtype" >
                    <option value="IDC">身份证</option>
                    <option value="PSP">护照</option>
                    <option value="HKM">港澳通行证</option>
                    <option value="MOC">军官证</option>
                    <option value="TW1">回乡证</option>
                    <option value="TW2">台胞证</option>
                    <option value="SEA">国际海员证</option>
                    <option value="OTHER">其他</option>
                  </select>
                  <input class="row_foot" type="text" placeholder="证件号码" v-model="passenger.certid">
                </div>
                <div class="safest">
                  <div class="safest_hd">
                    <label><input type="checkbox" :checked="passenger.checkIns" @click="checkIns($index)">航空意外险</label>
                  </div>
                  <ul>
                    <li>
                      <a href="#">阅读详细条款</a>
                      <i class="fa fa-question-circle" @mouseout="hideInvoiceRule()" @mouseover="showInvoiceRule()"></i>
                      <div class="invoice_rule" v-show="showInvoice">
                        <span>1.本航意险无法单独退保，需机票退票后才可退保；</span>
                        <span>2.本航意险有效期为七天，自您订单约定航班起飞时刻起开始至第七日止，例如：9月1日12:00:00起飞，则保险生效期间为9月1日12:00:00至9月8日11:59:59截止；</span>
                        <span>3.本航意险在七天的有效期内，同一乘机人最多可购买四份，若超过四份，则会投保失败。</span>
                      </div>
                      <div class="insure_info" :class="{'active': passenger.insCount > 0}">
                          ￥20/份
                      </div>
                      <select :value="passenger.insCount" v-model="passenger.insCount" @change="selectIns($index)">
                        <option value="0">不购买</option>
                        <option value="1">1份</option>
                        <option value="2">2份</option>
                      </select>
                      <span>最高赔付50万/份</span>
                    </li>
                  </ul>
                </div>
                <!-- <div class="notify_passenger">
                  <div>
                    <label><input type="checkbox">给乘客发送航班信息短信</label>
                  </div>
                  <input class="phone_no" type="text" placeholder="请输入乘客的手机号码">
                </div> -->
              </div>
              <input type="button" class="btn_add_passenger" @click.stop="addPassenger()" value="+新增乘客"><!-- </button> -->
            </div>
            <div class="section section_contacter">
              <div class="section_hd clearfix">                
                <span class="hd_name">联系人</span>
                <account-passenger v-if="getUserList && getUserList.length>0" :account-list="getUserList" :is-link="linkAcc"></account-passenger>
              </div>
              <div class="row_contacter">
                <div class="row">
                  <span class="row_hd"><i>*</i>姓名</span>
                  <input 
                  class="row_body" 
                  type="text" 
                  placeholder="请填写您的姓名"
                  v-model="linkmanName"
                  :value="linkmanName"
                  required>
                </div>
                <div class="row">
                  <span class="row_hd"><i>*</i>手机号码</span>
                  <input 
                  class="row_body" 
                  type="number" 
                  placeholder="手机号，用于接收航班信息"
                  :value="linkmanMobile"
                  v-model="linkmanMobile"
                  required>
                </div>
                <div class="row">
                  <span class="row_hd">邮件</span>
                  <input 
                  class="row_body" 
                  type="text" 
                  placeholder="电子邮件，用于接收航班邮件提醒"
                  :value="linkmanEmail"
                  v-model="linkmanEmail">
                </div>
              </div>
            </div>
            <div class="section section_expense">
              <div class="section_hd">
                报销凭证
                <span>（行程单和报销发票仅仅作为报销凭证，不作为办理手机登机手续的必要凭证，仅凭有效证件即可办理登机手续）</span>
              </div>
              <div class="row_expense">
                <div class="travel_order">
                  <label>
                    <input type="checkbox" @checked="checkDelivery()" v-model="deliveryNeedinvoice" :value="deliveryNeedinvoice">行程单
                    <span>（办理登机凭有效证件即可）</span>
                  </label>
                  <ul v-show="deliveryNeedinvoice">
                    <!-- <li>
                      <label>
                        <input type="radio" name="deliverytype" value="NOD" v-model="deliverytype" checked>不邮寄行程单
                        <span>（乘机时打印）</span>
                      </label>
                    </li> -->
                    <li>
                      <label>
                        <input type="radio" name="deliverytype" value="FRP" v-model="deliverytype" checked>免费邮寄
                        <span>（飞机起飞后尽快邮寄，预计起飞后7-14个工作日到达）</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="radio" name="deliverytype" value="EMS" v-model="deliverytype">快递到付
                        <span>（快递费用由顺丰快递上门取件时收取，由北京递出，起飞后2-3个工作日到达）</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="travel_bill">
                  <label>
                    <input type="checkbox" v-model="deliveryInsurInvoice">保险发票
                    <span>（此发票由保险公司单独邮寄）</span>
                  </label>
                  <ul v-if="getAddressList && deliveryInsurInvoice || deliveryNeedinvoice">
                    <li v-for="address in getAddressList">
                      <label>                        
                        <input type="radio" v-model="picked" :value="$index" name="address" :checked="$index == 0">{{address.recipientsName}}&nbsp;&nbsp;{{address.provinceName}}&nbsp;&nbsp;{{address.cityName}}&nbsp;&nbsp;{{address.areaName}}&nbsp;&nbsp;{{address.address}}&nbsp;&nbsp;{{address.phone}}&nbsp;&nbsp;{{address.postCode}}
                      </label>                   
                    </li>                      
                  </ul>    
                  <label v-if="getAddressList.length == 0">
                    <a href="javascript:void(0)" @click.stop="addNew()">新增地址</a>
                  </label>              
                </div>
              </div>
            </div>
            <div class="section section_total">
              <div class="total_price">
                <span>订单应付总金额为：</span>
                <em>￥{{total}}</em>
              </div>
              <button v-if="btnHasUsed" class="btn_go_order btnHasUsed">正在努力加载...</button>
              <input v-if="!btnHasUsed" type="submit" class="btn_go_order" value="确认信息无误，去预定">
            </div>
          </form>
			</div>
			<div class="fr order_air">
				<div class="air_inf">
					<div class="air_inf_hd clearfix">
						<span>航班信息</span>
						<a href="javascript:void(0);" @click.stop="goReSearch()">重新选择航班</a>
					</div>
					<ul class="clearfix" v-for="trip in trips">
						<li class="flight_info">
							<span class="flight_time">{{trip.depdate}}{{trip.depCityName}}-{{trip.arrCityName}}</span>
							<span class="cabin">{{trip.seatcodeCn}}<em>{{trip.planeStyle}}</em></span>
						</li>
						<li class="flight_whole">
							<div class="flight_from">
								<span class="time">{{trip.deptime.substring(0,2)+':'+trip.deptime.substring(2,4)}}</span>
								<span class="airport">{{trip.depairdrome}}</span>
							</div>
							<div class="flight_info">
                <div class="stops">
								<span class="airline_type" @mouseover="flightOver($event,sourceId,trip.depdate,trip.flightNo,trip.isStop)">{{trip.isStop == '0' ? '直达' : '经停'+trip.stopCity}}</span>
                </div>
								<span class="airline_name">{{trip.airwaysCn}}{{trip.flightNo}}</span>
							</div>
							<div class="flight_to">
								<span class="time">{{trip.arrtime.substring(0,2)+':'+trip.arrtime.substring(2,4)}}</span>
								<span class="airport">{{trip.arrairdrome}}</span>
							</div>
						</li>
						<li class="bill_inf">
							<span class="name">成人票<em>￥{{trip.price}}</em></span>
							<span class="fund_fuel">民航发展基金+燃油<em>￥{{trip.buildfee}}+￥{{trip.oiltax || 0}}</em></span>
							<a class="refund" @mouseout="flightOut()" @mouseover="changeOrder($event,sourceId,trip.airways,trip.depCityCode,trip.arrCityCode,trip.depdate,trip.fareitemid,trip.seatcode)" >退改签</a>
						</li>
					</ul>          
				</div>
				<div class="order_list">
					<div class="order_list_hd">
						<span>应付金额</span>
						<em>￥{{total}}</em>
					</div>
					<ul class="clearfix" v-for="passenger in passengers">
						<li>
							<span class="name">
								{{passenger.psgtype=="ADT"?"成人":"儿童"}}
							</span>
							<span class="price">
								<em>￥</em>
								{{passenger.price}}/人
							</span>
							<span class="count">
							<i>×</i>
							1</span>
						</li>
					</ul>          
				</div>
			</div>
		</div>
	</div>
	<div class="mask"></div>
	<div class="pop_model"></div>
  <tips 
    :x="x"
    :y="y"
    :show.sync="showTips" 
    :ticket-turn="ticketTurn"
    :ticket-change="ticketChange"
    :ticket-back="ticketBack"></tips>
  <tips-stop 
    :x="x"
    :y="y"
    :show.sync="showTipStop" 
    :arr-time="arrTime"
    :stop-city-cn="stopCityCn"
    :takeoff-time="takeoffTime"></tips-stop>
  <!-- 遮罩及弹框 -->
  <invoice-pos 
  :show-pop.sync="showPop" 
  :pop-name="popName"
  :invoice-title="invoiceTitle"
  :recipients-name="recipientsName"
  :phone="phone"
  :post-code="postCode"
  :address="address"
  :invoice-id="invoiceId"
  v-ref:pos></invoice-pos>
  <q-c-footer></q-c-footer>
</template>
<script>
import $ from 'jquery'
import { QCHead, QCFooter, Tips, showTips, TipsStop, InvoicePos, AccountPassenger } from '../components'
import { addressList, addressAdd, userList } from '../vuex/actions'
import { getAddressList, getUserList } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'

export default {
  el (){
    return '#signinForm'
  },
  vuex: {
    actions: {
      addressList,
      addressAdd,
      userList
    },
    getters: {
      getAddressList,
      getUserList     
    }
  },
	components: {
		QCHead,
		QCFooter,
    Tips,
    showTips,
    TipsStop,
    InvoicePos,
    AccountPassenger
	},
	data: function() {
    return {
      isManager: false,
      showPop: false,  
      popName: "",
      depCity: '',
      arrCity: '',      
      email: '',
      username: '',
      showName: false,//显示名字规则
      showInvoice: false,// 显示保险
      passengerAcc: false,
      linkAcc: true,
      showTips: false,
      showTipStop: false,
      arrTime: '',
      stopCityCn: '',
      takeoffTime: '',
      btnHasUsed: false, // 节流
      x: 0,
      y: 0,
      ticketTurn: '',
      ticketChange: '',
      ticketBack: '',
      passengers: [{
        id: "",
        checkIns: false,
        psgtype: 'ADT',
        psgname: '',
        psgbirthdate: '',
        psgsex: 'U',        
        certid: '',
        certtype: 'IDC',
        insCount: 0,
        mobileNo: '',
        price: 0
      }],
      sourceId: "",
      deliverytype: '发票邮寄类型',
      trips: [],
      total: 0,
      deliveryInsurInvoice: false,
      deliveryNeedinvoice: false,
      linkmanName: '',
      linkmanMobile: '',
      linkmanEmail:'',
      orderBeanOrderPrice: 0,
      orderTypeNum: 1,      //  订单类型 酒店--0   机票--1  月结还款--2
      picked: 0
    }
  },
  created () {
    this.trips = JSON.parse(sessionStorage.getItem('model'))
    this.getAddress()
    this.getTotal()    
    this.getAccounts()
    this.sourceId = this.$route.query.sourceId || ""
  },
  methods: {
    // 查询用户地址
    getAddress: function () {
      // 查询用户地址列表
      let opt = {
          type: 'post',
          data: {},
          url: configUrl.addressList.dataUrl,
          success: function (resp) {
          },
          fail: function (resp) {
          }
      }
      this.addressList(opt)
    },
     // 查询用户地址
    getAccounts: function () {
      // 查询用户地址列表
      let opt = {
          type: 'post',
          data: {},
          url: configUrl.userList.dataUrl,
          success: function (resp) {
          },
          fail: function (resp) {
          }
      }
      this.userList(opt)
    },
    // 提交订单
    onSubmit: function (e) {
      // this.$vuerify.check()
      if (this.btnHasUsed) {
          console.log("sss")
          return
      }
      this.btnHasUsed = true
      var trip = JSON.parse(sessionStorage.getItem('model'))
      var passenger = this.passengers
      var data = {
        passenger,
        trip,
        deliveryDistrict: this.getAddressList[this.picked] ? this.getAddressList[this.picked].areaName : '',
        reimburseTitle: this.getAddressList[this.picked] ? this.getAddressList[this.picked].invoiceTitle : '',
        deliveryName: this.getAddressList[this.picked] ? this.getAddressList[this.picked].recipientsName : '',
        deliveryDeliverytype: this.deliverytype,
        deliveryCity: this.getAddressList[this.picked] ? this.getAddressList[this.picked].cityName : '',
        linkmanFax: "",
        sourceId: this.sourceId,
        linkmanTele: "",
        deliveryNeedinvoice: this.deliveryNeedinvoice,
        deliveryProvince: this.getAddressList[this.picked] ? this.getAddressList[this.picked].provinceName : '',
        deliveryTele: "",
        deliveryEmail: "",
        deliveryInsurInvoice: this.deliveryInsurInvoice,
        linkmanMobile: this.linkmanMobile,
        deliveryAddress: this.getAddressList[this.picked] ? this.getAddressList[this.picked].address : '',
        linkmanName: this.linkmanName,
        orderBeanOrderPrice: this.total,
        deliveryPostcode: "", // 邮编
        thirdOrder: "",
        token: "",
        paymentType: "4",
        linkmanEmail: this.linkmanEmail,
        deliveryMobile: this.getAddressList[this.picked] ? this.getAddressList[this.picked].phone : '',
        deliveryPostcode: this.getAddressList[this.picked] ? this.getAddressList[this.picked].postCode : '',
      }
      let self = this
      let opt = {
        type: 'POST',
        data: data,
        url: configUrl.airBookOrder.dataUrl,
        success: function (resp) {
          console.log('成功跳转支付')
          if (resp.success) {
            self.btnHasUsed = false
            console.log('成功跳转支付')
            self.$router.go({
               name: 'pay',
               query: {
                 orderNo: resp.data.orderNo,
                 orderPrice: resp.data.orderPrice,
                 orderTypeNum: self.orderTypeNum
               }
             })
          }
        },
        fail: function (resp) {
          showTips(resp.msg, 2500)
          self.btnHasUsed = false
          console.log('请求失败')
        }
      }
      util.getMyCompRequest(opt)
    },
    checkDelivery: function () {
      this
    },
    addNew: function () {
      this.showPop = true
      // 绑定链接
      this.popName = "新增地址"
      var province = {
          provinceName: "请选择",
          provinceUrl: configUrl.selectJdProvince.dataUrl
      }
      var city = {
          cityName: "请选择",
          cityUrl: configUrl.selectJdCity.dataUrl
      }
      var area = {
          areaName: "请选择",
          areaUrl: configUrl.selectJdArea.dataUrl
      }
      this.$broadcast('init', province, city, area)            
    },
    // 添加乘客
    addPassenger: function () {
      this.passengers.push({
        checkIns: false,
        psgtype: 'ADT',
        psgname: '',
        psgbirthdate: '',
        psgsex: 'U',        
        certid: '',
        certtype: 'IDC',
        insCount: 0,
        mobileNo: '',
        price: 0
      });
      this.getTotal()
    },
    // 删除乘客
    removePassenger: function (index) {
      if (this.passengers[index] && this.passengers[index].id && this.passengers[index].id >=0) {
        this.$broadcast('clear-checked', this.passengers[index].id)
      }
      if (this.passengers.length == 1) {
        this.passengers[0].checkIns = false
        this.passengers[0].psgtype = 'ADT'
        this.passengers[0].psgname = ''
        this.passengers[0].psgbirthdate = ''
        this.passengers[0].psgsex = 'U'
        this.passengers[0].certid = ''
        this.passengers[0].certtype = 'IDC'
        this.passengers[0].insCount = 0
        this.passengers[0].mobileNo = ''
        this.passengers[0].price = 0
        return
      }
      this.passengers.$remove(this.passengers[index])      
      
      this.getTotal()
    },
    // 检查选中保险份数
    checkIns: function(index) {
      this.passengers[index].checkIns = !this.passengers[index].checkIns
      if(this.passengers[index].checkIns) {
        this.passengers[index].insCount = 1
      }
      if(!this.passengers[index].checkIns) {
        this.passengers[index].insCount = 0
      }
      this.getTotal()
    },
    // 选择保险
    selectIns: function(index) {
      if (this.passengers[index].insCount == 0) {
        this.passengers[index].checkIns = false
        this.getTotal()
        return false
      }
      this.passengers[index].checkIns = true
      if (this.passengers[index].checkIns) {
        this.getTotal()
      }      
    },
    // 重新搜索
    goReSearch: function() {
      this.$router.go({
        name: 'airSearch',
        query: {
          arrCity: this.trips[0].arrCityName || "北京",
          arrDate: this.trips[0].arrdate,
          depCity: this.trips[0].depCityName || "深圳",
          depDate: this.trips[0].depdate,
          depTime: '',
          sortType: '',
          pageNo: '',
          pageSize: '',
          tripType: "OW"
        }
      })
    },
    // getTotal
    getTotal: function() {
      // 计算总金额
      this.total = 0
      for (var i=0;i<this.trips.length; i++) {
        var trip = this.trips[i]
        for(var j=0; j<this.passengers.length;j++){
          var passenger = this.passengers[j]
          if(passenger.psgtype == 'ADT'){
            passenger.price = parseInt(trip.price||0)+parseInt(trip.buildfee||0)+parseInt(trip.oiltax||0)+20*(passenger.insCount||0)
          }
          if(passenger.psgtype == 'CHD') {
            passenger.price = parseInt(trip.childSalePrice||0)+parseInt(trip.childOilTax||0)+20*(passenger.insCount||0)
          }
          this.total += passenger.price
        }
        this.passengers = this.passengers.concat([])    
      }
    },
    // 改变乘客类型
    changePsgtype: function() {
      this.getTotal()
    },
    // 经停悬浮事件
    flightOver: function (event,sourceId,planeDate,flightNo,isStop) {
      if (isStop==0) {
          return
      }      
      var $el = $(event.target).closest('div')
      var h = parseInt($el.css('height').replace('px'))
      this.x = $el.offset().left - 20
      this.y = $el.offset().top + h -14
      var data = {
          sourceId: sourceId||"",
          planeDate: planeDate||"",
          flightNo: flightNo||""
      }
      let self = this
      this.showTips = false
      this.showTipStop = false
      let opt = {
        type: 'post',
        data: data,
        url: configUrl.stopCity.dataUrl,
        success: function (resp) {  
          self.showTipStop = true     
          self.arrTime=resp.result.arrTime
          self.stopCityCn=resp.result.stopCityCn
          self.takeoffTime=resp.result.takeoffTime
        },
        fail: function (resp) {
          self.showTipStop = false 
        }
    }
    util.getMyrequest(opt)
    },
    flightOut: function () {
      this.showTips = false
      this.showTipStop = false
    },
    changeOrder: function (event,sourceId,airwaysIndex,depCityIndex,arrCityIndex,beginDateIndex,fareItemId,classNO ) {
      var $el = $(event.target).closest('li')
      var h = parseInt($el.css('height').replace('px'))
      this.x = $el.offset().left + 72
      this.y = $el.offset().top + h
      var data = {
          sourceId: sourceId||"",
          airways: airwaysIndex,
          depCity: depCityIndex,
          arrCity: arrCityIndex,
          beginDate: beginDateIndex,
          fareItemId: fareItemId,
          classNO: classNO
      }
      let self = this
      this.showTips = false
      this.showTipStop = false
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
    showNameRule: function() {
      this.showName=true
    },
    hideNameRule: function () {
      this.showName=false
    },
    showInvoiceRule: function() {
      this.showInvoice=true
    },
    hideInvoiceRule: function () {
      this.showInvoice=false
    }
  },
  events: {
    'address-submit': function (form) {
      var self = this
      if (this.btnHasUsed) {
        console.log("sss")
        return
      }
      this.btnHasUsed = true
      var addAddress = {
          type: 'post',
          data: form,
          url: configUrl.addressAdd.dataUrl,
          success: function (resp) {
              self.showPop = false
              self.getAddress()
              self.btnHasUsed = false
          },
          fail: function (resp) {
              self.showPop = true
              self.btnHasUsed = false
              showTips(resp.msg, 2500)             
          }
      }
      this.addressAdd(addAddress) 
    },
    'checked-acc': function (account) {
      let len = this.passengers.length
      if (account.checked) {
        // 有一个存在的
        if (this.passengers[len-1].psgname) {
          this.passengers.push({
            id: account.id,
            checkIns: false,
            psgtype: account.psgtype,
            psgname: account.name,
            psgbirthdate: account.birthday,
            psgsex: account.psgsex,        
            certid: account.certId,
            certtype: account.certtype,
            insCount: 0,
            mobileNo: account.phoneNum,
            price: 0
          });
          this.getTotal()
        } else {// 没有名字，则将选中的名字赋值上去
          this.passengers[len-1].id = account.id,
          this.passengers[len-1].checkIns = false,
          this.passengers[len-1].psgtype = account.psgtype,
          this.passengers[len-1].psgname = account.name,
          this.passengers[len-1].psgbirthdate = account.birthday,
          this.passengers[len-1].psgsex = account.psgsex,        
          this.passengers[len-1].certid = account.certId,
          this.passengers[len-1].certtype = account.certtype,
          this.passengers[len-1].insCount = 0,
          this.passengers[len-1].mobileNo = account.phoneNum,
          this.passengers[len-1].price = 0
          this.getTotal()
        }
      }
      // 不勾选操作，删除数组中对象
      if (!account.checked) {
        let index = this.passengers.indexOf(this.passengers.find(t => t.psgname === account.name))        
        this.removePassenger(index)
      }
    },
    'checked-acc-link': function (account, flag) {
      if (flag) {
        this.linkmanName = account.name
        this.linkmanMobile = account.phoneNum
        this.linkmanEmail = account.email
      }
      if (!flag) {
        this.linkmanName = ""
        this.linkmanMobile = ""
        this.linkmanEmail = ""
      }
    }
  }
}
</script>
<style>
@import url('../css/common.css');
@import url('../css/airOrder.css');
</style>
