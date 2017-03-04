import airSearchResult from './airSearchResult.json'
import airCity from './airCity.json'
import hotelBusinessZone from './hotelBusinessZone.json'
import hotelSearchAdministrativeRegion from './hotelSearchAdministrativeRegion.json'
import airBookOrder from './airBookOrder.json'
import monthList from './test.json'

//testData.js
const testData = {
	// 测试数据
	demo: {
		"success": true,
		"resultMessage": "",
		"resultCode": null,
		"array|1-10": [
		  {
		    "name|+1": [
		      "Hello",
		      "Mock.js",
		      "!"
		    ]
		  }
		]
	},
	// 酒店搜索目的地 [long城市id,string城市名称,long省份id,string拼音简写,string拼音全写]
	hotelDestination: {
		"data": {
			"allHotCity": [
				[91287, "平阳0", 91200, "py", "pingyang"],
				[91286, "开化0", 91200, "kh", "kaihua"],
				[91287, "平阳0", 91200, "py", "pingyang"],
				[91286, "开化0", 91200, "kh", "kaihua"],
				[91287, "平阳0", 91200, "py", "pingyang"],
				[91286, "开化0", 91200, "kh", "kaihua"],
				[91287, "平阳0", 91200, "py", "pingyang"],
				[91286, "开化0", 91200, "kh", "kaihua"],
				[91287, "平阳0", 91200, "py", "pingyang"],
				[91286, "开化0", 91200, "kh", "kaihua"]
			],
			"firstLetterCity":{
				"A":[
					[91287, "平阳1", 91200, "py", "pingyang"],
					[91286, "开化1", 91200, "kh", "kaihua"],
					[91287, "平阳1", 91200, "py", "pingyang"],
					[91286, "开化1", 91200, "kh", "kaihua"],
					[91287, "平阳1", 91200, "py", "pingyang"],
					[91286, "开化1", 91200, "kh", "kaihua"]
				],
				"G": [
					[91287, "平阳2", 91200, "py", "pingyang"],
					[91286, "开化2", 91200, "kh", "kaihua"]
				],
				"L": [
					[91287, "平阳3", 91200, "py", "pingyang"],
					[91286, "开化3", 91200, "kh", "kaihua"]
				],
				"R": [
					[91287, "平阳4", 91200, "py", "pingyang"],
					[91286, "开化4", 91200, "kh", "kaihua"]
				],
				"X": [
					[91287, "平阳5", 91200, "py", "pingyang"],
					[91286, "开化5", 91200, "kh", "kaihua"]
				]
			}
		},
		"success": true
	},
	airSearchResult,
	citys: airCity,
	hotelBusinessZone,
	hotelSearchAdministrativeRegion,
	airBookOrder,
	monthList
}

module.exports = testData