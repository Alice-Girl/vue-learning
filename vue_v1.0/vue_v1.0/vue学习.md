## vuejs1.0学习
---
以下内容整理自vuejs官网。

Vue.js是一个构建数据驱动的web界面的库，目标是通过尽可能简单的API实现`响应的数据绑定`和`组合的视图组件`。Vue本身只聚焦于视图层，易学且易与其它库或已有项目整合。与其相关工具和支持库一起使用时，能完美驱动复杂的单页面应用。

#### 什么是MVVM？
MVVM是Model-View-ViewModel的缩写，它是一种基于前端开发的架构模式，其核心是提供View和ViewModel的双向数据绑定，这使得ViewModel的状态改变可以自动传递给View，即所谓的数据双向绑定。
MVVM由Model、View、ViewModel三部分组成，Model层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑，View代表ui组件，它负责将数据模型转化成UI展现出来，ViewModel是一个同步View和Model的对象。在MVVM架构下，Model和View不直接交互，而是通过ViewModel。Model与ViewModel的交互是双向的，因此View数据的变化会同步到Model中，而Model数据的变化也会立即反映到View上。开发者只需关注业务逻辑，而不需要手动操作DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由MVVM统一管理。

MVC的痛点：
1. 开发者在代码中大量调用相同的DOM API，处理繁琐，操作冗余，使得代码难以维护；
2. 大量的DOM操作使页面渲染性能降低，加载速度变慢，影响用户体验；
3. 当Model频繁发生改变时，开发者需要主动更新View，当用户操作导致Model发生变化时，开发者同样需要将变化的数据同步到Model中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

MVVM的出现，解决了MVC的这三个问题。

#### 与其他框架对比

1）Angular 
    - API与设计比Angular简单
    - 提供更灵活开放的解决方案，允许以希望的方式组织程序，而不是任何时候都必须遵循Angluar制定的规则。Vue仅是视图层，因此可以将其嵌入现有的页面而不一定做庞大的单页应用，Vue默认不提供路由和Ajax功能。
    - 都使用双向绑定,Vue默认单向绑定，数据从父组件单向传给子组件。在大型应用中使用单向绑定让数据流更容易理解。
    - Vue中指令和组件分的更清晰。指令只封装DOM操作，而组件代表一个自给自足的独立单元——有自己的视图和数据逻辑，ng有不少相混的地方。
    - Vue有更好的性能，易于优化，因为它不使用脏检查。ng中watcher越多会越慢，因为作用域内每次变化，所有的watcher都要重新计算。并且watcher如果触发另一个更新，脏检查循环可能运行多次。Vue使用基于依赖追踪的观察系统并且异步队列更新，所有的数据变化都是独立触发，除非它们之间有明确的依赖关系。

2）React
    - 都提供数据驱动、可组合搭建的视图组件。
    - 内部实现本质上不同，React渲染建立在虚拟DOM上(一种在内存中描述DOM树状态的数据结构。当状态发生变化时，React重新渲染，比较计算之后给真实的DOM打补丁)。
    - 虚拟DOM提供了一个函数式的方法描述视图，Vue.js不使用虚拟DOM而是使用真实的DOM作为模板，数据绑定到真实节点。Vue.js的应用环境必须提供DOM。
    - API方面，React渲染函数常常包含大量的逻辑，看着更像是程序片段而不是界面的视觉呈现。Vue.js通过在模板中加入一个轻量级的DSL(指令系统)，换来一个依旧直观的模板，且能将逻辑封装进指令和过滤器中。

#### 响应的数据绑定
Vue.js的核心是一个响应的数据绑定系统，使数据与DOM保持同步变得简单。Vue.js拥抱`数据驱动视图`的概念，意味着在普通HTML模板中使用特殊的语法将DOM绑定到底层数据。一旦创建了绑定，DOM将与数据保持同步，数据更改，DOM相应更新。这使代码更易撰写、理解与维护。

模型：

