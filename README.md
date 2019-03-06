# pandora-boilerplate-wechat-plugin

初始化小程序插件开发项目。

## Usage

- 全局安装 `pandora-cli` (推荐)

```bash
  npm i -g pandora-cli
```

- 初始化项目，按照提示输入 AppId

```bash
  pa init wx-plugin-demo
```

- 启动项目

```bash
  pa start
```

> `pa start` 启动开发模式，进入监听状态

- 构建指定环境代码

```bash
  pa build --env prod
```

> `--env` 可选值 test, pre, prod

- 发布

```bash
  pa release <version-type> -m <comments>
```

> `<version-type>` 可选值 `patch`, `minor`, `major`
> `<comments>` 为本次发布描述，必填

### 项目结构介绍

```bash
  .
  ├── config
  │   └── app.yaml            // 多环境配置
  ├── icons                   // examples 中使用的 icons 图标位置
  ├── dist                    // 构建后的目录
  │   ├── examples            // 构建后的 examples
  │   └── plugin              // 构建后的 plugins
  ├── doc                     // 插件文档
  │   └── README.md
  ├── examples                // examples 源码，用来调试插件
  └── src                     // plugin 源码
  │   ├── components
  │   ├── pages
  │   ├── index.js
  │   └── plugin.json
  ├── scripts                 // 构建脚本
  ├── build.config.js         // 别名配置
  ├── project.config.json     // 小程序插件项目配置
  ├── package.json
  └── README.md
```
