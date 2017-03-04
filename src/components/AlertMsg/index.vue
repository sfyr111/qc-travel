<template>
	<div class="alert" v-show="show" transition="fade" transition-mode="out-in">		
		<span class="alert_title">
			<i class="fa fa-exclamation"></i>
			{{options.title || "title"}}
		</span>
		<div class="alert_content">
			{{options.msg || "content"}}
		</div>
		<span class="alert_close" @click.stop="alertClose()">
			<i class="fa fa-close"></i>
		</span>
	</div>	
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			require: true
		},
		time: {
			type: Number,
			default: 2000
	    }
	},
	created () {
		console.log(this.show)
	},
	watch: {
		show (val) {
			if (val) {
		        clearTimeout(this.timeout)
		        this.timeout = setTimeout(() => {
		          this.show = false
		        }, this.time)
		      }
		}
	},
	methods: {
		alertClose: function () {
			this.show = false
		}
	}
}
</script>
<style scoped>
.alert {
	position: fixed;
    top: 50%;
    left: 50%;
    background: #fff;
    border: 1px solid #e9e9e9;  
    z-index: 9999;
}
.alert .alert_title{
	display: inline-block;
	padding: 5px 10px;
	background-color: #e6e6e6;
}
.alert_content {
	display: inline-block;
    padding: 5px 10px;
}
.alert_close {
	position: relative;
	display: inline-block;
	width: 8px;
	padding: 0 8px;
	cursor: pointer;
}
.alert_close .fa-close {
	position: absolute;
	top: -14px;
}
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>