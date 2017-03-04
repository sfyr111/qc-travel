<template>
    <q-c-head></q-c-head>
    <div class="content">
        <div class="page1200">
           <div class="prompt">
               <p class="notice1">您尚未还款成功！</p>
               <p class="notice2">如果您已还款，请<i>刷新</i>本页面或前往<i>月结管理</i>查看还款情况~</p>
               <p class="notice3">还款金额：<i>￥12222.00</i></p>
               <span>点击还款</span>
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
    .content .page1200 .prompt{
        height: 240px;
        background: #fff;
        border:1px solid #eeeeee;
        position: relative;
    }
    .content .page1200 .prompt p.notice1{
        width: 1090px;
        margin:0 auto;
        text-align: center;
        font-size: 20px;
        line-height: 34px;
        color:#323232;
        margin-top: 40px;
        background: url(../assets/error.png) no-repeat 425px center;
    }
    .content .page1200 .prompt p.notice2{
        width: 1090px;
        margin:0 auto;
        text-align: center;
        font-size: 14px;
        line-height: 45px;
        color:#676767;
    }
    .content .page1200 .prompt p.notice2 i{
        color:#029fec;
        cursor: pointer;
    }
    .content .page1200 .prompt p.notice3{
        width: 1090px;
        margin:0 auto;
        text-align: right;
        font-size: 14px;
        line-height: 32px;
        color:#676767;
        border-bottom: 1px solid #e8f1f8;
    }
    .content .page1200 .prompt p.notice3 i{
        font-size: 18px;
        line-height: 32px;
        color:#fc3b3c;
        font-weight: bold;
    }
    .content .page1200 .prompt span{
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
        margin:0 auto;
        margin-top: 20px;
    }
    .content .page1200 .prompt span:hover{
        background: #e8511e;
    }
</style>