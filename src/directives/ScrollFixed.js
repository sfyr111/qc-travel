import vue from 'vue'
import $ from 'jquery'


export default vue.directive('scroll-fixed', {
    params: ['throttle', 'distance'],
    throttle: 0,
    distance: 0,
    timer: null,
    checkBottom: function () {
        var self = this
        var el = $(this.el)
        if (!this.el) {
            return
        }
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        var elOffTop = el.offset().top

        this.vm && self.vm.$dispatch('on-scroll', scrollTop);
        //滚动到底部
        if (scrollTop >= elOffTop) {
            
            el.find('.is_need_fixed').addClass('fixed')
        } else {
            el.find('.is_need_fixed').removeClass('fixed')
        }

    },
    bind: function () {
        this.throttle = this.params.throttle || 300
        this.distance = this.params.distance || 30
        document.addEventListener('scroll', this.checkBottom.bind(this), false)
    },
    unbind: function () {
        console.log('unbind')
        document.removeEventListener('scroll', this.checkBottom, false);
    }
})