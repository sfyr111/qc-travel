<template>
	<div class="qc_footer">
		<div class="foot-bar-box">
	      <img :src="imgPrifx+'foot-bar-box.png'" alt="">
	    </div>
	    <div class="page1200 clearfix">
	        <div class="foot-link-box foot-box">
	            <div class="foot-hotline-box foot-box">
	                <a href="http://www.17cai.com/control/complaintToService" target="_blank" class="hot-line"></a>
	            </div>
	            <div class="foot-weixin-box foot-box">
	                <img src="../../assets/qrcode72.png" width="110" height="140">
	            </div>
	            <div class="foot-link clearfix">
	                <div class="foot-link-i"><h3>关于齐采网</h3></div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_1&amp;articleId=A10001">
	                        齐采简介
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_1&amp;articleId=A10002">
	                        移动版本
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_1&amp;articleId=A10003">
	                        加入齐采
	                    </a>
	                </div>
	            </div>
	            <div class="foot-link clearfix">
	                <div class="foot-link-i"><h3>合作加盟</h3></div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_2&amp;articleId=A10004">
	                        采购招商
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_2&amp;articleId=A10006">
	                        品牌介绍
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_2&amp;articleId=A10005">
	                        商圈合伙人
	                    </a>
	                </div>
	            </div>
	            <div class="foot-link clearfix">
	                <div class="foot-link-i"><h3>帮助中心</h3></div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&amp;articleId=A10007">
	                        配送服务
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&amp;articleId=A10008">
	                        常见问题
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&amp;articleId=A10088">
	                        白条规则
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&amp;articleId=A10089">
	                        余额相关条款
	                    </a>
	                </div>
	            </div>
	            <div class="foot-link clearfix">
	                <div class="foot-link-i"><h3>联系我们</h3></div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_4&amp;articleId=A10009">
	                        公司地址
	                    </a>
	                </div>
	                <div class="foot-link-i">
	                    <a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_4&amp;articleId=A10010">
	                        联系客服
	                    </a>
	                </div>
	            </div>
	        </div>
	    </div>
	    <div class="page1200 clearfix use-link" style="border-top: 1px dashed #f8a5bc;">
	        <span>友情链接：&nbsp;&nbsp;</span>
	        <a href="http://about.comix.com.cn/#home" target="_blank">齐心集团官网</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.fsmeeting.com/" target="_blank">好视通</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.maimiaotech.com/" target="_blank">麦苗网络</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.98ep.com/" target="_blank">阳光印网</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://sz.diandianzu.com/" target="_blank">点点租</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.job1001.com/" target="_blank">一览英才网</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.liveapp.cn/" target="_blank">云来 </a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://yihaohulian.com/" target="_blank">一号互联 </a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="https://www.fairpur.com" target="_blank">阳光采购网 </a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.joyowo.com/" target="_blank">金柚网</a>&nbsp;&nbsp;|&nbsp;&nbsp;
	        <a href="http://www.cayica.com/" target="_blank">擦一擦</a>
	    </div>
	    <div class="foot-about">
	        <div class="page1200">
	            <p>Copyright © 2016 深圳齐采科技有限公司   <a class="beian" href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备16034195号-1</a></p>
	            <p>营业执照（统一社会信用代码）91440300MA5D8JP02T 食品经营许可证：JY11105020028185</p>
	        </div>
	    </div>
	</div>
</template>
<script>
import configUrl from '../../data/configUrl'
export default {
	created: function () {
		this.imgPrifx = configUrl.staticPath
	},
	data() {
		return {
			imgPrifx: ''
		}
	}
}
</script>