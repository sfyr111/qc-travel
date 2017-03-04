<template>
    <div class="tips" v-show="show" :style="{'left':x+'px','top':y+'px'}">
        <span class="name">转签规定</span>
        <span>{{ticketTurn}}</span>
        <span class="name">改签规定</span>
        <span>{{ticketChange}}</span>
        <span class="name">退票规定</span>
        <span>{{ticketBack}}</span>
        <i class="fa fa-close" @click.stop="alertClose()"></i>
    </div>
</template>
<script>
export default {
    props: {
        ticketTurn: {
            type: String,
            default: ''
        },
        ticketChange: {
            type: String,
            default: ''
        },
        ticketBack: {
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
        border: 1px solid #deeaf9;
        background-color: #fff;
        width: 300px;
        padding: 10px;
        text-align: left;
	}
    .tips span {
        color: #666;
        padding: 5px 0px;
        display: block;
    }
    .tips .fa-close {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
    }
    .tips .name {
        color: #333;
        font-size: 14px;
    }
</style>