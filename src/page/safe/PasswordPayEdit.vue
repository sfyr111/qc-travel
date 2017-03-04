<template>
    <q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
    <div class="content">
        <div class="page1200 clearfix">
            <manager-sider :active-num.sync="activeNum"></manager-sider>
            <div class="detail fr">
                <div class="fr-title">修改支付密码</div>
                <form onsubmit="return false;">
                    <div class="choice clearfix">
                    <div class="fl" :class="{ 'on': checkedTypeMobile }">
                        <label>
                            <input type="radio" @change="changeCheckType()" v-model="checkedTypeMobile" name="Sex" :value="checkedTypeMobile">&nbsp;手机验证
                        </label>
                    </div>
                    <div class="fl" :class="{ 'on': !checkedTypeMobile }">
                        <label>
                            <input type="radio"  @change="changeCheckType()" v-model="checkedTypeMobile" name="Sex" :value="checkedTypeMobile">&nbsp;原来支付密码验证
                        </label>
                    </div>
                    </div>
                    <div class="speed_type1_step1" v-show="checkedTypeMobile && step == 1">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="message">
                            <p>
                                <i>验证手机：</i>
                                <span>{{phone}}</span>
                           </p> 
                           <p>
                               <i>验证码：</i>
                               <input type="text" name="" placeholder="短信验证码" v-model="verifyCode">
                               <cunt-down></cunt-down>
                           </p>
                           <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                           <button v-if="!btnHasUsed" class="submit" @click="goType1Step2()" name="" value="">下一步</button>
                        </div>
                    </div> 
                    <div class="speed_type1_step2" v-show="checkedTypeMobile && step == 2">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="message">
                            <p class="payPassword">
                               <i>支付密码：</i>
                               <input type="password" name="" placeholder="由6-20位字母、数字和符号组合" v-model="newPwd" @input="getLevel(newPwd)">
                           </p> 
                           <p class="degree">
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <b>{{ (level == 1) ? '弱' : (level == 2) ? '中' : '强'}}</b>
                           </p>
                           <p>
                               <i>确认支付密码：</i>
                               <input type="password" name="" placeholder="请再次输入上面的密码" v-model="rePwd">
                           </p>
                           <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                           <button v-if="!btnHasUsed" class="submit" @click="goType1Step3()" name="" value="">确定</button>
                        </div>
                    </div> 
                    <div class="speed_type1_step3" v-show="checkedTypeMobile && step == 3">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="sure">
                            <p>恭喜您！设置支付密码成功，请妥善保管并牢记！</p>
                            <span v-if="btnHasUsed" class="btnHasUsed">正在努力加载...</span>
                            <span v-if="!btnHasUsed" @click="goType1Suc()">确定</span>
                        </div>
                    </div>
                    <div class="speed_type2_step1" v-show="!checkedTypeMobile && step == 1">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="message">
                            <p class="payPassword">
                               <i>原支付密码：</i>
                               <input type="password" name="" placeholder="请输入原支付密码" v-model="oldPwd">
                           </p>  
                           <p>
                               <i>验证码：</i>
                               <input type="text" name="" placeholder="请输入验证码" v-model="checkImgCode">
                               <img :src="imgPath" alt="" class="check_img">
                               <i class="fa fa-refresh" @click.stop="getCheckImg()"></i>
                           </p>
                           <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                           <button v-if="!btnHasUsed" class="submit" @click="goType2Step2()" name="" value="">下一步</button>
                        </div>
                    </div> 
                    <div class="speed_type2_step2" v-show="!checkedTypeMobile && step == 2">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="message">
                            <p class="payPassword">
                               <i>支付密码：</i>
                               <input type="password" name="" placeholder="由6-20位字母、数字和符号组合" v-model="newPwd2"  @input="getLevel(newPwd2)">
                           </p> 
                           <p class="degree">
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <span :class="{'degree1':level===1,'degree2':level===2,'degree3':level===3}"></span>
                              <b>{{ (level == 1) ? '弱' : (level == 2) ? '中' : '强'}}</b>
                           </p>
                           <p>
                               <i>确认支付密码：</i>
                               <input type="password" name="" placeholder="请再次输入上面的密码" v-model="rePwd2">
                           </p>
                           <button v-if="btnHasUsed" class="submit btnHasUsed">正在努力加载...</button>
                           <button v-if="!btnHasUsed" class="submit" @click="goType2Step3()" name="" value="">确定</button>
                        </div>
                    </div>
                    <div class="speed_type2_step3" v-show="!checkedTypeMobile && step == 3">
                        <div class="bar">
                            <p>
                                <span class="speed1">验证身份</span>
                                <span class="speed2">设置支付密码</span>
                                <span class="speed3">完成</span>
                            </p>
                        </div>
                        <div class="sure">
                            <p>恭喜您！设置支付密码成功，请妥善保管并牢记！</p>
                            <span v-if="btnHasUsed" class="btnHasUsed">正在努力加载...</span>
                            <span v-if="!btnHasUsed"  @click="goType2Suc()">确定</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, CuntDown, showTips } from '../../components'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
