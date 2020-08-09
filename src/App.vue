<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Counter />
    <Post />
    <Clock />
  </div>
</template>

<script>
import Counter from './components/Counter';
import Post from './components/Post';
import Clock from './components/Clock';

export default {
  name: 'App',
  setup() {
  },
  components: {
    Counter,
    Post,
    Clock
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
