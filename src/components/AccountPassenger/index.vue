<template>
	<div class="search">
		<input type="text" class="search_input" placeholder="查找出行人" v-model="userStr">
		<span class="search_del" v-if="userStr" @click="clearinput()">X</span>
		<div class="search_account">
			<label class="item" v-for="account in accountList | filterBy userStr in 'name'">
				<input type="checkbox" :checked="isLink ? account.id===linkCheckId : account.checked" @change="checkedAcc($event, account.id)">
				<span>{{account.name}}</span>
			</label>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			accountList: {
				type: Array
			},
			isLink: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				userStr: "",
				checkId: null,
				linkCheckId: null,
			}
		},
		methods: {
			checkedAcc: function (e, id) {
				// 被选中的对象
				let checkedItem = this.accountList.filter(function (item) {
						return item.id==id
					})[0]	
				if (this.isLink) {
					// 联系人是单选，此处需要重置数组	
					// 第一次选中
					if (!this.linkCheckId && typeof this.linkCheckId != "undefined" && this.linkCheckId != 0) {
						this.linkCheckId=id	
						//checkedItem.checked=true
						this.$dispatch('checked-acc-link', checkedItem, true)
						return false
					}
					if (id===this.linkCheckId) {
						//checkedItem.checked=false
						this.linkCheckId=null
						this.$dispatch('checked-acc-link', checkedItem, false)
						return false
					}
					// 不是第一次选中
					if (id!==this.linkCheckId && this.linkCheckId>=0) {
						// 已经选中过了的
						let self = this
						let hasCheckedItem = this.accountList.filter(function (item) {
							return item.id==self.linkCheckId
						})[0]
						// 清掉之前的
						// hasCheckedItem.checked=false
						this.linkCheckId=id
						// checkedItem.checked=!checkedItem.checked
						this.$dispatch('checked-acc-link', checkedItem, true)
						return false
					}						
				} else {
					let num = this.accountList.indexOf(checkedItem)
					checkedItem.checked=!checkedItem.checked
					this.checkId=id
					this.setData(num, checkedItem)
					this.$dispatch('checked-acc', checkedItem)
				}
			},
			clearinput: function () {
				this.userStr=""
			},
			// 更新vuex数据
			setData: function (index, obj) {
				let opt = {}
				opt.checked=obj.checked,
				opt.birthday=obj.birthday,
				opt.certId=obj.certId,
				opt.certtype=obj.certtype,
				opt.diaplayStatus=obj.diaplayStatus,
				opt.email=obj.email,
				opt.id=this.checkId,
				opt.name=obj.name,
				opt.phoneNum=obj.phoneNum,
				opt.psgsex=obj.psgsex,
				opt.psgtype=obj.psgtype,
				opt.userLoginId=obj.userLoginId
				this.accountList.$set(index, opt)
			}
		},
		events: {
			'clear-checked': function (id) {	
				// 父组件将要删除对象
				let unCheckedItem = this.accountList.filter(function (item) {
						return item.id==id
					})[0]
				let index = this.accountList.indexOf(unCheckedItem)
				this.checkId=id
				unCheckedItem.checked=false
				this.setData(index, unCheckedItem)
			}
		}
	}
</script>
<style scoped>
	.search {
		float: left;
		position: relative;
		display: inline-block;
		width: 650px;
		margin-left: 30px;
	}
	.search .search_input {
		display: inline-block;
		float: left;
		padding-left: 3px;
		margin-top: 4px;
		height: 20px;
		width: 98px;
		font-size: 12px;
		line-height: 20px;
	}
	.search .search_del {
		position: absolute;
		left: 90px;
		top: 0px;
		cursor: pointer;
	}
	.search .search_account {
		display: block;
		overflow: auto;
	}
	.search .search_account .item {
		float: left;
		display: inline;
	    margin-left: 13px;
	    width: 115px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #999;
	}
	.search .search_account .item input {
		vertical-align: middle;
	}
</style>