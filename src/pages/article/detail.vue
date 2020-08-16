<template>
  <mark-content ref="markContentRef" />
</template>

<script>
import MarkContent from '@/common/components/MarkContent';
import {ref, onMounted} from 'vue';
import {get, getStorage} from '@/common/utils';
import {router} from '@/router';

export default {
  name: 'Article',
  setup(props) {
    const markContentRef = ref(null);
    const currentRoute = router.currentRoute.value;

    if (currentRoute.path === '/article/detail') {
      const id = currentRoute.query.id;
        if (id) {
          get('/action/article/detail', { id })
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
      markContentRef
    }
  },
  props: {
    showTips: {
      type: Function
    }
  },
  components: {
    MarkContent
  }
}
</script>

<style lang="scss">
.markdown-page {
  margin-top: 20px;
  margin-bottom: 50px;
}
pre.hljs {
  margin: 18px 0;
}
</style>
