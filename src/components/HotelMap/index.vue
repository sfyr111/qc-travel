<template>
	<div class="hotel_map_container">
		<div class="hotel_map_mask"></div>
		<div class="hotel_map_wrapper">
			<div class="big_map">
				<!-- <div id="big_map"></div> -->
			</div>
			<span @click="closeMap">ｘ</span>
		</div>
	</div>
</template>

<script>
import util from '../../utils/util'

export default{
	props: {
		baseinfo: {
			type: Object
		}
	},
	data: function () {
		return {
			longitude: 116.404,			//	经度
			latitude: 39.915,				//	纬度
			isFirstInitMap: true,    //	初始化地图
			map: null,   						//	地图变量
			mapUrl: 'http://travel.17cai.com/static/bigMap.html'
		}
	},

	methods: {
		closeMap: function () {
			this.$dispatch('close-map')
		}
	},
	events: {
		'first-init-map': function () {
			if (!this.isFirstInitMap) {
				return
			}
			this.isFirstInitMap = false
			this.longitude = this.baseinfo.longitude
			this.latitude = this.baseinfo.latitude

			let mapRoot = document.querySelector('.big_map')
			let mapFrame = document.createElement('iframe')
			mapFrame.style.width = '100%'
			mapFrame.style.height = '100%'
			mapFrame.style.border = 'none'
			let url = this.mapUrl + '?name=' + this.baseinfo.name + '&longitude=' + this.longitude + '&latitude=' + this.latitude
			mapFrame.src = url
			mapRoot.appendChild(mapFrame)

			var self = this
			function init () {
				var point = new BMap.Point(self.longitude, self.latitude) // 创建点坐标
				
				self.map = new BMap.Map("big_map")            // 创建Map实例
				self.map.centerAndZoom(point,15)
				self.map.addControl(new BMap.NavigationControl());

				self.map.enableScrollWheelZoom()                 //启用滚轮放大缩小
				
				//坐标转换完之后的回调函数
				var translateCallback = function (data){
					if (data.status) {
						console.log('转换坐标失败')
						return
					}
					var marker = new BMap.Marker(data.points[0]);
					self.map.addOverlay(marker);
					var opts = {
					  position : point,    // 指定文本标注所在的地理位置
					  offset   : new BMap.Size(15, -30)    //设置文本偏移量
					}
					var label = new BMap.Label(self.baseinfo.name, opts);  // 创建文本标注对象
					label.setStyle({
						 color : "#666",
						 fontSize : "12px",
						 height : "26px",
						 lineHeight : "26px",
						 fontFamily:"微软雅黑",
						 border: '1px solid #ddd',
						 maxWidth: '84px',
						 padding: '0 10px',
						 display: 'inline-block',
						 'max-width': '300px'
					 });
					marker.setLabel(label);
					self.map.setCenter(data.points[0]);
				}

				setTimeout(function(){
		        var convertor = new BMap.Convertor();
		        var pointArr = [];
		        pointArr.push(point);
		        convertor.translate(pointArr, 3, 5, translateCallback)
		    }, 1000);
					
			}
			//init()
		}
	}
}
</script>

<style>
.hotel_map_container{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
}
.hotel_map_mask{
	width: 100%;
	height: 100%;
	background: black;
	opacity: 0.5;
	position: absolute;
	top: 0;
	left: 0;
}
.hotel_map_wrapper{
	width: 1062px;
	height: 542px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -531px;
	margin-top: -271px;
}
.big_map, #big_map{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
#big_map{
	position: relative;
}
.hotel_map_container span{
	width: 28px;
	height: 28px;
	background: black;
	line-height: 25px;
	text-align: center;
	color: #fff;
	font-size: 20px;
	position: absolute;
	top: 8px;
	right: 8px;
	border-radius: 100%;
	cursor: pointer;
}
.hotel_map_container span:hover{
	background: red;
}
</style>