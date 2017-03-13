### 仿美团移动端实现基于vuejs1.0

安装依赖

```
npm install
```

编译

```
npm run build
```

热更新

```
npm run dev
```

package.json中的dev script可以是webpack-dev-server --inline --hot，这样可以不再使用server.js

项目目录：(组件目录以页面为单位划分)

```
-src
    -components    // 组件
        -app.vue    // 根组件
        -index      // 首页
    -images
    -index.html    // 渲染模板
-app.js        // 入口文件
-server.js     // server服务
-package.json    // 项目配置文件
-webpack.config.js    // webpack配置文件
```
