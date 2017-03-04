<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="month_content">
        <div class="page1200">
           <div class="prompt">
               <p class="notice1">您好，企业商旅账户的月结申请已经提交成功！</p>
               <p class="notice2">我们将在5个工作日内邮件通知您审核通过，或您可以在线查看审核结果，若审核通过，我们会与您签订月结协议。</p>
               <span @click.stop="goManage()">返回管理平台首页</span>
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
    data: function() {
        return {
            headName: '管理中心',
            isManager: true
        }
    },
    methods: {
        goManage: function () {
            this.$router.go({
                name: 'orderList'
            })
        }
    }
}
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
    .month_content{
        width: 100%;
        background: #f8f8f8;
        min-height: 620px;
    }
    .month_content .page1200{
        padding-top: 10px;
    }
    .month_content .page1200 .prompt{
        height: 240px;
        background: #fff;
        border:1px solid #eeeeee;
    }
    .month_content .page1200 .prompt p.notice1{
        text-align: center;
        font-size: 20px;
        line-height: 34px;
        color:#323232;
        margin-top: 40px;
        background: url(../../assets/ok.png) no-repeat 345px center;
    }
    .month_content .page1200 .prompt p.notice2{
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color:#676767;
        padding:20px 0 30px;
    }
    .month_content .page1200 .prompt span{
        display: block;
        width: 145px;
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color:#fff;
        background: #34a9f6;
        border-radius: 3px;
        margin:0 auto;
        cursor: pointer;
    }
</style>