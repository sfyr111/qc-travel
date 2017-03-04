<template>
	<!-- 输入查询城市展示 -->
	<div class="input_show_city" v-show="isShowInputCity" :style="{'left':x+'px','top':y+'px'}"> 
		<ul>
			<li v-for="(index, item) in getInputSearchHotelCity" @mouseover="mouseHover(index)" :class="{'hover_active': hoverIndex === index}" @click.stop="inputSelectCity(index)">
				{{ item[1] }}
			</li>
		</ul>
		<div v-if="!getInputSearchHotelCity.length" @click.stop="inputSelectCity()">对不起，暂未搜索到该城市</div>
	</div>
</template>
<script>
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
export default {
	props: {
		isShowInputCity: {
			type: Boolean,
			default: false
		},
		x: {
			type: Number
		},
		y: {
			type:Number
		}
	},
	data: function () {
		return {
			getInputSearchHotelCity: [],
			hoverIndex: 0
		}
	},
	methods: {
		mouseHover: function (index) {
			this.hoverIndex = index
		},
		inputSelectCity: function (index) {
			if (!this.getInputSearchHotelCity.length) {
				this.$dispatch('input-select-city', [])
				return
			}
			this.$dispatch('input-select-city', this.getInputSearchHotelCity[index])
		}
	},
	events: {
		'get-city': function (str) {
			let self = this
			//	初始化机票城市数据
			let airCityOpt = {
				type: 'get',
				data: {
					name: str
				},
				url: configUrl.airCityQuery.dataUrl,
				success: function (resp) {
				},
				fail: function (resp) {
				}
			}
			util.getMyrequest(airCityOpt).then(function (resp) {
		        self.getInputSearchHotelCity=resp.data
		    })
		}
	}
}
</script>
<style scoped>
/* --- 输入选择城市展示 --- */
.input_show_city{
	position: absolute;
	top: 35px;
	left: 75px;
	z-index: 100;
	background: #fff;
	border: 1px solid #ddd;
	width: 210px;
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