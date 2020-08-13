<template>
  <header class="header">
    <div className="avatar" @click="toAdmin">
      <img src='./imgs/avatar.jpg' />
    </div>
    <div className="title">
      <div className="con">
        <h2>Welcome to Kovar's Personal Site</h2>
        <h4>Wisdom Today: "Don't dream it, be it."</h4>
      </div>
    </div>
    <ul className="links">
      <li>
        <router-link to="/">博客</router-link>
      </li>
      <li>
        <router-link to="/">教程</router-link>
      </li>
      <li>
        <router-link to="/">感悟</router-link>
      </li>
      <li>
        <router-link to="/">关于</router-link>
      </li>
      <li>
        <router-link v-if="isLogin" to='/' @click="logout">登出</router-link>
        <router-link v-else to="/login">登录</router-link>
      </li>
    </ul>

    <div v-if="isAdminPanelShow" class="admin-panel">
      <div class="admin-panel__header">
        管理员菜单
        <svg-icon 
          iconName="close" 
          iconClass="admin-panel__close" 
          :clickEvent="() => isAdminPanelShow=false" 
        />
      </div>
      <div class="admin-panel__controls">
        <a class="admin-panel__controls__btn" @click="toAddArticle">写文章</a>
        <a class="admin-panel__controls__btn">文章管理</a>
        <a class="admin-panel__controls__btn">用户管理</a>
      </div>

      <div class="admin-panel__footer">
        欢迎管理员！
      </div>
    </div>
  </header>
</template>

<script>
import {ref, toRef} from 'vue';
import {RouterLink} from 'vue-router';
import store from '../../store';
import {router} from '../../router';
import SvgIcon from '@/common/components/SvgIcon';

export default {
    name: 'Header',
    setup() {
      const logout = () => {
        store.dispatch('logout');
      }

      const isLogin = toRef(store.state, 'isLogin');
      const isMaster = toRef(store.state, 'isMaster');
      const isAdminPanelShow = ref(false);

      const toAdmin = () => {
        if (isMaster.value && !isAdminPanelShow.value) {
          isAdminPanelShow.value = true;
        }
      }

      const toAddArticle = () => {
        router.push('/article/add');
        isAdminPanelShow.value = false;
      }

      return {
        isLogin,
        isAdminPanelShow,
        toAdmin,
        toAddArticle,
        logout,
      }
    },
    components: {
      RouterLink,
      SvgIcon
    }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 20px;
  line-height: 80px;
  background: #eee;
  display: flex;
  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .title {
    flex: 1;
    .con {
      /* width: fit-content; */
      /* margin: 0 auto; */
    }
    h2 {
      line-height: 40px;
    }
    h4 {
      font-weight: normal;
      text-indent: 2em;
      font-size: 12px;
      font-style: italic;
      line-height: 40px;
      &::before {
        content: '';
        display: inline-block;
        height: 1px;
        width: 4em;
        margin-right: 5px;
        vertical-align: middle;
        background: #999;
      }
    }
  }

  .links {
    li {
      display: inline-block;
      margin-left: 6px;
      margin-right: 6px;
      font-size: 14px;
    }
  }

  .admin-panel {
    position: fixed;
    z-index: 1;
    top: 70px;
    width: 500px;
    height: 300px;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 6px;
    .admin-panel__header {
      line-height: 40px;
      font-size: 24px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    .admin-panel__controls {
      flex: 1;
      display: flex;
      padding: 10px;
    }
    .admin-panel__controls__btn {
      height: 30px;
      margin-right: 10px;
      padding: 0 10px;
      min-width: 5em;
      background: cadetblue;
      border-radius: 2px;
      color: #fff;
      line-height: 30px;
      text-align: center;
    }
    .admin-panel__footer {
      line-height: 24px;
      font-size: 14px;
      padding-left: 10px;
      border-top: 1px solid #ddd;
    }
  }
}
</style>

<style>
.admin-panel__close {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
}
</style>
