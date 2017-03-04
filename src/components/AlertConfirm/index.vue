<template>
	<div class="confirm_mask" v-show="showConfirm"></div>
	<div class="confirm_modal" v-show="showConfirm">
		<div class="confirm_hd">
			<span class="hd_close" @click.stop="closeConfirm()">X</span>
		</div>
		<div class="confirm_content">
			{{contentConfirm}}
		</div>
		<div class="confirm_group">
			<button @click.stop="confirm()">申请开通白条</button>
			<button @click.stop="cannel()">取消</button>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			showConfirm: {
				type: Boolean,
				default: false
			},
			contentConfirm: {
				type: String
			}
		},
		methods: {
			closeConfirm: function () {
				this.showConfirm=false
			},
			confirm: function () {
				this.$dispatch('confirm-ok')
			},
			cannel: function () {
				this.showConfirm=false
			}
		}
	}
</script>
<style scoped>
	.confirm_mask{
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
	.confirm_modal {
		position: fixed;
	    left:50%;
	    top:50%;
	    margin-left: -200px;	    
	    margin-top: -275px;
	    width: 400px;
    	height: 240px;
	    background: #ffffff;
	    border:1px solid #e1effc;
	    z-index: 999;
	}
	.confirm_hd {
		position: relative;
		height: 36px;
		line-height: 36px;
		background-color: #e6e6e6;
	}
	.confirm_hd .hd_close {
		position: absolute;
		right: 10px;
    	top: 0px;
    	cursor: pointer;
	}
	.confirm_content{
		text-align: left;
	    font-size: 14px;
	    padding: 40px;
	}
	.confirm_group {
		text-align: center;
	}
	.confirm_group button {
		background-color: #e34449;
		color: #fff;
		border: none;
		width: 100px;
    	margin: 0 10px;
    	padding: 4px;
    	font-size: 14px;
	    line-height: 18px;
	    text-align: center;
	    border-radius: 3px;
	}
	.confirm_group button:hover {
		background-color: #b41521;
	}
</style>