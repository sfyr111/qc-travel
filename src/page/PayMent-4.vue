<template>
    <q-c-head></q-c-head>
    <div class="content">
        <div class="page1200">
            <div class="prompt">
                <div class="notice">
                    <p class="notice1">订单提交成功，请您尽快付款！订单号：<i>425247480</i></p>
                    <p class="notice2">请您在2个小时内付款，否则订单会自动取消。</p>
                    <p class="notice3">应付金额：<i>￥82200.25</i></p>
                </div>
            </div>
            <div class="mode-box">
                <div class="mode-title">还款方式</div>
                <div class="sorry" style="display: none;">
                    <span>月结</span>
                    <i>抱歉，您的月结支付方式已被系统暂停使用！</i>
                </div>
                <div class="monthly-pay">
                    <span class="mode-btn">月结</span>
                    <i>可用余额：30000元</i>
                </div>
                <div class="mode clearfix">
                    <span class="mode-btn">微信支付</span>
                    <span class="mode-btn">支付宝支付</span>
                    <span class="mode-btn">网银支付</span>
                    <span class="mode-btn">一键支付</span>
                </div>
                <div class="toPay">
                    <p class="text">请输入月结支付密码：</p>
                    <p class="monthly-password"><input type="text" name=""><i>忘记密码？</i></p>
                    <p class="warning">密码错误，24小时内最多可输入三次密码</p>
                    <span>前往支付</span>
                </div>
            </div>
        </div>
        <div class="mask"></div>
        <!-- 密码输入超过三次后弹出框 -->
        <div class="popup" style="display: none;">
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
        <div class="popup2">
            <h3 class="popup2-title">登陆网上银行支付<span><i class="fa fa-close"></i></span></h3>
            <div class="popup2-content">
                <p class="notice">请您在新打开的网上银行页面进行支付，支付完成前请不要关闭窗口</p>
                <p class="popup2-btn">
                    <span class="popup2-btn1">已完成支付</span>
                    <span class="popup2-btn2">支付遇到问题</span>
                </p>
            </div>
            <p class="other">选择其它支付方式？</p>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>

<script type="text/javascript">
    $(function(){
        $(".mode-box span.mode-btn").click(function(){
            $(".mode-box span.mode-btn").removeClass("on");
            $(this).addClass("on");
        });
    })
</script>
    
<style type="text/css">
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
        background: url(../assets/ok.png) no-repeat 40px center;
        position: relative;
    }
    .content .page1200 .prompt p.notice1{
       font-size: 16px;
       line-height: 28px;
       color:#333333;
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
    .content .page1200 .mode-box .toPay span{
        display: block;
        width: 142px;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
        text-align: center;
        color:#fff;
        background: #fc7345;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 20px;
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
</style>