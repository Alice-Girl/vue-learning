<template>
    <div class="index">
        <z-header :hmsg = "hms"></z-header>
        <a href="#" class="weui_btn weui_btn_primary">按钮</a>
        <z-footer :fmsg = "fms"></z-footer>
    </div>
</template>
<script>
    var Vue = require('vue');
    var Header = require('./components/header');
    var Footer = require('./components/footer');

    var App = Vue.extend({
        components: {
            'z-header': Header,
            'z-footer': Footer
        },
        data: function() {
            return {
                message: 'Hello Vue 1.0',
                hms: 'This is Header',
                fms: [
                    { name: 'tab1' },
                    { name: 'tab2' },
                    { name: 'tab3' }
                ]
            }
        }
    });

    Vue.component('app', App);
    module.exports = App;
</script>
<style>
</style>