```
            --------------
           |  ViewModel   |
 ------    |--------------|     ---------
|      |---|-DOM Listener-|--->|         |
| View |   |              |    |  Model  |
|      |   |              |    |(Plain js|
| (DOM)|<--|-Data Bindings|----| Objects |
 ------    |    (Vue)     |     ---------
            --------------
```
#### 组件系统
组件系统是Vue.js的另一个重要概念，它提供了一种抽象，因此可以用独立可复用的小组件来构建大型应用。

Vue.js组件非常类似于自定义元素(Web组件规范的一部分)，实际上Vue.js的组件语法参考了该规范，如实现了Slot API与is特性，不同点：
    - 没有浏览器实现web组件规范，而Vue.js组件不需要任何补丁，并且在所有支持的浏览器(IE9+)下表现一致。必要时，Vue.js组件也可以放在原生自定义元素内。
    - Vue.js组件提供了原生自定义元素所不具备的一些重要功能，比如组件间的数据流、自定义事件系统以及动态、带特效的组件替换。
组件系统是用Vue.js构建大型应用的基础。

#### Vue生命周期
Vue实例在创建时有一系列初始化步骤——建立数据观察、编译模板、创建必要的数据绑定。在此过程中，将调用一些生命周期钩子，给自定义逻辑提供运行机会。
生命周期钩子的`this`指向调用它的Vue实例。Vue.js没有“控制器”的概念，组件的自定义逻辑可以分割在这些钩子中。

```
init        // 实例化开始初始化时同步调用，数据观测、事件和watcher都尚未初始化
created     // 实例创建之后同步调用，实例已经结束解析选项，数据绑定、计算属性、方法、watcher/事件回调已建立。DOM编译还没开始，$el不存在。
beforeCompile    // 编译开始前调用
compiled    // 编译结束后调用，所有指令已生效，因而数据的变化将触发DOM更新，但不担保$el已插入文档。
ready       // 编译结束和$el第一次插入文档之后调用，如在第一次attached钩子后调用。必须由Vue插入(如vm.$appendTo()等方法或指令更新)才触发ready钩子。
attached    // 在vm.$el插入DOM时调用，必须是由指令或实例方法(如$appendTo())插入，直接操作vm.$el不会触发这个钩子。
detached    // 在vm.$el从DOM中删除时调用，必须是由指令或实例方法删除，直接操作vm.$el不会触发这个钩子。
beforeDestroy    // 在开始销毁实例时调用，此时实例仍然有功能
destroyed    // 在实例被销毁之后调用，此时所有的绑定和实例的指令已经解绑，所有的子实例被销毁。如有离开过渡，destroyed钩子在过渡完成之后调用。
```
生命周期图示：
```
                new Vue()
                    |
                 数据观测
                    |
                事件初始化
    created<--------|
                "el"存在? ----否-----
                    |               |
                    是        vm.$mount(el)
                    |               |
              "tempalte"存在?<-------
    beforeCompile<--|
        --------------------------
       |是                       否|
 ________________           ____________
|  编译template    |         |  在合适的位置 |
|用template替代"el"|         | 用"el"作为   |
|                 |         | template编译 |
 ----------------           ------------
       |__________________________|
                    |
      compiled<-----|
                 已插入文档?---否--
                    |             |
                    是          第一次
                    |          插入文档
       ready<-----Ready<-----------
                    |
              vm.$destroy()
    beforeDestroy<--|
               销毁所有绑定
               和实例指令及
               所有子实例
                    |
    destroyed<---Destroyed
```

