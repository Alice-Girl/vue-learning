/**
 * Created by znyaiw on 2016/11/17.
 */
var Vue =  require('vue');
var App = require('./app.vue');

new Vue({
   el: 'body',
    components: {
        'app': App
    }
});
