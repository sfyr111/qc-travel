<template>
    <div class="flight-information" v-if="ticketListBeans">
        <p class="flight-information-title clearfix">
            <span class="fl">航班信息</span>
            
        </p>
        <table>
            <thead>
                <tr>
                    <td>航程</td>
                    <td>起飞时间/起飞机场</td>
                    <td>抵达时间/抵达机场</td>
                    <td>航班信息</td>
                    <td>机票价格</td>
                    <td>机建/燃油费</td>
                    <td>保险</td>
                    <!-- <td>服务费</td> -->
                    <td>总计</td>
                    <td>乘机人</td>
                    <td>证件号码</td>
                </tr>
            </thead>
            <tbody v-for="ticket in ticketListBeans">
                <tr>
                    <td>
                        <div>{{ticket.depCityName}}——{{ticket.arrCityName}}</div>
                        <div><a href="javascript:void(0);" @mouseover="showTip(ticket.ticketTurn, ticket.ticketChange, ticket.ticketBack)" @mouseout="closeTip()">退改签</a></div>
                    </td>
                    <td>
                        <div>{{ticket.depdate}}&nbsp;{{ticket.deptime.substring(0,2)+':'+ticket.deptime.substring(2,4)}}</div>
                        <div>{{ticket.depairdrome}}{{ticket.depTerminal}}</div>
                    </td>
                    <td>
                        <div>{{ticket.arrdate}}&nbsp;{{ticket.arrtime.substring(0,2)+':'+ticket.arrtime.substring(2,4)}}</div>
                        <div>{{ticket.arrairdrome}}{{ticket.arrTerminal}}</div>
                    </td>
                    <td>
                        <div>{{ticket.airwaysCn}}</div>
                        <div>{{ticket.flightNo}}</div>
                    </td>
                    <td>{{ticket.psgtype=="CHD" ? ticket.childSalePrice : ticket.price}}元</td>
                    <td>{{ticket.psgtype=="CHD" ? '0' : ticket.buildfee}}元/{{ticket.psgtype=="CHD" ? ticket.childOilTax : ticket.oiltax }}元</td>
                    <td>{{ticket.insCount*20}}元</td>
                    <!-- <td>10元</td> -->
                    <td>{{ticket.psgtype=="CHD" ? ticket.childTotal : ticket.total}}元</td>
                    <td>{{ticket.psgname}}</td>
                    <td>{{ticket.certid}}</td>
                </tr>
            </tbody>
        </table>
    </div>    
</template>
<script>
export default {
    props: {
        ticketListBeans: {
            type: Array
        },
        ticketRegulations: {
            type: Array
        }
    },    
    methods: {
        showTip: function (ticketTurn, ticketChange, ticketBack) {
            this.$dispatch('show-tip', ticketTurn, ticketChange, ticketBack)
        },
        closeTip: function () {
            this.$dispatch('close-tip', false)
        }
    }
}
</script>