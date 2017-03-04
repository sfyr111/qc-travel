<!-- 酒店搜索目的地 -->
<template>
	<div class="address fl marginR10" @click.stop="selectAddress">
		目的地：
		<input type="text" v-model="selectCityName" class="bsizing" placeholder="目的地" @input="inputSearchCity | debounce 300">
		<i class="fa fa-map-marker"></i>
			
		<!-- 点击选择城市展示 -->	
		<div class="address_city" v-show="showCity">
			<div class="address_city_head">
				<ul class="clearfix">
					<li  v-for="(index, item) in switchCityTypeArr" @click.stop="switchCityType(item.str, index)" :class="{ 'active': tabIndex === index }">
						{{ item.name }}
				</ul>
			</div>

			<div class="address_city_content">
				<ul class="clearfix">
					<!-- 热门城市 -->
					<div v-if="!tabIndex">
						<li v-for="(index, item) in getHotelShowCity" @click.stop="selectCity(item[0], item[1], index)" :class="{ 'checked': cityNum === index }">{{ item[1] }}</li>
					</div>
					<!-- 字母 -->
					<div v-else>
						<div v-for="(index, item) in getHotelShowCity">
							<p class="oxblood_red">{{ cityLetterArr[tabIndex][index] }}</p>
							<div class="clearfix">
								<li v-for="(key, list) in item" @click.stop="selectCity(list[0], list[1], key)" :class="{ 'checked': cityNum === index }"  :class="{ 'checked': cityNum === index }">
									{{ list[1] }}
								</li>
							</div>
						</div>
					</div>
				</ul>
			</div>
		</div>

		<!-- 输入查询城市展示 -->
		<div class="input_show_city" v-show="isShowInputCity"> 
			<ul>
				<li v-for="(index, item) in getInputSearchHotelCity" @mouseover="mouseHover(index)" :class="{'hover_active': hoverIndex === index}" @click.stop="inputSelectCity(item[0], item[1])">
					{{ item[1] }}
				</li>
			</ul>
			<div v-if="!getInputSearchHotelCity.length">对不起，暂未搜索到该城市</div>
		</div>
	</div>
</template>

<script>
import configUrl from '../../data/configUrl'
import { switchHotelDestination, hotelSearchCityId, isInitHotelSearchBusinessZone, isInitHotelSearchAdministrativeRegion, inputSearchHotelCity } from '../../vuex/actions'
import { getHotelShowCity, gethotelSearchCityId, getInputSearchHotelCity } from '../../vuex/getters'

