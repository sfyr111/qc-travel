<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="detail fr">
                <div class="fr-title">白条申请</div>
                <div class="company-information">
                    <form onsubmit="return false;">
                        <div class="part1 part">
                            <p class="part1-title">公司信息</p>
                            <div class="information">
                                <p>
                                    <span>公司名称：</span>
                                    <input type="text" name="" placeholder="公司名称请与营业执照一致" v-model="companyName" required>
                                </p>
                                 <p>
                                    <span>公司代码：</span>
                                    <input type="text" name="" placeholder="公司代码" v-model="pollCode" required>
                                </p>                                
                                <p>
                                    <span>联系人姓名：</span>
                                    <input type="text" name="" placeholder="联系人可作为公司授权代表签署协议" v-model="conName" required>
                                </p>
                                <p>
                                    <span>邮件：</span>
                                    <input type="text" name="" placeholder="请输入邮箱地址" v-model="email" required>
                                </p>
                                <p>
                                    <span>手机：</span>
                                    <input type="text" name="" placeholder="请输入手机号" v-model="mobile" required>
                                </p>
                                <p>
                                    <span>办公电话：</span>
                                    <input type="text" name="" placeholder="请输入办公电话" v-model="telphone" required>
                                </p>
                                <p>
                                    <span>地址：</span>
                                    <select @change="change('provinceSelected', $event.target.value)" v-model="provinceName">
                                       <option :value="provinceName">{{provinceName}}</option>
                                       <option v-for="(key, value) in province" v-text="key"></option>
                                    </select>
                                    <select @change="change('citySelected', $event.target.value)" v-model="cityName">
                                       <option :value="cityName">{{ cityName }}</option>
                                       <option v-for="(key, value) in city" v-text="key"></option>
                                    </select>
                                    <select @change="change('areaSelected', $event.target.value)" v-model="areaName">
                                       <option :value="areaName">{{ areaName }}</option>
                                       <option v-for="(key, value) in area" v-text="key"></option>
                                    </select>
                                </p>
                                <p>
                                    <span>详细地址：</span>
                                    <input type="text" name="" placeholder="请输入详细地址" v-model="address" required>
                                </p>
                                <p>
                                    <span>公司人数：</span>
                                    <select class="long" v-model="enterprisePerNum">
                                        <option>15人以下</option>
                                        <option>15-50</option>
                                        <option>50-99</option>
                                        <option>100-1000</option>
                                        <option>1000人以上</option>
                                    </select>
                                </p>
                                <p>
                                    <span>公司性质：</span>
                                    <select class="long" v-model="enterpriseNature">
                                        <option v-for="nature in enterpriseNatures" :value="nature.key">{{nature.text}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div class="part2 part">
                            <p class="part2-title">账户信息</p>
                            <div class="information">
                                <p>
                                    <span>户名全称：</span>
                                    <input type="text" name="" v-model="acctName" required>
                                </p>
                                <p>
                                    <span>开户账号：</span>
                                    <input type="text" name="" v-model="openAcctNO" required>
                                </p>
                                <p>
                                    <span>开户银行：</span>
                                    <select class="long" v-model="openAcctBank">
                                        <option v-for="bank in openAcctBanks" :value="bank.key">{{bank.text}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div class="part3 part">
                            <p class="part3-title">信息登记</p>
                            <div class="information">                               
                                <p>
                                    <span>法人姓名：</span>
                                    <input type="text" name="" placeholder="请输入法人姓名" v-model="legalPerson" required>
                                </p>                               
                                <p>
                                    <span>法人身份证号：</span>
                                    <input type="text" name="" placeholder="请输入法人身份证号" v-model="legalPersonId" required>
                                </p>
                                <p>
                                    <span>预计月消费金额：</span>
                                    <input type="text" name="" v-model="expectedAmt" required>
                                </p>
                                <div class="upload-box">
                                    <span>营业执照：</span>
                                    <div class="upload">点击上传
                                        <form name="form1">
                                            <input type="file" name="file" @change="formUpload($event, '.upload-box', 'businessLicense')" class="input1">
                                        </form> 
                                    </div>
                                    <span class="file-name"></span>
                                    <p class="notice">注：营业执照需要加盖公章<i>（文件大小不超过5M）</i></p>
                                </div>
                                <div class="upload-box">
                                    <span>白条申请书<i>(*pdf文件)</i>：</span>
                                    <div class="upload">点击上传
                                        <form name="form1">
                                            <input type="file" name="iouApplyFile" @change="formUpload($event, '.upload-box', 'iouApplyFile')" class="input1">
                                        </form> 
                                    </div>
                                    <a class="upload downTemp" target="_blank" href="http://travel.17cai.com/static/iou_agreement_file_20170421.docx">下载模板</a>
                                    <span class="file-name"></span>
                                </div>
                                <p class="notice2">以下信息<i>非必填项</i>，请提供最近三个月的商旅供应商，物业或者其它供应商的发票及相应的支付凭证，可加快审批速度。</p>
                                
                                <div class="upload-box far-top">
                                    <span>提供银行交易凭证（加盖财务章或公章）：</span>
                                    <div class="upload long">上传{{new Date() | dateformat "yyyy年MM月"}}
                                       <form name="form2">
                                        <input type="file" name="file" @change="formUpload($event, '.upload-box', 'certificate1')">
                                     </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box">
                                    <span> </span>
                                    <div class="upload long">上传{{new Date().setMonth(new Date().getMonth()-1) | dateformat "yyyy年MM月"}}
                                       <form name="form3">
                                           <input type="file" name="file" @change="formUpload($event, '.upload-box', 'certificate2')">
                                       </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box">
                                    <span> </span>
                                    <div class="upload long">上传{{new Date().setMonth(new Date().getMonth()-2) | dateformat "yyyy年MM月"}}
                                        <form name="form4">
                                            <input type="file" name="file" @change="formUpload($event, '.upload-box', 'certificate3')">
                                        </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box far-top">
                                    <span>提供相应发票：</span>
                                    <div class="upload long">上传{{new Date() | dateformat "yyyy年MM月"}}
                                        <form name="form5">
                                            <input type="file" name="file" @change="formUpload($event, '.upload-box', 'invoice1')">
                                        </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box">
                                    <span> </span>
                                    <div class="upload long">上传{{new Date().setMonth(new Date().getMonth()-1) | dateformat "yyyy年MM月"}}
                                        <form name="form6">
                                            <input type="file" name="file" @change="formUpload($event, '.upload-box', 'invoice2')">
                                        </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box">
                                    <span> </span>
                                    <div class="upload long">上传{{new Date().setMonth(new Date().getMonth()-2) | dateformat "yyyy年MM月"}}
                                        <form name="form7">
                                            <input type="file" name="file" @change="formUpload($event, '.upload-box', 'invoice3')">
                                        </form>
                                    </div>
                                    <span class="file-name right"></span>
                                </div>
                                <div class="upload-box far-top">
                                    <span>最后一年的审计报告：</span>
                                    <div class="upload">点击上传
                                       <form name="form8">
                                           <input type="file" name="file" @change="formUpload($event, '.upload-box', 'auditReport')">
                                       </form>
                                    </div>
                                    <span class="file-name"></span>
                                </div>
                               
                            </div>
                        </div>
                        <div class="submit-box">
                            <p><label><input type="checkbox" name="" @change="isChecked()" :value="isAgree" v-model="isAgree">我已阅读并同意遵守</label><a target="_blank" href="http://www.17cai.com/control/showInformation?articleTypeId=FOOTER_HELP_3&articleId=10071">《齐采商旅白条协议》</a></p>
                            <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                            <button v-if="!btnHasUsed" class="submit" @click.stop="onsubmit()">提交月结申请</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import $ from 'jquery'
import { QCHead, QCFooter, ManagerSider, showTips } from '../../components'
import { monthApply, selectProvince, selectCity, selectArea } from '../../vuex/actions'
import { getSelectProvince, getSelectCity, getSelectArea } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
import dateFormat from '../../filter/dateFormat'
export default {
    vuex: {
        actions: {
            monthApply,
            selectProvince,
            selectCity,
            selectArea,
        },
        getters: {            
            getSelectProvince,
            getSelectCity,
            getSelectArea,    
        }
    },
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        showTips
    },
    data: function() {
        return {
            uploadText: '',
            headName: '管理中心',
            isManager: true,
            province: {},
            city: {},
            area: {},
            isAgree: true, // 是否勾选
            btnHasUsed: false, // 节流
            activeNum: 2,
            companyName: "",
            pollCode: "",
            enterprisePerNum: '',
            enterpriseNature: '',
            enterpriseNatures: [
                {key: "GOVERNMENT_AGENCY", text: "国家机关及所属机构"},
                {key: "LOCAL_GOVERNMENT", text: "地方政府及所属机构"},
                {key: "EDUCATION", text: "教育"},
                {key: "MILITARY", text: "军队"},
                {key: "SELF_EMPLOYED", text: "个体"},
                {key: "PRIVATELY_OPERATED", text: "私营"},
                {key: "PUBLICLY_TRADED", text: "股份制"},
                {key: "CHINESE_FOREIGN_JOINT_VENTURE", text: "中外合资"},
                {key: "WHOLLY_FOREIGN_OWNED_ENTERPRISE", text: "外商独资"},
                {key: "LOCAL_COMMUNAL_ENTERPRISE", text: "地方/集体企业"},
                {key: "SOE", text: "国有企业"},
                {key: "OTHERS", text: "其他"},

            ],
            conName: "",
            legalPerson: "",
            legalPersonId: "",
            email: "",
            mobile: "",
            telphone: "",
            provinceFlag: "",
            provinceName: "请选择",
            cityFlag: "",
            cityName: "请选择",
            areaFlag: "",
            areaName: "请选择",
            address: "",
            acctName: "",
            openAcctNO: "",
            openAcctBank: "",
            openAcctBanks: [
                {key: "SPDB", text: "上海浦东发展银行"},
                {key: "CEB", text: "中国光大银行"},
                {key: "CIB", text: "兴业银行"},
                {key: "CBC", text: "建设银行"},
                {key: "CMB", text: "招商银行"},
                {key: "CGB", text: "广发银行"},
                {key: "CMBC", text: "中国民生银行"},
                {key: "GZCB", text: "广州银行股份有限公司"},
                {key: "PAB", text: "平安银行"},
                {key: "ICBC", text: "中国工商银行"},
                {key: "ABC", text: "中国农业银行"},
                {key: "BOC", text: "中国银行"},
                {key: "BCM", text: "交通银行"},
                {key: "PSBC", text: "中国邮政储蓄银行"},
                {key: "CNCB", text: "中信银行"},
                {key: "HXB", text: "华夏银行"},
                {key: "JSCB", text: "江苏银行股份有限公司"},
                {key: "BOB", text: "北京银行"},
            ],
            expectedAmt: "",
            businessLicense: "",
            auditReport: "",
            certificate1: "",
            certificate2: "",
            certificate3: "",
            iouApplyName: "",
            invoice1: "",
            invoice2: "",
            invoice3: ""
        }
    },
    created: function () {
        var self = this    
        var provinceOpt = {
            type: 'get',
            data: {},
            url: configUrl.selectProvince.dataUrl,
            success: function (resp) {
                self.province = resp.data
                console.log('成功')
            },
            fail: function (resp) {
                console.log('失败')
                console.log(resp)
            }            
        }
        this.selectProvince(provinceOpt)
    },
    methods: {
        onsubmit: function () {
            if (!this.isAgree) {
                alert('请遵守齐采商旅月结协议')
                return
            }
            var self = this
            if (this.btnHasUsed) {
                console.log("sss")
                return
            }
            this.btnHasUsed = true
            var data = {
                companyName: this.companyName,
                pollCode: this.pollCode,
                conName: this.conName,
                legalPerson: this.legalPerson,
                legalPersonId: this.legalPersonId,
                email: this.email,
                mobile: this.mobile,
                telphone: this.telphone,
                provinceFlag: this.getSelectProvince[this.provinceName],
                provinceName: this.provinceName,
                cityFlag: this.getSelectCity[this.cityName],
                cityName: this.cityName,
                areaFlag: this.getSelectArea[this.areaName],
                areaName: this.areaName,
                address: this.address,
                acctName: this.acctName,
                openAcctNO: this.openAcctNO,
                openAcctBank: this.openAcctBank,
                expectedAmt: this.expectedAmt,
                businessLicense: this.businessLicense,
                auditReport: this.auditReport,
                enterprisePerNum: this.enterprisePerNum,
                enterpriseNature: this.enterpriseNature,
                certificate1: this.certificate1,
                certificate2: this.certificate2,
                certificate3: this.certificate3,
                iouApplyFile: this.iouApplyFile,
                invoice1: this.invoice1,
                invoice2: this.invoice2,
                invoice3: this.invoice3
            }
            let applyOpt = {
                type: 'post',
                data: data,
                url: configUrl.monthApply.dataUrl,
                success: function (resp) {
                    self.btnHasUsed = false
                    self.$router.go({
                        name: 'monthApplySuc'
                    })
                },
                fail: function (resp) {
                    self.btnHasUsed = false
                    showTips(resp.msg, 2500)
                    console.log(resp)
                }
            }
            this.monthApply(applyOpt) // 获取近期机票订单
            
        },
        formUpload: function (e, parentStr, filed) {
            var self = this            
            util.fileUpload(e.target, parentStr).then(function(resp) {
                self[filed] = resp.fileName
            });
        },
        isChecked: function() {
            this.isAgree = !this.isAgree
        },
        change: function (field, key) {
            this[field] = key.split(',')
            var self = this
            if (field === 'provinceSelected') {
                var provinceId = self.province[key]
                console.log(provinceId)
                if(!self.province[key]) {
                    self.city = {}
                    return
                }
                var cityOpt = {
                    type: 'get',
                    data: {
                        provinceFlag: provinceId
                    },
                    url: configUrl.selectCity.dataUrl,
                    success: function (resp) {
                        self.city = resp.data
                        console.log('成功')
                    },
                    fail: function (resp) {
                        console.log('失败')
                        console.log(resp)
                    }            
                }
                this.selectCity(cityOpt)
                this.cityName = '请选择'
                this.areaName = '请选择'
            }
            if (field === 'citySelected') {
                var cityId = self.city[key]
                if(!self.city[key]) {
                    self.area = {}
                    return
                }
                var cityOpt = {
                    type: 'get',
                    data: {
                        cityFlag: cityId
                    },
                    url: configUrl.selectArea.dataUrl,
                    success: function (resp) {
                        self.area = resp.data
                        console.log('成功')
                    },
                    fail: function (resp) {
                        console.log('失败')
                        console.log(resp)
                    }            
                }
                this.selectArea(cityOpt)
                this.areaName = '请选择'
            }
            if (field === 'areaSelected') {
                console.log(33)
            }
        },
    }
}
</script>
<style>
@import url('../../css/common.css');
@import url('../../css/monthApply.css');
</style>