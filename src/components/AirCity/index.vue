<template>
	<div @click.stop="" class="city" v-show="show" :style="{'left':x+'px','top':y+'px'}">
		<span class="ct_text">选择城市</span>
		<ul class="tab_title clearfix">		
			<li :class="{'curr' : showIndex == 0}" @click.stop="selectIndex(0, e)"><a href="javascript:;">ABCDEF</a></li>
			<li :class="{'curr' : showIndex == 1}" @click.stop="selectIndex(1, e)"><a href="javascript:;">GHIJKL</a></li>
			<li :class="{'curr' : showIndex == 2}" @click.stop="selectIndex(2, e)"><a href="javascript:;">MNOPQR</a></li>
			<li :class="{'curr' : showIndex == 3}" @click.stop="selectIndex(3, e)"><a href="javascript:;">STUVWX</a></li>
			<li :class="{'curr' : showIndex == 4}" @click.stop="selectIndex(4, e)"><a href="javascript:;">YZ</a></li>
		</ul>
		<div class="air_city_content clearfix" v-show="showIndex == 0">
			<!-- <div class="address_row" v-for="( key, group ) in citys.ABCDEF">
				<div class="address_row_name">{{key}}</div>
				<div class="address_row_item">
					<a href="javascript:;" v-for="city in citys.ABCDEF[A]" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div> -->
			<div class="address_row">
				<div class="address_row_name">A</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.A" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">B</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.B" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">C</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.C" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">D</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.D" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">E</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.E" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">F</div>
				<div class="address_row_item" v-if="citys.ABCDEF">
					<a href="javascript:;" v-for="city in citys.ABCDEF.F" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
		</div>
		<div class="air_city_content clearfix" v-show="showIndex == 1">
			<!-- <div class="address_row" v-for="( key, group ) in citys.GHIJKL">
				<div class="address_row_name">{{key}}</div>
				<div class="address_row_item">
					<a href="javascript:;" v-for="city in group" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div> -->
			<div class="address_row">
				<div class="address_row_name">G</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.G" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">H</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.H" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">I</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.I" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">J</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.J" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">K</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.K" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">L</div>
				<div class="address_row_item" v-if="citys.GHIJKL">
					<a href="javascript:;" v-for="city in citys.GHIJKL.L" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
		</div>
		<div class="air_city_content clearfix" v-show="showIndex == 2">
			<!-- <div class="address_row" v-for="( key, group ) in citys.MNOPQR">
				<div class="address_row_name">{{key}}</div>
				<div class="address_row_item">
					<a href="javascript:;" v-for="city in group" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div> -->
			<div class="address_row">
				<div class="address_row_name">M</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.M" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">N</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.N" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">O</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.O" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">P</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.P" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">Q</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.Q" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">R</div>
				<div class="address_row_item" v-if="citys.MNOPQR">
					<a href="javascript:;" v-for="city in citys.MNOPQR.R" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
		</div>
		<div class="air_city_content clearfix" v-show="showIndex == 3">
			<!-- <div class="address_row" v-for="( key, group ) in citys.STUVWX">
				<div class="address_row_name">{{key}}</div>
				<div class="address_row_item">
					<a href="javascript:;" v-for="city in group" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div> -->
			<div class="address_row">
				<div class="address_row_name">S</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.S" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">T</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.T" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">U</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.U" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">V</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.V" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">W</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.W" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">X</div>
				<div class="address_row_item" v-if="citys.STUVWX">
					<a href="javascript:;" v-for="city in citys.STUVWX.X" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
		</div>
		<div class="air_city_content clearfix" v-show="showIndex == 4">
			<!-- <div class="address_row" v-for="( key, group ) in citys.YZ">
				<div class="address_row_name">{{key}}</div>
				<div class="address_row_item">
					<a href="javascript:;" v-for="city in group" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div> -->
			<div class="address_row">
				<div class="address_row_name">Y</div>
				<div class="address_row_item" v-if="citys.YZ">
					<a href="javascript:;" v-for="city in citys.YZ.Y" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
			<div class="address_row">
				<div class="address_row_name">Z</div>
				<div class="address_row_item" v-if="citys.YZ">
					<a href="javascript:;" v-for="city in citys.YZ.Z" @click.stop="selectCity(city[0], city[1], e)">{{city[1]}}</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		citys:{
			type: Object
		},
		show: {
			type: Boolean,
			twoWay: true,
			default: false
		},
		value: {
            type: Object,
            twoWay: true
        },
		x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
	},
	created() {
		this.init()
        // 延迟绑定事件，防止关闭
        window.setTimeout(() => {
            document.addEventListener('click', (e) => {
                e.stopPropagation()
                this.cancel()
            }, false)
        }, 500)
	},
	data () {
		return {
			showIndex: 0,
			cityName: '',
			cityCode: ''
		}
	},
	methods: {
		selectIndex: function (index, e) {		
			this.showIndex = index
		},
		selectCity: function (cityCode, cityName, e) {
			this.value.cityName = cityName
			this.value.cityCode = cityCode
			this.show = false
		},
		cancel() {
            this.show = false
        },
        init() {
        	if (this.value) {
        		this.cityName = this.value.cityName
        		this.cityCode = this.value.cityCode
        	}
        }
	},
	events: {
		'document-click': function () {			
			this.show = false
		}
	}
}
</script>
<style scoped>
.city {
	position: absolute;
	width: 382px;
	background-color: #fff;
	border: 1px solid #c7d8e3;
	opacity:.95;
    transition: all .5s ease;
	z-index: 1;
}
.city:before {
	position: absolute;
    left: 30px;
    top: -10px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #c7d8e3;
}
.city:after {
	position: absolute;
    left: 30px;
    top: -9px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}
.city .ct_text {
	line-height: 29px;
    padding: 3px 8px;
}
.tab_title {
	border-bottom: 1px solid #c7d8e3;
	padding: 0px 5px;
	overflow: visible;
	height: 24px;
}
.tab_title li {
	display: inline;
	float: left;
	position: relative;
	line-height: 24px;
	height: 26px;
	padding: 0 5px;
	overflow: hidden;
}
.tab_title li.curr {
	height: 24px;
    border: 1px solid #ccc;
    border-bottom: 0;
    background: #fff;
}
.tab_title li.curr a {
	color: #dd1827;
}
.city .air_city_content {
	padding: 10px 0 10px 10px;
}
.city .air_city_content .address_row .address_row_name  {
	float: left;
	line-height: 24px;
	color: #c00;	
	width: 10px;
}
.address_row_item {
	float: left;
	width: 372px;
}
.city .air_city_content .address_row a {
	float: left;
	width: 62px;
	line-height: 24px;
	color: #005EA7;
	text-decoration: none;
	cursor: pointer;	
}
</style>