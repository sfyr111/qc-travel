<template>
  <p class="nav">
    <span class="active" v-link="{ path: '/orderList/airOrderList' }">机票订单</span>
    <span class="" v-link="{ path: '/orderList/hotelOrderList' }">酒店订单</span>
  </p>
	<ul class="fly">
    <li class="type clearfix">
        <span class="type1">订单号</span>
        <span>行程名称</span>
        <span>时间</span>
        <span>订单状态</span>
        <span>金额</span>
        <span>操作</span>
    </li>    
    <div v-if="getAirOrder.rows">
      <li class="data clearfix" v-for="item in getAirOrder.rows">
        <div class="list1 fl" @click.stop="goAirOrderDetail(item.orderNo)">
          <p class="top">订单号：<span>{{item.orderNo}}</span></p>
          <p class="time">{{item.placeOrderDate}}</p>
        </div>
        <div v-if="item.trips.length == 1">
          <div class="list2 fl" v-for="trip in item.trips">
            <p class="top"><span>{{trip.depCityName || " "}}</span><i></i><span>{{trip.arrCityName}}</span></p>
            <p>{{trip.airwaysCn}}&nbsp;{{trip.flightNo}}</p>
          </div>
        </div>
        <div v-if="item.trips.length > 1">
          <div class="list2 fl">
            <p class="top2"><span>{{item.trips[0].depCityName || " "}}</span><i></i><span>{{item.trips[0].arrCityName}}</span></p>
            <p>{{item.trips[0].airwaysCn}}&nbsp;{{item.trips[0].flightNo}}</p>
            <p class="top2"><span>{{item.trips[1].depCityName}}</span><i></i><span>{{item.trips[1].arrCityName}}</span></p>
            <p>{{item.trips[1].airwaysCn}}&nbsp;{{item.trips[1].flightNo}}</p>
          </div>
        </div>
        <div v-if="item.trips.length == 1">
          <div class="list3 fl" v-for="trip in item.trips">
            <p class="top">出发时间</p>
            <p class="time">{{trip.depdate || " "}}&nbsp;{{trip.deptime.substring(0,2)+':'+trip.deptime.substring(2,4)}}</p>
          </div>
        </div>
        <div v-if="item.trips.length > 1">
          <div class="list3 fl">
            <p class="top2">出发时间</p>
            <p class="time">{{item.trips[0].depdate || " "}}&nbsp;{{item.trips[0].deptime.substring(0,2)+':'+item.trips[0].deptime.substring(2,4)}}</p>
            <p class="top2">出发时间</p>
            <p class="time">{{item.trips[1].depdate}}&nbsp;{{item.trips[1].deptime.substring(0,2)+':'+item.trips[1].deptime.substring(2,4)}}</p>
          </div>
        </div>
        <!-- <div class="list3 fl">
          <p class="top">出发时间</p>
          <p class="time">{{item.depdate}}&nbsp;{{item.deptime}}</p>
        </div> -->
        <div class="list4 fl">{{item.tradingStatus === 0 ? "订单提交成功" : 
                                item.tradingStatus === 1 ? "等待付款" : 
                                item.tradingStatus === 2 ? "出票中" : 
                                item.tradingStatus === 3 ? "下单失败" : 
                                item.tradingStatus === 4 ? "出票成功" : 
                                item.tradingStatus === 5 ? "已取消" : ""}}</div>
        <div class="list5 fl">￥{{item.orderBeanOrderPrice || ""}}</div>
        <div class="list6 fl">
          <a v-if="item.tradingStatus === 0" href="javascript:void(0);" v-link="{
           name: 'pay',
           query: {
             orderNo: item.orderNo,
             orderPrice: item.orderBeanOrderPrice,
             orderTypeNum: 1
           }
         }">去付款</a>&nbsp;
        <a href="javascript:void(0);" v-link="{ name: 'main' }">再次预定</a></div>
      </li> 
    </div> 
    <loading v-show="isLoading"></loading>
    <no-data v-show="!isLoading && getAirOrder.rows && !getAirOrder.rows.length"></no-data>   
    <pagation v-show="isShowPagePagination"></pagation>                
  </ul>
</template>
<script>
import { NoData, Loading, Pagation } from '../../components'
import { airOrder  } from '../../vuex/actions'
import { getAirOrder } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
export default {  
  components: {
    NoData,
    Loading,
    Pagation
  },
  vuex: {
      actions: {
          airOrder
      },
      getters: {            
          getAirOrder      
      }
  },
  data() {
    return {
      isLoading: false,
      isShowPagePagination: false,
      page: 0,
      pageSize: 10
    }
  },
  created: function () {
    this.init()
  },
	methods: {
    init: function () {
      var self = this
      self.isLoading = true
      self.isShowPagePagination = false
      let opt = {
        type: 'post',
        data: {
          page: this.page,
          pageSize: this.pageSize
        },
        url: configUrl.airOrder.dataUrl,
        success: function (resp) {
          self.isLoading = false
          self.isShowPagePagination = true  
          self.$broadcast('reload-air-list', resp.data.total, self.pageSize, false)
        },
        fail: function (resp) {
          self.isLoading = false
          self.isShowPagePagination = false
        }
      }
      this.airOrder(opt) 
    },
    goAirOrderDetail: function (orderId) {
      this.$router.go({
        name: 'airOrderDetail',
        query: {
          orderId: orderId
        }
      })
    },
  },
  events: {
    'page-click': function (data) {
      this.page = data.pageIndex + 1
      //  查询酒店列表
      this.init(false)
    },
  }
}
</script>
<style scoped>
p.nav{
    height: 42px;
    background:#fff;
    margin-bottom: 10px;
}
p.nav span{
    display: inline-block;
    width: 95px;
    height: 42px;
    box-sizing: border-box;
    border-bottom: 2px solid #fff;
    text-align: center;
    font-size: 14px;
    line-height: 42px;
    color:#656565;
    cursor: pointer;
}
p.nav span.active{
    color:#dd1827;
    border-bottom: 2px solid #dd1827;
}
</style>