<template>
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
	<div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="monthInf_detail fr">
                <div class="fr-title">账单管理><span>账单详情</span></div>
                <div class="monthly-list">
                    <ul>
                        <li class="clearfix list-title">
                            <p>月结单号</p>
                            <p>订单号</p>
                            <p>下单账号</p>
                            <p>订单业务</p>
                            <p>订单付款日期</p>
                            <p>订单状态</p>
                            <p class="last">订单金额（退订费用）</p>
                        </li>   
                    </ul>                     
                    <div v-if="getMonthInf.items" class="inf_table">
                        <no-data v-if="!getMonthInf.items.length"></no-data>
                        <table>
                            <tbody>
                                <tr v-for="item in getMonthInf.items">
                                    <td>{{item.monthPayNo || "&nbsp;"}}</td>
                                    <td>{{item.orderNO || "&nbsp;"}}</td>
                                    <td>{{item.userLoginId || "&nbsp;"}}</td>
                                    <td>{{item.orderType == 0 ? "酒店订单" : "机票订单"}}</td>
                                    <td>{{item.orderTime || "&nbsp;"}}</td>
                                    <td>{{item.statusDesc || "&nbsp;"}}</td>
                                    <td>{{item.totalFee || "&nbsp;"}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                           
                    <div class="total">
                        <div class="total-detail">
                            <div class="clearfix all">
                                <label v-if="getMonthInf.returnMoney" class="fl"><input type="checkbox" name="" @change="checkReturn()" :checked="checkedReruen">退款额抵扣（退款金额：￥{{getMonthInf.returnMoney}}）</label>
                                <span class="fr">账单总额：<i>￥{{getMonthInf.monetary || 0}}</i></span>
                            </div>
                            <!-- <p class="clearfix">
                                <span>可用退款额抵扣：<i>￥{{getMonthInf.availableReturnMoney || 0}}</i></span>
                            </p> -->
                            <p class="clearfix">
                                <span>逾期费用：<i>￥{{getMonthInf.timeOverMoney || 0}}</i></span>
                            </p>
                            <p class="clearfix repayment">
                                <span v-if="status == '01' || status == '11'">实际已还款：<i v-cloak>￥{{monetary || 0}}</i></span>
                                <span v-if="status == '00' || status == '10'">实际应还款：<i v-cloak>￥{{monetary || 0}}</i></span>
                            </p>
                        </div>
                        <div class="repayment-box">
                            <span class="repayment-btn btnHasUsed" v-if="btnHasUsed">正在努力加载...</span>
                            <span v-if="status == '10' || status == '00'" class="repayment-btn" @click.stop="goPay()" v-if="!btnHasUsed">去还款</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</div>
	<q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, showTips } from '../../components'
import NoData from '../../components/NoData'
import { monthInf, monthPay } from '../../vuex/actions'
import { getMonthInf } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
import dateFormat from '../../filter/dateFormat'

export default {
    vuex: {
        actions: {
            monthInf,
            monthPay
        },
        getters: {            
            getMonthInf   
        }
    },
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        showTips,
        NoData
    },
    created: function () {
        var monthPayNo = this.$route.query.monthPayNo
        this.status = this.$route.query.status
        // 获取列表信息
        var self = this
        let monthOpt = {
            type: 'post',
            data: {
                monthPayNo: monthPayNo
            },
            url: configUrl.monthInf.dataUrl,
            success: function (resp) {
                
            },
            fail: function (resp) {
                showTips(resp.msg, 2500)
                console.log('获取详情失败')
            }
        }
        self.monthInf(monthOpt)        
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 2,
            btnHasUsed: false, // 节流
            checkedReruen: false,
            status: null            
        }
    },
    computed: {
        monetary: function () {
            if (this.checkedReruen) {
                return this.monetary = this.getMonthInf.monetary + this.getMonthInf.timeOverMoney - this.getMonthInf.availableReturnMoney
            }
            if (!this.checkedReruen) {
                return this.monetary = this.getMonthInf.monetary + this.getMonthInf.timeOverMoney
            }
        }
    },
    methods: {
        checkReturn: function () {
            this.checkedReruen=!this.checkedReruen            
        },
        goPay: function () {
            var monthPayNo = this.$route.query.monthPayNo
            // 获取列表信息
            var self = this
            if (this.btnHasUsed) {
                console.log("sss")
                return
            }
            let monthOpt = {
                type: 'post',
                data: {
                    monthPayNo: monthPayNo,
                    isUseReturnMoney: this.checkedReruen
                },
                url: configUrl.checkMonthPay.dataUrl,
                success: function (resp) {
                    if (resp.data.isNeedToPay) {
                        self.btnHasUsed = false
                        self.$router.go({
                            name: 'pay',
                            query: {
                                orderNo: monthPayNo,
                                orderPrice: resp.data.needPayMoney,
                                orderTypeNum: 2
                            }
                        })
                    }
                    if (!resp.data.isNeedToPay) {
                        self.btnHasUsed = false
                        self.$router.go({
                            name: 'monthRerurnSuc',
                            query: {
                                monetary: resp.data.needPayMoney
                            }                            
                        })
                    }
                },
                fail: function (resp) {
                    self.btnHasUsed = false
                    showTips(resp.msg, 2500)
                    console.log('获取详情失败')
                }
            }
            self.monthPay(monthOpt)             
        }
    }
}
</script>
<style scoped>
@import url('../../css/common.css');
@import url('../../css/monthInf.css');
</style>