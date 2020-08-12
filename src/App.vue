<template>
  <div>
    <Header />
    <router-view
      class="body-section"
      :showTips="showTips"
      :hideTips="hideTips"
    ></router-view>
    <Tips ref="tipsRef" />
  </div>
</template>

<script>
import {ref} from 'vue';
import {RouterView} from 'vue-router';
import store from './store';
import Header from './common/components/Header';
import Tips from './common/components/Tips';
import './index.css';

export default {
  name: 'App',
  setup() {
    const tipsRef = ref(null);
    const showTips = (...rest) => {
      tipsRef.value && tipsRef.value.show(...rest);
    }
    const hideTips = () => {
      tipsRef.value && tipsRef.value.hide();
    }
    store.dispatch('checkIsLogin');
    
    return {
      tipsRef,
      showTips,
      hideTips
    }
  },
  components: {
    Header,
    Tips,
    RouterView
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.body-section {
  width: 920px;
  margin: 0 auto;
}
</style>
