<template>
    <div class="footer">
        <ul>
            <li v-for="item in fmsg">{{ item.name }}</li>
        </ul>
    </div>
</template>
<script>
    var Vue = require('vue');

    var Footer = Vue.extend({
        props: {
            fmsg: Array
        }
    });

    Vue.component('z-footer', Footer);
    module.exports = Footer;
</script>
<style>
	.footer {
		color: #f00;	
	}
</style>