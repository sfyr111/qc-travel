<template>
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
	<div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="month_detail fr">
                <!-- 未开通 -->
                <div class="fr-title">
                    <p class="available clearfix">
                        <span>可用额度：<i>{{getMonthMain.amountAvaiable}}</i>元</span>
                        <!-- <b>白条使用规则及还款></b> -->
                    </p>
                    <p class="available-detail clearfix">
                        <span>商旅白条额度：<i>{{getMonthMain.openedMoney}}</i>元</span>
                        <span>累计使用：<i>{{getMonthMain.totalMoney}}</i>元</span>
                        <span>退款额：<i>{{getMonthMain.returnMoney}}</i>元</span>
                        <b @click.stop="goMonthApply()" v-if="getMonthOrder.auditStatus == -1 || getMonthOrder.auditStatus == 0">申请商旅白条</b>
                        <b class="hasApply" v-if="getMonthOrder.auditStatus == 2">待审批</b>
                    </p>
                </div>
                <div class="bill">
                    <table>
                        <thead>
                            <tr>
                                <td>账单编号</td>
                                <td>账期起止日期</td>
                                <td>退款额（元）</td>
                                <td>账单金额（元）</td>
                                <td>实际还款日</td>
                                <td>最迟还款日</td>
                                <td>状态</td>
                                <td>逾期费用（元）</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody v-if="getMonthOrder.pagination && getMonthOrder.auditStatus == 3 && getMonthOrder.pagination.rows.length>0">
                            <tr v-for="row in getMonthOrder.pagination.rows">
                                <!-- 实际还款日 -->
                                <td>{{row.monthPayNo}}</td>
                                <!-- 账期起止日期 -->
                                <td>{{row.startDate}}-{{row.endDate}}</td>
                                <!-- 退款额（元） -->
                                <td>{{row.returnMoney}}</td>
                                <!-- 账单金额（元） -->
                                <td>{{row.monetary}}</td>
                                <!-- 实际还款日 -->
                                <td>{{row.actualRepayDate}}</td>
                                <!-- 最迟还款日 -->
                                <td>{{row.lastPayTime | dateformat "yyyy-MM-dd"}}</td>
                                <!-- 状态 -->
                                <td>{{row.status == '00' ? "正常未还款" :
                                        row.status == '01' ? "正常已还款" :
                                        row.status == '10' ? "逾期未还款" :
                                        row.status == '11' ? "逾期还款" : "无状态"}}</td>
                                <!-- 逾期费用（元） -->
                                <td>{{row.timeOverMoney}}</td>
                                <td><a href="javascript:void(0);" class="last" @click.stop="goMonthInf(row.monthPayNo, row.status)">查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="bill-text" v-if="getMonthOrder.pagination && getMonthOrder.auditStatus == 3 && !getMonthOrder.pagination.rows.length>0">
                        <p class="notice">恭喜您！已为您成功开通商旅白条，月授信额度为：<span>{{getMonthMain.openedMoney}}</span>元；<a href="javascript:void(0);" v-link="{name: 'main'}">去预定 ></a></p>
                    </div>
                    <div class="bill-text" v-if="getMonthOrder.auditStatus == -1">
                        <p class="notice">抱歉，您尚未开通商旅白条支付！</p>
                    </div>
                    <div class="bill-text" v-if="getMonthOrder.auditStatus == 0">
                        <p class="notice">您的商旅白条申请审核未通过！您可以：<a href="javascript:void(0);" v-link="{ name: 'monthApply' }">重新申请></a></p>
                        <p class="reason">未通过原因：{{getMonthOrder.auditMsg}}！</p>
                    </div>
                    <div class="bill-text" v-if="getMonthOrder.auditStatus == 1">
                        <p class="notice">恭喜您！您申请的商旅白条支付审核通过，月授信额度为：<span>{{getMonthMain.openedMoney}}</span>元。</p>
                        <p>我们会给您邮寄商旅白条协议和合同，合同签署成功后，您即可使用商旅白条支付！</p>
                    </div>
                    <div class="bill-text" v-if="getMonthOrder.auditStatus == 2">
                        <p class="notice">您的商旅白条申请正在审核中，请耐心等待！</p>
                    </div>
                </div>
            </div>            
        </div>		
	</div>
	<q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider } from '../../components'
import { monthOrder, monthMain, monthInf } from '../../vuex/actions'
import { getMonthOrder, getMonthMain } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
import dateFormat from '../../filter/dateFormat'

export default {
    vuex: {
        actions: {
            monthOrder,
            monthMain,
            monthInf
        },
        getters: {            
            getMonthOrder,
            getMonthMain     
        }
    },
    components: {
        QCHead,
        QCFooter,
        ManagerSider
    },
    created: function () {
        // 获取列表信息
        let monthOpt = {
            type: 'post',
            data: {},
            url: configUrl.monthOrder.dataUrl,
            success: function (resp) {
                console.log("resp")
            },
            fail: function (resp) {
                console.log('失败')
                console.log(resp)
            }
        }
        this.monthOrder(monthOpt)  
        let mainOpt = {
            type: 'get',
            data: {},
            url: configUrl.monthMain.dataUrl,
            success: function (resp) {
                
            },
            fail: function (resp) {
                console.log('失败')
                console.log(resp)
            }
        }
        this.monthMain(mainOpt)
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 2
        }
    },
    methods: {
        goMonthApply: function () {            
            this.$router.go({
                name: 'monthApply'
            })
        },
        goMonthInf: function (monthNo, status) {
            var self = this
            let monthOpt = {
                type: 'post',
                data: {
                    monthPayNo: monthNo
                },
                url: configUrl.monthInf.dataUrl,
                success: function (resp) {
                    self.$router.go({
                        name: 'monthInf',
                        query: {
                            monthPayNo: monthNo,
                            status: status
                        }
                    })
                },
                fail: function (resp) {
                    console.log('获取详情失败')
                }
            }
            self.monthInf(monthOpt)            
        }
    }
}
</script>
<style scoped>
@import url('../../css/common.css');
@import url('../../css/monthManage.css');
</style>