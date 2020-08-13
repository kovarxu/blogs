<template>
  <div class="login-wrapper">
    <div class="login-item">
      <span class="login-item__desc">用户名:</span>
      <input class="login-item__input" @blur="onBlur($event, 'username')" />
    </div>
    <div class="login-item">
      <span class="login-item__desc">密码:</span>
      <input class="login-item__input" @blur="onBlur($event, 'password')" />
    </div>

    <template v-if="isRegister">
      <div class="login-item">
      <span class="login-item__desc">确认密码:</span>
         <input class="login-item__input" @blur="onBlur($event, 're-password')" />
      </div>
      <div class="login-item">
      <span class="login-item__desc">邮箱:</span>
        <input class="login-item__input" @blur="onBlur($event, 'email')" />
      </div>
    </template>

    <div class="login-btn">
      <template v-if="isRegister">
        <a @click="register" class="login-btn__register">注册</a>
        <a @click="toLogin" class="login-btn__link">已有账号？跳转登录</a>
      </template>
      <template v-else>
        <a @click="login" class="login-btn__login">登录</a>
        <a @click="toRegister" class="login-btn__link">没有账号？快来注册一个吧</a>
      </template>
    </div>
  </div>
</template>

<script>
import {ref, watchEffect} from 'vue';
import store from '../../store';
import {router} from '../../router';
import {mapActions} from 'vuex';
import login from '../../store/modules/login';

function trim(target) {
  return target.replace(/^\s*|\s*$/g, '');
}

function availEmail(target) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(target);
}

export default {
  name: 'Login',
  setup (props) {
    const isRegister = ref(false);
    const rePassword = ref('');

    watchEffect(() => {
      const currentRoute = router.currentRoute;
      isRegister.value = currentRoute.value.path === '/register';
    }, {sync: true});

    // const loginActions = mapActions('login', ['login']);

    const checkMessage = () => {
      const {
        username,
        password,
        email
      } = store.state.login;

      if (!username) {
        props.showTips('请输入用户名');
        return false;
      }
      if (!password) {
        props.showTips('请输入密码');
        return false;
      }
      if (isRegister.value) {
        if (password !== rePassword.value) {
          props.showTips('两次密码输入不一致');
          return false;
        }
        if (!availEmail(email)) {
          props.showTips('请输入有效的邮箱号');
          return false;
        }
      }
      return true;
    }

    const login = () => {
      const {
        username,
        password,
        email
      } = store.state.login;
      if (checkMessage()) {
        store.dispatch('login/login', { username, password })
          .then(data => {
            const { ret, errmsg } = data;
            if (ret === 0) {
              store.dispatch('checkIsLogin');
              router.push('/');
            } else {
              props.showTips(errmsg);
            }
          });
      }
    };

    const register = () => {
      const {
        username,
        password,
        email
      } = store.state.login;
      if (checkMessage()) {
        store.dispatch('login/register', { username, password, email })
          .then(data => {
            const { ret, errmsg } = data;
            if (ret === 0) {
              props.showTips('注册成功');
            } else {
              props.showTips(errmsg);
            }
          });;
      }
    };

    const toRegister = () => {
      router.push('/register');
    }
    const toLogin = () => {
      router.push('/login');
    }

    const onBlur = (e, name) => {
      if (name !== 're-password') {
        store.commit('login/changeValue', { key: name, value: trim(e.target.value) });
      } else {
        const rep = trim(e.target.value);
        rePassword.value = rep;
        if (store.state.login.password !== rep) {
          props.showTips('两次输入的密码不匹配');
        }
      }
    }
    
    return {
      isRegister,
      login,
      register,
      toRegister,
      toLogin,
      onBlur
    }
  },
  props: {
    showTips: {
      type: Function
    },
    hideTips: {
      type: Function
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  font-size: 20px;
  line-height: 1.5;
  padding: 100px;
  .login-item {
    margin: 1rem 0;
    .login-item__desc {
      display: inline-block;
      width: 140px;
    }
    .login-item__input {
      width: 14em;
      border: 1px solid #aaa;
      padding: 2px 5px;
      border-radius: 3px;
    }
  }
  .login-btn {
    // text-align: center;
  }
  .login-btn__register, .login-btn__login {
    margin-top: 20px;
    display: inline-block;
    font-size: 18px;
    min-width: 120px;
    cursor: pointer;
    line-height: 2;
    text-align: center;
    background-color: #eee;
    border-radius: 4px;
  }

  .login-btn__link {
    margin-top: 5px;
    margin-left: 20px;
    font-size: 18px;
    line-height: 1;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
