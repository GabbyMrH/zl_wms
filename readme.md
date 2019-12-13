## ZL_WMS

这是一套基于`laravel6.x` + `vue2.6.10` + `element-ui`,使用组件化所开发的<u><b>半成品</b></u>`wms SPA`系统，当前使用技术有：
#### 后端部分:`laravel6.x及相关扩展包(可在composer.json中查看)`
#### 前端部分：`vue2.6、element-ui、vue-router、axios、sass、webpack`
PS:
1. 目前我忙于其他开发工作，且现在前后端分离为主流开发方式，所以该项目仅适用想学习使用`laravel`结合`vue`组件化开发`SPA`应用的同学参考。
目前只完成了仓库设置、商品入库功能;
2. 该项目若存在一些问题，请不吝赐教；
3. 接下来我将会推出一套后端采用：`lumen+dingoAPI+jwt-Auth`以及前端完全分离采用`vue-cli`的形式构建和开发一套完整版的wms系统并进行开源，敬请期待。

## 🏞大体图示

#### 仓库设置
![warehouse](/public/img/warehouse.png)

#### 商品入库
![in-bound](/public/img/in-bound.png)

#### 入库展开项
![inbound-detail](/public/img/inbound-detail.png)

#### 入库表单
![inbound-dialog](/public/img/inbound-dialog.png)

#### 编辑入库单
![edit-inbound](/public/img/edit-inbound.png)

## 🏠环境依赖

* php 7.2.X
* nginx 1.13.x
* mysql5.7

## 📥部署步骤

1. 克隆项目 
``` git clone git@github.com:GabbyMrH/zl_wms.git ```

2. 切换到项目目录执行：
``` composer install ```

3. 将项目根目录下的`.env.example`改为`.env`，该文件为环境配置文件

4. 生成 APP_KEY：
``` php artisan key:generate ```

如果您是用nginx，可能需要设置一下该配置:
``` try_files $uri $uri/ /index.php?$query_string; ```

5. 配置您的IP或域名指向项目的`public`目录，然后在浏览器输入您配置的域名或IP即可访问了。不出意外的话，点击商品入库应该如下所示：

![inbound-empty](/public/img/inbound-empty.png)

PS：
1. 如果您想看到数据显示效果的话，尝试在控制台执行:
``` php artisan migrate:refresh --seed ```
2. 现在再去刷新页面就能看到我通过`laravel $fake`预设的虚拟数据了。

## 📔目录结构

* 整体目录结构可以参考[laravel6.x目录结构官网](https://laravel.com/docs/6.x/structure/);
* 需要注意的是，由于该项目采用的是vue组件化开发，所以新增了组件目录，位于`resources/js/components/`,您需要找的组件都位于此;

## 🔧二开规范

* 需要您对laravel框架开发有基本的掌握，以及对`vue.js`、`vue-router`、`axios`、`webpack`等技术有一定的基础。
* 所有的前端页面路由都通过`vue-router`进行定义和配置的，位于
```resources/js/app.js ```内
* 所有的数据操作都是以API的形式传递的，路由配置当然是位于我们laravel的``` routers/api.php ```内啦。
* 您可能会偶然发现里面有一些测试的代码(比如生成二维码和条形码的扩展包啊、还有封装起来的验证码生成和验证的api接口啊)以及`jwt-auth`，其实这并未启用，当然也不会影响您的使用，您可以随意更改;

## 👏欢迎提出建议或与我交流

作者邮箱是：<a href="mailto:gabbymrh@gmail.com" target="_blank">gabbymrh@gmail.com</a>

