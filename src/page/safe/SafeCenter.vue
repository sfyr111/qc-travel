<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="safe_detail fr">
               <h3 class="set">安全设置</h3>
               <ul>
                   <li class="item1">
                       <h3>登录密码</h3>
                       <p>为保证您购物安全，建议您定期更改密码以保护账户安全</p>
                       <span @click="goPasswordLogin()">修改</span>
                   </li>
                   <li class="item2">
                       <h3>支付密码</h3>
                       <p>启用支付密码功能，为您资产账户安全加把锁</p>
                       <span @click="goPasswordPayEdit()" v-if="is_open_month_pay && !must_set_month_pay_pwd">修改</span>
                       <span @click="goPasswordPay()" v-if="!is_open_month_pay || (is_open_month_pay && must_set_month_pay_pwd)">去设置</span>
                   </li>
                   <li class="item3">
                       <h3>邮寄地址</h3>
                       <p>行程单，发票邮寄地址</p>
                       <span @click="goAddress()">编辑</span>
                   </li>
               </ul>
               
            </div>
        </div>
    </div>
    <alert-confirm :show-confirm.sync="showConfirm" :content-confirm="contentConfirm"></alert-confirm>
    <q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, AlertConfirm } from '../../components'
export default {
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        AlertConfirm
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 3,
            showConfirm: false,
            contentConfirm: "",
            must_set_month_pay_pwd: false,
            is_open_month_pay: false
        }
    },
    created: function () {     
        this.must_set_month_pay_pwd =  window.user ? window.user.must_set_month_pay_pwd : false // 从session中获取用户id
        this.is_open_month_pay =  window.user ? window.user.is_open_month_pay : false
    },
    methods: {
    	goAddress: function() {
    		this.$router.go({
				name: 'address',
				query: {
					
				}
			})
    	},
    	goPasswordPay: function () {
            // 已开通未设置
            if (this.is_open_month_pay && this.must_set_month_pay_pwd) {
                this.$router.go({
                    name: 'passwordPay',
                    query: {
                        
                    }
                })
            } else { // 未设置
                this.showConfirm=true
                this.contentConfirm="您还没有开通商旅白条，不能设置支付密码，请先申请开通商旅白条"
            }            
    	},
    	goPasswordPayEdit: function () {
    		if (!this.must_set_month_pay_pwd && this.is_open_month_pay) {
    			this.$router.go({
					name: 'passwordPayEdit',
					query: {
						
					}
				})
    		}
    	},
        goPasswordLogin: function () {
            // this.$router.go({
            //     name: 'passwordLogin',
            //     query: {
                    
            //     }
            // })
            window.open('http://www.17cai.com/control/changepassword')
        }
    },
    events: {
        'confirm-ok': function () {
            this.$router.go({
                name: 'monthApply',
                query: {
                    
                }
            })
        }
    }
}
</script>
<style scoped>
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
        padding-top: 10px;
    }
    .content .page1200 .title{
        width: 150px;
        background: #f0f0f0;
    }
    .content .page1200 .title ul{
        padding:0 10px;
    }
    .content .page1200 .title ul li{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color:#333333;
        border-bottom: 1px solid #dcdcdc;
        padding-left: 18px;
        cursor: pointer;
    }
     .content .page1200 .title ul li span{
        color:#999999;
    }
    .content .page1200 .title ul li.active{
        color:#dd1827;
        background: #fff;
        border-left: 1px solid #dcdcdc;
        border-right: 1px solid #dcdcdc;
        width: 121px;
        margin-left: -9px;
        padding-left: 26px;
    }
    .content .page1200 .title ul li.active span{
        color:#dd1827;
    }
    .content .page1200 .safe_detail{
        width: 1030px;
    }
    .content .page1200 .safe_detail h3.set{
        height: 40px;
        padding-left: 15px;
        font-size: 14px;
        line-height: 40px;
        color:#333333;
        background: #fff;
        margin-bottom: 10px;
    }
    .content .page1200 .safe_detail ul{
        height: 420px;
        background:#fff;
        padding:0 10px 0 40px;
    }
    .content .page1200 .safe_detail ul li{
        height: 100px;
        border-bottom: 1px dashed #dcdcdc;
        box-sizing: border-box;
        padding-top: 30px;
        padding-left:45px;
        position: relative;
    }
    .content .page1200 .safe_detail ul li.item1{
        background:url(../../assets/login.png) no-repeat left center;
    }
    .content .page1200 .safe_detail ul li.item2{
        background:url(../../assets/pay.png) no-repeat left center;
    }
    .content .page1200 .safe_detail ul li.item3{
        background:url(../../assets/address.png) no-repeat left center;
    }
    .content .page1200 .safe_detail ul li h3{
        font-size: 16px;
        line-height: 28px;
        color:#333;
    }
    .content .page1200 .safe_detail ul li p{
        font-size: 12px;
        color:#9c9c9c;
    }
    .content .page1200 .safe_detail ul li span{
        display: inline-block;
        width: 70px;
        height: 28px;
        background: #e34449;
        color:#fff;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        border-radius: 3px;
        position: absolute;
        right:40px;
        top:50%;
        margin-top: -14px;
        cursor: pointer;
    }
    .content .page1200 .safe_detail ul li span:hover{
        background: #b41521;
    }
</style>