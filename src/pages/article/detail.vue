<template>
  <div class="article-detail">
    <mark-content ref="markContentRef" />
    <Comment :articleId="id" :showTips="st" />
  </div>
</template>

<script>
import MarkContent from '@/common/components/MarkContent';
import Comment from './comment';
import {ref, onMounted, computed} from 'vue';
import {get, getStorage} from '@/common/utils';
import {router} from '@/router';

export default {
  name: 'Article',
  setup(props) {
    const markContentRef = ref(null);
    const currentRoute = router.currentRoute.value;

    const id = computed(() => router.currentRoute.value.query.id);

    if (currentRoute.path === '/article/detail') {
      if (id.value) {
        get('/action/article/detail', { id: id.value })
          .then(res => {
            const { ret, data, errmsg } = res;
            if (ret === 0) {
              markContentRef.value.renderParagraph(data);
            } else {
              props.showTips(errmsg);
            }
          })
      }
    } else {
      onMounted(() => {
        const val = getStorage('KOVAR_NEW_PAGE_PREVIEW');
        if (val) {
          markContentRef.value.renderParagraph(val);
        }
      })
    }

    return {
      markContentRef,
      id,
      st: props.showTips
    }
  },
  props: {
    showTips: {
      type: Function
    }
  },
  components: {
    MarkContent,
    Comment
  }
}
</script>

<style lang="scss">
.article-detail {
  padding-bottom: 100px;
}
.markdown-page {
  margin-top: 20px;
  margin-bottom: 50px;
}
pre.hljs {
  margin: 18px 0;
}
</style>
