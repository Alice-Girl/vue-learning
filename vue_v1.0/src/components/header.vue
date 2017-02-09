<template>
    <div class="header">{{ hmsg }}</div>
</template>
<script>
    var Vue = require('vue');

    var Header = Vue.extend({
        props: {
            hmsg: String
        }
    });

    Vue.component('z-header', Header);
    module.exports = Header;
</script>
<style>
	.header {
		color: #0ff;
	}
</style>