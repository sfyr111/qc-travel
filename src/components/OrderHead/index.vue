<template>
	<div class="state">
        <p class="information">
            <span>订单号：<i>{{orderId}}</i></span>
            <span>状态：<i v-if="order.tradingStatus>=0">{{
                            order.tradingStatus === 0 ? "未付款" :
                            order.tradingStatus === 1 ? "支付成功" : 
                            order.tradingStatus === 2 ? "出票中" :
                            order.tradingStatus === 3 ? "下单失败" :
                            order.tradingStatus === 4 ? "出票成功" :
                            order.tradingStatus === 5 ? "已取消 " : "找客服"}}</i></span>
        </p>
        <p class="state-notice" v-if="order.tradingStatus === 0">尊敬的用户，因航班价格变动频繁，请在10分钟内完成支付，超时系统将自动取消订单</p>
        <p class="state-notice" v-if="order.tradingStatus === 5">
            <em v-if="order.userPayStatus === 1">
                尊敬的用户，您的机票已退订成功，等待航空公司退款。
            </em>
            <em v-else>
                尊敬的用户，系统超时，已自动取消订到。
            </em>
        </p>
        <b class="toPay" v-if="order.tradingStatus === 0" @click.stop="goPay()">立即支付</b>
        <!-- <b class="cancel">取消订单</b> -->
        <p class="state-notice" v-if="order.tradingStatus === 3">尊敬的用户，您提交的机票订单出票失败，请<a href="javascript:void(0);" v-link="{ name:'airSearch' }">重新预定机票</a>{{ order.returnStatus !== 1 ? '，等待航空公司退款，给您带来不便我们深表歉意！' : '' }}</p>
    </div>
</template>
<script>
export default {
    props: {
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