测试结果：
```
init: this.msg, this.$el =>  undefined  null
created: this.msg, this.$el =>  Hello Vuejs 1.0  null
beforeCompile: this.msg, this.$el =>  Hello Vuejs 1.0  <div id=​"app">​…​</div>​
compiled: this.msg, this.$el =>  Hello Vuejs 1.0  <div id=​"app">​…​</div>​
attached: this.msg, this.$el =>  Hello Vuejs 1.0  <div id=​"app">​…​</div>​
ready: this.msg, this.$el =>  Hello Vuejs 1.0  <div id=​"app">​…​</div>​
```
#### 全局配置
Vue.config是一个对象，包含Vue的全局配置，可在启动应用之前修改：
```
- debug    Boolean，默认值false,在调试模式中，Vue会为所有的警告打印栈追踪，把所有的锚节点以注释节点显示在DOM中，易于检查渲染结果的结构。只在开发版本使用调试模式。
- delimiters    Array<string>，默认值["{{", "}}"],修改文本插值界定符
- unsafeDelimites    Array<string>,默认值["{{{", "}}}"]，修改原生HTML插值的界定符
- silent    Boolean, 默认值false，取消Vuejs所有的日志与警告
- async    Boolean，默认值true，异步模式设置
- devtools    Boolean，默认值true(生产版本false)，是否允许vue-devtools检查代码
----------------------------------------------------------------------------
Vue.config.debug = true;    // 开启调试功能
// ES6模板字符串
Vue.config.delimiters = ['${', '}'];    // 修改文本插值的界定符为${ msg }
Vue.config.UnsafeDelimiters = ['{!!', '!!}'];    // 修改原生HTML插值的界定符为{!! html !!}
Vue.config.silent = true;    // 取消Vuejs所有的日志与警告
Vue.config.async = false;    // 关闭异步模式，Vue在检测到数据变化时同步更新DOM。在有些情况下有助于调试，但也可能导致性能下降，并且影响watcher回调的调用顺序。不推荐用在生产环境中。
// 在加载Vue之后立即同步的设置
Vue.config.devtools = true;    //允许vue-devtools检查代码。生产版本设为true可以启用检查。开发版本默认为true，生产版本默认为false。
```

#### 全局API
1. Vue.extend(options)

    创建基础Vue构造器的“子类”，参数是一个对象，包含组件选项。需要注意的特例是el和data选项，在Vue.extend()中必须是函数。

2. Vue.nextTick(callback)

    延迟回调在下次DOM更新循环之后执行，参数是一个函数。在修改数据之后立即使用这个方法，等待DOM更新。

3. Vue.set(object, key, value)
    
    返回设置的值，参数分别是对象，String，任意类型。设置对象的属性，如果对象是响应的，将触发视图更新，这个方法主要用于解决不能检测到属性添加的限制。

4. Vue.delete(object, key)

    删除对象的属性，参数分别是对象，String，与set相对应。如果对象是响应的，将触发视图更新，这个方法主要用于解决不能检测到属性删除的限制。

5. Vue.directive(id, [definition])

    注册或获取全局指令，参数String，[Function|Object]。注册自定义指令时可以使用。

6. Vue.elementDirective(id, [definition])

    注册或获取全局的元素指令，参数String，Object。

7. Vue.filter(id, [definition])
    
    注册或获取全局过滤器，参数String, [Function|Object]。

8. Vue.component(id, [definition])
    
    注册或获取全局组件，参数String, [Function|Object]。这个很常用！

9. Vue.transition(id, [hooks])

    注册或获取全局的过渡钩子对象，参数String, Object。

10. Vue.partial(id, [partial])

    注册或获取全局的特殊元素，参数String，String。

11. Vue.use(plugin, [options])

    安装Vue.js插件，参数[Object|Function], Object。如果插件是一个对象，必须有一个install方法；如果是一个函数，会被作为安装方法，安装方法以Vue为参数。

12. Vue.mixin(mixin)

    全局应用一个混合，将影响所有Vue实例，参数Object。插件作者可以用它向组件注入自定义逻辑，不推荐用在应用代码中。


#### 构造器
Vue.js应用的起步都是通过构造函数Vue创建的Vue根实例：`var vm = new Vue({// 选项})`。Vue实例其实是MVVM模式中描述的ViewModel，实例化时需要传入选项对象，可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
扩展Vue构造器，可以实现用预定义选项创建可复用的组件构造器：
```
var MyComponent = Vue.extend({// 扩展选项});
// 所有'MyComponent'实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent();
```
所有的Vue.js组件其实都是被扩展的Vue实例，尽管可以命令式地创建扩展实例，但多数情况下将组件构造器注册为自定义元素，然后声明式地用在模板中。

