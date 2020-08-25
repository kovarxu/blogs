<template>
  <div class="markdown-page" v-html="markContent"></div>
</template>

<script>
import {ref} from 'vue';
// import MarkdownIt from 'markdown-it';
// import hljs from 'highlight.js';
import 'highlight.js/styles/qtcreator_light.css';
import '@/assets/markdown.scss';

export default {
  name: 'MarkContent',
  setup() {
    const markContent = ref('');
    const md = new markdownit({
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

      markContent.value = md.render(body);
    }

    return {
      markContent,
      renderParagraph
    }
  },
  
}
</script>
