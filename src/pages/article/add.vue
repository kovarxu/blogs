<template>
  <div class="article">
    <h3 class="article-title">
      <input type="text" placeholder="// 标题" v-model="title">
    </h3>

    <div class="article-desc">
      <input type="text" placeholder="// 描述信息" v-model="describe">
    </div>

    <div class="article-content" v-on:keydown.meta.s.prevent.stop="onSave(false)">
      <div id="editor"></div>
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
      <a class="btn tmp-save-btn" @click="onPreview">预览</a>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {get, post, trim, getStorage, setStorage} from '../../common/utils';
import {router} from '@/router';
import SvgIcon from '@/common/components/SvgIcon';
import {categoryConf} from '../../common/constants';
let isBackFromPreviewPage = false; // 是否从preview页面返回的

export default {
  name: 'AddArticle',
  setup(props) {
    const title = ref('');
    const describe = ref('');
    const tagInput = ref('');
    const tags = ref([]);
    const category = ref('blog');
    const submit = ref(0);

    const currentRoute = router.currentRoute.value;
    const isEdit = currentRoute.path === '/article/edit';
    const id = currentRoute.query.id;
    let editor = null;

    // 确认退出的确认功能
    const confirmExit = (e) => {
      e.returnValue = '确认修改都已提交吗？';
      return '确认修改都已提交吗？';
    }

    onMounted(() => {
      window.addEventListener('beforeunload', confirmExit, false);

      if (window.ace) {
        editor = ace.edit("editor");
        // markdown模式
        editor.session.setMode("ace/mode/markdown");
        // 设定tab长度并变成空格
        editor.getSession().setTabSize(2);
        editor.session.setUseSoftTabs(true);
        // 右侧竖线隐藏
        editor.setShowPrintMargin(false);
        // 折行显示
        editor.session.setUseWrapMode(true);
      } else {
        console.error('ace编辑器加载失败');
      }

      const fillEditableWithData = (data) => {
        title.value = data.title || '';
        editor && editor.setValue(data.body || '');
        describe.value = data.describe || '';
        tags.value = data.tags || [];
        category.value = data.category || 'blog';
      }

      if (isBackFromPreviewPage) {
        const data = getStorage('KOVAR_NEW_PAGE_PREVIEW');
        fillEditableWithData(data);
      } else if (isEdit) {
        get('/action/article/detail', { id })
          .then(res => {
            const {ret, data, errmsg} = res;
            if (ret === 0) {
              fillEditableWithData(data);
              submit.value = 0;
            } else {
              props.showTips(errmsg);
            }
          })
      } else {
        fillEditableWithData({});
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', confirmExit);
    })

    // forward：是否跳转到预览页面
    const onSave = (forward = true) => {
      const vTitle = trim(title.value);
      const vDesc = trim(describe.value);
      const postData = {
        title: vTitle,
        describe: vDesc,
        body: editor ? editor.getValue() : '',
        tags: tags.value,
        category: category.value,
        isShow: submit.value
      }

      if (!vTitle) {
        props.showTips('请输入文章标题');
        return;
      }
      
      if (isEdit) {
        return post('/action/article/edit', {id, ...postData}).then(data => {
          const { ret, errmsg } = data;
          if (ret === 0) {
            props.showTips('保存文章成功');
            if (forward) {
              router.push('/article/detail?id=' + data.data.id);
            }
          } else {
            props.showTips(errmsg);
          }
        })
      } else {
        return post('/action/article/add', postData).then(data => {
          const { ret, errmsg } = data;
          if (ret === 0) {
            props.showTips('添加文章成功');
            router.push('/article/detail?id=' + data.data.id);
          } else {
            props.showTips(errmsg);
          }
        })
      }
      
    }

    const onPreview = () => {
      setStorage('KOVAR_NEW_PAGE_PREVIEW', {
        title: title.value,
        body: editor.getValue() || '',
        describe: describe.value,
        tags: tags.value,
        category: category.value
      })
      router.push('/article/preview');
    }

    const onAddTag = (e) => {
      if (e.keyCode === 13) {
        // enter
        const tag = trim(tagInput.value);
        if (tags.value.includes(tag)) {
          props.showTips('该标签已存在');
        } else if (tag) {
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
      tagInput,
      tags,
      category,
      categoryConf,
      submit,
      onSave,
      onPreview,
      onAddTag,
      onTagDel,
      onSelectCategory,
      onSelectSubmitType,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/article/preview') {
      isBackFromPreviewPage = true;
    }
    next();
  },
  props: {
    showTips: {
      type: Function
    }
  },
  components: {
    SvgIcon,
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
    box-sizing: border-box;
  }
  #editor {
    min-height: 200px;
    height: 1000px;
    padding-top: 10px;
    padding-bottom: 10px;
    resize: none;
    font-size: 16px;
    border: 1px solid #eef;
    border-radius: 3px;
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
  margin-bottom: 16px;
}
.article-desc {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 20px;
}
.article-content {
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 40px;
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
  background-color: rgb(223, 223, 223);
  color: #333;
  margin-right: 13px;
  text-align: center;
  font-weight: normal;
  &.selected {
    background-color: rgb(98, 147, 211);
    color: #fff;
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
