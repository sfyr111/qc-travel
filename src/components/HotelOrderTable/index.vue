<template>
    <div class="commodity-lattice">
        <p class="lattice-title">商品信息</p>
        <table>
            <thead>
                <tr>
                    <td>酒店名称</td>
                    <td class="hotel-address">酒店地址</td>
                    <td>房型</td>
                    <td>入住时间</td>
                    <td>付款方式</td>
                    <td>价格</td>
                    <td>预定房间数</td>
                    <td>服务费</td>
                    <td>总价格</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{hotelBookOrder.hotelName}}</td>
                    <td class="hotel-address">{{hotelBookOrder.hotelAddress}}</td>
                    <td>{{hotelBookOrder.roomTypeName}}</td>
                    <td>{{hotelBookOrder.checkinDate}}至{{hotelBookOrder.checkoutDate}}</td>
                    <td>{{hotelBookOrder.userPaymentType=="ALI_PAY"? '支付宝' :
                        hotelBookOrder.userPaymentType=="WX_PAY"? '微信支付' :
                        hotelBookOrder.userPaymentType=="BAL_PAY"? '月结支付' : "未知"}}</td>
                    <td>{{hotelBookOrder.onAverage}}元</td>
                    <td>&times;{{hotelBookOrder.roomNum}}</td>
                    <td>{{hotelBookOrder.serviceFee}}元</td>
                    <td>{{hotelBookOrder.totalFee}}元</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        hotelBookOrder: {
            type: Object
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
    .page1200 .commodity-lattice{
        padding:20px 35px 0;
        background: #fff;
    }
    .page1200 .commodity-lattice p.lattice-title{
        font-weight: bold;
        font-size: 12px;
        line-height:18px;
        padding-bottom: 10px;
        color:#333; 
    }
    .content .page1200 .commodity-lattice table{
        width: 100%;
        text-align: center;
    }
    .content .page1200 .commodity-lattice table tr td{
        padding:0 10px;
    }
    .content .page1200 .commodity-lattice table tr td.hotel-address{
        width: 160px;
    }
    .content .page1200 .commodity-lattice table thead tr{
        background: #f0f0f0;
        height: 35px;
        border:1px solid #d9d9d9;
    }
    .content .page1200 .commodity-lattice table tbody tr{
        height: 70px;
    }
    .content .page1200 .commodity-lattice table tbody tr td{
        border:1px solid #d9d9d9;
    }
</style>