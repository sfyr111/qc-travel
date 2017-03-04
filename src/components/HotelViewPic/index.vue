<template>
	<div class="hotel_view_pic" v-if="show">
		<div class="mask"></div>
		<div class="hotel_view_pic_box clearfix">

			<div class="hotel_view_pic_box_left">
				<div class="photo" v-if="picArr">
					<img :src="picArr[selectIndex].bigPic"><span class="placeHoder"></span>
				</div>
				<p v-if="picArr">
					<em>{{selectIndex + 1}}</em>/{{ picArr.length }}
				</p>
			</div>

			<div class="hotel_view_pic_box_right">
				<div class="hotel_view_pic_type">
					<span  v-if="picArr">
						全部<br/>
						{{ picArr.length }}
					</span>
				</div>

				<div class="small_img_container">
					<ul class="clearfix">
						<li v-for="(index, item) in picArr" @click="selectPic(index)" :style="{ width: w + 'px', height: h + 'px' }">
							<img :src="item.smallPic">
						</li>

						<li class="active_border" :style="{ top: y + 'px', left: x + 'px', border: border + 'px solid #ff642e', width: w + 'px', height: h + 'px', transform: 'translate3d('+ translateX + 'px,' + translateY + 'px, 0'  +')' }"></li>
					</ul>
				</div>
			</div>

			<span class="cancel" @click="cancel">ｘ</span>
			<a href="javascript:;" class="to_left" @click="prev" :class="{'is_no_click': selectIndex === 0}">
				<i class="fa fa-angle-left"></i>
			</a>
			<span>
				<a href="javascript:;" class="to_right"  @click="next" :class="{'is_no_click': selectIndex === picArr.length - 1}">
					<i class="fa fa-angle-right"></i>
				</a>
			</span>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'

export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		selectIndex: {
			type: Number,
			default: 0
		},
		picArr: {
			type: Array
		}
	},
	data: function () {
		return {
			x: 6,							//	初始化position 定位
			y: 0,
			translateX: 0,						//	translate定位
			translateY: 0,
			w: 76,						//	宽度
			h: 76,						//	高度
			border: 4,					//	边框
			rowsNum: 3,        //	横排排列数
			bigImgSrc: ''				//	预览大图路劲
		}
	},
	created () {},
	methods: {
		//	选中图片添加边框
		selectPic: function (index) {
			this.selectIndex = index
		},

		//	计算选择图片边框动画的top left值
		getOffset: function (index, w, h, rowsNum, border, isInit) {
			var num = index + 1
			var y = Math.ceil(num / rowsNum) 		//	第几列
			var x = num - rowsNum * (y - 1)			//	横排第几个
			var _x, _y;

			if (isInit) {
				//	初始化定位   jquery动画
				_x = 6 + (x - 1) * (this.w + this.border)
				_y = 1 + (y - 1) * (this.w + this.border)
			} else {
				//	css3实现动画
				_x = (x - 1) * (w + border)
				_y = 1 + (y - 1) * (h + border)
			}
			
			var obj = {
				x: _x,
				y: _y
			}

			return obj
		},

		//	关闭图片
		cancel: function () {
			this.show = false
		},

		//	前一张图片
		prev: function () {
			if (this.selectIndex <= 0) {
				this.selectIndex = 0
				return
			}
			this.selectIndex--
		},

		//	后一张图片
		next: function () {
			if (this.selectIndex >= this.picArr.length - 1) {
				this.selectIndex = this.picArr.length - 1
				return
			}
			this.selectIndex++
		},
	},

	watch: {
		selectIndex (val) {
			var obj = this.getOffset(val, this.w, this.h, this.rowsNum, this.border, false)
			this.translateX = obj.x 
			this.translateY = obj.y

			var container = document.querySelector('.small_img_container')
			var top = obj.y - this.h * 2 - this.border
			container.scrollTop = top
		}
	}
}
</script>

<style>
.hotel_view_pic{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
}
.hotel_view_pic .mask{
	width: 100%;
	height: 100%;
	background: black;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0.15;
}
.hotel_view_pic_box{
	width: 900px;
	height: 480px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -240px;
	margin-left: -450px;
	background: #fff;
}
.hotel_view_pic_box span.cancel{
	display: block;
	width: 28px;
	height: 28px;
	vertical-align: middle;
	font-size: 17px;
	color: #fff;
	border-radius: 100%;
	background: rgba(0, 0, 0, .8);
	text-align: center;
	position: absolute;
	top: -12px;
	right: -13px;
	border: 2px solid #fff;
	cursor: pointer;
}
.hotel_view_pic_box span.cancel:hover{
	background: red;
}
.hotel_view_pic_box_left{
	width: 550px;
  height: 450px;
  float: left;
  padding: 15px 40px;
  background-color: #FFF;
}
.hotel_view_pic_box_right{
	width: 262px;
  height: 480px;
  padding: 0 0 0 5px;
  float: right;
  overflow: hidden;
  position: relative;
  background: #e9e9e9;
}
.hotel_view_pic_box_left .photo{
	height: 412px;
  width: 550px;
  text-align: center;
}
.hotel_view_pic_box_left .photo img{
	vertical-align: middle;
  max-height: 412px;
  max-width: 550px;
  display: inline-block;
}
.hotel_view_pic_box_left .photo span.placeHoder{
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
.hotel_view_pic_box_left p{
	text-align: right;
	padding-top: 15px;
}
.hotel_view_pic_box_left p em{
	color: #ffae2e;
}
.hotel_view_pic_box .to_left, .hotel_view_pic_box .to_right{
	display: block;
	width: 40px;
	text-align: center;
	font-size: 40px;
	position: absolute;
	top: 200px; 
	color: #ccc;
}
.hotel_view_pic_box .to_left:hover, .hotel_view_pic_box .to_right:hover{
	color: #ff642e;
}
.hotel_view_pic_box .to_left{
	left: 0;
}
.hotel_view_pic_box .to_right{
	right: 267px;
}
.hotel_view_pic_type{
	  height: 43px;
    padding: 15px 0 6px 5px;
    height: 48px;
    margin-bottom: 5px;
}
.hotel_view_pic_type span{
	  padding: 8px 0;
	  display: block;
    border-radius: 2px;
    width: 58px;
    vertical-align: middle;
    text-align: center;
    background: #ffae2e;
    color: #fff;
}
.small_img_container{
	height: 411px;
	overflow-y: auto;
}
.small_img_container li{
	float: left;
	padding: 0 4px 4px 0;
	cursor: pointer;
	position: relative;
}
.small_img_container li img{
	width: 100%;
	height: 100%;
}
.small_img_container li.active_border{
	position: absolute;
	padding: 0;
	z-index: 2;
	-webkit-transition: all .3s;
				transition: all .3s;
}
.small_img_container ul{
	margin-left: -5px;
	position: relative;
	padding: 5px 0 15px 10px;
}
.hotel_view_pic_box a.is_no_click, .hotel_view_pic_box a.is_no_click:hover{
	color: #f0f0f0;
}
</style>