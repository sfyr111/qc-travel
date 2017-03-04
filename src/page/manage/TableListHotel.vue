<template>
	<p class="nav">
	    <span class="" v-link="{ path: '/orderList/airOrderList' }">机票订单</span>
	    <span class="active" v-link="{ path: '/orderList/hotelOrderList' }">酒店订单</span>
	</p>
	<ul class="hotel">
	    <li class="type clearfix">
	       <span class="type1">订单号</span>
	       <span class="type2">目的地</span>
	       <span class="type3">酒店名称</span>
	       <span class="type4">时间</span>
	       <span class="type5">订单状态</span>
	       <span class="type6">金额</span>
	       <span class="type7">操作</span>
	    </li>
	    <li class="data clearfix" v-for="row in getHotelOrder.rows">
	       <div class="list1 fl" @click.stop="goHotelOrderDetail(row.orderNo)">
	           <p class="top">订单号：<span>{{row.orderNo}}</span></p>
	           <p class="time">{{row.createDate}}</p>
	       </div>
	       <div class="list2 fl">{{row.cityName}}</div>
	       <div class="list3 fl">
	          <a href="javascript:void(0);">{{row.hotelName}}</a>
	       </div>
	       <div class="list4 fl">
	          <!-- <p class="top">入住时间（1晚）</p> -->
	        {{row.checkinDate}}
	       </div>
	       <div class="list5 fl">{{row.tradingStatus === 0 ? "待付款" : 
	                              row.tradingStatus === 1 ? "预定中" : 
	                              row.tradingStatus === 2 ? "支付成功" : 
	                              row.tradingStatus === 3 ? "下单失败" : 
	                              row.tradingStatus === 4 ? "预订成功" : 
	                              row.tradingStatus === 5 ? "已取消" : ""}}</div>
	       <div class="list6 fl">￥{{row.totalFee}}</div>
	       <div class="list7 fl">
	       <a v-if="row.tradingStatus === 0" href="javascript:void(0);" v-link="{
	         name: 'pay',
	         query: {
	           orderNo: row.orderNo,
	           orderPrice: row.totalFee,
	           orderTypeNum: 0
	         }
	       }">去付款</a>&nbsp;
	        <a href="#" v-link="{ name: 'main' }">再次预定</a>
	        </div>
	    </li>    
	    <loading v-if="isLoading"></loading>
    	<no-data v-if="!isLoading && getHotelOrder.rows && !getHotelOrder.rows.length"></no-data>   
    	<pagation v-show="isShowPagePagination"></pagation>            
	</ul>	
</template>
<script>
import { NoData, Loading, Pagation } from '../../components'
import { hotelOrder  } from '../../vuex/actions'
import { getHotelOrder } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
export default {  
	components: {
		NoData,
		Loading,
		Pagation
	},
	vuex: {
		actions: {
			hotelOrder
		},
		getters: {            
			getHotelOrder      
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
			let hotelOpt = {
				type: 'post',
				data: {
					page: this.page,
					pageSize: this.pageSize
				},
				url: configUrl.hotelOrder.dataUrl,
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
			this.hotelOrder(hotelOpt) 
		},      
		goHotelOrderDetail: function (orderNo) {
			this.$router.go({
				name: 'hotelOrderDetail',
				query: {
					orderNo: orderNo
				}
			})
		}
	},	
	events: {
		'page-click': function (data) {
			this.page = data.pageIndex + 1
			//	查询酒店列表
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