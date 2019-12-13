<template>
  <div id="index">
    <el-container>
      <!-- left navbar -->
      <el-aside width="200px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>
                <router-link :to="{path:'/'}">控制面板</router-link>
              </span>
            </template>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>采购管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">采购订货</el-menu-item>
              <el-menu-item index="2-2">采购退货</el-menu-item>
              <el-menu-item index="2-3">采购付款</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>库存管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <router-link :to="{path:'/in-bound'}">商品入库</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link :to="{path:'/out-bound'}">商品出库</router-link>
              </el-menu-item>
              <el-menu-item index="3-3">
                <router-link :to="{path:'/bound-early'}">库存预警</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-money"></i>
              <span>财务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">资金盘点</el-menu-item>
              <el-menu-item index="4-2">银行信息</el-menu-item>
              <el-menu-item index="4-3">其他收入</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">用户列表</el-menu-item>
              <el-menu-item index="5-2">权限管理</el-menu-item>
              <el-menu-item index="5-3">用户日志</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>基本设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">公司信息</el-menu-item>
              <el-menu-item index="6-2">
                <router-link :to="{path:'/warehouse-set'}">仓库设置</router-link>
              </el-menu-item>
              <el-menu-item index="6-3">其他设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">
                <router-link :to="{path:'/system-info'}">系统信息</router-link>
              </el-menu-item>
              <el-menu-item index="7-2">
                <router-link :to="{path:'/data-backup'}">数据备份</router-link>
              </el-menu-item>
              <el-menu-item index="7-3">
                <router-link :to="{path:'/system-log'}">系统日志</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- right main -->
      <el-container>
        <!-- header -->
        <el-header>
          <el-row type="flex" justify="end">
            <el-col :span="2">
              <el-badge :value="1200" :max="99" class="header-notify-item">
                <el-button type="info" icon="el-icon-message" circle size="medium"></el-button>
              </el-badge>
            </el-col>
            <el-col :span="2">
              <el-dropdown>
                <span class="el-dropdown-link">
                  超级管理员
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人资料</el-dropdown-item>
                  <hr />
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <!-- center main -->
        <el-main>
          <router-view :key="key"></router-view>
        </el-main>
        <!-- footer -->
        <el-footer>
          <footer-template></footer-template>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import footer from "./Footer";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  components: {
    "footer-template": footer
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("../../sass/app-style.scss");
</style>>


