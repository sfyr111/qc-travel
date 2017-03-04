<template>
	<div class="user_list_tab fr">
		<table class="user_list_tab_bd">
			<tbody>
				<tr>
					<th>姓名</th>
					<th>手机号码</th>
					<th>证件类型</th>
					<th>证件号码</th>
					<th>性别</th>
					<th>操作</th>
				</tr>
				<tr class="tab_content" v-for="item in userList">
					<td>{{item.name}}</td>
					<td>{{item.phoneNum}}</td>
					<td>{{item.psgtype == "ADT" ? "成人" : "儿童"}}</td>
					<td>{{item.certId}}</td>
					<td>
					{{item.psgsex == "M" ? "男" : 
						item.psgsex == "F" ? "女" : "未知"}}</td>
					<td width="20%">
						<!-- <a href="javascript:void(0)" @click.stop="goUserInfo($index)">查看</a> -->
						<a href="javascript:void(0)" @click.stop="goUserUpdate($index)">编辑</a>
						<a href="javascript:void(0)" @click.stop="goUserDel(item.id)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import configUrl from '../../data/configUrl'
export default {
	props: {
		userList: {
			type: Array
		}
	},
	methods: {
		goUserInfo: function (index) {
			sessionStorage.clear()
			sessionStorage.setItem('user', JSON.stringify(this.userList[index]))
			this.$router.go({
				name: 'user',
				query: {

				}
			})
		},
		goUserUpdate: function (index) {
			sessionStorage.clear()
			sessionStorage.setItem('user', JSON.stringify(this.userList[index]))
			this.$router.go({
				name: 'user',
				query: {
					
				}
			})
		},
		goUserDel: function (id) {
			this.$dispatch('user-del', id)			
		}
	}
}
</script>
<style scoped>
	.user_list_tab {
		display: block;
		padding: 0 10px;
		background-color: #fff;
	}
	.user_list_tab_bd {
		position: relative;
		text-align: center;
		width: 1010px;
	}
	.user_list_tab_bd th {
		position: relative;
		font-size: 14px;
		font-weight: normal;
		line-height: 34px;
		background-color: #ddd;
	}
	.user_list_tab_bd .tab_content {
		line-height: 46px;
		border-bottom: 1px dashed #e6e6e6;
		background-color: #fff;
	}
	.user_list_tab_bd .tab_content:last-child {
		border-bottom: none;
	}
	.user_list_tab_bd .tab_content td a {
		display: inline-block;
		padding-left: 10px;
		padding-right: 10px;
		color: #ee3435;
	}
</style>