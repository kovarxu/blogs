<template>
  <header class="header">
    <div className="avatar" @click="toAdmin">
      <img src='./imgs/avatar.jpeg' />
    </div>
    <div className="title">
      <div className="con">
        <h2>Welcome to Kovar's Personal Site</h2>
        <h4>Wisdom Today: "Don't dream it, be it."</h4>
      </div>
    </div>
    <ul className="links">
      <li v-for="(item, key) of categoryConf" :key="key">
        <router-link :to="`/blog?type=${key}`">{{ item }}</router-link>
      </li>
      <!-- <li>
        <router-link to="/">关于</router-link>
      </li> -->
      <li>
        <router-link v-if="isLogin" to='/' @click="logout">登出</router-link>
        <router-link v-else to="/login">登录</router-link>
      </li>
    </ul>

    <admin-panel 
      v-if="isMaster" 
      v-show="isAdminPanelShow" 
      class="admin-panel" 
      @close="isAdminPanelShow = false" 
    />
  </header>
</template>

<script>
import {ref, toRef} from 'vue';
import {RouterLink} from 'vue-router';
import store from '../../store';
import {router} from '../../router';
import {categoryConf} from '../constants'
import AdminPanel from './Admin/Admin';

export default {
    name: 'Header',
    setup() {
      const logout = () => {
        store.dispatch('logout');
      }

      const isLogin = toRef(store.state, 'isLogin');
      const isMaster = toRef(store.getters, 'isMaster');
      const isAdminPanelShow = ref(false);

      const toAdmin = () => {
        if (isMaster.value && !isAdminPanelShow.value) {
          isAdminPanelShow.value = true;
        }
      }

      return {
        isLogin,
        isMaster,
        isAdminPanelShow,
        toAdmin,
        logout,
        categoryConf
      }
    },
    components: {
      RouterLink,
      AdminPanel,
    }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  box-sizing: border-box;
  min-width: 920px;
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
    margin-right: 20px;
    li {
      display: inline-block;
      margin-left: 6px;
      margin-right: 6px;
      font-size: 16px;
    }
  }
}
</style>
