### Class与Style绑定
---
数据绑定的一个常见需求是操作元素的class列表和它的内联样式。
因为它们都是attribute，可以用`v-bind`处理：只需要计算出表达式最终的字符串。表达式的结果类型除了字符串之外，还可以是对象或数组。

**绑定HTML Class**
-
> 尽管可以用Mustache标签绑定class，如`class="{{className}}`，但是不推荐这种写法和`v-bind:class`混用。两者只能选其一！！

1. 对象语法  
可以传给`v-bind:class`一个对象，以动态地切换class。可以与普通的`class`特性共存。也可以绑定一个返回对象的`计算属性`。
2. 数组语法  
可以把一个数组传给`v-bind:class`，以应用一个class列表。根据条件切换列表中的class，可以用三元表达式。当多个条件class时，可以在数组语法中使用对象语法：
```
<div v-bind:class="[classA, { classB: isB, classC: isC }]">
```

**绑定内联样式**
-
1. 对象语法  
`v-bind:style`的对象语法十分直观——看着非常像CSS，其实它是一个JavaScript对象。CSS属性名可以用驼峰式或短横分隔命名：
> `v-bind:style="{color: acColor}"`  
`data: {
    acColor: 'red'
}`

直接绑定到一个样式对象通常更好，让模板更清晰：
> `v-bind:style="styleObj"`  
`data: {
    styleObj: {
        color: 'red
    }
}`
2. 数组语法  
`v-bind:style`的数组语法可以将多个样式对象应用到一个元素上：
> `v-bind:style="[styleObjA, styleObjB]"`
3. 自动添加前缀  
当`v-bind:style`使用需要厂商前缀的CSS属性时，如`transform`，Vue.js会自动侦测并添加相应的前缀。
