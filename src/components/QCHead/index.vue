<template>
	<div class="qc_header">
	    <div class="qc_header_nav">
	        <div class="clearfix page1200">
	            <!-- <div class="location">
	                <i class="fa fa-map-marker"></i>地区：<span>深圳市</span>
	            </div> -->
	            <ul class="nav_list">
	                <li class="nav_li_fix">
	                    欢迎来到齐采商旅！<a href="javascript:void(0);" title="用户名" id="pt-login">[{{username}}]</a>
	                    <a href="javascript:void(0);" title="免费注册" id="pt-register" @click.stop="logOut()">[登出]</a>
	                </li>
	                <li class="nav_li_fix"><a href="javascript:void(0);" v-link="{ path: '/orderList/airOrderList' }">我的订单</a></li>
	                <li>|</li>
	                <!-- <li class="nav_li_fix"><a target="_blank" href="javascript:void(0);">我的收藏</a></li>
	                <li>|</li> 
	                 @mouseover="showImg()" @mouseout="hideImg()"-->
	                <li class="nav_li_fix about_us">
	                    <a href="http://www.17cai.com" target="_blank">齐采网首页</a>
	                    <!-- <i class="fa fa-angle-down"></i>
	                    <div class="about_info" v-show="showPhoto">
	                    	<img :src="imgPrifx+'wechat.jpg'" alt="二维码">
	                    </div> -->
	                </li>
	                <li>|</li>
	                <li class="nav_li_fix"><a href="javascript:window.open('http://chat32.live800.com/live800/chatClient/chatbox.jsp?companyID=673084&configID=95347&jid=2261608103','','width=940,height=690')">在线客服</a></li>
	                <li>|</li>
	                <li class="nav_li_fix"><a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_1&articleId=A10001">帮助中心</a></li>
	            </ul>
	        </div>
	    </div>
	    <div class="qc_header_cont page1200 clearfix">
	        <a v-link="{ name: 'main' }" href="#" class="qc_header_logo">
	            <img src="../../assets/flight-logo.png" alt="吉尔伽美什">
	        </a>
	        <span class="company_name">{{headName}}</span>
	        <div class="kf_line">
	            <div class="kf_title"><!-- 7&nbsp;*&nbsp;24h&nbsp; -->客服电话</div>
	            <div class="kf_no">
	                4008-556-331&nbsp;&nbsp;
	                <!-- <i class="fa fa-caret-down"></i> -->
	            </div>
	        </div>
	    </div>
	    <div class="qc_header_tab">
	        <div class="page1200">
	            <a v-link="{ name: 'main' }" href="#" :class="{'active':!show}">商旅预订<!-- <span class="up-arrow"></span> --></a>
	            <a v-link="{ path: '/orderList/airOrderList' }" href="#" :class="{'active':show}">管理中心<!-- <span class="up-arrow"></span> --></a>
	        </div>
	    </div>
	</div>
</template>
<script>
import $ from 'jquery'
import configUrl from '../../data/configUrl'
export default {
    props: {
    	show: {
          type: Boolean,
          twoWay: true,
          default: false
        },
        headName: {
          type: String,
          twoWay: true,
          default: ''
        }
    },
    created: function () {
    	this.username = window.user ? window.user.loginName : "用户名"
    	this.imgPrifx = configUrl.staticPath
    },
    data: function () {
    	return {
    		username: '',
    		imgPrifx: '', // 图片前缀
    		showPhoto: false,
    	}
    },
    methods: {
    	showImg: function() {
    		this.showPhoto=true
    	},
    	hideImg: function () {
    		this.showPhoto=false
    	},
        logOut: function () {
        	var localService = 'http://travel.17cai.com';
			
			$.ajax({
				dataType : "JSON",
				type : "POST",
				url : "http://travel.17cai.com/comm/logout"
			}).done(function(rs) {
				if (rs.optSuc) {
					window.location = "https://passport.17cai.com:9443/cas_server/logout?service=" + encodeURIComponent(localService);
				}
			})
        }
    }
}
</script>
