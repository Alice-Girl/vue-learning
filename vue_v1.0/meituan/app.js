const Vue = require('vue');
const App = require('./src/components/app');

new Vue({
    el: 'body',
    components: {
        'app': App
    }
});
