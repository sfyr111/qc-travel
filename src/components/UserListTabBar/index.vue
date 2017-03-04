<template>
	<div class="user_list_tab_hd fr">
		<span class="hd_tit">常用旅客</span>
		<span class="hd_bd"></span>
		<a href="javascript:void(0)" class="hd_add fr" @click.stop="goAddUser()">新增旅客</a>
	</div>
</template>
<script>
	export default {
		methods: {
			goAddUser: function () {
				sessionStorage.clear()
				this.$router.go({
					name: 'user'
				})
			}
		}
	}
</script>
<style scoped>
	.user_list_tab_hd {
		position: relative;
		padding: 10px 10px 10px 10px;
		margin-bottom: 10px;
		width: 1010px;
		background-color: #fff;
	}
	.user_list_tab_hd .hd_tit {
		display: inline-block;
		font-size: 16px;
		color: #333;
	}
	.user_list_tab_hd .hd_bd {
		display: inline-block;
		font-size: 14px;
		color: #999;
	}
	.hd_add {
		display: inline-block;
		font-size: 14px;
		color: #ee3435;
	}
</style>