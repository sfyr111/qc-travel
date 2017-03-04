<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="detail fr">
                <div class="fr-title">设置支付密码</div>
                <div class="speed" v-show="step == 1">
                    <div class="bar">
                        <p>
                            <span class="speed1">验证身份</span>
                            <span class="speed2">设置支付密码</span>
                            <span class="speed3">完成</span>
                        </p>
                    </div>
                    <form>
                       <p>
                            <i>验证手机：</i>
                            <span>{{phone}}</span>
                       </p> 
                       <p>
                           <i>验证码：</i>
                           <input type="text" name="" placeholder="短信验证码" :value="verifyCode" v-model="verifyCode">
                           <cunt-down></cunt-down>
                       </p>
                       <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                       <button v-if="!btnHasUsed" class="submit" name="" value="" @click="goStep2()">下一步</button>
                    </form>
                </div>
                <div class="speed_step2" v-show="step == 2">
                    <div class="bar">
                        <p>
                            <span class="speed1">验证身份</span>
                            <span class="speed2">设置支付密码</span>
                            <span class="speed3">完成</span>
                        </p>
                    </div>
                    <form>
                       <p class="payPassword">
                           <i>支付密码：</i>
                           <input type="password" name="" placeholder="由6-20位字母、数字和符号组合" v-model="newPwd" @input="getLevel(newPwd)">
                       </p> 
                       <p class="degree">
                           <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                           <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                           <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                           <b>{{level==1?'弱':level==2?'中':'强'}}</b>
                       </p>
                       <p>
                           <i>确认支付密码：</i>
                           <input type="password" name="" placeholder="请再次输入上面的密码" v-model="rePwd" >
                       </p>
                       <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                       <button v-if="!btnHasUsed" class="submit" name="" value="" @click="goStep3()">确定</button>
                    </form>
                </div>
                <div class="speed_step3" v-show="step == 3">
                    <div class="bar">
                        <p>
                            <span class="speed1">验证身份</span>
                            <span class="speed2">设置支付密码</span>
                            <span class="speed3">完成</span>
                        </p>
                    </div>
                    <div class="sure">
                        <p>恭喜您！设置支付密码成功，请妥善保管并牢记！</p>
                        <span v-if="!btnHasUsed" @click="goSafeCenter()">确定</span>
                        <span v-if="btnHasUsed" class="btnHasUsed">正在努力加载...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, CuntDown } from '../../components'
import pwdLevel from '../../filter/pwdLevel'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
export default {
    components: {
        QCHead,
        QCFooter,
        ManagerSider,
        CuntDown
    },
    data: function () {
        return {
            headName: '管理中心',
            isManager: true,
            activeNum: 3,
            step: 1,
            level: 1,
            verifyCode: '',
            phone: "",
            newPwd: '',// 新密码
            rePwd: '',// 重复输入新密码
            btnHasUsed: false
        }
    },
    created: function () {
      this.phone =  window.user ? window.user.telNO : 18710611750 // 从session中获取用户id
    },
    methods: {
        goStep2: function () {
          var self = this
          // 获取验证码
          if (this.btnHasUsed) {
            console.log("sss")
            return
          }
          this.btnHasUsed = true
          var opt = {
              type: 'get',
              data: {
                verifyCode: self.verifyCode
              },
              url: configUrl.checkMsg.dataUrl,
              success: function (resp) {
                  self.step = 2
                  self.btnHasUsed = false
              },
              fail: function (resp) {
                  console.log("验证失败")
                  self.btnHasUsed = false
              }            
          }
          util.getMyrequest(opt)            
        },
        goStep3: function () {
          var self = this
          if (this.newPwd !== this.rePwd) {
            alert("两次输入不一致")
            return
          }
          // 获取验证码
          if (this.btnHasUsed) {
            console.log("sss")
            return
          }
          this.btnHasUsed = true
          var opt = {
              type: 'get',
              data: {
                newPwd: self.newPwd
              },
              url: configUrl.setPwd.dataUrl,
              success: function (resp) {
                  self.step = 3
                  self.btnHasUsed = false
              },
              fail: function (resp) {
                  console.log("验证失败")
                  self.btnHasUsed = false
              }            
          }
          util.getMyrequest(opt)          
        },
        goSafeCenter: function () {
            window.user.must_set_month_pay_pwd = false
            this.$router.go({
                name: 'safeCenter',
                query: {
                    // must_set_month_pay_pwd: false
                }
            })
        },
        // 获取密码强度
        getLevel: function (value) {
          this.level = util.getPwdLevel(value)
        }       
    },
    events: {
      'get-msg': function() {
        var self = this
        if (this.btnHasUsed) {
          console.log("sss")
          return
        }
        this.btnHasUsed = true
        var opt = {
            type: 'get',
            data: {},
            url: configUrl.getMsg.dataUrl,
            success: function (resp) {
                self.$broadcast('start-timer')
                self.btnHasUsed = false
            },
            fail: function (resp) {
                console.log("发送短信失败")
                self.btnHasUsed = false
            }            
        }
        util.getMyrequest(opt)
      }
    }
}
</script>
<style>
@import url('../../css/common.css');
@import url('../../css/passwordPay.css');    
</style>