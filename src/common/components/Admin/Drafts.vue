<template>
  <ul>
    <li v-for="(draft, index) in drafts" :key="index" class="draft-item">
      <div class="draft-item__info">
        <div class="draft-item__title">{{ draft.title }}</div>
        <div class="draft-item__time">最后编辑时间：{{ draft.modifyTime }}</div>
      </div>
      <div class="draft-item__controls">
        <a class="draft-item__controls_btn" @click="() => toEdit(draft.id)">编辑</a>
        <a class="draft-item__controls_btn">删除</a>
        <a class="draft-item__controls_btn" @click="() => publish(draft.id)">发布</a>
      </div>
    </li>
  </ul>
</template>

<script>
import {ref} from 'vue';
import {get, formatTime} from '@/common/utils';
import {router} from '@/router';

export default {
  name: 'DraftManage',
  setup(props) {
    const page = ref(1);
    const drafts = ref([]);

    const getDrafts = () => get('/action/blog/list', {page: page.value, limit: 100, isShow: 0})
      .then(res => {
        const {ret, data, errmsg} = res;
        if (ret === 0) {
          drafts.value = data.list.map(item => {
            item.modifyTime = formatTime(item.modifyTime, 'full');
            return item;
          });
        }
      })

    const toEdit = (id) => {
      router.push('/article/edit?id=' + id);
      props.closeThePanel();
    }

    const publish = (id) => {
      get('/action/article/publish', { id })
        .then((res) => {
          const {ret, data, errmsg} = res;
          if (ret === 0 && data.id) {
            props.changeAdminMessage('发布成功');
            getDrafts();
          }
        })
    }

    getDrafts();
    
    return {
      drafts,
      toEdit,
      publish
    }
  },
  props: ['closeThePanel', 'changeAdminMessage']
}
</script>

<style lang="scss" scoped>
.draft-item {
  padding: 5px;
  display: flex;
  &:hover{
    background-color: #eee;
  }
}
.draft-item__info {
  flex: 1;
}
.draft-item__title {
  line-height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(1, 56, 4);
}
.draft-item__time {
  line-height: 16px;
  font-size: 12px;
  color: #333;
}
.draft-item__controls {
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.draft-item__controls_btn {
  padding: 2px 8px;
  line-height: 20px;
  font-size: 14px;
  &:hover {
    color: #f00;
    text-decoration: underline;
  }
}
</style>
