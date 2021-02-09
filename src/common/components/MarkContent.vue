<template>
  <div 
    class="markdown-page"
    v-html="markContent"
  ></div>
</template>

<script>
import {ref} from 'vue';
// import MarkdownIt from 'markdown-it';
// import hljs from 'highlight.js';
import {trim} from '../utils';
import 'highlight.js/styles/vs2015.css';
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

      let renderedBody = body;
      // 给没标题的body加上标题
      if (! /^#\s/.test(trim(body))) {
        renderedBody = `# ${title} \n${body}`;
      }

      markContent.value = md.render(renderedBody);
    }

    return {
      markContent,
      renderParagraph
    }
  },
  
}
</script>
