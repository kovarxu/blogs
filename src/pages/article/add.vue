<template>
  <div class="article">
    <h3 class="article-title">
      <input type="text" placeholder="// 标题" v-model="title">
    </h3>

    <div class="article-desc">
      <input type="text" placeholder="// 描述信息" v-model="describe">
    </div>

    <div class="article-content">
      <textarea ref="contentElement"></textarea>
    </div>

    <div class="article-tags">
      <div class="select-desc">添加标签：</div>
      <ul>
        <li v-for="(item, index) in tags" :key="item+index" class="tag">
          {{ item }}
          <svg-icon iconName="close" iconClass="close-icon" :clickEvent="onTagDel(index)" />
        </li>
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

    <ul class="article-category">
      <li class="select-desc">选择类型：</li>
      <li 
        v-for="(val, key) in categoryConf" 
        :key="key"
        :class="['article-category-item', {'selected': category === key}]"
        @click="() => onSelectCategory(key)"
      >{{ val }}</li>
    </ul>

    <ul class="article-publish">
      <li class="select-desc">操作类型：</li>
      <li 
        :class="['article-publish-item', {'selected': submit === 0}]"
        @click="() => onSelectSubmitType(0)"
      >暂存</li>
      <li 
        :class="['article-publish-item', {'selected': submit === 1}]"
        @click="() => onSelectSubmitType(1)"
      >发布</li>
    </ul>

    <div class="submit-btns">
      <a class="btn save-btn" @click="onSave">保存</a>
      <a class="btn tmp-save-btn">预览</a>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {post, trim} from '../../common/utils';
import SvgIcon from '@/common/components/SvgIcon';

export default {
  name: 'AddArticle',
  setup(props) {
    const title = ref('');
    const describe = ref('');
    const contentElement = ref(null);
    const tagInput = ref('');
    const tags = ref([]);
    const category = ref('blog');
    const submit = ref(0);
    const categoryConf = {
      'blog': '博客',
      'tutorial': '教程',
      'thinking': '心得'
    }

    const onSave = () => {
      const vTitle = trim(title.value);
      const vDesc = trim(describe.value);
      const vBody = contentElement.value.value;

      if (!vTitle) {
        props.showTips('请输入文章标题');
        return;
      }
      
      return post('/action/article/add', {
        title: vTitle,
        describe: vDesc,
        body: vBody,
        tags: tags.value,
        category: category.value,
        isShow: !!submit.value
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

    const onSelectCategory = (key) => {
      category.value = key;
    }

    const onTagDel = (index) => () => {
      tags.value.splice(index, 1);
    }

    const onSelectSubmitType = (key) => {
      submit.value = key ? 1 : 0;
    }

    return {
      title,
      describe,
      contentElement,
      tagInput,
      tags,
      category,
      categoryConf,
      submit,
      onSave,
      onAddTag,
      onTagDel,
      onSelectCategory,
      onSelectSubmitType,
    }
  },
  props: {
    showTips: {
      type: Function
    }
  },
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding-top: 30px;
  padding-bottom: 60px;
  input[type=text], textarea {
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
  .single-tag .tag-input {
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
  margin-bottom: 14px;
}
.article-desc {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 12px;
}
.article-content {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 24px;
}
.article-tags {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  .select-desc {
    display: inline-block;
    line-height: 28px;
    margin-right: 30px;
  }
}
.article-category, .article-publish {
  margin-bottom: 20px;
  display: flex;
  .select-desc {
    line-height: 30px;
    margin-right: 30px;
  }
}
.article-publish {
  margin-bottom: 40px;
}
.article-category-item, .article-publish-item {
  width: 100px;
  line-height: 30px;
  border-radius: 3px;
  background-color: rgb(98, 147, 211);
  margin-right: 13px;
  text-align: center;
  color: #fff;
  font-weight: normal;
  &.selected {
    background-color: rgb(253, 234, 211);
    color: #333;
  }
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
  position: relative;
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

<style>
.article .close-icon {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  top: -6px;
  right: -6px;
}
</style>