export default {
  components: {
      QCHead,
      QCFooter,
      ManagerSider,
      CuntDown,
      showTips
  },
  data: function () {
      return {
          headName: '管理中心',
          isManager: true,
          activeNum: 3,
          step: 1,
          level: 1,
          checkedTypeMobile: false,
          verifyCode: '',
          checkImgCode: '',// 图片验证码
          imgPath: configUrl.getImg.dataUrl,
          btnHasUsed: false,
          phone: "",
          newPwd: '',// 新密码
          rePwd: '',// 重复输入新密码
          newPwd2: '',// 新密码
          rePwd2: '',// 重复输入新密码
          oldPwd: '',          
      }
  },
  created: function () {
    this.phone =  window.user ? window.user.telNO : 18710611750 // 从session中获取用户id
  },
  methods: {
      changeCheckType: function() {
          this.step = 1
          this.checkedTypeMobile = !this.checkedTypeMobile
      },
      // 获取图片验证码
      getCheckImg: function() {
        // 获取验证码
        this.imgPath = configUrl.getImg.dataUrl+'?_t'+new Date() 
      },
      // 手机验证第一步
      goType1Step2: function () {
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
                showTips(resp.msg, 2500)
                self.btnHasUsed = false
            }            
        }
        util.getMyrequest(opt)
      },
      goType1Step3: function() {
          var self = this
          if (!this.newPwd) {
            showTips('新密码不能为空', 2500)
            return
          }
          if (!this.rePwd) {
            showTips('重复密码不能为空', 2500)
            return
          }
          if (this.newPwd !== this.rePwd) {
            showTips('两次输入不一致', 2500)
            return
          }
          if (this.btnHasUsed) {
            console.log("sss")
            return
          }
          this.btnHasUsed = true
          // 获取验证码
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
                  showTips(resp.msg, 2500)
                  self.btnHasUsed = false
              }            
          }
          util.getMyrequest(opt)      
      },
      goType1Suc: function () {
          window.user.must_set_month_pay_pwd = false
          this.$router.go({
              name: 'safeCenter',
              query: {
                  // hasPayPassword: true
              }
          })
      },
      // 原密码验证
      goType2Step2: function () { 
        var self = this  
        if (this.oldPwd == "") {
          alert('输入旧密码先')
        } 
        if (this.btnHasUsed) {
          console.log("sss")
          return
        }
        this.btnHasUsed = true
        // 获取验证码
        var opt = {
          type: 'get',
          data: {
            picCode: self.checkImgCode
          },
          url: configUrl.checkImg.dataUrl,
          success: function (resp) {
              self.step = 2
              self.btnHasUsed = false
          },
          fail: function (resp) {
            self.btnHasUsed = false
            showTips(resp.msg, 2500)
            self.getCheckImg()
          }            
        }
        util.getMyrequest(opt)         
      },
      goType2Step3: function() {
          var self = this
          if (!this.newPwd2) {
            showTips('新密码不能为空', 2500)
            return
          }
          if (!this.rePwd2) {
            showTips('重复密码不能为空', 2500)
            return
          }
          if (this.newPwd2 !== this.rePwd2) {
            alert("两次输入不一致")
            return
          }
          if (this.btnHasUsed) {
            console.log("sss")
            return
          }
          this.btnHasUsed = true
          // 获取验证码
          var opt = {
              type: 'get',
              data: {
                oldPwd: self.oldPwd,
                newPwd: self.newPwd2,
                picCode: self.checkImgCode
              },
              url: configUrl.changeOldPwd.dataUrl,
              success: function (resp) {
                  self.step = 3
                  self.btnHasUsed = false
              },
              fail: function (resp) {
                  showTips(resp.msg, 2500)
                  self.btnHasUsed = false
              }            
          }
          util.getMyrequest(opt)
      },
      goType2Suc: function () {
          window.user.must_set_month_pay_pwd = false
          this.$router.go({
              name: 'safeCenter',
              query: {
                  // hasPayPassword: true
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
              showTips(resp.msg, 2500)
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
@import url('../../css/passwordPayEdit.css');
</style>