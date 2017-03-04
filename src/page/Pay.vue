<template>
	<q-c-head :show.sync="isManager"></q-c-head>
	<div class="content">
	    <div class="page1200">
	        <div class="pay_head_container">
                <div class="pay_head_left">
                    <img :src="imgPrifx+'ok.png'" alt="">
                    <p v-if="orderTypeNum === 2" class="font16">
                        还款申请提交成功，请您尽快付款！
                    </p>
                    <p v-if="orderTypeNum !== 2" class="font16">
                        订单提交成功，请您尽快付款！订单号：<i>{{ orderNo }}</i>
                     </p>
                    <p v-if="orderTypeNum !== 2">请您在10分钟内付款，否则订单会自动取消。</p>   
                </div>
                <div v-if="orderTypeNum !== 2" class="pay_head_right">
                    应付金额：
                    <i class="color_red">
                     ¥
                        <em class="font28">
                          {{ orderPrice }}  
                        </em>
                        元
                    </i>
                </div>
                <div v-if="orderTypeNum === 2" class="pay_head_right">
                    还款金额：
                    <i class="color_red">
                     ¥
                        <em class="font28">
                          {{ orderPrice }}  
                        </em>
                        元
                    </i>
                </div>
	        </div>
	        <div class="mode-box">
	            <div class="mode-title">支付方式</div>
	            <div class="sorry none">
	                <span>白条</span>
	                <i>抱歉，您的月结支付方式已被系统暂停使用！</i>
	            </div>

                <!-- 月结支付 -->
	            <div class="monthly-pay"  v-if="getPayMethodsList.monthPay && getPayMethodsList.monthPay.hasAccount">
	                <div v-if="getPayMethodsList.monthPay.amountAvailable >= orderPrice">
	                	<span class="mode-btn" @click="selectPayMethods('BAL_PAY', -1)" :class="{'on': tabIndex === -1 }">白条</span>
	                	<i>可用余额：{{ getPayMethodsList.monthPay.amountAvailable }}元</i>
	                </div>
                    <div v-else class="money_not_eoungh">
                        <span class="mode-btn">白条</span>
                        <i>余额不足，可用余额：{{ getPayMethodsList.monthPay.amountAvailable }}元</i>
                    </div>
	            </div>

                <!-- 余额支付 -->
                <div class="monthly-pay"  v-if="getPayMethodsList.mallBalPay && getPayMethodsList.mallBalPay.hasAccount">
                    <div v-if="getPayMethodsList.mallBalPay.amountAvailable >= orderPrice">
                        <span class="mode-btn" @click="selectPayMethods('MALL_BAL_PAY', -2)" :class="{'on': tabIndex === -2 }">余额</span>
                        <i>可用余额：{{ getPayMethodsList.mallBalPay.amountAvailable }}元</i>
                    </div>
                    <div v-else class="money_not_eoungh">
                        <span class="mode-btn">余额</span>
                        <i>余额不足，可用余额：{{ getPayMethodsList.mallBalPay.amountAvailable }}元</i>
                    </div>
                </div>

	            <div class="mode clearfix">
	                <span class="mode-btn" v-for="(index, item) in getPayMethodsList.payTypeList" @click="selectPayMethods(item.paymentName, index)" :class="{'on': tabIndex === index }">
	                	{{ item.payDesc }}
	                </span> 
	            </div>
                
                <!-- 月结或余额支付输入密码 -->
	            <div  v-if="getPayMethodsList.monthPay || getPayMethodsList.mallBalPay">
		            <div class="toPay"  v-if="(tabIndex === -1 && getPayMethodsList.monthPay.hasAccount) || (tabIndex === -2 && getPayMethodsList.mallBalPay.hasAccount)">
		            	<div>
			                <p class="text">请输入支付密码：</p>
			                <p class="monthly-password">
			                	<input type="password" v-model="passWord" @blur="passworBlur">
			                	<i @click="resetPassWord">
                                    忘记密码？
                                </i>
			                	<i @click="setPassWword" v-if="!getPayMethodsList.monthPay.hasPass && tabIndex === -1">
                                    设置支付密码
                                </i>
                                <i @click="setPassWword" v-if="!getPayMethodsList.mallBalPay.hasPass && tabIndex === -2">
                                    设置支付密码
                                </i>
			                </p>
			                <p class="warning"  v-if="monthPayPassWordIsErr">密码错误，24小时内最多可输入三次密码</p>
			                 <p class="warning" v-if="passWordEmpty">密码不能为空</p>
			            </div>
		            </div>
		          </div>
	            <div>
	            	<span class="topay_btn" @click="payMoney" :class="{ 'noclick': tabIndex === -3 }">前往支付</span>
	            </div>
	        </div>
	    </div>
	    <div class="mask none"></div>

	    <!-- 密码输入超过三次后弹出框 -->
	    <div class="popup none">
	        <div class="popup-text">
	            <p class="text-title">温馨提示：</p>
	            <p>您的密码错误次数已达到限制，请您24小时后再试！或者找回密码！</p>
	        </div>
	        <div class="popup-mode clearfix">
	            <span class="fl back">找回密码</span>
	            <span class="fl">取消</span>
	        </div>  
	    </div>

	    <!-- 支付完成后弹出框 -->
	    <div class="popup2" v-if="isShowPayBox">
	        <h3 class="popup2-title">登陆网上银行支付<span><i class="fa fa-close"  @click="hidePayBox"></i></span></h3>
	        <div class="popup2-content">
	           <p class="notice">请您在新打开的网上银行页面进行支付，支付完成前请不要关闭窗口</p>
	            <p class="popup2-btn">
	                <span class="popup2-btn1" @click="payComplete">已完成支付</span>
	                <span class="popup2-btn2">支付遇到问题</span>
	            </p>
	        </div>
	        <p class="other" @click="hidePayBox">选择其它支付方式？</p>
	    </div>
        
	</div>
  <q-c-footer></q-c-footer>

  <!-- 支付宝支付弹窗 -->
  <div class="pay_frame" v-if="isShowPayBox || isShowPayLoading">
  	<div class="pay_mask"></div>
  </div>
  
  <!-- 微信支付弹窗 -->
  <div class="wx_pay_src" v-if="isShowWXPayFrame">
     <div class="wx_pay_src_mask"></div>
      <div class="wx_pay_src_content">
          <div class="wx_pay_src_content_container">
              <h2>请扫码支付</h2>
              <div class="photo">
                  <img :src="wx_pay_src"  alt="微信支付">
              </div>
              <span @click="hideWXPayFrame">ｘ</span>
          </div>
      </div>
      
  </div>

  <!-- 订单超时弹窗 -->
  <pay-count-down-box></pay-count-down-box>

  <!-- 白条（月结）/ 余额支付loading -->
  <div class="pay_loading" v-if="isShowPayLoading">
    <img src="../assets/hourglass.svg">
    请稍后，正在支付
  </div>