export default {
	props: {
		hoteldestination: {
			type: Object
		},
		hotelcityname: {
			type: String
		}
	},
	vuex: {
		actions: {
			switchHotelDestination,
			hotelSearchCityId,
			isInitHotelSearchBusinessZone,
			isInitHotelSearchAdministrativeRegion,
			inputSearchHotelCity
		},
		getters: {
			getHotelShowCity,
			gethotelSearchCityId,
			getInputSearchHotelCity
		}
	},
	data: function () {
		return {
			tabIndex: 0,
			city: null,
			showCity: false,
			selectCityName: '北京',
			cityNum: 0,
			switchCityTypeArr: [
				{
					name: '热门城市',
					str: 'hotCity'
				},
				{
					name: 'ABCDEF',
					str: 'A'
				},
				{
					name: 'GHJK',
					str: 'G'
				},
				{
					name: 'LMNPQ',
					str: 'L'
				},
				{
					name: 'RSTW',
					str: 'R'
				},
				{
					name: 'XYZ',
					str: 'X'
				}
			],   //	选择城市字符串数组
			cityLetterArr: [
				'',			
				['A', 'B', 'C', 'D', 'E', 'F'],
				['G', 'H', 'J', 'K'],
				['L', 'M', 'N', 'P', 'Q'],
				['R', 'S', 'T', 'W'],
				['X', 'Y', 'Z']
			],															//	排序索引字母
			isShowInputCity: false,          //	输入显示搜索城市
			hoverIndex: 0										//	输入搜索框鼠标滑过索引
		}
	},
	created () {
		this.selectCityName = this.hotelcityname
	},
	methods: {
		selectAddress: function () {
			if (!this.showCity && !this.isShowInputCity) {
				this.showCity = true
				this.$dispatch('select-address')
			} else {
				this.showCity = false
			}
		},
		//	城市切换选项卡
		switchCityType: function (type, index) {
			if (this.tabIndex === index) {
				return
			}
			this.tabIndex = index
			switch (type) {
				case 'hotCity':
					this.switchHotelDestination(this.hoteldestination.allHotCity)
					break;

				default:
					this.switchHotelDestination(this.hoteldestination.firstLetterCity[type])
					break;
			}
		},
		//	选择城市
		selectCity: function (id, name, index) {
			this.selectCityName = name
			this.showCity = false
			this.cityNum = index
			//	两次选择相同则退出
			if (this.gethotelSearchCityId === id) {
				return
			}

			this.hoverIndex = -1
			this.hotelSearchCityId(id)
			//是否初始化商业区
			this.isInitHotelSearchBusinessZone(true)
			//是否初始化行政区
			this.isInitHotelSearchAdministrativeRegion(true)
			this.$dispatch('select-city', id, name)
		},
		//	酒店输入查询地址
		inputSearchCity: function () {
			//	输入为空
			if (!this.selectCityName) {
				this.isShowInputCity = false
				return
			}
			this.showCity = false
			this.isShowInputCity = true
			this.hoverIndex = 0

			let opt = {
				type: 'get',
				data: {
					name: this.selectCityName
				},
				url: configUrl.inputSearchHotelCity.dataUrl,
				success: function (resp) {
					console.log(resp)
				},
				fail: function (resp) {
					console.log('查询失败，请稍后再试！')
				}
			}

			this.inputSearchHotelCity(opt)
		},
		//	输入搜索框鼠标划入
		mouseHover: function (index) {
			this.hoverIndex = index
		},

		//	输入点击选择城市
		inputSelectCity: function (id, name) {
			this.selectCityName = name
			this.isShowInputCity = false
			//	两次选择相同则退出
			if (this.gethotelSearchCityId === id) {
				return
			}

			this.hotelSearchCityId(id)
			//是否初始化商业区
			this.isInitHotelSearchBusinessZone(true)
			//是否初始化行政区
			this.isInitHotelSearchAdministrativeRegion(true)
			this.$dispatch('select-city', id, name)
		}
	},
	events: {
		'first-get-address': function () {

		},
		//	点击空白关闭选择地址
		'document-click': function () {
			let id = ''
			//	隐藏热门城市框
			this.showCity = false
			//	隐藏输入搜索框
			this.isShowInputCity = false

			//	输入框为空
			if (!this.selectCityName) {
				//	设置默认城市
				this.selectCityName = '北京'
				id = '824297'
			}
			else {
				if (!this.getInputSearchHotelCity.length || this.hoverIndex === -1) {
					return
				}

				//	两次选择相同
				id = this.getInputSearchHotelCity[this.hoverIndex][0]
				if (this.gethotelSearchCityId === id) {
					//	设置城市
					this.selectCityName = this.getInputSearchHotelCity[this.hoverIndex][1]
					return
				}

				//	设置城市
				this.selectCityName = this.getInputSearchHotelCity[this.hoverIndex][1]
				
			}
			//	重置鼠标滑过默认索引
			this.hoverIndex = 0
			//	初始化酒店id
			this.hotelSearchCityId(id)
			//是否初始化商业区
			this.isInitHotelSearchBusinessZone(true)
			//是否初始化行政区
			this.isInitHotelSearchAdministrativeRegion(true)
			this.$dispatch('select-city', id, this.selectCityName)
		},
		//	选择日期关闭选择地址
		'hide-select-destination': function (msg) {
			this.showCity = msg
		}
	}
}
</script>

<style>
.hotel_search_wrapper div.address_city_content{
	border: none;
	background: #f5fbff;
	max-height: 400px;
	overflow-y: auto;
	min-height: 150px;
}
.hotel_search_wrapper div.address_city{
	width: 457px;
	background: #fff;
	position: absolute;
	top: 34px;
	left: 0;
	z-index: 100;
	margin-right: 0;
	border: 1px solid #c8e6fb;
}
.address_city_head ul{
	width: 100%;
}
.hotel_search_wrapper div.address_city_head{
	height: 25px;
	text-align: center;
	margin-right: 0;
	border: none;
	border-bottom: 1px solid #c8e6fb;
}
.address_city_head li{
	line-height: 25px;
	float: left;
	text-align: center;
	cursor: pointer;
	background: #fff;
	width: 72px;
}
.address_city_head li.active{
	height: 26px;
	background: #f5fbff;
	color: #fc3c3c;
	border-left: 1px solid #c8e6fb;
	border-right: 1px solid #c8e6fb;
}
.address_city_head li.active:first-child{
	border-left: none;
} 
.address_city_head li.active:last-child{
	border-right: none;
}
.address_city_content li{
	padding: 0 9px;
	float: left;
	color: #005EA7;
	cursor: pointer;
	width: 89px;
}
.oxblood_red{
	padding-left: 10px;
	color: #c00;
}

/* --- 输入选择城市展示 --- */
.input_show_city{
	position: absolute;
  top: 35px;
  left: 75px;
  z-index: 100;
  background: #fff;
  border: 1px solid #ddd;
  width: 252px;
  max-height: 360px;
  overflow-y: auto;
}
.input_show_city li{
	padding: 0 10px;
	line-height: 30px;
	cursor: pointer;
}
.input_show_city li.hover_active{
	background: #ee3435;
	color: #fff;
}
.input_show_city div{
	background: #ee3435;
	color: #fff;
	padding: 0 10px;
	line-height: 30px;
}
.address_city_content ul{
	padding-left: 10px;
}
</style>
