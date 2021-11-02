<div>
  <a href="https://reactjs.org/">
    <img width="200" height="200"
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K">
  </a>
</div>
</br>

[![NPM version](https://img.shields.io/npm/v/create-react-lib-cli.svg)](https://www.npmjs.com/package/create-react-lib-cli)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yangzaiwangzi/create-react-lib-cli/blob/main/LICENSE) 
# create-react-lib-cli

用于cli的方式快速构建开发react组件的基本框架，让开发者专注于组件的开发。
## 使用方法

首先，你需要全局安装这个脚手架，如下：

```console

npm i -g create-react-lib-cli

```

开始使用

```
# 常见的组件名，<project-name> 填写需要开源的组件名
react-cli create <project-name>


# 获取更多命令详情
react-cli --help


# 运行以上命令后，随命令提示填写相关项目初始化信息，即可开始组件开发

```

## 项目框架下载完成后
```
# 进入项目

cd <project-name>


# 安装 react 组件开发的依赖包，可自行根据需求配置 webpack
npm i


# 开始组件打包
npm run start


# 组件被 example引用，并实时自动进行被引用的处理，开启example在浏览器展示效果
cd example
npm run dev


可在浏览器 localhost:3000 查看组件开发实时效果

```
 
