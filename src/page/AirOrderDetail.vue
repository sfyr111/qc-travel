<template>    
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200">
            <order-head v-if="getAirBookOrder.order" :order="getAirBookOrder.order"></order-head>
            <order-table :ticket-list-beans="getAirBookOrder.trips"></order-table>
            <order-inf v-if="getAirBookOrder.travelReimburseInfo" :order="getAirBookOrder.order" :dispatch-info="getAirBookOrder.travelReimburseInfo"></order-inf>             
            <tips 
            :x="x"
            :y="y"
            :show.sync="showTips" 
            :ticket-turn="ticketTurn"
            :ticket-change="ticketChange"
            :ticket-back="ticketBack"></tips>    
            <no-data v-if="!getAirBookOrder.trips || getAirBookOrder.trips.length==0"></no-data>      
        </div>  
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import 'babel-polyfill';
import $ from 'jquery'
import { QCHead, QCFooter, OrderHead, OrderTable, OrderInf, Tips } from '../components'
import NoData from '../components/NoData'
import { airBookOrder } from '../vuex/actions'
import { getAirBookOrder } from '../vuex/getters'
import configUrl from '../data/configUrl'
import util from '../utils/util'
export default {
    vuex: {
        actions: {
            airBookOrder
        },
        getters: {
            getAirBookOrder
        }
    },
    created: function () {
        let orderId = this.$route.query.orderId || ""
        var self = this
        let airOpt = {
            type: 'post',
            data: {
                orderId: orderId
            },
            url: configUrl.airOrderDetail.dataUrl,
            success: function (resp) {
                console.log('成功')
            },
            fail: function (resp) {
                console.log('失败')
                console.log(resp)
            }
        }
        this.airBookOrder(airOpt)    
    },
	data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 1,
            showFlyOrder: 'true',
            hasLoadHotelOrder: false,
            showTips: false,
            x: 0,
            y: 0,
            ticketTurn: '',
            ticketChange: '',
            ticketBack: ''
        }
    },
	components: {
		QCHead, QCFooter, OrderHead, OrderTable, OrderInf, Tips, NoData
	},
    events: {
        'show-tip': function (ticketTurn, ticketChange, ticketBack) {
            var $el = $(event.target).closest('td')
            var h = parseInt($el.css('height').replace('px'))
            this.x = $el.offset().left - 350
            this.y = $el.offset().top + h - 160
            this.showTips = false
            if (this.getAirBookOrder) {
                this.showTips = true
                this.ticketTurn=ticketTurn
                this.ticketChange=ticketChange
                this.ticketBack=ticketBack
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
@import url('../css/airOrderDetail.css');
</style>