<template>
<div class="loading_container">
	<span>
		<img src="../../assets/loading.gif" alt="loading">
	</span>
</div>
</template>

<style>
.loading_container{
	width: 100%;
	height: 230px;
	position: relative;
}
.loading_container span{
	padding-top: 22px;
	display: block;
	width: 242px;
	height: 58px;
	line-height: 80px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -121px;
	margin-top: -40px;
	text-align: center;
}
.loading_container span img{
	width: 114px;
	height: 16px;
	margin: 0 auto;
}
</style>