import vue from 'vue'

export default vue.directive('search-account', {
    params: ['str'],
    str: "",
    timer: null,
    result: function () {
        console.log(this.el.value)
    },
    bind: function () {
        this.str = this.params.str
        let self = this
        setTimeout(function () {
            document.addEventListener('keyup', self.result.bind(self), false)
        }, 2000);        
    },
    unbind: function () {
        console.log('unbind')
        document.removeEventListener('keyup', this.result, false);
    }
})