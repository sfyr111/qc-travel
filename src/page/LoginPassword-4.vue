<template>
    <q-c-head></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <div class="title fl">
                <ul>
                    <li>订单中心&nbsp;&nbsp;<span>></span></li>
                    <li>月结管理&nbsp;&nbsp;<span>></span></li>
                    <li>安全中心&nbsp;&nbsp;<span>></span></li>
                </ul>
            </div>
            <div class="detail fr">
                <div class="fr-title">修改登录密码</div>
                <form>
                    <div class="choice clearfix">
                    <div class="fl">
                       <input type="radio" name="Sex" value="手机验证">&nbsp;手机验证
                    </div>
                    <div class="fl on">
                       <input type="radio" checked="checked" name="Sex" value="原来支付密码验证">&nbsp;原来登录密码验证
                    </div>
                    </div>
                    <div class="speed">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置登录密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="message">
                            <p class="payPassword">
                               <i>原登录密码：</i>
                               <input type="password" name="" placeholder="请输入原登录密码">
                           </p>  
                           <p>
                               <i>验证码：</i>
                               <input type="text" name="" placeholder="请输入验证码">
                               <b>12542</b>
                               <i class="fa fa-refresh"></i>
                           </p>
                           <input class="submit" type="submit" name="" value="下一步">
                        </div>
                    </div> 
                </form>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
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
        border-bottom: 1px solid #f0f0f0;
        width: 121px;
        margin-left: -8px;
        padding-left: 26px;
        padding-top: 1px;
        margin-top: -1px;
    }
    .content .page1200 .title ul li.active span{
        color:#dd1827;
    }
    .content .page1200 .detail{
        width: 1030px;
    }
    .content .page1200 .detail .fr-title{
        height: 40px;
        padding-left:15px;
        font-size: 14px;
        line-height: 40px;
        color:#333333;
        background: #fff;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .content .page1200 .detail .choice{
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        background:#eeeeee;
        color:#333;
    }
    .content .page1200 .detail .choice div{
        padding-left: 35px;
    }
    .content .page1200 .detail .choice div.on{
        color:#32a9fb;
    }
    .content .page1200 .detail .speed{
        height: 470px;
        background: #fff;
    }
    .content .page1200 .detail .speed .bar{
        width: 714px;
        height: 100px;
        margin:0 auto;
        padding-top: 65px;
        background: url(../assets/speed1.png) no-repeat left 65px;
        position: relative;
    }
    .content .page1200 .detail .speed .bar p{
        position: absolute;
        left:0;
        top:115px;
        font-size: 16px;
        line-height: 20px;
        width: 100%;
    }
    .content .page1200 .detail .speed .bar p span{
        display: inline-block;
        height: 100%;
        width: 120px;
        text-align: center;
        color:#979797;
    }
    .content .page1200 .detail .speed .bar p span.speed1{
        color:#353535;
        margin-left:100px; 
    }
    .content .page1200 .detail .speed .bar p span.speed2{
        margin-left: 75px;
    }
    .content .page1200 .detail .speed .bar p span.speed3{
        margin-left: 75px;
    }
    .content .page1200 .detail .speed .message{
        padding-left: 330px;
        height: 290px;
    }
    .content .page1200 .detail .speed .message p{
        font-size: 14px;
        line-height: 32px;
        margin-bottom: 10px;
        color:#333;
    }
    .content .page1200 .detail .speed .message p i{
        display: inline-block;
        width: 90px;
        text-align: left;
        color:#676767;
    }
    .content .page1200 .detail .speed .message p input{
        height: 32px;
        box-sizing: border-box;
        width: 170px;
        padding:0;
        padding-left: 5px;
        border:1px solid #ccc;
    }
    .content .page1200 .detail .speed .message p.payPassword input{
        width: 250px;
    }
    .content .page1200 .detail .speed .message p i.fa{
        cursor: pointer;
    }
    .content .page1200 .detail .speed .message p i.fa:hover{
        color:#32a9fb;
    }
    .content .page1200 .detail .speed .message p b{
        display: inline-block;
        width: 80px;
        text-align: center;
    }
    .content .page1200 .detail .speed .message input.submit{
        width: 215px;
        height: 36px;
        font-size: 16px;
        line-height: 36px;
        background: #fc7546;
        color:#fff;
        border:0;
        padding:0;
        border-radius: 3px;
        margin-top: 40px;
        margin-left: 60px;
    }
</style>