import vue from 'vue'

export default vue.directive('demo', {
	params: ['a'],
	paramWatchers: {
	    a: function (val, oldVal) {
	      console.log(val+'&'+oldVal)

	    }
	  },
	validate () {
		let self = this
		self.vm.$dispatch('validate')
	},
	bind: function () {
		this.validate() 
		console.log(this.params.a)
	},
	unbind: function () {
		console.log('unbind')
	}
})