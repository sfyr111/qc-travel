<template>    
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200">
            <hotel-order-head v-if="getHotelBookOrder" :hotel-book-order="getHotelBookOrder"></hotel-order-head>
            <hotel-order-table v-if="getHotelBookOrder" :hotel-book-order="getHotelBookOrder"></hotel-order-table>
            <hotel-order-info v-if="getHotelBookOrder" :hotel-book-order="getHotelBookOrder"></hotel-order-info> 
            <no-data v-if="!getHotelBookOrder"></no-data> 
        </div>  
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import 'babel-polyfill';
import $ from 'jquery'
import { QCHead, QCFooter, HotelOrderHead, HotelOrderTable, HotelOrderInfo } from '../components'
import NoData from '../components/NoData'
import { hotelBookOrder } from '../vuex/actions'
import { getHotelBookOrder } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'
export default {
    vuex: {
        actions: {
            hotelBookOrder
        },
        getters: {
            getHotelBookOrder
        }
    },
    created: function () {
        let orderNo =  this.$route.query.orderNo || 2016121520093
        var self = this
        let airOpt = {
            type: 'post',
            data: {
                orderNo: orderNo
            },
            url: configUrl.hotelOrderDetail.dataUrl,
            success: function (resp) {
                console.log('成功')
            },
            fail: function (resp) {
                console.log('失败')
                console.log(resp)
            }
        }
        this.hotelBookOrder(airOpt)    
    },
	data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 1,
            showFlyOrder: 'true',
            hasLoadHotelOrder: false,
            showTips: false,
            content: '',
            x: 0,
            y: 0
        }
    },
	components: {
		QCHead, QCFooter, HotelOrderHead, HotelOrderTable, HotelOrderInfo, NoData
	},
    events: {
        'show-tip': function (content, showTips) {
          var $el = $(event.target).closest('p')
          var h = parseInt($el.css('height').replace('px'))
          this.x = $el.offset().left + 420
          this.y = $el.offset().top - 130
          if (content) {
            this.content = content
            this.showTips = true
          }
        },
        'close-tip': function (showTips) {
            this.showTips = false
        }
    }
}
</script>
<style>
@import url('../css/common.css');
</style>