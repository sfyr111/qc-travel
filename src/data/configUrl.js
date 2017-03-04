//configUrl.js  接口请求路劲
var devPrefix = 'http://192.168.16.210:8080/qc-travel/'
var proPrefix = 'http://travel.17cai.com/'
var rootPath = process.env.NODE_ENV === "production" ? proPrefix : devPrefix

//	跳转到支付宝支付页面链接
var aliPayHrefDev = 'http://localhost:4399/?#/' 
var aliPayHrefPro = 'http://travel.17cai.com/security/index.jsp?#/'
var aliPayHref = process.env.NODE_ENV === "production" ? aliPayHrefPro : aliPayHrefDev

var staticPath = process.env.NODE_ENV === "production" ? "http://travel.17cai.com/static/img/" : "http://127.0.0.1/static/img/"
const configUrl = {
	staticPath,
	//	文件上传路劲
	fileUpload: {
		dataUrl: rootPath + 'security/month_pay/upload_important_pic'
	},
	//	demo测试数据
	demo: {
		pattern: /demo.json/,
		dataUrl: 'demo.json'
	},
	// 酒店搜索目的地
	hotelDestination: {
		pattern: /hotelDestination.json/,
		dataUrl: rootPath + 'security/hotel/get_hotel_city_info'
	},
	airSearchResult: {
		pattern: /airSearchResult.json/,
		dataUrl: rootPath + 'security/aircraft/go_aircraft_list_page'
	},
	airCity: {
		pattern: /airCity.json/,
		dataUrl: rootPath + 'security/aircraft/search_all_city'
	},
	// 机票城市模糊查询
	airCityQuery: {
		pattern: /airCity.json/,
		dataUrl: rootPath + 'security/aircraft/city_search'
	},	
	// 机票下单
	airBookOrder: {
		dataUrl: rootPath + 'security/aircraft/book_aircraft'
	},
	// 机票详情
	airOrderDetail: {
		pattern: /airBookOrder.json/,
		dataUrl: rootPath + 'security/aircraft/flight_order_detail'
	},
	// 酒店搜索商业区
	hotelSearchBusinessZone: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/hotel/get_hotel_area'
	},

	//	酒店搜索行政区
	hotelSearchAdministrativeRegion: {
		pattern: /hotelSearchAdministrativeRegion.json/,
		dataUrl: rootPath + 'security/hotel/get_hotel_area'
	},
	// 机票详情
	hotelOrderDetail: {
		pattern: /airBookOrder.json/,
		dataUrl: rootPath + '/security/hotel/user_hotel_order_detail'
	},
	// 机票订单
	airOrder: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/aircraft/user_flight_order_list'
	},
	// 酒店订单
	hotelOrder: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/hotel/user_hotel_order_list'
	},
	// 酒店订单
	monthOrder: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/month_pay/list'
	},
	// 近期商旅订单
	rencetOrder: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/aircraft/user_recent_order_list'
	},
	// 月结申请
	monthApply: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/month_pay/apply'
	},
	// 月结主信息
	monthMain: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/month_pay/main-info'
	},
	// 月结账单详情
	monthInf: {
		pattern: /hotelBusinessZone.json/,
		dataUrl: rootPath + 'security/month_pay/detail'
	},
	//	酒店列表
	hotelSearchList: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/hotel/get_hotel_search_data'
	},
	//	地址列表
	addressList: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/invoice/query_adddress_list'
	},
	// 获取邮寄省份
	selectJdProvince: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/comm/get_all_province'
	},
	// 获取邮寄城市
	selectJdCity: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/comm/get_all_city'
	},
	// 获取邮寄区域
	selectJdArea: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/comm/get_all_area'
	},
	// 获取月结省份
	selectProvince: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/month_pay/find_all_province'
	},
	// 获取月结城市
	selectCity: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/month_pay/find_all_city'
	},
	// 获取月结区域
	selectArea: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/month_pay/find_all_area'
	},	
	// 新增地址
	addressAdd: {
		//pattern: /hotelSearchList.json/,
		dataUrl: rootPath + 'security/invoice/add_or_edit_adddress'
	},
	// 设置默认地址
	addressSetDef: {
		dataUrl: rootPath + 'security/invoice/set_default_adddress'
	},
	// 删除地址
	addressDel: {
		dataUrl: rootPath + 'security/invoice/delete_adddress'
	},
	// 查询单个地址
	addItem: {
		dataUrl: rootPath + 'security/invoice/pre_edit_adddress'
	},
	// 判断是否进入支付页面
	checkMonthPay: {
		dataUrl: rootPath + 'security/month_pay/to-pay'
	},
	// 经停城市查询
	stopCity: {
		dataUrl: rootPath + 'security/aircraft/flight_stop_city'
	},
	// 改退签
	changeOrder: {
		dataUrl: rootPath + 'security/aircraft/flight_provision_city'
	},
	// 发送短信验证码
	getMsg: {
		dataUrl: rootPath + 'security/verify_code/send_verify_code'
	},
	// 验证短信
	checkMsg: {
		dataUrl: rootPath + 'security/verify_code/check_verify_code'
	},
	// 设置支付密码
	setPwd: {
		dataUrl: rootPath + 'security/month_pay/set_pay_pwd_verified'
	},
	// 根据就密码
	changeOldPwd: {
		dataUrl: rootPath + 'security/month_pay/set_pay_pwd'
	},	
	//	获取支付方式列表
	payMethodsList: {
		dataUrl: rootPath + 'security/pay/get_all_pay'
	},
	// 获取图片验证码
	getImg: {
		dataUrl: rootPath + 'security/verify_code/generate_pic'
	},
	// 验证图片
	checkImg: {
		dataUrl: rootPath + 'security/verify_code/validate_pic_code'
	},
	//	支付宝支付
	aliPay: {
		dataUrl: rootPath + 'security/pay/ali_pay'
	},
	//	支付宝支付跳转链接
	aliPayHref: {
		dataUrl: aliPayHref
	},
	//	微信支付
	wxPay: {
		dataUrl: rootPath + 'security/pay/wx_pay'
	},
	//	月结支付
	monthPay: {
		dataUrl: rootPath + 'security/pay/month_pay'
	},
	//	余额支付
	mallBalPay: {
		dataUrl: rootPath + 'security/pay/mall_bal_pay'
	},
	//	支付详情
	payOrderDetail: {
		dataUrl: rootPath + 'security/hotel_air/details'
	},
	//	酒店详情
	hotelDetail: {
		dataUrl: rootPath + 'security/hotel/get_hotel_detail'
	},
	//房型房价
	hotelRoomType: {
		dataUrl: rootPath + 'security/hotel/get_hotel_room_type'
	},
	//	酒店评论
	hotelComment: {
		dataUrl: rootPath + 'security/hotel/get_hotel_comment'
	},
	//	酒店预下单
	prebookHotel: {
		dataUrl: rootPath + 'security/hotel/prebook_hotel'
	},
	//	酒店查询房间数
	checkHotelRoomNum: {
		dataUrl: rootPath + 'security/hotel/get_room_number'
	},
	// 常用联系人列表
	userList: {
		dataUrl: rootPath + 'security/passenger/get_passenger_info'
	},
	// 新增修改常用联系人
	userAddOrUpdate: {
		dataUrl: rootPath + 'security/passenger/update_passenger_info'
	},
	// 删除常用联系人
	userDel: {
		dataUrl: rootPath + 'security/passenger/delete_passenger_info'
	},
	//	酒店输入查询城市
	inputSearchHotelCity: {
		dataUrl: rootPath + 'security/hotel/search_hotel_city_info'
	}
}

module.exports = configUrl