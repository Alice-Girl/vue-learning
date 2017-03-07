const Vue = require('vue');
const App = require('./src/app');

new Vue({
    el: 'body',
    components: {
        'app': App
    }
});