</template>
<script>
import { QCHead, QCFooter, showTips, PayCountDownBox } from '../components'
import { payMethodsList, pay, aliPay, checkOrderStatus } from '../vuex/actions'
import { getPayMethodsList } from '../vuex/getters'
import util from '../utils/util'
import configUrl from '../data/configUrl'
import $ from 'jquery'

export default {
	vuex: {
		actions: {
			payMethodsList,
			pay,
			aliPay,
			checkOrderStatus
		},
		getters: {
			getPayMethodsList
		}
	},
	components: {
		QCHead,
		QCFooter,
        showTips,
        PayCountDownBox
	},
	data: function() {
		return {
      imgPrifx: '', // 图片前缀
      tabIndex: -3,					//	选择支付方式标记  白条 -- -1 余额 -- -2  
      isManager: false,
      orderNo: '',					//	订单编号
      orderPrice: '',				//	订单价格
      payMethodsListUrl: configUrl.payMethodsList.dataUrl,  //	支付方式请求接口路劲
      paymentTypeEnum: 'BAL_PAY',			//	支付类型
      orderType: 'TICKET_ORDER',	//	订单类型
      payUrl: '',   /// 	支付URL
      monthPayPassWordIsErr: false,    //	月结密码是否正确
      passWord: '',     //	月结密码
      passWordEmpty: false,  //	月结密码是否为空
      hasPassWord: '',				//	是否拥有支付密码
      payHrefHtml: '',								//	支付宝跳转页面内容
      isShowPayBox: false,    					//	支付弹窗
      orderTypeNum: '', 								//  订单类型 酒店--0   机票--1  月结还款--2
      checkOrderStatusUrl: configUrl.payOrderDetail.dataUrl,						//	支付已完成查询订单状态
      isCanPay: true,                         //   防止重复提交付款
      submitData: {},                          //  提交对象
      wx_pay_src: '',                          //  微信支付二进制流
      isShowWXPayFrame: false,                  // 显示微信二维码弹窗
      isShowPayLoading: false                   //  白条（月结）/余额支付loading
    }	
  },
    created () {
      document.body.scrollTop = 0
    	this.orderNo = this.$route.query.orderNo
    	this.orderPrice = this.$route.query.orderPrice
    	this.orderTypeNum = Number(this.$route.query.orderTypeNum)

        this.imgPrifx = configUrl.staticPath

    	//	支付方式
    	this.initPayMethodsList()

    },
    methods: {
    	//	支付方式
    	initPayMethodsList: function () {
    		let self = this
            this.orderType = (this.orderTypeNum === 0) ? 'HOTEL_ORDER' : 
                            (this.orderTypeNum === 1) ? 'TICKET_ORDER' :
                            (this.orderTypeNum === 2) ? 'BAL_ORDER' : ''
    		let opt = {
    			type: 'POST',
    			data: {
                    orderType: this.orderType
                },
    			url: this.payMethodsListUrl,
    			success: function (resp) {
    				console.log(resp)
    			},
    			fail: function (resp) {
    				console.log(resp)
    				showTips('查询失败，请稍后再试！', 2500)
    			}
    		}

    		this.payMethodsList(opt)
    	},
    	//	选择支付方式
    	selectPayMethods: function (type, index) {
    		if (this.tabIndex === index) {
    			return
    		}
    		this.tabIndex = index

    		//	白条
    		if (type === 'BAL_PAY') {
    			this.payUrl = configUrl.monthPay.dataUrl
                this.passWord = ''

    		} 
    		//	微信
    		else if (type === 'WX_PAY') {
    			this.payUrl = configUrl.wxPay.dataUrl
    			this.passWordEmpty = false
    		}
        //余额支付
        else if (type === 'MALL_BAL_PAY') {
            console.log('余额')
            this.payUrl = configUrl.mallBalPay.dataUrl
            this.passWord = ''
        }
    		//	支付宝
    		else {
    			this.payUrl = configUrl.aliPay.dataUrl
    			this.passWordEmpty = false
    		}

    		this.paymentTypeEnum = type
    	},
    	//	支付
    	payMoney: function () {
    		//	如果是月结 月结密码为空
        if (!this.isCanPay) {
            return
        }
        var winOpen = window.open()

        //  白条支付
    		if (this.paymentTypeEnum === 'BAL_PAY') {
          //  未设置白条密码
          if (!this.getPayMethodsList.monthPay.hasPass) {
              //this.hasPassWord = true
              showTips('未设置白条密码', 2500)
              winOpen.location.href = 'http://travel.17cai.com/security/index.jsp?#/passwordPay'
              return
          }

          winOpen.close()

    			//	密码为空
    			if (!this.passWord) {
    				this.passWordEmpty = true
    				return
    			}

          //显示loading
          this.isShowPayLoading = true
    		}

        //  余额支付
        if (this.paymentTypeEnum === 'MALL_BAL_PAY') {
            //  未设置余额密码
            if (!this.getPayMethodsList.mallBalPay.hasPass) {
                //this.hasPassWord = true
                showTips('未设置余额密码', 2500)
                winOpen.location = 'http://www.17cai.com/control/createPayPassword'
                return
            }

            winOpen.close()

            //  密码为空
            if (!this.passWord) {
                this.passWordEmpty = true
                return
            }

            //显示loading
            this.isShowPayLoading = true
        }

        // 微信支付 关闭新打开窗口
        if (this.paymentTypeEnum === 'WX_PAY') {
            winOpen.close()
        }

        //  支付宝支付
        if (this.paymentTypeEnum === 'ALI_PAY') {
          let params = [
            'payHref',
            '?paymentTypeEnum=ALI_PAY',
            '&orderNo=' + this.orderNo,
            '&orderType=' + this.orderType
          ].join('')

          winOpen.location = configUrl.aliPayHref.dataUrl + params
          this.isShowPayBox = true
          return
        }

    		let self = this
    		let opt = {
    			type: 'POST',
    			data: {
    				paymentTypeEnum: this.paymentTypeEnum,
    				orderNo: this.orderNo,
    				orderType: this.orderType,
    				password: this.passWord
    			},
    			url: this.payUrl,
    			success: function (resp) {
            self.isCanPay = false
            self.isShowPayLoading = false
    				//  白条或余额支付成功
  					self.$router.go({
  						name: 'paySuccess',
  						query: {
  							payMoney: self.orderPrice,
  							orderTypeNum: self.orderTypeNum
  						}
  					})
    			},
    			fail: function (resp) {
            self.isCanPay = true

    				//	微信支付
    				if (self.paymentTypeEnum === 'WX_PAY') {
              //console.log(resp.responseText)
              self.wx_pay_src = self.payUrl + '?' + Math.random() + '&orderType=' + self.orderType + '&orderNo=' + self.orderNo
              self.isShowWXPayFrame = true
            }
    				//	白条（月结）或余额
    				else {
              self.isShowPayLoading = false
    					showTips(resp.msg, 2500)
    				}
    			}
    		}
    		this.pay(opt)
    	},
    	//	支付密码失去焦点
    	passworBlur: function (e) {
    		console.log(e)
    		if (e.target.value) {
    			this.passWordEmpty = false
    		}
    	},
    	//	设置支付密码
    	setPassWword: function (e) {
        let winOpen = window.open()
    		//    如果是白条支付
        if (this.paymentTypeEnum === 'BAL_PAY') {
            winOpen.location = 'http://travel.17cai.com/security/index.jsp?#/passwordPay'
        }
        //  余额支付
        else if (this.paymentTypeEnum === 'MALL_BAL_PAY') {
            winOpen.location = 'http://www.17cai.com/control/createPayPassword'
        }          
    			
    		
    	},
    	//	重置密码
    	resetPassWord: function () {
        let winOpen = window.open()
        //    如果是白条支付
        if (this.paymentTypeEnum === 'BAL_PAY') {
            winOpen.location = 'http://travel.17cai.com/security/index.jsp?#/passwordPay'
        }
        //  余额支付
        else if (this.paymentTypeEnum === 'MALL_BAL_PAY') {
            winOpen.location = 'http://www.17cai.com/control/creditForgetPassword'
        } 
    		
    	},
    	//	hidePayBox
    	hidePayBox: function () {
    		this.isShowPayBox = false
    	},
    	//	支付宝弹窗已完成支付
    	payComplete: function () {
    		//	查询订单状态
    			let self = this
    			let opt = {
    			  type: 'POST',
    			  data: {
    			  	orderNo: this.orderNo,
    			  	orderType: this.orderTypeNum
    			  },
    			  url: this.checkOrderStatusUrl,
    			  success: function (resp) {
    			    console.log(resp)
    			    self.isShowPayBox = false
    			    // orderStatus !== 0 支付成功
    			    if (resp.data.orderStatus !== 0) {
    			      
    			      self.$router.go({
    			         name: 'paySuccess',
    			         query: {
    			           orderNo: resp.data.orderNo,
    			           payMoney: resp.data.orderPrice,
    			           orderTypeNum: self.orderTypeNum
    			         }
    			       })
    			    }
    			    //	支付失败，重新支付
    			    else {
    			    	alert('支付失败,请重新支付')
    			    }
    			  },
    			  fail: function (resp) {
    			    console.log('请求失败')
    			  }
    			}

    			this.checkOrderStatus(opt)
    	},
      //  微信支付关闭二维码
      hideWXPayFrame: function () {
          this.isShowWXPayFrame = false
      },

    },
    events: {
      //  查看订单详情
      'view-order-detail': function () {
        //  酒店
        if (this.orderTypeNum === 0) {
          this.$router.go({
            name: 'hotelOrderDetail',
            query: {
              orderNo: this.orderNo
            },
            replace: true 
          })
        }
        else {
          this.$router.go({
            name: 'airOrderDetail',
            query: {
              orderId: this.orderNo
            },
            replace: true
          })
        }
      }
    }
}
</script>
<style>
@import url('../css/common.css');

    i{
        font-style: normal;
    }
    b{
        font-weight: normal;
    }
    h1,h2,h3,h4,h5,h6{
        margin:0;
        padding:0;
    }
    .content{
        width: 100%;
        background: #f8f8f8;
        min-height: 620px;
    }
    .content .page1200{
        height: 100%;
        padding-top: 10px;
        padding-bottom: 75px;
    }
    .content .page1200 .prompt{
        height: 140px;
        background: #eaeaea;
        margin-bottom: 10px;
    }
    .content .page1200 .prompt .notice{
        padding:40px 20px 40px 90px;
       /*  background: url(../assets/ok.png) no-repeat 40px center; */
        position: relative;
    }
    .content .page1200 .prompt p.notice1{
       font-size: 16px;
       line-height: 28px;
       color:#333333;
       background: none!important;
    }
    .content .page1200 .prompt p.notice1 img{
        display: inline-block;
    }
    .content .page1200 .prompt p.notice2{
       font-size: 14px;
       line-height: 24px;
       color:#333333;
    }
    .content .page1200 .prompt p.notice3{
       font-size: 14px;
       line-height: 24px;
       color:#333333;
       position: absolute;
       right:20px;
       top:40%;
    }
    .content .page1200 .prompt p.notice3 i{
        font-size: 16px;
        line-height: 24px;
        color:#ed342f;
        font-weight: bold;
    }
    .content .page1200 .mode-box{
        height: 640px;
        background: #fff;
        border:1px solid #eeeeee;
        padding:0 20px;
    }
    .content .page1200 .mode-box .mode-title{
        font-size: 16px;
        line-height: 45px;
        color:#353535;
        font-weight: bold;
    }
    .content .page1200 .mode-box .mode{
        padding: 40px;
        border-bottom: 1px solid #dddddd;
    }
    /*月结支付暂停*/
    .content .page1200 .mode-box .sorry{
        padding: 10px 0 0 40px;
        height: 28px;
    }
    .content .page1200 .mode-box .sorry span{
        display: inline-block;
        width: 100px;
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #989898;
        color:#989898;
        margin-right: 10px;
        cursor: pointer;
    }
    .content .page1200 .mode-box .sorry i{
        font-size: 14px;
        line-height: 28px; 
        color:#ee4c41;
    }
    /*月结支付*/
    .content .page1200 .mode-box .monthly-pay{
        padding: 10px 0 0 40px;
        height: 28px;
    }
    .content .page1200 .mode-box .monthly-pay i{
        font-size: 14px;
        line-height: 28px; 
    }

    .content .page1200 .mode-box span.mode-btn{
        display: block;
        width: 100px;
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #696969;
        color:#696969;
        margin-right: 25px;
        cursor: pointer;
    }
    .content .page1200 .mode-box span.mode-btn.on{
        border:0;
        line-height: 29px;
        background: url(../assets/selected.png);
    }
    .content .page1200 .mode-box .toPay{
        padding:40px 0 0 40px;
    }
    .content .page1200 .mode-box .toPay p.text{
        font-size: 14px;
        line-height: 24px;
        color:#666666;
    }
    .content .page1200 .mode-box .toPay p.monthly-password{
        height: 34px;
        padding-top:10px;
    }
    .content .page1200 .mode-box .toPay p.monthly-password input{
        width: 254px;
        height: 34px;
        box-sizing: border-box;
        padding:0 10px 0;
        border:1px solid #dddddd;
        margin-right: 10px;
    }
    .content .page1200 .mode-box .toPay p.monthly-password i{
        color:#009ce3;
        cursor: pointer;
    }
    .content .page1200 .mode-box .toPay p.warning{
        color:#fc3c3b;
    }
    .topay_btn{
        display: block;
        width: 142px;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
        color:#fff;
        /* background: #fc7345; */
        background: #e34449;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 20px;
    }
    .topay_btn.noclick, .topay_btn.noclick:hover{
        background: #ccc;
    }
    .topay_btn:hover{
        background: #b41521;
    }
    .topay_btn{
    	margin-left: 40px;
    }
    .content .page1200 .mode-box .toPay span:hover{
        background: #e8511e;
    }

    /*密码输入超过三次后：遮罩及弹出框*/
    .content .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        background: #000;
        opacity: 0.3;
        z-index: 80;
    }
    .content .popup{
        width: 325px;
        height: 215px;
        background: #fff;
        position: fixed;
        left:50%;
        margin-left: -160px;
        top:50%;
        margin-top: -105px;
        z-index: 999;
        border-radius: 5px;
    }
    .content .popup .popup-text{
        height: 154px;
        border-bottom: 1px solid #eeeeee;
    }
    .content .popup .popup-text p{
        font-size: 16px;
        line-height: 24px;
        color:#656565;
        padding:0 20px;
    }
    .content .popup .popup-text p.text-title{
        padding:45px 20px 10px;
    }
    .content .popup .popup-mode{
        height: 60px;
    }
    .content .popup .popup-mode span{
        display: block;
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        cursor: pointer;
    }
    .content .popup .popup-mode span.back{
        box-sizing: border-box;
        border-right: 1px solid #eeeeee;
    }
    .content .popup .popup-mode span:hover{
        color:#32a9fb;
    }
    /*支付完成后弹框*/
    .content .popup2{
        width: 445px;
        height: 265px;
        background: #fff;
        position: fixed;
        left:50%;
        margin-left: -220px;
        top:50%;
        margin-top: -130px;
        z-index: 999;
    }
    .content .popup2 h3.popup2-title{
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        color:#fff;
        font-weight: bold;
        padding:0 15px;
        background: #053d5e;
        position: relative;
    }
    .content .popup2 h3.popup2-title span{
        display: block;
        font-size: 20px;
        text-align: right;
        position: absolute;
        right:15px;
        top:0;
        cursor: pointer;
    }
    .content .popup2 h3.popup2-title span:hover{
        color:#f00;
    }
    .content .popup2 .popup2-content{
        width: 415px;
        height: 125px;
        margin:0 auto;
        border-bottom: 1px solid #dddddd;
    }
    .content .popup2 .popup2-content p.notice{
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        padding:30px 0 25px;
    }
    .content .popup2 .popup2-content p.popup2-btn{
        position: relative;
    }
    .content .popup2 .popup2-content p.popup2-btn span{
        display: block;
        width: 126px;
        height: 30px;
        border:1px solid #dddddd;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        border-radius: 3px;
        background: #f4f5f9;
        cursor: pointer;
        position: absolute;
    }
    .content .popup2 .popup2-content p.popup2-btn span:hover{
        background: #cacbcf;
    }
    .content .popup2 .popup2-content p.popup2-btn span.popup2-btn1{
        top:0;
        left:65px;
    }
    .content .popup2 .popup2-content p.popup2-btn span.popup2-btn2{
        top:0;
        left:220px;
    }
    .content .popup2 p.other{
        color:#04a1e4;
        line-height: 20px;
        padding:30px 0 0 30px;
        cursor: pointer;
    }
    /*#notice1{
    	background: url() no-repeat 236px center;
    }*/

