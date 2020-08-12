<template>
  <div class="markdown-page" v-html="markContent"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/qtcreator_light.css';
import './markdown.scss';
import {ref} from 'vue';
import {get} from '../../common/utils';
import {router} from '../../router';

export default {
  name: 'Article',
  setup(props) {
    const markContent = ref('');
    const mi = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (_) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });

    const renderParagraph = (data) => {
      const {
        title,
        body = '',
        addTime,
        comments,
        support
      } = data;

      markContent.value = mi.render(body);
    }

    // const result = mi.render();
    const id = router.currentRoute.value.query.id;
    if (id) {
      get('/action/article/detail', { id })
        .then(res => {
          const { ret, data, errmsg } = res;
          if (ret === 0) {
            renderParagraph(data);
          } else {
            props.showTips(errmsg);
          }
        })
    }

    return {
      markContent
    }
  },
  props: {
    showTips: {
      type: Function
    }
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
