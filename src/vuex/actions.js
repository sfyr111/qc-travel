import http from '../api/http'
import util from '../utils/util'
import setData from '../data/setData'
import testData from '../data/testData.js'

//模拟数据
//  测试数据
//setData.demo()

// 酒店搜索目的地
//setData.hotelDestination()
// 设置机票搜索数据
//setData.airSearchResult()
// 获取机票搜索地址
//setData.airCityResult()
//  酒店搜索 商业区
//setData.hotelSearchBusinessZone()
//  酒店搜索 行政区
// setData.hotelSearchAdministrativeRegion()
// setData.airBookOrder()

//  酒店搜索列表
export const setHotelSearchList = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SETHOTELSEARCHLIST', resp.result)
        //console.log(resp.array)
    })
}

//  清空酒店搜索列表
export const clearHotelSearchList = ({ dispatch,state }, opt) => {
  dispatch('CLEARSETHOTELSEARCHLIST', {})
}

//  酒店搜索目的地
export const hotelDestination = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELDESTINATION', resp.data)
        console.log(resp.data)
    })
}

//  酒店搜索目的地
export const switchHotelDestination = ({ dispatch,state }, opt) => {
   dispatch('SWITCHHOTELDESTINATION', opt)
}
//  清空航班搜索
export const clearAirSearchList = ({ dispatch,state }, opt) => {
  dispatch('CLEARAIRSEARCHLIST', {})
}
//  航班搜索结果
export const airSearchResult = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        async: opt.async,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        let airList = []
        if (!!resp.success 
            && resp.result 
                && Array.isArray(resp.result.list)
                    && resp.result.list.length>0
                        && resp.result.list[0].FlightInfo) {
            // 判断查询
            let FlightInfo = resp.result.list[0].FlightInfo
            if (Array.isArray(FlightInfo)) {
                FlightInfo.map(function(info, index) {
                    info.showPannel = false;
                    if (index === 0) {
                        info.showPannel = true;
                    }
                    info.bingoClassInfos=[]

                    if (info.bingoClassInfoList
                        && info.bingoClassInfoList[0]
                            && !Array.isArray(info.bingoClassInfoList[0].FlightClassInfo)) {
                        info.bingoClassInfos.push(info.bingoClassInfoList[0].FlightClassInfo)
                    }

                    if (info.bingoClassInfoList
                        && info.bingoClassInfoList[0]
                            && Array.isArray(info.bingoClassInfoList[0].FlightClassInfo)) {
                        for (let flight of info.bingoClassInfoList[0].FlightClassInfo) {
                            info.bingoClassInfos.push(flight)
                        }
                    }

                    var depTime = info.depDate + ' ' + 
                        info.depTime.substring(0, 2)+':'+info.depTime.substring(2, 4),
                        arrTime = info.arrDate + ' ' +  
                        info.arrTime.substring(0, 2)+':'+info.arrTime.substring(2, 4);
                    
                    info.duringTime = util.diffTime(depTime, arrTime)
                    airList.push(info)
                })
            } else if (Object.prototype.toString.call(FlightInfo) == "[object Object]") {
                FlightInfo.showPannel = true

                FlightInfo.bingoClassInfos=[]

                if (FlightInfo.bingoClassInfoList 
                        && FlightInfo.bingoClassInfoList[0].FlightClassInfo 
                            && !Array.isArray(FlightInfo.bingoClassInfoList[0].FlightClassInfo)) {
                    FlightInfo.bingoClassInfos.push(FlightInfo.bingoClassInfoList[0].FlightClassInfo)
                }
                if (FlightInfo.bingoClassInfoList 
                    && FlightInfo.bingoClassInfoList[0].FlightClassInfo 
                        && Array.isArray(FlightInfo.bingoClassInfoList[0].FlightClassInfo)) {
                    for (let flight of FlightInfo.bingoClassInfoList[0].FlightClassInfo) {
                        FlightInfo.bingoClassInfos.push(flight)
                    }
                }
                var depTime = FlightInfo.depDate + ' ' + 
                        FlightInfo.depTime.substring(0, 2)+':'+FlightInfo.depTime.substring(2, 4),
                        arrTime = FlightInfo.arrDate + ' ' +  
                        FlightInfo.arrTime.substring(0, 2)+':'+FlightInfo.arrTime.substring(2, 4);
                    
                    FlightInfo.duringTime = util.diffTime(depTime, arrTime)

                airList.push(FlightInfo)
            } else {
                return airList
            }

            resp.result.list=airList
            if (resp.result.isFinished === 1) {
                dispatch('AIRSEARCHRESULT', resp.result)
            }
        } 
    })
}
// 机票城市
export const airCity = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('AIRCITY', resp.data)
    })
}

//  酒店搜索查询  设置城市ID
export const hotelSearchCityId = ({ dispatch, state }, opt) => {
    dispatch('HOTELSEARCHCITYID', opt)
}


// 酒店搜索 商业区数据
export const hotelSearchBusinessZone = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELSEARCHBUSINESSZONE', resp.result)
    })
}

