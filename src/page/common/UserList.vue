<template>
	<q-c-head :show.sync="isManager" :head-name.sync='headName'></q-c-head>
	<div class="content">
        <div class="page1200 clearfix">
			<manager-sider :active-num.sync="activeNum"></manager-sider>
			<user-list-tab-bar></user-list-tab-bar>
			<user-list-tab-body v-if="getUserList.length" :user-list="getUserList"></user-list-tab-body>
			<loading v-if="isLoad"></loading>
            <no-data class="fr" v-if="!getUserList.length && !isLoad"></no-data> 
		</div>
	</div>
	<q-c-footer></q-c-footer>
</template>
<script>
import { QCHead, QCFooter, ManagerSider, UserListTabBar, UserListTabBody, Loading, NoData } from '../../components'
import { userList, clearUserList } from '../../vuex/actions'
import { getUserList } from '../../vuex/getters'
import configUrl from '../../data/configUrl'
import util from '../../utils/util'
export default {
	vuex: {
		actions: {
			userList,
			clearUserList
		},
		getters: {
			getUserList
		}
	},
	components: {
		QCHead,
		QCFooter,
		ManagerSider,
		UserListTabBar,
		UserListTabBody,
		Loading,
		NoData
	},
	created: function () {
		this.init()
	},
	data() {
		return {
			headName: '管理中心',
            isManager: true,
            activeNum: 4,
            isLoad: false,
		}
	},
	methods: {
		init: function () {
			this.isLoad=true
			this.clearUserList()
			let self = this
			let opt = {
                type: 'post',
                data: {},
                url: configUrl.userList.dataUrl,
                success: function (resp) {
                	self.isLoad=false
                },
                fail: function (resp) {
                	self.isLoad=false
                    console.log(resp)
                }
            }
            this.userList(opt)
		}
	},
	events: {
		'user-del': function (id) {
			let self = this
			let opt = {
                type: 'post',
                data: {
                	id: id
                },
                url: configUrl.userDel.dataUrl,
                success: function (resp) {
                	self.init()
                },
                fail: function (resp) {
                    console.log('失败')
                    console.log(resp)
                }
            }
            util.getMyrequest(opt)
		}
	}
}
</script>
<style scoped>
	
</style>