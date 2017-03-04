<template>
    <div class="state_hotel">
        <p class="information">
            <span>订单号：<i>{{hotelBookOrder.orderNo}}</i></span>
            <span>状态：<i>{{hotelBookOrder.tradingStatus == 0 ? "待付款" : 
                            hotelBookOrder.tradingStatus == 1 ? "预定中" : 
                            hotelBookOrder.tradingStatus == 2 ? "待确认" : 
                            hotelBookOrder.tradingStatus == 3 ? "下单失败" : 
                            hotelBookOrder.tradingStatus == 4 ? "预定成功" : 
                            hotelBookOrder.tradingStatus == 5 ? "已取消" : "联系客服" }}</i></span>
            <p class="state-notice" v-if="hotelBookOrder.tradingStatus == 0">尊敬的用户，您的订单已提交，请在10分钟内完成付款，超时系统将自动取消订单</p>
            <b class="toPay" v-if="hotelBookOrder.tradingStatus == 0" @click.stop="goPay()">立即支付</b>
            <!-- <b class="cancel" v-if="hotelBookOrder.tradingStatus == 0" @click.stop="goPay()">取消订单</b> -->
            <p class="state-notice"  v-if="hotelBookOrder.tradingStatus == 3">尊敬的用户，您提交的订单酒店满房，酒店取消订单{{ order.returnStatus !== 1 ? '我们会联系酒店尽快还款' : '' }}，请<a href="javascript:void(0);" v-link="{
                name: 'hotelsearch'}">重新预定酒店</a>，给您带来不便我们深表歉意！</p>
        </p>
    </div>
</template>
<script>
export default {
    props: {
        hotelBookOrder: {
            type: Object
        }
    },
    methods: {
        goPay: function () {
            this.$router.go({
               name: 'pay',
               query: {
                 orderNo: this.hotelBookOrder.orderNo,
                 orderPrice: this.hotelBookOrder.totalFee,
                 orderTypeNum: 0
               }
             })
        }
    }
}
</script>
<style scoped>
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
    .page1200 .state_hotel{        
        width: 1200px;
        background: #fbeedd;
        margin-bottom: 15px;
        position: relative;
    }
    .page1200 .state_hotel p.information{
        padding: 25px 0 20px 20px;
        font-size: 14px;
        line-height: 20px;
        color:#dd7d02;
        font-weight: bold;
    }
    .page1200 .state_hotel p.information span{
        display: inline-block;
        margin-right: 35px;
    }
    .page1200 .state_hotel p.information span{
        display: inline-block;
        margin-right: 35px;
    }
    .page1200 .state_hotel p.state-notice{
        padding:0 0 10px 20px;
        font-size: 12px;
        line-height: 20px;
        color:#fe3a3b;
    }
    .page1200 .state_hotel p.state-notice a {
        cursor: pointer;
        text-decoration: underline;
        color: #31acfa;
    }
    .page1200 .state_hotel b.toPay{
        display: block;
        width: 80px;
        height: 30px;
        background: #fc7546;
        border-radius: 3px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color:#fff;
        position: absolute;
        right:35px;
        top:50%;
        margin-top: -15px;
        cursor: pointer;
    }
    .page1200 .state_hotel b.cancel{
        display: block;
        width: 80px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color:#31acfa;
        position: absolute;
        right:120px;
        top:50%;
        margin-top: -15px;
        cursor: pointer;
    }
    .page1200 .state_hotel p.information span{
        display: inline-block;
        margin-right: 35px;
    }
    .page1200 .state_hotel p.state-notice i{
        cursor: pointer;
        text-decoration: underline;
        color:#31acfa;
    }
</style>
