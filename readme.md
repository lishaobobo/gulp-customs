### 一、 功能说明
1. 可将公共部分如 header 导航放入 include 文件夹，通过语法 `@@include('./include/head.html')` 在所需文件中引入
2. gulp 实现实时刷新，在保存时便编译打包文件并刷新浏览器
3. 精灵图片中，各自单独的图片需放在 `src/images/sprite` 目录下，最后打包压缩进入`dis/images/`目录下，其 所需css文件已合并进入
common.css 文件当中，无需再次引入
4. js 支持部分 ES6 语法，通过 gulp-babel 等插件可将 ES6 语法编译成 ES5 语法，并编译打包进 dist 目录
5. css 支持 less, scss, css 三种格式，文件 需放在 `src/css` 目录下，在 `src/css/css` 目录下为编译打包 的 less、scss 等文件。此处css文件将被加上兼容性后打包进入 `dist/css` 目录，命名为 `common.css`，故在自己命名新的css文件的时候无需在此引入。

### 二、注意事项
1. gulp 中的文件监视 需要事先有此种类型的文件。所以在 css 文件夹中，若无此类型的文件，是无法监视的，也就造成第一次运行gulp任务时，文件未编译，未打包。可通过重启 gulp 任务方式解决
2. 文件进行删除时，部分文件使用 gulp-cache 插件进行增量编译，导致 其内容仍残留在目标文件中。可通过重启 gulp 任务方式解决
3. 删除文件过多，且已被编译到 dist 目录时，可通过整体删除 dist 目录，并重启 gulp 任务，以使 src 与 dist 两者完全同步
4. 对 variable.sass 或者 mixin.sass 的修改 并不会直接接响应到页面上，因为使用这两者的文件并未发生变化，也就没有进行编译。而使用这两者的文件才是真正的样式文件。

### 三、使用方式
1. 安装 [node.js](https://nodejs.org/en/)
2. 全局安装 gulp: `npm install gulp -g` (淘宝镜像 cnpm: `npm install cnpm -g --registry=https://registry.npm.taobao.org`)
3. 命令行输入 gulp -v，出现版本号即为正确安装
4. 下载好配置文件后可直接在目录内执行 `cnpm install` 命令 即安装相应包

### 四、npm 使用
1. 亦可通过 `cnpm init` 在命令行内 初始化 `package.json` 文件
2. `-dev`：保存至package.json 的 `devDependencies` 节点，不指定 `-dev` 将保存至 `dependencies` 节点
3. `npm uninstall <name> [-g] [--save-dev]`  PS：不要直接删除本地插件包
4. 使用npm更新插件：`npm update <name> [-g] [--save-dev]`
5. 更新全部插件：`npm update [--save-dev]`

### 五、新增 scss 版本
css less scss —— 可使用 这三种语法编写 样式  
scss —— 仅支持 scss 一种语法
