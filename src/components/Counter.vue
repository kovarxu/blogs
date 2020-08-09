<template>
  <div>
    <button @click="increaseCount" class="btn">+</button>
    <span class="count">{{ count }}, {{ tCount }}</span>
    <button @click="decreaseCount" class="btn">-</button>
  </div>
</template>

<script>
import {
  ref,
  computed,
  // watch,
  // watchEffect
} from 'vue';

function counter() {
  const count = ref(0);
  const increaseCount = () => count.value++;
  const decreaseCount = () => count.value--;
  const tCount = computed(() => count.value * 2);
  
  // watch({

  // })

  return {
    count,
    tCount,
    increaseCount,
    decreaseCount
  };
}

export default {
  name: 'Counter',
  setup() {
    return { ...counter() }
  },
}
</script>

<style lang="scss">
  .count {
    margin: 0 10px;
  }
</style>
