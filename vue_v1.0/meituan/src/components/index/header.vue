<template>
    <header>
        {{ msg }}标签
    </header>
</template>

<script>
    const Vue = require('vue');
    const Header = Vue.extend({
        data: function() {
            return {
                msg: 'header'
            }
        }
    });

    Vue.component('mt-header', Header);
    module.exports = Header;
</script>

<style>
</style>
