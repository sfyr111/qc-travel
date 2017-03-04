<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="order_detail fr">
                <!-- <table-bar :tab-index="indexNum"></table-bar> -->
                <router-view></router-view>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import 'babel-polyfill';
import { QCHead, QCFooter, ManagerSider, TableBar } from '../../components'
import { airOrder, hotelOrder } from '../../vuex/actions'
import { getAirOrder, getHotelOrder } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
export default {
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        TableBar
    },
    vuex: {
        actions: {
            airOrder,
            hotelOrder
        },
        getters: {            
            getAirOrder,
            getHotelOrder        
        }
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 1,
            showFlyOrder: 'true',
            hasLoadHotelOrder: false
        }
    },
    created: function () {        
      this.showFlyOrder = this.$route.query.showFlyOrder || 'true'  
    },
    methods: {
      tabToggleHotel: function () {
        this.showFlyOrder = 'false'
        
        this.hasLoadHotelOrder = true
      },
      tabToggleFly: function () {
        this.showFlyOrder = 'true'
      }
    }
}
</script>
<style>
    i{
        font-style: normal;
    }
    b{
        font-weight: normal;
    }
    h1,h2,h3,h4,h5,h6{
        margin:0;
        padding:0;
    }
    .content{
        width: 100%;
        background: #f8f8f8;
        min-height: 620px;
    }
    .content .page1200{
        padding-top: 10px;
    }
    .content .page1200 .title{
        width: 150px;
        background: #f0f0f0;
    }
    .content .page1200 .title ul{
        padding:0 10px;
    }
    .content .page1200 .title ul li{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color:#333333;
        border-bottom: 1px solid #dcdcdc;
        padding-left: 18px;
        cursor: pointer;
    }
     .content .page1200 .title ul li span{
        color:#999999;
    }
    .content .page1200 .title ul li.active{
        color:#dd1827;
        background: #fff;
        border-left: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        width: 121px;
        margin-left: -9px;
        padding-left: 26px;
    }
    .content .page1200 .title ul li.active span{
        color:#dd1827;
    }
    .content .page1200 .order_detail{
        width: 1030px;
    }
    
    .content .page1200 .order_detail ul{
        padding:0px 10px 0 10px;
        background: #fff;
        color:#656565;
        margin-bottom: 40px;
    }
    /*机票订单*/
    .content .page1200 .order_detail ul.fly{
        /*display: none;*/
    }
    .content .page1200 .order_detail ul.fly li.type{
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        background:#eeeeee;
    }
    .content .page1200 .order_detail ul.fly li.type span{
        display:block;
        width:15%;
        float: left;
        text-align: center; 
    }
    .content .page1200 .order_detail ul.fly li.type span.type1{
        width: 25%;
    }
    .content .page1200 .order_detail ul.fly li.data{
        height: 105px;
        border-bottom: 1px dashed #dcdcdc;
    }
    .content .page1200 .order_detail ul.fly li.data:last-child {
      border-bottom: none;
    }
    .content .page1200 .order_detail ul.fly li.data .fl{
        width: 15%;
        height: 100%;
        text-align: left;
        font-size: 12px;
    }
    .content .page1200 .order_detail ul.fly li.data .list1{
        cursor: pointer;
        width: 25%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 55px;
        background:url(../../assets/fly.png) no-repeat 15px center;
    }
    .content .page1200 .order_detail ul.fly li.data .list4,
    .content .page1200 .order_detail ul.fly li.data .list5,
    .content .page1200 .order_detail ul.fly li.data .list6{
        text-align: center;
        line-height: 105px;
    }
    .content .page1200 .order_detail ul.fly li.data .list5{
        color:#fe3c3c;
    }
    .content .page1200 .order_detail ul.fly li.data .list6 a{
        /*color:#39a9fd;*/
    }
     .content .page1200 .order_detail ul.fly li.data .list6 a:hover{
        color:#dd1827;
    }
    .content .page1200 .order_detail ul.fly li.data p.top{
        padding-top: 32px;
    }
    .content .page1200 .order_detail ul.fly li.data .list1 p.top{
        /*color:#307aff;*/
    }
    .content .page1200 .order_detail ul.fly li.data .list1 p.top:hover {
        color: #dd1827;
    }
    .content .page1200 .order_detail ul.fly li.data p{
        line-height: 20px;
    }
    .content .page1200 .order_detail ul.fly li.data p.time{
        color:#979797;
    }
    .content .page1200 .order_detail ul.fly li.data .list2 p i{
        display: inline-block;
        width: 30px;
        height: 12px;
        background: url(../../assets/point.png) no-repeat center;
    }
    .content .page1200 .order_detail ul.fly li.data p.top2{
        padding-top: 9px;
    }
    /*酒店订单*/
    .content .page1200 .order_detail ul.hotel{
        display: block;
    }
    .content .page1200 .order_detail ul.hotel li.type{
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        background:#eeeeee;
    }
    .content .page1200 .order_detail ul.hotel li.type span{
        display:block;
        float: left;
        text-align: center; 
    }
    .content .page1200 .order_detail ul.hotel li.type span.type1{
        width: 20%;
    }
    .content .page1200 .order_detail ul.hotel li.type span.type2,
    .content .page1200 .order_detail ul.hotel li.type span.type5,
    .content .page1200 .order_detail ul.hotel li.type span.type6,
    .content .page1200 .order_detail ul.hotel li.type span.type7{
        width: 12%;
    }
    .content .page1200 .order_detail ul.hotel li.type span.type3,
    .content .page1200 .order_detail ul.hotel li.type span.type4{
        width: 16%;
    }
    .content .page1200 .order_detail ul.hotel li.data{
        height: 100px;
        border-bottom: 1px dashed #dcdcdc;
    }
    .content .page1200 .order_detail ul.hotel li.data:last-child {
      border-bottom: none;
    }
    .content .page1200 .order_detail ul.hotel li.data .fl{
        height: 100%;
        text-align: center;
        font-size: 12px;
    }
    .content .page1200 .order_detail ul.hotel li.data .list1{
        width: 20%;
        box-sizing: border-box;
        padding-left: 55px;
        background:url(../../assets/hotel.png) no-repeat 15px center;
        text-align: left;
        cursor: pointer;
    }
    .content .page1200 .order_detail ul.hotel li.data .list2,
    .content .page1200 .order_detail ul.hotel li.data .list5,
    .content .page1200 .order_detail ul.hotel li.data .list6,
    .content .page1200 .order_detail ul.hotel li.data .list7{
        width: 12%;
        line-height: 100px;
        overflow: hidden;
    }
    .content .page1200 .order_detail ul.hotel li.data .list3 {
      display: table;
      width: 16%;
      height: 100px;
    }
    .content .page1200 .order_detail ul.hotel li.data .list3 a {
        display: table-cell;
        vertical-align: middle;
        height: 100%;
    }
    .content .page1200 .order_detail ul.hotel li.data .list4{
        width: 16%;
        text-align: center;
        line-height: 100px;
    }
    .content .page1200 .order_detail ul.hotel li.data p.top{
        padding-top: 30px;
    }
    .content .page1200 .order_detail ul.hotel li.data p{
        line-height: 20px;
    }
    .content .page1200 .order_detail ul.hotel li.data p.time{
        color:#979797;
    }
    .content .page1200 .order_detail ul.hotel li.data .list1 p.top{
        /*color:#307aff;*/
    }
    .content .page1200 .order_detail ul.hotel li.data .list1 p.top:hover {
        color: #dd1827;
    }
    .content .page1200 .order_detail ul.hotel li.data .list6{
        color:#fe3c3c;
    }
    .content .page1200 .order_detail ul.hotel li.data .list7 a{
        /*color:#39a9fd;*/
    }
    .content .page1200 .order_detail ul.hotel li.data .list7 a:hover{
        color:#dd1827;
    }
</style>