<template>
	<div class="hotel_detail_banner clearfix">
		<div class="fl hotel_detail_banner_left">
			<div class="fl big_img" v-if="detail.baseInfo">
				<img :src="detail.baseInfo.imgUrl">
			</div>
			<div class="small_img fl" v-if="detail.pictures">
				<ul>
					<li class="fl" v-for="(index, item) in filterSmallImg(detail.pictures)" @click="selectPic(index)">
						<img :src="item.smallPic">
						<div class="tips">
							
						</div>
						<div class="small_img_show_big">
							<img :src="item.bigPic">
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="hotel_detail_small_map fr font14">
			<div class="hotel_detail_small_map_container" v-if="detail.baseInfo">
				<!-- <div id="allmap"></div> -->
				<iframe :src="mapUrl + '?longitude=' + detail.baseInfo.longitude + '&latitude=' + detail.baseInfo.latitude + '&name=' + detail.baseInfo.name"></iframe>
			</div>
			<a @click="showMapDetail" id="allmap_view_details">查看地图</a>
		</div>
	</div>
</template>

<script>
//import BMap from 'BMap'
import { getHotelDetail } from '../../vuex/getters'

export default{
	props: {
		detail: {
			type: Object
		}
	},
	vuex: {
		getters: {
			getHotelDetail
		}
	},
	data: function () {
		return {
			longitude: 116.404,			//	经度
			latitude: 39.915,				//	纬度		
			smallImgArr: [],
			mapUrl: 'http://travel.17cai.com/static/smallMap.html',
			isShowMap: false	
		}
	},
	
	methods: {
		showMapDetail: function () {
			this.$dispatch('show-map-detail')
		},

		//	只显示6张小图片
		filterSmallImg: function (list) {
			return list.filter(function (item, index) {
				return index < 6
			})
		},

		//	点击小图查看弹层大图
		selectPic: function (index) {
			this.$dispatch('select-pic', index)
		}
	},
	events: {
		//	获取经纬度初始化地图
		'get-lat-lon': function (msg) {
			this.longitude = Number(msg.longitude)
			this.latitude = Number(msg.latitude)
			console.log('纬度:' + this.latitude)
			var self = this
			function init () {
				var point = new BMap.Point(self.longitude, self.latitude) // 创建点坐标
				
				var map = new BMap.Map("allmap")            // 创建Map实例
				map.centerAndZoom(point,15)
				map.disableDragging()   												 //禁止拖拽 

				//map.enableScrollWheelZoom()                 //启用滚轮放大缩小

				
				//坐标转换完之后的回调函数
				var translateCallback = function (data){
					if (data.status) {
						console.log('转换坐标失败')
						return
					}
					var marker = new BMap.Marker(data.points[0]);
					map.addOverlay(marker);
					var opts = {
					  position : point,    // 指定文本标注所在的地理位置
					  offset   : new BMap.Size(15, -30)    //设置文本偏移量
					}
					var label = new BMap.Label(self.detail.baseInfo.name, opts);  // 创建文本标注对象
					label.setStyle({
						 color : "#666",
						 fontSize : "12px",
						 height : "26px",
						 lineHeight : "26px",
						 fontFamily:"微软雅黑",
						 border: '1px solid #ddd',
						 maxWidth: '84px',
						 padding: '0 10px',
						 'text-overflow' : 'ellipsis',
						 'white-space' : 'nowrap',
						 overflow : 'hidden'
					 });
					marker.setLabel(label);
					map.setCenter(data.points[0]);
				}

				setTimeout(function(){
		        var convertor = new BMap.Convertor();
		        var pointArr = [];
		        pointArr.push(point);
		        convertor.translate(pointArr, 3, 5, translateCallback)
		    }, 1000);
					
			}
			this.$nextTick(function () {
				//init()
			})
		}
	}
}
</script>

<style>
.hotel_detail_banner{
	margin-top: 8px;
}

.hotel_detail_small_map{
	width: 300px;
	height: 306px;
	background: #fff;
	position: relative;
} 
.hotel_detail_small_map_container{
	width: 300px;
	height: 306px;
	position: absolute;
	top: 0;
	left: 0;
}
.hotel_detail_small_map_container iframe{
	width: 100%;
	height: 100%;
	border: 0;
}
#allmap{
	position: relative;
	width: 300px;
	height: 306px;
}
.hotel_detail_small_map a#allmap_view_details{
	display: block;
	width: 110px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	color: #fff;
	background: #44b0f8;
	border-radius: 3px;
	position: absolute;
	bottom: 20px;
	right: 18px;
	cursor: pointer;
}
.hotel_detail_banner_left .big_img, .hotel_detail_banner_left .small_img {
	width: 450px;
	height: 306px;
}
.hotel_detail_banner_left .big_img, .hotel_detail_banner_left .small_img li{
	padding: 0 3px 3px 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.hotel_detail_banner_left .small_img li{
	width: 150px;
	height: 153px;
	position: relative;
	cursor: pointer;
}
.hotel_detail_banner_left .small_img img, .hotel_detail_banner_left .big_img img{
	width: 100%;
	height: 100%;
}
.hotel_detail_banner_left .small_img_show_big{
	position: absolute;
	top: 153px;
	left: 0;
	width: 0px;
	height: 0px;
	z-index: 100;
	opacity: 0;
	border: 2px solid #FFF;
	background-color: #FFF;
	box-shadow: 0 0 1px 1px #999;
	-webkit-transition: all .5s;
	-ms-transition: all  .5s;
	-o-transition: all .5s;
	transition: all .5s;
}
.hotel_detail_banner_left .small_img li:hover .small_img_show_big{
	opacity: 1;
	width: 350px;
	height: 233px;
}
</style>