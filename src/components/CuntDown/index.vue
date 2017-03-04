<template>
	<input class="getBtn" type="button" name="" :value="countDownText" @click.stop="getMsg()">
</template>
<script>
export default {
	data: function () {
		return {
			interval: null,
			curCount: 60,
			stopTimer: false,
			countDownText: "发送短信验证码",
			hasGet: false,
		}
	},
	methods: {
		update () {
	        if(this.curCount <= 0) {
	            this.curCount = 60	
	            this.countDownText = "重新发送"  
	            clearInterval(this.Interval)
	            this.stopTimer = false
	            this.hasGet = false
	        } else {
                this.curCount--;
                this.countDownText = this.curCount + "秒后重试"            
            }
        },
		getMsg: function() {
			if (this.hasGet) {
				return
			}
			this.$dispatch('get-msg')
		}
	},
	events: {
		'start-timer': function () {
			this.hasGet = true
			if(this.stopTimer == false) {
                this.Interval = setInterval(this.update,1000); 
            }else{
                clearInterval(this.Interval); 
            }
		}
	}
}
</script>
<style scoped>
.getBtn{
    width: 110px;
    background: #fff;
    border:1px solid #32a9fb;
    color:#32a9fb;
}
</style>