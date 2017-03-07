<template>
    <div id="app">
        <mt-header></mt-header>
        <mt-banner></mt-banner>
        <mt-classify></mt-classify>
        <mt-hot></mt-hot>
        <mt-favorite></mt-favorite>
        <mt-navbar></mt-navbar>
        <mt-download></mt-download>
    </div>
</template>

<script>
    const Vue = require('vue');
    const Header = require('./header');
    const Banner = require('./banner');
    const Classify = require('./classify');
    const Hot = require('./hot');
    const Favorite = require('./favorite');
    const Navbar = require('./navbar');
    const Download = require('./download');

    const App = Vue.extend({
        components: {
            'mt-header': Header,
            'mt-banner': Banner,
            'mt-classify': Classify,
            'mt-hot': Hot,
            'mt-favorite': Favorite,
            'mt-navbar': Navbar,
            'mt-download': Download
        }
    });

    Vue.component('mt-app', App);
    module.exports = App;
</script>

<style>
</style>
