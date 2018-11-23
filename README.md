## 使用
    

### Node

```sh
npm install
node server.js
```


## 改变端口

```sh
PORT=3001 node server.js
```

## 功能

* 显示评论列表
* 提交表单
* 支持markdown格式

## 文件说明

* server.js:相当于一个简易的服务器，用来获取和保存数据
* comments.json:这里的数据库使用JSON文件来代替,文件用于存储评论相关的信息
* public:用于书写HTML、CSS、JS

## 组件规划说明

在这个页面，一共有四个组件，结构如下
- CommentBox
  - CommentList
    - Comment
  - CommentForm

## 操作步骤

1. 先表示出该评论页面的大致轮廓，并添加一些样式


