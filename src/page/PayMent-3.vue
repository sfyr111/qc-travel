<template>
    <q-c-head></q-c-head>
    <div class="content">
        <div class="page1200">
            <div class="prompt">
                <p class="notice1">还款申请提交成功，请您尽快付款！</p>
                <p class="notice2">还款金额：<i>￥12222.00</i></p>
            </div>
            <div class="mode-box">
                <div class="mode-title">还款方式</div>
                <div class="mode clearfix">
                    <span class="mode-btn">微信支付</span>
                    <span class="mode-btn">支付宝支付</span>
                    <span class="mode-btn">网银支付</span>
                    <span class="mode-btn">一键支付</span>
                </div>
                <div class="toPay">
                    <span>前往支付</span>
                </div>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>

<script type="text/javascript">
    $(function(){
        $(".mode span").click(function(){
            $(this).addClass("on").siblings().removeClass("on");
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
        height: 160px;
        background: #fff;
        border:1px solid #eeeeee;
        margin-bottom: 10px;
    }
    .content .page1200 .prompt p.notice1{
        width: 1090px;
        margin:0 auto;
        text-align: center;
        font-size: 20px;
        line-height: 34px;
        color:#323232;
        margin-top: 60px;
        background: url(images/ok.png) no-repeat 342px center;
    }
    .content .page1200 .prompt p.notice2{
        width: 1090px;
        margin:0 auto;
        text-align: right;
        font-size: 14px;
        line-height: 65px;
        color:#676767;
    }
    .content .page1200 .prompt p.notice2 i{
        font-size: 18px;
        line-height: 65px;
        color:#fc3b3c;
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
    .content .page1200 .mode-box span.on{
        border:0;
        line-height: 29px;
        background: url(images/selected.png);
    }
    .content .page1200 .mode-box .toPay{
        padding:40px 0 0 40px;
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
    }
    .content .page1200 .mode-box .toPay span:hover{
        background: #e8511e;
    }
</style>