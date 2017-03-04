<template>
	<div class="mask" v-show="showPop"></div>
    <div class="popup_invoice" v-show="showPop">
       <h3>{{popName}}<i class="fa fa-times" @click.stop="closePop()"></i></h3>
       <form @submit.prevent="submitForm">
           <p><span><i>*</i>发票抬头：</span><input type="text" name="" placeholder="请输入发票抬头" :value="invoiceTitle" v-model="invoiceTitle" required></p>
           <p><span><i>*</i>收件人：</span><input type="text" name="" placeholder="请输入收件人姓名" :value="recipientsName" v-model="recipientsName" required></p>
           <p><span><i>*</i>手机号：</span><input type="number" name="" placeholder="请输入手机号码" :value="phone" v-model="phone" required></p>
           <p>
                <span><i>*</i>所在地区：</span>
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
            <p><span><i>*</i>邮编：</span><input type="text" name="" placeholder="请输入邮编" :value="postCode" v-model="postCode" required></p>
           <p><span><i>*</i>详细地址：</span></p>
           <p>
               <textarea placeholder="请输入详细地址" v-model="address" :value="address" v-model="address" required></textarea>
           </p>
           <input class="ok" type="submit" name="submit" value="确认">
           <!-- <input class="preservation" type="submit" name="submit" value="保存"> -->
       </form>
    </div>
</template>
<script>
import 'babel-polyfill';
import { selectJdProvince, selectJdCity, selectJdArea } from '../../vuex/actions'
export default {
    vuex: {
        actions: {
            selectJdProvince,
            selectJdCity,
            selectJdArea
        },
        getters: {            
                  
        }
    },
	props: {		
        showPop: {
            type: Boolean,
            default: false
        },
        invoiceTitle: {
            type: String,
            default: ''
        },
        recipientsName: {
            type: String,
            default: ''
        },
        phone: {
            type: String
        },
        popName: {
            type: String,
            default: ''
        },
        postCode: {
            tyoe: String
        },
        address: {
            type: String,
            default: ''
        },
        invoiceId: {
            type: Number
        }
	},   
    data: function () {
    	return {
    		province:{},
            city: {},
            area: {},
            provinceUrl: '',
            cityUrl: '',
            areaUrl: '',
            provinceName: '请选择',
            cityName: '请选择',
            areaName: '请选择'
    	}
    },
    methods: {
        closePop: function () {
            this.showPop = false
        },        
    	change: function (field, key) {
    		this[field] = key.split(',')
            var self = this
			if (field === 'provinceSelected') {
                var provinceId = self.province[key]
                if(!self.province[key]) {
                    self.city = {}
                    return
                }
				var cityOpt = {
                    type: 'get',
                    data: {
                        provinceId: provinceId
                    },
                    url: self.cityUrl,
                    success: function (resp) {
                        self.city = resp.result
                        console.log('成功')
                    },
                    fail: function (resp) {
                        console.log('失败')
                        console.log(resp)
                    }            
                }
                this.selectJdCity(cityOpt)
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
                        cityId: cityId
                    },
                    url: self.areaUrl,
                    success: function (resp) {
                        self.area = resp.result
                        console.log('成功')
                    },
                    fail: function (resp) {
                        console.log('失败')
                        console.log(resp)
                    }            
                }
                this.selectJdArea(cityOpt)
                this.areaName = '请选择'
			}
            if (field === 'areaSelected') {
                console.log(33)
            }
    	},
        submitForm: function () {
            var form = {
                invoiceTitle: this.invoiceTitle,
                recipientsName: this.recipientsName,
                phone: this.phone,
                postCode: this.postCode,
                address: this.address,         
                invoiceId: this.invoiceId,       
                provinceName: this.provinceName,
                provinceId: this.province[this.provinceName],
                cityName: this.cityName,
                cityId: this.city[this.cityName],
                areaName: this.areaName,
                areaId: this.area[this.areaName]                
            }

            this.$dispatch('address-submit', form)
        }
    },
    events: {
        'init': function(province, city, area) {            
            var self = this    
            this.provinceUrl = province.provinceUrl
            this.cityUrl = city.cityUrl
            this.areaUrl = area.areaUrl
            this.provinceName = province.provinceName
            this.cityName = city.cityName
            this.areaName = area.areaName
            var provinceOpt = {
                type: 'get',
                data: {},
                url: self.provinceUrl,
                success: function (resp) {
                    self.province = resp.result
                    console.log('成功')
                },
                fail: function (resp) {
                    console.log('失败')
                    console.log(resp)
                }            
            }
            this.selectJdProvince(provinceOpt)
        }
    }
}
</script>
<style scoped>
select{
    width: 94px;
    height: 30px;
    line-height: 30px;
    margin-right: 9px;
    margin-left: -4px;
    box-sizing: border-box;
    padding:0 2px;
}
.mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
    filter: alpha(opacity=40);
    position: fixed;
    left:0;
    top:0;
    z-index: 100;
}
.popup_invoice{
    width: 550px;
    height: 400px;
    background: #ffffff;
    border:1px solid #e1effc;
    position: fixed;
    left:50%;
    margin-left: -200px;
    top:50%;
    margin-top: -275px;
    z-index: 999;
}
.popup_invoice h3{
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    color:#666666;
    padding:0 20px;
    position: relative;
    background: #f2f2f2;
}
.popup_invoice h3 i{
    position: absolute;
    right:20px;
    top:9px;
    cursor: pointer;
}
.popup_invoice h3 i:hover{
    color:#ea3a3a;
}
.popup_invoice form{
    margin-top: 45px;
    position: relative;
    height:340px;
}
.popup_invoice form p{
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 10px;
    color:#666666;
}
.popup_invoice form p span{
    display: inline-block;
    width: 150px;
    text-align: right;
}
.popup_invoice form p span i{
    color:#ea3a3a;
}
.popup_invoice form p input{
    width: 300px;
    height: 30px;
    line-height: 30px;
    padding:0 10px;
    box-sizing: border-box;
    color:#333333;
}
.popup_invoice form p textarea{
   position: absolute;
   left:150px;
   top:200px;
   width: 300px;
   height: 60px;
   box-sizing: border-box;
   padding:0 10px;
   resize : none;
   color:#333333;
}
.popup_invoice form input.ok{
    width: 140px;
    height:32px;
    font-size: 16px;
    line-height: 32px;
    color:#fff;
    background: #e34449;
    border-radius: 5px;
    border:0;
    position: absolute;
    left:50%;
    margin-left: -70px;
    bottom:30px;
}
.popup_invoice form input.ok:hover {
    background-color: #b41521;
}
.popup_invoice form input.preservation{
    width: 140px;
    height:32px;
    font-size: 16px;
    line-height: 32px;
    color:#fff;
    background: #cccccc;
    border-radius: 5px;
    border:0;
    position: absolute;
    left:50%;
    margin-left: -70px;
    bottom:30px;
    display: none;
}
</style>