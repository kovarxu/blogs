<template>
  <div class="pagination">
    <a @click="handleBackClick" :class="['pagination-item', {disabled: backDisable}]">&lt; 上一页</a>
    <ul class="pagination-page-selectors">
      <!-- <li 
        v-for="id in totolPage" 
        :key="id"
        :class="['pagination-page-selectors__item', {active: currentPage === id}]"
      >{{ id + 1 }}</li> -->
    </ul>
    <a @click="handlePrevClick" :class="['pagination-item', {disabled: prevDisable}]">下一页 &gt;</a>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
  name: 'Pagination',
  setup(props) {
    const currentPage = ref(1);

    const backDisable = computed(() => {
      return currentPage.value === 1;
    });

    const prevDisable = computed(() => {
      return currentPage.value === props.totalPage;
    })

    const handleBackClick = () => {
      if (!backDisable.value) {
        props.onChoosePage(currentPage.value - 1);
        currentPage.value = currentPage.value - 1;
      }
    }

    const handlePrevClick = () => {
      if (!prevDisable.value) {
        props.onChoosePage(currentPage.value + 1);
        currentPage.value = currentPage.value + 1;
      }
    }

    return {
      backDisable,
      prevDisable,
      handleBackClick,
      handlePrevClick
    }
  },
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    onChoosePage: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
}
.pagination-item {
  cursor: pointer;
  margin-right: 20px;
  line-height: 23px;
  color: #333;
  &:hover {
    color: rgb(17, 37, 218);
    text-decoration: underline;
  }
  &.disabled {
    opacity: .6;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
  text-align: center;
}
</style>