.pay_frame{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	top: 0;
	left: 0;
	z-index: 100;
}
.pay_mask{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: black;
	opacity: 0.5;
}
/* --- 微信支付  --- */
.wx_pay_src{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.wx_pay_src_mask{
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
}
.wx_pay_src_content{
    width: 400px;
    height: 400px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -200px;
}
.wx_pay_src_content_container{
    position: relative;
    height: 350px;
    width: 100%;
    padding-top: 80px;
}
.wx_pay_src_content_container h2{
    color: #333;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
}
.wx_pay_src img{
    width: 200px;
    height: 200px;
    margin: 0 auto;
}
.wx_pay_src span{
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    width: 40px;
    height: 40px;
    line-height: 37px;
    text-align: center;
    color: #fff;
    background: black;
    font-size: 22px;
    border-radius: 100%;
    cursor: pointer;
}
.wx_pay_src span:hover{
    background: red;
}
.pay_head_container{
    padding: 45px 30px 45px 85px;
    background: #eaeaea;
    margin: 12px 0 15px 0;
    position: relative;
}
.pay_head_left{
    position: relative;
}
.pay_head_left img{
    width: 34px;
    height: 34px;
    position: absolute;
    left: -44px;
    top: 50%;
    margin-top: -17px;
}
.pay_head_left p:first-of-type i{
    font-weight: bold;
}
.pay_head_left p:first-of-type{
    margin-bottom: 12px;
}
.pay_head_right{
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 50%;
    right: 30px;
    margin-top: -25px;
    font-size: 16px;
}
.content .page1200 .mode-box .money_not_eoungh span.mode-btn{
    border: 1px solid #ccc;
    cursor: default;
}
.content .page1200 .mode-box .money_not_eoungh span.mode-btn, .content .page1200 .mode-box .monthly-pay .money_not_eoungh i{
    color: #ccc;
    cursor: default;
}

/* --- 白条/余额支付loading --- */
.pay_loading{
  width: 280px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
  z-index: 100;
  background: #fff;
}
.pay_loading img{
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: -10px;
  margin-right: 8px;
}
</style>
