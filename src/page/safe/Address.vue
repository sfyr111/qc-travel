<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="detail fr">
                <div class="new">
                    <span @click.stop="addNew()">新建邮寄地址</span>（您已创建<i class="less">{{getAddressList.length}}</i>个邮寄地址，最多可创建<i class="many">5</i>个）
                </div>
                <ul v-if="getAddressList.length>0">
                    <li v-for="add in getAddressList">
                        <p><i>发票抬头：</i><span>{{add.invoiceTitle}}</span> <b v-if="add.isDefaultAddress==1">默认地址</b></p>
                        <p><i>收件人：</i><span>{{add.recipientsName}}</span></p>
                        <p><i>手机号码：</i><span>{{add.phone}}</span></p>
                        <p><i>所在地区：</i><span>{{add.provinceName}}{{add.cityName}}{{add.areaName}}</span></p>
                        <p><i>邮编：</i><span>{{add.postCode}}</span></p>
                        <p><i>详细地址：</i><span>{{add.address}}</span></p>
                        <i class="fa fa-trash" @click.stop="delAddress(add.invoiceId)"></i>
                        <i class="fa fa-pencil" @click.stop="editAddress(add.invoiceId)"></i>
                        <b class="set" v-if="add.isDefaultAddress==0" @click.stop="setDefault(add.invoiceId)">设为默认</b>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 遮罩及弹框 -->
        <invoice-pos 
        :show-pop.sync="showPop" 
        :pop-name="popName"
        :invoice-title="invoiceTitle"
        :recipients-name="recipientsName"
        :phone="phone"
        :post-code="postCode"
        :address="address"
        :invoice-id="invoiceId"
        v-ref:pos></invoice-pos>
        <alert-msg :show.sync="showAlert" :options="optionsAlert"></alert-msg>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, InvoicePos, AlertMsg } from '../../components'
