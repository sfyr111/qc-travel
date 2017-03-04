//酒店搜索列表
export function getHotelSearchList (state) {
    return state.hotelSearchList
}

//酒店搜索目的地
export function getHotelDestination (state) {
    return state.hotelDestination
}

//	获取酒店搜索目的地城市
export function getHotelShowCity (state) {
    return state.hotelShowCity
}

// 获取航班信息
export function getAirSearchResult (state) {
  return state.airSearchResult
}
// 获取机票地址信息
export function getAirCity (state) {
  return state.airCity
}

//  酒店搜索城市id
export function gethotelSearchCityId (state) {
	return state.hotelSearchCityId
}

//	酒店搜索商业区
export function getHotelSearchBusinessZone (state) {
	return state.hotelSearchBusinessZone
}

//  是否初始化商业区
export function getIsInitHotelSearchBusinessZone (state) {
	return state.isInitHotelSearchBusinessZone
}

//  是否初始化行政区
export function getIsInitHotelSearchAdministrativeRegion (state) {
	return state.isInitHotelSearchAdministrativeRegion
}

//酒店搜索行政区
export function getHotelSearchAdministrativeRegion (state) {
	return state.hotelSearchAdministrativeRegion
} 

// 首页酒店list
export function getRencetOrder (state) {
	return state.rencetOrder
}
// 机票列表
export function getAirOrder (state) {
	return state.airOrder
}
// 酒店列表
export function getHotelOrder (state) {
	return state.hotelOrder
}
// 月结账单列表
export function getMonthOrder (state) {
	return state.monthOrder
}
// 月结申请
export function getMonthApply (state) {
	return state.monthApply
}
// 月结列表主信息
export function getMonthMain (state) {
	return state.monthMain
}
// 月结账单详情
export function getMonthInf (state) {
	return state.monthInf
}
// 地址列表查询
export function getAddressList (state) {
	return state.addressList
}
// 省份选择
export function getSelectProvince (state) {
	return state.selectProvince
}
// 城市选择
export function getSelectCity (state) {
	return state.selectCity
}
// 地区选择
export function getSelectArea (state) {
	return state.selectArea
}
// 省份Jd选择
export function getSelectJdProvince (state) {
	return state.selectJdProvince
}
// 城市Jd选择
export function getSelectJdCity (state) {
	return state.selectJdCity
}
// 地区Jd选择
export function getSelectJdArea (state) {
	return state.selectJdArea
}

//	支付方式
export function getPayMethodsList (state) {
	return state.payMethodsList
}

//	支付宝支付页面
export function getAliPay (state) {
	return state.aliPay
}

//	酒店详情
export function getHotelDetail (state) {
	return state.hotelDetail
}

//	查询房型房价
export function getCheckHotelRoomType (state) {
	return state.checkHotelRoomType
}

//	查询酒店所有评论
export function getAllComment (state) {
	return state.allComment
}

//	查询酒店好评
export function getGoodComment (state) {
	return state.goodComment
}

//	查询酒店中评
export function getMidComment (state) {
	return state.midComment
}

//	查询酒店中评
export function getBadComment (state) {
	return state.badComment
}

//	酒店下单
export function getSubmitHotelOrder (state) {
	return state.submitHotelOrder
}
// 机票订单详情
export function getAirBookOrder (state) {
	return state.airBookOrder
}
// 酒店订单详情
export function getHotelBookOrder (state) {
	return state.hotelBookOrder
}

// 酒店下单选择房间数
export function getSelectHotelRoomNum (state) {
	return state.selectHotelOrderRoomNum
}

// 查询酒店房间数
export function getCheckHotelRoomNum (state) {
	return state.checkHotelRoomNum
}

// 酒店输入搜索城市
export function getInputSearchHotelCity (state) {
	return state.inputSearchHotelCity
}
// 常用联系人列表
export function getUserList (state) {
	return state.userList
}