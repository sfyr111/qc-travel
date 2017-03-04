import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/util'

Vue.use(Vuex)

const state = {
	hotelSearchList: {},		//	酒店搜索列表
	hotelDestination: {}, //	酒店目的地
	hotelShowCity: [],		//	酒店热门城市
	airSearchResult: {},
	airCity: {},
	hotelSearchBusinessZone: {}, //	酒店搜索商业区
	isInitHotelSearchBusinessZone: true,  //	酒店搜索初始化商业区
	isInitHotelSearchAdministrativeRegion: true,  //	酒店搜索初始化行政区
	hotelSearchCityId: '90101',									//	酒店搜索id
	hotelSearchAdministrativeRegion: {},		//	酒店搜索行政区
	rencetOrder: [],
	airOrder: {},
	hotelOrder: {},
	monthOrder: {},
	monthApply: {},
	monthMain: {},
	monthInf: {},
	addressList: [],
	selectProvince: {},
	selectCity: {},
	selectArea: {},
	selectJdProvince: {},
	selectJdCity: {},
	selectJdArea: {},
	payMethodsList: {},									//	支付方式
	pay: null,
	hotelDetail: {},											//	酒店详情
	checkHotelRoomType: {},								//	查询房型房价
	allComment: {},									//	酒店所有评论
	goodComment: {},									//	好评
	midComment: {},									//	中评
	badComment: {},										//	差评
	submitHotelOrder: {},							//	酒店下单
	aliPay: '',													//	支付宝支付页面
	airBookOrder: {},
	hotelBookOrder: {},
	selectHotelOrderRoomNum: [],					//	酒店下单选择房间数
	inputSearchHotelCity: [],							//	酒店输入搜索城市
	checkHotelRoomNum: [],   								//	查询酒店房间数量
	userList: [],// 常用联系人列表
}

