<template>
  <div class="mod-tips" v-show="isShow">
    <div :class="['mod-tips__content', `mod-tips__${type}`]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  watch,
  watchEffect
} from 'vue';

export default {
  name: 'Tips',
  setup() {
    const state = reactive({
      isShow: false,
      type: 'info',
      message: '',
    })

    let timer = null;

    const show = (type, message) => {
      if (typeof message === 'undefined') {
        message = type;
        type = 'info';
      }
      // already show
      if (state.isShow) {
        state.isShow = false;
        timer && clearTimeout(timer);
        timer = setTimeout(() => show(type, message));
        return ;
      }
      state.isShow = true;
      state.type = type;
      state.message = message;
    }

    const hide = () => {
      state.isShow = false;
    }

    watch(() => state.isShow, (newVal) => {
      if (newVal) {
        timer = setTimeout(hide, 2000);
      }
    })

    return {
      ...toRefs(state),
      show,
      hide
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-tips {
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 360px;
  padding: 10px 10px;
  background: rgba(0,0,0,.85);
  color: #fff;
  border-radius: 6px;
  text-align: center;
  font-size: 20px;
  animation: down 200ms 1 forwards;
}
@keyframes down {
  from {
    transform: translate(0, -100%);
  }
  to {
    transform: translate(0, 0);
  }
}
</style>
