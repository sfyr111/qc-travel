//setData.js
import Mock from 'mockjs'
import testData from './testData'
import configUrl from './configUrl'
const setData = {
	//	测试数据demo
	demo: function () {
		Mock.mock(configUrl.demo.pattern, testData.demo)
	},
	//	酒店搜索目的地
	hotelDestination: function () {
		Mock.mock(configUrl.hotelDestination.pattern, testData.hotelDestination)
	},
	// 航班搜索信息
	airSearchResult: function () {
		Mock.mock(configUrl.airSearchResult.pattern, testData.airSearchResult)
	},
	// 航班地址搜索结果
	airCityResult: function () {
		Mock.mock(configUrl.airCity.pattern, testData.citys)
	},
	//	酒店搜索 商业区
	hotelSearchBusinessZone: function () {
		Mock.mock(configUrl.hotelSearchBusinessZone.pattern, testData.hotelBusinessZone)
	},
	//	酒店搜索 行政区
	hotelSearchAdministrativeRegion: function () {
		Mock.mock(configUrl.hotelSearchAdministrativeRegion.pattern, testData.hotelSearchAdministrativeRegion)
	},
	airBookOrder: function () {
		Mock.mock(configUrl.airBookOrder.pattern, testData.airBookOrder)
	},
	monthList: function () {
		Mock.mock(configUrl.monthOrder.pattern, testData.monthList)
	}
}

module.exports = setData