const mutations = {
	//	酒店搜索列表
	SETHOTELSEARCHLIST: (state, data) => {
		state.hotelSearchList = data
	},
	//  清空酒店搜索列表
	CLEARSETHOTELSEARCHLIST: function (state, data) {
		state.hotelSearchList = data
	},
	//	酒店搜索目的地
	HOTELDESTINATION: (state, data) => {
		let firstLetterCity = data.firstLetterCity

		let A = firstLetterCity['A']
		let B = firstLetterCity['B']
		let C = firstLetterCity['C']
		let D = firstLetterCity['D']
		let E = firstLetterCity['E']
		let F = firstLetterCity['F']
		let arr1 = []
		arr1.push(A, B, C, D, E, F)

		let G = firstLetterCity['G']
		let H = firstLetterCity['H']
		let J = firstLetterCity['J']
		let K = firstLetterCity['K']
		let arr2 = []
		arr2.push(G, H, J, K)

		let L = firstLetterCity['L']
		let M = firstLetterCity['M']
		let N = firstLetterCity['N']
		let P = firstLetterCity['P']
		let Q = firstLetterCity['Q']
		let arr3 = []
		arr3.push(L, M, N, P, Q)

		let R = firstLetterCity['R']
		let S = firstLetterCity['S']
		let T = firstLetterCity['T']
		let W = firstLetterCity['W']
		let arr4 = []
		arr4.push(R, S, T, W)

		let X = firstLetterCity['X']
		let Y = firstLetterCity['Y']
		let Z = firstLetterCity['Z']
		let arr5 = []
		arr5.push(X, Y, Z)
		state.hotelDestination = data
		state.hotelDestination.firstLetterCity = {
			'A': arr1,
			'G': arr2,
			'L': arr3,
			'R': arr4,
			'X': arr5
		}
		state.hotelShowCity = data.allHotCity
	},
	SWITCHHOTELDESTINATION: (state, data) => {
		state.hotelShowCity = data
	},
 	AIRSEARCHRESULT: (state, data) => {
 		state.airSearchResult = data
 	},
 	AIRCITY: (state, data) => {
 		state.airCity = data
 	},
 	//  酒店搜索查询  设置城市ID
 	HOTELSEARCHCITYID: (state, data) => {
 		state.hotelSearchCityId = data
 	},

 	//	酒店搜索商业区
 	HOTELSEARCHBUSINESSZONE: (state, data) => {
 		state.hotelSearchBusinessZone = data
 	},
 	//  是否初始化商业区
 	ISINITHOTELSEARCHBUSINESSZONE: (state, data) => {
 		state.isInitHotelSearchBusinessZone = data
 	},
 	//  是否初始化行政区
 	ISINITHOTELSEARCHADMINISTRATIVEREGION: (state, data) => {
 		state.isInitHotelSearchAdministrativeRegion = data
 	},
 	//酒店搜索行政区
 	HOTELSEARCHADMINISTRATIVEREGION: (state, data) => {
 		state.hotelSearchAdministrativeRegion = data
 	},
 	// 近期机票订单
 	RENCETORDER: (state, data) => {
 		state.rencetOrder = data
 	},
 	// 机票列表
 	AIRORDER: (state, data) => {
 		state.airOrder = data
 	},
 	// 酒店订单列表
 	HOTELORDER: (state, data) => {
 		state.hotelOrder = data
 	},
 	// 月结账单列表
 	MONTHORDER: (state, data) => {
 		state.monthOrder = data
 	},
 	// 月结申请提交
 	MONTHAPPLY: (state, data) => {
 		state.monthApply = data
 	},	
 	// 月结主信息
 	MONTHMAIN: (state, data) => {
 		state.monthMain = data
 	},	
 	// 月结账单详情
 	MONTHINF: (state, data) => {
 		console.log(data)
 		state.monthInf = data
 	},
 	// 地址列表
 	ADDRESSLIST: (state, data) => {
 		state.addressList = data
 	},
 	// 地址列表
 	SELECTPROVINCE: (state, data) => {
 		state.selectProvince = data
 	},
 	// 地址列表
 	SELECTCITY: (state, data) => {
 		state.selectCity = data
 	},
 	// 地址列表
 	SELECTAREA: (state, data) => {
 		state.selectArea = data
 	},
 	//	清空城区
 	CLEARSELECTAREA: (state, data) => {
 		state.selectArea = data
 	},
 	// 地址Jd列表
 	SELECTJDPROVINCE: (state, data) => {
 		state.selectJdProvince = data
 	},
 	// 地址Jd列表
 	SELECTJDCITY: (state, data) => {
 		state.selectJdCity = data
 	},
 	// 地址Jd列表
 	SELECTJDAREA: (state, data) => {
 		state.selectJdArea = data
 	},
 	// 清空航班
 	CLEARAIRSEARCHLIST: (state, data) => {
 		state.airSearchResult = data
 	},
 	//	支付方式
 	'PAYMETHODSLIST': (state, data) => {
 		state.payMethodsList = data
 	},
 	//	支付
 	'PAY': (state, data) => {
 		state.pay = data
 	},
 	//	支付宝支付页面
 	'ALIPAY': (state, data) => {
 		state.aliPay = data
 	},
 	//	酒店详情
 	'HOTELDETAIL': (state, data) => {
 		state.hotelDetail = data
 	},
 	//	查询房型房价
 	'CHECKHOTELROOMTYPE': (state, data, checkOutDate) => {
 		state.checkHotelRoomType = data
 		state.checkHotelRoomType.checkOutDate = checkOutDate
 	},
 	//	查询酒店评论
 	'CHECKHOTELCOMMENT': (state, data, level) => {
 		//	所有评论

 		if (!level) {
 			state.allComment = data
 		} else if (level === '3') {
 			state.goodComment = data
 		} else if (level === '2') {
 			state.midComment = data 
 		} else {
 			state.badComment = data
 		}
 	},

 	//	酒店下单
 	'SUBMITHOTELORDER': (state, data) => {
 		state.submitHotelOrder = data
 	},
 	// 机票订单数据
 	'AIRBOOKORDER': (state, data) => {
 		state.airBookOrder = data
 	},
 	// 酒店订单数据
 	'HOTELBOOKORDER': (state, data) => {
 		state.hotelBookOrder = data
 	},
 	//	酒店下单选择房间数
 	'SELECTHOTELORDERROOMNUM': (state, data) => {
 		state.selectHotelOrderRoomNum = []

		for (var i = 0; i < data; i ++) {
			state.selectHotelOrderRoomNum.$set(i, i)
		}
 	},
 	//	查询酒店房间数
 	'CHECKHOTELROOMNUM': (state, data) => {
 		if (data > 5) {
 			data = 5
 		}
 		for (var i = 0; i < data; i ++) {
 			state.checkHotelRoomNum.$set(i, i)
 		}
 	},
 	//	酒店输入搜索城市
 	'INPUTSEARCHHOTELCITY': (state, data) => {
 		state.inputSearchHotelCity = data
 	},
 	//  情况酒店详情房型预订列表
 	'CLEARCHECKHOTELROOMLIST': (state, data) => {
 		state.checkHotelRoomType.hotelRooms = data
 	},
 	'USERLIST': function (state, data) {
 		state.userList = data
 	}
};

var store = new Vuex.Store({
    state,
    mutations
})

export default store