#### 属性与方法
每个Vue实例会代理其data对象里所有的属性，只有这些被代理的属性是响应的。在实例创建之后添加到实例上的新的属性，不会触发视图更新。Vue实例暴露的实例属性和方法有前缀`$`，以便与代理的数据属性区分。

#### 实例
```
- 属性
    - vm.$data    Vue实例观察的数据对象，可以用一个新的对象替换，实例代理它的数据对象的属性。
    - vm.$el    Vue实例的挂载元素。对于片段实例，返回一个锚节点，指示片段开始的位置。
    - vm.options    当前实例初始化选项。
    - vm.$parent    父实例。
    - vm.$root    当前组件树的根Vue实例，如果当前实例没有父实例，将是自身。
    - vm.$children    当前实例的直接子组件。
    - vm.$refs    一个对象，包含注册有v-ref的子组件。
    - vm.$els    一个对象，包含注册有v-el的DOM元素。
- 方法
    - 数据
        - vm.$watch(expOrFn, callback,[options])    观察Vue实例的一个表达式或计算函数，回调的参数为新值和旧值，表达式可以是某个键路径或任意合法绑定表达式。【在修改(不是替换)对象或数组时，旧值将与新值相同，因为它们索引同一个对象/数组。Vue不会保留修改之前值的副本】
        - vm.$get(expression)    从Vue实例获取指定表达式的值。如果表达式抛出错误，则取消错误并返回undefined。
        - vm.$set(keypath, value)    设置Vue实例的属性值。
        - vm.$delete(key)    删除Vue实例上的顶级属性，强制digest循环，不推荐使用。
        - vm.$eval(expression)    计算当前实例上的合法绑定表达式，表达式可以包含过滤器。
        - vm.$interpolate(tempalteString)    计算模板，模板包含Mustache标签，该方法只是简单计算插值，模板内的指令将被忽略。
        - vm.$log([keypath])    打印当前实例的数据。
    - 事件
        - vm.$on(event, callback)    监听当前实例上的自定义事件。
        - vm.$once(event, callback)    监听一个自定义事件，但是只触发一次，在第一次触发后删除监听器。
        - vm.$off([event, callback])    删除事件监听器
        - vm.$emit(event, [...args])    触发当前实例上的事件
        - vm.$dispatch(event, [...args])    派发事件
        - vm.$broadcast(event, [...args])    广播事件
    - DOM
        - vm.$appendTo(elementOrSeletor, [callback])    将实例的DOM元素或片段插入目标元素内。
        - vm.$before(elementOrSelector, [callback])    将实例DOM元素或片段插入目标元素的前面。
        - vm.$after(elementOrSelector, [callback])    将实例DOM元素或片段插入目标元素的后面。
        - vm.$remove([callback])    从DOM中删除实例的DOM元素或片段
        - vm.$nextTick(callback)    将回调延迟到下次DOM更新循环之后执行。
    - 生命周期
        - vm.$mount([elementOrSelector])    如果Vue实例在实例化时没有收到el选项，则它处于未挂载状态，没有关联的DOM元素或片段，可以使用vm.$mount手动开始挂载/编译未挂在的实例。
        - vm.$destroy([remove])    完全销毁实例。
```

#### 选项
```
- 数据
    - data    Vue实例的数据对象
    - props    包含一些期望使用父组件数据属性的特性。
    - propsData    在创建实例的过程传递props。
    - computed    实例计算属性
    - methods    实例方法
    - watch    一个对象，键是观察表达式，值是对应回调。
- DOM
    - el    为实例提供挂载元素
    - template    实例模板
    - replace    决定是否用模板替换挂载元素。
- 生命周期钩子
- 资源
- 杂项
    - parent    指定实例的父实例
    - events    一个对象，键是监听的事件，值是相应的回调。
    - mixins    一个数组，包含混合对象。
    - name    允许组件在它的模板内递归的调用它自己。
    - extends    声明式的扩展另一个组件，而不必使用Vue.extend，主要作用是更容易扩展单文件组件。
```

