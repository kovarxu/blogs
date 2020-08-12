<template>
  <div class="article">
    <h3 class="article-title">
      <input type="text" placeholder="// 标题" v-model="title">
    </h3>

    <div class="article-desc">
      <input type="text" placeholder="// 描述信息" v-model="describe">
    </div>

    <div class="article-tags">
      <ul>
        <li v-for="(item, index) in tags" :key="item+index" class="tag">{{ item }}</li>
      </ul>
      <div class="single-tag">
        <input 
          type="text" 
          placeholder="添加标签" 
          class="tag-input" 
          v-model="tagInput" 
          @keypress="onAddTag"
        />
      </div>
    </div>

    <div class="article-content">
      <textarea ref="contentElement"></textarea>
    </div>

    <div class="submit-btns">
      <a class="btn save-btn" @click="onSave">保存</a>
      <a class="btn tmp-save-btn">暂存</a>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {post, trim} from '../../common/utils';

export default {
  name: 'AddArticle',
  setup(props) {
    const title = ref('');
    const describe = ref('');
    const contentElement = ref(null);
    const tagInput = ref('');
    const tags = ref([]);

    const onSave = () => {
      const vTitle = trim(title.value);
      const vDesc = trim(describe.value);
      const vBody = contentElement.value.value;
      
      return post('/action/article/add', {
        title: vTitle,
        describe: vDesc,
        body: vBody,
        tags: tags.value
      }).then(data => {
        const { ret, errmsg } = data;
        if (ret === 0) {
          props.showTips('添加文章成功');
        } else {
          props.showTips(errmsg);
        }
      })
    }

    const onAddTag = (e) => {
      if (e.keyCode === 13) {
        // enter
        const tag = trim(tagInput.value);
        if (tags.value.includes(tag)) {
          props.showTips('该标签已存在');
        } else {
          tags.value.push(tag);
          tagInput.value = '';
        }
      }
    }

    return {
      title,
      describe,
      contentElement,
      tagInput,
      tags,
      onSave,
      onAddTag
    }
  },
  props: {
    showTips: {
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding-top: 20px;
  input, textarea {
    width: 100%;
    padding: 3px 8px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
  }
  textarea {
    min-height: 200px;
    height: 600px;
    height: calc(100vh - 340px);
    padding-top: 10px;
    padding-bottom: 10px;
    resize: none;
  }
  .tag-input {
    display: block;
    width: 100px;
    padding-top: 0;
    padding-bottom: 0;
    color: inherit;
    background: none;
    border: none;
    line-height: 20px;
    text-align: center;
  }
}
.article-title {
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 12px;
}
.article-desc {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
}
.article-content {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
}
.article-tags {
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
}
.single-tag, .tag {
  display: inline-block;
  line-height: 20px;
  padding: 4px 20px;
  margin-right: 8px;
  border-radius: 2px;
  background: #291d29;
  color: #fff;
  margin-bottom: 4px;
}
.tag {
  background: #9cdef9;
  color: inherit;
}
.submit-btns {
  display: flex;
}
.btn {
  width: 100px;
  line-height: 1.8;
  font-size: 20px;
  text-align: center;
  border-radius: 3px;
  background: #f1863e;
  color: #fff;
  margin-right: 12px;
}
.tmp-save-btn {
  background: rgb(98, 147, 211);
}
</style>