// 酒店搜索 行政区数据
export const hotelSearchAdministrativeRegion = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELSEARCHADMINISTRATIVEREGION', resp.result)
    })
}

//  是否初始化商业区
export const isInitHotelSearchBusinessZone = ({ dispatch,state }, opt) => {
    dispatch('ISINITHOTELSEARCHBUSINESSZONE', opt)
}

//  是否初始化行政区
export const isInitHotelSearchAdministrativeRegion = ({ dispatch,state }, opt) => {
    dispatch('ISINITHOTELSEARCHADMINISTRATIVEREGION', opt)
}

// 获取近期商旅订单
export const rencetOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('RENCETORDER', resp.data)
    })
}
// 获取机票订单列表
export const airOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('AIRORDER', resp.data)
    })
}
// 获取酒店订单列表
export const hotelOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELORDER', resp.data)
    })
}
// 获取月结账单列表
export const monthOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('MONTHORDER', resp.data)
    })
}
// 月结申请
export const monthApply = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('MONTHAPPLY', resp.data)
    })
}
// 月结列表主信息
export const monthMain = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('MONTHMAIN', resp.data)
    })
}
// 月结账单详情
export const monthInf = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('MONTHINF', resp.data)
    }, function () {
        dispatch('MONTHINF', {})
    })
}
// 月结账单详情
export const addressList = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('ADDRESSLIST', resp.data)
    })
}
// 选择省份
export const selectProvince = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTPROVINCE', resp.data)
    })
}
// 选择城市
export const selectCity = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTCITY', resp.data)
    })
}
// 选择城区
export const selectArea = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTAREA', resp.data)
    })
}

// 清空城区
export const clearSelectArea = ({ dispatch,state }, opt) => {
    dispatch('CLEARSELECTAREA', {})
}

// 选择Jd省份
export const selectJdProvince = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTJDPROVINCE', resp.result)
    })
}
// 选择Jd城市
export const selectJdCity = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTJDCITY', resp.result)
    })
}
// 选择Jd城区
export const selectJdArea = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('SELECTJDAREA', resp.result)
    })
}
// 新增地址
export const addressAdd = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        
    })
}
// 设置默认地址
export const addressSetDef = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        
    })
}
// 删除地址
export const addressDel = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        
    })
}
// 查询单个地址
export const addItem = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        
    })
}
// 月结支付
export const monthPay = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        
    })
}
// 月结支付
export const fileUpload = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.ajaxFileUpload(params).then(function (resp) {
        
    })
}
//  获取支付方式
export const payMethodsList = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }

    util.getMyrequest(params).then(function (resp) {
        dispatch('PAYMETHODSLIST', resp.data)
    })
}

//  支付
export const pay = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }

    util.getMyrequest(params).then(function (resp) {
        dispatch('PAY', resp.data)
    })
}

//  支付宝支付页面
export const aliPay = ({ dispatch, state }, opt) => {
    dispatch('ALIPAY', opt)
}

//  查询订单状态
export const checkOrderStatus = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params)
}


//  酒店详情
export const hotelDetail = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }

    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELDETAIL', resp.result)
    })
}

//  查询房型房价
export const checkHotelRoomType = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }

    util.getMyrequest(params).then(function (resp) {
        dispatch('CHECKHOTELROOMTYPE', resp.result, opt.data.checkOutDate)
    })
}

//  查询酒店评论
export const checkHotelComment = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
   
    util.getMyrequest(params).then(function (resp) {
        dispatch('CHECKHOTELCOMMENT', resp.result, opt.level)
    })
}

// 酒店下单
export const submitHotelOrder = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
   
    util.getMyCompRequest(params).then(function (resp) {
        dispatch('SUBMITHOTELORDER', resp.result)
    })
}
// 机票订单详情
export const airBookOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('AIRBOOKORDER', resp.data.result)
    })
}
// 酒店订单详情
export const hotelBookOrder = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('HOTELBOOKORDER', resp.data)
    })
}

//  选择房间数量
export const selectHotelOrderRoomNum = ({ dispatch, state }, opt) => {
    dispatch('SELECTHOTELORDERROOMNUM', opt)
}

// 酒店输入搜索城市
export const inputSearchHotelCity = ({ dispatch,state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('INPUTSEARCHHOTELCITY', resp.data)
    })
}

//  情况酒店详情房型预订列表
export const clearCheckHotelRoomList = ({ dispatch, state }) => {
    dispatch('CLEARCHECKHOTELROOMLIST', '')
}

//  酒店查询房间数
export const checkHotelRoomNum = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        dispatch('CHECKHOTELROOMNUM', resp.result.allRoomNum)
    })
}
// 常用联系人列表
export const userList = ({ dispatch, state }, opt) => {
    let params = {
        type: opt.type,
        url: opt.url,
        data: opt.data,
        success: opt.success,
        fail: opt.fail
    }
    util.getMyrequest(params).then(function (resp) {
        for (let item of resp.data) {
            item.checked = false
            dispatch('USERLIST', resp.data)
        }        
    })
}
// 清空列表
export const clearUserList = ({ dispatch,state }, opt) => {
  dispatch('USERLIST', [])
}