#### 指令

```
- v-text    String，更新元素的文本内容。等同于{{msg}},在内部，文本插值也被编译成文本节点的v-text指令。这个指令需要一个包装元素，不过性能稍好并且避免FOUC(文档样式闪烁)。
- v-html    String，更新元素的原生HTML。等同于{{{html}}},内容按普通HTML插入——忽略数据绑定。如果想复用模板片段，应当使用partials。网站上动态渲染任意HTML是非常危险的，因为容易导致XSS攻击。【只在可信内容上使用v-html，永不用在用户提交的内容上。】
- v-if    根据表达式值的真假条件渲染。在切换时元素及它的数据绑定/组件被销毁重建。如果元素是template，将提出它的内容作为条件块。
- v-show    根据表达式值的真假切换元素的display属性，如果有过渡将触发。
- v-else    限制：前一兄弟元素必须有v-if或v-show
- v-for    Array|Object|Number|String，基于源数据将元素或模板块重复。指令的值必须使用特定语法alias (in|of) expression为当前遍历元素提供别名。1.0.17+支持of。也可以是为数组索引指定别名（如果值是对象可以对键指定别名）。
- v-on    缩写@，绑定事件监听器，事件类型由参数指定，表达式可以是一个方法的名字或一个内联语句，没有修饰符也可以省略。用在普通元素上时，只能监听原生DOM事件；用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
- v-bind    缩写：，动态绑定一个或多个attribute，或一个组件prop到表达式。绑定class或style时，支持其他类型的值，如数组或对象。绑定prop时，prop必须在子组件中声明，可以使用修饰符指定不同类型的绑定类型。没有参数时，可以绑定到一个对象，此时class和style绑定不支持数组和对象。
- v-model    在表单控件上创建双向绑定。
- v-ref    在父组件上注册一个子组件的索引，便于直接访问，不需要表达式，但必须提供参数id，可以通过父组件的$refs访问子组件。
- v-el    为DOM元素注册一个索引，方便通过所属实例的$els访问这个元素。
- v-pre    跳过编译这个元素及其子元素，可以用来显示原始Mustache标签，跳过大量没有指令的节点会加快编译。
- v-cloak    保持在元素上直到关联实例结束编译，和CSS规则如display:none一起用时，可以以藏未编译的Mustache标签直到实例准备完毕。
```

#### 特殊元素
```
- component    另一种调用组件的语法，主要和is特性一起用于动态组件。
- slot    作为组件模板中的内容分发插槽。这个元素自身将被替换。有name特性的slot称为具名slot，有slot特性的内容将分发到名字相匹配的具名slot。
- partial    已注册的partial的插槽，partial在插入时被Vue编译。需要指定name特性，<partial>元素本身将被替换。
```

#### 过滤器
```
- capitalize    首字母大写
- uppercase    全部转换成大写
- lowercase    全部转换成小写
- currency    在数字前添加货币符号
- pluralize    复数形式。如果只有一个参数，复数形式只是简单的在末尾添加一个s；如果多个参数，参数被当作字符串数组，对应前面的复数词；如果值的个数多于参数的个数，多出的使用最后一个参数。
- json    输出经JSON.stringify处理后的结果，而不是输出toString的结果。
- debounce    包装处理器，延迟执行x ms，默认延迟300ms。包装后的处理器在调用之后至少将延迟x ms，如果在延迟结束前再次调用，延迟时长重置为x ms。
- limitBy    限制数组为开始N个元素，N由第一个参数指定，第二个参数是可选的，指定开始的偏移量。
- filterBy    返回过滤后的数组，第一个参数可以是字符串或函数。
- orderBy    返回排序后的数组
```

#### 数组扩展方法
Vuejs在Array.prototype上添加了两个方法，以方便常见的数组操作，并且能触发视图更新。

```
- array.$set(index, value)    通过索引设置数组元素并触发视图更新
- array.$remove（reference)    通过索引删除数组元素并触发视图更新，这个方法先在数组中搜索这个元素，如果找到则调用array.slice(index, 1)。
```