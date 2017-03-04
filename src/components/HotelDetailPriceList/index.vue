<template>
	<div class="hotel_detail_price_list">
		<ul>
			<li v-for="(index, item) in priceobj.hotelRooms">
				<div v-if="PaymentToStoreFilter(item.hotelPlans).length">
					<div class="head clearfix">
						<div class="fl">
							<h1 class="font16">{{ item.name }}</h1>
							<p>
								房间：{{ item.area }}平米&nbsp;{{ item.floors }}层
							</p>
							<p>
								床型：{{ item.bedDesc }}
							</p>
						</div>
						<div class="fr right">
							<span class="fl color_red">
								¥<em class="font24">{{ Math.ceil(item.lowestAvgPrice) }}</em>起
							</span>
							<div class="fl open_more font14 none">
								<em>展开报价</em>
								<i class="fa fa-caret-down"></i>
								<i class="fa fa-caret-up none"></i>
							</div>
							<div class="fl open_more font14 all_order none">
								<em>全部订完</em>
								<i class="fa fa-caret-down"></i>
								<i class="fa fa-caret-up none"></i>
							</div>
						</div>
					</div>
					
					<div class="hotel_detail_price_list_data">
						<table>
							<tr>
								<th>产品名称</th>
								<th>促销优惠</th>
								<th>早餐</th>
								<th class="none">取消政策</th>
								<th>日均价</th>
								<th></th>
							</tr>
							<tr class="bg_navy" v-for="(key, list) in PaymentToStoreFilter(item.hotelPlans)">
								<td>{{ list.planName }}</td>
								<td>{{ list.hasPromotion ? '有' : '无'}}</td><!-- '-&nbsp;&nbsp;-' -->
								<td>{{ list.breakfastType ? '有' : '无' }}</td>
								<td class="none">不可取消</td>
								<td class="color_red">¥{{ Math.ceil(list.avgPrice) }}</td>
								<td>
									<div>
										<span class="pay_type_online" v-if="list.payType > 0">在线付款</span>
										<span class="reserve_btn bg_orange" @click="hotelPreOrder(list.roomTypeId, list.pricePlanId, list.prices[0].roomNumber, list.avgPrice, item.area, item.floors, item.bedDesc, item.name, list.hotelId, list.supplierType)" v-if="!list.roomStatus">
											预订
										</span>
										<span class="reserve_btn house_full_btn" v-else>
											满房
										</span>
									</div>
								</td>
							</tr>
							<tr class="bg_white none">
								<td>不含早（预付）</td>
								<td>-&nbsp;&nbsp;-</td>
								<td>无</td>
								<td class="none">不可取消</td>
								<td class="color_red">¥5566</td>
								<td>
									<div>
										<span class="pay_type_shop">到店付款</span>
										<span class="reserve_btn bg_red" @click="hotelPreOrder">预订</span>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</li>
		</ul>
		<loading v-if="!priceobj.hotelRooms"></loading>
		<no-data :html="showString" v-if="(priceobj.hotelRooms && !priceobj.hotelRooms.length)"></no-data>
		
		<!-- 全部为到店付款 -->
		<no-data v-if="offlinePay" :html="offlinePayStr"></no-data>
	</div>
</template>

<script>
import Loading from '../Loading'
import NoData from '../NoData'

export default{
	props: {
		priceobj: {
			type: Object
		}
	},
	data: function () {
		return {
			testArr: [1, 2, 3],
			showString: '没有搜索到相关结果',
			offlinePay: true,			//	全部为到店付款
			offlinePayStr: '暂无房型可预订'
		}
	},
	methods: {
		//	酒店预下单
		hotelPreOrder: function (roomTypeId, pricePlanId, roomNumber, avgPrice, area, floors, bedDesc, titleName, hotelId, supplierType) {
			let msg = {
				roomTypeId: roomTypeId,
				pricePlanId: pricePlanId,
				guestNum: roomNumber,
				totalFee: avgPrice,
				area: area,
				floors: floors,
				bedDesc: bedDesc,
				titleName: titleName,
				hotelId: hotelId,
				supplierType: supplierType
			}
			this.$dispatch('to-order', msg)
		},
		//	过滤到店付款
		PaymentToStoreFilter: function (list) {
			let self = this
			return list.filter(function (item) {
				if (item.payType > 0) {
					self.offlinePay = false
				}
				return item.payType > 0
			})
		}
	},
	components: {
		Loading,
		NoData
	}
}
</script>

<style scoped>
.hotel_detail_price_list{
	margin-top: 8px;
	background: #fff;
	margin-bottom: 15px;
}
.hotel_detail_price_list li:last-child{
	padding-bottom: 20px;
}
.hotel_detail_price_list .head{
	padding: 20px 18px;
}
.hotel_detail_price_list .head h1{
	margin-bottom: 18px;
}
.hotel_detail_price_list .head .right{
	padding: 23px 0;
}
.hotel_detail_price_list .head .right span{
	margin-right: 15px;
}
/* .hotel_detail_price_list .head .right div{
	margin-left: 15px;
} */
.open_more{
	width: 110px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	border: 1px solid #e6ebfc;
	color: #68bdf9;
	cursor: pointer;
}
.hotel_detail_price_list_data{
	padding: 0 18px;
	border-bottom: 1px solid #eee;
}
.hotel_detail_price_list li:last-child .hotel_detail_price_list_data{
	border-bottom: none;
}
.hotel_detail_price_list_data table{
	width: 100%;
	font-size: 14px;
	margin-bottom: 20px;
}
.hotel_detail_price_list_data table th{
	background: #eee;
	height: 30px;
	width: 16.66%;
	text-align: center;
}
.hotel_detail_price_list_data table tr{
	border-bottom: 1px dashed #eee;
}
.hotel_detail_price_list_data table tr:first-of-type, .hotel_detail_price_list_data table tr:last-of-type{
	border-bottom: none;
}
.hotel_detail_price_list_data table td{
	height: 62px;
	width: 16.66%;
	text-align: center;
}
.bg_navy{
	background: #f1fcff;
}
.bg_white{
	background: #fff;
}
.pay_type_online, .pay_type_shop{
	display: inline-block;
	font-size: 12px;
	/* cursor: pointer; */
	padding: 3px 8px;
	border-radius: 30px;
}
.reserve_btn{
	display: inline-block;
	width: 74px;
	height: 30px;
	text-align: center;
	color: #fff;
	line-height: 30px;
	cursor: pointer;
	margin-left: 20px;
}
.pay_type_online{
	background: #c7f0fc;
	color: #7db3f6;
}
.pay_type_shop{
	background: #fdedc6;
	color: #fba63c;
}
.bg_orange{
	background: #e34449;
}
.bg_orange:hover{
	background: #b41521;
}
.bg_red{
	background: #e34449;
}
.all_order{
	color: #e4e4e4;
}
.house_full_btn{
	background: #ccc;
}
</style>
