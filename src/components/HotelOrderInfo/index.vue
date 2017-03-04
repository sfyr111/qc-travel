<template>
    <div class="information-list">
        <ul>
            <li>
                <p class="information-title" >订单信息</p>
                <p>订单编号：<span>{{hotelBookOrder.orderNo}}</span></p>
                <p>下单时间：<span>{{hotelBookOrder.createDate}}</span></p>
                <p v-if="hotelBookOrder.orderCancelDate">取消时间：<span>{{hotelBookOrder.orderCancelDate}}</span></p>
                <p v-if="hotelBookOrder.payDate">付款时间：<span>{{hotelBookOrder.payDate}}</span></p>                
                <p>订单状态：<span>{{hotelBookOrder.tradingStatus == 0 ? "待付款" : 
                                    hotelBookOrder.tradingStatus == 1 ? "预定中" : 
                                    hotelBookOrder.tradingStatus == 2 ? "待确认" : 
                                    hotelBookOrder.tradingStatus == 3 ? "下单失败" : 
                                    hotelBookOrder.tradingStatus == 4 ? "预定成功" : 
                                    hotelBookOrder.tradingStatus == 5 ? "已取消" : "联系客服" }}</span></p>
            </li>
            <li>
                <p class="information-title" >入住人信息</p>
                <p v-for="people in hotelBookOrder.travelHotelCheckMemberVO">姓名：<span>{{people.name}}</span></p>
                <!-- <p>房间保留时间：<span>20:00</span>（请于您指定的房间保留时间前3小时内到店）</p> -->
            </li>
            <li>
                <p class="information-title" >联系人信息</p>
                <p>姓名：<span>{{hotelBookOrder.conName}}</span></p>
                <p>电话：<span>{{hotelBookOrder.conPhone}}</span></p>
            </li>
            <li>
                <p class="information-title" >报销凭证及发票信息</p>
                <p>报销凭证类型：<span>{{hotelBookOrder.itemName}}</span></p>
                <p>发票抬头：<span>{{hotelBookOrder.title}}</span></p>
                <!-- <p>邮寄方式：<span>免费邮寄</span></p> -->
                <p>收件人：<span>{{hotelBookOrder.recipientName}}</span></p>
                <p>手机号：<span>{{hotelBookOrder.phone}}</span></p>
                <p>地址：<span>{{hotelBookOrder.recipientAddress}}</span></p>
            </li>
            <li class="total">
                <p>订单总额：<i>￥{{hotelBookOrder.totalFee}}</i>&nbsp;&nbsp;<!-- <b>查看详情</b> --></p>
                <!-- 查看详情弹出框 -->
                <!-- <div class="rectangle">
                    <p class="room clearfix">房费：<span>￥998.00&times;2</span></p>
                    <p class="service clearfix">服务费：<span>￥10.00&times;2</span></p>
                    <h2>订单总金额：<i>￥954223.00</i></h2>
                </div> -->
                <!-- 立即支付按钮 -->
                <b class="toPay" v-if="hotelBookOrder.tradingStatus == 0" @click.stop="goPay()">立即支付</b>
            </li>
        </ul>
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
    .page1200 .information-list{
        background: #fff;
        padding:0 35px;
    }
    .page1200 .information-list ul li{
        border-bottom: 1px dashed #ddd;
        padding:20px 0;
    }
    .page1200 .information-list ul li p{
        font-size: 12px;
        line-height: 26px;
        color:#656565;
    }
    .page1200 .information-list ul li p.information-title{
        font-weight: bold;
        color:#333;
    }
    .page1200 .information-list ul li p span{
        color:#333;
    }
    .page1200 .information-list ul li.total{
        border:0;
        padding:30px 0 40px;
        position: relative;
    }
    .page1200 .information-list ul li.total p{
        font-size: 18px;
        font-weight: bold;
        color:#333;
    }
    .page1200 .information-list ul li.total p i{
        color:#f73b3c;
    }
    .page1200 .information-list ul li.total p b{
        font-size: 14px;
        color:#36a8f1;
        cursor: pointer;
    }
    .page1200 .information-list ul li.total b.toPay{
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
        right:0;
        top:50%;
        margin-top: -15px;
        cursor: pointer;
        display: none;
    }
    .page1200 .information-list ul li.total div.rectangle{
        width: 250px;
        height: 146px;
        background: url(../../assets/rectangle.png) no-repeat;
        position: absolute;
        left:235px;
        bottom: 30px;
        display: none;
    }
    .page1200 .information-list ul li.total div.rectangle p.room{
        font-size: 12px;
        line-height: 14px;
        padding:30px 30px 15px;
    }
    .page1200 .information-list ul li.total div.rectangle p.service{
        font-size: 12px;
        line-height: 14px;
        padding:0 30px 30px;
    }
    .page1200 .information-list ul li.total div.rectangle p span{
        display: block;
        float: right;
        text-align: right;
    }
    .page1200 .information-list ul li.total div.rectangle h2{
        width: 210px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        background: #f2fbff;
        margin:0 auto;
        padding-left: 10px;
    }
    .page1200 .information-list ul li.total div.rectangle h2 i{
        color:#fb3939;
    }
</style>