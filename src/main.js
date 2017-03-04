import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from './page/Root'
import store from './vuex/store'
import scrollFixed from './directives/ScrollFixed'

import { 
	demo,
	Main,
	HotelSearch, 
	Detail, 
	AirSearch, 
	AirOrder, 
	List, 
	Hotel, 
	Pay, 
	ManagerOrder,
	MonthList,
	MonthInf,
	MonthApply,
	MonthApplySuc,
	MonthRerurnSuc,
	SafeCenter,
	PasswordLogin,
	PasswordPay,
	PasswordPayEdit,
	Address,
	HotelDetail,
	HotelPreOrder,
	HotelOrderStatus,
	PayHref,
	PaySuccess,
	AirOrderDetail,
	HotelOrderDetail,
	TableListAir,
	TableListHotel,
	UserList,
	UserModel
} from './page'

Vue.use(VueRouter)

const router = new VueRouter({
	history: false,
	hashbang: false
})

router.map({
	'/demo': {
		component: demo,
		name: 'demo'
	},
	'/': {
		component: Main,
		name: 'main'
	},
	'/hotelsearch': {
		component: HotelSearch,
		name: 'hotelsearch'
	},
	'/hoteldetail': {
		component: HotelDetail,
		name: 'hoteldetail'
	},
	//	酒店预下单
	'/hotelpreorder': {
		component: HotelPreOrder,
		name: 'hotelpreorder'
	},
	//	酒店订单状态
	'hotelorderstatus': {
		component: HotelOrderStatus,
		name: 'hotelorderstatus'
	},
	'/airsearch': {
		component: AirSearch,
		name: 'airSearch'
	},
	'/main': {
		component: Main,
		name: 'main'
	},
	'/airOrder': {
		component: AirOrder,
		name: 'airOrder'
	},
	'/pay': {
		component: Pay,
		name: 'pay'
	},
	'/orderList': {
		component: ManagerOrder,
		name: 'orderList',
		subRoutes: {
			'/airOrderList': {
				name: 'airOrderList',
				component: TableListAir
			},
			'/hotelOrderList': {
				name: 'hotelOrderList',
				component: TableListHotel
			}
		}		
	},
	'/monthList': {
		component: MonthList,
		name: 'monthList'
	},
	'/monthInf': {
		component: MonthInf,
		name: 'monthInf'
	},
	'/monthApply': {
		component: MonthApply,
		name: 'monthApply'
	},
	'/monthApplySuc': {
		component: MonthApplySuc,
		name: 'monthApplySuc'
	},
	'/monthRerurnSuc': {
		component: MonthRerurnSuc,
		name: 'monthRerurnSuc'
	},
	'/safeCenter': {
		component: SafeCenter,
		name: 'safeCenter'
	},
	'/passwordLogin': {
		component: PasswordLogin,
		name: 'passwordLogin'
	},
	'/passwordPay': {
		component: PasswordPay,
		name: 'passwordPay'
	},
	'/passwordPayEdit': {
		component: PasswordPayEdit,
		name: 'passwordPayEdit'
	},	
	'/address': {
		component: Address,
		name: 'address'
	},
	//支付宝支付页面
	'/payHref': {
		component: PayHref,
		name: 'payHref'
	},
	//	支付成功
	'/paySuccess': {
		component: PaySuccess,
		name: 'paySuccess' 
	},
	// 机票订单详情
	'/airOrderDetail': {
		component: AirOrderDetail,
		name: 'airOrderDetail' 
	},
	// 酒店订单详情
	'/hotelOrderDetail': {
		component: HotelOrderDetail,
		name: 'hotelOrderDetail'
	},
	// 常用联系人列表
	'/userList': {
		component: UserList,
		name: 'userList'	
	},
	// 联系人
	'/user': {
		component: UserModel,
		name: 'user'
	}
})
router.start({
	Root,
	store
}, '#container')

