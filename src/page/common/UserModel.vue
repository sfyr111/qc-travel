<template>
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
	<div class="content">
        <div class="page1200 clearfix">
			<manager-sider :active-num.sync="activeNum"></manager-sider>
			<div class="user_box fr">
				<div class="user_box_hd">
					<span class="hd_tit">{{title}}</span>
					<a class="hd_link fr" href="javascript:void(0)" v-link="{ name: 'userList' }">查看所有常用联系人</a>
				</div>
				<div class="user_box_bd">
					<form @submit.prevent="onSubmit">
						<div class="form2tab">
							<div class="row">
								<span><em>*</em>姓名</span>
								<select class="row_mid" v-model="user.psgtype">
				                    <option value="ADT">成人</option>
				                    <option value="CHD">儿童</option>
				                </select>
								<input class="row_foot" type="text" required placeholder="请输入姓名" v-model="user.name">
							</div>
							<div class="row">
								<span><em>*</em>性别</span>
								<label><input type="radio" required name="psgsex" value="M" v-model="user.psgsex" checked>男</label>
								<label><input type="radio" required name="psgsex" value="F" v-model="user.psgsex">女</label>
							</div>
							<div class="row">
								<span><em>*</em>生日</span>
								<input class="row_body" type="number" required  v-model="user.birthday" placeholder="1989-01-01">
							</div>
							<div class="row">
								<span><em>*</em>手机号码</span>
								<input class="row_body" type="number" required placeholder="请输入手机号" v-model="user.phoneNum">
							</div>
							<div class="row">
								<span>邮箱</span>
								<input class="row_body" type="email" placeholder="请输入邮箱" v-model="user.email">
							</div>
							<div class="row">
								<span><em>*</em>证件类型</span>
								<select class="row_mid" v-model="user.certtype">
				                    <option value="IDC">身份证</option>
				                    <option value="PSP">护照</option>
				                    <option value="HKM">港澳通行证</option>
				                    <option value="MOC">军官证</option>
				                    <option value="TW1">回乡证</option>
				                    <option value="TW2">台胞证</option>
				                    <option value="SEA">国际海员证</option>
				                    <option value="OTHER">其他</option>
				                </select>
								<input class="row_foot" type="text" required placeholder="请输入证件号码" v-model="user.certId">
							</div>
						</div>
						<button v-if="btnHasUsed" class="submit_btn btnHasUsed">正在努力加载...</button>
						<input v-if="!btnHasUsed" class="submit_btn" type="submit" value="保存">					
					</form>
				</div>
			</div>
		</div>
	</div>
	<q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, showTips } from '../../components'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
	export default {
		components: {
	        QCHead,
	        QCFooter,
	        ManagerSider,
	        showTips
	    },
	    data: function () {
	        return {
	            headName: '管理中心',
	            isManager: true,
	            activeNum: 4,
	            btnHasUsed: false,
	            title: "新增常用联系人",
	            user: {
	            	id: '',
	            	name: '',
	            	psgtype: 'ADT',
	            	certtype: 'IDC',
	            	certId: '',
	            	phoneNum: '',
	            	psgsex: '',
	            	email: '',
	            	birthday: ''
	            }
	        }
	    },
	    created() {
	    	this.init()
	    },
	    methods: {
	    	init: function () {
	    		if (sessionStorage.getItem('user')) {
	    			this.user = JSON.parse(sessionStorage.getItem('user'))
	    		}
	    	},
	    	onSubmit: function () {
	    		let self = this
	    		let user = this.user
				let opt = {
	                type: 'post',
	                data: user,
	                url: configUrl.userAddOrUpdate.dataUrl,
	                success: function (resp) {
	                	self.$router.go({
			               name: 'userList',
			               query: {}
			             })
	                },
	                fail: function (resp) {
	                    showTips(resp.msg, 2500)
	                }
	            }
	            util.getMyrequest(opt)
	    	}
	    }
	}
</script>
<style scoped>
	.user_box {
		width: 1030px;
	}
	.user_box_hd {
		position: relative;
		padding: 10px 10px 10px 10px;
		width: 1010px;		
		font-size: 14px;
		background-color: #eee;
	}
	.user_box_hd .hd_tit {
		display: inline-block;
	}
	.user_box_hd .hd_link {
		display: inline-block;
		color: #ee3435;
	}
	.user_box_bd {
		padding: 60px 0px;
		text-align: center;
		background-color: #fff;
	}
	.form2tab {
		display: table;
		margin: 0 auto;
		font-size: 14px;
	}
	.form2tab .row {
		display: table-row;
		line-height: 40px;
	}
	.form2tab .row label {
		margin: 0 44px;
	}
	.form2tab .row label input {
		margin-right: 5px;
	}
	.form2tab .row span {
		display: table-cell;
		text-align: right;
	}
	.form2tab .row em {
		color: #ee3435;
	}
	.submit_btn {
		margin-top: 40px;
		padding: 0 40px;
		height: 32px;
		line-height: 32px;
		font-size: 14px;
		border: none;
		border-radius: 3px;
		background-color: #e34449;
		color: #fff;
	}
	.submit_btn:hover {
		background-color: #b41521;
	}
</style>