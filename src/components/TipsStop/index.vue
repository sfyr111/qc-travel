<template>
    <div class="tips" v-show="show" :style="{'left':x+'px','top':y+'px'}">
        <div class="head">
            <span class="name">经停城市</span>
            <span class="name">经停时间</span>
            <span class="name">出发时间</span>
        </div>
        <div class="body">
            <span>{{stopCityCn}}</span>
            <span>{{arrTime}}</span>
            <span>{{takeoffTime}}</span>
        </div>
        <i class="fa fa-close" @click.stop="alertClose()"></i>
    </div>
</template>
<script>
export default {
    props: {
        arrTime: {
            type: String,
            default: ''
        },
        stopCityCn: {
            type: String,
            default: ''
        },
        takeoffTime: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number,
            default: 5000
        },
        x: {
            type: Number
        },
        y: {
            type: Number
        }
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
	.tips{		
		position: absolute;
        border: 1px solid #31aaf8;
        background-color: #fff;
        padding: 10px;
        text-align: left;
	}
    .tips span {
        display: inline-block;
        width: 90px;
        text-align: center;
        color: #666;
        padding: 5px 0px;
    }
    .tips .fa-close {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
    }
    .tips .name {
        color: #333;
    }
</style>