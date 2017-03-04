<template>
	<div class="hotel_detail_date_search clearfix">
		<div class="fl">
			<div class="hotel_detail_start_date fl"  @click.stop="open($event,'picker1')">
				<label>
					<em class="color_66">入住</em>
					<input type="text" readonly="true" class="bsizing input"  size="50" type="text" v-model="calendar.items.picker1.value" placeholder="选择日期">
					<i class="fa fa-map-marker"></i>
				</label>
			</div>
			<div class="hotel_detail_end_date fl"  @click.stop="open($event,'picker2')">
				<label>
					<em class="color_66">离店</em>
					<input type="text" readonly="true" class="bsizing input" size="50" type="text" v-model="calendar.items.picker2.value">
					<i class="fa fa-map-marker"></i>
				</label>
			</div>
			<div class="fl total_night">入住{{ days }}晚</div>
		</div>
		<div class="fr font14 hotel_detail_date_search_right" v-if="!hidebutton">
			<a href="javascrpt:;" @click="resetCheck">重新搜索 </a>
		</div>

		<!-- 日历组件 -->
		<calendar
		    :show.sync="calendar.show"
		    :type="calendar.type"
		    :value.sync="calendar.value" 
		    :x="calendar.x" 
		    :y="calendar.y" 
		    :begin.sync="calendar.begin" 
		    :end.sync="calendar.end" 
		    :range.sync="calendar.range"
		    :weeks="calendar.weeks"
		    :months="calendar.months"
		    :sep.sync="calendar.sep">
		</calendar>
	</div>
</template>

<script>
import calendar from '../DatePicker'
import $ from 'jquery'
import util from '../../utils/util'

export default{
	props: {
		hidebutton: {
			type: Boolean
		},
		startdate: {
			type: String
		},
		enddate: {
			type: String
		}
	},
	data: function () {
		return {
			checkInDate: util.setDate(0),
			checkOutDate: util.setDate(1),
			calendar:{
        show:false,
        x:0,
        y:0,
        begin: '',
        end:"",
        sep:"-",
        weeks:['日', '一', '二', '三', '四', '五', '六'],
        months:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        value: '',
        items:{
            // 单选模式
            picker1:{
                type:"date",
                begin: util.setDate(0),
                end:"",
                value: util.setDate(0)
            },
                
            // 2个日期模式
            picker2:{
              type:"date",
              value: util.setDate(1),
              begin: util.setDate(1),
              end:""
            }
        }
			},
			days: 1					//	入住天数
		}
	},
	created () {
		console.log(this.checkindate)
		this.checkInDate = this.startdate
		this.checkOutDate = this.enddate
		this.calendar.items.picker1.begin = this.startdate
		this.calendar.items.picker1.value = this.startdate
		this.calendar.items.picker2.begin = this.enddate
		this.calendar.items.picker2.value = this.enddate

		this.days = util.getDays(this.checkInDate, this.checkOutDate, '-')
	},
	components: {
		calendar
	},
	watch:{
    'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value = value
    }
  },
  methods: {
		// 打开显示选择器
    open (e,type) {
        // 设置类型
        this.calendar.picker = type
        this.calendar.type = this.calendar.items[type].type
        this.calendar.range = this.calendar.items[type].range
        this.calendar.begin = this.calendar.items[type].begin
        this.calendar.end = this.calendar.items[type].end
        this.calendar.value = this.calendar.items[type].value
        // 可不用写
        this.calendar.sep = this.calendar.sep
        this.calendar.weeks = this.calendar.weeks
        this.calendar.months = this.calendar.months

        this.calendar.show = true
        var $el = $(e.target).closest('div')
        var h = parseInt($el.css('height').replace('px'))
        this.calendar.x = $el.offset().left
        this.calendar.y = $el.offset().top + 8 + h
    },
    //	重新搜索
    resetCheck: function () {
    	//	console.log(this.calendar.items.picker1.value, this.calendar.items.picker2.value)
    	var startDate = this.calendar.items.picker1.value
    	var endDate = this.calendar.items.picker2.value
    	this.$dispatch('reset-check', startDate, endDate)
    }
  },

  events: {
  	//	日历选择完日期
  	'select-date-confirm': function (msg) {
  		//	获取当前是哪个时间
  		var obj = this.calendar.picker
  		//	选择开始时间 设置结束时间
  		if (obj === 'picker1') {
  			// 如果开始时间比结束日期大 则设置结束日期大于开始日期1天
  			var startDate = util.selectDateFormat(msg, '-')
  			var endDate = util.selectDateFormat(this.calendar.items.picker2.value, '-')
  			if (+new Date(startDate) >= +new Date(endDate)) {
  				this.calendar.items.picker2.value = util.setDate(1, startDate)
  				this.checkOutDate = this.calendar.items.picker2.value
  			}
  			this.calendar.items.picker2.begin = util.setDate(1, startDate)
  			this.checkInDate = msg
  		} else {
  			this.checkOutDate = msg
  		}

  		this.days = util.getDays(this.checkInDate, this.checkOutDate, '-')
  		this.$dispatch('get-night-num', this.days, this.checkInDate, this.checkOutDate)
  	},
  }
}
</script>

<style>
.hotel_detail_date_search{
	padding-left: 18px;
	padding-top: 24px;
	height: 52px;
	background: #fff;
	margin-bottom: 8px;
}
.hotel_detail_date_search_right{
	position: relative;
	width: 100px;
	height: 36px;
}
.hotel_detail_date_search a{
	display: block;
	width: 96px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	/* background: #fc7244; */
	background: #e34449;
	border-radius: 3px;
	color: #fff;
	position: absolute;
	top: 50%;
	right: 42px;
	margin-top: -18px;
}
.hotel_detail_date_search a:hover{
	background: #b41521;
}
.hotel_detail_date_search input{
	width: 174px;
	height: 36px;
	border: none;
	background: none;
	padding-left: 5px;
}
.hotel_detail_start_date, .hotel_detail_end_date{
	width: 214px;
	height: 34px;
	border: 1px solid #ddd;
	padding: 0 8px;
	margin-right: 18px;
}
.total_night{
	height: 36px;
	line-height: 36px;
}
</style>