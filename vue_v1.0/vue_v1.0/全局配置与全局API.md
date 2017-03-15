### 全局配置与全局API
---

#### 全局配置

    Vue.config是一个对象，包含Vue的全局配置，在启动应用之前可以修改以下属性：
    ```
    // 是否开启调试模式
    Vue.config.debug = true/false;   
    // 设置文本插值界定符 
    Vue.config.delimiters = ['${', '}'];  
    // 设置原生HTML插值界定符  
    Vue.config.unsafeDelimiters = ['!{', '}'];    
    // 是否取消 Vue.js 所有的日志与警告。
    Vue.config.silent = true/false;
    // 是否关闭异步模式
    Vue.config.async = false/true；
    // 是否允许vue-tools检查代码
    Vue.config.devtools = true;
    ```
    1. debug(只有开发版本可以使用调试模块)
        - 类型：Boolean
        - 默认值：false

    调试模式下打印所有警告的栈追踪；所有锚节点以注释节点显示在DOM中，更易于检查渲染结果的结构。

    2. delimiters
        - 类型：`Array<String>`
        - 默认值：['{{', '}}']
    
    修改文本插值的界定符。值为只包含两个字符串元素的数组。

    3. unsafeDelimiters
        - 类型： `Array<String>`
        - 默认值：['{{{', '}}}']

    修改原生HTML插值的界定符。值为只包含两个字符串元素的数组。

    4. silent
        - 类型：Boolean
        - 默认值： true
    
    取消Vue.js所有的日志与警告。

    5. async
        - 类型：Boolean
        - 默认值：true
    
    如果关闭了异步模式，Vue在检测到数据变化时同步更新DOM。某些情况下有助于调试，但也可能导致性能下降，并且影响watcher回调的调用顺序。async:false不推荐用在生产环境中。

    6. devtools
        - 类型：Boolean
        - 默认值：true(生产版本为false)

    配置是否允许vue-devtools检查代码。`devtools: process.env.NODE_ENV !== 'production'`

#### 全局API

    1. Vue.extend(options)
    
        - 参数：[Object]
        - 用法：创建基础Vue构造器的“子类”。参数是一个对象，包含组件选项。
           特例——el和data选项，在Vue.extend()中必须是函数。
        - 例子：
        // el
        <div id="mount-point"></div>
        // 创建可服用的构造器
        var Profile = Vue.extend({
            template: '<p>{{ firstname }} {{ lastname }} {{ sex }}</p>'
        });
        // 创建一个Profile实例
        var profile = new Profile({
            data: {
                firstname: 'John',
                lastname: 'White',
                sex: 'man'
            }
        });
        // 挂载到元素上
        profile.$mount('#mount-point');

        
        /********* Vue 组件 *********/
        // Vue子组件，通过Vue.extend()创建一个组件构造器
        var SubComponent = Vue.extend({...});
        // 全局注册子组件，Vue.component(tag, constructor)，自定义tag不强制要求遵循W3C规则(小写，包含一个短杠)
        Vue.component('sub-component', SubComponent);

    2. Vue.nextTick(callback)
        - 参数：Function
        - 用法：延迟回调在下次DOM更新循环之后执行。修改数据之后立即使用这个方法，等待DOM更新。
        - 例子：
        // 修改数据
        vm.msg = 'Hello';
        // DOM没有更新
        Vue.nextTick(function() {
            // DOM更新了
        });

    3. Vue.set(object, key, value)
        - 参数：Object, String, *
        - 返回值：设置的值
        - 用法：设置对象的属性。如果对象是响应的，将触发视图更新。主要用于解决不能检测到属性添加的限制。

    4. Vue.delete(object, key)
        - 参数：Object, String
        - 用法：删除对象的属性。如果对象是响应的，将触发视图更新。主要用于解决不能检测到属性删除的限制。

    5. Vue.directive(id, [definition])
        - 参数：String, [Function|Object]
        - 用法：注册或获取全局指令。
        - 例子：
        // 注册指令
        Vue.directive('my-directive', {
            // 第一次绑定到元素的准备工作
            bind: function() {},
            // 在绑定到元素后立即以初始值第一次调用，然后每次变化都会调用update
            update: function() {},
            // 销毁前的清理工作
            unbind: function() {}
        });
        // 注册，传入一个函数
        Vue.directive('my-directive', function() {// 这里调用update});
        // getter，返回已注册的指令
        var myDirective = Vue.directive('my-directive');

    6. Vue.elementDirective(id, [definition])
        - 参数：String, Object
        - 用法：注册或获取全局的元素指令
        - 例子：
        // 注册
        Vue.elementDirective('my-element', {
            bind: function() {},
            // 没有使用update
            unbind: function() {}
        });
        // getter, 返回已注册的元素指令
        var myDirective = Vue.elementDirective('my-element');

    7. Vue.filter(id, [definition])
        - 参数：String, [Function|Object]
        - 用法：注册或获取全局过滤器
        - 例子：
        // 注册
        Vue.filter('my-filter', function(value) {
            // 返回处理后的值
        });
        // 双向过滤器
        Vue.filter('my-filter', {
            read: function() {},
            write: function() {}
        });
        // getter, 返回已注册的指令
        var myFilter = Vue.filter('my-filter');

    8. Vue.component(id, [definition])
        - 参数：String, [Function|Object]
        - 用法：注册或获取全局组件
        - 例子：
        // 注册组件，传入一个扩展的构造器
        Vue.component('my-component', Vue.extend({/* ... */});
        // 注册组件，传入一个选项对象(自动调用Vue.extend)
        Vue.component('my-component', {/* ... */});
        // 获取注册的组件(始终返回构造器)    
        var MyComponent = Vue.component('my-component');
        
    10. Vue.transition(id, [hoooks])
        - 参数：String, Object
        - 用法：注册或获取全局的过渡钩子对象
        - 例子：
        // 注册
        Vue.transition('fade', {
            enter: function() {},
            leave: function() {}
        });
        // 获取注册的钩子
        var fadeTransition = Vue.transition('fade');

    11. Vue.partial(id, [partial])
        - 参数：String, String
        - 用法：注册或获取全局partial
        - 例子：
        // 注册
        Vue.partial('my-partial', '<div>partial</div>);
        // 获取注册的partial
        var myPartial = Vue.partial('my-partial');

    12. Vue.use(plugin, [options])
        - 参数：[Object|Function], Object
        - 用法：安装Vue.js插件。如果插件是一个对象，必须有一个install方法。如果它是一个函数，它会被作为安装方法。安装方法以Vue为参数。

    13. Vue.mixin(mixin)
        - 参数：Object
        - 用法：全局应用一个混合，将影响所有Vue实例。插件作者可以用它向组件注入自定义逻辑。`不推荐用在应用代码中`。