<template>
    <div class="information-list">
        <ul>
            <li>
                <p class="information-title" >订单信息</p>
                <p>订单编号：<span>{{orderId}}</span></p>
                <p>下单时间：<span>{{order.placeOrderDate}}&nbsp;{{order.placeOrderTime}}</span></p>
                <!-- <p>付款时间：<span>{{order.placeOrderDate}}&nbsp;{{order.placeOrderTime.substring(0,2)+':'+order.placeOrderTime.substring(2,4)}}</span></p> -->
                <p>支付方式：<span>{{order.userPayType=="WX_PAY"? "微信支付" :
                                    order.userPayType=="ALI_PAY"? "支付宝支付" :
                                    order.userPayType=="MALL_BAL_PAY"? "余额支付" :
                                    order.userPayType=="BAL_PAY"? "月结支付" : "未知"}}</span></p>
            </li>
            <li>
                <p class="information-title" >联系人信息</p>
                <p>姓名：<span>{{order.conctactName}}</span></p>
                <p>手机：<span>{{order.conctactMobile}}</span></p>
                <p>电子邮件：<span>{{order.conctactEmail}}</span></p>
            </li>
            <li>
                <p class="information-title" >报销凭证配送信息</p>
                <!-- <p>报销凭证类型：<span>{{dispatchInfo.deliveryType==1?'不要行程单':
                                        dispatchInfo.deliveryType==2?'机场自取':
                                        dispatchInfo.deliveryType==3?'配送行程单':""}}</span></p> -->
                <p>发票抬头：<span>{{dispatchInfo.title}}</span></p>
                <p>邮寄方式：<span>{{dispatchInfo.deliverytype==="NOD"?'不邮寄行程单':
                                    dispatchInfo.deliverytype==="FRP"?'平邮':
                                    dispatchInfo.deliverytype==="EMS"?'快递到付':""}}</span></p>
                <p>收件人：<span>{{dispatchInfo.recipients}}</span></p>
                <p>手机号：<span>{{dispatchInfo.telNo}}</span></p>
                <p>地址：<span>{{dispatchInfo.provinceName}}{{dispatchInfo.cityName}}{{dispatchInfo.areaName}}{{dispatchInfo.addr}}</span></p>
            </li>
            <li class="total">
                <p>订单总额：<i>￥{{order.orderBeanOrderPrice}}</i></p>
                <!-- 立即支付按钮 -->
                <b v-if="order.orderStatus === 1" @click.stop="goPay()">立即支付</b>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        dispatchInfo: {
            type: Object
        },
        order: {
            type: Object
        },
        order: {
            type: Object
        }
    },
    created: function () {
        this.orderId = this.$route.query.orderId || 123456
    },
    data: function () {
        return {
            orderId: ""
        }
    },
    methods: {
        goPay: function () {
            this.$router.go({
               name: 'pay',
               query: {
                 orderNo: this.order.orderCode,
                 orderPrice: this.order.orderMoney,
                 orderTypeNum: 1
               }
             })
        }
    }
}
</script>