<template>
	<div class="sider_title fl">
        <ul>
            <div>{{active_num}}</div>
            <li v-link="{ path: '/orderList/airOrderList' }" :class="{ 'active' : activeNum == 1 }">订单中心&nbsp;&nbsp;<span>&gt;</span></li>
            <li v-link="{ name:'monthList' }" :class="{ 'active' : activeNum == 2 }">账单管理&nbsp;&nbsp;<span>&gt;</span></li>
            <li v-link="{ name:'safeCenter' }" :class="{ 'active' : activeNum == 3 }">安全中心&nbsp;&nbsp;<span>&gt;</span></li>
            <li v-link="{ name:'userList' }" :class="{ 'active' : activeNum == 4 }">常用联系人&nbsp;&nbsp;<span>&gt;</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        activeNum: {
            type: Number,
            twoWay: true,
            default: 1
        }
    }
}
</script>
<style>
	.content .page1200 .sider_title{
        width: 150px;
        background: #f0f0f0;
    }
    .content .page1200 .sider_title ul{
        padding:0 10px;
    }
    .content .page1200 .sider_title ul li{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color:#333333;
        border-bottom: 1px solid #dcdcdc;
        padding-left: 18px;
        cursor: pointer;
    }
    .content .page1200 .sider_title ul li:last-child{
        border-bottom: none;
    }
    .content .page1200 .sider_title ul li span{
        color:#999999;
    }
    .content .page1200 .sider_title ul li.active{
        color:#dd1827;
        background: #fff;
        border-bottom: 1px solid #f0f0f0;
        width: 121px;
        margin-left: -8px;
        padding-left: 26px;
        padding-top: 1px;
        margin-top: -1px;
    }
    .content .page1200 .sider_title ul li.active span{
        color:#dd1827;
    }
</style>
