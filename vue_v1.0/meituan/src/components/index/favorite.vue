<template>
    <div class="favorite">
        favorite标签
    </div>
</template>

<script>
    const Vue = require('vue');
    const Favorite = Vue.extend({

    });

    Vue.component('mt-favorite', Favorite);
    module.exports = Favorite;
</script>

<style>
</style>
