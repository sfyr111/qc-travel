<template>
	<p class="nav">
		<span :class="{ 'active' : tabIndex == 0 }" v-link="{ path: '/orderList/airOrderList' }">机票订单</span>
		<span :class="{ 'active' : tabIndex == 1 }" v-link="{ path: '/orderList/hotelOrderList' }">酒店订单</span>
	</p>
</template>
<script>
export default {
	props: {
		tabIndex: Number
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