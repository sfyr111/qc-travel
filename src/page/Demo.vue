<template>
	<input type="text" v-model="name">
	<span class="123">{{name | pwdlevel}}</span>
</template>
<script>
import Demo from '../directives/demo'
import pwdLevel from '../filter/pwdLevel'
export default {
	data () {
		return {
			name: ''
		}
	},
	events: {
		'validate': function () {
			// alert(123)
		}
	}
}
</script>