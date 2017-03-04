<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200">
           <div class="prompt">
               <p class="notice1">您已还款成功！</p>
               <p class="notice2">还款金额：<i>￥{{monetary}}</i></p>
               <span class="toMonthly" v-link="{name: 'monthList'}">查看账单管理</span>
               <span class="toMain" v-link="{name: 'main'}">返回首页</span>
           </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter } from '../../components'
export default {   
    components: {
        QCHead,
        QCFooter        
    },
    created: function () {
        this.monetary = this.$route.query.monetary
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            monetary: ''
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
        margin-top: 70px;
        background: url(../../assets/ok.png) no-repeat 435px center;
    }
    .content .page1200 .prompt p.notice2{
        width: 1090px;
        margin:0 auto;
        text-align: right;
        font-size: 14px;
        line-height: 32px;
        color:#676767;
        border-bottom: 1px solid #e8f1f8;
        padding: 15px 0 0 0!important;
    }
    .content .page1200 .prompt p.notice2 i{
        font-size: 18px;
        line-height: 32px;
        color:#fc3b3c;
        font-weight: bold;
    }
    .content .page1200 .prompt span{
        display: block;
        width: 140px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        color:#34a9f6;
        background: #fff;
        border:1px solid #34a9f6;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
    }
    .content .page1200 .prompt span.toMonthly{
        bottom:30px;
        left:440px;
    }
     .content .page1200 .prompt span.toMain{
        bottom:30px;
        left:600px;
    }
    .content .page1200 .prompt span:hover{
        background: #34a9f6;
        color:#fff;
    }
</style>