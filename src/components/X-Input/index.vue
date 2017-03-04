<template>
	<input :class="classStr" v-model="value" :placeholder="placeholder">
	<span class="error" v-text=""></span>
</template>
<script>
export default {
	props: {
		placeholder: String,
		field: String,
		classStr: String,
		value: [String, Number]
	},
	created: function () {
		console.log(this.value)
	}
}
</script>