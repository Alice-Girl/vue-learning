<template>
    <div class="navbar">
        navbar标签
    </div>
</template>

<script>
    const Vue = require('vue');
    const Navbar = Vue.extend({

    });

    Vue.component('mt-navbar', Navbar);
    module.exports = Navbar;
</script>

<style>
</style>