import { addressList, selectJdProvince, selectJdCity, selectJdArea, addressAdd, addressSetDef, addressDel, addItem } from '../../vuex/actions'
import { getAddressList, getSelectJdProvince, getSelectJdCity, getSelectJdArea } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
export default {
    vuex: {
        actions: {
            addressList,
            selectJdProvince,
            selectJdCity,
            selectJdArea,
            addressAdd,
            addressSetDef,
            addressDel,
            addItem
        },
        getters: {            
            getAddressList,
            getSelectJdProvince,
            getSelectJdCity,
            getSelectJdArea
        }
    },
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        InvoicePos,
        AlertMsg
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            showAlert: false,
            optionsAlert: {},
            activeNum: 3,
            showPop: false,  
            invoiceTitle: '',
            recipientsName: '',
            phone: null,
            invoiceId: null,
            postCode:null,
            btnHasUsed: false,// 节流
            address: '',
            popName: ""
        }
    },
    created: function() {
        this.init()
    },
    methods: {
        init: function () {
            // 查询用户地址列表
            let opt = {
                type: 'post',
                data: {},
                url: configUrl.addressList.dataUrl,
                success: function (resp) {
                },
                fail: function (resp) {
                }
            }
            this.addressList(opt) 
        },
        addNew: function () {
            this.showPop = true
            // 绑定链接
            this.popName = "新增地址"
            var province = {
                provinceName: "请选择",
                provinceUrl: configUrl.selectJdProvince.dataUrl
            }
            var city = {
                cityName: "请选择",
                cityUrl: configUrl.selectJdCity.dataUrl
            }
            var area = {
                areaName: "请选择",
                areaUrl: configUrl.selectJdArea.dataUrl
            }
            this.$broadcast('init', province, city, area)            
        },
        setDefault: function (invoiceId) {
            var self = this
            var setDef = {
                type: 'post',
                data: {
                    invoiceId: invoiceId
                },
                url: configUrl.addressSetDef.dataUrl,
                success: function (resp) {                    
                    self.init()
                },
                fail: function (resp) {
                    alert(resp.msg)
                    self.showPop = false
                }
            }
            this.addressSetDef(setDef) 
        },
        delAddress: function (invoiceId) {
            var self = this
            var setDef = {
                type: 'post',
                data: {
                    invoiceId: invoiceId
                },
                url: configUrl.addressDel.dataUrl,
                success: function (resp) {                    
                    self.init()
                },
                fail: function (resp) {
                    alert(resp.msg)
                    self.showPop = false
                }
            }
            this.addressDel(setDef) 
        },
        editAddress: function (invoiceId) {
            var self = this
            var setDef = {
                type: 'post',
                data: {
                    invoiceId: invoiceId
                },
                url: configUrl.addItem.dataUrl,
                success: function (resp) {   

                    self.invoiceTitle = resp.data.invoiceTitle
                    self.recipientsName = resp.data.recipientsName
                    self.phone = resp.data.phone
                    self.postCode = resp.data.postCode                    
                    self.address = resp.data.address
                    self.invoiceId = resp.data.invoiceId

                    this.popName = "编辑地址"

                    var province = {
                        provinceName: resp.data.provinceName,
                        provinceUrl: configUrl.selectJdProvince.dataUrl
                    }
                    var city = {
                        cityName: resp.data.cityName,
                        cityUrl: configUrl.selectJdCity.dataUrl
                    }
                    var area = {
                        areaName: resp.data.areaName,
                        areaUrl: configUrl.selectJdArea.dataUrl
                    }
                    self.$broadcast('init', province, city, area) 
                    
                    self.showPop = true  
                },
                fail: function (resp) {
                    alert(resp.msg)
                    self.showPop = false
                }
            }
            self.addItem(setDef) 
        }
    },
    events: { 
        'address-submit': function (form) {
            var self = this
            if (this.btnHasUsed) {
              console.log("sss")
              return
            }
            this.btnHasUsed = true
            var addAddress = {
                type: 'post',
                data: form,
                url: configUrl.addressAdd.dataUrl,
                success: function (resp) {
                    self.showPop = false
                    self.init()
                    self.btnHasUsed = false
                },
                fail: function (resp) {
                    self.showPop = true
                    self.btnHasUsed = false
                    self.showAlert = true
                    self.optionsAlert = {
                        title: "提交失败",
                        msg: resp.msg
                    } 
                }
            }
            this.addressAdd(addAddress) 
        }
    }
}
</script>
<style>
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
    .content .page1200 .detail .new{
        height: 35px;
        padding:5px 0;
        font-size: 14px;
        line-height: 35px;
        color:#656565;
    }
    .content .page1200 .detail .new i{
        color:#fc7546;
    }
    .content .page1200 .detail .new span{
        display: inline-block;
        width: 110px;
        height: 35px;
        color:#fff;
        cursor: pointer;
        background: #e34449;
        border-radius: 5px;
        margin-right: 10px;
        padding-left: 42px;
        position: relative;
    }
    .content .page1200 .detail .new span:hover {
        background-color: #b41521;
    }
    .content .page1200 .detail .new span:after{
        display: block;
        width: 3px;
        height: 21px;
        background: #fff;
        content: "";
        position: absolute;
        left:25px;
        top:7px;
    }
    .content .page1200 .detail .new span:before{
        display: block;
        width: 21px;
        height: 3px;
        background: #fff;
        content: "";
        position: absolute;
        left:16px;
        top:16px;
    }
    .content .page1200 .detail ul li{
        padding:10px 20px 10px 0;
        border:1px solid #eeeeee;
        background: #fff;
        margin-top: 10px;
        position: relative;
    }
    .content .page1200 .detail ul li p{
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        color:#333333;
    }
    .content .page1200 .detail ul li p i{
        display: inline-block;
        width: 95px;
        text-align: right;
        color:#656565;
    }
    .content .page1200 .detail ul li p b{
        display: inline-block;
        width: 68px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #c6ebfe;
        color:#dd1827;
        border-radius: 10px;
        margin-left: 10px;
    }
    .content .page1200 .detail ul li i.fa{
        font-size: 22px;
        color:#b9b9b9;
        cursor: pointer;
    }
    .content .page1200 .detail ul li i.fa-trash{
        position: absolute;
        right:20px;
        top:12px;
    }
     .content .page1200 .detail ul li i.fa-pencil{
        position: absolute;
        right:55px;
        top:12px;
    }
    .content .page1200 .detail ul li i.fa:hover{
        color:#37aafa;
    }
    .content .page1200 .detail ul li b.set{
        display: inline-block;
        position: absolute;
        right:20px;
        bottom:16px;
        cursor: pointer;
        color:#37aafa;
    }    
</style>